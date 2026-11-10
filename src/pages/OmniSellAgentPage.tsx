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
  Smartphone
} from 'lucide-react';
import fastigoLogo from '@/assets/fastigo-logo.webp';
import salesWorkspaceImg from '@/assets/sales-late-night-workspace.jpg';
import heroAiCoreImg from '@/assets/omnisell-hero-ai-core.jpg';
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
import Footer from '@/components/Footer';

// FASTIGO AUTHENTIC WEBSITE COLOR SYSTEM
// Primary Brand Blue: #0070AD
// Dark Brand Blue / Hover: #005a8c
// Light Blue / Electric Cyan: #00A3E0
// Brand Navy / Headings: #0E0A42
// Dark Background Tone: #041021

interface OmniSellAgentPageProps {
  product?: any;
}

const ParticleSphere: React.FC<{ isTalking: boolean }> = ({ isTalking }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;
    const width = (canvas.width = 340);
    const height = (canvas.height = 340);
    const radius = 115;
    const particles: { lat: number; lon: number }[] = [];

    const rings = 30;
    for (let i = 0; i < rings; i++) {
      const lat = (Math.PI / rings) * (i + 0.5) - Math.PI / 2;
      const count = Math.max(6, Math.floor(Math.cos(lat) * 55));
      for (let j = 0; j < count; j++) {
        const lon = (2 * Math.PI / count) * j;
        particles.push({ lat, lon });
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      angle += isTalking ? 0.022 : 0.007;

      const cx = width / 2;
      const cy = height / 2;

      const projected = particles.map((p) => {
        const wave = Math.sin(p.lon * 3 + angle * 2.5) * (isTalking ? 16 : 8) * Math.cos(p.lat);
        const r = radius + wave;
        const x3d = r * Math.cos(p.lat) * Math.sin(p.lon + angle);
        const y3d = r * Math.sin(p.lat);
        const z3d = r * Math.cos(p.lat) * Math.cos(p.lon + angle);

        const scale = 260 / (260 - z3d * 0.35);
        const x2d = cx + x3d * scale * 0.68;
        const y2d = cy + y3d * scale * 0.68;
        const isWaveBand = Math.abs(p.lat) < 0.28;

        return { x: x2d, y: y2d, z: z3d, isWaveBand };
      });

      projected.sort((a, b) => a.z - b.z);

      for (const p of projected) {
        if (p.z < -radius * 0.9) continue;
        const alpha = Math.max(0.15, (p.z + radius) / (2 * radius));
        ctx.beginPath();
        const size = Math.max(0.8, (p.isWaveBand ? 2.2 : 1.3) * (p.z > 0 ? 1.2 : 0.8));
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);

        if (p.isWaveBand) {
          ctx.fillStyle = `rgba(0, 112, 173, ${alpha * 0.95})`;
        } else {
          ctx.fillStyle = `rgba(30, 41, 59, ${alpha * 0.55})`;
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

  return <canvas ref={canvasRef} className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] mx-auto block" />;
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
  const [motionChannel, setMotionChannel] = useState<'EMAIL' | 'VOICE AI' | 'LINKEDIN'>('EMAIL');

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
      description: "For small sales teams looking to scale outreach.",
      features: ["2 connected accounts", "Email & LinkedIn automation", "500 AI credits/mo", "Standard reporting"],
      ctaText: "Start Free Trial"
    },
    {
      name: "Scale",
      price: { monthly: "$199", annual: "$159" },
      description: "For established teams demanding omni-channel presence.",
      features: ["5 connected accounts", "All channels (WhatsApp/SMS)", "2,000 AI credits/mo", "Advanced analytics"],
      isPopular: true,
      ctaText: "Get Scale"
    },
    {
      name: "Enterprise",
      price: { monthly: "Custom", annual: "Custom" },
      description: "For large organizations with complex sales structures.",
      features: ["Unlimited accounts", "Custom workflows", "Unlimited AI credits", "Dedicated success manager"],
      ctaText: "Contact Sales"
    }
  ];

  const comparisonData = product?.comparison || [
    { feature: "Connected Accounts", starter: "2", pro: "5", enterprise: "Unlimited" },
    { feature: "Channels", starter: "Email/LI", pro: "All Channels", enterprise: "All Channels" },
    { feature: "AI Personalization", starter: "500 credits", pro: "2,000 credits", enterprise: "Unlimited" },
    { feature: "White-labeling", starter: false, pro: false, enterprise: true },
    { feature: "Reporting", starter: "Standard", pro: "Advanced", enterprise: "Custom Dashboards" }
  ];

  return (
    <div className="text-white min-h-screen selection:bg-[#0070AD]/30 selection:text-white relative overflow-x-hidden font-sans">

      {/* =========================================================================
          NAVBAR: EXACT FASTIGO WEBSITE COLOR CODE & FROSTED GLASS STYLING
      ========================================================================= */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-2xl border-b border-slate-200/80 shadow-[0_4px_24px_rgba(0,112,173,0.08)] py-3' 
            : 'bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-[0_2px_16px_rgba(0,0,0,0.04)] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* LEFT: Fastigo logo (Original Crisp Display) + OmniSell Badge */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={fastigoLogo} 
              alt="Fastigo" 
              className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-all duration-300" 
            />
            <span className="text-slate-300 text-lg font-light">/</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00A3E0] shadow-[0_0_8px_#00A3E0] animate-pulse" />
              <span className="font-bold text-[#0E0A42] tracking-tight text-base sm:text-lg group-hover:text-[#0070AD] transition-colors">
                OmniSell
              </span>
            </div>
          </Link>

          {/* CENTER: Floating Pill Navigation Matching Website Style */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 rounded-full border border-slate-200/80 bg-white/80 px-6 py-2 backdrop-blur-md shadow-sm">
            <a href="#capabilities" className="text-[14px] font-medium text-[#0E0A42] hover:text-[#0070AD] transition-colors">
              Platform
            </a>
            <a href="#pricing" className="text-[14px] font-medium text-[#0E0A42] hover:text-[#0070AD] transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-[14px] font-medium text-[#0E0A42] hover:text-[#0070AD] transition-colors">
              FAQ
            </a>
          </nav>

          {/* RIGHT: Primary Fastigo Blue Action Button */}
          <div className="hidden sm:flex items-center gap-4">
            <button 
              onClick={() => setDemoModalOpen(true)}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full text-[14px] font-semibold tracking-wide text-white bg-[#0070AD] hover:bg-[#005a8c] hover:shadow-[0_8px_20px_rgba(0,112,173,0.3)] transition-all duration-300 shadow-md cursor-pointer group"
            >
              <span>Book a Demo</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#0E0A42] hover:text-[#0070AD]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/98 border-b border-slate-200/80 px-6 py-6 space-y-4 shadow-xl backdrop-blur-xl"
            >
              <a 
                href="#capabilities" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-[#0E0A42] hover:text-[#0070AD] py-1"
              >
                Platform
              </a>
              <a 
                href="#pricing" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-[#0E0A42] hover:text-[#0070AD] py-1"
              >
                Pricing
              </a>
              <a 
                href="#faq" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-[#0E0A42] hover:text-[#0070AD] py-1"
              >
                FAQ
              </a>
              <div className="pt-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setDemoModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold text-white bg-[#0070AD] hover:bg-[#005a8c]"
                >
                  Book a Demo <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>


      {/* =========================================================================
          01 — HERO (Background: #030507, Fastigo Blue Glow, AI Neural Core Graphic)
      ========================================================================= */}
      <section className="relative z-10 pt-40 pb-24 sm:pt-44 md:pt-48 md:pb-32 bg-[#030507] overflow-hidden">
        {/* Full-bleed AI Generated Hero Neural Core Background */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <img
            src={heroAiCoreImg}
            alt="OmniSell AI Sales Agent Neural Core"
            className="w-full h-full object-cover object-right filter brightness-[0.7] contrast-[1.15]"
          />
          {/* Directional Gradients for Crisp Left-Column Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030507] via-[#030507]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030507] via-transparent to-[#030507]/80" />
          <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[650px] h-[650px] bg-[radial-gradient(circle,_rgba(0,112,173,0.25)_0%,_rgba(0,200,255,0.1)_40%,_transparent_70%)] blur-[90px] pointer-events-none" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
            
            {/* LEFT CONTENT */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Technical label */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10141A] border border-white/10 text-xs font-mono uppercase tracking-widest text-[#00A3E0]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0] animate-ping" />
                OMNISELL — AI SALES AGENT
              </motion.div>

              {/* Line-by-line masked text reveal */}
              <div className="space-y-1">
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold text-white tracking-tight leading-[0.98]"
                  >
                    YOUR AI
                  </motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#00A3E0] tracking-tight leading-[0.98]"
                  >
                    SALES AGENT.
                  </motion.h1>
                </div>
              </div>

              {/* Supporting copy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-1.5 text-lg sm:text-xl text-[#B4BAC5] font-light max-w-xl"
              >
                <p>Find the right prospects.</p>
                <p>Start the right conversations.</p>
                <p>Follow up without slowing down.</p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-2 flex flex-wrap items-center gap-4"
              >
                <button
                  onClick={() => setDemoModalOpen(true)}
                  className="px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-[#0070AD] hover:bg-[#005a8c] transition-all duration-300 shadow-[0_0_25px_rgba(0,112,173,0.4)] hover:shadow-[0_0_35px_rgba(0,112,173,0.7)] flex items-center gap-2 group cursor-pointer"
                >
                  <span>Book a Demo</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <a
                  href="#capabilities"
                  className="px-7 py-3.5 rounded-full text-sm font-medium text-[#B4BAC5] hover:text-white bg-[#10141A]/80 border border-white/10 hover:border-[#0070AD]/60 transition-all duration-300"
                >
                  See How It Works
                </a>
              </motion.div>

              {/* Minimal Trust Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="pt-4 flex items-center gap-4 text-xs text-[#737B88] font-mono"
              >
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#00A3E0]" /> Enterprise Ready
                </span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>Multi-channel Orchestration</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>Autonomous Pipeline</span>
              </motion.div>
            </div>

            {/* RIGHT VISUAL: Sophisticated OmniSell AI Core & Spaced-Out Floating Animated Cards */}
            <div className="lg:col-span-7 relative flex items-center justify-center min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] w-full">
              
              {/* Outer Cybernetic Orbital Rings */}
              <div className="absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] rounded-full border border-white/[0.08] animate-[spin_60s_linear_infinite]" />
              <div className="absolute w-[250px] h-[250px] sm:w-[310px] sm:h-[310px] rounded-full border border-dashed border-[#0070AD]/40 animate-[spin_40s_linear_infinite_reverse]" />
              <div className="absolute w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full border border-[#00A3E0]/30 animate-[spin_30s_linear_infinite]" />
              <div className="absolute w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] rounded-full bg-gradient-to-tr from-[#0070AD]/25 to-[#00A3E0]/25 blur-2xl" />

              {/* Central OmniSell AI Nexus */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                className="relative z-20 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#080C14]/95 border-2 border-[#0070AD] shadow-[0_0_70px_rgba(0,112,173,0.5)] flex flex-col items-center justify-center p-3 text-center backdrop-blur-xl group cursor-pointer transition-transform"
              >
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#0070AD]/30 via-transparent to-[#00A3E0]/30" />
                
                {/* Glowing Hexagonal Logo Aperture */}
                <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#0B1017] border border-[#00A3E0]/60 flex items-center justify-center mb-1 shadow-[0_0_20px_rgba(0,163,224,0.4)] group-hover:border-[#00A3E0] transition-colors">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#00A3E0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2" />
                    <circle cx="12" cy="12" r="3" fill="#00A3E0" fillOpacity="0.4" />
                  </svg>
                </div>
                
                <div className="relative z-10 font-bold text-white text-sm sm:text-base tracking-tight">
                  OmniSell
                </div>
                <div className="relative z-10 text-[9px] sm:text-[10px] font-mono text-[#00A3E0] tracking-widest uppercase font-semibold">
                  AI Core
                </div>
              </motion.div>

              {/* Floating Card 1: PROSPECTS (Top-Right - Ample Distance) */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [-6, 6, -6], x: [0, 2, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.04, y: -4 }}
                className="absolute top-2 sm:top-4 right-[-10px] sm:right-[-20px] lg:right-[-35px] z-20 bg-[#0B1017]/90 backdrop-blur-xl border border-white/15 hover:border-[#0070AD]/80 hover:shadow-[0_0_25px_rgba(0,112,173,0.35)] rounded-2xl p-3 sm:p-3.5 shadow-2xl flex items-center gap-3 transition-all cursor-pointer group max-w-[225px]"
              >
                <div className="flex -space-x-2 shrink-0">
                  <img className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#0B1017] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120" alt="Lead" />
                  <img className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#0B1017] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120" alt="Lead" />
                  <img className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#0B1017] object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120" alt="Lead" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white tracking-tight leading-snug group-hover:text-[#00A3E0] transition-colors">Prospects</h4>
                  <p className="text-[11px] text-[#8C9BAE] leading-snug">High-intent leads identified</p>
                </div>
              </motion.div>

              {/* Floating Card 2: COMPANY INSIGHTS (Top-Left - Ample Distance) */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [6, -6, 6], x: [0, -2, 0] }}
                transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                whileHover={{ scale: 1.04, y: -4 }}
                className="absolute top-2 sm:top-4 left-[-10px] sm:left-[-20px] lg:left-[-35px] z-20 bg-[#0B1017]/90 backdrop-blur-xl border border-white/15 hover:border-[#0070AD]/80 hover:shadow-[0_0_25px_rgba(0,112,173,0.35)] rounded-2xl p-3 sm:p-3.5 shadow-2xl flex items-center gap-3 transition-all cursor-pointer group max-w-[215px]"
              >
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00A3E0] group-hover:border-[#0070AD]/50 group-hover:bg-[#0070AD]/20 transition-all shrink-0">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white tracking-tight leading-snug group-hover:text-[#00A3E0] transition-colors">Company Insights</h4>
                  <p className="text-[11px] text-[#8C9BAE] leading-snug">Real-time research & signals</p>
                </div>
              </motion.div>

              {/* Floating Card 3: PERSONALIZED OUTREACH (Middle-Right - Pushed Far Right) */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [-5, 5, -5], x: [2, -2, 2] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                whileHover={{ scale: 1.04, y: -4 }}
                className="absolute top-1/2 -translate-y-1/2 right-[-25px] sm:right-[-45px] lg:right-[-75px] z-20 bg-[#0B1017]/90 backdrop-blur-xl border border-white/15 hover:border-[#0070AD]/80 hover:shadow-[0_0_25px_rgba(0,112,173,0.35)] rounded-2xl p-3 sm:p-3.5 shadow-2xl flex items-center gap-3 transition-all cursor-pointer group max-w-[235px]"
              >
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00A3E0] group-hover:border-[#0070AD]/50 group-hover:bg-[#0070AD]/20 transition-all shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white tracking-tight leading-snug group-hover:text-[#00A3E0] transition-colors">Personalized Outreach</h4>
                  <p className="text-[11px] text-[#8C9BAE] leading-snug">Relevant messages that get replies</p>
                </div>
              </motion.div>

              {/* Floating Card 4: FOLLOW UPS (Bottom-Right - Ample Distance) */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [5, -5, 5], x: [0, 2, 0] }}
                transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                whileHover={{ scale: 1.04, y: -4 }}
                className="absolute bottom-2 sm:bottom-4 right-[-10px] sm:right-[-20px] lg:right-[-35px] z-20 bg-[#0B1017]/90 backdrop-blur-xl border border-white/15 hover:border-[#0070AD]/80 hover:shadow-[0_0_25px_rgba(0,112,173,0.35)] rounded-2xl p-3 sm:p-3.5 shadow-2xl flex items-center gap-3 transition-all cursor-pointer group max-w-[215px]"
              >
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00A3E0] group-hover:border-[#0070AD]/50 group-hover:bg-[#0070AD]/20 transition-all shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white tracking-tight leading-snug group-hover:text-[#00A3E0] transition-colors">Follow Ups</h4>
                  <p className="text-[11px] text-[#8C9BAE] leading-snug">Consistent, natural engagement</p>
                </div>
              </motion.div>

              {/* Floating Card 5: MEETINGS (Bottom-Left - Ample Distance) */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [-6, 6, -6], x: [-2, 2, -2] }}
                transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
                whileHover={{ scale: 1.04, y: -4 }}
                className="absolute bottom-2 sm:bottom-4 left-[-10px] sm:left-[-20px] lg:left-[-35px] z-20 bg-[#0B1017]/90 backdrop-blur-xl border border-white/15 hover:border-[#0070AD]/80 hover:shadow-[0_0_25px_rgba(0,112,173,0.35)] rounded-2xl p-3 sm:p-3.5 shadow-2xl flex items-center gap-3 transition-all cursor-pointer group max-w-[215px]"
              >
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00A3E0] group-hover:border-[#0070AD]/50 group-hover:bg-[#0070AD]/20 transition-all shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white tracking-tight leading-snug group-hover:text-[#00A3E0] transition-colors">Meetings</h4>
                  <p className="text-[11px] text-[#8C9BAE] leading-snug">More conversations. More pipeline.</p>
                </div>
              </motion.div>

              {/* Mini Icon Nodes Floating Along Filaments with Good Clearance */}
              <motion.div 
                animate={{ y: [-3, 3, -3] }} 
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[30%] left-[26%] z-15 w-7 h-7 rounded-lg bg-[#0B1017]/85 border border-[#00A3E0]/40 flex items-center justify-center text-[#00A3E0] shadow-[0_0_12px_rgba(0,163,224,0.4)]"
              >
                <Search className="w-3.5 h-3.5" />
              </motion.div>

              <motion.div 
                animate={{ y: [3, -3, 3] }} 
                transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute bottom-[30%] left-[26%] z-15 w-7 h-7 rounded-lg bg-[#0B1017]/85 border border-[#0070AD]/50 flex items-center justify-center text-[#00A3E0] shadow-[0_0_12px_rgba(0,112,173,0.4)]"
              >
                <Target className="w-3.5 h-3.5" />
              </motion.div>

              <motion.div 
                animate={{ y: [-4, 4, -4] }} 
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[28%] right-[24%] z-15 w-7 h-7 rounded-lg bg-[#0B1017]/85 border border-[#00A3E0]/40 flex items-center justify-center text-[#00A3E0] shadow-[0_0_12px_rgba(0,163,224,0.4)]"
              >
                <Mail className="w-3.5 h-3.5" />
              </motion.div>

              {/* SVG Animated Synaptic Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 stroke-current text-[#0070AD]/40">
                <path d="M 50% 50% Q 70% 30% 84% 14%" fill="none" strokeWidth="1.5" strokeDasharray="5 5" className="animate-[dash_20s_linear_infinite]" />
                <path d="M 50% 50% Q 30% 30% 16% 14%" fill="none" strokeWidth="1.5" strokeDasharray="5 5" className="animate-[dash_20s_linear_infinite]" />
                <path d="M 50% 50% Q 74% 50% 90% 50%" fill="none" strokeWidth="1.5" strokeDasharray="5 5" className="animate-[dash_20s_linear_infinite]" />
                <path d="M 50% 50% Q 70% 70% 84% 86%" fill="none" strokeWidth="1.5" strokeDasharray="5 5" className="animate-[dash_20s_linear_infinite]" />
                <path d="M 50% 50% Q 30% 70% 16% 86%" fill="none" strokeWidth="1.5" strokeDasharray="5 5" className="animate-[dash_20s_linear_infinite]" />
              </svg>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          02 — INTERACTIVE AI SALES AGENT DEMO (White Background & Fastigo Colors)
      ========================================================================= */}
      <section className="relative z-10 py-20 sm:py-28 bg-[#F8FAFC] border-y border-slate-200/90 overflow-hidden text-slate-800">
        {/* Soft Ambient Fastigo Blue Glow */}
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[550px] h-[550px] bg-[radial-gradient(circle,_rgba(0,112,173,0.08)_0%,_rgba(0,163,224,0.03)_50%,_transparent_75%)] blur-[80px] pointer-events-none" />

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
                  className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0E0A42] leading-[1.12]"
                >
                  <span className="text-[#0070AD]">Sales agents</span> that turn <br />
                  conversations into revenue
                </motion.h2>
              </div>

              {/* Channel Tabs */}
              <div className="flex flex-wrap gap-2 pt-1">
                {channels.map((ch) => {
                  const isActive = activeChannel === ch;
                  return (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => setActiveChannel(ch)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0E0A42] text-white shadow-sm ring-1 ring-[#0E0A42]'
                          : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/90 hover:border-slate-300'
                      }`}
                    >
                      {ch}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Description */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                {channelDescriptions[activeChannel]}
              </p>

              {/* Scenario Selector */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  <Folder className="w-3.5 h-3.5 text-slate-400" />
                  <span>SCENARIO</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {scenarios.map((sc) => {
                    const isSelected = selectedScenario === sc;
                    return (
                      <button
                        key={sc}
                        type="button"
                        onClick={() => setSelectedScenario(sc)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0070AD] text-white shadow-sm'
                            : 'bg-slate-100/90 text-slate-700 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-200/60'
                        }`}
                      >
                        {sc}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Voice / Persona Selector */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  <Radio className="w-3.5 h-3.5 text-slate-400" />
                  <span>VOICE</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {personas.map((p) => {
                    const isSelected = selectedPersona === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setSelectedPersona(p)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0070AD] text-white shadow-sm'
                            : 'bg-slate-100/90 text-slate-700 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-200/60'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsSimulatingCall(!isSimulatingCall)}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#0E0A42] hover:bg-[#0070AD] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-md group cursor-pointer"
                >
                  <span>Try {activeChannel.charAt(0) + activeChannel.slice(1).toLowerCase()} AI</span>
                  <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column: Interactive White Console with Animated Floating AI Bot */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(0,112,173,0.12),0_0_1px_1px_rgba(0,0,0,0.03)] p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[480px]">
                
                {/* Console Header Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#0070AD]/10 flex items-center justify-center text-[#0070AD]">
                      <Bot className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold tracking-wider text-[#0E0A42] uppercase">
                      OmniSell Voice & Multi-Channel
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    ACTIVE
                  </div>
                </div>

                {/* Center Stage: Animated Floating 3D AI Particle Sphere */}
                <div className="my-auto py-4 relative flex flex-col items-center justify-center">
                  
                  {/* Floating Motion Wrapper */}
                  <motion.div
                    animate={shouldReduceMotion ? {} : { y: [-8, 8, -8], rotate: [-1.5, 1.5, -1.5] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative cursor-pointer"
                    onClick={() => setIsSimulatingCall(!isSimulatingCall)}
                  >
                    {/* The 3D Dotted Wave Particle Sphere */}
                    <ParticleSphere isTalking={isSimulatingCall} />

                    {/* Subtle Radial Blue Glow Behind Sphere */}
                    <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-[#0070AD]/15 to-[#00A3E0]/15 blur-2xl pointer-events-none" />
                  </motion.div>

                  {/* Radial Arc Arc Guideline */}
                  <div className="relative w-full max-w-[280px] flex flex-col items-center mt-[-10px]">
                    <svg className="w-full h-12 stroke-slate-200 overflow-visible pointer-events-none">
                      <path d="M 10 30 Q 140 -5 270 30" fill="none" strokeWidth="1" strokeDasharray="4 4" />
                    </svg>

                    {/* Central Microphone / Talk Button */}
                    <div className="absolute -top-3 flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => setIsSimulatingCall(!isSimulatingCall)}
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white transition-all shadow-lg cursor-pointer ${
                          isSimulatingCall
                            ? 'bg-emerald-600 shadow-emerald-500/40 ring-4 ring-emerald-200 animate-pulse'
                            : 'bg-[#0070AD] hover:bg-[#005a8c] shadow-[0_0_25px_rgba(0,112,173,0.35)]'
                        }`}
                      >
                        <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>

                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold mt-2.5">
                        {isSimulatingCall ? 'SPEAKING • CLICK TO MUTE' : 'READY TO TALK'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Console Footer Bar */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                    <Volume2 className="w-3.5 h-3.5 text-[#0070AD]" />
                    <span>REAL-TIME CONVERSATION • POWERED BY OMNISELL</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDemoModalOpen(true)}
                    className="px-5 py-2 rounded-full bg-[#0070AD] hover:bg-[#005a8c] text-white text-xs font-semibold tracking-wider transition-all shadow-sm flex items-center gap-1 cursor-pointer"
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
          03 — ROADMAP: ONE AI AGENT. THE ENTIRE SALES MOTION.
          Theme: One shared brain. Across every channel. (Context → Intelligence → Omnichannel)
      ========================================================================= */}
      <section id="capabilities" className="relative z-10 py-24 sm:py-32 bg-[#06080F] border-t border-white/[0.08] overflow-hidden">
        {/* Ambient Fastigo Blue Atmospheric Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-[radial-gradient(ellipse,_rgba(0,112,173,0.14)_0%,_rgba(0,163,224,0.05)_50%,_transparent_75%)] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-[5%] w-[450px] h-[450px] bg-[radial-gradient(circle,_rgba(0,163,224,0.08)_0%,_transparent_70%)] blur-[90px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:28px_28px] opacity-70 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0070AD]/15 border border-[#0070AD]/40 text-[#00A3E0] text-xs font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(0,112,173,0.25)]">
              <Zap className="w-3.5 h-3.5 text-[#00A3E0] animate-pulse" />
              <span>ONE SHARED BRAIN. ACROSS EVERY CHANNEL.</span>
            </div>

            <div className="overflow-hidden">
              <motion.h2 
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.08]"
              >
                ONE AI AGENT. <br />
                <span className="bg-gradient-to-r from-[#00A3E0] via-[#38BDF8] to-[#0070AD] bg-clip-text text-transparent">
                  THE ENTIRE SALES MOTION.
                </span>
              </motion.h2>
            </div>

            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
              An autonomous architecture powered by one continuous shared intelligence. From unified context and coordinated multi-agent reasoning to frictionless omnichannel execution.
            </p>

            {/* Direct Link to Explore the Platform */}
            <div className="pt-2">
              <a
                href="https://www.11x.ai/platform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-[#0070AD]/25 border border-white/10 hover:border-[#0070AD]/60 text-xs sm:text-sm font-semibold text-[#00A3E0] hover:text-white transition-all shadow-sm group cursor-pointer"
              >
                <span>Explore the platform</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* =========================================================================
              THE ROADMAP PIPELINE (Central Spine with 3 Milestones)
          ========================================================================= */}
          <div className="relative">
            
            {/* Glowing Central Vertical Roadmap Spine Line (Desktop) */}
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-[2px] bg-gradient-to-b from-[#00A3E0] via-[#0070AD] to-emerald-400 opacity-50 shadow-[0_0_15px_rgba(0,163,224,0.5)]" />
            
            {/* Left Vertical Spine (Mobile / Tablet) */}
            <div className="lg:hidden absolute left-5 sm:left-7 top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#00A3E0] via-[#0070AD] to-emerald-400 opacity-50" />

            <div className="space-y-16 sm:space-y-24">
              
              {/* -------------------------------------------------------------------
                  MILESTONE 01: CONTEXT
              ------------------------------------------------------------------- */}
              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                
                {/* Roadmap Node Indicator */}
                <div className="absolute left-5 sm:left-7 lg:left-1/2 -translate-x-1/2 -top-1 lg:top-1/2 lg:-translate-y-1/2 z-20 flex items-center justify-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#06080F] border-2 border-[#00A3E0] shadow-[0_0_25px_rgba(0,163,224,0.7)] flex items-center justify-center text-white font-mono font-bold text-xs sm:text-sm">
                    01
                  </div>
                </div>

                {/* Left Column (Desktop): Text & Narrative */}
                <div className="lg:col-span-6 pl-14 sm:pl-16 lg:pl-0 lg:pr-14 text-left space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0070AD]/20 border border-[#0070AD]/40 text-[#00A3E0] text-xs font-mono font-semibold tracking-wider">
                    <Database className="w-3.5 h-3.5" />
                    <span>MILESTONE 01 • CONTEXT</span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                    Unified customer and <br className="hidden sm:block" />
                    market context
                  </h3>
                  
                  <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                    Your CRM, knowledge base, website activity and every OmniSell conversation, connected through supported integrations, and enriched with real-time third-party signals about your priority accounts such as funding, hiring, job moves, and tech stack.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Salesforce', 'HubSpot', 'Snowflake', 'Gong', 'Notion', 'Slack'].map((tool) => (
                      <span key={tool} className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column (Desktop): Live Telemetry Context Visual Card */}
                <div className="lg:col-span-6 pl-14 sm:pl-16 lg:pl-14">
                  <div className="bg-[#0B0F19]/90 border border-white/10 hover:border-[#0070AD] rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden group transition-all">
                    <div className="absolute top-0 right-0 w-44 h-44 bg-[#0070AD]/10 blur-3xl pointer-events-none" />
                    
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08] text-xs font-mono">
                      <div className="flex items-center gap-2 text-white font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>SHARED CONTEXT LAYER</span>
                      </div>
                      <span className="text-[#00A3E0] text-[10px]">REAL-TIME ENRICHMENT</span>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      {/* Data Conduits */}
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                          <span className="text-[#64748B] block text-[9px]">BI-DIRECTIONAL CRM</span>
                          <span className="text-white font-medium">Salesforce & HubSpot</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                          <span className="text-[#64748B] block text-[9px]">INTENT DE-ANONYMIZED</span>
                          <span className="text-white font-medium">Website Live Traffic</span>
                        </div>
                      </div>

                      {/* Account Card Example */}
                      <div className="p-3.5 rounded-xl bg-[#05070D] border border-white/[0.08] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-bold text-sm">CloudScale Networks</span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                            99.2% FIT SCORE
                          </span>
                        </div>
                        <div className="text-[11px] text-[#38BDF8]">
                          ⚡ 3rd-Party Trigger: Series B ($38M) • Hiring 14 SDRs in US/EMEA
                        </div>
                        <div className="text-[10px] text-[#94A3B8]">
                          Knowledge Base Synced: Product Pricing Matrix, Security Dossier & Competitor Battlecards
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>


              {/* -------------------------------------------------------------------
                  MILESTONE 02: INTELLIGENCE
              ------------------------------------------------------------------- */}
              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                
                {/* Roadmap Node Indicator */}
                <div className="absolute left-5 sm:left-7 lg:left-1/2 -translate-x-1/2 -top-1 lg:top-1/2 lg:-translate-y-1/2 z-20 flex items-center justify-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#06080F] border-2 border-[#0070AD] shadow-[0_0_25px_rgba(0,112,173,0.7)] flex items-center justify-center text-white font-mono font-bold text-xs sm:text-sm">
                    02
                  </div>
                </div>

                {/* Left Column (Desktop): Multi-Agent Swarm Visual Card */}
                <div className="lg:col-span-6 order-2 lg:order-1 pl-14 sm:pl-16 lg:pl-0 lg:pr-14">
                  <div className="bg-[#0B0F19]/90 border border-white/10 hover:border-[#00A3E0] rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden group transition-all">
                    <div className="absolute top-0 left-0 w-44 h-44 bg-[#00A3E0]/10 blur-3xl pointer-events-none" />

                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08] text-xs font-mono">
                      <div className="flex items-center gap-2 text-white font-semibold">
                        <Bot className="w-4 h-4 text-[#00A3E0]" />
                        <span>MULTI-AGENT ORCHESTRATION</span>
                      </div>
                      <span className="text-emerald-400 text-[10px] bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                        COORDINATED
                      </span>
                    </div>

                    {/* 4 Agent Nodes */}
                    <div className="space-y-2.5 font-mono text-xs">
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#05070D] border border-white/[0.06]">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-md bg-[#0070AD]/20 text-[#00A3E0] flex items-center justify-center text-[10px] font-bold">R</span>
                          <span className="text-white text-[11px] font-semibold">Research Agent</span>
                        </div>
                        <span className="text-[10px] text-slate-400">10-K & Executive Hook Synthesized</span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#05070D] border border-white/[0.06]">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-md bg-[#00A3E0]/20 text-[#00A3E0] flex items-center justify-center text-[10px] font-bold">Q</span>
                          <span className="text-white text-[11px] font-semibold">Qualification Agent</span>
                        </div>
                        <span className="text-[10px] text-emerald-400">99.4% Buying Authority Verified</span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#05070D] border border-white/[0.06]">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-md bg-[#0070AD]/20 text-[#00A3E0] flex items-center justify-center text-[10px] font-bold">M</span>
                          <span className="text-white text-[11px] font-semibold">Messaging Agent</span>
                        </div>
                        <span className="text-[10px] text-slate-400">Executive-Tone Value Pitch Calibrated</span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#05070D] border border-white/[0.06]">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">T</span>
                          <span className="text-white text-[11px] font-semibold">Routing Agent</span>
                        </div>
                        <span className="text-[10px] text-cyan-300">Optimal Channel & Timezone Dispatched</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column (Desktop): Text & Narrative */}
                <div className="lg:col-span-6 order-1 lg:order-2 pl-14 sm:pl-16 lg:pl-14 text-left space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#00A3E0]/20 border border-[#00A3E0]/40 text-[#00A3E0] text-xs font-mono font-semibold tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>MILESTONE 02 • INTELLIGENCE</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                    Specialized agents. <br className="hidden sm:block" />
                    Working as a team. <br className="hidden sm:block" />
                    Delivering outcomes.
                  </h3>

                  <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                    From research and qualification to messaging and routing, agents turn shared context into coordinated action — knowing who to engage, why now, what to say, and when to step back.
                  </p>

                  <div className="pt-2 flex items-center gap-3 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <CheckCheck className="w-4 h-4 text-emerald-400" />
                      <span>Zero Hallucinations</span>
                    </div>
                    <span className="text-slate-600">•</span>
                    <div className="flex items-center gap-1.5">
                      <CheckCheck className="w-4 h-4 text-emerald-400" />
                      <span>Continuous Coordinated Consensus</span>
                    </div>
                  </div>
                </div>

              </div>


              {/* -------------------------------------------------------------------
                  MILESTONE 03: OMNICHANNEL COVERAGE
              ------------------------------------------------------------------- */}
              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                
                {/* Roadmap Node Indicator */}
                <div className="absolute left-5 sm:left-7 lg:left-1/2 -translate-x-1/2 -top-1 lg:top-1/2 lg:-translate-y-1/2 z-20 flex items-center justify-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#06080F] border-2 border-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.7)] flex items-center justify-center text-white font-mono font-bold text-xs sm:text-sm">
                    03
                  </div>
                </div>

                {/* Left Column (Desktop): Text & Narrative */}
                <div className="lg:col-span-6 pl-14 sm:pl-16 lg:pl-0 lg:pr-14 text-left space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-semibold tracking-wider">
                    <Radio className="w-3.5 h-3.5" />
                    <span>MILESTONE 03 • OMNICHANNEL COVERAGE</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                    Drive outcomes on every <br className="hidden sm:block" />
                    channel your prospects are on
                  </h3>

                  <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                    Two-way conversations across voice, chat, email, SMS and WhatsApp, and a human dialer. Engage with prospects on whichever channel they prefer.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      ✓ Sub-Second Response
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#0070AD]/15 border border-[#0070AD]/30 text-[#00A3E0]">
                      ✓ Calendar Synced Booking
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300">
                      ✓ 2-Way CRM Logging
                    </span>
                  </div>
                </div>

                {/* Right Column (Desktop): 6-Channel Grid Visual Card */}
                <div className="lg:col-span-6 pl-14 sm:pl-16 lg:pl-14">
                  <div className="bg-[#0B0F19]/90 border border-white/10 hover:border-emerald-400/80 rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden group transition-all">
                    <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/10 blur-3xl pointer-events-none" />

                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08] text-xs font-mono">
                      <div className="flex items-center gap-2 text-white font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>OMNICHANNEL EXECUTION MESH</span>
                      </div>
                      <span className="text-emerald-400 text-[10px]">ALL 6 CHANNELS ONLINE</span>
                    </div>

                    {/* 6-Channel Grid */}
                    <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                      
                      {/* Voice AI */}
                      <div className="p-3 rounded-xl bg-[#05070D] border border-white/[0.06] hover:border-[#0070AD] transition-all">
                        <div className="flex items-center gap-2 text-white font-bold text-xs mb-1">
                          <Mic className="w-3.5 h-3.5 text-[#00A3E0]" />
                          <span>Voice AI</span>
                        </div>
                        <p className="text-[10px] text-[#94A3B8] leading-tight">
                          Human-cadence inbound/outbound calls with sub-second latency.
                        </p>
                      </div>

                      {/* Web Chat */}
                      <div className="p-3 rounded-xl bg-[#05070D] border border-white/[0.06] hover:border-[#0070AD] transition-all">
                        <div className="flex items-center gap-2 text-white font-bold text-xs mb-1">
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Web Chat</span>
                        </div>
                        <p className="text-[10px] text-[#94A3B8] leading-tight">
                          24/7 web visitor engagement, instant qualifying & routing.
                        </p>
                      </div>

                      {/* Email */}
                      <div className="p-3 rounded-xl bg-[#05070D] border border-white/[0.06] hover:border-[#0070AD] transition-all">
                        <div className="flex items-center gap-2 text-white font-bold text-xs mb-1">
                          <Mail className="w-3.5 h-3.5 text-[#38BDF8]" />
                          <span>Email Engine</span>
                        </div>
                        <p className="text-[10px] text-[#94A3B8] leading-tight">
                          Inbox-deliverability personalized multi-step cadences.
                        </p>
                      </div>

                      {/* SMS & WhatsApp */}
                      <div className="p-3 rounded-xl bg-[#05070D] border border-white/[0.06] hover:border-[#0070AD] transition-all">
                        <div className="flex items-center gap-2 text-white font-bold text-xs mb-1">
                          <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                          <span>SMS & WhatsApp</span>
                        </div>
                        <p className="text-[10px] text-[#94A3B8] leading-tight">
                          Rapid 2-way mobile messaging & appointment scheduling.
                        </p>
                      </div>

                      {/* Social / LinkedIn */}
                      <div className="p-3 rounded-xl bg-[#05070D] border border-white/[0.06] hover:border-[#0070AD] transition-all">
                        <div className="flex items-center gap-2 text-white font-bold text-xs mb-1">
                          <Users className="w-3.5 h-3.5 text-blue-400" />
                          <span>Social / LinkedIn</span>
                        </div>
                        <p className="text-[10px] text-[#94A3B8] leading-tight">
                          Warm buyer signal alerts & executive InMail outreach.
                        </p>
                      </div>

                      {/* Human Dialer */}
                      <div className="p-3 rounded-xl bg-[#05070D] border border-white/[0.06] hover:border-[#0070AD] transition-all">
                        <div className="flex items-center gap-2 text-white font-bold text-xs mb-1">
                          <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                          <span>Human Dialer</span>
                        </div>
                        <p className="text-[10px] text-[#94A3B8] leading-tight">
                          Seamless live rep transfer with instant pre-call briefing.
                        </p>
                      </div>

                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Bottom High-Impact Performance Metrics Bar */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm flex items-center gap-4">
              <div className="text-4xl font-extrabold text-[#38BDF8] font-mono tracking-tight">10x</div>
              <div>
                <div className="text-sm font-bold text-white uppercase tracking-wider">Faster Pipeline Velocity</div>
                <div className="text-xs text-[#94A3B8]">From weeks of manual search to minutes</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm flex items-center gap-4">
              <div className="text-4xl font-extrabold text-[#00A3E0] font-mono tracking-tight">84%</div>
              <div>
                <div className="text-sm font-bold text-white uppercase tracking-wider">Executive Response Rate</div>
                <div className="text-xs text-[#94A3B8]">Deep personalized value hooks that resonate</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm flex items-center gap-4">
              <div className="text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">0 hrs</div>
              <div>
                <div className="text-sm font-bold text-white uppercase tracking-wider">Manual SDR Admin</div>
                <div className="text-xs text-[#94A3B8]">Continuous autonomous pipeline execution</div>
              </div>
            </div>
          </div>

        </div>
      </section>





      {/* =========================================================================
          07 — OUTCOME (Background: #F4F7FA, The Only Major Light Section)
      ========================================================================= */}
      <section className="relative z-10 py-24 sm:py-32 bg-[#F4F7FA] text-[#071018]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#0070AD] block font-semibold">
              THE OUTCOME
            </span>
            <div className="overflow-hidden">
              <motion.h2 
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-[#071018] uppercase"
              >
                FROM PROSPECT <br />
                TO MEETING.
              </motion.h2>
            </div>
            <p className="text-base text-[#536170]">
              OmniSell moves prospects through your pipeline with the right action at the right time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {[
              {
                stage: "Prospects",
                desc: "AI finds the right people and companies",
                icon: Users,
                num: "01"
              },
              {
                stage: "Qualified",
                desc: "Enriched and verified intent & growth",
                icon: ShieldCheck,
                num: "02"
              },
              {
                stage: "Conversations",
                desc: "Personalized outreach starts conversations",
                icon: MessageSquare,
                num: "03"
              },
              {
                stage: "Meetings",
                desc: "Meaningful conversations turn into meetings",
                icon: Calendar,
                num: "04"
              }
            ].map((st) => (
              <div 
                key={st.stage} 
                className="bg-[#FFFFFF] rounded-[14px] p-6 sm:p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 relative group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0070AD]/10 text-[#0070AD] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <st.icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono text-[#0070AD] font-semibold mb-1">
                  STAGE {st.num}
                </div>
                <h3 className="text-xl font-bold text-[#071018] mb-2">{st.stage}</h3>
                <p className="text-sm text-[#536170] leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setDemoModalOpen(true)}
              className="px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-[#0070AD] hover:bg-[#005a8c] shadow-[0_0_20px_rgba(0,112,173,0.35)] transition-all"
            >
              Book a Demo →
            </button>
          </div>

        </div>
      </section>





      {/* =========================================================================
          RESOURCES & PRICING ANCHOR (id="pricing")
          Focused, transparent conversion section with Fastigo colors
      ========================================================================= */}
      <section id="pricing" className="relative z-10 py-24 sm:py-32 bg-[#0A0D12] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00A3E0] block">
              TRANSPARENT INVESTMENT
            </span>
            <div className="overflow-hidden">
              <motion.h2 
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase"
              >
                SIMPLE, TRANSPARENT PRICING
              </motion.h2>
            </div>
            <p className="text-base text-[#B4BAC5]">
              Choose the right tier to automate prospecting and boost meetings booked.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-[#737B88]'}`}>
                Monthly
              </span>
              <Switch 
                checked={isAnnual} 
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-[#0070AD]" 
              />
              <span className={`text-sm font-medium flex items-center gap-2 ${isAnnual ? 'text-white' : 'text-[#737B88]'}`}>
                Annually
                <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold bg-[#00A3E0]/15 text-[#00A3E0] border border-[#00A3E0]/30">
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
                      ? 'bg-[#10141A] border-[#0070AD] shadow-[0_0_40px_rgba(0,112,173,0.3)] md:scale-105 z-10'
                      : 'bg-[#10141A]/70 border-white/10 hover:border-white/25'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0070AD] text-white px-4 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest shadow-md">
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
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isPopular ? 'text-[#00A3E0]' : 'text-[#0070AD]'}`} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setDemoModalOpen(true)}
                    className={`w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                      isPopular
                        ? 'bg-[#0070AD] hover:bg-[#005a8c] text-white shadow-[0_0_20px_rgba(0,112,173,0.4)]'
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
            
            <div className="bg-[#10141A] rounded-[14px] border border-white/10 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#05070B]">
                      <th className="p-4 font-mono text-[#737B88] uppercase tracking-wider w-1/4">Feature</th>
                      <th className="p-4 font-mono text-center text-white">Starter</th>
                      <th className="p-4 font-mono text-center text-[#00A3E0] bg-[#0070AD]/10">Scale (Pro)</th>
                      <th className="p-4 font-mono text-center text-white">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row: any, i: number) => (
                      <tr key={i} className="border-b border-white/[0.06] hover:bg-white/[0.02]">
                        <td className="p-4 font-medium text-white">{row.feature}</td>
                        <td className="p-4 text-center text-[#B4BAC5]">
                          {typeof row.starter === 'boolean' ? (
                            row.starter ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <span className="text-[#737B88]">—</span>
                          ) : (
                            row.starter
                          )}
                        </td>
                        <td className="p-4 text-center font-semibold text-[#00A3E0] bg-[#0070AD]/5">
                          {typeof row.pro === 'boolean' ? (
                            row.pro ? <Check className="w-4 h-4 text-[#00A3E0] mx-auto" /> : <span className="text-[#737B88]">—</span>
                          ) : (
                            row.pro
                          )}
                        </td>
                        <td className="p-4 text-center text-white font-medium">
                          {typeof row.enterprise === 'boolean' ? (
                            row.enterprise ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <span className="text-[#737B88]">—</span>
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
          09 — FINAL CTA (Background: #020407, Strongest Visual Glow)
      ========================================================================= */}
      <section className="relative z-10 py-32 bg-[#020407] border-t border-white/[0.06] overflow-hidden text-center">
        {/* Large Fastigo Blue/Cyan Atmospheric Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,112,173,0.30)_0%,_rgba(0,163,224,0.10)_45%,_transparent_75%)] blur-[90px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#00A3E0] block">
            GET STARTED
          </span>

          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-[1.05]"
            >
              LET YOUR AI SALES <br />
              AGENT HANDLE <br />
              THE CHASING.
            </motion.h2>
          </div>

          <p className="text-base sm:text-lg text-[#B4BAC5] max-w-xl mx-auto">
            You focus on the conversation. OmniSell keeps the pipeline moving.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setDemoModalOpen(true)}
              className="px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-[#0070AD] hover:bg-[#005a8c] transition-all duration-300 shadow-[0_0_30px_rgba(0,112,173,0.5)] flex items-center gap-2 group cursor-pointer"
            >
              <span>Book a Demo</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => setDemoModalOpen(true)}
              className="px-8 py-3.5 rounded-full text-sm font-medium text-[#B4BAC5] hover:text-white bg-[#10141A] border border-white/10 hover:border-white/30 transition-all duration-300"
            >
              Talk to Us
            </button>
          </div>
        </div>
      </section>


      {/* =========================================================================
          FASTIGO AUTHENTIC WEBSITE FOOTER
      ========================================================================= */}
      <Footer />


      {/* =========================================================================
          DEMO BOOKING DIALOG
      ========================================================================= */}
      <Dialog open={demoModalOpen} onOpenChange={setDemoModalOpen}>
        <DialogContent className="bg-[#080A0E] border border-white/15 text-white max-w-md p-6 sm:p-8 rounded-[14px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#00A3E0]" />
              Schedule an OmniSell Demo
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
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#10141A] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#0070AD]"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-[#737B88] block mb-1">FULL NAME</label>
              <input
                required
                type="text"
                placeholder="Alex Morgan"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#10141A] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#0070AD]"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-[#737B88] block mb-1">COMPANY NAME</label>
              <input
                required
                type="text"
                placeholder="Acme Inc."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#10141A] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#0070AD]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0070AD] hover:bg-[#005a8c] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-[0_0_20px_rgba(0,112,173,0.4)]"
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
