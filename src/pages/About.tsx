import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Target, Rocket, Search, Cpu, Globe, Zap, MessageSquare, Shield, Lightbulb, Heart, Users, ChevronRight, Building2 } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import { aboutContent } from '@/data/aboutContent';
import fastigoLogo from '@/assets/fastigo-logo.webp';
import { SplitText } from '@/components/SplitText';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 200 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About Fastigo — Our Mission, Team & Vision | Fastigo Technology";
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width - 0.5;
    const yPct = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden">
      <AnimatedBackground />
      <div className="fixed inset-0 grid-pattern pointer-events-none z-0" />

      <div className="relative z-10 w-full flex flex-col min-h-screen">
        
        {/* HERO SECTION: WHO WE ARE */}
        <section className="relative pt-32 pb-20 px-4 min-h-[90vh] flex items-center">
          <div className="container mx-auto max-w-[1200px]">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 lg:pr-12 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-primary"
                >
                  <Building2 className="w-5 h-5" />
                  <span className="font-display font-semibold tracking-wide uppercase text-sm">{aboutContent.hero.subtitle}</span>
                </motion.div>

                <div className="font-display text-4xl md:text-[46px] font-bold mb-8 text-[#0E0A42]">
                  <SplitText text={aboutContent.hero.title} />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6 text-[18px] text-muted-foreground max-w-2xl mx-auto lg:mx-0"
                >
                  <p className="font-semibold text-foreground italic">
                    {aboutContent.hero.description}
                  </p>
                  {aboutContent.hero.narrative.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 w-full flex justify-center [perspective:1200px]"
              >
                <motion.div
                  ref={containerRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                  className="relative w-full max-w-lg aspect-square lg:aspect-[4/3] rounded-3xl glass-card overflow-hidden cursor-crosshair group flex items-center justify-center p-8"
                >
                  <motion.img
                    style={{ translateZ: 20 }}
                    src="/about_hero_innovation_1776147475374.png"
                    alt="Innovation Core"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
                  />
                  <motion.img
                    style={{ translateZ: 100 }}
                    src={fastigoLogo}
                    alt="Fastigo"
                    className="relative w-3/4 drop-shadow-[0_0_30px_rgba(0,163,255,0.5)] z-10"
                  />
                  <div className="absolute inset-0 border border-primary/20 rounded-3xl group-hover:border-primary/50 transition-colors duration-500 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="py-24 bg-card/20 backdrop-blur-sm border-y border-border/50 relative">
          <div className="container mx-auto px-4 max-w-[1200px]">
            <div className="grid md:grid-cols-2 gap-16 lg:gap-32">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -top-12 -left-8 text-8xl font-black text-primary/5 select-none uppercase tracking-tighter">Mission</div>
                <h2 className="font-display text-3xl md:text-[46px] font-bold mb-8 flex items-center gap-4">
                  <Target className="w-10 h-10 text-primary" />
                  {aboutContent.mission.title}
                </h2>
                <p className="text-[20px] font-display font-medium text-foreground mb-6">
                  {aboutContent.mission.tagline}
                </p>
                <p className="text-[16px] text-muted-foreground">
                  {aboutContent.mission.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -top-12 -left-8 text-8xl font-black text-primary/5 select-none uppercase tracking-tighter">Vision</div>
                <h2 className="font-display text-3xl md:text-[46px] font-bold mb-8 flex items-center gap-4">
                  <Globe className="w-10 h-10 text-primary" />
                  {aboutContent.vision.title}
                </h2>
                <p className="text-[18px] text-foreground mb-6">
                  {aboutContent.vision.description}
                </p>
                <p className="text-[16px] text-muted-foreground">
                  {aboutContent.vision.narrative}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section className="py-24 container mx-auto px-4 max-w-[1200px]">
          <div className="text-center mb-20">
            <h2 className="font-display text-3xl md:text-[46px] font-bold mb-6">{aboutContent.whatWeDo.title}</h2>
            <p className="text-[16px] text-muted-foreground max-w-3xl mx-auto">
              {aboutContent.whatWeDo.introduction}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {aboutContent.whatWeDo.capabilities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="glass-card h-full rounded-2xl p-8 border border-border/50 hover:border-primary/50 transition-all duration-500">
                    <div className="mb-8 inline-flex rounded-xl p-4 bg-primary/10">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-bold mb-4">{item.title}</h3>
                    <p className="text-[16px] text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* WHY FASTIGO */}
        <section className="py-24 bg-foreground/5 relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-[1200px]">
            <div className="text-center mb-20">
              <h2 className="font-display text-3xl md:text-[46px] font-bold mb-6">{aboutContent.whyFastigo.title}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {aboutContent.whyFastigo.pillars.map((pillar, idx) => {
                const PillarIcon = pillar.icon;
                return (
                  <div key={idx} className="text-center">
                    <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-primary/20">
                      <PillarIcon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-4">{pillar.title}</h3>
                    <p className="text-[16px] text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="py-24 container mx-auto px-4 max-w-[1200px]">
          <h2 className="font-display text-3xl md:text-[46px] font-bold mb-16 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutContent.values.map((value, idx) => {
              const ValueIcon = value.icon;
              return (
                <div key={idx} className="glass-card p-8 rounded-2xl border-l-4 border-l-primary">
                  <ValueIcon className="w-8 h-8 text-primary mb-6" />
                  <h3 className="text-xl font-display font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* TEAM */}
        <section className="py-24 bg-card/10">
          <div className="container mx-auto px-4 max-w-[1200px]">
            <div className="flex flex-col lg:flex-row gap-20">
              <div className="lg:w-1/3">
                <h2 className="font-display text-3xl md:text-[46px] font-bold mb-6">{aboutContent.team.title}</h2>
                <p className="text-xl text-foreground mb-6 font-medium">{aboutContent.team.description}</p>
                <p className="text-[16px] text-muted-foreground">{aboutContent.team.culture}</p>
              </div>
              <div className="lg:w-2/3 grid md:grid-cols-2 gap-8">
                {aboutContent.team.founders.map((founder, idx) => (
                  <div key={idx} className="glass-card p-10 rounded-2xl">
                    <Users className="w-10 h-10 text-primary mb-6" />
                    <h3 className="text-2xl font-display font-bold mb-1">{founder.name}</h3>
                    <div className="text-primary font-bold text-sm uppercase mb-4">{founder.role}</div>
                    <p className="text-[14px] text-muted-foreground italic border-l-2 border-primary/30 pl-4">"{founder.bio}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DOOR2FY */}
        {/* <section className="py-24 container mx-auto px-4 max-w-[1200px]">
          <div className="rounded-3xl p-1 bg-gradient-to-r from-primary/50 to-cyan-500/50">
            <div className="bg-background rounded-[inherit] p-12 md:p-20 text-foreground">
              <h2 className="text-3xl md:text-[46px] font-display font-bold mb-8">{aboutContent.subBrand.title}</h2>
              <p className="text-[16px] md:text-[18px] text-muted-foreground mb-10">{aboutContent.subBrand.description}</p>
              <button className="flex items-center gap-2 text-primary font-bold">
                EXPLORE DOOR2FY <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section> */}

        {/* CTA */}
        <section className="py-32 relative overflow-hidden bg-[#041021] text-white text-center">
          {/* Subtle glowing orbs in the background */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0070AD]/30 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#00A3E0]/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
          
          <div className="container mx-auto px-4 max-w-[800px] relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-white">{aboutContent.cta.title}</h2>
            <p className="text-xl mb-12 text-slate-300">{aboutContent.cta.description}</p>
            <Link to="/contact" className="inline-flex items-center gap-3 bg-white text-[#0070AD] px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-[0_10px_35px_rgba(0,112,173,0.3)] hover:-translate-y-0.5">
              <MessageSquare className="w-5 h-5 text-[#0070AD]" /> {aboutContent.cta.button}
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
