import { NextResponse } from "next/server";

// Static data for sidebar navigation - in future, this will fetch from database
export async function GET() {
  const sidebarData = {
    logo: {
      text: "NewsHub",
      icon: "newspaper",
    },
    menuItems: [
      { id: "browse", label: "Browse", icon: "compass", href: "/dashboard", active: true },
      { id: "sources", label: "Sources", icon: "rss", href: "/dashboard/sources" },
      { id: "watchlist", label: "Watchlist", icon: "bookmark", href: "/dashboard/watchlist" },
      { id: "friends", label: "Friends", icon: "users", href: "/dashboard/friends" },
    ],
    bottomSection: {
      title: "Quick Actions",
      items: [
        { id: "add-source", label: "Add Source", icon: "plus", href: "/dashboard/sources/add" },
        { id: "settings", label: "Settings", icon: "settings", href: "/dashboard/settings" },
      ],
    },
  };

  return NextResponse.json({ success: true, data: sidebarData });
}
