import { NewsItem } from "../types";
import NewsCard from "./NewsCard";

interface NewsGridProps {
  items: NewsItem[];
}

export default function NewsGrid({ items }: NewsGridProps) {
  if (items.length === 0) {
    return (
      <div className="bg-white shadow-xl rounded-lg p-8 border border-blue-200 text-center">
        <p className="text-gray-600">No news items found. The website structure may not be compatible.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">Latest News</h3>
        <span className="text-sm text-gray-500">{items.length} articles</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <NewsCard key={index} item={item} />
        ))}
      </div>
    </>
  );
}

