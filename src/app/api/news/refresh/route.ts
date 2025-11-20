import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { scrapeNewsFromUrl } from "@/modules/scraping/utils/scrapeUrl";
import { NewsBySource } from "@/modules/news/types";

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

    // Fetch news from all sources in parallel
    const newsPromises = sources.map(async (source) => {
      try {
        const news = await scrapeNewsFromUrl(source.url);
        return {
          source: {
            id: source.id,
            url: source.url,
            name: source.name,
          },
          news,
        } as NewsBySource;
      } catch (error: any) {
        console.error(`Error fetching news from ${source.url}:`, error);
        return {
          source: {
            id: source.id,
            url: source.url,
            name: source.name,
          },
          news: [],
        } as NewsBySource;
      }
    });

    const newsBySource = await Promise.all(newsPromises);

    return NextResponse.json({
      success: true,
      newsBySource,
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

