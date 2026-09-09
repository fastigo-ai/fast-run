import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

import PillarsSection from "@/components/PillarsSection";
import ReviewsSection from "@/components/ReviewsSection";
import InsightsSection from "@/components/InsightsSection";
import PartnersSection from "@/components/PartnersSection";
import Footer from "@/components/Footer";

import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Fastigo | AI Agents, Machine Learning & Enterprise IT Solutions — Fastigo Technology";
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background">
      {/* Navbar */}

      {/* Background */}
      <AnimatedBackground />

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 grid-pattern pointer-events-none z-0" />

      {/* Main Content Wrapper */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Main */}
        <main className="w-full flex flex-col items-center">
          {/* Each section wrapped to enforce centering */}
          <div className="w-full flex flex-col justify-center">
            <HeroSection />
          </div>
          
          {/* Mission & Pillars Combined Section */}
          <div className="w-full">
            <PillarsSection />
          </div>
          <div className="w-full">
            <InsightsSection />
          </div>
          <div className="w-full">
            <PartnersSection />
          </div>
          <div className="w-full">
            <ReviewsSection />
          </div>
          <div className="w-full mb-16 sm:mb-24 flex justify-center">
            <div className="container px-5 sm:px-4 text-center max-w-3xl">
              <h2 className="text-[28px] sm:text-3xl md:text-[44px] font-display font-semibold text-[#0E0A42] mb-4 tracking-tight">
                Careers
              </h2>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed text-[15px] sm:text-base font-normal">
                If you share our love for engineering and innovation, we'll
                provide you with all the tools and platforms to navigate your
                growth journey. Join us to engineer the change you envision!
              </p>
              <a
                href="/careers"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0E0A42] to-[#0070AD] hover:from-[#080526] hover:to-[#005a8c] text-white px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide shadow-[0_8px_24px_rgba(14,10,66,0.25)] hover:shadow-[0_12px_32px_rgba(0,112,173,0.35)] hover:scale-[1.02] transition-all duration-300"
              >
                <span>Explore Opportunities</span>
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
