"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Menu, X, Moon, Sun, ChevronDown } from "lucide-react";
import { useTheme } from "@/lib/theme/ThemeProvider";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const solutions = [
    { label: "for Founders", href: "#founders" },
    { label: "for Product Managers", href: "#product-managers" },
    { label: "for Designers", href: "#designers" },
    { label: "for Marketers", href: "#marketers" },
  ];

  const menuItems = [
    { label: "Enterprise", href: "#enterprise" },
    { label: "Pricing", href: "#pricing" },
    { label: "Community", href: "#community" },
  ];

  return (
    <nav className="bg-[#0a1128]/95 dark:bg-[#0a1128]/95 backdrop-blur-md border-b border-gray-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold text-white leading-tight">
              Cyntro
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-300 hover:text-blue-400 font-medium transition-colors">
                Solutions
                <ChevronDown className="w-4 h-4" />
              </button>
              {solutionsOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-[#1a1f3a] rounded-lg shadow-xl border border-gray-700 py-2 backdrop-blur-md">
                  {solutions.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 text-gray-300 hover:bg-[#0f172a] hover:text-blue-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-300 hover:text-blue-400 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-300 hover:bg-[#1a1f3a] hover:text-blue-400 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <Link
              href="/dashboard"
              className="px-4 py-2 text-gray-300 hover:text-blue-400 font-medium transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/30 transition-all"
            >
              Get started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-300 hover:bg-[#1a1f3a]"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              className="text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800/50">
            <div className="mb-4">
              <button
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                className="flex items-center justify-between w-full px-4 py-2 text-gray-300 hover:bg-[#1a1f3a] rounded-lg"
              >
                Solutions
                <ChevronDown className={`w-4 h-4 transition-transform ${solutionsOpen ? "rotate-180" : ""}`} />
              </button>
              {solutionsOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  {solutions.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 text-gray-300 hover:bg-[#1a1f3a] hover:text-blue-400 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-4 py-2 text-gray-300 hover:bg-[#1a1f3a] hover:text-blue-400 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 space-y-2">
              <Link
                href="/dashboard"
                className="block px-4 py-2 text-gray-300 hover:bg-[#1a1f3a] hover:text-blue-400 rounded-lg text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/dashboard"
                className="block px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold text-center hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/30"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
