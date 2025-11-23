"use client";

import { Code, Database, Cloud, Layout } from "lucide-react";

const skillCategories = [
  {
    title: "Backend & APIs",
    icon: Code,
    skills: ["Node.js", "Express.js", "TypeScript", "RESTful APIs", "JWT Authentication"],
  },
  {
    title: "Frontend",
    icon: Layout,
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MongoDB", "PostgreSQL", "Prisma", "SQL"],
  },
  {
    title: "DevOps & Deployment",
    icon: Cloud,
    skills: ["Cloud Infrastructure", "Server Administration", "Containerization", "CI/CD", "Security"],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-white dark:bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive expertise across the full stack development spectrum
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="p-8 bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-[#334155] shadow-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#E50914]/10 dark:bg-[#14b8a6]/20 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#E50914] dark:text-[#14b8a6]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-4 py-2 bg-gray-100 dark:bg-[#0f172a] text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-gray-200 dark:border-[#334155]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

