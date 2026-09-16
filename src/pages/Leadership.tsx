import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Linkedin, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import Lalit from "@/assets/lalit4.webp";

interface Leader {
  role: string;
  name: string;
  bio: string;
  image: string;
  linkedin: string;
}

const boardOfDirectors: Leader[] = [
  {
    role: "Director & Chief Marketing Officer",
    name: "Lalit Kumar Sirsu",
    bio: "Lalit Kumar Sirsu serves as the Director & Chief Marketing Officer, bringing extensive experience in strategic marketing, institutional engagement, and public-sector collaboration. With a strong network across the Government and PSU ecosystem, he plays a key role in building high-impact partnerships and driving sustainable growth initiatives. Over the years, he has led large-scale engagement programs, strengthened stakeholder relationships, and aligned marketing strategies with governance frameworks and national digital transformation goals. His leadership combines vision, execution excellence, and policy-aligned innovation — reinforcing long-term value creation and organizational credibility.",
    image: Lalit,
    linkedin: "https://www.linkedin.com/in/lalit-kumar-86ba84bb/",
  },
];

const LeaderCard = ({ leader, index }: { leader: Leader; index: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="grid md:grid-cols-12 gap-0 bg-white rounded-[28px] border border-slate-200/90 shadow-[0_12px_40px_rgba(11,25,44,0.06)] hover:shadow-[0_24px_56px_rgba(0,112,173,0.18)] hover:border-[#0070AD]/40 transition-all duration-500 overflow-hidden">
        
        {/* Left Column: Text Content & Bio */}
        <div
          className={`p-8 sm:p-10 md:p-12 md:col-span-7 flex flex-col justify-center ${
            index % 2 === 1 ? "md:order-2" : ""
          }`}
        >
          {/* Role Pill */}
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-[#0070AD] bg-sky-50 border border-sky-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0070AD] animate-pulse" />
              {leader.role}
            </span>
          </div>

          {/* Name Heading with Hover Accent */}
          <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0E0A42] mb-5 tracking-tight group-hover:text-[#0070AD] transition-colors duration-300">
            {leader.name}
          </h3>

          {/* Bio Text */}
          <p
            className={`text-slate-600 leading-relaxed text-sm sm:text-base font-body ${
              !expanded ? "line-clamp-4 md:line-clamp-none" : ""
            }`}
          >
            {leader.bio}
          </p>

          {/* Mobile Read More Toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="md:hidden mt-3 text-[#0070AD] font-semibold text-sm flex items-center gap-1 hover:underline"
          >
            {expanded ? "Show less" : "Read full bio"}
          </button>

          {/* Verified Credential & LinkedIn Action */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Board of Directors // Governance Lead</span>
            </div>

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href={leader.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-50 hover:bg-[#0070AD] text-[#0070AD] hover:text-white border border-sky-200 hover:border-[#0070AD] transition-all duration-300 text-xs font-semibold shadow-2xs group/btn"
            >
              <Linkedin className="h-4 w-4 transition-colors" />
              <span>Connect on LinkedIn</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </motion.a>
          </div>
        </div>

        {/* Right Column: Leader Portrait */}
        <div
          className={`relative md:col-span-5 min-h-[320px] md:min-h-[440px] bg-gradient-to-tr from-sky-50 via-slate-50 to-blue-50/40 p-6 sm:p-8 flex items-center justify-center overflow-hidden ${
            index % 2 === 1 ? "md:order-1" : ""
          }`}
        >
          {/* Subtle Ambient Glow behind portrait */}
          <div className="absolute w-56 h-56 bg-[#0070AD]/15 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

          {/* Portrait Container */}
          <div className="relative w-full h-full max-h-[380px] flex items-center justify-center">
            <img
              src={leader.image}
              alt={leader.name}
              className="w-auto max-h-[360px] md:max-h-[390px] object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-xl"
              loading="lazy"
            />
          </div>

          {/* Bottom Soft Fade */}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/40 to-transparent pointer-events-none" />
        </div>

      </div>
    </motion.div>
  );
};

const Leadership = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-white text-slate-900 overflow-x-hidden font-body selection:bg-[#0070ad] selection:text-white pt-20">
      <SEOHead
        title="Leadership & Board of Directors | Fastigo Technology"
        description="Meet the visionary leadership team and Board of Directors driving Fastigo Technology's mission to transform businesses through AI and digital innovation."
        keywords={["Fastigo leadership", "board of directors", "Lalit Kumar Sirsu", "executive leadership", "technology governance"]}
        ogTitle="Leadership & Board of Directors | Fastigo Technology"
        ogDescription="Meet the visionary leadership team and Board of Directors driving Fastigo Technology."
        ogImage={Lalit}
      />

      {/* Ambient Neural Light Mesh Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.45, 0.3],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-[750px] h-[750px] bg-gradient-to-br from-[#0070AD]/8 to-sky-200/20 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-gradient-to-bl from-[#00A3E0]/8 to-blue-100/30 rounded-full blur-[130px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0070ad08_1px,transparent_1px),linear-gradient(to_bottom,#0070ad08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10">
        {/* Breadcrumb Navigation Bar */}
        <div className="border-b border-slate-200/80 bg-white/85 backdrop-blur-md py-3.5 px-4 sm:px-6">
          <div className="container mx-auto max-w-[1240px] flex items-center justify-between text-xs sm:text-sm">
            <nav className="flex items-center gap-2 text-slate-500 font-medium">
              <Link to="/" className="hover:text-[#0070AD] transition-colors">
                Home
              </Link>
              <span className="text-slate-300">/</span>
              <span className="text-[#0B192C] font-semibold">Leadership</span>
            </nav>
            <div className="hidden md:flex items-center gap-2 text-xs text-[#0070AD] font-mono px-3 py-1 rounded-full bg-sky-50 border border-sky-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Corporate Governance // Board of Directors</span>
            </div>
          </div>
        </div>

        <main className="pt-12 sm:pt-16 pb-24">
          {/* Hero Section */}
          <section className="container mx-auto px-4 mb-16 sm:mb-20 max-w-[1240px]">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto"
            >
              {/* Eyebrow Badge */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-200 bg-sky-50/90 text-[#0070AD] text-xs font-bold tracking-wider uppercase mb-5 backdrop-blur-md shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#0070AD]" />
                <span>WHO WE ARE</span>
              </motion.div>

              {/* Kinetic Heading */}
              <h1 className="mb-5 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0E0A42] leading-[1.12]">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070AD] via-[#00A3E0] to-[#0070AD]">Leadership</span>
              </h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-base sm:text-lg text-slate-600 leading-relaxed font-body max-w-2xl mx-auto"
              >
                Meet the visionary leaders driving Fastigo Technology's mission
                to transform businesses through cutting-edge AI and digital
                innovation.
              </motion.p>
            </motion.div>
          </section>

          {/* Board of Directors Section Header */}
          <section className="container mx-auto px-4 mb-8 max-w-[1240px]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 sm:gap-6"
            >
              <div>
                <h2 className="font-display text-xs tracking-[0.3em] font-bold text-[#0070AD] uppercase mb-1">
                  BOARD OF DIRECTORS
                </h2>
                <div className="h-0.5 w-16 bg-gradient-to-r from-[#0070AD] to-sky-400" />
              </div>
              <div className="h-[1px] flex-grow bg-slate-200/80" />
            </motion.div>
          </section>

          {/* Leader Cards Grid */}
          <section className="container mx-auto px-4 space-y-8 max-w-[1240px]">
            {boardOfDirectors.map((leader, index) => (
              <LeaderCard key={leader.name} leader={leader} index={index} />
            ))}
          </section>

          {/* Corporate Values Card */}
          <section className="container mx-auto px-4 mt-20 max-w-[1240px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-[28px] p-8 sm:p-12 bg-gradient-to-br from-sky-50/90 via-white to-sky-100/40 border border-sky-200/80 shadow-[0_16px_40px_rgba(0,112,173,0.06)]"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl text-center md:text-left">
                  <span className="inline-block px-3 py-1 rounded-full bg-sky-100 text-[#0070AD] text-xs font-bold uppercase tracking-wider mb-3">
                    Institutional Trust &amp; Governance
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#0E0A42] mb-3">
                    Building Long-Term Value Through Innovation &amp; Integrity
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Our governance framework ensures transparency, accountability, and sustainable growth as we empower global enterprises with mission-critical AI solutions.
                  </p>
                </div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="shrink-0">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#0070AD] hover:bg-[#005a8c] text-white font-semibold text-sm rounded-xl shadow-md shadow-sky-500/20 transition-all duration-300 group"
                  >
                    <span>Connect with Leadership</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Leadership;
