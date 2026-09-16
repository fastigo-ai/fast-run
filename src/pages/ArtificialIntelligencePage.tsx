import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BrainCircuit,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Cpu,
  Layers,
  Network,
  Lock,
  Eye,
  CheckCircle2,
  ChevronRight,
  Bot,
  Binary,
  Compass,
  MessageSquare,
  Building2,
  HeartPulse,
  ShoppingBag,
  Factory,
  Radio,
  Sliders,
  Scale,
  Database,
  FileCheck2,
  Workflow,
  BarChart3,
  Terminal,
  Code2,
  Sparkles,
  LucideIcon,
} from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

// Image Assets
import agenticAiImg from '@/assets/insight_agentic_ai.jpg';
import voiceAiImg from '@/assets/insight_voice_ai.jpg';
import aiTeamImg from '@/assets/insights_ai_team.jpg';
import customAiImg from '@/assets/custom_ai_dev.webp';
import computerVisionImg from '@/assets/computer-vision.webp';
import aiAgentsImg from '@/assets/ai_agents1.webp';
import oncologyAiImg from '@/assets/oncology-AI.webp';
import aiMobilityImg from '@/assets/ai_mobility.webp';
import fintechAiImg from '@/assets/innovation_fintech.jpg';
import manufacturingAiImg from '@/assets/DIGITALMANUFACTURING.webp';
import healthAiImg from '@/assets/ai-health.webp';
import techAiImg from '@/assets/tech.webp';

// ---------------------------------------------------------------------------
// ANIMATION COMPONENTS: Kinetic Text & Smooth Easing
// ---------------------------------------------------------------------------

interface AnimatedTextProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  delay?: number;
}

const smoothEasing = [0.16, 1, 0.3, 1] as const;

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
// 2. DATA: The 3 Pillars of Enterprise AI
// ---------------------------------------------------------------------------
const aiPillars = [
  {
    id: 'agentic-llm',
    title: 'Agentic & Generative AI',
    eyebrow: 'Autonomous Reasoning',
    icon: Bot,
    image: agenticAiImg,
    badge: 'LLMs & Multi-Agent',
    description:
      'Deploy autonomous AI agents capable of multi-step problem solving, enterprise document synthesis, and automated code generation with verifiable grounding.',
    highlights: [
      'Multi-agent collaborative swarms with automated tool calling',
      'Retrieval-Augmented Generation (RAG) with hybrid vector embeddings',
      'Fine-tuned domain models (PEFT, LoRA) on proprietary knowledge',
      'Automated code generation, testing, and system refactoring copilots',
    ],
  },
  {
    id: 'vision-multimodal',
    title: 'Computer Vision & Spatial AI',
    eyebrow: 'Visual Perception',
    icon: Eye,
    image: computerVisionImg,
    badge: 'Edge & Neural Vision',
    description:
      'Transform cameras, optical sensors, and drone arrays into intelligent real-time perception systems running on edge GPUs and high-throughput clusters.',
    highlights: [
      'Sub-millimeter industrial defect detection exceeding 1,200 parts/min',
      'Multimodal OCR extracting complex tables, diagrams, and handwriting',
      'Real-time edge video telemetry for worker safety and perimeter security',
      '3D neural spatial mapping and digital twin visual simulation',
    ],
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning & Neural Modeling',
    eyebrow: 'Cognitive Prediction',
    icon: Cpu,
    image: customAiImg,
    badge: 'Predictive Neural Networks',
    description:
      'Harness deep neural networks and reinforcement learning to predict complex market behavior, prevent high-frequency fraud, and optimize industrial machinery.',
    highlights: [
      'Graph Neural Networks (GNNs) for sub-millisecond fraud scoring',
      'Continuous neural demand forecasting and dynamic supply adaptation',
      'Predictive equipment failure modeling calculating Remaining Useful Life',
      'Transformer-based sequential decision models for financial risk',
    ],
  },
];

// ---------------------------------------------------------------------------
// 3. DATA: Composable AI Architecture (Pure AI Capabilities)
// ---------------------------------------------------------------------------
interface AICapability {
  id: string;
  label: string;
  tagline: string;
  icon: LucideIcon;
  image: string;
  description: string;
  keyFeatures: { title: string; desc: string }[];
  deliverables: string[];
}

const aiCapabilities: AICapability[] = [
  {
    id: 'genai',
    label: 'Generative AI & LLMs',
    tagline: 'Private Foundational Models, RAG & Fine-Tuning',
    icon: Bot,
    image: agenticAiImg,
    description:
      'Deploy enterprise Large Language Models that understand your corporate knowledge while guaranteeing zero IP leakage. We build RAG vector search, custom fine-tuning, and domain-hardened copilots.',
    keyFeatures: [
      {
        title: 'Custom LLM Fine-Tuning (PEFT & LoRA)',
        desc: 'Adapt open-weights models (Llama 3, Mistral) to your enterprise domain terminology.',
      },
      {
        title: 'Enterprise RAG with Hybrid Search',
        desc: 'Dense vector embeddings paired with sparse BM25 keyword search for factual accuracy.',
      },
      {
        title: 'Autonomous Multi-Agent Orchestration',
        desc: 'Specialized agent swarms with memory, planning, and tool calling to execute workflows.',
      },
      {
        title: 'Anti-Hallucination Grounding Layer',
        desc: 'Strict verification models that cross-reference model output against verified source truth.',
      },
    ],
    deliverables: ['Custom LLM Weights', 'Vector Embedding Index', 'Private Model Serving Container'],
  },
  {
    id: 'vision',
    label: 'Computer Vision & Optical AI',
    tagline: 'High-Throughput Visual Analytics & Edge Inference',
    icon: Eye,
    image: computerVisionImg,
    description:
      'Industrial computer vision systems optimized for real-time visual inspection, document understanding, and spatial geometry at microsecond speeds.',
    keyFeatures: [
      {
        title: 'Optical Defect Classification',
        desc: 'Detect microscopic surface flaws, scratches, and misalignments in manufacturing lines.',
      },
      {
        title: 'Multimodal Document Vision (OCR)',
        desc: 'Intelligent extraction of receipts, blueprints, scanned forms, and medical charts.',
      },
      {
        title: 'Edge TensorRT Acceleration',
        desc: 'Deploy quantized vision models directly on NVIDIA Jetson and edge industrial cameras.',
      },
      {
        title: 'Spatial Recognition & Object Tracking',
        desc: 'Track objects, vehicles, and assets in 3D physical space with high-framerate cameras.',
      },
    ],
    deliverables: ['Edge Vision Engine', 'Optical Inference Pipeline', 'Automated Annotation Tool'],
  },
  {
    id: 'nlp-voice',
    label: 'Conversational & Voice AI',
    tagline: 'Sub-300ms Empathetic Voice Agents & Semantic Search',
    icon: MessageSquare,
    image: voiceAiImg,
    description:
      'Ultra-responsive conversational voice and dialogue systems that speak and understand human language across 60+ dialects with emotional nuance and context memory.',
    keyFeatures: [
      {
        title: 'Ultra-Low Latency Neural Voice',
        desc: 'Conversational audio streaming with sub-300ms turnaround for natural telephone dialogue.',
      },
      {
        title: 'Semantic Enterprise Knowledge Search',
        desc: 'Search millions of unstructured documents, PDFs, and internal wikis with plain English.',
      },
      {
        title: 'Real-Time Sentiment & Intent Parsing',
        desc: 'Detect caller frustration, urgency, and underlying intent during active voice calls.',
      },
      {
        title: 'Multi-Lingual Autonomous Translation',
        desc: 'Cross-language translation preserving domain terms and technical acronyms.',
      },
    ],
    deliverables: ['Voice Gateway Microservice', 'Semantic Knowledge Graph', 'Omni-Channel Voice Bot'],
  },
  {
    id: 'mlops',
    label: 'MLOps & Model Engineering',
    tagline: 'GPU Cluster Orchestration, Quantization & Serving',
    icon: Binary,
    image: customAiImg,
    description:
      'A complete machine learning operational framework for training, quantizing, deploying, and monitoring neural network models in high-concurrency environments.',
    keyFeatures: [
      {
        title: 'Model Quantization (AWQ & GGUF)',
        desc: 'Compress 70B parameter models into 4-bit and 8-bit formats for cost-efficient GPU serving.',
      },
      {
        title: 'Triton & vLLM High-Throughput Serving',
        desc: 'Continuous batching and PagedAttention delivering 4x higher token generation throughput.',
      },
      {
        title: 'Automated Model Drift Detection',
        desc: 'Real-time telemetry measuring accuracy decay, feature drift, and confidence drops.',
      },
      {
        title: 'Zero-Downtime Canary Rollouts',
        desc: 'Safely test newly fine-tuned models with live shadow traffic before full production release.',
      },
    ],
    deliverables: ['vLLM Serving Cluster', 'Model Registry Hub', 'Continuous Drift Telemetry'],
  },
];

// ---------------------------------------------------------------------------
// 4. DATA: Responsible & Explainable AI (Pure AI Safety)
// ---------------------------------------------------------------------------
const responsibleAIPillars = [
  {
    icon: Scale,
    title: 'Bias Auditing & Algorithmic Fairness',
    desc: 'Automated statistical evaluation to detect and correct demographic, gender, and socio-economic biases in training sets.',
  },
  {
    icon: FileCheck2,
    title: 'Explainable AI & Transparent Reasoning',
    desc: 'Glass-box model architectures using SHAP, integrated gradients, and chain-of-thought verification for auditability.',
  },
  {
    icon: Lock,
    title: 'Zero IP Leakage & Private Models',
    desc: 'Isolated tenant infrastructure. Your confidential enterprise data is never used to train or refine public foundation models.',
  },
  {
    icon: Sliders,
    title: 'Active Hallucination Interception',
    desc: 'Real-time confidence scoring and heuristic guardrails that block speculative or fabricated model assertions before output.',
  },
];

// ---------------------------------------------------------------------------
// 5. DATA: Real-World Industry AI Deployments
// ---------------------------------------------------------------------------
const industryAIDeployments = [
  {
    id: 'banking',
    name: 'Banking & Financial AI',
    icon: Building2,
    image: fintechAiImg,
    metric: '<12ms',
    metricLabel: 'AI Inference Latency',
    headline: 'Real-Time Graph Neural Networks for Fraud & Underwriting',
    description:
      'Institutional banking powered by Graph Neural Networks (GNNs) evaluating 25,000 micro-transactions per second with automated AML and commercial credit scoring.',
    useCases: [
      'Graph-Based Anomaly Scoring for High-Frequency Payments',
      'Autonomous Commercial Loan Parsing & Balance Sheet Analysis',
      'Algorithmic Market Volatility & Liquidity Stress Simulation',
    ],
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Clinical AI',
    icon: HeartPulse,
    image: healthAiImg,
    metric: '99.4%',
    metricLabel: 'Diagnostic Model Accuracy',
    headline: 'Multimodal Clinical Decision Support & Ambient Scribing',
    description:
      'HIPAA-compliant multimodal models assisting physicians with medical imaging pathology, automated clinical note synthesis, and clinical trial cohort matching.',
    useCases: [
      'Ambient Voice AI Scribing Doctor-Patient Consultations into EHRs',
      'Convolutional Vision Detection of Early Oncology Biomarkers',
      'Clinical Trial Protocol Synthesis and Candidate Ingestion',
    ],
  },
  {
    id: 'retail',
    name: 'Retail & E-Commerce AI',
    icon: ShoppingBag,
    image: customAiImg,
    metric: '+28%',
    metricLabel: 'Conversion Rate Lift',
    headline: 'Autonomous Pricing Agents & Visual Product Discovery',
    description:
      'Autonomous multi-agent swarms evaluating competitor pricing, live customer clickstreams, and inventory supply to dynamically optimize catalog pricing and recommendations.',
    useCases: [
      'Visual Search & Camera-Based Product Identification',
      'Autonomous Dynamic Markdown Optimization Engine',
      'Personalized Generative Shopping Assistant with Context Memory',
    ],
  },
  {
    id: 'manufacturing',
    name: 'Industrial & Edge AI',
    icon: Factory,
    image: manufacturingAiImg,
    metric: '40%',
    metricLabel: 'Downtime Reduction',
    headline: 'High-Speed Optical Defect Inspection & Digital Twins',
    description:
      'Edge vision neural models inspecting physical components at 1,200 units/minute on factory floors, paired with sensor-driven predictive maintenance models.',
    useCases: [
      'Sub-Millimeter Surface Defect Optical Classification',
      'Remaining Useful Life (RUL) Modeling for Heavy Turbines',
      'Autonomous Edge Robotics Navigation & Collision Avoidance',
    ],
  },
];

// ---------------------------------------------------------------------------
// 6. DATA: Real AI Case Studies
// ---------------------------------------------------------------------------
const aiCaseStudies = [
  {
    client: 'Global Health Network',
    title: 'Private Multimodal AI Pipeline for Clinical Diagnostics',
    impact: '65% Faster Record Intake',
    stat: '18M+',
    statLabel: 'Records Processed Annually',
    image: oncologyAiImg,
    desc: 'Deployed a private on-premise vision and LLM pipeline that parses handwritten medical records, CT scans, and dictation audio with zero cloud data egress.',
  },
  {
    client: 'Tier-1 Investment Bank',
    title: 'Graph Neural Network for High-Frequency Fraud Detection',
    impact: '$42M in Prevented Fraud',
    stat: '<12ms',
    statLabel: 'Inference Speed per Transaction',
    image: techAiImg,
    desc: 'Architected a sub-12ms graph neural network evaluating complex multi-hop transaction topologies across 4.2 million daily accounts.',
  },
  {
    client: 'Global Logistics Enterprise',
    title: 'Autonomous Edge Vision for Automated Package Sorting',
    impact: '99.8% Barcode & Defect Accuracy',
    stat: '1,200',
    statLabel: 'Packages Classified per Minute',
    image: aiMobilityImg,
    desc: 'Engineered TensorRT-accelerated edge computer vision running on NVIDIA Jetson hardware to autonomously route irregularly shaped freight.',
  },
];


// ---------------------------------------------------------------------------
// MAIN COMPONENT (Infosys Color System & Smoothness)
// ---------------------------------------------------------------------------
export const ArtificialIntelligencePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('genai');
  const [activeIndustry, setActiveIndustry] = useState<string>('banking');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentCapability = aiCapabilities.find((t) => t.id === activeTab) || aiCapabilities[0];
  const currentIndustryData =
    industryAIDeployments.find((i) => i.id === activeIndustry) || industryAIDeployments[0];

  return (
    <div className="relative min-h-screen w-full bg-white text-[#4A5568] overflow-x-hidden font-body selection:bg-[#0070ad] selection:text-white pt-20">
      <SEOHead
        title="Enterprise Artificial Intelligence & Autonomous Systems | Fastigo"
        description="Architect and deploy enterprise-grade AI: Large Language Models, autonomous agentic swarms, real-time computer vision, and predictive neural decision engines."
        keywords={["Enterprise AI", "autonomous agents", "generative AI", "computer vision", "MLOps", "LLM fine-tuning", "Fastigo AI"]}
        ogTitle="Enterprise Artificial Intelligence & Autonomous Systems | Fastigo"
        ogDescription="Architect and deploy enterprise-grade AI: LLMs, agentic swarms, computer vision, and neural decision engines."
        ogImage={agenticAiImg}
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
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0070ad8_1px,transparent_1px),linear-gradient(to_bottom,#0070ad8_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
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
            <span className="text-[#1E2229] font-semibold">Artificial Intelligence</span>
          </nav>
          <div className="hidden md:flex items-center gap-2 text-xs text-[#0070ad] font-mono px-3.5 py-1 rounded-full bg-[#EBF5FB] border border-[#0070ad]/20 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Fastigo Neural AI Core v4.2</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 2. HERO SECTION WITH INFOSYS FONT & COLOR STYLING */}
      {/* ------------------------------------------------------------------- */}
      <section className="relative z-10 pt-12 pb-20 md:pt-16 md:pb-24 border-b border-[#E2E8F0] overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0070ad6_1px,transparent_1px),linear-gradient(to_bottom,#0070ad6_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 max-w-[1740px]">
          <div className="text-center max-w-4xl mx-auto mb-14 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Infosys Blue Eyebrow Badge */}
              <motion.div
                whileHover={{ scale: 1.03, transition: { duration: 0.25 } }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#0070ad]/25 bg-[#EBF5FB] text-[#0070ad] text-xs font-bold tracking-wider uppercase mb-6 backdrop-blur-md shadow-2xs"
              >
                <BrainCircuit className="w-3.5 h-3.5 text-[#0070ad] animate-pulse" />
                <span>Enterprise Artificial Intelligence &amp; Autonomous Systems</span>
              </motion.div>

              {/* Kinetic Split Headline with Infosys Charcoal (#1E2229) & Infosys Blue Accent */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-[1.08] tracking-tight text-[#0E0A42] mb-6">
                <KineticHeading
                  text="Autonomous Intelligence. Generative Scale. Engineered for the Enterprise."
                  highlightWords={['Autonomous', 'Intelligence.', 'Generative', 'Scale.']}
                  highlightClassName="bg-clip-text text-transparent bg-gradient-to-r from-[#0070ad] via-[#00A3E0] to-[#0070ad] font-extrabold"
                  className="justify-center"
                />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg sm:text-xl text-[#4A5568] leading-relaxed font-body mb-8 max-w-3xl mx-auto"
              >
                Architect and deploy production-grade Artificial Intelligence: Large Language Models, autonomous agentic swarms, real-time computer vision, and neural decision engines backed by private model guardrails.
              </motion.p>

              {/* Action Buttons with Smooth Hover Transitions */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <motion.a
                  href="#ai-capabilities"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-[#0070ad] to-[#00A3E0] hover:from-[#005a8c] hover:to-[#0ea5e9] hover:shadow-[0_12px_28px_rgba(23, 124, 227,0.3)] transition-all duration-400 flex items-center gap-2.5 text-sm sm:text-base cursor-pointer group shadow-sm"
                >
                  <span>Explore AI Capabilities</span>
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
                    <span>Consult with AI Architects</span>
                  </Link>
                </motion.div>
              </div>

              {/* Verification Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#718096]">
                <span className="flex items-center gap-1.5 font-medium hover:text-emerald-600 transition-colors duration-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Private Model Weights
                </span>
                <span className="flex items-center gap-1.5 font-medium hover:text-[#0070ad] transition-colors duration-200">
                  <ShieldCheck className="w-4 h-4 text-[#0070ad]" /> Zero-Retention Guardrails
                </span>
                <span className="flex items-center gap-1.5 font-medium hover:text-[#00A3E0] transition-colors duration-200">
                  <Bot className="w-4 h-4 text-[#00A3E0]" /> Autonomous Multi-Agent Ready
                </span>
              </div>
            </motion.div>
          </div>

          {/* HERO VISUAL SHOWCASE: Full Bleed Enterprise Neural Intelligence Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[1420px] mx-auto mb-16 relative rounded-[32px] overflow-hidden border border-[#E2E8F0] shadow-[0_20px_50px_rgba(15,23,42,0.06)] group"
          >
            <div className="relative h-[300px] sm:h-[380px] md:h-[420px] w-full overflow-hidden bg-slate-950">
              <img
                src={aiAgentsImg}
                alt="Enterprise Artificial Intelligence Core"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              {/* Overlay Content & Live Telemetry Badges */}
              <div className="absolute inset-0 p-6 sm:p-10 md:p-12 flex flex-col justify-between z-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Autonomous Orchestration Engine Active
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0070ad]/30 backdrop-blur-md border border-[#0070ad]/40 text-sky-200 text-xs font-mono">
                    <Cpu className="w-3.5 h-3.5 text-[#0070ad]" />
                    Distributed TensorRT Acceleration
                  </span>
                </div>

                <div className="max-w-2xl">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#0070ad] font-bold block mb-2">
                    Production AI Infrastructure
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight leading-snug drop-shadow-md mb-3">
                    Unified Multi-Modal Swarms &amp; Private Foundation Models
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-body line-clamp-2 max-w-xl">
                    Engineered to execute multi-step deterministic reasoning, visual telemetry, and sub-millisecond predictions across distributed enterprise cloud clusters.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>


        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 3. THE 3 PILLARS OF ENTERPRISE ARTIFICIAL INTELLIGENCE */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 relative z-10 border-b border-[#E2E8F0] bg-[#F8FAFC]/80">
        <div className="container mx-auto px-4 max-w-[1240px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#0070ad] uppercase font-mono block mb-3">
              Core Technical Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#0E0A42] mb-6">
              <KineticHeading
                text="Three Foundations of Enterprise Artificial Intelligence"
                highlightWords={['Enterprise', 'Artificial', 'Intelligence']}
                className="justify-center"
              />
            </h2>
            <p className="text-base sm:text-lg text-[#4A5568] leading-relaxed">
              We engineer neural intelligence across three specialized disciplines: autonomous reasoning swarms, high-resolution visual perception, and high-frequency deep learning.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {aiPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
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
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Floating Corner Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <div className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md border border-white/30 flex items-center justify-center text-[#0070ad] shadow-sm">
                        <Icon className="w-5 h-5" />
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
                          <div key={hIdx} className="flex items-start gap-2.5 text-xs text-[#4A5568] font-medium">
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
      {/* 4. COMPOSABLE AI CAPABILITIES (Deep Technical Layers) */}
      {/* ------------------------------------------------------------------- */}
      <section id="ai-capabilities" className="py-24 relative z-10 border-b border-[#E2E8F0] bg-white">
        <div className="container mx-auto px-4 max-w-[1240px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#0070ad] uppercase font-mono block mb-3">
                Production AI Stack
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#0E0A42] mb-4">
                <KineticHeading
                  text="Core Artificial Intelligence Capabilities"
                  highlightWords={['Artificial', 'Intelligence']}
                />
              </h2>
              <p className="text-[#4A5568] text-base max-w-xl leading-relaxed">
                Explore our production-ready AI frameworks engineered for high-concurrency, low-latency enterprise deployment.
              </p>
            </div>
            <div className="hidden lg:block text-right">
              <span className="text-xs font-mono text-[#718096]">Model Optimization Standard</span>
              <p className="text-sm font-bold text-[#1E2229]">vLLM • TensorRT • ONNX</p>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2.5 mb-12 p-2 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] max-w-full overflow-x-auto relative">
            {aiCapabilities.map((tab) => {
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
                      layoutId="activeTabPill"
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
                {/* Left: Capability Technical Details */}
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
                    <span className="text-xs text-[#718096] font-semibold mr-1">Production Deliverables:</span>
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

                {/* Right: Technical Preview Artwork */}
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
                        <Bot className="w-3.5 h-3.5 text-[#0070ad]" />
                        Ready for Production Deployment
                      </p>
                      <p className="text-[11px] text-[#718096] font-medium">
                        Optimized for NVIDIA H100, L40S, AWS Bedrock, and private on-premise clusters.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 5. RESPONSIBLE AI & GOVERNANCE */}
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
                <span>AI Governance &amp; Safety</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#0E0A42] mb-6">
                <KineticHeading
                  text="Responsible & Explainable AI Framework"
                  highlightWords={['Responsible', 'Explainable', 'AI']}
                  highlightClassName="bg-clip-text text-transparent bg-gradient-to-r from-[#0070ad] via-[#00A3E0] to-[#0070ad] font-extrabold"
                />
              </h2>
              <p className="text-base sm:text-lg text-[#4A5568] leading-relaxed font-body">
                Mission-critical enterprise AI demands auditability, strict bias elimination, zero proprietary IP leakage, and active hallucination prevention across the entire inference pipeline.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {responsibleAIPillars.map((item, idx) => {
                const RespIcon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
                    className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0070ad]/40 hover:bg-white hover:shadow-[0_12px_30px_rgba(23, 124, 227,0.12)] transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#EBF5FB] border border-[#0070ad]/20 flex items-center justify-center text-[#0070ad] mb-5 group-hover:bg-[#0070ad] group-hover:text-white transition-all duration-300 shadow-2xs">
                      <RespIcon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-display font-bold text-[#1E2229] mb-2.5 group-hover:text-[#0070ad] transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#718096] leading-relaxed font-body">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 6. INDUSTRY-SPECIFIC AI DEPLOYMENTS */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 relative z-10 border-b border-[#E2E8F0] bg-white">
        <div className="container mx-auto px-4 max-w-[1240px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#0070ad] uppercase font-mono block mb-3">
              Sector Specialization
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#0E0A42] mb-6">
              <KineticHeading
                text="Applied AI Deployments Across Key Sectors"
                highlightWords={['Applied', 'AI', 'Deployments']}
                className="justify-center"
              />
            </h2>
            <p className="text-base sm:text-lg text-[#4A5568] leading-relaxed">
              Every vertical benefits from custom neural architectures, domain-hardened embeddings, and industry-compliant guardrails.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Sector Selector Buttons */}
            <div className="lg:col-span-4 space-y-2.5">
              {industryAIDeployments.map((ind) => {
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
                      className={`w-4 h-4 transition-transform duration-300 ${isSelected ? 'translate-x-1 text-white' : 'text-[#A0AEC0]'}`}
                    />
                  </motion.button>
                );
              })}
            </div>

            {/* Sector Detail Panel with High-Resolution Image Preview */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndustryData.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-3xl p-8 sm:p-10 bg-[#F8FAFC] border border-[#E2E8F0] shadow-[0_12px_40px_rgba(15,23,42,0.05)] relative overflow-hidden"
                >
                  {/* Top Image Banner for Industry */}
                  <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden mb-8 border border-[#E2E8F0] shadow-md group/ind bg-slate-950">
                    <img
                      src={currentIndustryData.image}
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

                  <div className="mb-6">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#0070ad] font-bold block mb-1">
                      AI Production Blueprint
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#1E2229]">
                      {currentIndustryData.headline}
                    </h3>
                  </div>

                  <p className="text-base text-[#4A5568] leading-relaxed font-body mb-8">
                    {currentIndustryData.description}
                  </p>

                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#718096] mb-4 font-bold">
                    Specialized AI Architectures:
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
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 7. REAL-WORLD AI CASE STUDIES */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 relative z-10 border-b border-[#E2E8F0] bg-[#F8FAFC]/80">
        <div className="container mx-auto px-4 max-w-[1240px]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#0070ad] uppercase font-mono block mb-3">
              Production Proof
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#0E0A42] mb-4">
              <KineticHeading
                text="Quantified AI Business Outcomes"
                highlightWords={['Quantified', 'AI', 'Outcomes']}
                className="justify-center"
              />
            </h2>
            <p className="text-[#4A5568] text-sm sm:text-base leading-relaxed">
              Explore how enterprises deploy our neural networks and agentic models to capture measurable operational advantage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {aiCaseStudies.map((cs, idx) => (
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
                    src={cs.image}
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
            ))}
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
                Accelerate Your AI Roadmap
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#0E0A42] mb-5 tracking-tight">
                Ready to Architect Production AI for Your Enterprise?
              </h2>
              <p className="text-base sm:text-lg text-[#4A5568] mb-8 max-w-2xl mx-auto leading-relaxed">
                Schedule an executive briefing with Fastigo’s AI research directors and solution architects to explore bespoke foundation models and autonomous systems.
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
                  <span>Initiate AI Architecture Consultation</span>
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

export default ArtificialIntelligencePage;
