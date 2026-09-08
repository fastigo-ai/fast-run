import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CarFront, Cpu, Leaf } from "lucide-react";
import { motion } from "framer-motion";
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
  index,
}: {
  pillar: typeof pillars[0];
  index: number;
}) => {
  const IconComponent = pillar.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10, scale: 1.025 }}
      className="group relative flex flex-col rounded-[26px] bg-slate-50/70 p-2.5 sm:p-3 border border-slate-200/90 transition-all duration-500 cursor-pointer shadow-[0_10px_30px_-10px_rgba(0,112,173,0.08)] hover:border-[#0070AD]/40"
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
      <div className="relative w-full h-[270px] sm:h-[300px] lg:h-[320px] rounded-[20px] overflow-hidden bg-slate-900 shadow-inner">
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
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md bg-white/90 text-slate-800 border border-white/60 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: pillar.accent }}
            />
            {pillar.code}
          </span>
        </div>
      </div>

      {/* Nested / Docked White Content Box (Overlapping Bottom) */}
      <div className="relative -mt-16 sm:-mt-20 mx-1.5 sm:mx-2 z-20 rounded-[20px] bg-white p-6 sm:p-7 shadow-[0_12px_32px_rgba(0,0,0,0.06)] border border-slate-100/90 transition-all duration-300 group-hover:shadow-[0_18px_40px_rgba(0,112,173,0.12)] group-hover:border-slate-200/90 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl sm:text-[22px] font-display font-bold text-[#0B192C] tracking-tight transition-colors duration-300 group-hover:text-[#0070AD]">
              {pillar.title}
            </h3>
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 shrink-0"
              style={{ backgroundColor: `${pillar.accent}15`, color: pillar.accent }}
            >
              <IconComponent size={20} strokeWidth={1.9} />
            </div>
          </div>

          <p className="mt-3.5 text-sm sm:text-[15px] leading-relaxed text-slate-600 font-body">
            <span className="font-semibold text-slate-800">{pillar.title}</span> : {pillar.description}
          </p>
        </div>

        {/* Action Link */}
        <div className="mt-6 pt-2">
          <Link
            to={pillar.path}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B192C] group/link hover:text-[#0070AD] transition-colors duration-200"
          >
            <span className="underline underline-offset-4 decoration-slate-300 group-hover/link:decoration-[#0070AD] transition-all">
              Learn More
            </span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#0070AD]" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const PillarsSection = () => {
  return (
    <section className="py-20 pb-28 relative">
      <div className="container mx-auto px-4 max-w-[1240px] relative z-10">
        {/* Unified Mission Header */}
        <div className="mb-14 lg:max-w-6xl">
          <h2 className="text-4xl md:text-[46px] font-display font-bold text-[#0B192C] mb-6 tracking-tight leading-tight">
            Where Innovation Meets AI
          </h2>
          <p className="text-[16px] text-slate-600 font-body leading-relaxed lg:max-w-6xl mb-12">
            fastigo is an AI-powered innovation platform that empowers businesses to automate operations,
            enhance productivity, and scale faster through intelligent solutions. By integrating advanced AI
            technologies with practical execution, we streamline workflows, reduce manual effort, and unlock
            new growth opportunities. Our solutions are designed to be scalable, efficient, and results-driven,
            helping organizations stay competitive in a rapidly evolving digital landscape. From AI agents to
            custom automation tools, fastigo transforms complex challenges into simple, effective systems. We
            bridge the gap between ideas and execution, delivering impactful digital experiences that drive
            measurable business success and long-term value for modern enterprises.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8 lg:gap-8">
          {pillars.map((pillar, index) => (
            <PillarCard key={pillar.title} pillar={pillar} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;
