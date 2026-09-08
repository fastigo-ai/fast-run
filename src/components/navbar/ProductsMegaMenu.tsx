import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Users, Mic, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

const productGroups = [
  {
    title: "Products",
    items: [
      {
        id: "fastigox-hrms",
        title: "FastigoX HRMS",
        description: "Next-generation Human Resource Management",
        icon: Users,
        iconColor: "text-blue-500",
        iconBg: "bg-blue-50",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200",
        link: "/products/fastigox-hrms",
        badge: "Popular"
      },
      {
        id: "ai-voice-agent",
        title: "AI Voice Agent",
        description: "Intelligent conversational voice solutions",
        icon: Mic,
        iconColor: "text-purple-500",
        iconBg: "bg-purple-50",
        image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=1200",
        link: "/products/ai-voice-agent"
      },
      {
        id: "omni-sell-agent",
        title: "Omni Sell Agent",
        description: "Unified multi-channel sales automation",
        icon: ShoppingCart,
        iconColor: "text-emerald-500",
        iconBg: "bg-emerald-50",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200",
        link: "/products/omni-sell-agent"
      }
    ]
  }
];

// Helper to get a flat array of items to easily look up by ID
const flatItems = productGroups.flatMap(g => g.items);

interface ProductsMegaMenuProps {
  onClose: () => void;
}

const ProductsMegaMenu = ({ onClose }: ProductsMegaMenuProps) => {
  const [hoveredId, setHoveredId] = useState(flatItems[0].id);
  const activeProduct = flatItems.find(p => p.id === hoveredId) || flatItems[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_20px_45px_-10px_rgba(0,112,173,0.1)] origin-top z-40"
      onMouseLeave={onClose}
    >
      <div className="container mx-auto px-6 py-10">
        
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Side: Complex Multi-Column Grid */}
          <div className="col-span-12 lg:col-span-8 flex flex-col justify-between">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {productGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-sm font-bold tracking-widest text-[#0B192C] uppercase mb-5 px-4 border-b border-slate-100 pb-2">
                    {group.title}
                  </h3>
                  
                  <div className="space-y-1 relative">
                    {group.items.map((product) => {
                      const isActive = hoveredId === product.id;
                      const Icon = product.icon;
                      
                      return (
                        <Link
                          key={product.id}
                          to={product.link}
                          onClick={onClose}
                          onMouseEnter={() => setHoveredId(product.id)}
                          className={`relative flex items-start gap-4 px-4 py-3 rounded-xl transition-all duration-300 z-10 group/item ${
                            isActive ? 'bg-slate-50/90 shadow-sm border border-slate-200/60' : 'hover:bg-slate-50/50'
                          }`}
                        >
                          <div className={`mt-0.5 p-2.5 rounded-xl transition-all duration-300 ${
                            isActive ? `${product.iconBg} shadow-sm scale-110` : 'bg-slate-50 group-hover/item:bg-slate-100'
                          }`}>
                            <Icon className={`w-5 h-5 ${isActive ? product.iconColor : 'text-slate-400 group-hover/item:text-slate-600'}`} strokeWidth={2} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                              <h4 className={`text-[15px] font-display font-semibold transition-colors duration-300 truncate ${
                                isActive ? "text-[#0B192C]" : "text-slate-700"
                              }`}>
                                {product.title}
                              </h4>
                              {product.badge && (
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                  product.badge === 'New' ? 'bg-rose-100 text-rose-600' : 'bg-blue-50 text-[#0070AD] border border-blue-100'
                                }`}>
                                  {product.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[13px] text-slate-500 truncate group-hover/item:text-slate-600 transition-colors">
                              {product.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Featured Dynamic Image */}
          <div className="col-span-12 lg:col-span-4 relative rounded-2xl overflow-hidden bg-slate-100 min-h-[300px] lg:min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={hoveredId}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                src={activeProduct.image}
                alt={activeProduct.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/95 via-[#0B192C]/40 to-transparent pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={hoveredId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none"
              >
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${activeProduct.iconBg} backdrop-blur-md mb-4`}>
                  <activeProduct.icon className={`w-3.5 h-3.5 ${activeProduct.iconColor}`} />
                  <span className={`text-xs font-bold uppercase tracking-wider ${activeProduct.iconColor}`}>
                    Featured
                  </span>
                </div>
                <h3 className="text-2xl font-display font-semibold text-white mb-2 leading-tight">
                  {activeProduct.title}
                </h3>
                <p className="text-white/80 text-sm max-w-sm leading-relaxed">
                  {activeProduct.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default ProductsMegaMenu;
