import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Linkedin,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Award,
  Globe2,
  Mail,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import Lalit from "@/assets/lalit4.webp";

interface Leader {
  role: string;
  name: string;
  subtitle?: string;
  education?: string;
  bio: string;
  image?: string;
  linkedin: string;
  tags?: string[];
  governanceRole: string;
}

const boardOfDirectors: Leader[] = [
  {
    role: "Chief Executive Officer & Managing Director",
    name: "Akhil Singh",
    subtitle: "Founder & CEO, Fastigo Technology Pvt. Ltd.",
    education: "IITian & Technology Entrepreneur",
    bio: "Akhil Singh is an IITian and technology entrepreneur, currently serving as the Founder & CEO of Fastigo Technology Pvt. Ltd., and leading the innovation behind Dora AI. With a deep passion for Artificial Intelligence, Cloud Computing, Cybersecurity, and Digital Transformation, he operates at the intersection of cutting-edge technology and real-world business challenges. His journey from IIT to founding Fastigo has been driven by a singular mission — to empower businesses with smarter, scalable, and secure technology solutions. Under his leadership, Fastigo has delivered high-impact digital services across industries, enabling organizations to modernize operations, strengthen security frameworks, and unlock sustainable growth. Fastigo’s core expertise under Akhil’s direction spans AI/ML implementation, secure cloud infrastructure, enterprise DevOps, and end-to-end cybersecurity frameworks. His strategic vision and execution-driven leadership continue to position Fastigo as a forward-thinking technology partner for the digital age.",
    image: "", // Image column empty as requested
    linkedin: "https://www.linkedin.com/in/akhil-singh-160a8733a/",
    governanceRole: "Executive Board // Managing Director",
  },
  {
    role: "Director & Chief Marketing Officer",
    name: "Lalit Kumar Sirsu",
    subtitle: "Director & CMO, Fastigo Technology Pvt. Ltd.",
    education: "Institutional Engagement & Public Sector Strategist",
    bio: "Lalit Kumar Sirsu serves as the Director & Chief Marketing Officer, bringing extensive experience in strategic marketing, institutional engagement, and public-sector collaboration. With a strong network across the Government and PSU ecosystem, he plays a key role in building high-impact partnerships and driving sustainable growth initiatives. Over the years, he has led large-scale engagement programs, strengthened stakeholder relationships, and aligned marketing strategies with governance frameworks and national digital transformation goals. His leadership combines vision, execution excellence, and policy-aligned innovation — reinforcing long-term value creation and organizational credibility.",
    image: Lalit,
    linkedin: "https://www.linkedin.com/in/lalit-kumar-86ba84bb/",
    tags: [
      "Strategic Marketing",
      "Government & PSU Ecosystem",
      "Public-Sector Partnerships",
      "Institutional Engagement",
      "Policy & Governance",
    ],
    governanceRole: "Board of Directors // Governance Lead",
  },
];


const LeaderCard = ({ leader, index }: { leader: Leader; index: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="group"
    >
      <div className="grid md:grid-cols-12 gap-0 bg-white rounded-[28px] border border-slate-200/90 shadow-[0_12px_40px_rgba(11,25,44,0.06)] hover:shadow-[0_24px_56px_rgba(0,112,173,0.16)] hover:border-[#0070AD]/40 transition-all duration-500 overflow-hidden">
        {/* Left Column: Text Content & Bio */}
        <div
          className={`p-7 sm:p-9 md:p-11 md:col-span-7 lg:col-span-7 flex flex-col justify-between ${
            index % 2 === 1 ? "md:order-2" : ""
          }`}
        >
          <div>
            {/* Role Pill & Credentials */}
            <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#0070AD] bg-sky-50 border border-sky-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0070AD] animate-pulse" />
                {leader.role}
              </span>
              {leader.education && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200">
                  <Award className="w-3 h-3 text-[#0070AD]" />
                  {leader.education}
                </span>
              )}
            </div>

            {/* Name Heading with Hover Accent */}
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0E0A42] mb-1.5 tracking-tight group-hover:text-[#0070AD] transition-colors duration-300">
              {leader.name}
            </h3>

            {leader.subtitle && (
              <p className="text-xs sm:text-sm font-semibold text-[#0070AD] mb-4">
                {leader.subtitle}
              </p>
            )}

            {/* Strategic Tags */}
            {leader.tags && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {leader.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200/80 hover:bg-sky-50 hover:text-[#0070AD] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Bio Text */}
            <div className="text-slate-600 leading-relaxed text-sm sm:text-[15px] font-body space-y-3">
              <p className={`${!expanded ? "line-clamp-4 md:line-clamp-none" : ""}`}>
                {leader.bio}
              </p>
            </div>

            {/* Mobile Read More Toggle */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="md:hidden mt-2 text-[#0070AD] font-semibold text-xs flex items-center gap-1 hover:underline"
            >
              {expanded ? "Show less" : "Read full executive bio"}
            </button>
          </div>

          {/* Verified Credential & LinkedIn Action */}
          <div className="mt-7 pt-5 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{leader.governanceRole}</span>
            </div>

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href={leader.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0070AD] hover:bg-[#005a8c] text-white border border-[#0070AD] transition-all duration-300 text-xs font-semibold shadow-sm hover:shadow-md group/btn cursor-pointer"
            >
              <Linkedin className="h-4 w-4 transition-colors" />
              <span>Connect on LinkedIn</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </motion.a>
          </div>
        </div>

        {/* Right Column: Leader Portrait OR Clean Empty Frame */}
        <div
          className={`relative md:col-span-5 lg:col-span-5 min-h-[260px] sm:min-h-[300px] md:min-h-[420px] bg-gradient-to-tr from-sky-50/70 via-slate-50/90 to-blue-50/40 p-6 sm:p-8 flex items-center justify-center overflow-hidden border-t md:border-t-0 md:border-l border-slate-200/60 ${
            index % 2 === 1 ? "md:order-1 md:border-l-0 md:border-r" : ""
          }`}
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-64 h-64 bg-[#0070AD]/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0070ad0a_1px,transparent_1px),linear-gradient(to_bottom,#0070ad0a_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-60" />

          {leader.image ? (
            /* Portrait Container */
            <div className="relative z-10 w-full h-full max-h-[380px] flex items-center justify-center">
              <img
                src={leader.image}
                alt={leader.name}
                className="w-auto max-h-[340px] md:max-h-[380px] object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-xl"
                loading="lazy"
              />
            </div>
          ) : (
            /* Empty Image Column as Requested: Elegant Minimalist Executive Frame */
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-6 sm:p-8">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/90 backdrop-blur-xl border border-sky-200/90 shadow-[0_16px_36px_rgba(0,112,173,0.12)] flex items-center justify-center group-hover:scale-105 group-hover:border-[#0070AD]/50 transition-all duration-500">
                <span className="font-display text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-[#0E0A42] via-[#0070AD] to-[#00A3E0] tracking-wider">
                  {leader.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="mt-5 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-sky-200/80 text-[11px] font-bold text-[#0070AD] uppercase tracking-wider shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0070AD]" />
                <span>Executive Profile</span>
              </div>
              <p className="mt-2 text-xs text-slate-400 font-medium">
                Fastigo Technology Pvt. Ltd.
              </p>
            </div>
          )}

          {/* Bottom Soft Fade */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
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
        title="Leadership & Investors | Fastigo Technology"
        description="Meet the visionary leadership team, Founder & CEO Akhil Singh, and Board of Directors driving Fastigo Technology's AI, cloud, and cybersecurity innovation."
        keywords={[
          "Fastigo leadership",
          "Akhil Singh Fastigo",
          "Akhil Singh IIT",
          "Dora AI",
          "Lalit Kumar Sirsu",
          "Fastigo investors",
          "board of directors",
          "technology governance",
        ]}
        ogTitle="Leadership & Investors | Fastigo Technology"
        ogDescription="Meet the visionary leadership team and Board of Directors driving Fastigo Technology's mission."
        ogImage={Lalit}
      />

      {/* Ambient Neural Light Mesh Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[750px] h-[750px] bg-gradient-to-br from-[#0070AD]/6 to-sky-200/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-gradient-to-bl from-[#00A3E0]/6 to-blue-100/20 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0070ad06_1px,transparent_1px),linear-gradient(to_bottom,#0070ad06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
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
              <span className="text-[#0B192C] font-semibold">
                Investors &amp; Leadership
              </span>
            </nav>
            <div className="hidden md:flex items-center gap-2 text-xs text-[#0070AD] font-mono px-3 py-1 rounded-full bg-sky-50 border border-sky-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Corporate Governance &amp; Shareholder Trust</span>
            </div>
          </div>
        </div>

        <main className="pt-10 sm:pt-16 pb-24">
          {/* Hero Section */}
          <section className="container mx-auto px-4 mb-12 sm:mb-16 max-w-[1240px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              {/* Main Heading */}
              <h1 className="mb-5 font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0E0A42] leading-[1.14]">
                Our Leadership &amp; Investors
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-body max-w-2xl mx-auto">
                Led by visionary IITian leadership and seasoned industry
                strategists, Fastigo combines deep-tech innovation with
                disciplined governance to drive sustainable enterprise value.
              </p>
            </motion.div>
          </section>


          {/* Board of Directors Section Header */}
          <section className="container mx-auto px-4 mb-8 max-w-[1240px]">
            <div className="flex items-center gap-4 sm:gap-6">
              <div>
                <h2 className="font-display text-xs tracking-[0.3em] font-bold text-[#0070AD] uppercase mb-1">
                  EXECUTIVE BOARD OF DIRECTORS
                </h2>
                <div className="h-0.5 w-20 bg-gradient-to-r from-[#0070AD] to-sky-400" />
              </div>
              <div className="h-[1px] flex-grow bg-slate-200/80" />
            </div>
          </section>

          {/* Leader Cards Grid */}
          <section className="container mx-auto px-4 space-y-8 sm:space-y-10 max-w-[1240px]">
            {boardOfDirectors.map((leader, index) => (
              <LeaderCard key={leader.name} leader={leader} index={index} />
            ))}
          </section>

          {/* Corporate Governance & Investor Relations Banner */}
          <section className="container mx-auto px-4 mt-20 max-w-[1240px]">
            <div className="relative overflow-hidden rounded-[28px] p-8 sm:p-12 bg-gradient-to-br from-sky-50/95 via-white to-sky-100/50 border border-sky-200/90 shadow-[0_16px_40px_rgba(0,112,173,0.08)]">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl text-center lg:text-left">
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#0E0A42] mb-3">
                    Building Sustainable Value Through Disciplined Innovation
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-body">
                    Our governance framework ensures absolute transparency,
                    auditable security, and sustainable capital deployment as
                    we engineer high-impact AI platforms and enterprise services
                    for global markets.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0 w-full lg:w-auto">
                  <Link
                    to="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#0070AD] hover:bg-[#005a8c] text-white font-semibold text-sm rounded-xl shadow-md shadow-sky-500/20 hover:shadow-lg transition-all duration-300 group"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Investor Inquiries</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/services"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white hover:bg-[#0070AD] text-[#0070AD] hover:text-white border border-[#0070AD] font-semibold text-sm rounded-xl transition-all duration-300 shadow-2xs cursor-pointer"
                  >
                    <span>Explore Solutions</span>
                    <ChevronRight className="w-4 h-4 text-inherit" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Leadership;
