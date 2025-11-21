import Card from "@/shared/components/Card";
import { NewsItem } from "../types";

interface NewsCardProps {
  item: NewsItem;
}

export default function NewsCard({ item }: NewsCardProps) {
  return (
    <Card className="cursor-pointer">
      {/* Image */}
      {item.image && (
        <div className="relative w-full h-56 bg-gradient-to-br from-[#0f172a] to-[#1e293b] overflow-hidden rounded-t-lg">
          <img
            src={item.image}
            alt={item.imageAlt || item.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
      
      {/* Content */}
      <div className="p-6 grow flex flex-col">
        <h4 className="text-xl font-bold text-white mb-3 line-clamp-2">
          {item.title}
        </h4>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3 grow leading-relaxed">
          {item.description}
        </p>
        
        {/* Link */}
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#14b8a6] font-semibold text-sm gap-1 mt-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <span>{item.linkText || "Read more"}</span>
            <svg
              className="w-4 h-4"
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

