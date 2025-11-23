"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap,
  Compass,
  Rss,
  Bookmark,
  Plus,
  Settings,
  X,
} from "lucide-react";

const iconMap: Record<string, any> = {
  zap: Zap,
  compass: Compass,
  rss: Rss,
  bookmark: Bookmark,
  plus: Plus,
  settings: Settings,
};

const sidebarData = {
  logo: {
    text: "Cyntro",
    icon: "zap",
  },
  menuItems: [
    { id: "browse", label: "Browse", icon: "compass", href: "/dashboard", active: true },
    { id: "sources", label: "Sources", icon: "rss", href: "/dashboard/sources" },
    { id: "watchlist", label: "Watchlist", icon: "bookmark", href: "/dashboard/watchlist" },
  ],
  bottomSection: {
    title: "Quick Actions",
    items: [
      { id: "add-source", label: "Add Source", icon: "plus", href: "/dashboard/sources/add" },
      { id: "settings", label: "Settings", icon: "settings", href: "/dashboard/settings" },
    ],
  },
};

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const LogoIcon = iconMap[sidebarData.logo.icon] || Zap;

  return (
    <>
      {/* Mobile Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-[#0f172a] border-r border-gray-800 h-screen z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6">
          {/* Close Button - Mobile Only */}
          <div className="flex items-center justify-between mb-8 lg:hidden">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
                  <LogoIcon className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold text-white">{sidebarData.logo.text}</span>
            </Link>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-300 hover:bg-[#1a1f3a] hover:text-blue-400 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Logo - Desktop Only */}
          <Link href="/dashboard" className="hidden lg:flex items-center gap-3 group mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
                <LogoIcon className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold text-white">{sidebarData.logo.text}</span>
          </Link>

        {/* Main Menu */}
        <nav className="space-y-1 mb-8">
          {sidebarData.menuItems.map((item) => {
            const Icon = iconMap[item.icon] || Compass;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => onClose?.()}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                    : "text-gray-300 hover:bg-[#1a1f3a] hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        {sidebarData.bottomSection && (
          <div className="border-t border-gray-800 pt-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3 px-4">
              {sidebarData.bottomSection.title}
            </h3>
            <nav className="space-y-1">
              {sidebarData.bottomSection.items.map((item) => {
                const Icon = iconMap[item.icon] || Plus;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => onClose?.()}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-[#1a1f3a] hover:text-white transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
        </div>
      </aside>
    </>
  );
}
