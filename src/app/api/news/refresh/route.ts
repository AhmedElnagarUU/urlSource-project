import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { scrapeNewsFromUrl } from "@/modules/scraping/utils/scrapeUrl";
import { NewsBySource } from "@/modules/news/types";

const DEFAULT_CONCURRENCY = 3;

// POST - Fetch news from all saved sources
export async function POST() {
  try {
    // Get all saved sources
    const sources = await prisma.newsSource.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (sources.length === 0) {
      return NextResponse.json({
        success: true,
        newsBySource: [],
        message: "No news sources found. Please add some sources first.",
      });
    }
    const concurrencyLimit = getConcurrencyLimit();
    const failedSources: FailedSource[] = [];

    const newsBySource = await processInBatches(
      sources,
      concurrencyLimit,
      async (source) => {
        try {
          const news = await scrapeNewsFromUrl(source.url);
          return buildNewsBySource(source, news);
        } catch (error: any) {
          const reason = error?.message || "Unknown error while scraping";
          console.error(`Error fetching news from ${source.url}:`, error);
          failedSources.push({
            id: source.id,
            url: source.url,
            reason,
          });
          return buildNewsBySource(source, []);
        }
      }
    );

    return NextResponse.json({
      success: true,
      newsBySource,
      meta: {
        totalSources: sources.length,
        failedSources,
        concurrencyLimit,
      },
    });
  } catch (error: any) {
    console.error("Error refreshing news:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to refresh news",
      },
      { status: 500 }
    );
  }
}

function getConcurrencyLimit() {
  const envValue = process.env.NEWS_REFRESH_CONCURRENCY;
  const parsed = envValue ? Number(envValue) : DEFAULT_CONCURRENCY;
  if (!Number.isFinite(parsed) || parsed < 1) {
    return DEFAULT_CONCURRENCY;
  }
  return Math.floor(parsed);
}

async function processInBatches<T, R>(
  items: T[],
  batchSize: number,
  handler: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(handler));
    results.push(...batchResults);
  }
  return results;
}

function buildNewsBySource(
  source: {
    id: string;
    url: string;
    name: string | null;
  },
  news: NewsBySource["news"]
): NewsBySource {
  return {
    source: {
      id: source.id,
      url: source.url,
      name: source.name,
    },
    news,
  };
}

interface FailedSource {
  id: string;
  url: string;
  reason: string;
}