import { useState, useEffect } from "react";
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
    title: "AI-Powered Engineering",
    subtitle: "Accelerate Global PDLCs with PLxAI and next-gen intelligence.",
    image: banner1,
    cta: "Know More",
    category: "Artificial Intelligence",
    link: "/services",
  },
  {
    id: 2,
    title: "Healthcare Innovation",
    subtitle: "Innovative healthcare solutions for better patient outcomes and clinical precision.",
    image: banner4,
    cta: "Explore More",
    category: "Healthcare",
    link: "/category/healthcare",
  },
  {
    id: 3,
    title: "Next-Gen Mobility",
    subtitle: "Driving the future of sustainable transportation and autonomous vehicle tech.",
    image: banner3,
    cta: "Research Now",
    category: "Mobility",
    link: "/category/mobility",
  },
  {
    id: 4,
    title: "EdTech Platforms",
    subtitle: "Transforming education through smart digital learning and automated assessment platforms.",
    image: banner5,
    cta: "Explore More",
    category: "Education",
    link: "/category/edtech",
  },
  {
    id: 5,
    title: "Staffing & Recruitment",
    subtitle: "Connecting the right talent with the right opportunities through AI matching.",
    image: banner6,
    cta: "Explore More",
    category: "Enterprise HR",
    link: "/careers",
  },
  {
    id: 6,
    title: "Digital Manufacturing",
    subtitle: "Smart factories powered by intelligent automation, IoT telemetry, and digital twins.",
    image: banner2,
    cta: "Explore More",
    category: "Industry 4.0",
    link: "/services",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500); // Auto change every 4.5 seconds
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const currentSlide = slides[currentIndex];
  const titleWords = currentSlide.title.split(" ");

  return (
    <section className="relative w-full h-screen min-h-[640px] max-h-[1080px] p-0 m-0 overflow-hidden bg-[#041021] flex items-center">
      {/* Background Banner Carousel with AnimatePresence */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full z-0 p-0 m-0"
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            width={1920}
            height={1080}
            fetchPriority={currentIndex === 0 ? "high" : "auto"}
            loading={currentIndex === 0 ? "eager" : "lazy"}
            decoding="async"
            className="w-full h-full object-cover object-center p-0 m-0"
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic Gradient Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#041021]/95 via-[#0B192C]/70 to-[#041021]/35 p-0 m-0 pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#041021]/95 via-transparent to-[#041021]/50 p-0 m-0 pointer-events-none" />

      {/* Main Text Content Overlaid on Full-Page Banner */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-24 pt-32 pb-12 sm:pb-16 max-w-[1600px] mx-auto">
        
        {/* Top Floating Search Bar */}
        <div className="w-full max-w-2xl mx-auto mb-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center bg-white/15 backdrop-blur-xl rounded-full px-4 py-1.5 sm:py-2 border border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-white/40 transition-all duration-300"
          >
            <div className="pl-2 sm:pl-3 flex items-center flex-1 bg-transparent">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2.5 text-[#00A3E0]" />
              <input
                type="text"
                placeholder="How can Fastigo AI help you navigate change?"
                className="bg-transparent outline-none text-white w-full py-2 text-xs sm:text-sm md:text-base font-body placeholder:text-slate-300 font-medium"
              />
            </div>
            <button className="bg-[#0070AD] hover:bg-[#0084C7] text-white px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide hover:shadow-[0_0_20px_rgba(0,112,173,0.6)] transition-all whitespace-nowrap">
              Explore
            </button>
          </motion.div>
        </div>

        {/* Center / Lower-Left Banner Slide Animated Text */}
        <div className="my-auto max-w-3xl min-h-[300px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.1,
                  },
                },
                exit: {
                  opacity: 0,
                  y: -18,
                  filter: "blur(6px)",
                  transition: { duration: 0.35, ease: "easeIn" },
                },
              }}
              className="flex flex-col items-start w-full"
            >
              {/* Category Pill with Kinetic Slide & Glow */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -12, scale: 0.92 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0070AD]/30 border border-[#00A3E0]/40 backdrop-blur-md mb-4 sm:mb-6 shadow-[0_0_20px_rgba(0,163,224,0.25)]"
              >
                <span className="w-2 h-2 rounded-full bg-[#00A3E0] animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#00A3E0] uppercase font-display">
                  {currentSlide.category}
                </span>
              </motion.div>

              {/* Main Headline with Masked Word Stagger Animation */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-white leading-[1.08] tracking-tight mb-4 sm:mb-6 flex flex-wrap gap-x-3.5 sm:gap-x-4">
                {titleWords.map((word, wIdx) => (
                  <span key={wIdx} className="overflow-hidden inline-block py-1">
                    <motion.span
                      variants={{
                        hidden: { y: "115%", opacity: 0, rotate: 2 },
                        visible: {
                          y: "0%",
                          opacity: 1,
                          rotate: 0,
                          transition: {
                            duration: 0.65,
                            ease: [0.16, 1, 0.3, 1],
                          },
                        },
                      }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>

              {/* Subtitle with Soft Kinetic Blur & Slide Reveal */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                      duration: 0.6,
                      delay: 0.25,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-200 font-body mb-8 sm:mb-10 max-w-2xl leading-relaxed"
              >
                {currentSlide.subtitle}
              </motion.p>

              {/* CTA Action Buttons with Elastic Fade-In */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.55,
                      delay: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                className="flex flex-wrap items-center gap-4"
              >
                <a
                  href={currentSlide.link}
                  className="inline-flex items-center gap-2.5 bg-[#0070AD] hover:bg-[#0084C7] text-white font-semibold text-sm sm:text-base px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-[0_4px_24px_rgba(0,112,173,0.4)] hover:shadow-[0_8px_32px_rgba(0,112,173,0.6)] hover:scale-[1.02] transition-all duration-300 group"
                >
                  <span>{currentSlide.cta}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md font-semibold text-sm sm:text-base px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Get in Touch
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Bar: Watermark, Arrows & 4.5s Progress Indicators */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/15">
          {/* Engineering The Change Tagline */}
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0070AD]" />
            <p className="text-xs sm:text-sm font-display font-bold tracking-widest text-slate-300 uppercase">
              Engineering <span className="text-[#00A3E0]">The Change</span>
            </p>
          </div>

          {/* Slide Navigation Dots / Progress Bars & Arrows */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 sm:gap-2.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
                  style={{ width: i === currentIndex ? "36px" : "12px" }}
                >
                  <div
                    className={`absolute inset-0 ${
                      i === currentIndex ? "bg-white/30" : "bg-white/20"
                    }`}
                  />
                  {i === currentIndex && (
                    <motion.div
                      key={`progress-${currentIndex}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4.5, ease: "linear" }}
                      className="absolute inset-y-0 left-0 bg-[#00A3E0] rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
