import { motion } from 'framer-motion';
import { Heart, Building2, Rocket, Factory, ShoppingCart } from 'lucide-react';

const sectors = [
  {
    icon: Heart,
    title: 'Healthcare',
    description: 'Revolutionizing patient care with AI-driven diagnostics, telemedicine, and health management systems.',
    color: 'hsl(340, 80%, 55%)',
  },
  {
    icon: Building2,
    title: 'Banking & Finance',
    description: 'Secure fintech solutions, fraud detection, and intelligent banking automation.',
    color: 'hsl(210, 80%, 55%)',
  },
  {
    icon: Rocket,
    title: 'Startups',
    description: 'Helping startups scale fast with MVPs, rapid prototyping, and growth-focused technology.',
    color: 'hsl(280, 80%, 55%)',
  },
  {
    icon: Factory,
    title: 'Manufacturing',
    description: 'Smart factory solutions, IoT integration, and predictive maintenance systems.',
    color: 'hsl(45, 80%, 55%)',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce',
    description: 'Personalized shopping experiences, inventory AI, and seamless payment integrations.',
    color: 'hsl(160, 80%, 45%)',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const SectorsSection = () => {
  return (
    <section className="relative py-24 px-4">
      {/* Background accent */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-secondary/5 blur-[150px]" />

      <div className="container relative z-10 mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-display text-sm tracking-widest text-primary">
            INDUSTRIES WE SERVE
          </span>
          <h2 className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="text-foreground">Empowering Every</span>
            <br />
            <span className="text-gradient-primary">Sector</span>
          </h2>
          <div className="cyber-line mx-auto max-w-md" />
        </motion.div>

        {/* Sectors grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {sectors.map((sector) => (
            <motion.div
              key={sector.title}
              variants={itemVariants}
              className="interactive group"
            >
              <div className="glass-card h-full rounded-xl p-6 text-center transition-all duration-500 hover:glow-box hover:border-primary/50">
                {/* Icon with custom color */}
                <div
                  className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${sector.color}20`,
                    boxShadow: `0 0 30px ${sector.color}30`,
                  }}
                >
                  <sector.icon
                    className="h-8 w-8 transition-transform duration-300"
                    style={{ color: sector.color }}
                  />
                </div>

                {/* Content */}
                <h3 className="mb-2 font-display text-lg font-semibold tracking-wide text-foreground transition-colors duration-300 group-hover:text-primary">
                  {sector.title}
                </h3>
                <p className="font-body text-xs leading-relaxed text-muted-foreground">
                  {sector.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SectorsSection;
