"use client";

import { useState } from "react";
import { NewsBySource as NewsBySourceType } from "../types";
import NewsCard from "./NewsCard";

interface NewsBySourceProps {
  newsBySource: NewsBySourceType[];
}

export default function NewsBySource({ newsBySource }: NewsBySourceProps) {
  const [expandedSources, setExpandedSources] = useState<Set<string>>(new Set());

  const toggleSource = (sourceId: string) => {
    setExpandedSources((prev) => {
      const next = new Set(prev);
      if (next.has(sourceId)) {
        next.delete(sourceId);
      } else {
        next.add(sourceId);
      }
      return next;
    });
  };

  if (newsBySource.length === 0) {
    return (
      <div className="bg-[#1e293b] shadow-xl rounded-2xl p-12 border border-[#334155] text-center">
        <div className="max-w-md mx-auto">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p className="text-gray-300 text-lg">
            No news found. Click "Refresh All News" to fetch the latest articles from your saved sources.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {newsBySource.map((group) => {
        const isExpanded = expandedSources.has(group.source.id);
        const sourceName = group.source.name || new URL(group.source.url).hostname;
        const hasError = group.success === false;
        const hasNews = group.news.length > 0;
        
        return (
          <div key={group.source.id} className="bg-[#1e293b]/80 backdrop-blur-lg shadow-lg rounded-2xl overflow-hidden border border-[#334155]/50">
            {/* Header - Collapsible */}
            <button
              onClick={() => toggleSource(group.source.id)}
              className={`w-full p-6 text-left ${
                isExpanded ? 'bg-[#0f172a]/50 border-b border-[#334155]/50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-white">
                      {sourceName}
                    </h3>
                    {hasError && (
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded border border-red-500/30">
                        Failed
                      </span>
                    )}
                    {!hasError && hasNews && (
                      <span className="px-2 py-1 bg-[#14b8a6]/20 text-[#14b8a6] text-xs font-semibold rounded border border-[#14b8a6]/30">
                        Success
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <a
                      href={group.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#14b8a6] font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {group.source.url}
                    </a>
                    <span className="text-gray-400">
                      {group.news.length} {group.news.length === 1 ? "article" : "articles"}
                    </span>
                  </div>
                  {hasError && group.error && (
                    <p className="text-red-400 text-sm mt-2">
                      Error: {group.error}
                    </p>
                  )}
                </div>
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Content - Collapsible */}
            {isExpanded && (
              <div className="px-6 pb-6 border-t border-[#334155]/50">
                {hasError ? (
                  <div className="py-8 text-center">
                    <p className="text-red-400 mb-2 font-semibold">Failed to fetch news from this source</p>
                    <p className="text-gray-400 text-sm">{group.error}</p>
                  </div>
                ) : group.news.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">
                    No news articles found from this source.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {group.news.map((item, index) => (
                      <NewsCard key={index} item={item} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

