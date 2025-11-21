"use client";

interface StatsCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
}

function StatsCard({ value, label, icon }: StatsCardProps) {
  return (
    <div className="bg-[#1e293b]/60 backdrop-blur-lg rounded-xl p-6 border border-[#334155]/50">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-[#14b8a6] mb-1">{value}</p>
          <p className="text-sm text-gray-300">{label}</p>
        </div>
        {icon && (
          <div className="text-[#5eead4]">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

interface HeroSectionProps {
  totalSources: number;
  totalArticles: number;
  lastRefresh?: Date | null;
}

export default function HeroSection({ totalSources, totalArticles, lastRefresh }: HeroSectionProps) {
  const formatLastRefresh = () => {
    if (!lastRefresh) return "Never";
    const now = new Date();
    const diff = now.getTime() - new Date(lastRefresh).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="bg-[#1e293b]/60 backdrop-blur-lg rounded-2xl p-8 md:p-12 mb-8 border border-[#334155]/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            News Aggregator
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Stay informed with the latest news from all your favorite sources in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <StatsCard
            value={totalSources}
            label="News Sources"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            }
          />
          <StatsCard
            value={totalArticles}
            label="Total Articles"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            }
          />
          <StatsCard
            value={formatLastRefresh()}
            label="Last Refresh"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}

