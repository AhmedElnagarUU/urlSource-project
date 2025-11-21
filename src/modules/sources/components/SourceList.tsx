"use client";

import Button from "@/shared/components/Button";
import axios from "@/lib/axios";
import { NewsSource } from "../types";

// Client-side logger wrapper
const logUserAction = (action: string, data?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[User Action] ${action}`, data);
  }
};

interface SourceListProps {
  sources: NewsSource[];
  onSourceDeleted: () => void;
}

export default function SourceList({ sources, onSourceDeleted }: SourceListProps) {
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this news source?")) {
      return;
    }

    logUserAction("Delete source initiated", { sourceId: id });

    try {
      const response = await axios.delete(`/api/sources/${id}`);

      if (response.data.success) {
        logUserAction("Source deleted successfully", { sourceId: id });
        onSourceDeleted();
      } else {
        alert(response.data.error || "Failed to delete source");
      }
    } catch (err: any) {
      logUserAction("Delete source failed", { 
        sourceId: id,
        error: err.response?.data?.error || err.message 
      });
      alert(err.response?.data?.error || err.message || "An unexpected error occurred");
    }
  };

  if (sources.length === 0) {
    return (
      <div className="bg-[#1e293b]/80 backdrop-blur-lg shadow-lg rounded-2xl p-12 border border-[#334155]/50 text-center">
        <div className="max-w-md mx-auto">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <p className="text-gray-300 text-lg">
            No news sources added yet. Add your first source above!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1e293b]/80 backdrop-blur-lg shadow-lg rounded-2xl p-6 md:p-8 border border-[#334155]/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          Saved News Sources
        </h2>
        <span className="px-3 py-1 bg-[#14b8a6]/80 backdrop-blur-md border border-[#14b8a6]/50 text-white rounded-full text-sm font-semibold">
          {sources.length}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map((source) => {
          const hostname = new URL(source.url).hostname;
          const displayName = source.name || hostname;
          
          return (
            <div
              key={source.id}
              className="bg-[#0f172a]/80 backdrop-blur-md rounded-xl p-5 border border-[#334155]/50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-lg mb-1 truncate">
                    {displayName}
                  </h3>
                  <p className="text-sm text-gray-400 truncate">{hostname}</p>
                </div>
                <div className="ml-2 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#14b8a6]"></div>
                </div>
              </div>
              
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#5eead4] mb-3 block truncate"
                onClick={(e) => e.stopPropagation()}
              >
                {source.url}
              </a>
              
              <Button
                onClick={() => handleDelete(source.id)}
                variant="danger"
                className="w-full mt-3 text-sm py-2"
              >
                Remove Source
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

