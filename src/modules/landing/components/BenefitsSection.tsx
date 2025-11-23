"use client";

import { Clock, Eye, Sparkles, TrendingUp, CheckCircle } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Save Time",
    description: "Automate news monitoring and eliminate manual checking. Get updates delivered to you automatically.",
  },
  {
    icon: Eye,
    title: "Never Miss Updates",
    description: "Stay on top of important updates from your favorite sources with real-time notifications.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description: "Get intelligent summaries and insights that help you understand content at a glance.",
  },
  {
    icon: TrendingUp,
    title: "Track Competitors",
    description: "Monitor competitor news and industry updates to stay ahead in your field.",
  },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="relative py-24 bg-[#0f172a] dark:bg-[#0f172a] overflow-hidden">
      {/* Corner Blur Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose Cyntro
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform how you consume and monitor news
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="p-8 bg-[#1a1f3a] rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-cyan-600/50 blur-2xl"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of users who are already tracking their favorite news sources
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 shadow-lg"
              >
                Start Tracking Free
                <CheckCircle className="w-5 h-5" />
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-semibold text-lg hover:bg-white/10"
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
