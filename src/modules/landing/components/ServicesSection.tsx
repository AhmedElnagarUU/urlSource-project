"use client";

import { Brain, Rss, RefreshCw, Layout, FolderTree, Palette } from "lucide-react";

const services = [
  {
    id: 1,
    title: "AI-Powered Extraction",
    description: "Advanced AI automatically extracts and organizes news articles from any source with high accuracy.",
    icon: Brain,
  },
  {
    id: 2,
    title: "Multiple Sources",
    description: "Add unlimited news sources and view all your favorite content in one centralized location.",
    icon: Rss,
  },
  {
    id: 3,
    title: "Real-Time Updates",
    description: "Get the latest news as it happens with manual refresh capabilities and instant notifications.",
    icon: RefreshCw,
  },
  {
    id: 4,
    title: "Clean Interface",
    description: "Beautiful, modern design that makes reading news a pleasure with intuitive navigation.",
    icon: Layout,
  },
  {
    id: 5,
    title: "Organized by Source",
    description: "News grouped by source for easy navigation and discovery of content from trusted publishers.",
    icon: FolderTree,
  },
  {
    id: 6,
    title: "Dark & Light Themes",
    description: "Choose your preferred theme for comfortable reading at any time of day or night.",
    icon: Palette,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white dark:bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to stay informed and organized
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="p-8 bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-[#334155] shadow-sm hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-[#E50914]/10 dark:bg-[#14b8a6]/20 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#E50914] dark:text-[#14b8a6]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

