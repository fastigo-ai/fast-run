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
  LucideIcon,
} from 'lucide-react';

// Assets
import topazHeroImg from '@/assets/innovation-topaz.jpg';
import agenticAiImg from '@/assets/insight_agentic_ai.jpg';
import voiceAiImg from '@/assets/insight_voice_ai.jpg';
import aiTeamImg from '@/assets/insights_ai_team.jpg';
import customAiImg from '@/assets/custom_ai_dev.webp';
import computerVisionImg from '@/assets/computer-vision.webp';
import aiAgentsImg from '@/assets/ai_agents1.webp';

// ---------------------------------------------------------------------------
// ANIMATION COMPONENTS: Kinetic Text & Hover Box Animations
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
// 2. DATA: The 3 Pillars of Enterprise AI
// ---------------------------------------------------------------------------
const aiPillars = [
  {
    id: 'agentic-llm',
    title: 'Agentic & Generative AI',
    eyebrow: 'Autonomous Reasoning',
    icon: Bot,
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
    desc: 'Deployed a private on-premise vision and LLM pipeline that parses handwritten medical records, CT scans, and dictation audio with zero cloud data egress.',
  },
  {
    client: 'Tier-1 Investment Bank',
    title: 'Graph Neural Network for High-Frequency Fraud Detection',
    impact: '$42M in Prevented Fraud',
    stat: '<12ms',
    statLabel: 'Inference Speed per Transaction',
    desc: 'Architected a sub-12ms graph neural network evaluating complex multi-hop transaction topologies across 4.2 million daily accounts.',
  },
  {
    client: 'Global Logistics Enterprise',
    title: 'Autonomous Edge Vision for Automated Package Sorting',
    impact: '99.8% Barcode & Defect Accuracy',
    stat: '1,200',
    statLabel: 'Packages Classified per Minute',
    desc: 'Engineered TensorRT-accelerated edge computer vision running on NVIDIA Jetson hardware to autonomously route irregularly shaped freight.',
  },
];



// ---------------------------------------------------------------------------
// MAIN COMPONENT - 100% ARTIFICIAL INTELLIGENCE FOCUSED
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
    <div className="relative min-h-screen w-full bg-white text-slate-900 overflow-x-hidden font-body selection:bg-[#0070ad] selection:text-white pt-20">
      {/* Ambient Neural Light Mesh Background */}
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
      {/* 1. BREADCRUMBS (Clean & Pure AI) */}
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
            <span className="text-[#0B192C] font-semibold">Artificial Intelligence</span>
          </nav>
          <div className="hidden md:flex items-center gap-2 text-xs text-[#0070AD] font-mono px-3 py-1 rounded-full bg-sky-50 border border-sky-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Fastigo Neural AI Core v4.2</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 2. HERO SECTION WITH PURE AI HEADLINE & METRICS */}
      {/* ------------------------------------------------------------------- */}
      <section className="relative z-10 pt-12 pb-20 md:pt-16 md:pb-28 border-b border-slate-200/80 overflow-hidden">
        <div className="container mx-auto px-4 max-w-[1240px]">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: AI Vision & Value */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* AI Eyebrow Badge */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-sky-200 bg-sky-50/90 text-[#0070AD] text-xs font-bold tracking-wider uppercase mb-6 backdrop-blur-md shadow-sm"
                >
                  <BrainCircuit className="w-3.5 h-3.5 text-[#0070AD] animate-pulse" />
                  <span>Enterprise Artificial Intelligence &amp; Autonomous Systems</span>
                </motion.div>

                {/* TEXT ANIMATION: Kinetic Split Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.08] tracking-tight text-[#0B192C] mb-6">
                  <KineticHeading
                    text="Autonomous Intelligence. Generative Scale. Engineered for the Enterprise."
                    highlightWords={['Autonomous', 'Intelligence.', 'Generative', 'Scale.']}
                    highlightClassName="animate-text-shimmer-light bg-clip-text text-transparent bg-gradient-to-r from-[#0070AD] via-[#00A3E0] to-[#0070AD] font-extrabold"
                  />
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-lg sm:text-xl text-slate-600 leading-relaxed font-body mb-8 max-w-2xl"
                >
                  Architect and deploy production-grade Artificial Intelligence: Large Language Models, autonomous agentic swarms, real-time computer vision, and neural decision engines backed by private model guardrails.
                </motion.p>

                {/* Clean, Useful Action CTAs */}
                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <motion.a
                    href="#ai-capabilities"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 rounded-full font-bold text-white bg-[#0070AD] hover:bg-[#005c8f] shadow-[0_8px_25px_rgba(0,112,173,0.3)] transition-all flex items-center gap-2.5 text-sm sm:text-base cursor-pointer group"
                  >
                    <span>Explore AI Capabilities</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.a>

                  <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/contact"
                      className="px-7 py-4 rounded-full font-semibold text-[#0B192C] hover:text-[#0070AD] border border-slate-300 hover:border-[#0070AD]/50 bg-white hover:bg-slate-50 transition-all text-sm sm:text-base inline-flex items-center gap-2 shadow-xs"
                    >
                      <MessageSquare className="w-4 h-4 text-[#0070AD]" />
                      <span>Consult with AI Architects</span>
                    </Link>
                  </motion.div>
                </div>

                {/* AI Verification Badges */}
                <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-slate-200 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium hover:text-emerald-600 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Private Model Weights
                  </span>
                  <span className="flex items-center gap-1.5 font-medium hover:text-[#0070AD] transition-colors">
                    <ShieldCheck className="w-4 h-4 text-[#0070AD]" /> Zero-Retention Guardrails
                  </span>
                  <span className="flex items-center gap-1.5 font-medium hover:text-[#00A3E0] transition-colors">
                    <Bot className="w-4 h-4 text-[#00A3E0]" /> Autonomous Multi-Agent Ready
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: 3D Showcase Visual */}
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
                    src={topazHeroImg}
                    alt="Fastigo Artificial Intelligence Platform"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Floating AI Status Telemetry */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-xl shadow-xl flex items-center justify-between text-slate-900"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0070AD]">
                        <Cpu className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#0B192C]">Neural Inference Cluster</p>
                        <p className="text-[11px] text-emerald-600 font-mono font-medium">Quantized FP8 / INT4 Optimized</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                      Live
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
      {/* 3. THE 3 PILLARS OF ENTERPRISE ARTIFICIAL INTELLIGENCE */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 relative z-10 border-b border-slate-200/80 bg-slate-50/70">
        <div className="container mx-auto px-4 max-w-[1240px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#0070AD] uppercase font-mono block mb-3">
              Core Technical Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0B192C] mb-6">
              <KineticHeading
                text="Three Foundations of Enterprise Artificial Intelligence"
                highlightWords={['Enterprise', 'Artificial', 'Intelligence']}
                className="justify-center"
              />
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
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
                        <Icon className="w-7 h-7" />
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
                        <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium">
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
      {/* 4. COMPOSABLE AI CAPABILITIES (4 Deep Technical Layers) */}
      {/* ------------------------------------------------------------------- */}
      <section id="ai-capabilities" className="py-24 relative z-10 border-b border-slate-200/80 bg-white">
        <div className="container mx-auto px-4 max-w-[1240px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#0070AD] uppercase font-mono block mb-3">
                Production AI Stack
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0B192C] mb-4">
                <KineticHeading
                  text="Core Artificial Intelligence Capabilities"
                  highlightWords={['Artificial', 'Intelligence']}
                />
              </h2>
              <p className="text-slate-600 text-base max-w-xl">
                Explore our production-ready AI frameworks engineered for high-concurrency, low-latency enterprise deployment.
              </p>
            </div>
            <div className="hidden lg:block text-right">
              <span className="text-xs font-mono text-slate-400">Model Optimization Standard</span>
              <p className="text-sm font-bold text-[#0B192C]">vLLM • TensorRT • ONNX</p>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2.5 mb-12 p-2 rounded-2xl bg-slate-100/90 border border-slate-200/90 max-w-full overflow-x-auto relative">
            {aiCapabilities.map((tab) => {
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
                      layoutId="activeTabPill"
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
                {/* Left: Capability Technical Details */}
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
                    <span className="text-xs text-slate-500 font-semibold mr-2">Production Deliverables:</span>
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

                {/* Right: Technical Preview Artwork */}
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
                        <Bot className="w-3.5 h-3.5 text-[#0070AD]" />
                        Ready for Production Deployment
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">
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
      {/* 5. RESPONSIBLE AI & GOVERNANCE (Pure AI Ethics & Safety) */}
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
                <span>AI Governance &amp; Safety</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0B192C] mb-6">
                <KineticHeading
                  text="Responsible & Explainable AI Framework"
                  highlightWords={['Responsible', 'Explainable', 'AI']}
                  highlightClassName="animate-text-shimmer-light bg-clip-text text-transparent bg-gradient-to-r from-[#0070AD] via-[#00A3E0] to-[#0070AD] font-extrabold"
                />
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
                Mission-critical enterprise AI demands auditability, strict bias elimination, zero proprietary IP leakage, and active hallucination prevention across the entire inference pipeline.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {responsibleAIPillars.map((item, idx) => {
                const RespIcon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/90 hover:border-[#0070AD]/50 hover:bg-white hover:shadow-[0_10px_25px_rgba(0,112,173,0.12)] transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0070AD] mb-5 group-hover:bg-[#0070AD] group-hover:text-white transition-all shadow-2xs">
                      <RespIcon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-display font-bold text-[#0B192C] mb-2.5 group-hover:text-[#0070AD] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-body">{item.desc}</p>
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
      <section className="py-24 relative z-10 border-b border-slate-200/80 bg-white">
        <div className="container mx-auto px-4 max-w-[1240px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#0070AD] uppercase font-mono block mb-3">
              Sector Specialization
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0B192C] mb-6">
              <KineticHeading
                text="Applied AI Deployments Across Key Sectors"
                highlightWords={['Applied', 'AI', 'Deployments']}
                className="justify-center"
              />
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
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
                      className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1' : 'text-slate-400'}`}
                    />
                  </motion.button>
                );
              })}
            </div>

            {/* Sector Detail Panel */}
            <div className="lg:col-span-8">
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
                        AI Production Blueprint
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
                    Specialized AI Architectures:
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
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 7. REAL-WORLD AI CASE STUDIES */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 relative z-10 border-b border-slate-200/80 bg-slate-50/70">
        <div className="container mx-auto px-4 max-w-[1240px]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#0070AD] uppercase font-mono block mb-3">
              Production Proof
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0B192C] mb-4">
              <KineticHeading
                text="Quantified AI Business Outcomes"
                highlightWords={['Quantified', 'AI', 'Outcomes']}
                className="justify-center"
              />
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
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
                  <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed mb-6">{cs.desc}</p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-end justify-between">
                  <div>
                    <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0070AD]">{cs.stat}</div>
                    <div className="text-[11px] text-slate-400 font-mono font-medium">{cs.statLabel}</div>
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

export default ArtificialIntelligencePage;
