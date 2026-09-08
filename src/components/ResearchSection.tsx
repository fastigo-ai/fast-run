import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getSlug } from '@/data/services';
import { 
  BrainCircuit, Blocks, Atom, Server, Layers,
  MessageSquare, Eye, Bot, Sparkles, Radio 
} from 'lucide-react';

const researchAreas = [
  {
    icon: BrainCircuit,
    title: 'AI & Machine Learning Lab',
    description: 'Advancing the frontiers of artificial intelligence with novel architectures, training methodologies, and enterprise-grade ML solutions.',
    color: 'hsl(190, 90%, 50%)',
  },
  {
    icon: Blocks,
    title: 'Blockchain Research',
    description: 'Exploring decentralized protocols, smart contract security, and distributed ledger applications for enterprise use cases.',
    color: 'hsl(260, 80%, 60%)',
  },
  {
    icon: Atom,
    title: 'Quantum Computing',
    description: 'Pioneering quantum algorithms and hybrid quantum-classical systems for optimization and cryptographic challenges.',
    color: 'hsl(300, 70%, 55%)',
  },
  {
    icon: Server,
    title: 'Edge Computing',
    description: 'Building low-latency processing frameworks at the network edge for real-time IoT and industrial applications.',
    color: 'hsl(160, 80%, 45%)',
  },
  {
    icon: Layers,
    title: 'Digital Twin Technology',
    description: 'Creating virtual replicas of physical systems for simulation, monitoring, and predictive analysis.',
    color: 'hsl(210, 80%, 55%)',
  },
  {
    icon: MessageSquare,
    title: 'Natural Language Processing',
    description: 'Developing advanced NLP models for sentiment analysis, language understanding, and multilingual communication.',
    color: 'hsl(340, 80%, 55%)',
  },
  {
    icon: Eye,
    title: 'Computer Vision',
    description: 'Building visual intelligence systems for object detection, medical imaging, and autonomous systems.',
    color: 'hsl(30, 90%, 55%)',
  },
  {
    icon: Bot,
    title: 'Robotic Process Automation',
    description: 'Designing intelligent bots that automate repetitive business processes with cognitive capabilities.',
    color: 'hsl(45, 85%, 50%)',
  },
  {
    icon: Sparkles,
    title: 'Generative AI',
    description: 'Researching foundation models, fine-tuning strategies, and responsible AI generation for enterprise content creation.',
    color: 'hsl(280, 80%, 60%)',
  },
  {
    icon: Radio,
    title: '5G & Beyond',
    description: 'Exploring next-generation connectivity for ultra-reliable, low-latency communication and network slicing.',
    color: 'hsl(0, 80%, 55%)',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const ResearchSection = () => {
  return (
    <section id="research" className="relative py-24 px-4">
      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-secondary/5 blur-[180px]" />

      <div className="container relative z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-display text-sm tracking-widest text-primary">
            RESEARCH & INNOVATION
          </span>
          <h2 className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="text-foreground">Pioneering</span>
            <br />
            <span className="text-gradient-primary">The Future</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Cutting-edge research in emerging technologies shaping the convergence of business and innovation.
          </p>
          <div className="cyber-line mx-auto max-w-md mt-8" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {researchAreas.map((area) => (
            <Link
              key={area.title}
              to={`/research/${getSlug(area.title)}`}
              className="interactive group block"
            >
              <motion.div
                variants={itemVariants}
                className="h-full"
              >
                <div className="glass-card h-full rounded-xl p-6 text-center transition-all duration-500 hover:glow-box hover:border-primary/50">
                  <div
                    className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${area.color}20`,
                      boxShadow: `0 0 30px ${area.color}30`,
                    }}
                  >
                    <area.icon
                      className="h-8 w-8 transition-transform duration-300"
                      style={{ color: area.color }}
                    />
                  </div>
                  <h3 className="mb-2 font-display text-sm font-semibold tracking-wide text-foreground transition-colors duration-300 group-hover:text-primary">
                    {area.title}
                  </h3>
                  <p className="font-body text-xs leading-relaxed text-muted-foreground">
                    {area.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchSection;

