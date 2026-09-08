import { motion } from 'framer-motion';
import { ExternalLink, Bot, CreditCard, Truck, Phone, Shield, Smartphone, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import FixedHeroVideo from '@/components/FixedHeroVideo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SplitText } from '@/components/SplitText';
import { caseStudiesByCategory } from '@/data/portfolio';

const Portfolio = () => {
  // Set SEO Metadata
  useEffect(() => {
    document.title = "Fastigo Portfolio — AI, Automation & Software Case Studies | Fastigo Technology";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Explore Fastigo Technology's portfolio of AI automation, custom software, and digital transformation projects across e-commerce, banking, healthcare, manufacturing & more.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Explore Fastigo Technology's portfolio of AI automation, custom software, and digital transformation projects across e-commerce, banking, healthcare, manufacturing & more.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <AnimatedBackground />
      <FixedHeroVideo />
      <div className="fixed inset-0 grid-pattern pointer-events-none z-0" />
      
      <div className="relative z-10">
        <main className="pt-32 pb-20">
          {/* Hero Section */}
          <section className="container mx-auto px-4 mb-20 max-w-[1200px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center  mx-auto"
            >
              <span className="mb-4 inline-block font-display text-sm tracking-widest text-primary uppercase">
                OUR PORTFOLIO
              </span>
              <div className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-6xl flex flex-col items-center">
                <SplitText text="Success Stories &" className="text-foreground" />
                <SplitText text="Case Studies" className="text-gradient-primary" />
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore our portfolio of transformative projects across industries, showcasing our expertise in AI automation, 
                system integrations, cloud solutions, and custom digital transformation delivered by Fastigo Technology 
                for businesses across India and beyond.
              </p>
              <div className="cyber-line mx-auto max-w-md mt-8" />
            </motion.div>
          </section>

          {/* Projects Grid by Industry */}
          <section className="container mx-auto px-4 max-w-[1200px]">
            {Object.entries(caseStudiesByCategory).map(([industry, projects], sectionIdx) => (
              <div key={industry} className="mb-24 last:mb-0">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-6 mb-10"
                >
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground whitespace-nowrap">
                    {industry} <span className="text-primary text-xl md:text-2xl font-medium tracking-widest uppercase ml-2">Solutions</span>
                  </h2>
                  <div className="h-[1px] flex-grow bg-gradient-to-r from-primary/50 to-transparent" />
                </motion.div>
                
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="interactive group"
                    >
                      <div className="glass-card h-full rounded-xl overflow-hidden transition-all duration-500 hover:glow-box hover:border-primary/50 flex flex-col">
                        {/* Project Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                          <div className="absolute top-4 right-4">
                            <span className="text-[10px] font-display tracking-wider text-primary bg-primary/10 border border-primary/20 backdrop-blur-md px-3 py-1 rounded-full">
                              {project.sector}
                            </span>
                          </div>
                        </div>

                        {/* Project Header */}
                        <div className="p-6 border-b border-border/50">
                          <span className="text-xs font-display tracking-wider text-muted-foreground uppercase">
                            {project.category}
                          </span>
                          <h3 className="mt-2 font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                        </div>

                        {/* Project Content */}
                        <div className="p-6 flex-grow flex flex-col justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                              {project.description}
                            </p>
                          </div>
                          
                          <Link 
                            to={`/portfolio/${project.id}`}
                            className="inline-flex items-center gap-2 text-sm text-primary font-display font-bold tracking-wider group/link"
                          >
                            VIEW CASE STUDY
                            <ArrowRight className="h-4 w-4 transform transition-transform group-hover/link:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* CTA Section */}
          <section className="container mx-auto px-4 mt-24 max-w-[1200px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card rounded-2xl p-8 md:p-12 text-center glow-box"
            >
              <h2 className="mb-4 font-display text-2xl md:text-3xl font-bold text-foreground">
                Ready to Build Your Success Story?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Let's discuss how we can help transform your business with our technology solutions.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-display text-sm tracking-wider text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/30"
              >
                START YOUR PROJECT
              </Link>
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Portfolio;
