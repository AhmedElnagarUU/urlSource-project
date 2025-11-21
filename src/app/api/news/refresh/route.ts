import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { scrapeNewsFromUrl } from "@/modules/scraping/utils/scrapeUrl";
import { NewsBySource } from "@/modules/news/types";
import logger from "@/lib/logger/logger";

type NewsSourceRecord = Awaited<
  ReturnType<typeof prisma.newsSource.findMany>
>[number];

interface SourceResult {
  source: {
    id: string;
    url: string;
    name: string | null;
  };
  news: NewsBySource["news"];
  success: boolean;
  error?: string;
  articlesFound: number;
}

interface NewsBySourceWithStatus extends NewsBySource {
  success: boolean;
  error?: string;
}

// POST - Fetch news from all saved sources (sequentially)
export async function POST() {
  const startTime = Date.now();
  const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  try {
    await logger.info("News refresh started", {
      requestId,
      endpoint: "/api/news/refresh",
      method: "POST",
    });

    // Get all saved sources
    const sources = await prisma.newsSource.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    await logger.info("Sources retrieved", {
      requestId,
      sourceCount: sources.length,
    });

    if (sources.length === 0) {
      await logger.warn("No sources found", {
        requestId,
      });
      return NextResponse.json({
        success: true,
        newsBySource: [],
        message: "No news sources found. Please add some sources first.",
      });
    }

    // Process sources sequentially (one at a time)
    const results: SourceResult[] = [];
    
    for (let i = 0; i < sources.length; i++) {
      const source = sources[i];
      const sourceStartTime = Date.now();
      
      await logger.info("Processing source", {
        requestId,
        sourceId: source.id,
        url: source.url,
        sourceIndex: i + 1,
        totalSources: sources.length,
      });

      try {
        const news = await scrapeNewsFromUrl(source.url);
        const sourceTime = Date.now() - sourceStartTime;
        
        await logger.info("Source processed successfully", {
          requestId,
          sourceId: source.id,
          url: source.url,
          articlesFound: news.length,
          processingTime: sourceTime,
        });

        results.push({
          source: {
            id: source.id,
            url: source.url,
            name: source.name,
          },
          news,
          success: true,
          articlesFound: news.length,
        });
      } catch (error: any) {
        const sourceTime = Date.now() - sourceStartTime;
        const errorMessage = error?.message || "Unknown error while scraping";
        
        await logger.error("Source processing failed", error, {
          requestId,
          sourceId: source.id,
          url: source.url,
          error: errorMessage,
          processingTime: sourceTime,
        });

        results.push({
          source: {
            id: source.id,
            url: source.url,
            name: source.name,
          },
          news: [],
          success: false,
          error: errorMessage,
          articlesFound: 0,
        });
      }
    }

    const totalTime = Date.now() - startTime;
    const totalArticles = results.reduce((sum, result) => sum + result.articlesFound, 0);
    const successfulSources = results.filter(r => r.success).length;
    const failedSources = results.filter(r => !r.success);

    await logger.info("News refresh completed", {
      requestId,
      totalSources: sources.length,
      successfulSources,
      failedSources: failedSources.length,
      totalArticles,
      duration: totalTime,
    });

    // Transform results to NewsBySource format with status
    const newsBySource: NewsBySourceWithStatus[] = results.map(result => ({
      source: result.source,
      news: result.news,
      success: result.success,
      error: result.error,
    }));

    return NextResponse.json({
      success: true,
      newsBySource,
      meta: {
        totalSources: sources.length,
        successfulSources,
        failedSources: failedSources.map(f => ({
          id: f.source.id,
          url: f.source.url,
          reason: f.error || "Unknown error",
        })),
      },
    });
  } catch (error: any) {
    const totalTime = Date.now() - startTime;
    await logger.error("News refresh failed", error, {
      requestId,
      duration: totalTime,
    });
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to refresh news",
      },
      { status: 500 }
    );
  }
}