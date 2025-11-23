"use client";

import { Globe, Brain, Bell } from "lucide-react";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Enter Website URL",
    description: "Simply paste any website URL you want to monitor. Our system supports all major news sites and blogs.",
    icon: Globe,
  },
  {
    number: 2,
    title: "AI Analyzes & Extracts",
    description: "Advanced AI algorithms analyze the website structure and extract the latest news articles and updates automatically.",
    icon: Brain,
  },
  {
    number: 3,
    title: "Receive Updates",
    description: "Get organized news updates in your dashboard with smart summaries and real-time notifications for new content.",
    icon: Bell,
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 bg-[#0a1128] dark:bg-[#0a1128] overflow-hidden">
      {/* Corner Blur Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get started in three simple steps
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 z-0">
                    <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 text-blue-500" />
                  </div>
                )}
                <div className="relative z-10 p-8 bg-[#1a1f3a] rounded-xl border border-gray-800">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-6 mx-auto shadow-lg shadow-blue-500/30">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center mb-4">
                    <span className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold rounded-full">
                      Step {step.number}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
