import { NextResponse } from "next/server";

// Static data for hero banner - in future, this will fetch from database
export async function GET() {
  const heroBannerData = {
    title: "Breaking: Tech Industry Updates",
    description: "Stay ahead with the latest technology news and industry insights from top sources worldwide.",
    image: "/images/hero-banner.jpg", // Placeholder
    badge: {
      text: "LIVE",
      color: "orange",
    },
    metadata: {
      category: "Technology",
      language: "English",
      viewers: 2,
    },
    actions: {
      primary: {
        label: "Read More",
        icon: "play",
      },
      secondary: {
        label: "Add to Watchlist",
        icon: "plus",
      },
    },
  };

  return NextResponse.json({ success: true, data: heroBannerData });
}
