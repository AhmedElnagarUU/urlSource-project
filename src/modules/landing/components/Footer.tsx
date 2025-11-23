"use client";

import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a1128] dark:bg-[#0a1128] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-3 group mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold text-white leading-tight">
                Cyntro
              </span>
            </Link>
            <p className="text-gray-400 text-sm text-center md:text-left max-w-xs">
              Monitor any website for latest updates - powered by AI.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <Link href="#features" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
              Pricing
            </Link>
            <Link href="#faq" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
              FAQ
            </Link>
            <Link href="#privacy" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
              Privacy
            </Link>
            <Link href="#terms" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
              Terms
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Cyntro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
