import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  Building2, 
  Mail, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Menu, 
  X, 
  Bot, 
  ChevronRight,
  TrendingUp,
  Search,
  MessageSquare,
  Target,
  Layers,
  Flame,
  BarChart3,
  Mic,
  Volume2,
  Folder,
  Radio,
  PhoneCall,
  Zap,
  CheckCheck,
  Send,
  Database,
  Smartphone,
  Lock,
  Server,
  Workflow,
  Cpu,
  Headphones,
  ExternalLink,
  ChevronDown,
  Repeat,
  Compass,
  FileText
} from 'lucide-react';
import fastigoLogo from '@/assets/fastigo-logo.webp';
import heroAiCoreImg from '@/assets/omnisell-hero-ai-core.jpg';
import astronautHeroImg from '@/assets/omnisell-hero-astronaut-clean.jpg';
import neuralNexusHeroBg from '@/assets/omnisell-session1-terracotta-nexus.jpg';
import { Switch } from '@/components/ui/switch';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


// FASTIGO OMNISELL COLOR CODE & THEME SYSTEM
// Hero Background: Deep Obsidian Black (#000000 / #050508)
// Hero Primary Accent: Fastigo Terracotta Orange (#C8492C)
// Interactive Demo Background: Warm Natural Cream / Eggshell (#F4EFEB / #FAF7F2)
// Interactive Demo Accent: Fastigo Terracotta Red-Orange (#C8492C / #D04B2B)
// Text Dark: #0D0D0D / #1A1A1A
// Neon Cyan Spark: #00E5FF / #38BDF8

interface OmniSellAgentPageProps {
  product?: any;
}

// FASTIGO 3D PARTICLE SPHERE WITH TERRACOTTA & BLACK WAVE BANDS
const ParticleSphere: React.FC<{ isTalking: boolean }> = ({ isTalking }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;
    const width = (canvas.width = 360);
    const height = (canvas.height = 360);
    const radius = 118;
    const particles: { lat: number; lon: number }[] = [];

    const rings = 32;
    for (let i = 0; i < rings; i++) {
      const lat = (Math.PI / rings) * (i + 0.5) - Math.PI / 2;
      const count = Math.max(6, Math.floor(Math.cos(lat) * 56));
      for (let j = 0; j < count; j++) {
        const lon = (2 * Math.PI / count) * j;
        particles.push({ lat, lon });
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      angle += isTalking ? 0.024 : 0.008;

      const cx = width / 2;
      const cy = height / 2;

      const projected = particles.map((p) => {
        const wave = Math.sin(p.lon * 3 + angle * 2.5) * (isTalking ? 18 : 9) * Math.cos(p.lat);
        const r = radius + wave;
        const x3d = r * Math.cos(p.lat) * Math.sin(p.lon + angle);
        const y3d = r * Math.sin(p.lat);
        const z3d = r * Math.cos(p.lat) * Math.cos(p.lon + angle);

        const scale = 260 / (260 - z3d * 0.35);
        const x2d = cx + x3d * scale * 0.70;
        const y2d = cy + y3d * scale * 0.70;
        const isTerracottaBand = Math.abs(p.lat) < 0.22;
        const isBlackBand = Math.abs(p.lat) >= 0.22 && Math.abs(p.lat) < 0.38;

        return { x: x2d, y: y2d, z: z3d, isTerracottaBand, isBlackBand };
      });

      projected.sort((a, b) => a.z - b.z);

      for (const p of projected) {
        if (p.z < -radius * 0.9) continue;
        const alpha = Math.max(0.18, (p.z + radius) / (2 * radius));
        ctx.beginPath();
        const size = Math.max(0.85, (p.isTerracottaBand || p.isBlackBand ? 2.3 : 1.35) * (p.z > 0 ? 1.25 : 0.8));
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);

        if (p.isTerracottaBand) {
          ctx.fillStyle = `rgba(200, 73, 44, ${alpha * 0.95})`;
        } else if (p.isBlackBand) {
          ctx.fillStyle = `rgba(18, 18, 18, ${alpha * 0.9})`;
        } else {
          ctx.fillStyle = `rgba(120, 120, 120, ${alpha * 0.5})`;
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTalking]);

  return <canvas ref={canvasRef} className="w-[230px] h-[230px] xs:w-[270px] xs:h-[270px] sm:w-[330px] sm:h-[330px] mx-auto block max-w-full" />;
};

export const OmniSellAgentPage: React.FC<OmniSellAgentPageProps> = ({ product }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const [activeChannel, setActiveChannel] = useState<string>('VOICE');
  const [selectedScenario, setSelectedScenario] = useState<string>('RECEPTIONIST');
  const [selectedPersona, setSelectedPersona] = useState<string>('CONFIDENT');
  const [isSimulatingCall, setIsSimulatingCall] = useState<boolean>(false);
  const [activeMotionTab, setActiveMotionTab] = useState<'outbound' | 'inbound' | 'expansion'>('outbound');
  
  // Fastigo Hero Dynamic Rotating Words & Email State
  const rotatingWords = ['Email', 'Voice', 'Chat', 'Inbound', 'Outbound'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [heroEmail, setHeroEmail] = useState('');
  const [heroVoicePlaying, setHeroVoicePlaying] = useState(false);

  useEffect(() => {
    const wordTimer = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2800);
    return () => clearInterval(wordTimer);
  }, [rotatingWords.length]);

  const channels = ['VOICE', 'EMAIL', 'CHAT', 'SOCIAL', 'SMS & WHATSAPP', 'HUMAN DIALER'];

  const channelDescriptions: Record<string, string> = {
    'VOICE': 'Voice agents built to qualify and convert inbound demand, and drive expansion revenue.',
    'EMAIL': 'Autonomous email agents that research accounts, craft personalized outreach, and book pipeline.',
    'CHAT': 'Omnichannel web chat agents that engage visitors instantly, qualify intent, and capture leads.',
    'SOCIAL': 'Social & LinkedIn agents that identify warm buyer signals and initiate high-converting conversations.',
    'SMS & WHATSAPP': 'Instant two-way messaging agents for rapid response times and appointment scheduling.',
    'HUMAN DIALER': 'AI-copiloted dialing assistant that handles pre-call research and post-call CRM logging.'
  };

  const scenarios = ['RECEPTIONIST', 'SPEED-TO-LEAD', 'UPSELL'];

  const personas = ['CONFIDENT', 'ENERGETIC', 'SUPPORTIVE', 'PROFESSIONAL', 'GENTLE', 'DOWN TO EARTH', 'BRITISH'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    }
  }, []);

  const pricingPlans = product?.pricing || [
    {
      name: "Growth",
      price: { monthly: "$79", annual: "$65" },
      description: "For small sales teams looking to scale outbound outreach.",
      features: ["2 connected accounts", "Email & LinkedIn automation", "500 AI credits/mo", "Standard CRM sync", "Real-time signal alerts"],
      ctaText: "Start Free Trial"
    },
    {
      name: "Scale",
      price: { monthly: "$199", annual: "$159" },
      description: "For established teams demanding omni-channel presence.",
      features: ["5 connected accounts", "All channels (Voice, WhatsApp, SMS)", "2,000 AI credits/mo", "Sub-60s Inbound conversion", "Advanced pipeline analytics"],
      isPopular: true,
      ctaText: "Get Scale"
    },
    {
      name: "Enterprise",
      price: { monthly: "Custom", annual: "Custom" },
      description: "For large organizations with complex GTM structures.",
      features: ["Unlimited accounts & seats", "Custom multi-agent workflows", "Unlimited AI credits", "Dedicated AI engineer", "Custom SLA & Okta SSO"],
      ctaText: "Contact Sales"
    }
  ];

  const comparisonData = product?.comparison || [
    { feature: "Connected Accounts", starter: "2", pro: "5", enterprise: "Unlimited" },
    { feature: "Autonomous Channels", starter: "Email & LinkedIn", pro: "All 6 Channels", enterprise: "All 6 Channels" },
    { feature: "Inbound Speed-to-Lead (< 60s)", starter: false, pro: true, enterprise: true },
    { feature: "Voice AI Dialing & Interruption", starter: false, pro: true, enterprise: true },
    { feature: "AI Research & Signal Triggers", starter: "500 credits", pro: "2,000 credits", enterprise: "Unlimited" },
    { feature: "Bi-Directional CRM Sync", starter: "Standard", pro: "Real-time 2-Way", enterprise: "Custom Pipelines" },
    { feature: "Enterprise Security & SOC 2", starter: true, pro: true, enterprise: true }
  ];

  const clientLogos = [
    { name: "Brex", label: "BREX" },
    { name: "Ramp", label: "RAMP" },
    { name: "Deel", label: "deel." },
    { name: "Checkr", label: "Checkr" },
    { name: "Leica Biosystems", label: "Leica" },
    { name: "Remote", label: "remote" },
    { name: "Vanta", label: "VANTA" },
    { name: "Carta", label: "carta" }
  ];

  const faqs = [
    {
      q: "How does OmniSell differ from traditional sales automation tools?",
      a: "Traditional sales sequencers rely on static templates and human reps doing manual data entry. OmniSell deploys autonomous digital workers (like Fastigo SDR and Fastigo Inbound) that research accounts in real-time, synthesize 10-K & funding signals, execute personalized 2-way conversations across voice, email, chat, and WhatsApp, and book meetings directly into your CRM."
    },
    {
      q: "Will OmniSell replace my existing sales reps?",
      a: "No. OmniSell acts as a superhuman force multiplier. It takes over the tedious 80% of sales work—prospecting, reading annual reports, drafting cold emails, and following up—so your human account executives can spend 100% of their day having high-value conversations and closing deals."
    },
    {
      q: "How does OmniSell prevent hallucinations in prospect conversations?",
      a: "OmniSell uses a deterministic multi-agent consensus architecture. Every draft generated by the Messaging Agent must be validated by the Context & Verification Agent against your actual company Knowledge Base, pricing matrices, and CRM ground truth before anything is dispatched."
    },
    {
      q: "What CRM and sales systems are supported out of the box?",
      a: "OmniSell supports bi-directional native synchronization with Salesforce, HubSpot, Gong, Snowflake, Outreach, Salesloft, Apollo, Slack, and Notion with automated meeting logging and field enrichment."
    },
    {
      q: "How quickly can our team go live with OmniSell?",
      a: "Most revenue teams are fully operational within 48 to 72 hours. Simply connect your CRM, upload your product knowledge docs or pitch decks, set your target ICP criteria, and your digital workers will begin prospecting and qualifying immediately."
    }
  ];

  return (
    <div className="text-white min-h-screen selection:bg-[#C8492C]/40 selection:text-white relative overflow-x-hidden font-sans bg-[#000000]">

      {/* =========================================================================
          01 — HERO: SESSION 1 WITH GENERATED CYBERNETIC NEURAL NEXUS BACKGROUND
          Visual: Glowing OmniSell Hexagonal Core with concentric rings & floating connected cards
          Headline: [ Email ] agents that drive revenue (dynamic rotating brackets)
          Input: Work email pill + Get a Demo > button
          CTA: Or hear it first: Try Voice AI →
          Coordinates: X: -122.39 | Y: 37.78
      ========================================================================= */}
      <section className="relative z-10 pt-24 xs:pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-28 lg:pb-32 min-h-[620px] sm:min-h-[800px] lg:min-h-[860px] flex items-center bg-[#000000] overflow-hidden">
        {/* Full-bleed Clean Cybernetic Astronaut Background (100% Text-Free & Logo-Free) */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <img
            src={astronautHeroImg}
            alt="Fastigo OmniSell Autonomous Revenue Agent Hero"
            className="w-full h-full object-cover object-right md:object-[82%_center] filter brightness-[0.92] contrast-[1.08]"
          />
          {/* Crisp gradients ensuring pure contrast on the left for text while keeping astronaut radiant on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/80 to-transparent sm:via-[#000000]/65 lg:via-[#000000]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#000000]/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/80 via-transparent to-[#000000]" />
          {/* Subtle Warm Terracotta Core Radiance matching theme color #C8492C */}
          <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[550px] h-[550px] bg-[radial-gradient(circle,_rgba(200,73,44,0.18)_0%,_transparent_70%)] blur-[95px] pointer-events-none" />
        </div>


        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 w-full">
          <div className="max-w-2xl lg:max-w-3xl space-y-7 sm:space-y-8">
            
            {/* Tag: FOR FRONTIER REVENUE TEAMS */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs sm:text-sm font-sans tracking-[0.2em] uppercase font-semibold text-[#B0B7C3]"
            >
              FOR FRONTIER REVENUE TEAMS
            </motion.div>

            {/* Dynamic Rotating Bracketed Headline */}
            <div className="space-y-1">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold text-white tracking-tight leading-[1.1] sm:leading-[1.05] break-words"
              >
                <span className="text-[#C8492C] font-mono mr-2">[</span>
                <span className="inline-block text-white">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotatingWords[currentWordIndex]}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="inline-block"
                    >
                      {rotatingWords[currentWordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="text-[#C8492C] font-mono ml-2 mr-3 sm:mr-4">]</span>
                <span>agents</span>
                <br />
                <span>that drive revenue</span>
              </motion.h1>
            </div>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-sm xs:text-base sm:text-lg md:text-xl text-[#C8CED8] font-normal leading-relaxed max-w-xl"
            >
              Convert inbound demand. Run your outbound playbooks. <br className="hidden sm:inline" />
              Expand your accounts. Across every channel.
            </motion.p>

            {/* Work Email Pill + Get a Demo > Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="space-y-4 pt-1"
            >
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setDemoModalOpen(true);
                }}
                className="max-w-md w-full bg-white rounded-full p-1 sm:p-1.5 flex items-center shadow-[0_12px_40px_rgba(0,0,0,0.6)] border border-white/20"
              >
                <input
                  type="email"
                  placeholder="Work email"
                  value={heroEmail}
                  onChange={(e) => setHeroEmail(e.target.value)}
                  className="flex-1 min-w-0 px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 text-xs sm:text-sm text-[#111111] placeholder-[#777777] bg-transparent outline-none rounded-full"
                  required
                />
                <button
                  type="submit"
                  className="px-3.5 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#C8492C] hover:bg-[#B83E26] transition-colors flex items-center gap-1 shrink-0 shadow-md cursor-pointer"
                >
                  <span>Get a Demo</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Secondary CTA: Or hear it first: Try Voice AI → */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/85">
                <span className="text-[#A1A8B8]">Or hear it first:</span>
                <button
                  type="button"
                  onClick={() => {
                    setHeroVoicePlaying(!heroVoicePlaying);
                    setIsSimulatingCall(true);
                  }}
                  className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-medium text-xs sm:text-sm transition-all group cursor-pointer shadow-sm"
                >
                  <span>Try Voice AI</span>
                  <span className="w-5 h-5 rounded-full bg-white text-[#111111] flex items-center justify-center text-[11px] group-hover:translate-x-0.5 transition-transform font-bold">
                    →
                  </span>
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          02 — SECOND SESSION: INTERACTIVE AI SALES AGENT DEMO
          Sales agents that turn conversations into revenue
          Theme: Warm Cream BG (#F4EFEB), Terracotta (#C8492C) & Black Pills!
      ========================================================================= */}
      <section className="relative z-10 py-14 sm:py-28 bg-[#F4EFEB] border-y border-[#E5DFD7] overflow-hidden text-[#1A1A1A]">
        {/* Soft Ambient Warm Glow */}
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[550px] h-[550px] bg-[radial-gradient(circle,_rgba(200,73,44,0.06)_0%,_transparent_70%)] blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Heading, Channel Switcher, Scenarios, Voices & CTA */}
            <div className="lg:col-span-6 space-y-6">
              
              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] leading-[1.15] sm:leading-[1.12]"
                >
                  <span className="text-[#C8492C]">Sales agents</span> that turn <br />
                  conversations into revenue
                </motion.h2>
              </div>

              {/* Channel Tabs: Black Active Pill matching image b518044e.png */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                {channels.map((ch) => {
                  const isActive = activeChannel === ch;
                  return (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => setActiveChannel(ch)}
                      className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#111111] text-white shadow-sm ring-1 ring-[#111111]'
                          : 'bg-transparent text-[#555555] hover:text-[#111111] hover:bg-black/5'
                      }`}
                    >
                      {ch}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Description */}
              <p className="text-sm sm:text-base text-[#444444] leading-relaxed max-w-xl">
                {channelDescriptions[activeChannel]}
              </p>

              {/* Scenario Selector: Terracotta active pill with radio circle */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#777777] font-semibold">
                  <Folder className="w-3.5 h-3.5 text-[#999999]" />
                  <span>SCENARIO</span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {scenarios.map((sc) => {
                    const isSelected = selectedScenario === sc;
                    return (
                      <button
                        key={sc}
                        type="button"
                        onClick={() => setSelectedScenario(sc)}
                        className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#C8492C] text-white shadow-sm'
                            : 'bg-transparent text-[#444444] border border-[#DDD5C9] hover:border-[#BBADA0] hover:bg-black/5'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-white bg-white/20' : 'border-[#999999]'}`}>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                        <span>{sc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Voice / Persona Selector: Terracotta active pill with radio circle */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#777777] font-semibold">
                  <Radio className="w-3.5 h-3.5 text-[#999999]" />
                  <span>VOICE</span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {personas.map((p) => {
                    const isSelected = selectedPersona === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setSelectedPersona(p)}
                        className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#C8492C] text-white shadow-sm'
                            : 'bg-transparent text-[#444444] border border-[#DDD5C9] hover:border-[#BBADA0] hover:bg-black/5'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-white bg-white/20' : 'border-[#999999]'}`}>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                        <span>{p}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Button: Fastigo Black Pill */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsSimulatingCall(!isSimulatingCall)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-[#000000] hover:bg-[#222222] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-md group cursor-pointer"
                >
                  <span>Try {activeChannel.charAt(0) + activeChannel.slice(1).toLowerCase()} AI</span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column: Clean White Fastigo Console with Dotted Terracotta Particle Sphere */}
            <div className="lg:col-span-6">
              <div className="bg-[#FFFFFF] rounded-2xl sm:rounded-3xl border border-[#E2DBD1] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] p-3.5 xs:p-5 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[400px] sm:min-h-[480px]">
                
                {/* Console Header Bar */}
                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#F0EBE3] gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="h-6 sm:h-7 px-1 rounded-lg bg-[#F5F2EB] flex items-center justify-center shrink-0">
                      <img src={fastigoLogo} alt="Fastigo" className="h-4 sm:h-4.5 w-auto object-contain" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-[#111111] uppercase truncate">
                      Fastigo OmniSell Multi-Channel
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] sm:text-[10px] font-mono font-semibold shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    ACTIVE
                  </div>
                </div>

                {/* Center Stage: Fastigo 3D Particle Sphere with Terracotta & Black Dotted Waves */}
                <div className="my-auto py-3 sm:py-4 relative flex flex-col items-center justify-center">
                  
                  {/* Floating Motion Wrapper */}
                  <motion.div
                    animate={shouldReduceMotion ? {} : { y: [-8, 8, -8], rotate: [-1.5, 1.5, -1.5] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative cursor-pointer max-w-full"
                    onClick={() => setIsSimulatingCall(!isSimulatingCall)}
                  >
                    {/* The 3D Dotted Wave Particle Sphere */}
                    <ParticleSphere isTalking={isSimulatingCall} />

                    {/* Subtle Radial Glow */}
                    <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-[#C8492C]/10 to-transparent blur-2xl pointer-events-none" />
                  </motion.div>

                  {/* Radial Arc Guideline */}
                  <div className="relative w-full max-w-[260px] sm:max-w-[280px] flex flex-col items-center mt-[-6px] sm:mt-[-10px]">
                    <svg className="w-full h-10 sm:h-12 stroke-[#D8D0C5] overflow-visible pointer-events-none">
                      <path d="M 10 26 Q 130 -4 250 26" fill="none" strokeWidth="1" strokeDasharray="4 4" />
                    </svg>

                    {/* Central Microphone / Talk Button in Terracotta */}
                    <div className="absolute -top-3 flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => setIsSimulatingCall(!isSimulatingCall)}
                        className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white transition-all shadow-lg cursor-pointer ${
                          isSimulatingCall
                            ? 'bg-emerald-600 shadow-emerald-500/40 ring-4 ring-emerald-200 animate-pulse'
                            : 'bg-[#C8492C] hover:bg-[#B33F24] shadow-[0_0_25px_rgba(200,73,44,0.4)]'
                        }`}
                      >
                        <Mic className="w-4 h-4 sm:w-6 sm:h-6" />
                      </button>

                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#777777] font-bold mt-2 text-center">
                        {isSimulatingCall ? 'SPEAKING • CLICK TO MUTE' : 'READY TO TALK'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Console Footer Bar */}
                <div className="pt-3 sm:pt-4 border-t border-[#F0EBE3] flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-center sm:text-left">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-[#777777]">
                    <Volume2 className="w-3.5 h-3.5 text-[#C8492C] shrink-0" />
                    <span>REAL-TIME CONVERSATION • POWERED BY FASTIGO OMNISELL</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDemoModalOpen(true)}
                    className="w-full sm:w-auto justify-center px-5 py-2 rounded-full bg-[#C8492C] hover:bg-[#B33F24] text-white text-xs font-semibold tracking-wider transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                  >
                    <span>Book a Demo</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          REVENUE MOTIONS (MINIMALIST BLACK & WHITE WITH ORANGE ICONS)
          Scale outbound. Capture demand. Expand accounts.
          Revenue agents that do the work in one unified platform. Across all channels.
      ========================================================================= */}
      <section id="motions" className="relative z-10 py-24 sm:py-32 bg-white border-b border-[#E5DFD7] overflow-hidden text-[#111111]">
        {/* Subtle Ambient Warm Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse,_rgba(200,73,44,0.05)_0%,_transparent_70%)] blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Block: Animated Modern Text with Minimum Words (White BG Theme with Orange Icon) */}
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-16 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4EFEB] border border-[#E5DFD7] text-xs font-mono font-semibold text-[#111111] tracking-widest uppercase shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8492C] animate-ping" />
              <span>Revenue agents that accelerate growth</span>
            </motion.div>

            {/* Modern Animated Staggered Heading */}
            <div className="space-y-1 sm:space-y-2">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15 }
                  }
                }}
                className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#111111] leading-[1.1] sm:leading-[1.06]"
              >
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 25, filter: "blur(6px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="block"
                >
                  Scale outbound.
                </motion.span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 25, filter: "blur(6px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="block text-[#222222]"
                >
                  Capture demand.
                </motion.span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 25, filter: "blur(6px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="block text-[#555555]"
                >
                  Expand accounts.
                </motion.span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="text-sm sm:text-lg text-[#555555] max-w-xl mx-auto font-normal leading-relaxed"
            >
              Revenue agents that do the work in one unified platform. Across all channels.
            </motion.p>
          </div>

          {/* 3 Premium Boxes (Minimalist White Background with Pure Orange Icons) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* BOX 1: Scale outbound (Fastigo SDR · AI Outbound) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group relative rounded-2xl sm:rounded-3xl bg-[#09090D] border border-black/10 hover:border-black/25 p-4 xs:p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden text-white"
            >
              {/* Subtle Ambient Backlight Glow */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#C8492C]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C8492C]/18 transition-all duration-500" />
              
              {/* Watermark Number */}
              <span className="absolute -bottom-4 -right-2 text-7xl sm:text-8xl font-mono font-black text-white/[0.03] group-hover:text-white/[0.06] transition-colors pointer-events-none select-none">
                01
              </span>

              <div className="space-y-6 relative z-10">
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C8492C] animate-pulse" />
                    <span className="text-[11px] font-mono tracking-widest text-white/70 uppercase font-semibold">
                      01 // OUTBOUND
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white/[0.05] border border-white/10 text-white/80">
                    Fastigo SDR · AI Outbound
                  </span>
                </div>

                {/* Title & Minimum Text */}
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
                    Scale outbound
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    Researches live buying signals and launches 1:1 hyper-personalized outreach that books pipeline automatically.
                  </p>
                </div>

                {/* Premium Micro-UI Box: Minimal Black & White + Orange Icons */}
                <div className="p-3 xs:p-4 rounded-xl sm:rounded-2xl bg-[#000000] border border-white/[0.08] space-y-2.5 sm:space-y-3 shadow-inner">
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                        SJ
                      </div>
                      <span className="text-white font-medium truncate">Sarah J. • VP RevOps</span>
                    </div>
                    <span className="text-[10px] font-mono text-white/80 bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded shrink-0">
                      99% ICP
                    </span>
                  </div>

                  {/* Signal Pill with Orange Icon */}
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[11px] text-white/80">
                    <Zap className="w-3.5 h-3.5 text-[#C8492C] shrink-0" />
                    <span className="truncate">Signal: $150M Series D funding detected</span>
                  </div>

                  {/* Dispatched Confirmation with Orange Check */}
                  <div className="flex items-center justify-between pt-1 border-t border-white/[0.06] text-[10px] font-mono text-white/90">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-[#C8492C]" />
                      Meeting Booked • Thu 2 PM
                    </span>
                    <span className="text-white/40">HUBSPOT</span>
                  </div>
                </div>
              </div>

              {/* Metrics Row & CTA */}
              <div className="pt-6 border-t border-white/[0.08] mt-6 space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white font-mono tracking-tight">3.8x</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Pipeline Lift</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white font-mono tracking-tight">84%</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Reply Rate</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setDemoModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-white/[0.06] hover:bg-white text-white hover:text-black border border-white/10 text-xs font-semibold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-sm"
                >
                  <span>Deploy Fastigo SDR</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C8492C] group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* BOX 2: Capture demand (Fastigo Inbound · Voice & Chat) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group relative rounded-2xl sm:rounded-3xl bg-[#09090D] border border-black/10 hover:border-black/25 p-4 xs:p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden text-white"
            >
              {/* Subtle Ambient Backlight Glow */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#C8492C]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C8492C]/18 transition-all duration-500" />
              
              {/* Watermark Number */}
              <span className="absolute -bottom-4 -right-2 text-7xl sm:text-8xl font-mono font-black text-white/[0.03] group-hover:text-white/[0.06] transition-colors pointer-events-none select-none">
                02
              </span>

              <div className="space-y-6 relative z-10">
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C8492C] animate-pulse" />
                    <span className="text-[11px] font-mono tracking-widest text-white/70 uppercase font-semibold">
                      02 // INBOUND
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white/[0.05] border border-white/10 text-white/80">
                    Fastigo Inbound · Voice & Chat
                  </span>
                </div>

                {/* Title & Minimum Text */}
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
                    Capture demand
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    Instantly engages every website visitor, inbound form and pricing inquiry with conversational voice and chat in seconds.
                  </p>
                </div>

                {/* Premium Micro-UI Box: Fastigo Voice & Chat Interaction */}
                <div className="p-3 xs:p-4 rounded-xl sm:rounded-2xl bg-[#000000] border border-white/[0.08] space-y-2.5 sm:space-y-3 shadow-inner">
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-white font-medium">Inbound Call Connected</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      &lt; 60s SLA
                    </span>
                  </div>

                  {/* Audio waveform simulation */}
                  <div className="flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    {[40, 75, 30, 90, 60, 100, 45, 80, 55, 95, 35, 70, 85, 50, 65, 40].map((h, i) => (
                      <span
                        key={i}
                        className="w-1 bg-[#C8492C] rounded-full transition-all"
                        style={{ height: `${h * 0.22}px` }}
                      />
                    ))}
                  </div>

                  {/* Qualified Outcome with Orange Icon */}
                  <div className="flex items-center justify-between pt-1 border-t border-white/[0.06] text-[10px] font-mono text-white/90">
                    <span className="flex items-center gap-1.5">
                      <PhoneCall className="w-3 h-3 text-[#C8492C]" />
                      Qualified &amp; Demo Transferred
                    </span>
                    <span className="text-white/40">GONG</span>
                  </div>
                </div>
              </div>

              {/* Metrics Row & CTA */}
              <div className="pt-6 border-t border-white/[0.08] mt-6 space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white font-mono tracking-tight">&lt; 60s</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Speed to Lead</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white font-mono tracking-tight">4.6x</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider font-mono">More SQLs</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setDemoModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-white/[0.06] hover:bg-white text-white hover:text-black border border-white/10 text-xs font-semibold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-sm"
                >
                  <span>Deploy Fastigo Inbound</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C8492C] group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* BOX 3: Expand accounts (Fastigo Expansion · Account Growth) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group relative rounded-2xl sm:rounded-3xl bg-[#09090D] border border-black/10 hover:border-black/25 p-4 xs:p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden text-white"
            >
              {/* Subtle Ambient Backlight Glow */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#C8492C]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C8492C]/18 transition-all duration-500" />
              
              {/* Watermark Number */}
              <span className="absolute -bottom-4 -right-2 text-7xl sm:text-8xl font-mono font-black text-white/[0.03] group-hover:text-white/[0.06] transition-colors pointer-events-none select-none">
                03
              </span>

              <div className="space-y-6 relative z-10">
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C8492C] animate-pulse" />
                    <span className="text-[11px] font-mono tracking-widest text-white/70 uppercase font-semibold">
                      03 // EXPANSION
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white/[0.05] border border-white/10 text-white/80">
                    Fastigo Expansion · Account Growth
                  </span>
                </div>

                {/* Title & Minimum Text */}
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
                    Expand accounts
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    Monitors product usage milestones, org chart expansions and renewals to capture net-retention ARR automatically.
                  </p>
                </div>

                {/* Premium Micro-UI Box: Expansion Signal */}
                <div className="p-3 xs:p-4 rounded-xl sm:rounded-2xl bg-[#000000] border border-white/[0.08] space-y-2.5 sm:space-y-3 shadow-inner">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-white font-medium">Enterprise Tier Account</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      HEALTH: 98%
                    </span>
                  </div>

                  {/* Signal Pill with Orange Icon */}
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[11px] text-white/80">
                    <TrendingUp className="w-3.5 h-3.5 text-[#C8492C] shrink-0" />
                    <span className="truncate">Trigger: 100% Seat Capacity Reached</span>
                  </div>

                  {/* Automated Upgrade Dispatched with Orange Check */}
                  <div className="flex items-center justify-between pt-1 border-t border-white/[0.06] text-[10px] font-mono text-white/90">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-[#C8492C]" />
                      +$65,000 ARR Proposal Dispatched
                    </span>
                    <span className="text-white/40">SALESFORCE</span>
                  </div>
                </div>
              </div>

              {/* Metrics Row & CTA */}
              <div className="pt-6 border-t border-white/[0.08] mt-6 space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white font-mono tracking-tight">135%</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Net Retention</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white font-mono tracking-tight">2.4x</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Faster Expansion</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setDemoModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-white/[0.06] hover:bg-white text-white hover:text-black border border-white/10 text-xs font-semibold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-sm"
                >
                  <span>Deploy Fastigo Expansion</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C8492C] group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          04 — ROADMAP: ONE AI AGENT. THE ENTIRE SALES MOTION.
          Theme: Monochrome Black & White with Orange Accents (#C8492C)
      ========================================================================= */}
      <section id="platform" className="relative z-10 py-16 sm:py-32 bg-white border-t border-[#E5DFD7] overflow-hidden text-[#111111]">
        {/* Subtle Ambient Warm Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[radial-gradient(ellipse,_rgba(200,73,44,0.05)_0%,_transparent_75%)] blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#0000000d_1px,transparent_1px)] [background-size:28px_28px] opacity-70 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4EFEB] border border-[#E5DFD7] text-[#111111] text-xs font-mono tracking-widest uppercase shadow-sm">
              <Zap className="w-3.5 h-3.5 text-[#C8492C] animate-pulse" />
              <span>ONE SHARED BRAIN. ACROSS EVERY CHANNEL.</span>
            </div>

            <div className="overflow-hidden">
              <motion.h2 
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111111] uppercase leading-[1.08]"
              >
                ONE AI AGENT. <br />
                <span className="text-[#333333]">
                  THE ENTIRE SALES MOTION.
                </span>
              </motion.h2>
            </div>

            <p className="text-sm sm:text-base text-[#555555] leading-relaxed max-w-2xl mx-auto font-normal">
              An autonomous architecture powered by one continuous shared intelligence. From unified context and coordinated multi-agent reasoning to frictionless omnichannel execution.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setDemoModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] hover:bg-[#C8492C] text-xs sm:text-sm font-semibold text-white transition-all shadow-md group cursor-pointer"
              >
                <span>Deploy Platform</span>
                <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* THE ROADMAP PIPELINE (Central Spine with 3 Milestones) */}
          <div className="relative">
            
            {/* Central Spine Line in Clean Orange & Gray Gradient */}
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-[2px] bg-gradient-to-b from-[#C8492C] via-black/15 to-[#C8492C] opacity-50 shadow-sm" />
            <div className="lg:hidden absolute left-4 sm:left-6 top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#C8492C] via-black/15 to-[#C8492C] opacity-50" />

            <div className="space-y-12 sm:space-y-20 lg:space-y-24">
              
              {/* MILESTONE 01: CONTEXT */}
              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-center">
                
                {/* Roadmap Node Indicator */}
                <div className="absolute left-4 sm:left-6 lg:left-1/2 -translate-x-1/2 -top-1 lg:top-1/2 lg:-translate-y-1/2 z-20 flex items-center justify-center">
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white border-2 border-[#C8492C] shadow-md flex items-center justify-center text-[#111111] font-mono font-bold text-xs sm:text-sm">
                    01
                  </div>
                </div>

                {/* Left Column: Text & Narrative */}
                <div className="lg:col-span-6 pl-7 xs:pl-9 sm:pl-16 lg:pl-0 lg:pr-14 text-left space-y-3 sm:space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F4EFEB] border border-[#E5DFD7] text-[#111111] text-xs font-mono font-semibold tracking-wider">
                    <Database className="w-3.5 h-3.5 text-[#C8492C]" />
                    <span>MILESTONE 01 • CONTEXT</span>
                  </div>
                  
                  <h3 className="text-lg xs:text-xl sm:text-3xl lg:text-4xl font-bold text-[#111111] tracking-tight leading-tight">
                    Unified customer and <br className="hidden sm:block" />
                    market context
                  </h3>
                  
                  <p className="text-sm sm:text-base text-[#555555] leading-relaxed font-normal">
                    Your CRM, knowledge base, website activity and every OmniSell conversation, connected through supported integrations, and enriched with real-time third-party signals about your priority accounts.
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                    {['Salesforce', 'HubSpot', 'Snowflake', 'Gong', 'Notion', 'Slack'].map((tool) => (
                      <span key={tool} className="px-2.5 py-1 rounded-full bg-[#F4EFEB] border border-[#E5DFD7] text-xs font-mono text-[#333333]">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Live Telemetry Context Visual Card */}
                <div className="lg:col-span-6 pl-7 xs:pl-9 sm:pl-16 lg:pl-14">
                  <div className="bg-[#09090D] border border-white/10 hover:border-white/20 rounded-2xl p-4 sm:p-7 shadow-2xl relative overflow-hidden group transition-all text-white">
                    <div className="absolute top-0 right-0 w-44 h-44 bg-[#C8492C]/10 blur-3xl pointer-events-none" />
                    
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08] text-xs font-mono">
                      <div className="flex items-center gap-2 text-white font-semibold">
                        <span className="w-2 h-2 rounded-full bg-[#C8492C] animate-pulse" />
                        <span>SHARED CONTEXT LAYER</span>
                      </div>
                      <span className="text-white/60 text-[10px]">REAL-TIME ENRICHMENT</span>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                          <span className="text-white/40 block text-[9px]">BI-DIRECTIONAL CRM</span>
                          <span className="text-white font-medium">Salesforce &amp; HubSpot</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                          <span className="text-white/40 block text-[9px]">INTENT DE-ANONYMIZED</span>
                          <span className="text-white font-medium">Website Live Traffic</span>
                        </div>
                      </div>

                      <div className="p-3 sm:p-3.5 rounded-xl bg-[#000000] border border-white/[0.08] space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <span className="text-white font-bold text-sm">CloudScale Networks</span>
                          <span className="px-2 py-0.5 rounded-full bg-white/[0.08] border border-white/10 text-white text-[10px] font-bold">
                            99.2% FIT SCORE
                          </span>
                        </div>
                        <div className="text-[11px] text-white/80 flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-[#C8492C] shrink-0" />
                          <span>Trigger: Series B ($38M) • Hiring 14 SDRs in US/EMEA</span>
                        </div>
                        <div className="text-[10px] text-white/50 leading-relaxed">
                          Knowledge Base Synced: Product Pricing Matrix &amp; Battlecards
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>


              {/* MILESTONE 02: INTELLIGENCE */}
              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-center">
                
                {/* Roadmap Node Indicator */}
                <div className="absolute left-4 sm:left-6 lg:left-1/2 -translate-x-1/2 -top-1 lg:top-1/2 lg:-translate-y-1/2 z-20 flex items-center justify-center">
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white border-2 border-[#C8492C] shadow-md flex items-center justify-center text-[#111111] font-mono font-bold text-xs sm:text-sm">
                    02
                  </div>
                </div>

                {/* Left Column: Multi-Agent Swarm Visual Card */}
                <div className="lg:col-span-6 order-2 lg:order-1 pl-7 xs:pl-9 sm:pl-16 lg:pl-0 lg:pr-14">
                  <div className="bg-[#09090D] border border-white/10 hover:border-white/20 rounded-2xl p-4 sm:p-7 shadow-2xl relative overflow-hidden group transition-all text-white">
                    <div className="absolute top-0 left-0 w-44 h-44 bg-[#C8492C]/10 blur-3xl pointer-events-none" />

                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08] text-xs font-mono">
                      <div className="flex items-center gap-2 text-white font-semibold">
                        <Bot className="w-4 h-4 text-[#C8492C]" />
                        <span>MULTI-AGENT ORCHESTRATION</span>
                      </div>
                      <span className="text-white/80 text-[10px] bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded">
                        COORDINATED
                      </span>
                    </div>

                    <div className="space-y-2.5 font-mono text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 p-2.5 rounded-lg bg-[#000000] border border-white/[0.06]">
                        <div className="flex items-center gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-[#C8492C]" />
                          <span className="text-white font-medium">Research Agent</span>
                        </div>
                        <span className="text-[10px] text-white/50">10-K &amp; Exec Hiring Scraped</span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 p-2.5 rounded-lg bg-[#000000] border border-white/[0.06]">
                        <div className="flex items-center gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-[#C8492C]" />
                          <span className="text-white font-medium">Context Agent</span>
                        </div>
                        <span className="text-[10px] text-white/50">Value Props Matched (99.8%)</span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 p-2.5 rounded-lg bg-[#000000] border border-white/[0.06]">
                        <div className="flex items-center gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-[#C8492C]" />
                          <span className="text-white font-medium">Dispatch Agent</span>
                        </div>
                        <span className="text-[10px] text-[#C8492C] font-bold">Synchronized Multi-Channel</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Narrative */}
                <div className="lg:col-span-6 order-1 lg:order-2 pl-7 xs:pl-9 sm:pl-16 lg:pl-14 text-left space-y-3 sm:space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F4EFEB] border border-[#E5DFD7] text-[#111111] text-xs font-mono font-semibold tracking-wider">
                    <Workflow className="w-3.5 h-3.5 text-[#C8492C]" />
                    <span>MILESTONE 02 • INTELLIGENCE</span>
                  </div>

                  <h3 className="text-lg xs:text-xl sm:text-3xl lg:text-4xl font-bold text-[#111111] tracking-tight leading-tight">
                    Specialized agents, <br className="hidden sm:block" />
                    collaborative intelligence
                  </h3>

                  <p className="text-sm sm:text-base text-[#555555] leading-relaxed font-normal">
                    OmniSell coordinates a swarm of purpose-built AI agents—each an expert in research, positioning, objection handling, or scheduling—delivering nuanced, context-aware execution that never hallucinates.
                  </p>

                  <div className="space-y-2 pt-1 text-xs sm:text-sm text-[#444444]">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#C8492C] shrink-0" />
                      <span>Deterministic guardrails strictly prevent pricing or product hallucinations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#C8492C] shrink-0" />
                      <span>Continuous reinforcement learning from won/lost deal feedback loops</span>
                    </div>
                  </div>
                </div>

              </div>


              {/* MILESTONE 03: EXECUTION */}
              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-center">
                
                {/* Roadmap Node Indicator */}
                <div className="absolute left-4 sm:left-6 lg:left-1/2 -translate-x-1/2 -top-1 lg:top-1/2 lg:-translate-y-1/2 z-20 flex items-center justify-center">
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white border-2 border-[#C8492C] shadow-md flex items-center justify-center text-[#111111] font-mono font-bold text-xs sm:text-sm">
                    03
                  </div>
                </div>

                {/* Left Column: Text & Narrative */}
                <div className="lg:col-span-6 pl-7 xs:pl-9 sm:pl-16 lg:pl-0 lg:pr-14 text-left space-y-3 sm:space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F4EFEB] border border-[#E5DFD7] text-[#111111] text-xs font-mono font-semibold tracking-wider">
                    <Radio className="w-3.5 h-3.5 text-[#C8492C]" />
                    <span>MILESTONE 03 • EXECUTION</span>
                  </div>

                  <h3 className="text-lg xs:text-xl sm:text-3xl lg:text-4xl font-bold text-[#111111] tracking-tight leading-tight">
                    Frictionless omnichannel <br className="hidden sm:block" />
                    conversation loops
                  </h3>

                  <p className="text-sm sm:text-base text-[#555555] leading-relaxed font-normal">
                    Prospects respond on their terms. OmniSell transitions seamlessly from cold email to personalized LinkedIn outreach, to interactive voice calls, and direct WhatsApp replies without losing context.
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {[
                      { channel: "Voice AI", rate: "< 400ms Latency" },
                      { channel: "2-Way Email", rate: "99.4% Deliverability" },
                      { channel: "LinkedIn Touch", rate: "Warm Connections" },
                      { channel: "WhatsApp Pro", rate: "Direct Executive Line" }
                    ].map((item) => (
                      <div key={item.channel} className="p-2 rounded-lg bg-[#FAF8F5] border border-[#EBE5DC] text-xs">
                        <span className="text-[#111111] font-semibold block">{item.channel}</span>
                        <span className="text-[10px] text-[#C8492C] font-mono">{item.rate}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Execution Live Terminal Card */}
                <div className="lg:col-span-6 pl-7 xs:pl-9 sm:pl-16 lg:pl-14">
                  <div className="bg-[#09090D] border border-white/10 hover:border-white/20 rounded-2xl p-4 sm:p-7 shadow-2xl relative overflow-hidden group transition-all text-white">
                    <div className="absolute bottom-0 right-0 w-44 h-44 bg-[#C8492C]/10 blur-3xl pointer-events-none" />

                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08] text-xs font-mono">
                      <div className="flex items-center gap-2 text-white font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>LIVE EXECUTION STREAM</span>
                      </div>
                      <span className="text-[#C8492C] text-[10px]">ALL CHANNELS ACTIVE</span>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="p-3 rounded-xl bg-[#000000] border border-white/[0.08] space-y-2">
                        <div className="flex items-center justify-between text-[10px] text-white/50">
                          <span>CHANNEL: ULTRA-LOW LATENCY VOICE</span>
                          <span className="text-emerald-400">CALL COMPLETED</span>
                        </div>
                        <div className="text-white text-[11px] leading-snug">
                          "I saw your recent expansion into Frankfurt. Would Tuesday 10 AM CET work for a brief 15-minute briefing?"
                        </div>
                        <div className="text-[10px] text-white/60 flex items-center justify-between pt-1 border-t border-white/[0.06]">
                          <span>PROSPECT: "Yes, send the calendar invite."</span>
                          <span className="text-[#C8492C] font-bold">INVITE DISPATCHED</span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-[11px]">
                        <span className="text-white/60">CRM Lead Status</span>
                        <span className="text-emerald-400 font-bold">QUALIFIED_MEETING_SET</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>




      {/* =========================================================================
          05 — PROVEN IMPACT & CASE STUDIES
          Theme: Clean White Background with Terracotta Orange (#C8492C)
      ========================================================================= */}
      <section id="results" className="relative z-10 py-24 sm:py-32 bg-white border-t border-[#E5DFD7] text-[#111111] overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse,_rgba(200,73,44,0.05)_0%,_transparent_75%)] blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C8492C] block font-semibold">
              PROVEN RESULTS
            </span>
            <div className="overflow-hidden">
              <motion.h2 
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-2xl xs:text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] uppercase"
              >
                REAL IMPACT. <br />
                SUPERHUMAN REVENUE.
              </motion.h2>
            </div>
            <p className="text-base text-[#555555]">
              How leading enterprise revenue organizations scale pipeline and compress sales cycles with OmniSell.
            </p>
          </div>

          {/* 4 Quantified Customer Outcome Cards in Dark Obsidian + Orange */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-[#09090D] rounded-2xl p-6 sm:p-7 border border-black/10 hover:border-[#C8492C]/50 transition-all duration-300 flex flex-col justify-between group shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-white">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-white/50 font-semibold mb-3">
                  LEICA BIOSYSTEMS
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#C8492C] font-mono tracking-tight mb-2">
                  $4.2M
                </div>
                <h4 className="text-base font-bold text-white mb-2">Net-New Pipeline</h4>
                <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                  Expanded into brand-new healthcare verticals by deploying AI agents to execute deep 10-K research and executive outreach.
                </p>
              </div>
              <div className="pt-6 border-t border-white/[0.08] mt-6 flex items-center gap-1.5 text-xs font-mono text-[#C8492C] font-semibold">
                <span>Enterprise Case Study</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="bg-[#09090D] rounded-2xl p-6 sm:p-7 border border-black/10 hover:border-[#C8492C]/50 transition-all duration-300 flex flex-col justify-between group shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-white">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-white/50 font-semibold mb-3">
                  CHECKR
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#C8492C] font-mono tracking-tight mb-2">
                  700%
                </div>
                <h4 className="text-base font-bold text-white mb-2">Program ROI</h4>
                <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                  Generated a 3.2x increase in reply rates from stalled enterprise leads, converting dormant contacts into revenue.
                </p>
              </div>
              <div className="pt-6 border-t border-white/[0.08] mt-6 flex items-center gap-1.5 text-xs font-mono text-[#C8492C] font-semibold">
                <span>Enterprise Case Study</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="bg-[#09090D] rounded-2xl p-6 sm:p-7 border border-black/10 hover:border-[#C8492C]/50 transition-all duration-300 flex flex-col justify-between group shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-white">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-white/50 font-semibold mb-3">
                  MMB NETWORKS
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#C8492C] font-mono tracking-tight mb-2">
                  5x Lift
                </div>
                <h4 className="text-base font-bold text-white mb-2">Qualified Meetings</h4>
                <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                  Replaced generic outbound templates with real-time intent-triggered messaging, driving 2.5x industry reply rates.
                </p>
              </div>
              <div className="pt-6 border-t border-white/[0.08] mt-6 flex items-center gap-1.5 text-xs font-mono text-[#C8492C] font-semibold">
                <span>Enterprise Case Study</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="bg-[#09090D] rounded-2xl p-6 sm:p-7 border border-black/10 hover:border-[#C8492C]/50 transition-all duration-300 flex flex-col justify-between group shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-white">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-white/50 font-semibold mb-3">
                  BRAINSUITE
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#C8492C] font-mono tracking-tight mb-2">
                  40% Time
                </div>
                <h4 className="text-base font-bold text-white mb-2">Saved per SDR</h4>
                <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                  Empowered a single sales rep to handle the prospecting volume and calendar output of a 10-person SDR team.
                </p>
              </div>
              <div className="pt-6 border-t border-white/[0.08] mt-6 flex items-center gap-1.5 text-xs font-mono text-[#C8492C] font-semibold">
                <span>Enterprise Case Study</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setDemoModalOpen(true)}
              className="px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-[#C8492C] hover:bg-[#B33F24] shadow-[0_4px_25px_rgba(200,73,44,0.35)] transition-all cursor-pointer"
            >
              See All Customer Stories →
            </button>
          </div>

        </div>
      </section>

{/* =========================================================================
          08 — PRICING & FEATURE COMPARISON
      ========================================================================= */}
      <section id="pricing" className="relative z-10 py-24 sm:py-32 bg-[#000000] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C8492C] block">
              TRANSPARENT INVESTMENT
            </span>
            <div className="overflow-hidden">
              <motion.h2 
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-2xl xs:text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase"
              >
                SIMPLE, TRANSPARENT PRICING
              </motion.h2>
            </div>
            <p className="text-base text-[#B4BAC5]">
              Choose the right tier to deploy digital workers and boost qualified meetings booked.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-[#737B88]'}`}>
                Monthly
              </span>
              <Switch 
                checked={isAnnual} 
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-[#C8492C]" 
              />
              <span className={`text-sm font-medium flex items-center gap-2 ${isAnnual ? 'text-white' : 'text-[#737B88]'}`}>
                Annually
                <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold bg-[#C8492C]/25 text-[#C8492C] border border-[#C8492C]/40">
                  Save 20%
                </span>
              </span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {pricingPlans.map((plan: any, index: number) => {
              const isPopular = plan.isPopular;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className={`relative p-8 rounded-[14px] border transition-all duration-300 flex flex-col justify-between ${
                    isPopular
                      ? 'bg-[#0E0E18] border-[#C8492C] shadow-[0_0_40px_rgba(200,73,44,0.25)] md:scale-105 z-10'
                      : 'bg-[#0A0A0E] border-white/10 hover:border-white/25'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C8492C] text-white px-4 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-xs text-[#B4BAC5] mb-6 h-8">{plan.description}</p>
                    
                    <div className="mb-6 flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white tracking-tight">
                        {isAnnual ? plan.price.annual : plan.price.monthly}
                      </span>
                      {plan.price.monthly !== 'Custom' && (
                        <span className="text-xs font-mono text-[#737B88]">/month</span>
                      )}
                    </div>

                    <ul className="space-y-3 mb-8 text-xs text-[#B4BAC5]">
                      {plan.features.map((feat: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isPopular ? 'text-[#C8492C]' : 'text-[#C8492C]'}`} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setDemoModalOpen(true)}
                    className={`w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                      isPopular
                        ? 'bg-[#C8492C] hover:bg-[#B33F24] text-white shadow-[0_0_25px_rgba(200,73,44,0.4)]'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {plan.ctaText}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Feature Comparison Table */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6 text-center uppercase tracking-tight">
              Compare Features
            </h3>
            
            <div className="bg-[#0A0A0E] rounded-[14px] border border-white/10 overflow-hidden shadow-xl">
              <div className="overflow-x-auto no-scrollbar scroll-smooth">
                <div className="sm:hidden text-right pb-2 text-[10px] font-mono text-[#C8492C] tracking-wider uppercase">← Swipe table to compare →</div>
                <table className="w-full min-w-[440px] sm:min-w-[500px] text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#050508]">
                      <th className="p-3.5 sm:p-4 font-mono text-[#737B88] uppercase tracking-wider w-1/4">Feature</th>
                      <th className="p-3.5 sm:p-4 font-mono text-center text-white">Starter</th>
                      <th className="p-3.5 sm:p-4 font-mono text-center text-[#C8492C] bg-[#C8492C]/10">Scale (Pro)</th>
                      <th className="p-3.5 sm:p-4 font-mono text-center text-white">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row: any, i: number) => (
                      <tr key={i} className="border-b border-white/[0.06] hover:bg-white/[0.02]">
                        <td className="p-3.5 sm:p-4 font-medium text-white">{row.feature}</td>
                        <td className="p-3.5 sm:p-4 text-center text-[#B4BAC5]">
                          {typeof row.starter === 'boolean' ? (
                            row.starter ? <Check className="w-4 h-4 text-[#C8492C] mx-auto" /> : <span className="text-[#737B88]">—</span>
                          ) : (
                            row.starter
                          )}
                        </td>
                        <td className="p-3.5 sm:p-4 text-center font-semibold text-[#C8492C] bg-[#C8492C]/5">
                          {typeof row.pro === 'boolean' ? (
                            row.pro ? <Check className="w-4 h-4 text-[#C8492C] mx-auto" /> : <span className="text-[#737B88]">—</span>
                          ) : (
                            row.pro
                          )}
                        </td>
                        <td className="p-3.5 sm:p-4 text-center text-white font-medium">
                          {typeof row.enterprise === 'boolean' ? (
                            row.enterprise ? <Check className="w-4 h-4 text-[#C8492C] mx-auto" /> : <span className="text-[#737B88]">—</span>
                          ) : (
                            row.enterprise
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          09 — FREQUENTLY ASKED QUESTIONS (FAQ)
      ========================================================================= */}
      <section id="faq" className="relative z-10 py-24 sm:py-32 bg-[#050508] border-t border-white/[0.08] overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C8492C] block">
              QUESTIONS & ANSWERS
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-base text-[#94A3B8]">
              Everything you need to know about deploying OmniSell across your revenue organization.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`}
                className="bg-[#0D0D14] border border-white/10 rounded-2xl px-6 py-2 overflow-hidden hover:border-[#C8492C]/60 transition-colors"
              >
                <AccordionTrigger className="text-left font-bold text-sm sm:text-lg text-white hover:text-[#C8492C] transition-colors py-3 sm:py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-[#94A3B8] leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

        </div>
      </section>


      {/* =========================================================================
          10 — FINAL HIGH-IMPACT CTA (Theme: Clean White Background with Orange Accents)
      ========================================================================= */}
      <section className="relative z-10 py-14 sm:py-32 bg-white border-t border-[#E5DFD7] overflow-hidden text-center text-[#111111]">
        {/* Soft Warm Terracotta Atmospheric Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,73,44,0.07)_0%,_transparent_70%)] blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5 sm:space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C8492C] block font-semibold">
            GET STARTED
          </span>

          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111] uppercase leading-[1.08]"
            >
              LET YOUR AI SALES <br />
              AGENT HANDLE <br />
              THE CHASING.
            </motion.h2>
          </div>

          <p className="text-sm sm:text-lg text-[#555555] max-w-xl mx-auto">
            You focus on the conversation. OmniSell keeps the pipeline moving.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setDemoModalOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-[#C8492C] hover:bg-[#B33F24] transition-all duration-300 shadow-[0_4px_25px_rgba(200,73,44,0.35)] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Book a Demo</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => setDemoModalOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-medium text-[#111111] hover:text-black bg-black/[0.04] hover:bg-black/[0.08] border border-black/10 transition-all duration-300"
            >
              Talk to Us
            </button>
          </div>
        </div>
      </section>





      {/* =========================================================================
          DEMO BOOKING DIALOG
      ========================================================================= */}
      <Dialog open={demoModalOpen} onOpenChange={setDemoModalOpen}>
        <DialogContent className="bg-[#09090F] border border-white/15 text-white max-w-md w-[92vw] sm:w-full p-5 sm:p-8 rounded-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C8492C]" />
              Schedule a Fastigo OmniSell Demo
            </DialogTitle>
            <DialogDescription className="text-xs text-[#B4BAC5]">
              See how OmniSell finds prospects, generates personalized messages, and books meetings for your sales team.
            </DialogDescription>
          </DialogHeader>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you! A Fastigo sales engineer will contact you within 24 hours.");
              setDemoModalOpen(false);
            }} 
            className="space-y-4 pt-3"
          >
            <div>
              <label className="text-[11px] font-mono text-[#737B88] block mb-1">WORK EMAIL</label>
              <input
                required
                type="email"
                placeholder="alex@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121B] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#C8492C]"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-[#737B88] block mb-1">FULL NAME</label>
              <input
                required
                type="text"
                placeholder="Alex Morgan"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121B] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#C8492C]"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-[#737B88] block mb-1">COMPANY NAME</label>
              <input
                required
                type="text"
                placeholder="Acme Inc."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121B] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#C8492C]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#C8492C] hover:bg-[#B33F24] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-[0_0_25px_rgba(200,73,44,0.4)]"
              >
                Confirm Demo Request
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default OmniSellAgentPage;