import { NextResponse } from 'next/server';
import { supabase, type Product } from '@/lib/supabase';
import { logger } from '@/lib/logger';

interface VectorMatch {
  id: number;
  similarity: number;
}

interface SearchRequest {
  query: string;
  limit?: number;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as SearchRequest;
    const { query, limit = 20 } = body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      logger.error('[Hybrid Search API] Invalid or empty search query');
      return NextResponse.json(
        { error: 'Invalid or empty search query' },
        { status: 400 }
      );
    }

    const trimmedQuery = query.trim();
    logger.log(`[Hybrid Search API] Received query: "${trimmedQuery}"`);

    // Step 1: Get Query Embedding
    const embedApiUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/embed-query`;
    let queryEmbedding: number[];
    
    try {
      const embedResponse = await fetch(embedApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmedQuery }),
      });

      if (!embedResponse.ok) {
        const errorData = await embedResponse.json();
        throw new Error(errorData.error || `Embedding API failed with status ${embedResponse.status}`);
      }

      const { embedding } = await embedResponse.json();
      if (!embedding || !Array.isArray(embedding)) {
        throw new Error("Invalid embedding format received from API");
      }

      queryEmbedding = embedding;
      logger.log(`[Hybrid Search API] Query embedding received`);
    } catch (embedError: any) {
      logger.error(`[Hybrid Search API] Failed to get query embedding:`, embedError);
      return NextResponse.json(
        { error: `Failed to get query embedding: ${embedError.message}` },
        { status: 500 }
      );
    }

    // Step 2: Perform Keyword Search (Simplified: Text Fields Only)
    logger.log(`[Hybrid Search API] Performing simplified keyword search (text fields only)...`);
    // Search only in name, description, category, domain
    const keywordQuery = `name.ilike.%${trimmedQuery}%,description.ilike.%${trimmedQuery}%,category.ilike.%${trimmedQuery}%,domain.ilike.%${trimmedQuery}%`;

    const { data: keywordResults, error: keywordError } = await supabase
      .from('products')
      .select('id')
      .or(keywordQuery)
      .limit(limit * 5); // Fetch more candidates for keyword search initially

    if (keywordError) {
      logger.error('[Hybrid Search API] Keyword search error:', keywordError);
      // Don't fail the whole request, proceed to vector search
    }

    const keywordIds = new Set(keywordResults?.map(p => p.id) || []);
    logger.log(`[Hybrid Search API] Keyword search found ${keywordIds.size} potential matches`);

    // Step 3: Perform Vector Search
    logger.log(`[Hybrid Search API] Performing vector search...`);
    const { data: vectorResults, error: vectorError } = await supabase
      .rpc('match_products', {
        query_embedding: queryEmbedding,
        match_count: limit * 2
      });

    if (vectorError) {
      logger.error('[Hybrid Search API] Vector search error:', vectorError);
      // If vector search fails but we have keyword results, continue with those
      if (keywordIds.size === 0) {
        return NextResponse.json(
          { error: 'Both keyword and vector searches failed' },
          { status: 500 }
        );
      }
    }

    const vectorMatches: VectorMatch[] = Array.isArray(vectorResults)
      ? vectorResults.map(item => ({
          id: Number(item.id), // Cast integer to number
          similarity: item.similarity
        }))
      : [];
    logger.log(`[Hybrid Search API] Vector search found ${vectorMatches.length} potential matches`);

    // Step 4: Combine and Rank Results (Prioritize Keywords)
    logger.log(`[Hybrid Search API] Combining and ranking results with keyword priority...`);
    let finalRankedIds: number[] = [];

    if (keywordIds.size > 0) {
        // --- Keyword Matches Exist: Prioritize them ---
        logger.log('[Hybrid Search API] Prioritizing keyword matches.');

        // 1. Filter vector matches to include only those also found by keyword
        const keywordVectorMatches = vectorMatches.filter(vm => keywordIds.has(vm.id));
        logger.log(`[Hybrid Search API] Found ${keywordVectorMatches.length} matches common to keyword and vector searches.`);

        // 2. Sort these common matches by vector similarity (highest similarity first)
        keywordVectorMatches.sort((a, b) => b.similarity - a.similarity);

        // 3. Get the IDs from the sorted common matches
        const rankedKeywordVectorIds = keywordVectorMatches.map(vm => vm.id);

        // 4. Identify keyword matches NOT found by vector search
        const keywordOnlyIds = Array.from(keywordIds).filter(id => !keywordVectorMatches.some(vm => vm.id === id));
        logger.log(`[Hybrid Search API] Found ${keywordOnlyIds.length} matches from keywords only.`);

        // 5. Combine: Prioritized common matches first, then keyword-only matches
        finalRankedIds = [...rankedKeywordVectorIds, ...keywordOnlyIds];

    } else if (vectorMatches.length > 0) {
        // --- No Keyword Matches: Fallback to Vector Search ---
        logger.log('[Hybrid Search API] No keyword matches found. Falling back to vector search ranking.');
        vectorMatches.sort((a, b) => b.similarity - a.similarity);
        finalRankedIds = vectorMatches.map(vm => vm.id);
    }

    // Limit results
    const limitedRankedIds = finalRankedIds.slice(0, limit);
    logger.log(`[Hybrid Search API] Final ranked IDs (limited to ${limit}): ${limitedRankedIds.join(', ')}`);

    if (limitedRankedIds.length === 0) {
      logger.log(`[Hybrid Search API] No results after ranking and limiting.`);
      return NextResponse.json([]);
    }

    // Step 5: Fetch Full Product Details
    logger.log(`[Hybrid Search API] Fetching final product details...`);
    const { data: finalProducts, error: finalError } = await supabase
      .from('products')
      .select('*')
      .in('id', limitedRankedIds); // Fetch details only for the final ranked & limited IDs

    if (finalError) {
      logger.error('[Hybrid Search API] Error fetching final products:', finalError);
      return NextResponse.json(
        { error: 'Failed to fetch final product details' },
        { status: 500 }
      );
    }

    // Re-order products according to the final ranking
    const productMap = new Map(finalProducts?.map(p => [p.id, p]));
    const sortedFinalProducts = limitedRankedIds
      .map(id => productMap.get(id))
      .filter((p): p is Product => p !== undefined); // Type guard to filter out undefined

    logger.log(`[Hybrid Search API] Returning ${sortedFinalProducts.length} sorted products`);
    return NextResponse.json(sortedFinalProducts);

  } catch (error: any) {
    logger.error('[Hybrid Search API] Unexpected error:', error);
    return NextResponse.json(
      { error: error.message || 'Hybrid search failed' },
      { status: 500 }
    );
  }
}