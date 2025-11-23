"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    content: "Cyntro has revolutionized how we monitor industry news. The AI summaries save us hours every week.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Content Strategist",
    company: "MediaFlow",
    content: "Tracking multiple news sources has never been easier. The real-time updates keep us ahead of the competition.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Research Analyst",
    company: "DataInsights",
    content: "The custom alerts feature is a game-changer. We only get notified about topics that matter to our business.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 bg-[#0a1128] dark:bg-[#0a1128] overflow-hidden">
      {/* Corner Blur Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Professionals
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See what our users are saying
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 bg-[#1a1f3a] rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all"
            >
              <Quote className="w-8 h-8 text-blue-400 mb-4" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div>
                <p className="font-semibold text-white">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-400">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
