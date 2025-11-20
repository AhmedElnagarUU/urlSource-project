import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all news sources
export async function GET() {
  try {
    const sources = await prisma.newsSource.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json({ success: true, sources });
  } catch (error: any) {
    console.error("Error fetching sources:", error);
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
  try {
    const body = await req.json();
    const { url, name } = body;

    if (!url || typeof url !== "string") {
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

    return NextResponse.json({ success: true, source });
  } catch (error: any) {
    console.error("Error creating source:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create source",
      },
      { status: 500 }
    );
  }
}

