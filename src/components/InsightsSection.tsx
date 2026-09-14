import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

// New high-definition generated images matching the reference aesthetic
import analystImg from '../assets/insight_analyst.jpg';
import agenticAiImg from '../assets/insight_agentic_ai.jpg';
import mobilityImg from '../assets/insight_mobility.jpg';
import voiceAiImg from '../assets/insight_voice_ai.jpg';
import newsroomImg from '../assets/insight_newsroom.jpg';
import execCollabImg from '../assets/insight_exec_collab.jpg';

export interface InsightCardItem {
  id: string;
  title: string;
  category: string;
  type: string;
  description: string;
  readTime: string;
  slug: string;
  image: string;
  accentColor: string;
}

const insightsData: InsightCardItem[] = [
  {
    id: 'analyst-recognitions',
    title: 'Analyst Recognitions',
    category: 'Industry Leadership',
    type: 'Leadership Report',
    description: 'Fastigo is recognised as a disruptive leader across enterprise AI systems, cloud platforms, and autonomous engineering.',
    readTime: '5 min read',
    slug: 'analyst-recognitions-enterprise-leader',
    image: analystImg,
    accentColor: '#F59E0B',
  },
  {
    id: 'agentic-ai',
    title: 'Agentic AI Revolution',
    category: 'Autonomous Systems',
    type: 'Point of View',
    description: 'How multi-agent architectures and goal-directed workflows are redefining enterprise operations and decision intelligence.',
    readTime: '6 min read',
    slug: 'navigating-agentic-ai-revolution',
    image: agenticAiImg,
    accentColor: '#8B5CF6',
  },
  {
    id: 'smart-mobility',
    title: 'Smart Mobility & Transport',
    category: 'Automotive & SDV',
    type: 'Whitepaper',
    description: 'Accelerating Software-Defined Vehicles (SDVs), computer vision ADAS, and immersive in-cabin user experiences.',
    readTime: '8 min read',
    slug: 'how-ai-driving-next-era-mobility',
    image: mobilityImg,
    accentColor: '#00A3FF',
  },
  {
    id: 'voice-ai',
    title: 'Enterprise Voice AI Agents',
    category: 'Speech & NLP',
    type: 'Case Study',
    description: 'Architecting low-latency conversational voice models with enterprise guardrails, empathy, and deep CRM/ERP integrations.',
    readTime: '5 min read',
    slug: 'building-custom-voice-ai-agents-enterprise',
    image: voiceAiImg,
    accentColor: '#10B981',
  },
  {
    id: 'newsroom',
    title: 'Fastigo Newsroom',
    category: 'Press & Media',
    type: 'Global News',
    description: 'Stay updated with Fastigo\'s latest breakthrough product launches, strategic enterprise alliances, and global summits.',
    readTime: '3 min read',
    slug: 'fastigo-global-newsroom-announcements',
    image: newsroomImg,
    accentColor: '#E11D48',
  },
  {
    id: 'exec-insights',
    title: 'Strategic Insights',
    category: 'Business Transformation',
    type: 'Executive Brief',
    description: 'Actionable perspectives from C-suite leaders on scaling generative AI, enterprise cost-efficiency, and tech modernization.',
    readTime: '7 min read',
    slug: 'strategic-executive-insights-transformation',
    image: execCollabImg,
    accentColor: '#38BDF8',
  }
];

const InsightsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // Auto-scroll loop with smooth requestAnimationFrame
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;
    const speed = 0.85; // steady cinematic scroll speed

    const step = () => {
      if (!isPaused && !isUserInteracting && container) {
        container.scrollLeft += speed;
        // Seamless loop wrap: when scrolled past first half of duplicated list
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isUserInteracting]);

  // Manual scroll handler
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Duplicate items for continuous infinite scroll
  const displayItems = [...insightsData, ...insightsData];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-slate-50/80 dark:bg-slate-950/90">
      {/* Ambient background decoration */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-6 max-w-[1360px] relative z-10 mb-8 sm:mb-12">
        {/* Section Header with Title & Navigation Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-slate-200/80 dark:border-slate-800 pb-6 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#0070AD] border border-blue-100 mb-3 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0070AD] animate-pulse" />
              <span>Thought Leadership &amp; Perspectives</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[46px] font-display font-bold text-[#0E0A42] dark:text-white tracking-tight leading-tight">
              Insights &amp; Innovations
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-body">
              Explore deep-tech research, enterprise architectures, and strategic perspectives from Fastigo's technology leaders.
            </p>
          </div>

          {/* Controls: Left/Right Buttons + Pause/Play + View All */}
          <div className="flex items-center gap-3">
            {/* Auto-scroll toggle indicator */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
              title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
              aria-label={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-green-600" /> : <Pause className="w-3.5 h-3.5 text-amber-500" />}
              <span className="hidden sm:inline">{isPaused ? 'Paused' : 'Auto-Scroll'}</span>
            </button>

            {/* Prev / Next Nav Buttons */}
            <div className="flex items-center gap-1.5 bg-white/80 dark:bg-slate-900 p-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
              <button
                onClick={() => handleScroll('left')}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* View All Link */}
            <Link 
              to="/blog" 
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-[#0070AD] hover:text-[#005a8c] dark:text-sky-400 transition-colors group ml-2"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Side-by-Side Auto-Scrolling Cards Carousel */}
      <div 
        className="w-full relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsUserInteracting(true)}
        onTouchEnd={() => setIsUserInteracting(false)}
      >
        <div
          ref={scrollRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto scrollbar-none px-5 sm:px-8 pb-8 pt-2 scroll-smooth cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayItems.map((item, index) => (
            <Link
              key={`${item.id}-${index}`}
              to={`/blog/${item.slug}`}
              className="group relative flex-shrink-0 w-[285px] sm:w-[325px] md:w-[350px] h-[480px] sm:h-[530px] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-slate-950 border border-slate-800/80 shadow-[0_12px_36px_rgba(0,0,0,0.18)] hover:shadow-[0_24px_54px_rgba(0,0,0,0.32)] transition-all duration-500 hover:-translate-y-2 select-none flex flex-col justify-end p-5 sm:p-6"
            >
              {/* Background Real Editorial Image with Cinematic Scale on Hover */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none opacity-90 group-hover:opacity-95 transition-opacity" />

              {/* Subtle Glowing Radial Highlights */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-2/3 opacity-40 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at bottom, ${item.accentColor}25 0%, transparent 70%)`
                }}
              />

              {/* Bottom Content Area: Heading always visible, 3-line content reveals on hover */}
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-[26px] font-display font-bold text-white tracking-tight leading-snug drop-shadow-md group-hover:text-sky-300 transition-colors duration-300">
                  {item.title}
                </h3>

                {/* 3-line Content reveals on hover */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-400 ease-out">
                  <div className="overflow-hidden">
                    <p className="pt-2.5 text-[13px] sm:text-sm text-slate-200/90 font-normal leading-relaxed line-clamp-3 drop-shadow opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-75">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile View All CTA */}
      <div className="mt-6 text-center sm:hidden px-5">
        <Link 
          to="/blog" 
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl bg-blue-50 text-sm font-semibold text-[#0070AD] border border-blue-100 hover:bg-[#0070AD] hover:text-white transition-all duration-300 shadow-sm"
        >
          <span>View All Insights &amp; Articles</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default InsightsSection;
