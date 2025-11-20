"use client";
import { useState, useEffect } from "react";
import { NewsSource } from "@/modules/sources/types";
import { NewsBySource as NewsBySourceType } from "@/modules/news/types";
import AddSourceForm from "@/modules/sources/components/AddSourceForm";
import SourceList from "@/modules/sources/components/SourceList";
import RefreshButton from "@/modules/news/components/RefreshButton";
import NewsBySource from "@/modules/news/components/NewsBySource";
import ErrorDisplay from "@/shared/components/ErrorDisplay";

export default function Home() {
  const [sources, setSources] = useState<NewsSource[]>([]);
  const [newsBySource, setNewsBySource] = useState<NewsBySourceType[]>([]);
  const [loadingSources, setLoadingSources] = useState(true);
  const [loadingNews, setLoadingNews] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load sources on mount
  useEffect(() => {
    loadSources();
  }, []);

  const loadSources = async () => {
    try {
      const response = await fetch("/api/sources");
      const result = await response.json();
      if (result.success) {
        setSources(result.sources);
      } else {
        setError(result.error || "Failed to load sources");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoadingSources(false);
    }
  };

  const handleRefresh = async () => {
    setLoadingNews(true);
    setError(null);
    setNewsBySource([]);

    try {
      const response = await fetch("/api/news/refresh", {
        method: "POST",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: `HTTP ${response.status}: ${response.statusText}`,
        }));
        setError(errorData.error || `Server error: ${response.status}`);
        return;
      }

      const result = await response.json();

      if (result.success) {
        setNewsBySource(result.newsBySource);
        if (result.message) {
          // Show info message if no sources
          console.log(result.message);
        }
      } else {
        setError(result.error || "Failed to refresh news");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoadingNews(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-indigo-200 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">News Aggregator</h1>
          <p className="text-gray-600">
            Add multiple news sources and view all your news in one place
          </p>
        </div>

        <AddSourceForm onSourceAdded={loadSources} />

        {loadingSources ? (
          <div className="bg-white shadow-xl rounded-lg p-6 border border-blue-200 text-center">
            <p className="text-gray-600">Loading sources...</p>
          </div>
        ) : (
          <SourceList sources={sources} onSourceDeleted={loadSources} />
        )}

        {sources.length > 0 && (
          <div className="flex justify-center mb-6">
            <RefreshButton onRefresh={handleRefresh} loading={loadingNews} />
          </div>
        )}

        <ErrorDisplay error={error} />

        {newsBySource.length > 0 && (
          <div className="mt-8">
            <NewsBySource newsBySource={newsBySource} />
          </div>
        )}

        {!loadingNews && newsBySource.length === 0 && sources.length > 0 && (
          <div className="bg-white shadow-xl rounded-lg p-8 border border-blue-200 text-center">
            <p className="text-gray-600">
              Click "Refresh All News" above to fetch the latest articles from your saved sources.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}