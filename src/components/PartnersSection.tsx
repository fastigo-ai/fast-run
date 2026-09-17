import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface PartnerItem {
  name: string;
  subtitle: string;
  website: string;
  iconBg: string;
  arrowBg: string;
  arrowColor: string;
  icon: React.ReactNode;
  positionClass: string;
  floatDuration: number;
  floatDelay: number;
}

const partnersData: PartnerItem[] = [
  {
    name: "Anthropic",
    subtitle: "Safer, more helpful AI systems.",
    website: "https://www.anthropic.com",
    iconBg: "bg-[#FAEDE5]",
    arrowBg: "bg-[#FAEDE5]",
    arrowColor: "text-[#CC785C]",
    positionClass: "lg:top-0 lg:left-2",
    floatDuration: 4.2,
    floatDelay: 0,
    icon: (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-[#CC785C]"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
      </svg>
    ),
  },
  {
    name: "ChatGPT",
    subtitle: "More intelligent conversations.",
    website: "https://chatgpt.com",
    iconBg: "bg-[#10A37F]",
    arrowBg: "bg-[#E6F8F3]",
    arrowColor: "text-[#10A37F]",
    positionClass: "lg:top-[152px] lg:left-8",
    floatDuration: 4.8,
    floatDelay: 0.6,
    icon: (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z" />
      </svg>
    ),
  },
  {
    name: "ElevenLabs",
    subtitle: "Realistic voice. Infinite possibilities.",
    website: "https://elevenlabs.io",
    iconBg: "bg-[#EBF3FE]",
    arrowBg: "bg-[#EBF3FE]",
    arrowColor: "text-[#1D68EE]",
    positionClass: "lg:top-[74px] lg:right-0",
    floatDuration: 4.5,
    floatDelay: 1.1,
    icon: (
      <svg
        className="w-6 h-6 text-[#1D68EE]"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <rect x="5" y="3" width="4.8" height="18" rx="2.4" />
        <rect x="14.2" y="3" width="4.8" height="18" rx="2.4" />
      </svg>
    ),
  },
];

const PartnersSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#FAFBFD] via-white to-[#F9FAFD] py-16 sm:py-20 lg:py-24 border-t border-b border-slate-200/80">
      {/* Background Soft Gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-100/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-purple-100/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1240px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
          
          {/* Left Column: Heading, Subtitle & Ecosystem Badge */}
          <div className="lg:col-span-5 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEECFC] mb-5 sm:mb-6 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]" />
              <span className="font-mono text-xs font-bold tracking-widest text-[#4F46E5] uppercase">
                OUR ECOSYSTEM
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0E0A42] tracking-tight leading-[1.08] mb-5 sm:mb-6">
              Partners in{" "}
              <span className="block sm:inline lg:block text-[#0E0A42]">
                Change
              </span>
            </h2>

            {/* Subtitle Description */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-body mb-8 sm:mb-10 max-w-md mx-auto lg:mx-0">
              We collaborate with leading AI companies to build smarter solutions,
              drive innovation and create a better tomorrow.
            </p>

            {/* Bottom Accent: Gradient Bar + Tagline */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="w-12 h-1 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded-full" />
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-slate-400 uppercase">
                BETTER TOGETHER
              </span>
            </div>
          </div>

          {/* Right Column: Floating Stepped Cards with Connecting Orbit Line & Spheres */}
          <div className="lg:col-span-7 relative w-full max-w-[680px] mx-auto min-h-[380px] lg:min-h-[350px] flex items-center justify-center">
            
            {/* Ambient Colored Soft Glowing Blobs behind cards */}
            <div className="absolute top-0 left-4 w-60 h-36 bg-[#FDBA74]/25 rounded-full blur-[55px] pointer-events-none" />
            <div className="absolute bottom-2 left-10 w-60 h-36 bg-[#6EE7B7]/25 rounded-full blur-[55px] pointer-events-none" />
            <div className="absolute top-8 right-2 w-72 h-44 bg-[#DDD6FE]/40 rounded-full blur-[65px] pointer-events-none" />

            {/* Connecting Orbit Arc SVG Line */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block overflow-visible"
              viewBox="0 0 680 350"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 280 40 C 440 10, 680 40, 650 175 C 620 285, 460 340, 270 310"
                stroke="url(#orbitGradient)"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                opacity="0.65"
              />
              <defs>
                <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#A855F7" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.4" />
                </linearGradient>
              </defs>
            </svg>

            {/* 3D Glossy Floating Spheres on Orbit */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[40px] right-[210px] w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#3B82F6] via-[#6366F1] to-[#EC4899] shadow-[0_4px_10px_rgba(99,102,241,0.5)] pointer-events-none hidden lg:block z-10"
            />
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute bottom-[24px] right-[190px] w-4 h-4 rounded-full bg-gradient-to-tr from-[#00A3FF] via-[#6366F1] to-[#D946EF] shadow-[0_4px_12px_rgba(99,102,241,0.5)] pointer-events-none hidden lg:block z-10"
            />

            {/* Floating Cards Stage */}
            <div className="relative w-full flex flex-col gap-4 lg:block lg:h-[330px]">
              {partnersData.map((partner) => (
                <motion.a
                  key={partner.name}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: partner.floatDuration,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: partner.floatDelay,
                  }}
                  whileHover={{ y: -12, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative lg:absolute ${partner.positionClass} z-20 w-full sm:w-[320px] lg:w-[320px] mx-auto lg:mx-0 p-3.5 sm:p-4 rounded-[24px] bg-white/95 backdrop-blur-xl border border-white/90 shadow-[0_12px_36px_rgba(15,23,42,0.07)] hover:shadow-[0_20px_45px_rgba(0,112,173,0.14)] hover:border-slate-200 transition-all duration-300 flex items-center justify-between gap-3.5 group cursor-pointer`}
                >
                  {/* Left: Icon Rounded Box */}
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[18px] ${partner.iconBg} flex items-center justify-center p-2.5 shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-300`}
                  >
                    {partner.icon}
                  </div>

                  {/* Middle: Brand Name & Subtitle */}
                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className="font-display font-bold text-lg sm:text-[19px] text-[#0E0A42] leading-tight mb-1 group-hover:text-[#0070AD] transition-colors">
                      {partner.name}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-500 font-medium leading-snug truncate">
                      {partner.subtitle}
                    </p>
                  </div>

                  {/* Right: Circular Arrow Action Button */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${partner.arrowBg} ${partner.arrowColor} flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 transition-all duration-300`}
                  >
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </motion.a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
