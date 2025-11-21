"use client";
import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import { NewsSource } from "@/modules/sources/types";
import { NewsBySource as NewsBySourceType } from "@/modules/news/types";
import AddSourceForm from "@/modules/sources/components/AddSourceForm";
import SourceList from "@/modules/sources/components/SourceList";
import RefreshButton from "@/modules/news/components/RefreshButton";
import NewsBySource from "@/modules/news/components/NewsBySource";
import HeroSection from "@/modules/news/components/HeroSection";
import ErrorDisplay from "@/shared/components/ErrorDisplay";

// Client-side logger wrapper
const logUserAction = (action: string, data?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[User Action] ${action}`, data);
  }
};

export default function Home() {
  const [sources, setSources] = useState<NewsSource[]>([]);
  const [newsBySource, setNewsBySource] = useState<NewsBySourceType[]>([]);
  const [loadingSources, setLoadingSources] = useState(true);
  const [loadingNews, setLoadingNews] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  // Load sources on mount
  useEffect(() => {
    loadSources();
  }, []);

  const loadSources = async () => {
    try {
      const response = await axios.get("/api/sources");
      if (response.data.success) {
        setSources(response.data.sources);
      } else {
        setError(response.data.error || "Failed to load sources");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "An unexpected error occurred");
    } finally {
      setLoadingSources(false);
    }
  };

  const handleRefresh = async () => {
    setLoadingNews(true);
    setError(null);
    setNewsBySource([]);

    logUserAction("Refresh news initiated", { sourceCount: sources.length });

    try {
      const response = await axios.post("/api/news/refresh");

      if (response.data.success) {
        const totalArticles = response.data.newsBySource?.reduce(
          (sum: number, group: NewsBySourceType) => sum + group.news.length, 
          0
        ) || 0;
        
        logUserAction("News refreshed successfully", { 
          totalArticles,
          sourceCount: response.data.meta?.totalSources || 0,
        });
        
        setNewsBySource(response.data.newsBySource);
        setLastRefresh(new Date());
        if (response.data.message) {
          // Show info message if no sources
          console.log(response.data.message);
        }
      } else {
        setError(response.data.error || "Failed to refresh news");
      }
    } catch (err: any) {
      logUserAction("Refresh news failed", { 
        error: err.response?.data?.error || err.message 
      });
      setError(err.response?.data?.error || err.message || "An unexpected error occurred");
    } finally {
      setLoadingNews(false);
    }
  };

  const totalArticles = newsBySource.reduce((sum, group) => sum + group.news.length, 0);

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Hero Section with Stats */}
        <HeroSection
          totalSources={sources.length}
          totalArticles={totalArticles}
          lastRefresh={lastRefresh}
        />

        {/* Add Source Form */}
        <div className="mb-8">
          <AddSourceForm onSourceAdded={loadSources} />
        </div>

        {/* Sources List */}
        {loadingSources ? (
          <div className="bg-[#1e293b]/80 backdrop-blur-lg shadow-lg rounded-2xl p-12 border border-[#334155]/50 text-center mb-8">
            <div className="h-4 bg-[#334155]/50 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-[#334155]/50 rounded w-1/2 mx-auto"></div>
          </div>
        ) : (
          <div className="mb-8">
            <SourceList sources={sources} onSourceDeleted={loadSources} />
          </div>
        )}

        {/* Refresh Button */}
        {sources.length > 0 && (
          <div className="flex justify-center mb-8">
            <RefreshButton onRefresh={handleRefresh} loading={loadingNews} />
          </div>
        )}

        {/* Error Display */}
        <ErrorDisplay error={error} />

        {/* News Display */}
        {newsBySource.length > 0 && (
          <div className="mt-12">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">Latest News</h2>
              <p className="text-gray-300">Articles from your saved sources</p>
            </div>
            <NewsBySource newsBySource={newsBySource} />
          </div>
        )}

        {/* Empty State */}
        {!loadingNews && newsBySource.length === 0 && sources.length > 0 && (
          <div className="bg-[#1e293b]/80 backdrop-blur-lg shadow-lg rounded-2xl p-12 border border-[#334155]/50 text-center">
            <div className="max-w-md mx-auto">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <p className="text-gray-300 text-lg mb-2">
                Ready to fetch the latest news?
              </p>
              <p className="text-gray-400">
                Click "Refresh All News" above to fetch the latest articles from your saved sources.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}