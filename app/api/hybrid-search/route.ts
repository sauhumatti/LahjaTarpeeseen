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

    if (!query || typeof query !== 'string') {
      logger.error('[Hybrid Search API] Invalid search query');
      return NextResponse.json(
        { error: 'Invalid search query' },
        { status: 400 }
      );
    }

    logger.log(`[Hybrid Search API] Received query: "${query}"`);

    // Step 1: Get Query Embedding
    const embedApiUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/embed-query`;
    let queryEmbedding: number[];
    
    try {
      const embedResponse = await fetch(embedApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: query }),
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

    // Step 2: Perform Keyword Search
    logger.log(`[Hybrid Search API] Performing keyword search...`);
    const { data: keywordResults, error: keywordError } = await supabase
      .from('products')
      .select('id')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .limit(limit * 2);

    if (keywordError) {
      logger.error('[Hybrid Search API] Keyword search error:', keywordError);
      // Continue with vector search even if keyword search fails
    }

    const keywordIds = keywordResults?.map(p => p.id) || [];
    logger.log(`[Hybrid Search API] Keyword search found ${keywordIds.length} potential matches`);

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
      if (keywordIds.length === 0) {
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

    // Step 4: Combine Results using RRF
    logger.log(`[Hybrid Search API] Combining and ranking results...`);
    const rankedIds = reciprocalRankFusion(
      keywordResults || [],
      vectorMatches,
      limit
    );

    if (rankedIds.length === 0) {
      logger.log(`[Hybrid Search API] No results found`);
      return NextResponse.json([]);
    }

    // Step 5: Fetch Full Product Details
    logger.log(`[Hybrid Search API] Fetching final product details...`);
    const { data: finalProducts, error: finalError } = await supabase
      .from('products')
      .select('*')
      .in('id', rankedIds);

    if (finalError) {
      logger.error('[Hybrid Search API] Error fetching final products:', finalError);
      return NextResponse.json(
        { error: 'Failed to fetch final product details' },
        { status: 500 }
      );
    }

    // Re-order products according to RRF ranking
    const productMap = new Map(finalProducts?.map(p => [p.id, p]));
    const sortedFinalProducts = rankedIds
      .map(id => productMap.get(id))
      .filter((p): p is Product => p !== undefined);

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

// Helper function for Reciprocal Rank Fusion
function reciprocalRankFusion(
  keywordResults: { id: number }[],
  vectorResults: VectorMatch[],
  limit: number,
  k: number = 60
): number[] {
  const scores: { [id: number]: number } = {};

  // Process keyword results
  keywordResults.forEach((item, index) => {
    const rank = index + 1;
    if (!scores[item.id]) scores[item.id] = 0;
    scores[item.id] += 1 / (k + rank);
  });

  // Process vector results
  vectorResults.forEach((item, index) => {
    const rank = index + 1;
    if (!scores[item.id]) scores[item.id] = 0;
    // Add similarity score influence
    const similarityBoost = item.similarity * 0.5; // Adjust weight as needed
    scores[item.id] += (1 / (k + rank)) + similarityBoost;
  });

  // Sort IDs by score in descending order
  return Object.entries(scores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .slice(0, limit)
    .map(([id]) => parseInt(id, 10));
}