import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Building2, Layers, Lightbulb, Handshake, LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { getSlug } from '@/data/services';

type CategoryKey = 'Industries' | 'Services' | 'Research & Innovation' | 'Alliances';

const menuCategories: { name: CategoryKey; path: string; icon: LucideIcon }[] = [
  { name: 'Services', path: '/services', icon: Layers },
  { name: 'Industries', path: '/industries', icon: Building2 },
  { name: 'Research & Innovation', path: '/research', icon: Lightbulb },
  { name: 'Alliances', path: '/alliances', icon: Handshake },
];

const categoryItems: Record<CategoryKey, string[][]> = {
  Industries: [
    ['Healthcare & Life Sciences', 'Banking & Financial Services', 'Telecom & Media', 'Manufacturing', 'Retail & E-Commerce'],
    ['Energy & Utilities', 'Government & Public Sector', 'Insurance', 'Travel & Hospitality', 'Education & EdTech'],
  ],
  Services: [
    ['Artificial Intelligence', 'Data & Analytics', 'Cloud Solutions', 'Cognitive Business', 'Cybersecurity'],
    ['Enterprise Solutions', 'IoT & Digital Engineering', 'Network Services', 'Sustainability', 'Interactive Design'],
  ],
  'Research & Innovation': [
    ['AI & ML Lab', 'Blockchain Research', 'Quantum Computing', 'Edge Computing', 'Digital Twin'],
    ['Natural Language Processing', 'Computer Vision', 'Robotic Process Automation', 'Generative AI', '5G & Beyond'],
  ],
  Alliances: [
    ['Microsoft', 'AWS', 'Google Cloud', 'SAP', 'Salesforce'],
    ['Oracle', 'ServiceNow', 'Adobe', 'Pega', 'Cisco'],
  ],
};

const categoryDescriptions: Record<CategoryKey, { title: string; description: string; cta: string; image: string }> = {
  Industries: {
    title: 'Industry Expertise',
    description: "Deep domain knowledge driving transformation with tailored solutions.",
    cta: 'Explore Industries',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
  },
  Services: {
    title: 'Adaptive Enterprise',
    description: "We help businesses become perpetually adaptive, built to evolve continuously.",
    cta: 'View all Services',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
  },
  'Research & Innovation': {
    title: 'Future Tech',
    description: 'Pioneering research in technologies to shape the future of business.',
    cta: 'Discover Innovations',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800'
  },
  Alliances: {
    title: 'Strategic Partners',
    description: 'Partnering with leading tech providers to maximize value for clients.',
    cta: 'See our Partners',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'
  },
};

interface MegaMenuProps {
  onClose: () => void;
}

const MegaMenu = ({ onClose }: MegaMenuProps) => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('Services');

  const activeItems = categoryItems[activeCategory];
  const activeDesc = categoryDescriptions[activeCategory];

  return (
    <motion.div
      initial={{ opacity: 0, y: -15, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-full left-0 right-0 z-40 origin-top bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_20px_45px_-10px_rgba(0,112,173,0.1)]"
      onMouseLeave={onClose}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex flex-col md:flex-row min-h-[420px] w-full">
          
          {/* Left Column - Category Selector */}
          <div className="w-full md:w-[25%] p-6 py-8 flex flex-col justify-between border-r border-slate-100">
            <div>
              <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-6 px-4">
                What We Do
              </h3>
              <div className="space-y-1">
                {menuCategories.map((cat) => {
                  const isActive = activeCategory === cat.name;
                  const Icon = cat.icon;
                  return (
                    <Link
                      key={cat.name}
                      to={cat.path}
                      onClick={onClose}
                      onMouseEnter={() => setActiveCategory(cat.name)}
                      className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 z-10 group ${
                        isActive ? 'bg-slate-50/80 border border-slate-200/60 shadow-sm' : 'hover:bg-slate-50/50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-[#0070AD]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                      <span className={`text-[15px] font-display font-semibold transition-colors ${isActive ? 'text-[#0070ad]' : 'text-slate-600 group-hover:text-slate-900'}`}>
                        {cat.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Middle Column - Links Grid */}
          <div className="w-full md:w-[45%] p-8 py-10">
            <h3 className="text-sm font-bold tracking-widest text-[#0070ad] uppercase mb-8">
              {activeCategory} Directory
            </h3>
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="grid grid-cols-2 gap-x-8 gap-y-2"
            >
              {activeItems.map((column, colIdx) => (
                <ul key={colIdx} className="space-y-1.5">
                  {column.map((item) => (
                    <li key={item}>
                      <Link
                        to={
                          activeCategory === 'Services' ? `/services/${getSlug(item)}` :
                          activeCategory === 'Industries' ? `/industries/${getSlug(item)}` :
                          activeCategory === 'Research & Innovation' ? `/research/${getSlug(item)}` :
                          activeCategory === 'Alliances' ? `/alliances/${getSlug(item)}` :
                          '#'
                        }
                        onClick={onClose}
                        className="block py-2 text-[14px] font-body text-slate-700 hover:text-[#0070AD] transition-colors font-medium hover:translate-x-1 duration-200"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Dynamic Image / Context */}
          <div className="w-full md:w-[30%] relative bg-slate-100 border-l border-slate-100 overflow-hidden group/image">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeCategory}
                initial={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(5px)" }}
                transition={{ duration: 0.4 }}
                src={activeDesc.image}
                alt={activeDesc.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
              />
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#0070ad]/95 via-[#0070ad]/40 to-transparent pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none"
              >
                <h3 className="text-2xl font-display font-semibold text-white mb-2 leading-tight">
                  {activeDesc.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  {activeDesc.description}
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-white group">
                  {activeDesc.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MegaMenu;
