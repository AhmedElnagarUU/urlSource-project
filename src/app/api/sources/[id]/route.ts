import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import logger from "@/lib/logger/logger";

// DELETE - Remove a news source
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  try {
    const { id } = await params;

    await logger.info("Deleting source", {
      requestId,
      endpoint: `/api/sources/${id}`,
      method: "DELETE",
      sourceId: id,
    });

    if (!id) {
      await logger.warn("Invalid request: Source ID missing", {
        requestId,
      });
      return NextResponse.json(
        {
          success: false,
          error: "Source ID is required",
        },
        { status: 400 }
      );
    }

    await prisma.newsSource.delete({
      where: { id },
    });

    await logger.info("Source deleted successfully", {
      requestId,
      sourceId: id,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    await logger.error("Failed to delete source", error, {
      requestId,
      endpoint: `/api/sources/${id}`,
    });
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to delete source",
      },
      { status: 500 }
    );
  }
}

