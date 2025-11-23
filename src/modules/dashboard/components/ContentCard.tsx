"use client";

import { Users } from "lucide-react";

interface ContentCardProps {
  item: {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    progress?: number;
    participants?: number;
  };
}

export default function ContentCard({ item }: ContentCardProps) {
  return (
    <div className="group relative bg-[#1a1f3a] rounded-xl overflow-hidden border border-gray-800 cursor-pointer hover:border-blue-500/50 transition-all">
      {/* Image */}
      <div className="relative w-full h-40 sm:h-48 bg-gradient-to-br from-[#0f172a] to-[#1a1f3a] overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <span className="text-xs sm:text-sm">{item.category}</span>
          </div>
        )}
        {/* Progress Bar */}
        {item.progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
              style={{ width: `${item.progress}%` }}
            ></div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 md:p-4">
        <span className="text-xs font-semibold text-blue-400 mb-1 md:mb-2 block">{item.category}</span>
        <h3 className="text-white font-semibold mb-1 text-sm sm:text-base line-clamp-1">{item.title}</h3>
        <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 mb-2">{item.description}</p>
        <div className="flex items-center justify-between">
          {item.participants !== undefined && (
            <div className="flex items-center gap-1 text-xs text-cyan-400">
              <Users className="w-3 h-3" />
              <span>{item.participants} watching</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
