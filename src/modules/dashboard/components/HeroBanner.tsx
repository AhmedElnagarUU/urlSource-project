"use client";

import { Play, Plus, Users } from "lucide-react";

const heroBannerData = {
  title: "Breaking: Tech Industry Updates",
  description: "Stay ahead with the latest technology news and industry insights from top sources worldwide.",
  image: "/images/hero-banner.jpg",
  badge: {
    text: "LIVE",
    color: "blue",
  },
  metadata: {
    category: "Technology",
    language: "English",
    viewers: 2,
  },
  actions: {
    primary: {
      label: "Read More",
      icon: Play,
    },
    secondary: {
      label: "Add to Watchlist",
      icon: Plus,
    },
  },
};

export default function HeroBanner() {
  const PrimaryIcon = heroBannerData.actions.primary.icon;
  const SecondaryIcon = heroBannerData.actions.secondary.icon;

  return (
    <div className="relative w-full h-[250px] md:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden mb-8">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1a1f3a] to-[#0a1128]"></div>
      
      {/* Corner Blur Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      
      {/* Content */}
      <div className="relative z-10 p-4 md:p-6 lg:p-8 h-full flex flex-col justify-end">
        {/* Badge */}
        {heroBannerData.badge && (
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full mb-2 md:mb-3 shadow-lg shadow-blue-500/30">
            {heroBannerData.badge.text}
          </span>
        )}
        
        {/* Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3">{heroBannerData.title}</h2>
        
        {/* Description */}
        <p className="text-gray-300 text-base md:text-lg mb-3 md:mb-4 max-w-2xl line-clamp-2 md:line-clamp-none">{heroBannerData.description}</p>
        
        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-400 mb-4 md:mb-6">
          <span>{heroBannerData.metadata.category}</span>
          <span className="hidden sm:inline">•</span>
          <span>{heroBannerData.metadata.language}</span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3 md:w-4 md:h-4" /> 
            <span className="hidden sm:inline">{heroBannerData.metadata.viewers} friends are watching</span>
            <span className="sm:hidden">{heroBannerData.metadata.viewers} watching</span>
          </span>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/30 transition-all text-sm sm:text-base">
            <PrimaryIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            {heroBannerData.actions.primary.label}
          </button>
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-[#1a1f3a] border border-gray-800 text-white rounded-lg font-semibold hover:bg-[#0f172a] transition-colors text-sm sm:text-base">
            <SecondaryIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            {heroBannerData.actions.secondary.label}
          </button>
        </div>
      </div>
    </div>
  );
}
