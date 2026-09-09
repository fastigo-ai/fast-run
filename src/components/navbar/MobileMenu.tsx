import { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ArrowRight,
  Mail,
  Globe,
  Sparkles,
  Layers,
  Building2,
  Lightbulb,
  Handshake,
  Users,
  Briefcase,
  BookOpen,
  Boxes,
  X,
  Search,
  CheckCircle2,
  LucideIcon,
} from 'lucide-react';
import { getSlug } from '@/data/services';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavSubItem {
  name: string;
  path: string;
  desc?: string;
  badge?: string;
}

interface NavSection {
  name: string;
  path?: string;
  badge?: string;
  badgeColor?: string;
  icon?: LucideIcon;
  subcategories?: {
    title: string;
    path: string;
    icon: LucideIcon;
    items: string[];
    basePath: string;
  }[];
  submenu?: NavSubItem[];
}

const mobileNavData: NavSection[] = [
  {
    name: 'What we do',
    badge: 'Core Solutions',
    badgeColor: 'bg-blue-50 text-[#0070AD] border-blue-100',
    icon: Sparkles,
    subcategories: [
      {
        title: 'Services',
        path: '/services',
        icon: Layers,
        basePath: '/services',
        items: [
          'Artificial Intelligence',
          'Data & Analytics',
          'Cloud Solutions',
          'Cognitive Business',
          'Cybersecurity',
          'IoT & Digital Engineering',
        ],
      },
      {
        title: 'Industries',
        path: '/industries',
        icon: Building2,
        basePath: '/industries',
        items: [
          'Healthcare & Life Sciences',
          'Banking & Financial Services',
          'Telecom & Media',
          'Manufacturing',
          'Retail & E-Commerce',
        ],
      },
      {
        title: 'Research & Innovation',
        path: '/research',
        icon: Lightbulb,
        basePath: '/research',
        items: ['AI & ML Lab', 'Quantum Computing', 'Generative AI', 'Edge Computing'],
      },
      {
        title: 'Alliances',
        path: '/alliances',
        icon: Handshake,
        basePath: '/alliances',
        items: ['Microsoft', 'AWS', 'Google Cloud', 'SAP', 'Salesforce'],
      },
    ],
  },
  {
    name: 'Products',
    path: '/products',
    badge: 'AI Suite',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    icon: Boxes,
    submenu: [
      {
        name: 'FastigoX HRMS',
        path: '/products/fastigox-hrms',
        desc: 'Next-generation Human Resource Management platform',
        badge: 'Popular',
      },
      {
        name: 'AI Voice Agent',
        path: '/products/ai-voice-agent',
        desc: 'Intelligent conversational voice solutions for enterprise',
        badge: 'AI',
      },
      {
        name: 'Omni Sell Agent',
        path: '/products/omni-sell-agent',
        desc: 'Unified multi-channel sales and lead automation',
        badge: 'Automation',
      },
      {
        name: 'Explore All Products',
        path: '/products',
        desc: 'View full suite of Fastigo AI and cloud systems',
      },
    ],
  },
  {
    name: 'Who we are',
    path: '/about',
    icon: Users,
  },
  {
    name: 'Portfolio',
    path: '/portfolio',
    icon: Briefcase,
  },
  {
    name: 'Latest Insights',
    path: '/blog',
    icon: BookOpen,
  },
  {
    name: 'Leadership & Investors',
    path: '/leadership',
    icon: CheckCircle2,
  },
  {
    name: 'Careers',
    path: '/careers',
    badge: 'Hiring',
    badgeColor: 'bg-rose-50 text-rose-600 border-rose-100',
    icon: Briefcase,
  },
];

// Search index for quick lookup
const searchableItems = [
  { name: 'Services Overview', path: '/services', category: 'Services' },
  { name: 'Artificial Intelligence', path: `/services/${getSlug('Artificial Intelligence')}`, category: 'Services' },
  { name: 'Data & Analytics', path: `/services/${getSlug('Data & Analytics')}`, category: 'Services' },
  { name: 'Cloud Solutions', path: `/services/${getSlug('Cloud Solutions')}`, category: 'Services' },
  { name: 'Cybersecurity', path: `/services/${getSlug('Cybersecurity')}`, category: 'Services' },
  { name: 'IoT & Digital Engineering', path: `/services/${getSlug('IoT & Digital Engineering')}`, category: 'Services' },
  { name: 'Industries Overview', path: '/industries', category: 'Industries' },
  { name: 'Healthcare & Life Sciences', path: `/industries/${getSlug('Healthcare & Life Sciences')}`, category: 'Industries' },
  { name: 'Banking & Financial Services', path: `/industries/${getSlug('Banking & Financial Services')}`, category: 'Industries' },
  { name: 'Manufacturing', path: `/industries/${getSlug('Manufacturing')}`, category: 'Industries' },
  { name: 'Research & Innovation', path: '/research', category: 'Research' },
  { name: 'AI & ML Lab', path: `/research/${getSlug('AI & ML Lab')}`, category: 'Research' },
  { name: 'Quantum Computing', path: `/research/${getSlug('Quantum Computing')}`, category: 'Research' },
  { name: 'Strategic Alliances', path: '/alliances', category: 'Alliances' },
  { name: 'FastigoX HRMS', path: '/products/fastigox-hrms', category: 'Product' },
  { name: 'AI Voice Agent', path: '/products/ai-voice-agent', category: 'Product' },
  { name: 'Omni Sell Agent', path: '/products/omni-sell-agent', category: 'Product' },
  { name: 'All Products', path: '/products', category: 'Products' },
  { name: 'About Fastigo', path: '/about', category: 'Company' },
  { name: 'Client Case Studies & Portfolio', path: '/portfolio', category: 'Portfolio' },
  { name: 'Blog & Articles', path: '/blog', category: 'Insights' },
  { name: 'Leadership & Board', path: '/leadership', category: 'Company' },
  { name: 'Careers & Openings', path: '/careers', category: 'Careers' },
  { name: 'Contact Sales & Support', path: '/contact', category: 'Contact' },
];

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState<string | null>('What we do');
  const [expandedSubcategory, setExpandedSubcategory] = useState<string | null>('Services');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter search results
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return searchableItems.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleLinkClick = () => {
    setSearchQuery('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden fixed top-[62px] sm:top-[76px] inset-x-0 bottom-0 z-[999] bg-white flex flex-col justify-between overflow-hidden shadow-2xl h-[calc(100dvh-62px)] sm:h-[calc(100dvh-76px)]"
        >
          {/* Scrollable Content Container */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-3 bg-[#F8FAFC]">
            {/* Real-Time Interactive Search Bar */}
            <div className="relative">
              <div className="flex items-center bg-white rounded-2xl px-3.5 py-3 border border-slate-200 shadow-sm focus-within:border-[#0070AD] focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <Search className="w-4 h-4 text-[#0070AD] mr-2.5 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search solutions, products, services..."
                  className="bg-transparent text-[14px] w-full outline-none text-[#0E0A42] placeholder:text-slate-400 font-body"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Instant Search Results Dropdown */}
              {searchQuery.trim().length > 0 && (
                <div className="mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 max-h-64 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="space-y-1">
                      {searchResults.map((res) => (
                        <Link
                          key={res.path}
                          to={res.path}
                          onClick={handleLinkClick}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50 transition-colors group"
                        >
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-[#0E0A42] group-hover:text-[#0070AD]">
                              {res.name}
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium">
                              {res.category}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0070AD] group-hover:translate-x-1 transition-all" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm text-slate-500">
                      No results found for "{searchQuery}".
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Navigation Sections */}
            {searchQuery.trim().length === 0 && (
              <div className="space-y-2">
                {mobileNavData.map((section) => {
                  const Icon = section.icon;
                  const isCurrentPath = section.path && location.pathname === section.path;

                  // Complex Accordion (What we do with nested subcategories)
                  if (section.subcategories) {
                    const isExpanded = expandedSection === section.name;

                    return (
                      <div
                        key={section.name}
                        className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm"
                      >
                        <button
                          onClick={() =>
                            setExpandedSection(isExpanded ? null : section.name)
                          }
                          className="flex items-center justify-between w-full p-3.5 text-left transition-colors hover:bg-slate-50"
                          aria-expanded={isExpanded}
                        >
                          <div className="flex items-center gap-3">
                            {Icon && (
                              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#0070AD] shrink-0 border border-blue-100">
                                <Icon className="w-4 h-4" />
                              </div>
                            )}
                            <div>
                              <span className="text-[15px] font-display font-semibold text-[#0E0A42]">
                                {section.name}
                              </span>
                              {section.badge && (
                                <span
                                  className={`ml-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${section.badgeColor}`}
                                >
                                  {section.badge}
                                </span>
                              )}
                            </div>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                              isExpanded ? 'rotate-180 text-[#0070AD]' : ''
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="px-3 pb-3 pt-1 space-y-2 border-t border-slate-100 bg-slate-50/40"
                            >
                              {section.subcategories.map((subcat) => {
                                const isSubExpanded = expandedSubcategory === subcat.title;
                                const SubIcon = subcat.icon;

                                return (
                                  <div
                                    key={subcat.title}
                                    className="bg-white rounded-xl border border-slate-200/60 overflow-hidden"
                                  >
                                    <div className="flex items-center justify-between p-2.5">
                                      <Link
                                        to={subcat.path}
                                        onClick={handleLinkClick}
                                        className="flex items-center gap-2 text-[14px] font-semibold text-slate-800 hover:text-[#0070AD] transition-colors"
                                      >
                                        <SubIcon className="w-4 h-4 text-[#0070AD]" />
                                        <span>{subcat.title}</span>
                                      </Link>
                                      <button
                                        onClick={() =>
                                          setExpandedSubcategory(
                                            isSubExpanded ? null : subcat.title
                                          )
                                        }
                                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                                        aria-label={`Toggle ${subcat.title}`}
                                      >
                                        <ChevronDown
                                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                            isSubExpanded ? 'rotate-180 text-[#0070AD]' : ''
                                          }`}
                                        />
                                      </button>
                                    </div>

                                    <AnimatePresence>
                                      {isSubExpanded && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: 'auto' }}
                                          exit={{ opacity: 0, height: 0 }}
                                          transition={{ duration: 0.2 }}
                                          className="px-3 pb-2.5 pt-1 border-t border-slate-100 bg-slate-50/60"
                                        >
                                          <div className="grid grid-cols-1 gap-1">
                                            {subcat.items.map((item) => (
                                              <Link
                                                key={item}
                                                to={`${subcat.basePath}/${getSlug(item)}`}
                                                onClick={handleLinkClick}
                                                className="py-1.5 px-2 text-xs font-medium text-slate-600 hover:text-[#0070AD] hover:bg-blue-50/50 rounded-lg transition-colors flex items-center justify-between group"
                                              >
                                                <span>{item}</span>
                                                <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-[#0070AD] group-hover:translate-x-0.5 transition-transform" />
                                              </Link>
                                            ))}
                                            <Link
                                              to={subcat.path}
                                              onClick={handleLinkClick}
                                              className="mt-1 py-1.5 px-2 text-xs font-semibold text-[#0070AD] hover:underline flex items-center gap-1"
                                            >
                                              <span>View all {subcat.title}</span>
                                              <ArrowRight className="w-3 h-3" />
                                            </Link>
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  // Submenu Accordion (Products)
                  if (section.submenu) {
                    const isExpanded = expandedSection === section.name;

                    return (
                      <div
                        key={section.name}
                        className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm"
                      >
                        <button
                          onClick={() =>
                            setExpandedSection(isExpanded ? null : section.name)
                          }
                          className="flex items-center justify-between w-full p-3.5 text-left transition-colors hover:bg-slate-50"
                          aria-expanded={isExpanded}
                        >
                          <div className="flex items-center gap-3">
                            {Icon && (
                              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100">
                                <Icon className="w-4 h-4" />
                              </div>
                            )}
                            <div>
                              <span className="text-[15px] font-display font-semibold text-[#0E0A42]">
                                {section.name}
                              </span>
                              {section.badge && (
                                <span
                                  className={`ml-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${section.badgeColor}`}
                                >
                                  {section.badge}
                                </span>
                              )}
                            </div>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                              isExpanded ? 'rotate-180 text-[#0070AD]' : ''
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="px-3 pb-3 pt-1 space-y-1.5 border-t border-slate-100 bg-slate-50"
                            >
                              {section.submenu.map((sub) => (
                                <Link
                                  key={sub.name}
                                  to={sub.path}
                                  onClick={handleLinkClick}
                                  className="group flex flex-col p-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#0070AD]/60 hover:bg-blue-50/50 transition-all shadow-xs"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <span className="text-[14px] font-display font-semibold text-[#0E0A42] group-hover:text-[#0070AD] transition-colors">
                                        {sub.name}
                                      </span>
                                      {sub.badge && (
                                        <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded-full bg-blue-50 text-[#0070AD] border border-blue-100">
                                          {sub.badge}
                                        </span>
                                      )}
                                    </div>
                                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0070AD] group-hover:translate-x-1 transition-all" />
                                  </div>
                                  {sub.desc && (
                                    <span className="text-xs text-slate-500 mt-1 line-clamp-1">
                                      {sub.desc}
                                    </span>
                                  )}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  // Single direct Link
                  return (
                    <Link
                      key={section.name}
                      to={section.path!}
                      onClick={handleLinkClick}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                        isCurrentPath
                          ? 'bg-blue-50 border-[#0070AD]/60 text-[#0070AD] font-bold shadow-sm'
                          : 'bg-white border-slate-200 text-[#0E0A42] font-semibold hover:bg-slate-50 hover:text-[#0070AD] shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {Icon && (
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                              isCurrentPath
                                ? 'bg-[#0070AD] text-white border-[#0070AD]'
                                : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                        )}
                        <span className="text-[15px] font-display font-semibold">{section.name}</span>
                        {section.badge && (
                          <span
                            className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${section.badgeColor}`}
                          >
                            {section.badge}
                          </span>
                        )}
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform ${
                          isCurrentPath ? 'text-[#0070AD]' : 'text-slate-400'
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Persistent Mobile Bottom Action Bar */}
          <div className="p-4 bg-white border-t border-slate-200 space-y-3 shrink-0 shadow-lg">
            <Link
              to="/contact"
              onClick={handleLinkClick}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-[#0070AD] hover:bg-[#005a8c] active:scale-[0.99] text-white text-sm font-semibold tracking-wide shadow-md shadow-blue-600/20 transition-all"
            >
              <span>Get in Touch / Contact</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5 px-1">
              <a
                href="mailto:Info@fastigo.co"
                className="flex items-center gap-1.5 text-slate-600 hover:text-[#0070AD] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#0070AD]" />
                <span>Info@fastigo.co</span>
              </a>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold">Global (EN)</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
