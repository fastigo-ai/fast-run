import { motion } from 'framer-motion';
import { Rocket, ArrowRight } from 'lucide-react';

const ComingSoonBanner = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container relative z-10 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >  
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-6 py-3 backdrop-blur-sm">
            <Rocket className="h-5 w-5 text-primary animate-pulse" />
            <span className="font-display text-sm tracking-widest text-primary">LAUNCHING Q2 2025</span>
          </div>

          <h2 className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-foreground">Something Big Is</span>
            <br />
            <span className="text-gradient-glow">Coming Soon</span>
          </h2>

          <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
            We're building the next generation of AI-powered solutions. 
            Be the first to experience the future of technology.
          </p>

          {/* Email signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto flex max-w-md flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-border bg-card/50 px-5 py-4 font-body text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
            <button className="interactive group flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 font-display text-sm font-semibold tracking-wider text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_hsl(190_100%_50%/0.5)]">
              NOTIFY ME
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>

          <p className="mt-4 text-xs text-muted-foreground">
            No spam, ever. We'll only notify you when we launch.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ComingSoonBanner;
