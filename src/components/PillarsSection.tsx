import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CarFront, Cpu, Leaf, Zap, ShieldCheck, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import mobilityArtwork from "../assets/innovation-topaz.jpg";
import sustainabilityArtwork from "../assets/innovation-cobalt.jpg";
import techArtwork from "../assets/innovation-aster.jpg";

const pillars = [
  {
    title: "Mobility",
    description: "Transforming the future of transportation with intelligent, connected, and autonomous solutions.",
    image: mobilityArtwork,
    icon: CarFront,
    path: "/services/mobility",
    accent: "#00A3E0",
    glowColor: "rgba(0, 163, 224, 0.22)",
    code: "MOBILITY_AI // 01",
  },
  {
    title: "Sustainability",
    description: "Driving eco-friendly innovations and smart energy management for a greener tomorrow.",
    image: sustainabilityArtwork,
    icon: Leaf,
    path: "/services/sustainability",
    accent: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.22)",
    code: "SUSTAINABILITY_AI // 02",
  },
  {
    title: "Tech",
    description: "Empowering businesses with cutting-edge software, cloud computing, and AI-driven platforms.",
    image: techArtwork,
    icon: Cpu,
    path: "/services/tech",
    accent: "#0070AD",
    glowColor: "rgba(0, 112, 173, 0.22)",
    code: "TECH_AI // 03",
  },
];

const PillarCard = ({
  pillar,
  index = 0,
}: {
  pillar: typeof pillars[0];
  index?: number;
}) => {
  const IconComponent = pillar.icon;

  return (
    <div
      className="group relative flex flex-col rounded-[26px] bg-slate-50/70 p-2.5 sm:p-3 border border-slate-200/90 transition-all duration-500 cursor-pointer shadow-[0_10px_30px_-10px_rgba(0,112,173,0.08)] hover:border-[#0070AD]/40 h-full"
      style={{
        transition: "box-shadow 0.4s ease, border-color 0.4s ease, transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    >
      {/* Dynamic Ambient Hover Glow Aura */}
      <div
        className="pointer-events-none absolute -inset-0.5 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-xl -z-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${pillar.glowColor}, transparent 70%)`,
        }}
      />

      {/* Top 3D Abstract Artwork Container with large rounded corners */}
      <div className="relative w-full h-[230px] sm:h-[290px] lg:h-[320px] rounded-[20px] overflow-hidden bg-slate-900 shadow-inner">
        <img
          src={pillar.image}
          alt={pillar.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Ambient Top & Bottom Lighting Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-black/10 pointer-events-none" />

        {/* Specular Light Shimmer Reflection */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badge / Code */}
        <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold backdrop-blur-md bg-white/90 text-slate-800 border border-white/60 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: pillar.accent }}
            />
            {pillar.code}
          </span>
        </div>
      </div>

      {/* Nested / Docked White Content Box (Overlapping Bottom) */}
      <div className="relative -mt-12 sm:-mt-18 mx-1 sm:mx-2 z-20 rounded-[20px] bg-white p-5 sm:p-7 shadow-[0_12px_32px_rgba(0,0,0,0.06)] border border-slate-100/90 transition-all duration-300 group-hover:shadow-[0_18px_40px_rgba(0,112,173,0.12)] group-hover:border-slate-200/90 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg sm:text-[22px] font-display font-bold text-[#0B192C] tracking-tight transition-colors duration-300 group-hover:text-[#0070AD]">
              {pillar.title}
            </h3>
            <div
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 shrink-0"
              style={{ backgroundColor: `${pillar.accent}15`, color: pillar.accent }}
            >
              <IconComponent size={18} strokeWidth={1.9} />
            </div>
          </div>

          <p className="mt-2.5 sm:mt-3.5 text-xs sm:text-[15px] leading-relaxed text-slate-600 font-body">
            <span className="font-semibold text-slate-800">{pillar.title}</span> : {pillar.description}
          </p>
        </div>

        {/* Action Link */}
        <div className="mt-5 sm:mt-6 pt-2">
          <Link
            to={pillar.path}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0B192C] group/link hover:text-[#0070AD] transition-colors duration-200"
          >
            <span className="underline underline-offset-4 decoration-slate-300 group-hover/link:decoration-[#0070AD] transition-all">
              Learn More
            </span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#0070AD]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const PillarsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % pillars.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + pillars.length) % pillars.length);
  }, []);

  const goToSlide = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Auto-scroll every 5 seconds on mobile
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide, currentIndex]);

  return (
    <section className="py-12 sm:py-20 pb-16 sm:pb-28 relative bg-[#F4F8FC]/80 border-t border-b border-slate-200/50">
      <div className="container mx-auto px-5 sm:px-4 max-w-[1240px] relative z-10">
        {/* Modernised Mission & Innovation Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-14"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
            <h2 className="text-[28px] sm:text-4xl md:text-[44px] font-display font-bold text-[#0E0A42] tracking-tight leading-[1.15]">
              Where Innovation Meets <span className="bg-gradient-to-r from-[#0070AD] via-[#0091df] to-[#00A3E0] bg-clip-text text-transparent">AI</span>
            </h2>
            {/* Mobile Slide Counter */}
            <div className="md:hidden inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 font-mono self-start">
              <span className="text-[#0070AD] font-bold">0{currentIndex + 1}</span>
              <span>/</span>
              <span>0{pillars.length}</span>
            </div>
          </div>

          {/* Modernised Glassmorphic Content Card */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/80 p-5 sm:p-8 lg:p-10 shadow-[0_10px_35px_-5px_rgba(0,112,173,0.07)] overflow-hidden">
            {/* Top subtle highlight gradient */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#0070AD]/40 to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
              {/* Main Text Content */}
              <div className="lg:col-span-8 space-y-4">
                <p className="text-[15px] sm:text-[17px] text-slate-800 font-medium font-body leading-relaxed">
                  <span className="font-bold text-[#0E0A42]">fastigo</span> is an AI-powered innovation platform that empowers businesses to automate operations, enhance productivity, and scale faster through intelligent solutions.
                </p>
                <p className="text-sm sm:text-[15px] text-slate-600 font-body leading-relaxed">
                  By integrating advanced AI technologies with practical execution, we streamline workflows, reduce manual effort, and unlock new growth opportunities. Our solutions are designed to be scalable, efficient, and results-driven, helping organizations stay competitive in a rapidly evolving digital landscape.
                </p>
                <p className="text-sm sm:text-[15px] text-slate-600 font-body leading-relaxed">
                  From AI agents to custom automation tools, fastigo transforms complex challenges into simple, effective systems. We bridge the gap between ideas and execution, delivering impactful digital experiences that drive measurable business success and long-term value for modern enterprises.
                </p>
              </div>

              {/* Right Side Feature Highlights */}
              <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-8 pt-4 lg:pt-0">
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50/90 border border-slate-200/60 transition-all hover:bg-blue-50/60 hover:border-blue-200/70">
                  <div className="w-9 h-9 rounded-xl bg-blue-100/70 flex items-center justify-center text-[#0070AD] shrink-0 shadow-sm">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[13px] font-bold text-[#0E0A42] block">Intelligent Automation</span>
                    <span className="text-[11px] text-slate-500 font-medium">Workflows & Productivity</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50/90 border border-slate-200/60 transition-all hover:bg-blue-50/60 hover:border-blue-200/70">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100/70 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[13px] font-bold text-[#0E0A42] block">Scalable Systems</span>
                    <span className="text-[11px] text-slate-500 font-medium">Enterprise-grade execution</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50/90 border border-slate-200/60 transition-all hover:bg-blue-50/60 hover:border-blue-200/70">
                  <div className="w-9 h-9 rounded-xl bg-cyan-100/70 flex items-center justify-center text-[#00A3E0] shrink-0 shadow-sm">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[13px] font-bold text-[#0E0A42] block">Measurable ROI</span>
                    <span className="text-[11px] text-slate-500 font-medium">Long-term value creation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Desktop Pillars Grid (md and up) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8 lg:gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, scale: 1.025 }}
              className="h-full"
            >
              <PillarCard pillar={pillar} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Auto-Scrolling Carousel (< md) */}
        <div 
          className="block md:hidden relative"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative overflow-hidden px-1 py-1 min-h-[440px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({
                    x: dir > 0 ? "100%" : "-100%",
                    opacity: 0,
                    scale: 0.95,
                  }),
                  center: {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    transition: {
                      x: { type: "spring", stiffness: 280, damping: 28 },
                      opacity: { duration: 0.35 },
                    },
                  },
                  exit: (dir: number) => ({
                    x: dir > 0 ? "-100%" : "100%",
                    opacity: 0,
                    scale: 0.95,
                    transition: {
                      x: { type: "spring", stiffness: 280, damping: 28 },
                      opacity: { duration: 0.3 },
                    },
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, { offset, velocity }) => {
                  if (offset.x < -40 || velocity.x < -200) {
                    nextSlide();
                  } else if (offset.x > 40 || velocity.x > 200) {
                    prevSlide();
                  }
                }}
                className="w-full cursor-grab active:cursor-grabbing"
              >
                <PillarCard pillar={pillars[currentIndex]} index={currentIndex} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls & Auto-Scroll Pagination Indicators with Slide Counter */}
          <div className="flex items-center justify-between mt-4 px-2">
            <button
              onClick={prevSlide}
              aria-label="Previous Box"
              className="p-2.5 rounded-full bg-white border border-slate-200/90 shadow-sm text-slate-700 hover:text-[#0070AD] hover:border-[#0070AD]/40 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Pagination Dots with 5-second progress animation */}
            <div className="flex items-center gap-2">
              {pillars.map((pillar, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={pillar.title}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to slide ${pillar.title}`}
                    className="relative h-2 rounded-full transition-all duration-300 overflow-hidden"
                    style={{
                      width: isActive ? "32px" : "8px",
                      backgroundColor: isActive ? `${pillar.accent}30` : "#CBD5E1",
                    }}
                  >
                    {isActive && (
                      <motion.div
                        key={`progress-${currentIndex}-${isPaused}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: isPaused ? 0 : 5, ease: "linear" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: pillar.accent }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={nextSlide}
              aria-label="Next Box"
              className="p-2.5 rounded-full bg-white border border-slate-200/90 shadow-sm text-slate-700 hover:text-[#0070AD] hover:border-[#0070AD]/40 active:scale-95 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;
