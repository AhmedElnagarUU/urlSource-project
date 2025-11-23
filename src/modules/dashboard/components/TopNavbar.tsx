"use client";

import { useState } from "react";
import { Search, Bell, User, ChevronDown, Settings, LogOut, Menu } from "lucide-react";

const userMenuData = {
  searchPlaceholder: "Search news...",
  notifications: 3,
  userName: "Ahmed Youssry",
  userAvatar: "https://avatars.githubusercontent.com/u/73809141?v=4",
  menuItems: [
    { label: "Profile", icon: User, href: "/dashboard/profile" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
    { label: "Logout", icon: LogOut, href: "/logout" },
  ],
};

interface TopNavbarProps {
  onMenuClick: () => void;
}

export default function TopNavbar({ onMenuClick }: TopNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#0a1128]/95 backdrop-blur-md border-b border-gray-800 sticky top-0 z-40">
      <div className="px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          {/* Hamburger Menu Button - Mobile Only */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:bg-[#1a1f3a] hover:text-blue-400 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Bar */}
          <div className="flex-1 lg:max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={userMenuData.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#0f172a] border border-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 rounded-lg text-gray-300 hover:bg-[#1a1f3a] relative transition-colors">
              <Bell className="w-5 h-5" />
              {userMenuData.notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {userMenuData.notifications}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                className="flex items-center gap-2 p-1 rounded-full hover:bg-[#1a1f3a] transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <img
                  src={userMenuData.userAvatar}
                  alt={userMenuData.userName}
                  className="w-8 h-8 rounded-full border-2 border-blue-500/50"
                />
                <span className="text-white font-medium hidden sm:block">{userMenuData.userName}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform hidden sm:block ${menuOpen ? "rotate-180" : ""}`} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1a1f3a] rounded-lg shadow-xl py-2 border border-gray-800">
                  <div className="px-4 py-2 border-b border-gray-800">
                    <p className="text-white font-semibold">{userMenuData.userName}</p>
                    <p className="text-sm text-gray-400">ahmed@example.com</p>
                  </div>
                  {userMenuData.menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-[#0f172a] hover:text-white transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
