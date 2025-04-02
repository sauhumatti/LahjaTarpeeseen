import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

// Ensure the API key is loaded server-side only
const GEMINI_API_KEY = process.env.GOOGLE_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("GOOGLE_API_KEY environment variable not set.");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

// Types for the request body
interface EmbedQueryRequest {
  text: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as EmbedQueryRequest;
    const { text } = body;

    if (!text || typeof text !== 'string') {
      logger.error('[Embed API] Invalid input text');
      return NextResponse.json(
        { error: 'Invalid input text' },
        { status: 400 }
      );
    }

    logger.log(`[Embed API] Generating embedding for query: "${text}"`);

    // Generate embedding for the user query - passing text directly
    const result = await embeddingModel.embedContent(text);
    const embedding = result.embedding;

    if (!embedding || !embedding.values) {
      logger.error("[Embed API] Failed to get embedding values:", result);
      return NextResponse.json(
        { error: 'Failed to generate embedding values' },
        { status: 500 }
      );
    }

    logger.log(`[Embed API] Embedding generated successfully`);
    return NextResponse.json({ embedding: embedding.values });

  } catch (error: unknown) {
    logger.error(`[Embed API] Error generating embedding:`, error);
    const message = error instanceof Error ? error.message : 'Failed to generate embedding';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

// Optional: Add GET handler for API documentation
export async function GET() {
  return NextResponse.json({
    message: "Send a POST request with { text: 'your query' } to generate an embedding."
  });
}