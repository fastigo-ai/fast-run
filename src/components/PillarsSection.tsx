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
    <section className="py-14 sm:py-24 relative bg-[#0B192C] text-white overflow-hidden border-t border-b border-slate-800/80">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-[#0070AD]/15 via-[#6366F1]/12 to-emerald-500/10 blur-[130px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-semibold text-sky-400 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Fastigo Core Architectural Model</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.15] text-white mb-4 drop-shadow-[0_2px_12px_rgba(255,255,255,0.1)]">
            Where Innovation Meets Artificial Intelligence
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Discover the cornerstone pillars powering the fastigo intelligent ecosystem.
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
                className="w-full block group relative rounded-[26px] overflow-hidden cursor-pointer bg-slate-950 border border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.55)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-500 hover:-translate-y-2"
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
