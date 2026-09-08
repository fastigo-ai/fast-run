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
          <div className="w-full mb-16 flex justify-center">
            <div className="container px-4 text-center max-w-3xl">
              <h2 className="text-3xl md:text-[44px] font-display font-semibold text-[#0B192C] mb-4 tracking-tight">
                Careers
              </h2>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed font-normal">
                If you share our love for engineering and innovation, we'll
                provide you with all the tools and platforms to navigate your
                growth journey. Join us to engineer the change you envision!
              </p>
              <a
                href="/careers"
                className="inline-block bg-[#0070AD] text-white px-8 py-3.5 rounded-xl text-sm font-semibold tracking-wide hover:bg-[#005c8f] hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300"
              >
                Explore Opportunities
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
