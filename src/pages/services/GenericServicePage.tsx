import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Sparkles,
  Bot,
  Cpu,
  Layers,
  Database,
  Cloud,
  Shield,
  Activity,
  Globe,
  Radio,
  Workflow,
  BarChart3,
  Lock,
  Eye,
  Server,
  Terminal,
} from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
import { ServiceDetailConfig } from './serviceDetailsData';

// Local High-Resolution Image Assets
import techImg from '@/assets/tech.webp';
import edgeImg from '@/assets/edge.webp';
import customAiImg from '@/assets/custom_ai_dev.webp';
import computerVisionImg from '@/assets/computer-vision.webp';
import aiAgentsImg from '@/assets/ai_agents1.webp';
import agenticAiImg from '@/assets/insight_agentic_ai.jpg';
import voiceAiImg from '@/assets/insight_voice_ai.jpg';
import aiTeamImg from '@/assets/insights_ai_team.jpg';
import cybersecurityImg from '@/assets/cybersecurity.webp';
import networkImg from '@/assets/Network-Solutions.webp';
import sustainabilityImg from '@/assets/sustainability.webp';
import sustainImg1 from '@/assets/sustainablity1.webp';
import sustainImg2 from '@/assets/sustainablity2.webp';
import sapImg from '@/assets/SAP.webp';
import digitalMfgImg from '@/assets/DIGITALMANUFACTURING.webp';
import aiEngineeringImg from '@/assets/AIPOWEREDENGINERRING.webp';
import mobilityImg from '@/assets/NEXT-GEN-MOBILITY.webp';
import blockchainImg from '@/assets/blockchain.webp';
import digitalCoreImg from '@/assets/digital_core.webp';
import appDevImg from '@/assets/app_dev.webp';
import crmPortalImg from '@/assets/crm_portal.webp';
import oncologyAiImg from '@/assets/oncology-AI.webp';
import aiMobilityImg from '@/assets/ai_mobility.webp';
import fintechAiImg from '@/assets/innovation_fintech.jpg';
import healthAiImg from '@/assets/innovation_health.jpg';
import spatialAiImg from '@/assets/innovation_spatial.jpg';
import roboticsAiImg from '@/assets/innovation_robotics.jpg';
import cleantechAiImg from '@/assets/innovation_cleantech.jpg';

// ---------------------------------------------------------------------------
// TOPIC IMAGE REGISTRY (Tailored specifically for each service domain)
// ---------------------------------------------------------------------------
interface DomainAssetPackage {
  heroFallback: string;
  pillarImages: string[];
  sectorImages: Record<string, string>;
  caseStudyImages: string[];
}

const domainAssetPackages: Record<string, DomainAssetPackage> = {
  'data-analytics': {
    heroFallback: digitalCoreImg,
    pillarImages: [customAiImg, techImg, digitalCoreImg],
    sectorImages: {
      banking: fintechAiImg,
      healthcare: healthAiImg,
      retail: crmPortalImg,
      manufacturing: digitalMfgImg,
    },
    caseStudyImages: [fintechAiImg, healthAiImg, techImg],
  },
  'cloud': {
    heroFallback: edgeImg,
    pillarImages: [edgeImg, networkImg, techImg],
    sectorImages: {
      banking: fintechAiImg,
      healthcare: healthAiImg,
      telecom: networkImg,
      ecommerce: crmPortalImg,
    },
    caseStudyImages: [edgeImg, fintechAiImg, networkImg],
  },
  'cognitive-business-operations': {
    heroFallback: agenticAiImg,
    pillarImages: [aiAgentsImg, voiceAiImg, aiTeamImg],
    sectorImages: {
      banking: fintechAiImg,
      healthcare: healthAiImg,
      retail: crmPortalImg,
      supplychain: aiMobilityImg,
    },
    caseStudyImages: [aiTeamImg, fintechAiImg, aiMobilityImg],
  },
  'cybersecurity': {
    heroFallback: cybersecurityImg,
    pillarImages: [cybersecurityImg, blockchainImg, techImg],
    sectorImages: {
      banking: fintechAiImg,
      healthcare: healthAiImg,
      government: digitalCoreImg,
      aerospace: edgeImg,
    },
    caseStudyImages: [cybersecurityImg, fintechAiImg, digitalCoreImg],
  },
  'enterprise-solutions': {
    heroFallback: sapImg,
    pillarImages: [sapImg, digitalCoreImg, crmPortalImg],
    sectorImages: {
      manufacturing: digitalMfgImg,
      retail: crmPortalImg,
      energy: cleantechAiImg,
      pharma: healthAiImg,
    },
    caseStudyImages: [sapImg, digitalMfgImg, crmPortalImg],
  },
  'iot-and-digital-engineering': {
    heroFallback: aiEngineeringImg,
    pillarImages: [aiEngineeringImg, digitalMfgImg, roboticsAiImg],
    sectorImages: {
      automotive: mobilityImg,
      industrial: digitalMfgImg,
      energy: cleantechAiImg,
      smartcities: spatialAiImg,
    },
    caseStudyImages: [aiEngineeringImg, mobilityImg, digitalMfgImg],
  },
  'network-solutions-and-services': {
    heroFallback: networkImg,
    pillarImages: [networkImg, edgeImg, techImg],
    sectorImages: {
      telecom: networkImg,
      financial: fintechAiImg,
      healthcare: healthAiImg,
      logistics: aiMobilityImg,
    },
    caseStudyImages: [networkImg, edgeImg, fintechAiImg],
  },
  'sustainability': {
    heroFallback: sustainabilityImg,
    pillarImages: [sustainabilityImg, sustainImg1, sustainImg2],
    sectorImages: {
      energy: cleantechAiImg,
      manufacturing: digitalMfgImg,
      built_environment: spatialAiImg,
      supply_chain: aiMobilityImg,
    },
    caseStudyImages: [sustainabilityImg, cleantechAiImg, sustainImg2],
  },
  'fastigo-interactive': {
    heroFallback: appDevImg,
    pillarImages: [appDevImg, spatialAiImg, crmPortalImg],
    sectorImages: {
      fintech: fintechAiImg,
      healthcare: healthAiImg,
      retail: crmPortalImg,
      automotive: mobilityImg,
    },
    caseStudyImages: [spatialAiImg, appDevImg, crmPortalImg],
  },
  'custom-software-development': {
    heroFallback: techImg,
    pillarImages: [techImg, appDevImg, digitalCoreImg],
    sectorImages: {
      fintech: fintechAiImg,
      ecommerce: crmPortalImg,
      healthcare: healthAiImg,
      gaming: spatialAiImg,
    },
    caseStudyImages: [techImg, fintechAiImg, appDevImg],
  },
};

// ---------------------------------------------------------------------------
// ANIMATION COMPONENT: Kinetic Text Heading (Infosys Smooth Spring)
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
  highlightClassName = 'bg-clip-text text-transparent bg-gradient-to-r from-[#0070ad] via-[#00A3E0] to-[#0070ad] font-extrabold',
  delay = 0,
}) => {
  const words = text.split(' ');
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    hidden: {
      opacity: 0,
      y: 16,
      filter: 'blur(4px)',
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
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
// MAIN GENERIC SERVICE PAGE COMPONENT (Infosys Color System & Smoothness)
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

  // Resolve assets for this topic
  const domainAssets = useMemo(() => {
    return (
      domainAssetPackages[service.id] ||
      domainAssetPackages['custom-software-development']
    );
  }, [service.id]);

  const activeHeroImage = service.heroImage || domainAssets.heroFallback;

  return (
    <div className="relative min-h-screen w-full bg-white text-[#4A5568] overflow-x-hidden font-body selection:bg-[#0070ad] selection:text-white pt-20">
      <SEOHead
        title={`${service.title} | Fastigo Enterprise Services`}
        description={service.description}
        keywords={[service.title, service.eyebrow, 'enterprise IT solutions', 'Fastigo']}
        ogTitle={`${service.title} | Fastigo Enterprise Services`}
        ogDescription={service.description}
        ogImage={activeHeroImage}
      />

      {/* Ambient Neural Light Mesh Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.28, 0.45, 0.28],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-1/4 w-[750px] h-[750px] bg-gradient-to-br from-[#0070ad]/6 to-sky-200/18 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1.08, 0.96, 1.08],
            opacity: [0.2, 0.38, 0.2],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-gradient-to-bl from-[#00A3E0]/6 to-blue-100/25 rounded-full blur-[130px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0070ad6_1px,transparent_1px),linear-gradient(to_bottom,#0070ad6_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 1. BREADCRUMBS BAR */}
      {/* ------------------------------------------------------------------- */}
      <div className="relative z-10 border-b border-[#E2E8F0] bg-white/90 backdrop-blur-md py-3.5 px-4 sm:px-6">
        <div className="container mx-auto max-w-[1240px] flex items-center justify-between text-xs sm:text-sm">
          <nav className="flex items-center gap-2 text-[#718096] font-medium">
            <Link to="/" className="hover:text-[#0070ad] transition-colors duration-300">
              Home
            </Link>
            <span className="text-[#CBD5E1]">/</span>
            <Link to="/services" className="hover:text-[#0070ad] transition-colors duration-300">
              Services
            </Link>
            <span className="text-[#CBD5E1]">/</span>
            <span className="text-[#1E2229] font-semibold">{service.title}</span>
          </nav>
          <div className="hidden md:flex items-center gap-2 text-xs text-[#0070ad] font-mono px-3.5 py-1 rounded-full bg-[#EBF5FB] border border-[#0070ad]/20 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Fastigo Enterprise Verified</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 2. HERO SECTION WITH INFOSYS FONT & COLOR STYLING */}
      {/* ------------------------------------------------------------------- */}
      <section className="relative z-10 pt-12 pb-20 md:pt-16 md:pb-28 border-b border-[#E2E8F0] overflow-hidden bg-white">
        <div className="container mx-auto px-4 max-w-[1240px]">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Heading & Value */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Eyebrow Badge */}
                <motion.div
                  whileHover={{ scale: 1.03, transition: { duration: 0.25 } }}
                  className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#0070ad]/25 bg-[#EBF5FB] text-[#0070ad] text-xs font-bold tracking-wider uppercase mb-6 backdrop-blur-md shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#0070ad] animate-pulse" />
                  <span>{service.eyebrow}</span>
                </motion.div>

                {/* TEXT ANIMATION: Kinetic Split Headline with Infosys Charcoal (#1E2229) */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-[1.08] tracking-tight text-[#0E0A42] mb-6">
                  <KineticHeading
                    text={service.title}
                    highlightWords={service.title.split(' ').slice(0, 3)}
                    highlightClassName="bg-clip-text text-transparent bg-gradient-to-r from-[#0070ad] via-[#00A3E0] to-[#0070ad] font-extrabold"
                  />
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-lg sm:text-xl text-[#4A5568] leading-relaxed font-body mb-8 max-w-2xl"
                >
                  {service.description}
                </motion.p>

                {/* Action CTAs with Smooth Easing */}
                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <motion.a
                    href="#capabilities"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-[#0070ad] to-[#00A3E0] hover:from-[#005a8c] hover:to-[#0ea5e9] hover:shadow-[0_12px_28px_rgba(23, 124, 227,0.3)] transition-all duration-400 flex items-center gap-2.5 text-sm sm:text-base cursor-pointer group shadow-sm"
                  >
                    <span>Explore Capabilities</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.a>

                  <motion.div
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to="/contact"
                      className="px-7 py-4 rounded-full font-semibold text-[#1E2229] hover:text-[#0070ad] border border-[#E2E8F0] hover:border-[#0070ad]/50 bg-white hover:bg-[#F8FAFC] transition-all duration-300 text-sm sm:text-base inline-flex items-center gap-2 shadow-2xs"
                    >
                      <MessageSquare className="w-4 h-4 text-[#0070ad]" />
                      <span>Consult with Architects</span>
                    </Link>
                  </motion.div>
                </div>

                {/* Verification Badges */}
                <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-[#E2E8F0] text-xs text-[#718096]">
                  {service.verificationBadges.map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className="flex items-center gap-1.5 font-medium hover:text-[#0070ad] transition-colors duration-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0070ad]" />
                      {badge}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Visual with Telemetry */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
                  className="relative rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-[0_20px_50px_rgba(15,23,42,0.06)] bg-slate-950 aspect-[4/3] group"
                >
                  <img
                    src={activeHeroImage}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

                  {/* Floating Telemetry Badge */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 border border-[#E2E8F0] backdrop-blur-xl shadow-xl flex items-center justify-between text-[#1E2229]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#EBF5FB] border border-[#0070ad]/20 flex items-center justify-center text-[#0070ad]">
                        <CheckCircle2 className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#1E2229]">
                          {service.telemetryTitle}
                        </p>
                        <p className="text-[11px] text-[#0070ad] font-mono font-medium">
                          {service.telemetrySubtitle}
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#EBF5FB] text-[#0070ad] border border-[#0070ad]/20 text-[10px] font-bold uppercase tracking-wider">
                      {service.telemetryBadge}
                    </span>
                  </motion.div>
                </motion.div>

                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#0070ad]/15 to-[#00A3E0]/15 -z-10 blur-xl opacity-60 pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 3. THREE STRATEGIC PILLARS (with High-Resolution Images) */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 relative z-10 border-b border-[#E2E8F0] bg-[#F8FAFC]/80">
        <div className="container mx-auto px-4 max-w-[1240px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#0070ad] uppercase font-mono block mb-3">
              Strategic Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#0E0A42] mb-6">
              <KineticHeading
                text={service.pillarsTitle}
                highlightWords={service.pillarsTitle.split(' ').slice(0, 3)}
                className="justify-center"
              />
            </h2>
            <p className="text-base sm:text-lg text-[#4A5568] leading-relaxed">
              {service.pillarsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {service.pillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              const pillarImg =
                pillar.image ||
                domainAssets.pillarImages[idx % domainAssets.pillarImages.length];

              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{
                    y: -8,
                    boxShadow: '0 24px 50px -10px rgba(23, 124, 227, 0.16)',
                    borderColor: 'rgba(23, 124, 227, 0.4)',
                    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                  }}
                  className="rounded-[28px] bg-white border border-[#E2E8F0] shadow-[0_4px_24px_rgba(0,0,0,0.05)] transition-all duration-400 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Top Gradient Beam on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0070ad] via-[#00A3E0] to-[#0070ad] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                  {/* Card Image Header with Zoom Animation */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
                    <img
                      src={pillarImg}
                      alt={pillar.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Floating Corner Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <div className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md border border-white/30 flex items-center justify-center text-[#0070ad] shadow-sm">
                        <PillarIcon className="w-5 h-5" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20">
                        {pillar.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-5 right-5 z-10">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#0070ad] font-bold block">
                        {pillar.eyebrow}
                      </span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-7 sm:p-8 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-[#1E2229] mb-3 group-hover:text-[#0070ad] transition-colors duration-300">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-[#4A5568] leading-relaxed font-body mb-6">
                        {pillar.description}
                      </p>

                      <div className="space-y-3 pt-4 border-t border-[#F1F5F9]">
                        {pillar.highlights.map((item, hIdx) => (
                          <div
                            key={hIdx}
                            className="flex items-start gap-2.5 text-xs text-[#4A5568] font-medium"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#0070ad] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
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
      <section id="capabilities" className="py-24 relative z-10 border-b border-[#E2E8F0] bg-white">
        <div className="container mx-auto px-4 max-w-[1240px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#0070ad] uppercase font-mono block mb-3">
                Technical Stack
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#0E0A42] mb-4">
                <KineticHeading
                  text={service.capabilitiesTitle}
                  highlightWords={service.capabilitiesTitle.split(' ').slice(0, 2)}
                />
              </h2>
              <p className="text-[#4A5568] text-base max-w-xl leading-relaxed">
                {service.capabilitiesSubtitle}
              </p>
            </div>
            <div className="hidden lg:block text-right">
              <span className="text-xs font-mono text-[#718096]">Engineering Standard</span>
              <p className="text-sm font-bold text-[#1E2229]">ISO 9001 • CMMI Level 5 • Agile</p>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2.5 mb-12 p-2 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] max-w-full overflow-x-auto relative">
            {service.capabilities.map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-300 whitespace-nowrap cursor-pointer z-10 ${
                    isSelected ? 'text-white' : 'text-[#4A5568] hover:text-[#1E2229]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="genericActiveTabPill"
                      className="absolute inset-0 bg-gradient-to-r from-[#0070ad] to-[#00A3E0] rounded-xl shadow-md shadow-sky-500/20 -z-10"
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
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl p-8 sm:p-10 lg:p-12 bg-[#F8FAFC]/90 border border-[#E2E8F0] shadow-[0_12px_40px_rgba(15,23,42,0.05)] relative overflow-hidden"
              >
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  {/* Left: Technical Details */}
                  <div className="lg:col-span-7">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#0070ad] font-bold mb-2 block">
                      {currentCapability.tagline}
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1E2229] mb-5 tracking-tight">
                      {currentCapability.label}
                    </h3>
                    <p className="text-base text-[#4A5568] leading-relaxed font-body mb-8">
                      {currentCapability.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-5 mb-8">
                      {currentCapability.keyFeatures.map((feat, fIdx) => (
                        <motion.div
                          key={fIdx}
                          whileHover={{ y: -3, transition: { duration: 0.25 } }}
                          className="p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#0070ad]/40 shadow-2xs hover:shadow-xs transition-all duration-300"
                        >
                          <h4 className="text-sm font-display font-bold text-[#1E2229] mb-1.5 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#0070ad] shrink-0" />
                            {feat.title}
                          </h4>
                          <p className="text-xs text-[#718096] leading-relaxed">{feat.desc}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 pt-6 border-t border-[#E2E8F0]">
                      <span className="text-xs text-[#718096] font-semibold mr-1">
                        Production Deliverables:
                      </span>
                      {currentCapability.deliverables.map((deliv, dIdx) => (
                        <span
                          key={dIdx}
                          className="px-3 py-1 rounded-lg bg-white text-[#0070ad] border border-[#0070ad]/20 text-xs font-mono font-medium shadow-2xs"
                        >
                          {deliv}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Technical Artwork Preview */}
                  <div className="lg:col-span-5">
                    <motion.div
                      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                      className="rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-xl relative aspect-[4/3] group bg-slate-950"
                    >
                      <img
                        src={currentCapability.image}
                        alt={currentCapability.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 border border-[#E2E8F0] backdrop-blur-md shadow-lg">
                        <p className="text-xs font-bold text-[#1E2229] mb-1 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0070ad]" />
                          Enterprise Grade Architecture
                        </p>
                        <p className="text-[11px] text-[#718096] font-medium">
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
      {/* 5. DOMAIN GOVERNANCE & FRAMEWORK */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 relative z-10 border-b border-[#E2E8F0] bg-[#F8FAFC]/80">
        <div className="container mx-auto px-4 max-w-[1240px]">
          <motion.div
            whileHover={{ boxShadow: '0 24px 50px -10px rgba(23, 124, 227, 0.12)' }}
            className="rounded-3xl p-8 sm:p-12 lg:p-16 bg-white border border-[#0070ad]/25 shadow-[0_10px_40px_rgba(0,0,0,0.04)] relative overflow-hidden transition-shadow duration-500"
          >
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#0070ad]/8 to-[#00A3E0]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#0070ad]/25 bg-[#EBF5FB] text-[#0070ad] text-xs font-bold uppercase tracking-wider mb-4">
                <ShieldCheck className="w-4 h-4 text-[#0070ad]" />
                <span>{service.governanceBadge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#0E0A42] mb-6">
                <KineticHeading
                  text={service.governanceTitle}
                  highlightWords={service.governanceTitle.split(' ').slice(0, 3)}
                  highlightClassName="bg-clip-text text-transparent bg-gradient-to-r from-[#0070ad] via-[#00A3E0] to-[#0070ad] font-extrabold"
                />
              </h2>
              <p className="text-base sm:text-lg text-[#4A5568] leading-relaxed font-body">
                {service.governanceSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.governancePillars.map((item, idx) => {
                const GovIcon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
                    className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0070ad]/40 hover:bg-white hover:shadow-[0_12px_30px_rgba(23, 124, 227,0.12)] transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#EBF5FB] border border-[#0070ad]/20 flex items-center justify-center text-[#0070ad] mb-5 group-hover:bg-[#0070ad] group-hover:text-white transition-all duration-300 shadow-2xs">
                      <GovIcon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-display font-bold text-[#1E2229] mb-2.5 group-hover:text-[#0070ad] transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#718096] leading-relaxed font-body">
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
      {/* 6. APPLIED SECTOR DEPLOYMENTS (with Sector Previews) */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 relative z-10 border-b border-[#E2E8F0] bg-white">
        <div className="container mx-auto px-4 max-w-[1240px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#0070ad] uppercase font-mono block mb-3">
              Sector Specialization
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#0E0A42] mb-6">
              <KineticHeading
                text="Applied Solutions Across Key Sectors"
                highlightWords={['Applied', 'Solutions', 'Sectors']}
                className="justify-center"
              />
            </h2>
            <p className="text-base sm:text-lg text-[#4A5568] leading-relaxed">
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
                    whileHover={{ x: 4, transition: { duration: 0.25 } }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#0070ad] to-[#00A3E0] border-[#0070ad] text-white shadow-md shadow-sky-500/20'
                        : 'bg-white border-[#E2E8F0] text-[#4A5568] hover:bg-[#F8FAFC] hover:text-[#0070ad] shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-[#EBF5FB] text-[#0070ad]'
                        }`}
                      >
                        <IndIcon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-bold">{ind.name}</span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isSelected ? 'translate-x-1 text-white' : 'text-[#A0AEC0]'
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>

            {/* Sector Detail Panel with Image Preview */}
            <div className="lg:col-span-8">
              {currentIndustryData && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndustryData.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-3xl p-8 sm:p-10 bg-[#F8FAFC] border border-[#E2E8F0] shadow-[0_12px_40px_rgba(15,23,42,0.05)] relative overflow-hidden"
                  >
                    {/* Sector Image Preview Header */}
                    {(() => {
                      const sectorImg =
                        currentIndustryData.image ||
                        domainAssets.sectorImages[currentIndustryData.id] ||
                        domainAssets.heroFallback;

                      return (
                        <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden mb-8 border border-[#E2E8F0] shadow-md group/ind bg-slate-950">
                          <img
                            src={sectorImg}
                            alt={currentIndustryData.name}
                            className="w-full h-full object-cover group-hover/ind:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

                          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between z-10">
                            <div>
                              <span className="text-[10px] font-mono uppercase tracking-wider text-[#0070ad] font-bold block mb-1">
                                Validated Industry Solution
                              </span>
                              <h4 className="text-lg sm:text-xl font-display font-bold text-white drop-shadow-sm">
                                {currentIndustryData.name}
                              </h4>
                            </div>

                            <div className="text-right p-2.5 sm:p-3 rounded-xl bg-white/95 backdrop-blur-md border border-white/30 shadow-lg">
                              <div className="text-xl sm:text-2xl font-display font-extrabold text-[#0070ad]">
                                {currentIndustryData.metric}
                              </div>
                              <div className="text-[10px] text-[#718096] uppercase tracking-wider font-mono font-medium">
                                {currentIndustryData.metricLabel}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    <div className="mb-6">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#0070ad] font-bold block mb-1">
                        Production Blueprint
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#1E2229]">
                        {currentIndustryData.headline}
                      </h3>
                    </div>

                    <p className="text-base text-[#4A5568] leading-relaxed font-body mb-8">
                      {currentIndustryData.description}
                    </p>

                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#718096] mb-4 font-bold">
                      Specialized Architectures &amp; Use Cases:
                    </h4>

                    <div className="space-y-3">
                      {currentIndustryData.useCases.map((uc, ucIdx) => (
                        <motion.div
                          key={ucIdx}
                          whileHover={{ x: 4, transition: { duration: 0.2 } }}
                          className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#E2E8F0] text-sm text-[#1E2229] font-medium shadow-2xs hover:border-[#0070ad]/40 transition-colors duration-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#0070ad] shrink-0" />
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
      {/* 7. REAL-WORLD CASE STUDIES (with Thumbnail Images) */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 relative z-10 border-b border-[#E2E8F0] bg-[#F8FAFC]/80">
        <div className="container mx-auto px-4 max-w-[1240px]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#0070ad] uppercase font-mono block mb-3">
              Production Proof
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#0E0A42] mb-4">
              <KineticHeading
                text="Quantified Enterprise Outcomes"
                highlightWords={['Quantified', 'Outcomes']}
                className="justify-center"
              />
            </h2>
            <p className="text-[#4A5568] text-sm sm:text-base leading-relaxed">
              Explore how global enterprises deploy our architectures to capture measurable operational and revenue advantage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {service.caseStudies.map((cs, idx) => {
              const csImg =
                cs.image ||
                domainAssets.caseStudyImages[idx % domainAssets.caseStudyImages.length];

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{
                    y: -8,
                    borderColor: 'rgba(23, 124, 227, 0.4)',
                    boxShadow: '0 24px 50px -10px rgba(23, 124, 227, 0.16)',
                    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                  }}
                  className="rounded-[28px] bg-white border border-[#E2E8F0] shadow-[0_4px_24px_rgba(0,0,0,0.05)] transition-all duration-400 flex flex-col justify-between group overflow-hidden"
                >
                  {/* Image Header with Zoom Hover */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                    <img
                      src={csImg}
                      alt={cs.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#0070ad] shadow-sm">
                        {cs.client}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white backdrop-blur-sm shadow-sm">
                        {cs.impact}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-7 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-xl font-display font-bold text-[#1E2229] mb-3 leading-snug group-hover:text-[#0070ad] transition-colors duration-300">
                        {cs.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4A5568] font-body leading-relaxed mb-6">
                        {cs.desc}
                      </p>
                    </div>

                    <div className="pt-5 border-t border-[#F1F5F9] flex items-end justify-between">
                      <div>
                        <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0070ad]">
                          {cs.stat}
                        </div>
                        <div className="text-[11px] text-[#718096] font-mono font-medium">
                          {cs.statLabel}
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#0070ad] group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center gap-1">
                        Case Study <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 8. EXECUTIVE CONSULTATION CTA */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-20 bg-white relative z-10">
        <div className="container mx-auto px-4 max-w-[1240px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[32px] p-8 sm:p-14 bg-gradient-to-br from-[#EBF5FB] via-white to-sky-50/60 border border-[#0070ad]/20 shadow-[0_20px_50px_rgba(23, 124, 227,0.08)] text-center"
          >
            <div className="max-w-3xl mx-auto relative z-10">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF5FB] text-[#0070ad] text-xs font-bold uppercase tracking-wider mb-5 border border-[#0070ad]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#0070ad]" />
                Accelerate Your Digital Transformation
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#0E0A42] mb-5 tracking-tight">
                Ready to Modernize Your Enterprise with {service.title}?
              </h2>
              <p className="text-base sm:text-lg text-[#4A5568] mb-8 max-w-2xl mx-auto leading-relaxed">
                Connect directly with Fastigo's domain practice leads and senior solution architects to architect bespoke, production-ready enterprise solutions.
              </p>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#0070ad] to-[#00A3E0] hover:from-[#005a8c] hover:to-[#0ea5e9] text-white font-semibold rounded-xl shadow-lg shadow-sky-500/25 transition-all duration-300 group text-base"
                >
                  <span>Schedule Practice Consultation</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GenericServicePage;
