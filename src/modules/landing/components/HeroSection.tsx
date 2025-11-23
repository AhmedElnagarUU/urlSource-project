"use client";

import { useState } from "react";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  const [url, setUrl] = useState("");

  const handleTrack = () => {
    if (url.trim()) {
      window.location.href = "/dashboard";
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#0a1128] dark:bg-[#0a1128] overflow-hidden">
      {/* Corner Blur Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl"></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400">
                Powered by Advanced AI
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-white">Never Miss a</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  News Update
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
              Monitor any website for latest updates - powered by AI. Get intelligent news extraction, real-time alerts, and smart summaries all in one place.
            </p>

            {/* Input Field and Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter any website URL..."
                className="flex-1 px-6 py-4 bg-[#1a1f3a] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
              />
              <button
                onClick={handleTrack}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
              >
                Track Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Feature List */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-blue-400" />
                </div>
                <span className="text-sm">No credit card required</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-blue-400" />
                </div>
                <span className="text-sm">Free forever plan</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-blue-400" />
                </div>
                <span className="text-sm">Setup in 30 seconds</span>
              </div>
            </div>
          </div>

          {/* Right Section - Visual Graphic */}
          <div className="relative lg:block hidden">
            <div className="relative">
              {/* Laptop Container with Glow */}
              <div className="relative">
                {/* Glow Effect Behind Laptop */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-2xl blur-2xl transform scale-110"></div>
                
                {/* Laptop Mockup */}
                <div className="relative bg-[#1a1f3a] rounded-2xl p-4 border border-gray-700 shadow-2xl">
                  <div className="bg-[#0f172a] rounded-lg overflow-hidden border border-gray-800">
                    {/* Screen Content */}
                    <div className="aspect-video bg-gradient-to-br from-blue-900/50 to-cyan-900/50 p-6 relative overflow-hidden">
                      {/* Data Visualization Elements */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-4 left-4 w-32 h-20 bg-blue-500/30 rounded blur-sm"></div>
                        <div className="absolute top-12 right-8 w-24 h-16 bg-cyan-500/30 rounded blur-sm"></div>
                        <div className="absolute bottom-8 left-8 w-20 h-24 bg-indigo-500/30 rounded blur-sm"></div>
                      </div>
                      
                      {/* Text on Screen */}
                      <div className="relative z-10 space-y-2">
                        <div className="h-3 bg-blue-400/40 rounded w-3/4"></div>
                        <div className="h-3 bg-cyan-400/40 rounded w-1/2"></div>
                        <div className="h-3 bg-blue-400/40 rounded w-2/3"></div>
                      </div>
                      
                      {/* Bar Chart Elements */}
                      <div className="absolute bottom-4 right-4 flex gap-2 items-end">
                        <div className="w-3 h-8 bg-blue-400/50 rounded-t"></div>
                        <div className="w-3 h-12 bg-cyan-400/50 rounded-t"></div>
                        <div className="w-3 h-6 bg-blue-400/50 rounded-t"></div>
                        <div className="w-3 h-10 bg-cyan-400/50 rounded-t"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Holographic Elements */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-500/20 rounded-lg blur-xl border border-blue-400/30 transform rotate-12"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-cyan-500/20 rounded-lg blur-xl border border-cyan-400/30 transform -rotate-12"></div>
                <div className="absolute top-1/2 -right-12 w-20 h-20 bg-indigo-500/20 rounded-lg blur-xl border border-indigo-400/30 transform rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
