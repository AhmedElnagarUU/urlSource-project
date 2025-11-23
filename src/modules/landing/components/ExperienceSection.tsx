"use client";

import { Briefcase, Code, Users, CheckCircle } from "lucide-react";

const experience = [
  {
    icon: Briefcase,
    title: "Professional Experience",
    description: "Full Stack Developer with 2+ years of professional experience building web applications from planning to deployment.",
    highlight: "2+ years experience",
  },
  {
    icon: Code,
    title: "Clean Architecture",
    description: "Organized, efficient, and committed to delivering high-quality software with attention to detail and best practices.",
    highlight: "Quality & Efficiency",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Team player seeking opportunities to join development teams and contribute to professional projects.",
    highlight: "Team Player",
  },
];

const highlights = [
  "Clean Code",
  "Quality Focus",
  "Efficient",
  "Team Player",
  "Professional",
  "Scalable",
];

export default function ExperienceSection() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Introducing
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#E50914] dark:text-[#14b8a6] mb-4">
            NewsHub
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            AI-powered news aggregation platform passionate about building clean, scalable, and maintainable solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {experience.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-8 bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-[#334155] shadow-sm"
              >
                <div className="w-12 h-12 bg-[#E50914]/10 dark:bg-[#14b8a6]/20 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#E50914] dark:text-[#14b8a6]" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {item.description}
                </p>
                <span className="inline-block px-3 py-1 bg-[#E50914]/10 dark:bg-[#14b8a6]/20 text-[#E50914] dark:text-[#14b8a6] text-sm font-semibold rounded">
                  {item.highlight}
                </span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="p-4 bg-white dark:bg-[#1e293b] rounded-lg border border-gray-200 dark:border-[#334155] text-center"
            >
              <CheckCircle className="w-6 h-6 text-[#E50914] dark:text-[#14b8a6] mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {highlight}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

