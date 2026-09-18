import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  Sparkles,
  LucideIcon,
  CarFront,
  Leaf,
  BrainCircuit,
  ShieldCheck,
  Cpu,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

// High quality topic images tailored to Fastigo's 5 core pillars
import mobilityArtwork from "../assets/insight_mobility.jpg";
import cleantechArtwork from "../assets/innovation_cleantech.jpg";
import aiArtwork from "../assets/insight_agentic_ai.jpg";
import cyberArtwork from "../assets/innovation_fintech.jpg";
import iotArtwork from "../assets/innovation_spatial.jpg";

interface FastigoPillar {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  path: string;
  accent: string;
  glowColor: string;
  code: string;
  heightClass: string;
}

const fastigoModelPillars: FastigoPillar[] = [
  {
    id: "fastigo-mobility",
    title: "Mobility",
    description: "Transforming transportation with intelligent, connected, and autonomous solutions. Seamlessly combining digital AI and physical engineering to redefine modern transit.",
    image: mobilityArtwork,
    icon: CarFront,
    path: "/services/mobility",
    accent: "#00A3E0",
    glowColor: "rgba(0, 163, 224, 0.35)",
    code: "FASTIGO // MOBILITY",
    heightClass: "h-[420px] sm:h-[470px] lg:h-[510px] xl:h-[530px]",
  },
  {
    id: "fastigo-sustainability",
    title: "Sustainability",
    description: "Driving eco-friendly innovations and smart energy management for a greener tomorrow. Empowering enterprises to track, report, and eliminate carbon waste effectively.",
    image: cleantechArtwork,
    icon: Leaf,
    path: "/services/sustainability",
    accent: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.35)",
    code: "FASTIGO // SUSTAINABILITY",
    heightClass: "h-[420px] sm:h-[470px] lg:h-[510px] xl:h-[530px]",
  },
  {
    id: "fastigo-ai-analytics",
    title: "AI & Data Analytics",
    description: "Extracting actionable value from complex data at scale. Deploying cognitive architectures and machine learning systems that automate decisions and accelerate growth.",
    image: aiArtwork,
    icon: BrainCircuit,
    path: "/services/artificial-intelligence",
    accent: "#6366F1",
    glowColor: "rgba(99, 102, 241, 0.35)",
    code: "FASTIGO // AI_DATA",
    heightClass: "h-[420px] sm:h-[470px] lg:h-[510px] xl:h-[530px]",
  },
  {
    id: "fastigo-cybersecurity",
    title: "Cybersecurity & Cloud",
    description: "Protecting modern enterprises with zero-trust architectures and proactive threat intelligence. Safeguarding digital assets and mission-critical cloud workloads 24/7.",
    image: cyberArtwork,
    icon: ShieldCheck,
    path: "/services/cybersecurity",
    accent: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.35)",
    code: "FASTIGO // SECURITY",
    heightClass: "h-[420px] sm:h-[470px] lg:h-[510px] xl:h-[530px]",
  },
  {
    id: "fastigo-iot-engineering",
    title: "IoT & Digital Engineering",
    description: "Bridging physical hardware and digital networks with smart connected devices. Harnessing real-time edge telemetry and digital twin models for next-gen performance.",
    image: iotArtwork,
    icon: Cpu,
    path: "/services/iot-and-digital-engineering",
    accent: "#A855F7",
    glowColor: "rgba(168, 85, 247, 0.35)",
    code: "FASTIGO // IOT_TWIN",
    heightClass: "h-[420px] sm:h-[470px] lg:h-[510px] xl:h-[530px]",
  },
];

export const PillarsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const progress = scrollLeft / maxScroll;
    const index = Math.round(progress * (fastigoModelPillars.length - 1));
    setActiveIndex(Math.max(0, Math.min(index, fastigoModelPillars.length - 1)));
  };

  const handleScrollBy = (offset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const scrollToCard = (index: number) => {
    if (!scrollContainerRef.current) return;
    const children = scrollContainerRef.current.children;
    if (children[index]) {
      (children[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-[#F8FAFD] via-[#F1F6FB] to-[#F8FAFD] text-white border-t border-[#081921] border-b border-sky-100/90">
      {/* 75% Top Split Background colored with #081921 (RGB: 8, 25, 33) */}
      <div 
        className="absolute top-0 inset-x-0 h-[75%] pointer-events-none" 
        style={{ backgroundColor: "#081921" }} 
      />
      {/* 75% Split Laser Accent Line */}
      <div className="absolute top-[75%] inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00A3E0]/30 to-transparent pointer-events-none z-[1]" />

      {/* AI THEMED BACKGROUND CANVAS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Top & Bottom Cyber Border Laser Lights */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#0070AD]/30 to-transparent" />
        <div className="absolute top-0 left-0 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#00A3E0] to-transparent animate-beam-move" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#0070AD]/25 to-transparent" />

        {/* Ambient AI Energy Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-gradient-to-b from-[#00A3E0]/20 via-[#0070AD]/10 to-transparent blur-[130px] rounded-full" />
        <div className="absolute top-1/2 -left-32 -translate-y-1/2 w-[500px] h-[500px] bg-sky-400/8 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 -right-32 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/6 blur-[120px] rounded-full" />

        {/* Precision AI Matrix Crosshair Grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-45"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="ai-precision-grid"
              width="64"
              height="64"
              patternUnits="userSpaceOnUse"
            >
              {/* Center Dot */}
              <circle cx="32" cy="32" r="1" fill="#00A3E0" fillOpacity="0.4" />
              {/* Precision Crosshair Marker */}
              <path
                d="M 30 32 L 34 32 M 32 30 L 32 34"
                stroke="#00A3E0"
                strokeWidth="0.6"
                strokeOpacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ai-precision-grid)" />
        </svg>

        {/* AI Circuit Buslines & Neural Synapse Paths */}
        <svg
          className="absolute inset-0 w-full h-full opacity-35"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circuit Trace Left */}
          <path
            d="M -50 160 L 220 160 L 320 260 L 480 260"
            stroke="url(#circuit-grad-1)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <circle cx="220" cy="160" r="3" fill="#00A3E0" />
          <circle cx="320" cy="260" r="2.5" fill="#0070AD" />
          <circle cx="480" cy="260" r="4" fill="#00A3E0" fillOpacity="0.8" />

          {/* Circuit Trace Right */}
          <path
            d="M 1500 200 L 1220 200 L 1100 320 L 940 320"
            stroke="url(#circuit-grad-2)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <circle cx="1220" cy="200" r="3" fill="#00A3E0" />
          <circle cx="1100" cy="320" r="2.5" fill="#0070AD" />
          <circle cx="940" cy="320" r="4" fill="#00A3E0" fillOpacity="0.8" />

          {/* Low Circuit Bottom */}
          <path
            d="M 120 820 L 360 820 L 440 740 L 700 740"
            stroke="url(#circuit-grad-1)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <path
            d="M 1320 800 L 1140 800 L 1060 720 L 850 720"
            stroke="url(#circuit-grad-2)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />

          <defs>
            <linearGradient id="circuit-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0070AD" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#00A3E0" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0070AD" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="circuit-grad-2" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#0070AD" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#00A3E0" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0070AD" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-[1400px] relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.15] text-white mb-4 drop-shadow-sm">
            Where Innovation Meets Artificial Intelligence
          </h2>

          <p className="text-sm sm:text-base text-white font-normal leading-relaxed drop-shadow-sm px-2">
            Discover the cornerstone pillars powering the Fastigo intelligent ecosystem.
          </p>
        </motion.div>

        {/* Mobile Swipe Navigation Controls */}
        <div className="flex sm:hidden items-center justify-between px-1 mb-3 text-xs text-sky-200/80">
          <span className="flex items-center gap-1.5 font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#00A3E0] animate-ping" />
            Swipe to explore pillars
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScrollBy(-280)}
              aria-label="Scroll left"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white backdrop-blur-sm border border-white/15 transition-all shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScrollBy(280)}
              aria-label="Scroll right"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white backdrop-blur-sm border border-white/15 transition-all shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5-Card Layout: Side-Scroll Track on Mobile, Masonry Grid on Desktop */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 px-4 sm:px-0 -mx-4 sm:mx-0 snap-x snap-mandatory sm:snap-none scrollbar-none items-start touch-pan-x"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {fastigoModelPillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="w-[82vw] max-w-[310px] sm:w-full sm:max-w-none shrink-0 sm:shrink snap-center sm:snap-align-none h-full"
            >
              <Link
                to={pillar.path}
                className="w-full block group relative rounded-[26px] overflow-hidden cursor-pointer bg-slate-900 border border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_24px_50px_rgba(0,163,224,0.25)] transition-all duration-500 hover:-translate-y-2"
              >
                {/* Outer Ambient Glow on Hover */}
                <div
                  className="pointer-events-none absolute -inset-0.5 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-lg -z-10"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${pillar.glowColor}, transparent 75%)`,
                  }}
                />

                {/* Card Container with Staggered Height */}
                <div className={`relative w-full ${pillar.heightClass} flex flex-col justify-end overflow-hidden p-5 sm:p-6`}>
                  {/* Full-bleed Topic Image */}
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Gradient Scrims for Perfect Text Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none opacity-90 group-hover:opacity-95 transition-opacity" />

                  {/* BOTTOM: Main Heading always visible, Content reveals on hover */}
                  <div className="relative z-20">
                    <h3 className="text-xl sm:text-2xl lg:text-[26px] font-display font-bold text-white tracking-tight leading-snug drop-shadow-md transition-colors duration-300">
                      {pillar.title}
                    </h3>

                    {/* Content visible on mobile, reveals on hover on desktop */}
                    <div className="grid grid-rows-[1fr] sm:grid-rows-[0fr] sm:group-hover:grid-rows-[1fr] transition-all duration-400 ease-out">
                      <div className="overflow-hidden">
                        <p className="pt-2 text-xs sm:text-sm text-white/90 sm:text-white font-normal leading-relaxed line-clamp-2 sm:line-clamp-3 drop-shadow opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-400 delay-75">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Pagination Indicator Dots */}
        <div className="flex sm:hidden justify-center items-center gap-1.5 mt-4">
          {fastigoModelPillars.map((pillar, idx) => (
            <button
              key={pillar.id}
              onClick={() => scrollToCard(idx)}
              aria-label={`Go to ${pillar.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "w-6 bg-[#00A3E0]"
                  : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;
