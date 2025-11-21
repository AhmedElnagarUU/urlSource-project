import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import logger from "@/lib/logger/logger";

// GET all news sources
export async function GET() {
  const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  try {
    await logger.info("Fetching sources", {
      requestId,
      endpoint: "/api/sources",
      method: "GET",
    });

    const sources = await prisma.newsSource.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    await logger.info("Sources fetched successfully", {
      requestId,
      sourceCount: sources.length,
    });

    return NextResponse.json({ success: true, sources });
  } catch (error: any) {
    await logger.error("Failed to fetch sources", error, {
      requestId,
      endpoint: "/api/sources",
    });
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch sources",
      },
      { status: 500 }
    );
  }
}

// POST - Add a new news source
export async function POST(req: NextRequest) {
  const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  try {
    const body = await req.json();
    const { url, name } = body;

    await logger.info("Adding news source", {
      requestId,
      endpoint: "/api/sources",
      method: "POST",
      url: url?.substring(0, 100), // Log partial URL for privacy
      hasName: !!name,
    });

    if (!url || typeof url !== "string") {
      await logger.warn("Invalid request: URL missing", {
        requestId,
      });
      return NextResponse.json(
        {
          success: false,
          error: "URL is required",
        },
        { status: 400 }
      );
    }

    // Ensure URL has protocol
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    // Check if source already exists
    const existing = await prisma.newsSource.findUnique({
      where: { url: normalizedUrl },
    });

    if (existing) {
      await logger.warn("Source already exists", {
        requestId,
        url: normalizedUrl.substring(0, 100),
      });
      return NextResponse.json(
        {
          success: false,
          error: "This URL is already saved",
        },
        { status: 400 }
      );
    }

    const source = await prisma.newsSource.create({
      data: {
        url: normalizedUrl,
        name: name || null,
      },
    });

    await logger.info("Source added successfully", {
      requestId,
      sourceId: source.id,
      url: normalizedUrl.substring(0, 100),
    });

    return NextResponse.json({ success: true, source });
  } catch (error: any) {
    await logger.error("Failed to create source", error, {
      requestId,
      endpoint: "/api/sources",
    });
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create source",
      },
      { status: 500 }
    );
  }
}

