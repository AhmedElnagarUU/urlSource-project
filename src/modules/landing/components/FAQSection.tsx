"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does AI-powered news extraction work?",
    answer: "Our advanced AI algorithms analyze website structure, identify news articles, and extract key information including titles, descriptions, images, and links. The system learns from each website's unique structure to provide accurate results.",
  },
  {
    question: "Can I track any website?",
    answer: "Yes! Cyntro can monitor any website that publishes news or updates. Simply enter the URL and our AI will automatically detect and extract the latest content.",
  },
  {
    question: "How often are websites checked for updates?",
    answer: "You can manually refresh your tracked sources anytime. Real-time monitoring is available in Pro and Enterprise plans, which check for updates automatically at configurable intervals.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use industry-standard encryption and security practices. Your tracked sources and preferences are stored securely and never shared with third parties.",
  },
  {
    question: "Can I export my tracked news?",
    answer: "Yes, Pro and Enterprise users can export their news data in various formats including JSON, CSV, and RSS feeds for integration with other tools.",
  },
  {
    question: "What happens if a website changes its structure?",
    answer: "Our AI continuously adapts to website changes. If a major structural change occurs, our system automatically updates its extraction patterns to maintain accuracy.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 bg-[#0a1128] dark:bg-[#0a1128] overflow-hidden">
      {/* Corner Blur Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300">
            Everything you need to know about Cyntro
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#1a1f3a] rounded-xl border border-gray-800 overflow-hidden hover:border-blue-500/50 transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-[#0f172a] transition-colors"
              >
                <span className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
