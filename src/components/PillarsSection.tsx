import React from "react";
import { Link } from "react-router-dom";
import { 
  Sparkles,
  LucideIcon,
  CarFront,
  Leaf,
  BrainCircuit,
  ShieldCheck,
  Cpu
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
    heightClass: "h-[450px] lg:h-[480px] xl:h-[500px]",
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
    heightClass: "h-[400px] lg:h-[430px] xl:h-[440px]",
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
    heightClass: "h-[470px] lg:h-[510px] xl:h-[530px]",
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
    heightClass: "h-[410px] lg:h-[440px] xl:h-[450px]",
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
    heightClass: "h-[440px] lg:h-[470px] xl:h-[490px]",
  },
];

export const PillarsSection = () => {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-[#F8FAFD] via-[#F1F6FB] to-[#F8FAFD] text-slate-900 border-t border-b border-sky-100/90">
      {/* AI THEMED BACKGROUND CANVAS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Top & Bottom Cyber Border Laser Lights */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#0070AD]/30 to-transparent" />
        <div className="absolute top-0 left-0 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#00A3E0] to-transparent animate-beam-move" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#0070AD]/25 to-transparent" />

        {/* Ambient AI Energy Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-gradient-to-b from-[#00A3E0]/14 via-[#0070AD]/08 to-transparent blur-[130px] rounded-full" />
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
              <circle cx="32" cy="32" r="1" fill="#0070AD" fillOpacity="0.3" />
              {/* Precision Crosshair Marker */}
              <path
                d="M 30 32 L 34 32 M 32 30 L 32 34"
                stroke="#0070AD"
                strokeWidth="0.6"
                strokeOpacity="0.25"
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-sky-200/90 text-xs font-semibold text-[#0070AD] mb-4 shadow-[0_2px_12px_rgba(0,112,173,0.08)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0070AD]" />
            </span>
            <span>Fastigo Core Architectural Model</span>
            <span className="text-slate-300 font-light">|</span>
            <span className="text-[10px] font-mono font-medium text-sky-600 tracking-wider">AI MATRIX</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.15] text-[#0E0A42] mb-4">
            Where Innovation Meets{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070AD] via-[#00A3E0] to-[#0070AD]">
              Artificial Intelligence
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Discover the cornerstone pillars powering the Fastigo intelligent ecosystem.
          </p>
        </motion.div>

        {/* 5-Card Pinterest-Style Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-start">
          {fastigoModelPillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              <Link
                to={pillar.path}
                className="w-full block group relative rounded-[26px] overflow-hidden cursor-pointer bg-slate-900 border border-slate-200/90 shadow-[0_10px_30px_rgba(0,112,173,0.08)] hover:shadow-[0_20px_45px_rgba(0,112,173,0.18)] transition-all duration-500 hover:-translate-y-2"
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
                    <h3 className="text-2xl sm:text-[26px] font-display font-bold text-white tracking-tight leading-snug drop-shadow-md group-hover:text-sky-300 transition-colors duration-300">
                      {pillar.title}
                    </h3>

                    {/* Content reveals on hover */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-400 ease-out">
                      <div className="overflow-hidden">
                        <p className="pt-2.5 text-[13px] sm:text-sm text-slate-200/90 font-normal leading-relaxed line-clamp-3 drop-shadow opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-75">
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
      </div>
    </section>
  );
};

export default PillarsSection;
