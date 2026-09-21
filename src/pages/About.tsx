import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Target,
  Globe,
  Cpu,
  Zap,
  Rocket,
  Search,
  Lightbulb,
  Heart,
  Shield,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { aboutContent } from '@/data/aboutContent';
import fastigoLogo from '@/assets/fastigo-logo.webp';
import teamCollabImg from '@/assets/insights_ai_team.jpg';
import execStrategyImg from '@/assets/insight_exec_collab.jpg';
import visionFutureImg from '@/assets/innovation-cobalt.jpg';
import aiCapImg from '@/assets/insight_agentic_ai.jpg';
import cloudCapImg from '@/assets/digital_core.webp';
import rpaCapImg from '@/assets/innovation_robotics.jpg';

const capabilityImages = [aiCapImg, cloudCapImg, rpaCapImg];
const capabilityTags = ['Cognitive Intelligence', 'Enterprise Cloud & Cyber', 'Intelligent Workflows'];

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'About Fastigo — Our Mission, Team & Vision | Fastigo Technology';
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-white overflow-x-hidden font-body text-slate-700">
      
      {/* 1. HERO SECTION: WHO WE ARE (Infosys IKI Executive Editorial Style) */}
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#F7FAFD] via-white to-white border-b border-slate-200/70">
        {/* Ambient IKI Brand Glow */}
        <div className="absolute -top-32 right-1/4 w-[600px] h-[600px] bg-[#00A3E0]/[0.07] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-20 w-[500px] h-[500px] bg-[#0070AD]/[0.05] rounded-full blur-3xl pointer-events-none" />
        
        {/* Precision Grid Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(#0070ad_0.65px,transparent_0.65px)] [background-size:32px_32px] opacity-[0.04] pointer-events-none" />

        <div className="container mx-auto max-w-[1240px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Editorial Headline & Narrative */}
            <div className="lg:col-span-7">
              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#0E0A42] tracking-tight leading-[1.12] mb-6"
              >
                {aboutContent.hero.title}
              </motion.h1>

              {/* Authoritative Quote Card (IKI Perspective Box) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-5 sm:p-6 rounded-2xl bg-white border-l-4 border-l-[#0070AD] border border-slate-200/80 shadow-[0_4px_24px_rgba(0,112,173,0.06)] mb-8"
              >
                <p className="text-base sm:text-lg font-medium text-[#0E0A42] leading-relaxed">
                  "{aboutContent.hero.description}"
                </p>
              </motion.div>

              {/* Narrative Paragraphs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed"
              >
                {aboutContent.hero.narrative.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </motion.div>

              {/* Key Indicators (IKI Highlights) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-200/80"
              >
                <div>
                  <div className="font-display text-2xl font-bold text-[#0E0A42]">March 2024</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">Founded</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-[#0070AD]">51 – 200</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">Technologists</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-[#0E0A42]">New Delhi</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">Headquarters</div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Clean Large Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 flex flex-col items-center justify-center text-center py-4"
            >
              <div className="flex flex-col items-center justify-center p-2 w-full">
                <img
                  src={fastigoLogo}
                  alt="Fastigo"
                  className="w-full max-w-[260px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[450px] h-auto object-contain transition-transform duration-300 hover:scale-105 select-none drop-shadow-sm"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. STRATEGIC DIRECTION: MISSION & VISION (Side-by-side IKI Perspective Boxes with Content Images) */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFD] via-[#F1F6FB] to-[#F8FAFD] border-b border-slate-200/80 relative">
        <div className="container mx-auto max-w-[1240px] relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0E0A42] tracking-tight">
              Purpose & Long-Term Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            
            {/* Mission Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-[0_8px_32px_rgba(0,112,173,0.06)] hover:shadow-[0_20px_48px_rgba(0,112,173,0.12)] transition-all duration-400 flex flex-col group"
            >
              {/* Image Header */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900">
                <img
                  src={execStrategyImg}
                  alt={aboutContent.mission.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* High-contrast deep scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061226] via-[#061226]/75 to-black/45" />
                
                {/* Top Pill Badge */}
                <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061226]/85 backdrop-blur-md border border-white/25 text-xs font-semibold shadow-md">
                  <Target className="w-3.5 h-3.5 text-[#00A3E0] shrink-0" />
                  <span className="text-[#38bdf8] font-bold tracking-wide">01 // PURPOSE-DRIVEN IMPACT</span>
                </div>

                {/* Bottom Title on Image */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00A3E0] shadow-[0_0_12px_#00A3E0] shrink-0" />
                    <span>{aboutContent.mission.title}</span>
                  </h3>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-7 sm:p-9 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-display text-lg sm:text-xl font-bold text-[#0E0A42] leading-snug mb-4">
                    {aboutContent.mission.tagline}
                  </h4>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {aboutContent.mission.description}
                  </p>
                </div>
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0070AD]">
                  <span>Operational Transformation</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>

            {/* Vision Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-[0_8px_32px_rgba(0,112,173,0.06)] hover:shadow-[0_20px_48px_rgba(0,112,173,0.12)] transition-all duration-400 flex flex-col group"
            >
              {/* Image Header */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900">
                <img
                  src={visionFutureImg}
                  alt={aboutContent.vision.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* High-contrast deep scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061226] via-[#061226]/75 to-black/45" />

                {/* Top Pill Badge */}
                <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061226]/85 backdrop-blur-md border border-white/25 text-xs font-semibold shadow-md">
                  <Globe className="w-3.5 h-3.5 text-[#00A3E0] shrink-0" />
                  <span className="text-[#38bdf8] font-bold tracking-wide">02 // LONG-TERM HORIZON</span>
                </div>

                {/* Bottom Title on Image */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00A3E0] shadow-[0_0_12px_#00A3E0] shrink-0" />
                    <span>{aboutContent.vision.title}</span>
                  </h3>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-7 sm:p-9 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-display text-lg sm:text-xl font-bold text-[#0E0A42] leading-snug mb-4">
                    {aboutContent.vision.description}
                  </h4>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {aboutContent.vision.narrative}
                  </p>
                </div>
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0070AD]">
                  <span>Autonomous Intelligent Ecosystem</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. WHAT WE DO: CORE CAPABILITIES (IKI Editorial Grid with Technology Imagery) */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/80">
        <div className="container mx-auto max-w-[1240px]">
          
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0E0A42] tracking-tight mb-5">
              {aboutContent.whatWeDo.title}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {aboutContent.whatWeDo.introduction}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutContent.whatWeDo.capabilities.map((item, idx) => {
              const Icon = item.icon;
              const cardImage = capabilityImages[idx];
              const tag = capabilityTags[idx];

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-[0_4px_24px_rgba(0,112,173,0.05)] hover:shadow-[0_20px_45px_rgba(0,112,173,0.12)] hover:border-[#0070AD]/40 transition-all duration-400 flex flex-col"
                >
                  {/* Technology Card Image Header */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                    <img
                      src={cardImage}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Category Eyebrow Pill */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#0E0A42] shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0070AD]" />
                      <span>{tag}</span>
                    </div>

                    {/* Icon Badge */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center shadow-md">
                      <Icon className="w-5 h-5 text-[#0070AD]" />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0E0A42] mb-3 group-hover:text-[#0070AD] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. WHY FASTIGO: EXECUTION PILLARS (Numbered IKI Structural Metric Boxes) */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFD] via-white to-[#F8FAFD] border-b border-slate-200/80">
        <div className="container mx-auto max-w-[1240px]">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0E0A42] tracking-tight">
              {aboutContent.whyFastigo.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutContent.whyFastigo.pillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              const indexFormatted = `0${idx + 1}`;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-[0_4px_24px_rgba(0,112,173,0.05)] hover:shadow-[0_20px_45px_rgba(0,112,173,0.12)] hover:border-[#0070AD]/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group"
                >
                  {/* Subtle Background Number */}
                  <div className="absolute top-4 right-6 font-display font-extrabold text-6xl text-slate-100/80 select-none group-hover:text-sky-100/80 transition-colors pointer-events-none">
                    {indexFormatted}
                  </div>

                  <div>
                    {/* Icon Container */}
                    <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 text-[#0070AD] shadow-sm group-hover:scale-110 group-hover:bg-[#0070AD] group-hover:text-white transition-all duration-300">
                      <PillarIcon className="w-7 h-7" />
                    </div>

                    <h3 className="font-display text-2xl font-bold text-[#0E0A42] mb-3">
                      {pillar.title}
                    </h3>

                    <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0070AD]">
                    <span>Pillar {indexFormatted}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. OUR VALUES: GUIDING TENETS (Top-Stripe IKI Grid Cards) */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/80">
        <div className="container mx-auto max-w-[1240px]">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0E0A42] tracking-tight">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutContent.values.map((value, idx) => {
              const ValueIcon = value.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-7 border border-slate-200/80 border-t-4 border-t-[#0070AD] shadow-[0_4px_20px_rgba(0,112,173,0.05)] hover:shadow-[0_16px_36px_rgba(0,112,173,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-[#0070AD] mb-5">
                      <ValueIcon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#0E0A42] mb-2.5">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0070AD]" />
                    <span>Principle 0{idx + 1}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. OUR TEAM & CULTURE (Editorial IKI Feature Split with Real Team Collaboration Imagery) */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFD] via-white to-[#F8FAFD] border-b border-slate-200/80">
        <div className="container mx-auto max-w-[1240px]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Description Column */}
            <div className="lg:col-span-6">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0E0A42] tracking-tight mb-5">
                {aboutContent.team.title}
              </h2>
              <p className="text-lg sm:text-xl font-medium text-[#0E0A42] mb-5 leading-relaxed">
                {aboutContent.team.description}
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {aboutContent.team.culture}
              </p>
            </div>

            {/* Right Editorial Team Image Showcase */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_16px_45px_rgba(0,112,173,0.12)] border border-slate-200">
                <img
                  src={teamCollabImg}
                  alt="Fastigo Engineering & Collaborative Culture"
                  className="w-full h-72 sm:h-84 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0A42]/85 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-xs font-mono font-semibold tracking-wider text-[#38bdf8] uppercase mb-1">
                    Collaborative Intelligence
                  </div>
                  <div className="font-display text-lg font-bold">
                    Empowering innovators, domain experts & AI engineers.
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. CALL TO ACTION (Infosys IKI Signature Deep Navy Editorial Banner) */}
      <section className="py-24 sm:py-32 relative overflow-hidden bg-[#061226] text-white text-center">
        {/* Subtle glowing orbs */}
        <div className="absolute top-0 left-1/4 w-[550px] h-[550px] bg-[#0070AD]/25 rounded-full blur-[130px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-[#00A3E0]/20 rounded-full blur-[110px] pointer-events-none mix-blend-screen" />
        
        {/* Grid dots */}
        <div className="absolute inset-0 bg-[radial-gradient(#00A3E0_0.75px,transparent_0.75px)] [background-size:32px_32px] opacity-[0.08] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-[850px] relative z-10">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold mb-6 text-white tracking-tight leading-[1.12]">
            {aboutContent.cta.title}
          </h2>
          <p className="text-base sm:text-lg mb-10 text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {aboutContent.cta.description}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-[#0070AD] hover:bg-[#005a8c] text-white px-9 py-4 rounded-full font-bold text-sm sm:text-base transition-all shadow-[0_10px_35px_rgba(0,112,173,0.35)] hover:shadow-[0_16px_45px_rgba(0,112,173,0.5)] hover:-translate-y-0.5 border border-sky-400/30 group"
          >
            <MessageSquare className="w-4 h-4 text-white" />
            <span>{aboutContent.cta.button}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default About;
