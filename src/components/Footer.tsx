import { motion } from 'framer-motion';
import {
  Mail,
  MapPin,
  Phone,
  LayoutGrid,
  Building2,
  ChevronRight,
  Sparkles,
  Cloud,
  ShieldCheck,
  Linkedin,
  Youtube,
  Github,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import fastigoLogo from '@/assets/fastigo-logo.webp';

const Footer = () => {
  return (
    <footer className="relative bg-white/95 border-t border-slate-200/70 pt-16 pb-8 overflow-hidden font-body selection:bg-[#0070ad] selection:text-white">
      {/* ── Background Decorative Shapes ── */}
      
      {/* Bottom-left layered curved waves */}
      <div className="absolute -bottom-6 -left-10 w-72 sm:w-96 h-72 sm:h-96 pointer-events-none z-0 opacity-80">
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-50 350 C 30 240, 120 220, 220 290 C 260 320, 290 340, 320 350 Z"
            fill="url(#wave-grad-1)"
            opacity="0.45"
          />
          <path
            d="M-40 330 C 50 180, 160 170, 280 260 C 310 280, 330 310, 350 340 Z"
            fill="url(#wave-grad-2)"
            opacity="0.35"
          />
          <defs>
            <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bfdbfe" />
              <stop offset="100%" stopColor="#c7d2fe" />
            </linearGradient>
            <linearGradient id="wave-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#e0e7ff" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Right side soft organic blob */}
      <div className="absolute top-0 right-0 w-[320px] sm:w-[420px] h-[340px] sm:h-[400px] pointer-events-none z-0">
        <div className="w-full h-full bg-gradient-to-bl from-blue-100/50 via-indigo-50/40 to-transparent rounded-bl-[160px] blur-[30px] opacity-90" />
      </div>

      {/* ── Main Footer Content ── */}
      <div className="container relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
          
          {/* Column 1: Brand & Badges (approx 3.5 cols) */}
          <div className="lg:col-span-4 pr-0 lg:pr-4 flex flex-col items-start">
            <Link to="/" className="inline-block group mb-4" aria-label="Fastigo Home">
              <img
                src={fastigoLogo}
                alt="Fastigo Technology"
                className="h-20 sm:h-24 lg:h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>

            <p className="text-[13.5px] leading-relaxed text-slate-600 max-w-sm mb-5 font-normal">
              Pioneering the future of technology with innovative AI solutions and digital transformation.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#e0f2fe]/80 text-[#0284c7] border border-[#bae6fd]/70 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
                AI &amp; Data
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f3e8ff]/80 text-[#9333ea] border border-[#e9d5ff]/70 shadow-xs">
                <Cloud className="w-3.5 h-3.5 text-[#9333ea]" />
                Cloud
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#dcfce7]/80 text-[#16a34a] border border-[#bbf7d0]/70 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16a34a]" />
                Security
              </span>
            </div>

            {/* Handwritten note: Build • Innovate • Grow */}
            <div className="relative pt-1 pl-1">
              <span className="font-script text-2xl font-bold text-[#0284c7] tracking-wide inline-block transform -rotate-1 select-none">
                Build • Innovate • Grow
              </span>
              <svg
                className="w-20 h-3 text-[#0284c7] -mt-1 ml-0.5"
                viewBox="0 0 100 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 2 10 Q 40 16 90 4"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Column 2: SERVICES (approx 2.3 cols) */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0070AD] shrink-0 shadow-2xs">
                <LayoutGrid className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display text-[13px] font-bold tracking-wider text-[#0e1726] uppercase">
                  SERVICES
                </h4>
                <div className="h-[2px] w-5 bg-[#0070AD] rounded-full mt-0.5" />
              </div>
            </div>

            {/* Links */}
            <ul className="space-y-2.5">
              {[
                { name: 'AI & Data Analytics', path: '/services/artificial-intelligence-and-data-analytics' },
                { name: 'Cloud Services', path: '/services/cloud' },
                { name: 'Cybersecurity', path: '/services/cybersecurity' },
                { name: 'Enterprise Solutions', path: '/services/enterprise-solutions' },
                { name: 'Digital Engineering', path: '/services/iot-and-digital-engineering' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="group flex items-center justify-between text-[13.5px] text-slate-600 hover:text-[#0070AD] transition-colors duration-200 py-0.5"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                      {item.name}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0070AD] group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-2" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: COMPANY (approx 2.3 cols) */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-[#9333ea] shrink-0 shadow-2xs">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display text-[13px] font-bold tracking-wider text-[#0e1726] uppercase">
                  COMPANY
                </h4>
                <div className="h-[2px] w-5 bg-[#9333ea] rounded-full mt-0.5" />
              </div>
            </div>

            {/* Links */}
            <ul className="space-y-2.5">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Careers', path: '/careers' },
                { name: 'Blog', path: '/blog' },
                { name: 'Leadership', path: '/leadership' },
                { name: 'Portfolio', path: '/portfolio' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="group flex items-center justify-between text-[13.5px] text-slate-600 hover:text-[#0070AD] transition-colors duration-200 py-0.5"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                      {item.name}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0070AD] group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-2" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: CONTACT & Right Element (approx 3.7 cols) */}
          <div className="lg:col-span-4 relative">
            <div className="flex flex-col sm:flex-row lg:flex-row justify-between items-start gap-6">
              
              {/* Contact list */}
              <div className="max-w-[280px]">
                {/* Header */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0d9488] shrink-0 shadow-2xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display text-[13px] font-bold tracking-wider text-[#0e1726] uppercase">
                      CONTACT
                    </h4>
                    <div className="h-[2px] w-5 bg-[#0d9488] rounded-full mt-0.5" />
                  </div>
                </div>

                <ul className="space-y-3.5">
                  <li>
                    <a
                      href="mailto:Info@fastigo.co"
                      className="flex items-center gap-2.5 text-[13.5px] text-slate-600 hover:text-[#0070AD] transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0070AD] shrink-0 group-hover:bg-[#0070AD] group-hover:text-white transition-all">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium">Info@fastigo.co</span>
                    </a>
                  </li>

                  <li>
                    <a
                      href="tel:+919217477169"
                      className="flex items-center gap-2.5 text-[13.5px] text-slate-600 hover:text-[#0070AD] transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0070AD] shrink-0 group-hover:bg-[#0070AD] group-hover:text-white transition-all">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium">+91 9217477169</span>
                    </a>
                  </li>

                  <li>
                    <div className="flex items-start gap-2.5 text-[12.5px] text-slate-600 leading-snug">
                      <div className="w-7 h-7 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0070AD] shrink-0 mt-0.5">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <span className="pt-0.5">
                        G-81 &amp; G-82, Old No G-23-A PVT Office NO-201 Second Floor Laxmi Nagar, New Delhi, New Delhi, New Delhi, Delhi, India, 110092
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Right decorative "Let's Build Together" typography */}
              <div className="hidden sm:flex lg:flex flex-col items-center justify-center self-center pl-2 pt-2 select-none">
                <div className="relative transform -rotate-8 hover:-rotate-4 transition-transform duration-300">
                  <div className="font-script text-3xl sm:text-4xl font-bold text-[#0284c7] leading-[1.05] text-center drop-shadow-xs">
                    Let's<br />
                    Build<br />
                    Together
                  </div>
                  <svg
                    className="w-24 h-4 text-[#0284c7] mx-auto -mt-1"
                    viewBox="0 0 100 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M 5 10 Q 50 16 95 4"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-14 pt-6 border-t border-slate-200/80">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Copyright */}
            <p className="text-xs sm:text-[13px] text-slate-500 font-normal text-center md:text-left">
              © 2026 Fastigo Technology. All rights reserved.
            </p>

            {/* Legal Links & Social Icons */}
            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
              
              {/* Policies */}
              <div className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1 text-xs sm:text-[13px] text-slate-500 text-center">
                <Link
                  to="/privacy-policy"
                  className="hover:text-[#0070AD] transition-colors"
                >
                  Privacy Policy
                </Link>
                <span className="text-slate-300">|</span>
                <Link
                  to="/terms-of-service"
                  className="hover:text-[#0070AD] transition-colors"
                >
                  Terms of Service
                </Link>
                <span className="text-slate-300">|</span>
                <Link
                  to="/cookies"
                  className="hover:text-[#0070AD] transition-colors"
                >
                  Cookies
                </Link>
                <span className="text-slate-300">|</span>
                <Link
                  to="/admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0070AD] transition-colors font-medium text-slate-400"
                >
                  Admin
                </Link>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-2 pl-2">
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-[#0070AD] text-slate-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs group"
                  aria-label="LinkedIn"
                >
                  <span className="font-bold text-[11px] leading-none group-hover:scale-110 transition-transform">in</span>
                </a>

                {/* X / Twitter */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-[#0070AD] text-slate-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs group"
                  aria-label="X (Twitter)"
                >
                  <span className="font-bold text-[11px] leading-none group-hover:scale-110 transition-transform">𝕏</span>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-[#0070AD] text-slate-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs group"
                  aria-label="YouTube"
                >
                  <Youtube className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-[#0070AD] text-slate-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs group"
                  aria-label="GitHub"
                >
                  <Github className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;


