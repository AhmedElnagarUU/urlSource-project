import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// DELETE - Remove a news source
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
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

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting source:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to delete source",
      },
      { status: 500 }
    );
  }
}

