import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import image1 from '../assets/banner-2.jpeg';
import image2 from '../assets/banner-3.jpeg';
import image3 from '../assets/banner-1.jpeg';

const insights = [
  {
    title: 'Pragmatic by Design: Engineering AI For the Real World',
    description: 'Discover how AI is transforming product engineering with insights on scaling, trust, and innovation from industry leaders in this MITTR-Fastigo report.',
    type: 'eBook',
    image: image1,
    slug: 'pragmatic-by-design-engineering-ai-real-world',
    accent: '#0070AD',
    glowColor: 'rgba(0, 112, 173, 0.22)'
  },
  {
    title: 'Navigating the Agentic AI Revolution - A Point of View',
    description: 'Dive into our exclusive Point of View on how Agentic AI is transforming industries with its ability to make autonomous, intelligent decisions in real time.',
    type: 'Point of View',
    image: image2,
    slug: 'navigating-agentic-ai-revolution',
    accent: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.22)'
  },
  {
    title: 'How AI is Driving the Next Era of Mobility',
    description: 'The mobility industry experts at Fastigo engaged in an extensive analysis of these trends, across three domains – Product Development Life Cycle, Software Development Life Cycle and User Experience.',
    type: 'Whitepaper',
    image: image3,
    slug: 'how-ai-driving-next-era-mobility',
    accent: '#00A3E0',
    glowColor: 'rgba(0, 163, 224, 0.22)'
  }
];

const InsightsSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-[1240px] relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14 border-b border-slate-200/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-[#0070AD] text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#0070AD]" />
              Thought Leadership
            </div>
            <h2 className="text-3xl md:text-[46px] font-display font-bold text-[#0B192C] tracking-tight leading-tight">
              Our Latest Insights
            </h2>
          </div>

          <Link 
            to="/blog" 
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#0070AD] hover:text-[#005a8c] transition-colors group mb-1"
          >
            <span>View All Insights</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Modern 3D Style Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8 lg:gap-8">
          {insights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, scale: 1.025 }}
              className="group relative flex flex-col rounded-[26px] bg-slate-50/70 p-2.5 sm:p-3 border border-slate-200/90 transition-all duration-500 cursor-pointer shadow-[0_10px_30px_-10px_rgba(0,112,173,0.08)] hover:border-[#0070AD]/40"
              style={{
                transition: "box-shadow 0.4s ease, border-color 0.4s ease, transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
            >
              {/* Dynamic Ambient Hover Glow Aura */}
              <div
                className="pointer-events-none absolute -inset-0.5 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-xl -z-10"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${item.glowColor}, transparent 70%)`,
                }}
              />

              {/* Top Image Container with large rounded corners */}
              <div className="relative w-full h-[260px] sm:h-[280px] lg:h-[300px] rounded-[20px] overflow-hidden bg-slate-900 shadow-inner">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Ambient Top & Bottom Lighting Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-black/10 pointer-events-none" />

                {/* Specular Light Shimmer Reflection */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Badge */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md bg-white/90 text-slate-800 border border-white/60 shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: item.accent }}
                    />
                    {item.type}
                  </span>
                </div>
              </div>

              {/* Nested / Docked White Content Box (Overlapping Bottom) */}
              <div className="relative -mt-16 sm:-mt-20 mx-1.5 sm:mx-2 z-20 rounded-[20px] bg-white p-6 sm:p-7 shadow-[0_12px_32px_rgba(0,0,0,0.06)] border border-slate-100/90 transition-all duration-300 group-hover:shadow-[0_18px_40px_rgba(0,112,173,0.12)] group-hover:border-slate-200/90 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-[#0B192C] tracking-tight transition-colors duration-300 group-hover:text-[#0070AD] leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-[14px] leading-relaxed text-slate-600 font-body line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Action Link */}
                <div className="mt-6 pt-2">
                  <Link
                    to={`/blog/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B192C] group/link hover:text-[#0070AD] transition-colors duration-200"
                  >
                    <span className="underline underline-offset-4 decoration-slate-300 group-hover/link:decoration-[#0070AD] transition-all">
                      Know More
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#0070AD]" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Mobile View All Button */}
        <div className="mt-10 text-center sm:hidden">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-50 text-sm font-semibold text-[#0070AD] border border-blue-100 hover:bg-[#0070AD] hover:text-white transition-all duration-300"
          >
            <span>View All Insights</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
