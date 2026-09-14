import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import banner1 from "../assets/AIPOWEREDENGINERRING.webp";
import banner2 from "../assets/DIGITALMANUFACTURING.webp";
import banner3 from "../assets/NEXT-GEN-MOBILITY.webp";
import banner4 from "../assets/healthCare.webp";
import banner5 from "../assets/Edtech.webp";
import banner6 from "../assets/HRMS.webp";

const slides = [
  {
    id: 1,
    title: "EdTech",
    subtitle: "Transforming education through smart digital learning platforms.",
    image: banner5,
    category: "Education",
    link: "/category/edtech",
    tagline: "THE CHANGE",
  },
  {
    id: 2,
    title: "AI-Powered Engineering",
    subtitle: "Accelerate global product lifecycles with next-generation autonomous AI intelligence.",
    image: banner1,
    category: "Artificial Intelligence",
    link: "/services",
    tagline: "INTELLIGENCE",
  },
  {
    id: 3,
    title: "Next-Gen Mobility",
    subtitle: "Driving the future of sustainable transportation and autonomous vehicle tech.",
    image: banner3,
    category: "Mobility",
    link: "/category/mobility",
    tagline: "MOBILITY",
  },
  {
    id: 4,
    title: "Healthcare Innovation",
    subtitle: "Innovative healthcare solutions for better patient outcomes and clinical precision.",
    image: banner4,
    category: "Healthcare",
    link: "/category/healthcare",
    tagline: "CARE",
  },
  {
    id: 5,
    title: "Digital Manufacturing",
    subtitle: "Smart factories powered by intelligent automation, IoT telemetry, and digital twins.",
    image: banner2,
    category: "Industry 4.0",
    link: "/services",
    tagline: "INDUSTRY",
  },
  {
    id: 6,
    title: "Staffing & Recruitment",
    subtitle: "Connecting the right talent with transformative opportunities through AI matching.",
    image: banner6,
    category: "Enterprise HR",
    link: "/careers",
    tagline: "TALENT",
  },
];

const INTERVAL_MS = 5000; // 5-second interval as requested

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const [isPaused, setIsPaused] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const touchStartX = useRef<number | null>(null);

  // Responsive mobile check for sweep distance
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNext = useCallback(() => {
    if (isShuffling) return;
    setIsShuffling(true);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsShuffling(false), 620);
  }, [isShuffling]);

  const handlePrev = useCallback(() => {
    if (isShuffling) return;
    setIsShuffling(true);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsShuffling(false), 620);
  }, [isShuffling]);

  const goToSlide = (idx: number) => {
    if (isShuffling || idx === currentIndex) return;
    setIsShuffling(true);
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
    setTimeout(() => setIsShuffling(false), 620);
  };

  // Auto-play timer with 5-second interval
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, [handleNext, isPaused]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  const currentSlide = slides[currentIndex];
  // Upcoming cards in the deck
  const nextSlide = slides[(currentIndex + 1) % slides.length];
  const thirdSlide = slides[(currentIndex + 2) % slides.length];

  // Smooth Front-to-Back Card Transition (No sideways shuffling or tilting)
  const cardTransitionVariants = {
    enter: () => ({
      x: 0,
      y: -14,
      scale: 0.96,
      opacity: 0.75,
      zIndex: 20,
    }),
    center: () => ({
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      zIndex: 35,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    exit: () => ({
      // Smoothly transitions from front to back of the deck
      x: 0,
      y: -28,
      scale: 0.90,
      opacity: [1, 0.6, 0],
      zIndex: 10,
      transition: {
        duration: 0.58,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#eaf4fe] via-[#f1f8fd] to-[#f8fbfe] pt-24 sm:pt-32 pb-14 sm:pb-20">
      {/* Background Decorative Ambient Mesh & Wave Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-gradient-to-r from-[#0070AD]/10 via-[#00A3E0]/15 to-[#38bdf8]/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-40 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(0,112,173,0.12),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1240px] relative z-10">
        {/* 1. Top Floating AI Prompt Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl mx-auto mb-8 sm:mb-12"
        >
          <div className="flex items-center bg-white/90 backdrop-blur-2xl rounded-full pl-4 sm:pl-5 pr-1.5 sm:pr-2 py-1.5 sm:py-2 border border-sky-100/90 shadow-[0_12px_36px_rgba(0,112,173,0.1)] hover:shadow-[0_16px_44px_rgba(0,112,173,0.16)] hover:border-sky-200 transition-all duration-300">
            <div className="flex items-center flex-1 min-w-0 pr-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#00A3E0] mr-2.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="How can we help?"
                className="bg-transparent outline-none text-slate-800 w-full py-1 text-sm sm:text-[15px] font-body placeholder:text-slate-400 font-medium"
              />
            </div>
            <button
              onClick={() => {
                if (searchQuery.trim()) {
                  window.location.href = `/services?search=${encodeURIComponent(searchQuery)}`;
                }
              }}
              className="bg-[#0b1b38] hover:bg-[#0070AD] text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-sm hover:shadow-[0_4px_16px_rgba(0,112,173,0.4)] transition-all duration-300 shrink-0 cursor-pointer"
            >
              Generate
            </button>
          </div>
        </motion.div>

        {/* 2. Stacked 3D Cards Deck Carousel with Physical Shuffle Animation */}
        <div
          className="relative w-full max-w-[1140px] mx-auto pt-6 sm:pt-8"
          style={{ perspective: "1600px" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Stack Tier 2 (Back card peek in the deck) */}
          <motion.div
            key={`tier2-${thirdSlide.id}`}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 0.7, scale: 0.92, y: -26 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -top-6 inset-x-8 sm:inset-x-12 h-[350px] sm:h-[430px] md:h-[480px] lg:h-[500px] rounded-3xl bg-[#061226]/90 border border-slate-800/70 shadow-md pointer-events-none overflow-hidden z-0"
          >
            <div className="absolute inset-0 bg-[#061226]/95" />
          </motion.div>

          {/* Stack Tier 1 (Middle card peek in the deck with preview artwork) */}
          <motion.div
            key={`tier1-${nextSlide.id}`}
            initial={{ opacity: 0.6, scale: 0.94, y: -20 }}
            animate={{ opacity: 0.92, scale: 0.96, y: -13 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -top-3 inset-x-4 sm:inset-x-6 h-[350px] sm:h-[430px] md:h-[480px] lg:h-[500px] rounded-3xl bg-[#071733] border border-slate-700/60 shadow-lg pointer-events-none overflow-hidden z-10"
          >
            <img
              src={nextSlide.image}
              alt=""
              className="absolute right-0 top-0 h-full w-3/5 object-cover opacity-25 filter blur-[1px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071733] via-[#071733]/90 to-transparent" />
            <div className="relative z-10 p-6 sm:p-10 opacity-40 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#00A3E0]" />
              <span className="font-display text-lg sm:text-2xl font-bold text-white">
                {nextSlide.title}
              </span>
            </div>
          </motion.div>

          {/* Active Front Card & Shuffling Deck Container */}
          <div className="relative z-30 w-full h-[360px] sm:h-[430px] md:h-[480px] lg:h-[500px]">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={currentSlide.id}
                custom={direction}
                variants={cardTransitionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-[#07132b] border border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(7,19,43,0.55)] flex flex-col justify-between select-none transform-gpu will-change-transform"
              >
                {/* Background Image on Right */}
                <div className="absolute right-0 top-0 bottom-0 w-full md:w-[68%] lg:w-[62%] h-full pointer-events-none overflow-hidden">
                  <motion.img
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    initial={{ scale: 1.06 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 5, ease: "easeOut" }}
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Seamless Fade Gradient from dark navy on left into image */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#07132b] via-[#07132b]/85 md:via-[#07132b]/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07132b] via-transparent to-transparent md:hidden" />
                </div>

                {/* Card Top & Middle Content (Left Column) */}
                <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 pt-8 pb-4 max-w-2xl">
                  {/* Blue Accent Dot + Title */}
                  <div className="flex items-center gap-3 sm:gap-3.5 mb-3 sm:mb-4">
                    <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#00A3E0] shadow-[0_0_12px_#00A3E0] shrink-0" />
                    <h2 className="font-display text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                      {currentSlide.title}
                    </h2>
                  </div>

                  {/* Subtitle Description */}
                  <p className="text-sm sm:text-base md:text-lg text-slate-300 font-body leading-relaxed max-w-xl mb-6">
                    {currentSlide.subtitle}
                  </p>

                  {/* Quick Link Action */}
                  <div className="flex items-center gap-3">
                    <a
                      href={currentSlide.link}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#38bdf8] hover:text-white transition-colors group"
                    >
                      <span>Explore {currentSlide.category}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>

                {/* Card Bottom Bar: Tagline & Dash Indicators */}
                <div className="relative z-10 w-full px-6 sm:px-10 md:px-14 lg:px-16 pb-6 sm:pb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Bottom Left Tagline (Matches Screenshot) */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-display font-bold tracking-widest uppercase">
                    <span className="text-white">ENGINEERING</span>
                    <span className="text-[#F5A623]">THE CHANGE</span>
                  </div>

                  {/* Bottom Right Slide Indicators (Pill Dash Bars) */}
                  <div className="flex items-center gap-2 sm:gap-2.5 self-end sm:self-auto">
                    {slides.map((_, idx) => {
                      const isActive = idx === currentIndex;
                      return (
                        <button
                          key={idx}
                          onClick={() => goToSlide(idx)}
                          aria-label={`Go to slide ${idx + 1}`}
                          className="relative h-1.5 rounded-full overflow-hidden transition-all duration-400 cursor-pointer"
                          style={{
                            width: isActive ? "32px" : "14px",
                          }}
                        >
                          <div
                            className={`w-full h-full transition-colors duration-300 ${
                              isActive ? "bg-[#00A3E0]" : "bg-white/30 hover:bg-white/60"
                            }`}
                          />
                          {isActive && !isPaused && (
                            <motion.div
                              key={`progress-${currentIndex}`}
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: INTERVAL_MS / 1000, ease: "linear" }}
                              className="absolute inset-y-0 left-0 bg-[#38bdf8] rounded-full shadow-[0_0_8px_#38bdf8]"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Chevrons */}
            <div className="absolute inset-y-0 -left-3 sm:-left-5 z-50 flex items-center pointer-events-none">
              <button
                onClick={handlePrev}
                aria-label="Previous Slide"
                className="pointer-events-auto p-2.5 rounded-full bg-slate-900/80 hover:bg-[#0070AD] text-white/80 hover:text-white backdrop-blur-md border border-white/20 shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <div className="absolute inset-y-0 -right-3 sm:-right-5 z-50 flex items-center pointer-events-none">
              <button
                onClick={handleNext}
                aria-label="Next Slide"
                className="pointer-events-auto p-2.5 rounded-full bg-slate-900/80 hover:bg-[#0070AD] text-white/80 hover:text-white backdrop-blur-md border border-white/20 shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


