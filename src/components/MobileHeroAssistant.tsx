import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Boxes,
  Layers,
  Bot,
  Briefcase,
  ChevronUp,
  X,
  Send,
  Volume2,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  link: string;
}

const featureCards: FeatureCardProps[] = [
  {
    icon: <Boxes className="w-5 h-5 text-[#0070AD]" />,
    title: "Fastigo Intelligent AI Cloud – Scalable & Resilient",
    link: "/services",
  },
  {
    icon: <Layers className="w-5 h-5 text-[#0070AD]" />,
    title: "Navigating Challenges for Sustainable Digital Transformation",
    link: "/services",
  },
  {
    icon: <Bot className="w-5 h-5 text-[#0070AD]" />,
    title: "The Top 10 AI Imperatives for Enterprise 2026",
    link: "/insights",
  },
  {
    icon: <Briefcase className="w-5 h-5 text-[#0070AD]" />,
    title: "Fastigo AI-First Enterprise Index 2026",
    link: "/careers",
  },
];

const sampleAIResponses: Record<string, string> = {
  default:
    "Fastigo provides next-generation AI-powered engineering, enterprise cloud modernization, and autonomous IT solutions tailored for global scale.",
  cloud:
    "Fastigo Intelligent Cloud delivers agile, secure enterprise infrastructure with pre-built AI accelerators and multi-cloud resilience.",
  ai: "Our 2026 AI Imperatives focus on generative PDLC automation, secure LLM guardrails, agentic workflows, and measurable ROI across business domains.",
  cost: "Sustainable cost optimization combines intelligent telemetry, cloud rightsizing, and automated DevOps pipelines to reduce infrastructure TCO by up to 35%.",
};

export const MobileHeroAssistant: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const handleAsk = (userQuery?: string) => {
    const q = (userQuery || query).trim();
    if (!q) return;

    setIsModalOpen(true);
    const lower = q.toLowerCase();
    if (lower.includes("cobalt") || lower.includes("cloud")) {
      setAiResponse(sampleAIResponses.cobalt);
    } else if (lower.includes("ai") || lower.includes("imperative")) {
      setAiResponse(sampleAIResponses.ai);
    } else if (lower.includes("cost") || lower.includes("sustainable")) {
      setAiResponse(sampleAIResponses.cost);
    } else {
      setAiResponse(sampleAIResponses.default);
    }
  };

  const handleMicClick = () => {
    setIsListening(true);
    setIsModalOpen(true);
    setQuery("Listening...");
    setTimeout(() => {
      setIsListening(false);
      setQuery("Explore Fastigo AI Capabilities");
      setAiResponse(
        "Voice query recognized: Fastigo AI empowers enterprises with end-to-end cognitive automation, autonomous QA, and predictive telemetry."
      );
    }, 1800);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full flex flex-col items-center px-4 pb-8 pt-2">
      {/* Container for Floating Mic and Ask Card */}
      <div className="relative w-full max-w-md mx-auto pt-6">
        {/* Floating Blue Mic Circle overlapping top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <motion.button
            onClick={handleMicClick}
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            aria-label="Ask with Voice"
            className="w-[52px] h-[52px] rounded-full bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center text-white shadow-[0_8px_20px_rgba(29,78,216,0.45)] border-2 border-white ring-4 ring-blue-500/20"
          >
            <Mic className="w-6 h-6 animate-pulse" />
          </motion.button>
        </div>

        {/* White Ask Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-4 pt-8 shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-slate-100 flex flex-col justify-between min-h-[140px]"
        >
          {/* Top Row: Sparkle Icon + Text Area */}
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-5 h-5 text-[#818CF8] shrink-0 mt-0.5" />
            <div className="flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                placeholder="Ask Fastigo AI..."
                className="w-full text-slate-700 placeholder:text-slate-400 font-medium text-sm sm:text-base outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Bottom Row: AI generated caption, Shield Icon & Submit Button */}
          <div className="mt-4 pt-2 flex items-center justify-between">
            <p className="text-[11px] text-slate-400 italic font-light tracking-wide">
              Content is generated with AI assistance
            </p>

            <div className="flex items-center gap-2">
              <div
                title="Enterprise Safe AI Guardrails"
                className="text-[#10B981] hover:scale-110 transition-transform cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <button
                onClick={() => handleAsk()}
                aria-label="Submit query"
                className="w-7 h-7 rounded-full bg-slate-300 hover:bg-[#0070AD] text-white flex items-center justify-center transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 2x2 Feature Cards Grid */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto mt-4">
        {featureCards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all flex flex-col justify-between min-h-[145px]"
          >
            {/* Soft Purple Icon Container */}
            <div>
              <div className="w-9 h-9 rounded-lg bg-[#EEF2FF] border border-[#E0E7FF] flex items-center justify-center mb-2.5">
                {card.icon}
              </div>
              <h3 className="text-xs sm:text-sm font-semibold text-[#0070ad] leading-snug line-clamp-3">
                {card.title}
              </h3>
            </div>

            <div className="mt-3">
              <a
                href={card.link}
                className="text-[11px] sm:text-xs font-semibold text-[#0070ad] hover:text-[#0070AD] underline underline-offset-4 decoration-slate-300 hover:decoration-[#0070AD] transition-colors inline-block"
              >
                Know More
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Scroll-to-Top Button (shown in bottom right as in screenshot) */}
      <div className="fixed bottom-6 right-4 z-40 md:hidden">
        <motion.button
          onClick={scrollToTop}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full bg-[#3B82F6]/90 backdrop-blur-md text-white shadow-lg flex items-center justify-center border border-white/30"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Interactive AI Answer Dialog / Drawer */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-lg p-5 shadow-2xl border border-slate-100 flex flex-col max-h-[85vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">
                      Fastigo AI Assistant
                    </h3>
                    <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Enterprise Guardrails
                      Active
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="py-4 space-y-3 overflow-y-auto">
                {isListening ? (
                  <div className="flex flex-col items-center py-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 animate-pulse mb-3">
                      <Volume2 className="w-8 h-8 animate-bounce" />
                    </div>
                    <p className="text-sm font-semibold text-slate-700">
                      Listening to your voice prompt...
                    </p>
                    <p className="text-xs text-slate-400">
                      Say something like "Tell me about AI Cloud solutions"
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
                      <p className="text-xs text-slate-500 font-medium mb-1">
                        Your Query:
                      </p>
                      <p className="text-sm font-semibold text-slate-800">
                        {query || "What services does Fastigo offer?"}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl p-4 border border-blue-100/70">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span className="text-xs font-bold text-blue-950">
                          Fastigo Intelligence Response
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                        {aiResponse}
                      </p>
                    </div>

                    {/* Quick Topics */}
                    <div className="pt-2">
                      <p className="text-[11px] text-slate-400 font-medium mb-2">
                        Suggested Inquiries:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          "Fastigo Intelligent Cloud",
                          "2026 AI Imperatives",
                          "Sustainable Cost Optimization",
                          "PDLC Engineering",
                        ].map((tag, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setQuery(tag);
                              handleAsk(tag);
                            }}
                            className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-600 font-medium transition-colors"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Modal Input Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask anything about tech..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                  className="flex-1 bg-slate-100 text-slate-800 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  onClick={() => handleAsk()}
                  className="bg-[#0070AD] hover:bg-[#0084C7] text-white p-2.5 rounded-xl transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileHeroAssistant;
