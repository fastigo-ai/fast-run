import { motion } from 'framer-motion';
import { Shield, Bot, BrainCircuit, Database, Smartphone, Lock, Link } from 'lucide-react';

const technologies = [
  { icon: Shield, label: 'Cybersecurity' },
  { icon: Bot, label: 'AI Agents' },
  { icon: BrainCircuit, label: 'Machine Learning' },
  { icon: Link, label: 'Block Chain' },
  { icon: Database, label: 'Cloud Infrastructure' },
  { icon: Smartphone, label: 'Mobile Apps' },
  { icon: Lock, label: 'Data Protection' },
];

const TechSlider = () => {
  return (
    <section className="relative py-16 overflow-hidden border-y border-slate-200/80 bg-white/40">
      <div className="container mx-auto px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-display text-sm font-bold tracking-widest text-[#0070AD]">
            WHAT WE WORK ON
          </span>
        </motion.div>
      </div>

      {/* Infinite scrolling slider */}
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 20,
              ease: 'linear',
            },
          }}
          className="flex gap-12"
        >
          {/* Duplicate items for seamless loop */}
          {[...technologies, ...technologies, ...technologies].map((tech, index) => (
            <div
              key={`${tech.label}-${index}`}
              className="flex items-center gap-3 shrink-0 px-6 py-3 rounded-full border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-sm"
            >
              <tech.icon className="h-5 w-5 text-[#0070AD]" />
              <span className="font-display text-sm font-bold tracking-wider text-[#0B192C] whitespace-nowrap">
                {tech.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechSlider;
