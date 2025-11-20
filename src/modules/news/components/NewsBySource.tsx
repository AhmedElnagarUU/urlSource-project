"use client";

import { NewsBySource as NewsBySourceType } from "../types";
import NewsCard from "./NewsCard";

interface NewsBySourceProps {
  newsBySource: NewsBySourceType[];
}

export default function NewsBySource({ newsBySource }: NewsBySourceProps) {
  if (newsBySource.length === 0) {
    return (
      <div className="bg-white shadow-xl rounded-lg p-8 border border-blue-200 text-center">
        <p className="text-gray-600">
          No news found. Click "Refresh All News" to fetch the latest articles from your saved sources.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {newsBySource.map((group) => (
        <div key={group.source.id} className="bg-white shadow-xl rounded-lg p-6 border border-blue-200">
          <div className="mb-4 pb-4 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800">
              {group.source.name || new URL(group.source.url).hostname}
            </h3>
            <a
              href={group.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-600 hover:text-indigo-800 mt-1 inline-block"
            >
              {group.source.url}
            </a>
            <span className="text-sm text-gray-500 ml-2">
              ({group.news.length} {group.news.length === 1 ? "article" : "articles"})
            </span>
          </div>

          {group.news.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No news articles found from this source.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.news.map((item, index) => (
                <NewsCard key={index} item={item} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

