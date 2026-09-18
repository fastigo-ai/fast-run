import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { caseStudiesByCategory } from '@/data/portfolio';

export const Portfolio = () => {
  // Set SEO Metadata
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Fastigo Portfolio — AI, Automation & Software Case Studies | Fastigo Technology";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Explore Fastigo Technology's portfolio of AI automation, custom software, and digital transformation projects across e-commerce, banking, healthcare, manufacturing & more."
      );
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content =
        "Explore Fastigo Technology's portfolio of AI automation, custom software, and digital transformation projects across e-commerce, banking, healthcare, manufacturing & more.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-white text-slate-900 overflow-x-hidden font-body selection:bg-[#0070ad] selection:text-white pt-20">
      {/* Ambient Neural Light Mesh Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-1/4 w-[750px] h-[750px] bg-gradient-to-br from-[#0070AD]/8 to-sky-200/20 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-gradient-to-bl from-[#00A3E0]/8 to-blue-100/30 rounded-full blur-[130px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0070ad08_1px,transparent_1px),linear-gradient(to_bottom,#0070ad08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10">
        {/* Breadcrumb Bar */}
        <div className="border-b border-slate-200/80 bg-white/85 backdrop-blur-md py-3.5 px-4 sm:px-6">
          <div className="container mx-auto max-w-[1240px] flex items-center justify-between text-xs sm:text-sm">
            <nav className="flex items-center gap-2 text-slate-500 font-medium">
              <Link to="/" className="hover:text-[#0070AD] transition-colors">
                Home
              </Link>
              <span className="text-slate-300">/</span>
              <span className="text-[#0B192C] font-semibold">Portfolio</span>
            </nav>
            <div className="hidden md:flex items-center gap-2 text-xs text-[#0070AD] font-mono px-3 py-1 rounded-full bg-sky-50 border border-sky-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Verified Enterprise Case Studies</span>
            </div>
          </div>
        </div>

        <main className="pt-12 sm:pt-16 pb-24">
          {/* Hero Section */}
          <section className="container mx-auto px-4 mb-20 max-w-[1240px]">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#0E0A42] tracking-tight leading-[1.12] mb-6">
                Success Stories &amp; Case Studies
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-base sm:text-lg text-slate-600 leading-relaxed font-body max-w-3xl mx-auto mb-8"
              >
                Explore our portfolio of transformative projects across industries, showcasing our expertise in AI automation, 
                system integrations, cloud solutions, and custom digital transformation delivered by Fastigo Technology 
                for businesses across India and beyond.
              </motion.p>

              {/* Verification Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-slate-200/80 text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-medium hover:text-[#0070AD] transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-[#0070AD]" /> Production Tested
                </span>
                <span className="flex items-center gap-1.5 font-medium hover:text-emerald-600 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Measurable ROI
                </span>
                <span className="flex items-center gap-1.5 font-medium hover:text-[#00A3E0] transition-colors">
                  <Sparkles className="w-4 h-4 text-[#00A3E0]" /> Enterprise Grade
                </span>
              </div>
            </motion.div>
          </section>

          {/* Projects Grid by Industry */}
          <section className="container mx-auto px-4 max-w-[1240px]">
            {Object.entries(caseStudiesByCategory).map(([industry, projects]) => (
              <div key={industry} className="mb-20 sm:mb-24 last:mb-0">
                {/* Industry Section Header */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-4 sm:gap-6 mb-10"
                >
                  <div className="flex items-baseline gap-2">
                    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#0E0A42]">
                      {industry}
                    </h2>
                    <span className="text-[#0070AD] text-sm sm:text-lg font-bold tracking-widest uppercase">
                      Solutions
                    </span>
                  </div>
                  <div className="h-[1.5px] flex-grow bg-gradient-to-r from-[#0070AD]/40 via-sky-200 to-transparent" />
                </motion.div>
                
                {/* 3-Column Responsive Cards Grid */}
                <div className="grid gap-7 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      whileHover={{ y: -8 }}
                      className="group h-full"
                    >
                      <div className="h-full rounded-[26px] overflow-hidden bg-white border border-slate-200/90 shadow-[0_4px_24px_rgba(0,112,173,0.05)] hover:shadow-[0_20px_45px_rgba(0,112,173,0.14)] hover:border-[#0070AD]/50 transition-all duration-500 flex flex-col justify-between">
                        {/* Top: Image Thumbnail + Sector Badge */}
                        <div className="relative h-52 overflow-hidden bg-slate-100">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                          <div className="absolute top-4 right-4 z-10">
                            <span className="text-[11px] font-semibold text-[#0070AD] bg-white/95 border border-sky-100 backdrop-blur-md px-3 py-1 rounded-full shadow-xs">
                              {project.sector}
                            </span>
                          </div>
                        </div>

                        {/* Middle: Title & Category */}
                        <div className="p-6 sm:p-7 flex-grow flex flex-col justify-between">
                          <div>
                            <span className="text-xs font-mono uppercase tracking-wider text-[#0070AD] font-semibold block mb-2">
                              {project.category}
                            </span>
                            <h3 className="font-display text-xl sm:text-[22px] font-bold text-[#0B192C] group-hover:text-[#0070AD] transition-colors leading-snug mb-3 line-clamp-2">
                              {project.title}
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed font-body mb-6 line-clamp-3">
                              {project.description}
                            </p>
                          </div>
                          
                          {/* Bottom Action Link */}
                          <div className="pt-4 border-t border-slate-100">
                            <Link 
                              to={`/portfolio/${project.id}`}
                              className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#0070AD] hover:bg-[#005a8c] text-white text-xs sm:text-sm font-display font-bold tracking-wider uppercase group/link transition-all shadow-xs hover:shadow-md"
                            >
                              <span>VIEW CASE STUDY</span>
                              <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover/link:translate-x-1" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* CTA Section */}
          <section className="container mx-auto px-4 mt-20 sm:mt-28 max-w-[1240px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative rounded-[32px] p-8 sm:p-14 text-center overflow-hidden bg-gradient-to-b from-white via-sky-50/40 to-blue-50/30 border border-slate-200/90 shadow-[0_12px_40px_rgba(0,112,173,0.08)]"
            >
              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="text-xs font-mono uppercase tracking-wider text-[#0070AD] font-semibold block mb-3">
                  NEXT STEPS
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#0E0A42] mb-4 tracking-tight">
                  Ready to Build Your Success Story?
                </h2>
                <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
                  Let's discuss how we can help transform your business with our technology solutions.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#0070AD] hover:bg-[#005a8c] px-8 py-4 font-bold text-sm sm:text-base text-white transition-all shadow-[0_8px_25px_rgba(0,112,173,0.3)] hover:shadow-[0_12px_32px_rgba(0,112,173,0.4)] group"
                >
                  <span>START YOUR PROJECT</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Portfolio;
