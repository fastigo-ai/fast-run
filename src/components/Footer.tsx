import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from "react-router-dom";
import fastigoLogo from '@/assets/fastigo-logo.webp';

const Footer = () => {
  return (
    <footer className="relative border-t border-slate-200/80 bg-white/80 backdrop-blur-2xl py-16 px-4 overflow-hidden">

      {/* Background Glow Orbs */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0070AD]/5 rounded-full blur-[150px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00A3E0]/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container relative z-10 mx-auto max-w-[1200px]">
        <div className="grid gap-12 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <img
                src={fastigoLogo}
                alt="Fastigo Technology"
                className="h-20 sm:h-24 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-body">
              Pioneering the future of technology with innovative AI solutions and digital transformation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-display text-sm font-bold tracking-wider text-[#0B192C]">
              SERVICES
            </h4>
            <ul className="space-y-3">
              {[
                { name: "AI & Data Analytics", path: "/services/artificial-intelligence-and-data-analytics" },
                { name: "Cloud Services", path: "/services/cloud" },
                { name: "Cybersecurity", path: "/services/cybersecurity" },
                { name: "Enterprise Solutions", path: "/services/enterprise-solutions" },
                { name: "Digital Engineering", path: "/services/iot-and-digital-engineering" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="interactive text-sm text-slate-600 hover:text-[#0070AD] transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 font-display text-sm font-bold tracking-wider text-[#0B192C]">
              COMPANY
            </h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", path: "/about" },
                { name: "Careers", path: "/careers" },
                { name: "Blog", path: "/blog" },
                { name: "Leadership", path: "/leadership" },
                { name: "Portfolio", path: "/portfolio" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="interactive text-sm text-slate-600 hover:text-[#0070AD] transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-display text-sm font-bold tracking-wider text-[#0B192C]">
              CONTACT
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <Mail className="h-4 w-4 text-[#0070AD] shrink-0" />
                Info@fastigo.co
              </li>

              <li className="flex items-center gap-3 text-sm text-slate-600">
                <Phone className="h-4 w-4 text-[#0070AD] shrink-0" />
                +91 9217477169
              </li>

              <li className="flex items-start gap-3 text-sm text-slate-600">
                <MapPin className="h-4 w-4 text-[#0070AD] mt-0.5 shrink-0" />
                G-81 & G-82, Old No G-23-A PVT Office NO-201 Second Floor Laxmi
Nagar, New Delhi, New Delhi, New Delhi, Delhi, India, 110092
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-200/80">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 font-body">
              © 2026 Fastigo Technology. All rights reserved.
            </p>

            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookies"].map((item) => (
                <Link
                  key={item}
                  to="#"
                  className="interactive text-sm text-slate-500 hover:text-[#0070AD] transition-colors duration-200"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

