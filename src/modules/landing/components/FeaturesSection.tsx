"use client";

import { Brain, Zap, Layers, FileText, Bell, Search } from "lucide-react";

const features = [
  {
    id: 1,
    title: "AI-Powered Extraction",
    description: "Intelligent content parsing from any website with advanced AI algorithms that understand context and structure.",
    icon: Brain,
    color: "blue",
  },
  {
    id: 2,
    title: "Real-Time Updates",
    description: "Get notified instantly when new content appears on your tracked websites. Never miss important updates.",
    icon: Zap,
    color: "cyan",
  },
  {
    id: 3,
    title: "Multi-Source Tracking",
    description: "Monitor multiple websites simultaneously from a single dashboard. Organize and manage all your sources easily.",
    icon: Layers,
    color: "blue",
  },
  {
    id: 4,
    title: "Smart Summaries",
    description: "AI-generated summaries of news articles help you quickly understand content without reading everything.",
    icon: FileText,
    color: "cyan",
  },
  {
    id: 5,
    title: "Custom Alerts",
    description: "Set up notifications for specific topics or keywords. Get alerts only for what matters to you.",
    icon: Bell,
    color: "blue",
  },
  {
    id: 6,
    title: "Advanced Search",
    description: "Search across all tracked sources with intelligent filtering and categorization capabilities.",
    icon: Search,
    color: "cyan",
  },
];

const colorClasses = {
  blue: "from-blue-500 to-blue-600",
  cyan: "from-cyan-500 to-cyan-600",
};

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 bg-[#0f172a] dark:bg-[#0f172a] overflow-hidden">
      {/* Corner Blur Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to stay informed and ahead of the curve
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            const gradient = colorClasses[feature.color as keyof typeof colorClasses];
            return (
              <div
                key={feature.id}
                className="group p-8 bg-[#1a1f3a] rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
