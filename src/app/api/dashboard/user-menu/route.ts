import { NextResponse } from "next/server";

// Static data for user menu - in future, this will fetch from database
export async function GET() {
  const userMenuData = {
    user: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "/images/avatar.jpg",
    },
    menuItems: [
      { id: "profile", label: "Profile", icon: "user", href: "/dashboard/profile" },
      { id: "settings", label: "Settings", icon: "settings", href: "/dashboard/settings" },
      { id: "help", label: "Help & Support", icon: "help-circle", href: "/dashboard/help" },
      { id: "logout", label: "Logout", icon: "log-out", href: "/logout" },
    ],
    notifications: {
      count: 3,
      items: [
        { id: 1, title: "New article available", time: "5m ago" },
        { id: 2, title: "Source updated", time: "1h ago" },
        { id: 3, title: "Weekly digest ready", time: "2h ago" },
      ],
    },
  };

  return NextResponse.json({ success: true, data: userMenuData });
}
