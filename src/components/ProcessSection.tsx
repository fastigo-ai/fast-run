import { motion } from 'framer-motion';
import { Search, PenTool, Code, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Discovery',
    description: 'We dive deep into your business needs, market trends, and technical requirements.',
    color: 'hsl(190, 100%, 50%)',
  },
  {
    icon: PenTool,
    title: 'Strategy & Design',
    description: 'Crafting a bespoke roadmap and high-fidelity prototypes that align with your vision.',
    color: 'hsl(280, 80%, 60%)',
  },
  {
    icon: Code,
    title: 'Development',
    description: 'Our engineers build robust, scalable solutions using cutting-edge AI and tech stacks.',
    color: 'hsl(150, 80%, 50%)',
  },
  {
    icon: Rocket,
    title: 'Deployment',
    description: 'Seamless launch and continuous optimization to ensure long-term success.',
    color: 'hsl(20, 90%, 55%)',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const ProcessSection = () => {
  return (
    <section className="relative py-24 px-4 bg-background/50">
      <div className="container relative z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-display text-sm tracking-widest text-primary uppercase">
            How We Work
          </span>
          <h2 className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
            Our <span className="text-gradient-primary">Process</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            A streamlined approach to turning complex challenges into innovative digital solutions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-4 relative"
        >
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 -z-10" />

          {steps.map((step, index) => (
            <motion.div key={step.title} variants={itemVariants} className="relative group">
              <div className="flex flex-col items-center text-center">
                {/* Icon Circle */}
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center mb-6 relative transition-transform duration-300 group-hover:scale-110 shadow-lg"
                  style={{
                    backgroundColor: `${step.color}15`,
                    border: `2px solid ${step.color}30`,
                    boxShadow: `0 0 20px ${step.color}20`
                  }}
                >
                  <step.icon className="w-10 h-10" style={{ color: step.color }} />
                  
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-xs font-bold text-foreground">
                    0{index + 1}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed px-4">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
