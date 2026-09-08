import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Mail, Phone, Globe, Sparkles } from 'lucide-react';
import { useState } from 'react';

const mobileNavSections = [
  {
    name: 'What we do',
    badge: 'Core Solutions',
    submenu: [
      { name: 'Services', path: '/services', desc: 'AI, Cloud, Cybersecurity & Digital Engineering' },
      { name: 'Industries', path: '/industries', desc: 'Healthcare, Banking, Automotive & Manufacturing' },
      { name: 'Research & Innovation', path: '/research', desc: 'Emerging tech, ML Labs & Quantum' },
      { name: 'Alliances', path: '/alliances', desc: 'Global ecosystem & technology partners' },
    ],
  },
  {
    name: 'Products',
    path: '/products',
    badge: 'AI Suite',
    submenu: [
      { name: 'Fastigo Cloud Infrastructure', path: '/products/cloud-infrastructure', desc: 'Enterprise compute' },
      { name: 'AI Vector Database', path: '/products/ai-vector-database', desc: 'Semantic search & embeddings' },
      { name: 'Edge AI Security', path: '/products/edge-ai-security', desc: 'Distributed edge intelligence' },
      { name: 'All Products', path: '/products', desc: 'Explore all enterprise platforms' },
    ],
  },
  { name: 'Who we are', path: '/about' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Latest Insights', path: '/blog' },
  { name: 'Leadership & Investors', path: '/leadership' },
  { name: 'Careers', path: '/careers' },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [expandedItem, setExpandedItem] = useState<string | null>('What we do');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'calc(100vh - 68px)' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden fixed top-[68px] sm:top-[76px] left-0 right-0 bottom-0 z-50 bg-white/98 backdrop-blur-2xl border-t border-slate-200/90 overflow-y-auto flex flex-col justify-between shadow-2xl"
        >
          {/* Menu Items Container */}
          <div className="px-5 py-6 space-y-2">
            
            {/* Infosys-Style Search Bar on Top of Mobile Menu */}
            <div className="mb-6">
              <div className="flex items-center bg-slate-100/90 rounded-xl px-3.5 py-2.5 border border-slate-200/80">
                <Sparkles className="w-4 h-4 text-[#0070AD] mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search solutions, services..."
                  className="bg-transparent text-sm w-full outline-none text-[#0B192C] placeholder:text-slate-400 font-body"
                />
              </div>
            </div>

            {/* Navigation List */}
            <ul className="space-y-1.5">
              {mobileNavSections.map((item) => (
                <li key={item.name} className="border-b border-slate-100 last:border-0 pb-1.5">
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() =>
                          setExpandedItem(expandedItem === item.name ? null : item.name)
                        }
                        className="flex items-center justify-between w-full py-3 px-2 text-[16px] font-display font-semibold text-[#0B192C] hover:text-[#0070AD] transition-colors"
                        aria-expanded={expandedItem === item.name}
                      >
                        <div className="flex items-center gap-2">
                          <span>{item.name}</span>
                          {item.badge && (
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-[#0070AD] border border-blue-100">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${
                            expandedItem === item.name ? 'rotate-180 text-[#0070AD]' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedItem === item.name && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="pl-2 space-y-1 overflow-hidden pb-2"
                          >
                            {item.submenu.map((sub) => (
                              <li key={sub.name}>
                                <Link
                                  to={sub.path}
                                  onClick={onClose}
                                  className="group flex flex-col py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-colors"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-[14px] font-display font-semibold text-slate-800 group-hover:text-[#0070AD] transition-colors">
                                      {sub.name}
                                    </span>
                                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#0070AD] group-hover:translate-x-1 transition-all" />
                                  </div>
                                  {sub.desc && (
                                    <span className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                                      {sub.desc}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.path!}
                      onClick={onClose}
                      className="block py-3 px-2 text-[16px] font-display font-semibold text-[#0B192C] hover:text-[#0070AD] transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Footer CTAs (Infosys Enterprise Style) */}
          <div className="p-5 bg-slate-50/90 border-t border-slate-200/80 space-y-3 shrink-0">
            <Link
              to="/contact"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-[#0070AD] hover:bg-[#005a8c] text-white text-sm font-semibold tracking-wide shadow-md shadow-blue-600/20 transition-all"
            >
              <span>Contact Fastigo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <a href="mailto:Info@fastigo.co" className="flex items-center gap-1.5 hover:text-[#0070AD] transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#0070AD]" />
                Info@fastigo.co
              </a>
              <div className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-slate-700">Global (EN)</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
