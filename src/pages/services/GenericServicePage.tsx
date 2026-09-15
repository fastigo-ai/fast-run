import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { ServiceDetailConfig } from './serviceDetailsData';

// ---------------------------------------------------------------------------
// ANIMATION COMPONENT: Kinetic Text Heading
// ---------------------------------------------------------------------------
interface AnimatedTextProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  delay?: number;
}

const KineticHeading: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  highlightWords = [],
  highlightClassName = 'animate-text-shimmer-light bg-clip-text text-transparent bg-gradient-to-r from-[#0070AD] via-[#00A3E0] to-[#0070AD] font-extrabold',
  delay = 0,
}) => {
  const words = text.split(' ');
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 14,
        stiffness: 120,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(4px)',
      transition: {
        type: 'spring',
        damping: 14,
        stiffness: 120,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`flex flex-wrap items-baseline gap-x-2.5 gap-y-1 ${className}`}
    >
      {words.map((word, index) => {
        const cleanWord = word.replace(/[.,]/g, '');
        const isHighlight = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord.toLowerCase()
        );
        return (
          <motion.span
            key={index}
            variants={child}
            className={`inline-block ${isHighlight ? highlightClassName : ''}`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// MAIN GENERIC SERVICE PAGE COMPONENT
// ---------------------------------------------------------------------------
interface GenericServicePageProps {
  service: ServiceDetailConfig;
}

export const GenericServicePage: React.FC<GenericServicePageProps> = ({ service }) => {
  const [activeTab, setActiveTab] = useState<string>(service.capabilities[0]?.id || '');
  const [activeIndustry, setActiveIndustry] = useState<string>(
    service.industryDeployments[0]?.id || ''
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab(service.capabilities[0]?.id || '');
    setActiveIndustry(service.industryDeployments[0]?.id || '');
  }, [service]);

  const currentCapability =
    service.capabilities.find((t) => t.id === activeTab) || service.capabilities[0];
  const currentIndustryData =
    service.industryDeployments.find((i) => i.id === activeIndustry) ||
    service.industryDeployments[0];

  return (
    <div className="relative min-h-screen w-full bg-white text-slate-900 overflow-x-hidden font-body selection:bg-[#0070ad] selection:text-white pt-20">
      {/* Ambient Light Mesh Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-1/4 w-[750px] h-[750px] bg-gradient-to-br from-[#0070AD]/8 to-sky-200/20 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-gradient-to-bl from-[#00A3E0]/8 to-blue-100/30 rounded-full blur-[130px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0070ad08_1px,transparent_1px),linear-gradient(to_bottom,#0070ad08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 1. BREADCRUMBS */}
      {/* ------------------------------------------------------------------- */}
      <div className="relative z-10 border-b border-slate-200/80 bg-white/85 backdrop-blur-md py-3.5 px-4 sm:px-6">
        <div className="container mx-auto max-w-[1240px] flex items-center justify-between text-xs sm:text-sm">
          <nav className="flex items-center gap-2 text-slate-500 font-medium">
            <Link to="/" className="hover:text-[#0070AD] transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <Link to="/services" className="hover:text-[#0070AD] transition-colors">
              Services
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-[#0B192C] font-semibold">{service.title}</span>
          </nav>
          <div className="hidden md:flex items-center gap-2 text-xs text-[#0070AD] font-mono px-3 py-1 rounded-full bg-sky-50 border border-sky-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Fastigo Enterprise Verified</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 2. HERO SECTION */}
      {/* ------------------------------------------------------------------- */}
      <section className="relative z-10 pt-12 pb-20 md:pt-16 md:pb-28 border-b border-slate-200/80 overflow-hidden">
        <div className="container mx-auto px-4 max-w-[1240px]">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Heading & Value */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Eyebrow Badge */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-sky-200 bg-sky-50/90 text-[#0070AD] text-xs font-bold tracking-wider uppercase mb-6 backdrop-blur-md shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#0070AD] animate-pulse" />
                  <span>{service.eyebrow}</span>
                </motion.div>

                {/* TEXT ANIMATION: Kinetic Split Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.08] tracking-tight text-[#0B192C] mb-6">
                  <KineticHeading
                    text={service.title}
                    highlightWords={service.title.split(' ').slice(0, 3)}
                    highlightClassName="animate-text-shimmer-light bg-clip-text text-transparent bg-gradient-to-r from-[#0070AD] via-[#00A3E0] to-[#0070AD] font-extrabold"
                  />
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-lg sm:text-xl text-slate-600 leading-relaxed font-body mb-8 max-w-2xl"
                >
                  {service.description}
                </motion.p>

                {/* Useful Action CTAs */}
                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <motion.a
                    href="#capabilities"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 rounded-full font-bold text-white bg-[#0070AD] hover:bg-[#005c8f] shadow-[0_8px_25px_rgba(0,112,173,0.3)] transition-all flex items-center gap-2.5 text-sm sm:text-base cursor-pointer group"
                  >
                    <span>Explore Capabilities</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.a>

                  <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/contact"
                      className="px-7 py-4 rounded-full font-semibold text-[#0B192C] hover:text-[#0070AD] border border-slate-300 hover:border-[#0070AD]/50 bg-white hover:bg-slate-50 transition-all text-sm sm:text-base inline-flex items-center gap-2 shadow-xs"
                    >
                      <MessageSquare className="w-4 h-4 text-[#0070AD]" />
                      <span>Consult with Architects</span>
                    </Link>
                  </motion.div>
                </div>

                {/* Verification Badges */}
                <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-slate-200 text-xs text-slate-600">
                  {service.verificationBadges.map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className="flex items-center gap-1.5 font-medium hover:text-[#0070AD] transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0070AD]" />
                      {badge}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column: 3D Showcase Visual with Telemetry */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                  className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-[0_20px_50px_rgba(0,112,173,0.12)] bg-slate-50 aspect-[4/3] group"
                >
                  <img
                    src={service.heroImage}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Floating Telemetry Badge */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-xl shadow-xl flex items-center justify-between text-slate-900"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0070AD]">
                        <CheckCircle2 className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#0B192C]">
                          {service.telemetryTitle}
                        </p>
                        <p className="text-[11px] text-[#0070AD] font-mono font-medium">
                          {service.telemetrySubtitle}
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-sky-50 text-[#0070AD] border border-sky-200 text-[10px] font-bold uppercase tracking-wider">
                      {service.telemetryBadge}
                    </span>
                  </motion.div>
                </motion.div>

                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#0070AD]/15 to-[#00A3E0]/15 -z-10 blur-xl opacity-70 animate-spin-slow" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 3. THREE STRATEGIC PILLARS */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 relative z-10 border-b border-slate-200/80 bg-slate-50/70">
        <div className="container mx-auto px-4 max-w-[1240px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#0070AD] uppercase font-mono block mb-3">
              Strategic Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0B192C] mb-6">
              <KineticHeading
                text={service.pillarsTitle}
                highlightWords={service.pillarsTitle.split(' ').slice(0, 3)}
                className="justify-center"
              />
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {service.pillarsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {service.pillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="rounded-3xl p-8 bg-white border border-slate-200/90 hover:border-[#0070AD]/50 hover:shadow-[0_16px_45px_rgba(0,112,173,0.12)] transition-all flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#0070AD]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <motion.div
                        whileHover={{ rotate: 8, scale: 1.12 }}
                        className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0070AD] group-hover:bg-[#0070AD] group-hover:text-white transition-all shadow-xs"
                      >
                        <PillarIcon className="w-7 h-7" />
                      </motion.div>
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-sky-50 text-[#0070AD] border border-sky-200">
                        {pillar.badge}
                      </span>
                    </div>

                    <span className="text-xs font-mono uppercase tracking-wider text-[#0070AD] font-semibold block mb-1">
                      {pillar.eyebrow}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-[#0B192C] mb-4 group-hover:text-[#0070AD] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-body mb-6">
                      {pillar.description}
                    </p>

                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      {pillar.highlights.map((item, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-start gap-2.5 text-xs text-slate-600 font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#0070AD] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 4. COMPOSABLE CAPABILITIES (Active Tabs) */}
      {/* ------------------------------------------------------------------- */}
      <section id="capabilities" className="py-24 relative z-10 border-b border-slate-200/80 bg-white">
        <div className="container mx-auto px-4 max-w-[1240px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#0070AD] uppercase font-mono block mb-3">
                Technical Stack
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0B192C] mb-4">
                <KineticHeading
                  text={service.capabilitiesTitle}
                  highlightWords={service.capabilitiesTitle.split(' ').slice(0, 2)}
                />
              </h2>
              <p className="text-slate-600 text-base max-w-xl">
                {service.capabilitiesSubtitle}
              </p>
            </div>
            <div className="hidden lg:block text-right">
              <span className="text-xs font-mono text-slate-400">Engineering Standard</span>
              <p className="text-sm font-bold text-[#0B192C]">ISO 9001 • CMMI Level 5 • Agile</p>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2.5 mb-12 p-2 rounded-2xl bg-slate-100/90 border border-slate-200/90 max-w-full overflow-x-auto relative">
            {service.capabilities.map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer z-10 ${
                    isSelected ? 'text-white' : 'text-slate-600 hover:text-[#0B192C]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="genericActiveTabPill"
                      className="absolute inset-0 bg-[#0070AD] rounded-xl shadow-md shadow-blue-600/20 -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  <TabIcon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Showcase Pane */}
          {currentCapability && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCapability.id}
                initial={{ opacity: 0, y: 15, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.99 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="rounded-3xl p-8 sm:p-10 lg:p-12 bg-slate-50/70 border border-slate-200/90 shadow-[0_10px_35px_rgba(0,112,173,0.06)] relative overflow-hidden"
              >
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  {/* Left: Technical Details */}
                  <div className="lg:col-span-7">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#0070AD] font-bold mb-2 block">
                      {currentCapability.tagline}
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-display font-bold text-[#0B192C] mb-6">
                      {currentCapability.label}
                    </h3>
                    <p className="text-base text-slate-600 leading-relaxed font-body mb-8">
                      {currentCapability.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6 mb-8">
                      {currentCapability.keyFeatures.map((feat, fIdx) => (
                        <motion.div
                          key={fIdx}
                          whileHover={{ y: -3 }}
                          className="p-4 rounded-xl bg-white border border-slate-200/90 hover:border-[#0070AD]/40 shadow-xs hover:shadow-sm transition-all"
                        >
                          <h4 className="text-sm font-display font-bold text-[#0B192C] mb-1.5 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#0070AD] shrink-0" />
                            {feat.title}
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-200">
                      <span className="text-xs text-slate-500 font-semibold mr-2">
                        Production Deliverables:
                      </span>
                      {currentCapability.deliverables.map((deliv, dIdx) => (
                        <span
                          key={dIdx}
                          className="px-3 py-1 rounded-lg bg-sky-50 text-[#0070AD] border border-sky-200 text-xs font-mono font-medium"
                        >
                          {deliv}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Technical Artwork Preview */}
                  <div className="lg:col-span-5">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl relative aspect-[4/3] group"
                    >
                      <img
                        src={currentCapability.image}
                        alt={currentCapability.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 border border-slate-200/90 backdrop-blur-md shadow-lg">
                        <p className="text-xs font-bold text-[#0B192C] mb-1 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0070AD]" />
                          Enterprise Grade Architecture
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Configured for high availability, zero-downtime deployment, and SLA governance.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 5. DOMAIN GOVERNANCE & FRAMEWORK (Theme Color) */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 relative z-10 border-b border-slate-200/80 bg-slate-50/70">
        <div className="container mx-auto px-4 max-w-[1240px]">
          <motion.div
            whileHover={{ boxShadow: '0 20px 50px -10px rgba(0, 112, 173, 0.12)' }}
            className="rounded-3xl p-8 sm:p-12 lg:p-16 bg-white border border-[#0070AD]/25 shadow-[0_10px_40px_rgba(0,0,0,0.04)] relative overflow-hidden transition-shadow duration-500"
          >
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#0070AD]/8 to-[#00A3E0]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-200 bg-sky-50 text-[#0070AD] text-xs font-bold uppercase tracking-wider mb-4">
                <ShieldCheck className="w-4 h-4 text-[#0070AD]" />
                <span>{service.governanceBadge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0B192C] mb-6">
                <KineticHeading
                  text={service.governanceTitle}
                  highlightWords={service.governanceTitle.split(' ').slice(0, 3)}
                  highlightClassName="animate-text-shimmer-light bg-clip-text text-transparent bg-gradient-to-r from-[#0070AD] via-[#00A3E0] to-[#0070AD] font-extrabold"
                />
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
                {service.governanceSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.governancePillars.map((item, idx) => {
                const GovIcon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/90 hover:border-[#0070AD]/50 hover:bg-white hover:shadow-[0_10px_25px_rgba(0,112,173,0.12)] transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0070AD] mb-5 group-hover:bg-[#0070AD] group-hover:text-white transition-all shadow-2xs">
                      <GovIcon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-display font-bold text-[#0B192C] mb-2.5 group-hover:text-[#0070AD] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-body">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 6. APPLIED SECTOR DEPLOYMENTS */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 relative z-10 border-b border-slate-200/80 bg-white">
        <div className="container mx-auto px-4 max-w-[1240px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#0070AD] uppercase font-mono block mb-3">
              Sector Specialization
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0B192C] mb-6">
              <KineticHeading
                text="Applied Solutions Across Key Sectors"
                highlightWords={['Applied', 'Solutions', 'Sectors']}
                className="justify-center"
              />
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Every vertical benefits from custom technical architectures, specialized data models, and industry-compliant governance.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Sector Selector Buttons */}
            <div className="lg:col-span-4 space-y-2.5">
              {service.industryDeployments.map((ind) => {
                const IndIcon = ind.icon;
                const isSelected = activeIndustry === ind.id;
                return (
                  <motion.button
                    key={ind.id}
                    onClick={() => setActiveIndustry(ind.id)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0070AD] border-[#0070AD] text-white shadow-md shadow-blue-600/20'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-[#0070AD] shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-sky-50 text-[#0070AD]'
                        }`}
                      >
                        <IndIcon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-bold">{ind.name}</span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'translate-x-1' : 'text-slate-400'
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>

            {/* Sector Detail Panel */}
            <div className="lg:col-span-8">
              {currentIndustryData && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndustryData.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-3xl p-8 sm:p-10 bg-slate-50/80 border border-slate-200/90 shadow-[0_10px_35px_rgba(0,112,173,0.06)] relative overflow-hidden"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
                      <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-[#0070AD] font-bold block mb-1">
                          Production Blueprint
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#0B192C]">
                          {currentIndustryData.headline}
                        </h3>
                      </div>

                      <div className="text-right p-3 rounded-xl bg-white border border-sky-200 shadow-2xs">
                        <div className="text-2xl font-display font-extrabold text-[#0070AD]">
                          {currentIndustryData.metric}
                        </div>
                        <div className="text-[11px] text-slate-500 uppercase tracking-wider font-mono font-medium">
                          {currentIndustryData.metricLabel}
                        </div>
                      </div>
                    </div>

                    <p className="text-base text-slate-600 leading-relaxed font-body mb-8">
                      {currentIndustryData.description}
                    </p>

                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-4 font-bold">
                      Specialized Architectures &amp; Use Cases:
                    </h4>

                    <div className="space-y-3">
                      {currentIndustryData.useCases.map((uc, ucIdx) => (
                        <motion.div
                          key={ucIdx}
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200/90 text-sm text-[#0B192C] font-medium shadow-2xs"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#0070AD] shrink-0" />
                          <span>{uc}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 7. REAL-WORLD CASE STUDIES */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 relative z-10 border-b border-slate-200/80 bg-slate-50/70">
        <div className="container mx-auto px-4 max-w-[1240px]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#0070AD] uppercase font-mono block mb-3">
              Production Proof
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0B192C] mb-4">
              <KineticHeading
                text="Quantified Enterprise Outcomes"
                highlightWords={['Quantified', 'Outcomes']}
                className="justify-center"
              />
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Explore how global enterprises deploy our architectures to capture measurable operational and revenue advantage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {service.caseStudies.map((cs, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="rounded-3xl p-8 bg-white border border-slate-200/90 hover:border-[#0070AD]/50 hover:shadow-[0_16px_45px_rgba(0,112,173,0.12)] transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#0070AD] block mb-2 font-bold">
                    {cs.client}
                  </span>
                  <h3 className="text-xl font-display font-bold text-[#0B192C] mb-4 leading-snug group-hover:text-[#0070AD] transition-colors">
                    {cs.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed mb-6">
                    {cs.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-end justify-between">
                  <div>
                    <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0070AD]">
                      {cs.stat}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono font-medium">
                      {cs.statLabel}
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-[#0070AD] border border-sky-200">
                    {cs.impact}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GenericServicePage;
