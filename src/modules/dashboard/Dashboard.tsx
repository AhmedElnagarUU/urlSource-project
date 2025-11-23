"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";
import HeroBanner from "./components/HeroBanner";
import ContentRow from "./components/ContentRow";

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a1128] overflow-x-hidden">
      <div className="flex">
        <Sidebar 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)} 
        />
        {/* Overlay for mobile */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
        <div className="flex-1 w-full lg:w-auto min-w-0">
          <TopNavbar 
            onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          />
          <main className="p-4 md:p-6 lg:p-8 bg-[#0a1128]">
            <HeroBanner />
            <ContentRow />
          </main>
        </div>
      </div>
    </div>
  );
}
