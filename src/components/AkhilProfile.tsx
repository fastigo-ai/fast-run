import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Linkedin,
  Sparkles,
  Bot,
  Cloud,
  Shield,
  ChevronRight,
  X,
  Award,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Lock,
} from "lucide-react";

interface AkhilProfileProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const AkhilProfile: React.FC<AkhilProfileProps> = ({
  onClose,
  isModal = false,
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-white text-slate-900 font-body selection:bg-[#0070ad] selection:text-white overflow-x-hidden">
      {/* Ambient Neural Light Mesh Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-[#0070AD]/6 to-sky-200/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-gradient-to-bl from-[#00A3E0]/6 to-blue-100/20 rounded-full blur-[130px]" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-[#0070AD]/5 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0070ad06_1px,transparent_1px),linear-gradient(to_bottom,#0070ad06_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 border-b border-slate-200/80 shadow-[0_2px_12px_rgba(0,112,173,0.04)]">
          <div className="max-w-[1240px] w-[92%] mx-auto h-[74px] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("top");
                }}
                className="font-display font-extrabold text-xl tracking-tight text-[#0E0A42] hover:text-[#0070AD] transition-colors"
              >
                Akhil Singh
              </a>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#0070AD] bg-sky-50 border border-sky-200 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0070AD] animate-pulse" />
                Founder &amp; CEO
              </span>
            </div>

            <nav className="flex items-center gap-6 text-sm text-slate-600 font-medium">
              <div className="hidden md:flex items-center gap-7">
                <button
                  onClick={() => scrollToSection("about")}
                  className="hover:text-[#0070AD] transition-colors cursor-pointer"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("ventures")}
                  className="hover:text-[#0070AD] transition-colors cursor-pointer"
                >
                  Ventures
                </button>
                <button
                  onClick={() => scrollToSection("focus")}
                  className="hover:text-[#0070AD] transition-colors cursor-pointer"
                >
                  Focus
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="hover:text-[#0070AD] transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </div>

              {isModal && onClose && (
                <button
                  onClick={onClose}
                  aria-label="Close profile modal"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold transition-all duration-200 cursor-pointer shadow-2xs"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Close</span>
                </button>
              )}
            </nav>
          </div>
        </header>

        <main id="top">
          {/* Hero Section */}
          <section className="max-w-[1240px] w-[92%] mx-auto min-h-[calc(100vh-140px)] flex flex-col justify-center py-14 sm:py-20">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 sm:gap-16 items-center">
              {/* Left Column: Bio & Hero copy */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Eyebrow Badges Matching Screenshot */}
                <div className="flex flex-wrap items-center gap-2.5 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#0070AD] bg-sky-50 border border-sky-200 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0070AD] animate-pulse" />
                    Chief Executive Officer &amp; Managing Director
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 shadow-2xs">
                    <Award className="w-3.5 h-3.5 text-[#0070AD]" />
                    IITian &amp; Technology Entrepreneur
                  </span>
                </div>

                {/* Main Heading in #0E0A42 */}
                <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.98] text-[#0E0A42]">
                  Akhil Singh
                </h1>

                {/* Subheading Matching Screenshot */}
                <div className="mt-4 space-y-1">
                  <p className="text-xl sm:text-2xl text-[#0070AD] font-bold tracking-tight font-display">
                    Founder &amp; CEO, Fastigo Technology Pvt. Ltd.
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-slate-500">
                    Leading the Innovation Behind Dora AI
                  </p>
                </div>

                {/* Description Based On Executive Bio */}
                <p className="mt-5 text-slate-600 text-base sm:text-lg leading-relaxed max-w-[640px] font-body">
                  Akhil Singh is an IITian and technology entrepreneur, currently
                  serving as the Founder &amp; CEO of Fastigo Technology Pvt. Ltd.,
                  and leading the innovation behind Dora AI. With a deep passion for
                  Artificial Intelligence, Cloud Computing, Cybersecurity, and
                  Digital Transformation, he operates at the intersection of
                  cutting-edge technology and real-world business challenges.
                </p>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <button
                    onClick={() => scrollToSection("ventures")}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0070AD] hover:bg-[#005a8c] text-white font-semibold text-sm shadow-md shadow-sky-500/20 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  >
                    <span>Explore Solutions</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-sky-50 text-[#0070AD] hover:text-[#005a8c] border border-[#0070AD] font-semibold text-sm transition-all duration-300 shadow-2xs cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Connect</span>
                  </button>
                  <a
                    href="https://www.linkedin.com/in/akhil-singh-160a8733a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 hover:border-slate-300 font-semibold text-sm transition-all duration-300 shadow-2xs"
                  >
                    <Linkedin className="w-4 h-4 text-[#0070AD]" />
                    <span className="hidden sm:inline">LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              </motion.div>

              {/* Right Column: Luxury Executive Frame Matching Leadership Page */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="relative min-h-[440px] sm:min-h-[500px] rounded-[32px] overflow-hidden border border-slate-200/90 shadow-[0_20px_50px_rgba(0,112,173,0.12)] bg-gradient-to-tr from-sky-50/80 via-slate-50/90 to-blue-50/50 flex items-end justify-center p-6 sm:p-8"
              >
                {/* Radial Glow */}
                <div className="absolute w-72 h-72 bg-[#0070AD]/12 rounded-full blur-3xl pointer-events-none" />

                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0070ad0a_1px,transparent_1px),linear-gradient(to_bottom,#0070ad0a_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-60" />

                {/* Center Monogram / Initial Badge */}
                <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center select-none">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white/95 backdrop-blur-xl border border-sky-200/90 shadow-[0_16px_40px_rgba(0,112,173,0.14)] flex items-center justify-center">
                    <span className="font-display text-4xl sm:text-5xl font-black text-[#0E0A42] tracking-wider">
                      AS
                    </span>
                  </div>
                </div>

                {/* Floating Identity Card */}
                <div className="relative z-10 w-full p-6 rounded-2xl border border-sky-200/80 bg-white/95 backdrop-blur-xl shadow-[0_12px_32px_rgba(11,25,44,0.08)]">
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <strong className="font-display text-xl sm:text-2xl font-extrabold text-[#0E0A42]">
                      Akhil Singh
                    </strong>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Executive Board
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#0070AD] mb-1">
                    Founder &amp; CEO, Fastigo Technology Pvt. Ltd.
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    Leading Innovation behind Dora AI
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* About Section */}
          <section
            id="about"
            className="py-20 sm:py-24 border-t border-slate-200/80 relative"
          >
            <div className="max-w-[1240px] w-[92%] mx-auto">
              <div className="grid md:grid-cols-[0.7fr_1.3fr] gap-8 md:gap-14 items-start mb-12">
                <div>
                  <div className="font-display text-xs tracking-[0.25em] font-bold text-[#0070AD] uppercase mb-1.5">
                    About
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0E0A42] leading-[1.12]">
                    Empowering businesses with smarter, scalable, and secure technology.
                  </h2>
                </div>
                <div className="text-slate-600 text-base sm:text-lg leading-relaxed space-y-4 font-body">
                  <p>
                    Akhil Singh is an IITian and technology entrepreneur, currently
                    serving as the Founder &amp; CEO of Fastigo Technology Pvt. Ltd.,
                    and leading the innovation behind Dora AI. With a deep passion for
                    Artificial Intelligence, Cloud Computing, Cybersecurity, and Digital
                    Transformation, he operates at the intersection of cutting-edge
                    technology and real-world business challenges.
                  </p>
                  <p>
                    His journey from IIT to founding Fastigo has been driven by a singular
                    mission — to empower businesses with smarter, scalable, and secure
                    technology solutions. Under his leadership, Fastigo has delivered
                    high-impact digital services across industries, enabling organizations
                    to modernize operations, strengthen security frameworks, and unlock
                    sustainable growth.
                  </p>
                  <p>
                    Fastigo’s core expertise under Akhil’s direction spans AI/ML
                    implementation, secure cloud infrastructure, enterprise DevOps, and
                    end-to-end cybersecurity frameworks. His strategic vision and
                    execution-driven leadership continue to position Fastigo as a
                    forward-thinking technology partner for the digital age.
                  </p>
                </div>
              </div>

              {/* Founder Philosophy Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 sm:p-12 rounded-[28px] border border-sky-200/90 bg-gradient-to-br from-sky-50/95 via-white to-sky-100/50 shadow-[0_16px_40px_rgba(0,112,173,0.08)] relative overflow-hidden"
              >
                <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0E0A42] leading-snug">
                  “Empowering businesses with smarter, scalable, and secure
                  technology solutions for the digital age.”
                </div>
                <div className="flex items-center gap-2 mt-5 text-xs font-bold uppercase tracking-wider text-[#0070AD]">
                  <Sparkles className="w-4 h-4 text-[#0070AD]" />
                  <span>Executive Mission · Fastigo Technology Pvt. Ltd.</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Ventures Section */}
          <section
            id="ventures"
            className="py-20 sm:py-24 border-t border-slate-200/80 relative"
          >
            <div className="max-w-[1240px] w-[92%] mx-auto">
              <div className="grid md:grid-cols-[0.7fr_1.3fr] gap-8 md:gap-14 items-start mb-12">
                <div>
                  <div className="font-display text-xs tracking-[0.25em] font-bold text-[#0070AD] uppercase mb-1.5">
                    Ventures &amp; Platforms
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0E0A42] leading-[1.12]">
                    Core innovations under executive leadership.
                  </h2>
                </div>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-body">
                  Combining deep-tech engineering and enterprise rigor to deliver
                  cutting-edge AI solutions and resilient digital infrastructure.
                </p>
              </div>

              {/* Ventures Grid */}
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                {/* Venture 1: Dora AI */}
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="p-8 sm:p-9 rounded-[28px] bg-white border border-slate-200/90 shadow-[0_12px_40px_rgba(11,25,44,0.06)] hover:shadow-[0_24px_56px_rgba(0,112,173,0.16)] hover:border-[#0070AD]/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#0070AD] bg-sky-50 border border-sky-200">
                        <Bot className="w-3.5 h-3.5 text-[#0070AD]" />
                        Artificial Intelligence &amp; Agents
                      </span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0E0A42] mb-3 tracking-tight">
                      Dora AI
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-body">
                      Next-generation AI innovation powering autonomous business
                      workers, conversational intelligence, prospecting, and
                      automated multi-step enterprise workflows.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-8">
                    {[
                      "Dora AI",
                      "Autonomous AI Workers",
                      "AI/ML Implementation",
                      "Enterprise AI",
                    ].map((pill) => (
                      <span
                        key={pill}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 border border-slate-200/80 hover:bg-sky-50 hover:text-[#0070AD] transition-colors"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </motion.article>

                {/* Venture 2: Fastigo Technology */}
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="p-8 sm:p-9 rounded-[28px] bg-white border border-slate-200/90 shadow-[0_12px_40px_rgba(11,25,44,0.06)] hover:shadow-[0_24px_56px_rgba(0,112,173,0.16)] hover:border-[#0070AD]/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200">
                        <Shield className="w-3.5 h-3.5 text-blue-700" />
                        Enterprise Engineering
                      </span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0E0A42] mb-3 tracking-tight">
                      Fastigo Technology Pvt. Ltd.
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-body">
                      Enterprise technology partner delivering end-to-end digital
                      transformation, secure cloud infrastructure, enterprise
                      DevOps, and cybersecurity frameworks across industries.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-8">
                    {[
                      "Cloud Infrastructure",
                      "Cybersecurity",
                      "Enterprise DevOps",
                      "Digital Transformation",
                    ].map((pill) => (
                      <span
                        key={pill}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 border border-slate-200/80 hover:bg-sky-50 hover:text-[#0070AD] transition-colors"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </motion.article>
              </div>
            </div>
          </section>

          {/* Focus Section */}
          <section
            id="focus"
            className="py-20 sm:py-24 border-t border-slate-200/80 relative"
          >
            <div className="max-w-[1240px] w-[92%] mx-auto">
              <div className="grid md:grid-cols-[0.7fr_1.3fr] gap-8 md:gap-14 items-start mb-12">
                <div>
                  <div className="font-display text-xs tracking-[0.25em] font-bold text-[#0070AD] uppercase mb-1.5">
                    Core Focus
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0E0A42] leading-[1.12]">
                    Strategic technological domains.
                  </h2>
                </div>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-body">
                  Focusing on cutting-edge disciplines to engineer resilient,
                  auditable, and high-performance digital platforms.
                </p>
              </div>

              {/* Timeline Roadmap */}
              <div className="space-y-4">
                {[
                  {
                    num: "01",
                    title: "AI/ML Implementation & Dora AI",
                    desc: "Deploying autonomous AI agents, machine learning workflows, and conversational intelligence tailored for enterprise-scale productivity.",
                  },
                  {
                    num: "02",
                    title: "Secure Cloud Infrastructure & DevOps",
                    desc: "Architecting zero-downtime, scalable cloud environments with continuous integration, continuous delivery, and hardened infrastructure-as-code.",
                  },
                  {
                    num: "03",
                    title: "End-to-End Cybersecurity Frameworks",
                    desc: "Strengthening enterprise defense perimeters through rigorous threat modeling, security compliance, and comprehensive risk mitigation.",
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="grid sm:grid-cols-[140px_1fr] gap-4 sm:gap-8 py-6 border-b border-slate-200/80 items-start"
                  >
                    <div className="font-display text-2xl font-black text-[#0070AD]">
                      {item.num}
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-bold text-[#0E0A42] mb-1.5">
                        {item.title}
                      </h4>
                      <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-body">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section
            id="contact"
            className="py-20 sm:py-24 border-t border-slate-200/80 relative"
          >
            <div className="max-w-[1240px] w-[92%] mx-auto">
              <div className="text-center p-10 sm:p-16 rounded-[30px] border border-sky-200/90 bg-gradient-to-br from-sky-50/95 via-white to-sky-100/50 shadow-[0_16px_40px_rgba(0,112,173,0.08)]">
                <div className="font-display text-xs tracking-[0.25em] font-bold text-[#0070AD] uppercase mb-3">
                  Connect &amp; Collaborate
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#0E0A42] tracking-tight max-w-[760px] mx-auto leading-tight">
                  Partner with Fastigo Technology
                </h2>
                <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-[650px] mx-auto leading-relaxed font-body">
                  Connect for strategic institutional partnerships, enterprise AI
                  implementations, or digital transformation inquiries.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href="mailto:hello@fastigo.co"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0070AD] hover:bg-[#005a8c] text-white font-semibold text-sm shadow-md shadow-sky-500/20 hover:shadow-lg transition-all duration-300"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Contact via Email</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/akhil-singh-160a8733a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-sky-50 text-[#0070AD] hover:text-[#005a8c] border border-[#0070AD] font-semibold text-sm transition-all duration-300 shadow-2xs"
                  >
                    <Linkedin className="w-4 h-4 text-[#0070AD]" />
                    <span>Connect on LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#0070AD]" />
                  </a>
                </div>
              </div>

              {/* Footer */}
              <footer className="mt-16 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                <span>© 2026 Akhil Singh · Fastigo Technology Pvt. Ltd. All rights reserved.</span>
                <span className="font-mono text-[#0070AD] font-medium">
                  fastigo.co · Dora AI
                </span>
              </footer>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AkhilProfile;
