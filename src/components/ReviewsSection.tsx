import { motion } from 'framer-motion';
import { Quote, Sparkles, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

const reviews = [
  {
    quote: "The level of technical precision Fastigo brings to AI engineering is unparalleled. They didn't just automate our workflow; they fundamentally redesigned it for the agentic era.",
    author: "Elena Rodriguez",
    role: "VP of Engineering",
    company: "Tier-1 Global Automotive",
    accent: "#0070AD",
    rating: 5,
  },
  {
    quote: "Accelerating our digital transformation journey with Fastigo has been a game-changer. Their deep domain expertise in IoT and Digital Engineering is exactly what we needed for our smart factory initiative.",
    author: "David Chen",
    role: "Chief Digital Officer",
    company: "Global Logistics Group",
    accent: "#6366F1",
    rating: 5,
  },
  {
    quote: "Fastigo's commitment to clean, scalable, and secure engineering is rare. Their contribution to our cloud modernization strategy was strategic and flawlessly executed.",
    author: "Sarah Jenkins",
    role: "Director of Technology",
    company: "Healthcare Systems Inc.",
    accent: "#00A3E0",
    rating: 5,
  },
  {
    quote: "The AI solutions provided by Fastigo have completely transformed our supply chain logistics. Their predictive models are incredibly accurate and have saved us millions.",
    author: "Michael Zhang",
    role: "Head of Operations",
    company: "Logistique World",
    accent: "#10B981",
    rating: 5,
  },
  {
    quote: "Working with Fastigo on our smart grid initiative was a seamless experience. Their engineering talent is world-class, and they deliver on time, every time.",
    author: "Amara Okoro",
    role: "CTO",
    company: "EcoEnergy Solns",
    accent: "#F59E0B",
    rating: 5,
  },
  {
    quote: "Fastigo's approach to cybersecurity in our healthcare platform was thorough and forward-thinking. We feel more secure than ever.",
    author: "Robert Smith",
    role: "CISO",
    company: "HealthCore",
    accent: "#0070AD",
    rating: 5,
  },
  {
    quote: "Their team's expertise in edge computing allowed us to deploy real-time analytics across our manufacturing plants in record time.",
    author: "Yuki Tanaka",
    role: "VP Innovation",
    company: "NexGen Industries",
    accent: "#6366F1",
    rating: 5,
  },
  {
    quote: "The personalized mobility solutions Fastigo engineered for us are at the forefront of the industry. They truly understand the future of transport.",
    author: "Carlos Gomez",
    role: "Director of Product",
    company: "CityFlow Mobility",
    accent: "#00A3E0",
    rating: 5,
  },
  {
    quote: "Fastigo is more than a service provider; they are a strategic partner who cares about our long-term success.",
    author: "Emily Watson",
    role: "CEO",
    company: "Watson Dynamics",
    accent: "#10B981",
    rating: 5,
  }
];

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
  <div className="flex-shrink-0 w-[290px] xs:w-[330px] sm:w-[400px] md:w-[420px] mx-2 sm:mx-3.5 p-5 sm:p-8 border border-slate-200/90 rounded-[20px] sm:rounded-[24px] bg-white/95 backdrop-blur-xl transition-all duration-400 group flex flex-col justify-between h-[290px] sm:h-[320px] relative overflow-hidden shadow-[0_8px_25px_rgba(0,112,173,0.06)] hover:shadow-[0_22px_45px_-8px_rgba(0,112,173,0.16)] hover:border-[#0070AD]/40 hover:-translate-y-2 cursor-pointer">
    
    {/* Subtle Accent Glow Aura on Card Top */}
    <div
      className="pointer-events-none absolute -top-12 -right-12 w-36 h-36 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-0"
      style={{ backgroundColor: `${review.accent}20` }}
    />

    {/* Background Watermark Quote */}
    <div className="absolute top-2 right-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
      <Quote size={90} className="text-[#0070ad]" />
    </div>

    {/* Top Bar: Stars + Quote Icon */}
    <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-10">
      <div className="flex items-center gap-1">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <div
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${review.accent}12`, color: review.accent }}
      >
        <Quote className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </div>
    </div>

    {/* Quote Body */}
    <p className="text-slate-700 font-body text-xs sm:text-[15px] leading-relaxed mb-4 sm:mb-6 flex-1 relative z-10 font-normal line-clamp-4 sm:line-clamp-none">
      "{review.quote}"
    </p>

    {/* Author Info */}
    <div className="pt-4 sm:pt-5 border-t border-slate-100 flex items-center gap-3 relative z-10">
      <div 
        className="w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-display font-bold text-xs sm:text-sm text-white shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${review.accent}, #0070AD)`
        }}
      >
        {review.author.charAt(0)}
      </div>

      <div className="overflow-hidden">
        <div className="flex items-center gap-1.5">
          <h4 className="font-display font-bold text-sm sm:text-[15px] text-[#0070ad] tracking-tight truncate">
            {review.author}
          </h4>
          <CheckCircle2 className="w-3.5 h-3.5 text-[#0070AD] shrink-0" />
        </div>
        <p className="text-slate-500 text-[11px] sm:text-xs font-body tracking-normal truncate">
          {review.role} <span className="text-slate-300 mx-1">•</span> <span className="font-medium text-slate-700">{review.company}</span>
        </p>
      </div>
    </div>
  </div>
);

const MarqueeRow = ({
  items,
  direction = 'left',
  speed = 45,
}: {
  items: typeof reviews;
  direction?: 'left' | 'right';
  speed?: number;
}) => (
  <div className="flex overflow-hidden relative py-2 sm:py-3 group">
    <div
      className="flex marquee-content"
      style={{
        width: 'max-content',
        animation: `marquee-${direction} ${speed}s linear infinite`,
      }}
    >
      {[...items, ...items, ...items].map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
    </div>
    <style>{`
      @keyframes marquee-left {
        0% { transform: translateX(0); }
        100% { transform: translateX(-33.333%); }
      }
      @keyframes marquee-right {
        0% { transform: translateX(-33.333%); }
        100% { transform: translateX(0); }
      }
      .group:hover .marquee-content {
        animation-play-state: paused !important;
      }
    `}</style>
  </div>
);

const ReviewsSection = () => {
  return (
    <section className="relative py-16 sm:py-24 border-t border-slate-200/60 overflow-hidden z-10">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-100/30 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 max-w-[1240px] mb-10 sm:mb-14 relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 sm:gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-[#0070AD] text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0070AD]" />
              Proven Enterprise Impact
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-[46px] font-display font-bold text-[#0E0A42] leading-[1.15] tracking-tight">
              <span>Engineering Trust</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070AD] via-[#0084C7] to-[#00A3E0]">
                Through Results
              </span>
            </h2>
          </div>

          {/* Decorative Modern Accent Bars */}
          <div className="hidden lg:flex items-center gap-2 pb-2">
            <div className="w-12 h-1.5 rounded-full bg-[#0070AD]" />
            <div className="w-3 h-1.5 rounded-full bg-[#0070AD]/30" />
            <div className="w-3 h-1.5 rounded-full bg-[#0070AD]/30" />
          </div>
        </div>
      </div>

      {/* Single Marquee Layer of Cards with Viewport Gradient Masks */}
      <div className="relative">
        {/* Left & Right Fade Masks for Seamless Marquee */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-40 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-40 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

        <MarqueeRow items={reviews} direction="left" speed={50} />
      </div>

      {/* Industry Badges Footer */}
      <div className="container mx-auto px-4 max-w-[1240px]">
        <div className="mt-12 sm:mt-20 pt-10 sm:pt-14 border-t border-slate-200/80 flex flex-wrap justify-center items-center gap-3 sm:gap-6 lg:gap-16 text-slate-500 font-semibold tracking-wider text-xs sm:text-sm">
          {["AUTOMOTIVE", "LOGISTICS", "HEALTHCARE", "FINTECH", "RETAIL"].map((industry) => (
            <span
              key={industry}
              className="font-display px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white/60 border border-slate-200/60 shadow-xs hover:border-[#0070AD]/40 hover:text-[#0070AD] hover:bg-white transition-all duration-300 cursor-default"
            >
              {industry}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
