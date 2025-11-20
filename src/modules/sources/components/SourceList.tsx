"use client";

import Button from "@/shared/components/Button";
import { NewsSource } from "../types";

interface SourceListProps {
  sources: NewsSource[];
  onSourceDeleted: () => void;
}

export default function SourceList({ sources, onSourceDeleted }: SourceListProps) {
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this news source?")) {
      return;
    }

    try {
      const response = await fetch(`/api/sources/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        onSourceDeleted();
      } else {
        alert(result.error || "Failed to delete source");
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "An unexpected error occurred");
    }
  };

  if (sources.length === 0) {
    return (
      <div className="bg-white shadow-xl rounded-lg p-6 border border-blue-200">
        <p className="text-gray-600 text-center">
          No news sources added yet. Add your first source above!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl rounded-lg p-6 border border-blue-200">
      <h2 className="text-xl font-bold text-indigo-600 mb-4">
        Saved News Sources ({sources.length})
      </h2>
      <div className="space-y-3">
        {sources.map((source) => (
          <div
            key={source.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {source.name || new URL(source.url).hostname}
              </p>
              <p className="text-sm text-gray-500 truncate">{source.url}</p>
            </div>
            <Button
              onClick={() => handleDelete(source.id)}
              variant="danger"
              className="ml-4 px-3 py-1 text-sm"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

