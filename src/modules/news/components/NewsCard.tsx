import Card from "@/shared/components/Card";
import { NewsItem } from "../types";

interface NewsCardProps {
  item: NewsItem;
}

export default function NewsCard({ item }: NewsCardProps) {
  return (
    <Card>
      {/* Image */}
      {item.image && (
        <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
          <img
            src={item.image}
            alt={item.imageAlt || item.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
      
      {/* Content */}
      <div className="p-5 grow flex flex-col">
        <h4 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {item.title}
        </h4>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 grow">
          {item.description}
        </p>
        
        {/* Link */}
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold text-sm transition-colors"
          >
            {item.linkText}
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        )}
      </div>
    </Card>
  );
}

