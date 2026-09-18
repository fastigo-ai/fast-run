import React from "react";
import { motion } from "framer-motion";

interface PartnerItem {
  name: string;
  subtitle: string;
  iconBg: string;
  icon: React.ReactNode;
  positionClass: string;
  floatDuration: number;
  floatDelay: number;
}

const partnersData: PartnerItem[] = [
  {
    name: "Anthropic",
    subtitle: "Safer, more helpful AI systems & Claude.",
    iconBg: "bg-white border border-stone-200/90 shadow-xs",
    positionClass: "lg:top-0 lg:left-2",
    floatDuration: 4.2,
    floatDelay: 0,
    icon: (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-[#191919]"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-label="Anthropic"
      >
        <path d="M13.992 3.5h3.044l6.964 17h-3.082l-1.574-3.908H12.65L11.077 20.5H8L13.992 3.5zm3.929 10.743L16.48 9.873l-1.442 4.37h2.883zM0 20.5l5.992-17h3.045L3.045 20.5H0z" />
      </svg>
    ),
  },
  {
    name: "OpenAI",
    subtitle: "Frontier AI research & intelligent models.",
    iconBg: "bg-white border border-slate-200/90 shadow-xs",
    positionClass: "lg:top-[152px] lg:left-8",
    floatDuration: 4.8,
    floatDelay: 0.6,
    icon: (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-[#000000]"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-label="OpenAI"
      >
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.6073 8.3829l2.02-1.1683a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6815zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L8.907 9.2297V6.8974a.0662.0662 0 0 1 .0331-.0615L13.92 3.9678a4.4992 4.4992 0 0 1 6.5308 4.7597zM9.6075 12.8718L6.8633 11.288l2.7442-1.5838 2.7441 1.5838-2.7441 1.5838zm1.4428-2.6171l2.7441-1.5838 2.7442 1.5838-2.7442 1.5838-2.7441-1.5838zm-1.4428 5.0345l-2.7442-1.5838v-3.1676l2.7442 1.5838v3.1676zm5.4883 0l-2.7442-1.5838v-3.1676l2.7442 1.5838v3.1676z" />
      </svg>
    ),
  },
  {
    name: "ElevenLabs",
    subtitle: "Realistic voice AI & speech synthesis.",
    iconBg: "bg-white border border-slate-200/90 shadow-xs",
    positionClass: "lg:top-[74px] lg:right-0",
    floatDuration: 4.5,
    floatDelay: 1.1,
    icon: (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-[#000000]"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-label="ElevenLabs"
      >
        <path d="M4.5 2a2.5 2.5 0 0 0-2.5 2.5v15A2.5 2.5 0 0 0 4.5 22h1A2.5 2.5 0 0 0 8 19.5v-15A2.5 2.5 0 0 0 5.5 2h-1zm14 0a2.5 2.5 0 0 0-2.5 2.5v15a2.5 2.5 0 0 0 2.5 2.5h1a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 19.5 2h-1z" />
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
                <motion.div
                  key={partner.name}
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
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`relative lg:absolute ${partner.positionClass} z-20 w-full sm:w-[320px] lg:w-[320px] mx-auto lg:mx-0 p-3.5 sm:p-4 rounded-[24px] bg-white/95 backdrop-blur-xl border border-white/90 shadow-[0_12px_36px_rgba(15,23,42,0.07)] hover:shadow-[0_20px_45px_rgba(0,112,173,0.12)] hover:border-slate-200 transition-all duration-300 flex items-center gap-3.5 select-none`}
                >
                  {/* Left: Icon Rounded Box with original logo */}
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[18px] ${partner.iconBg} flex items-center justify-center p-2.5 shrink-0 shadow-2xs`}
                  >
                    {partner.icon}
                  </div>

                  {/* Middle: Brand Name & Subtitle */}
                  <div className="flex-1 min-w-0 pr-1">
                    <h3 className="font-display font-bold text-lg sm:text-[19px] text-[#0E0A42] leading-tight mb-1">
                      {partner.name}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-500 font-medium leading-snug truncate">
                      {partner.subtitle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
