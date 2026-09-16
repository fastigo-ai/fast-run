import { motion } from 'framer-motion';
import { Bot, Smartphone, BrainCircuit, Database, Shield, Link as LinkIcon, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import image1 from '../assets/custom_ai_dev.webp';
import image2 from '../assets/ai_agents.webp';
import image3 from '../assets/crm_portal.webp';
import image4 from '../assets/app_dev.webp';
import image5 from '../assets/cybersecurity.webp';
import image6 from '../assets/blockchain.webp';

interface ServiceData {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  features: string[];
}

const services: ServiceData[] = [
  {
    icon: BrainCircuit,
    title: 'Custom AI Development',
    description: 'We build bespoke AI ecosystems tailored to your unique business logic. From generative models to predictive analytics, we turn complex data into actionable intelligence.',
    image: image1,
    features: ['Generative AI Models', 'Predictive Data Analytics', 'NLP & Computer Vision'],
  },
  {
    icon: Bot,
    title: 'AI Agents',
    description: 'Autonomous intelligent entities that automate multi-step workflows. Our agents learn, adapt, and execute complex operations with precision and speed.',
    image: image2,
    features: ['Multi-Agent Systems', 'Workflow Automation', 'Autonomous Decision Making'],
  },
  {
    icon: Database,
    title: 'CRM Portal',
    description: 'Next-gen relationship management powered by AI. Real-time insights, automated lead scoring, and hyper-personalized customer journeys in one sleek interface.',
    image: image3,
    features: ['AI Lead Scoring', 'Automated Pipelines', 'Actionable Insights'],
  },
  {
    icon: Smartphone,
    title: 'App Development',
    description: 'High-performance mobile and web applications with seamless UX. We combine intuitive design with robust backend architecture for maximum engagement.',
    image: image4,
    features: ['Native iOS & Android', 'Progressive Web Apps', 'Cloud-Native Backend'],
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Fortress-level protection for your digital assets. We deploy AI-driven threat detection, zero-trust architecture, and encrypted data protocols to keep you secure.',
    image: image5,
    features: ['Zero-Trust Architecture', 'Real-Time Threat Hunting', 'Compliance & Audits'],
  },
  {
    icon: LinkIcon,
    title: 'Blockchain',
    description: 'Transparent, decentralized, and immutable ledger solutions. We implement smart contracts and secure tokenomics to revolutionize trust in digital transactions.',
    image: image6,
    features: ['Smart Contract Dev', 'Decentralized Identity', 'Tokenomics Design'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const ServicesSection = () => {
  return (
    <section className="relative py-24 px-4">
      {/* Section background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[150px]" />

      <div className="container relative z-10 mx-auto max-w-[1200px]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-display text-sm font-bold tracking-widest text-[#0070AD]">
            OUR EXPERTISE
          </span>
          <h2 className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-5xl text-[#0070ad]">
            Transforming Ideas Into <br />
            <span className="text-gradient-primary">Digital Reality</span>
          </h2>
          <div className="cyber-line mx-auto max-w-md" />
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => {
            // Generate a URL-friendly slug from the title
            const slug = service.title.toLowerCase().replace(/\s+/g, '-');

            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="interactive group h-full"
              >
                <Link to={`/services/${slug}`} className="block h-full cursor-pointer">
                  <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-7 transition-all duration-400 hover:-translate-y-1.5 shadow-[0_4px_24px_rgba(0,112,173,0.06)] hover:shadow-[0_22px_45px_rgba(0,112,173,0.14)] hover:border-[#0070AD]/40 flex flex-col h-full">
                    {/* Icon & Title */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="inline-flex rounded-xl bg-blue-50 p-3.5 text-[#0070AD] transition-all duration-300 group-hover:bg-[#0070AD] group-hover:text-white group-hover:shadow-[0_4px_15px_rgba(0,112,173,0.3)]">
                        <service.icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <h3 className="font-display text-xl font-bold tracking-tight text-[#0070ad] transition-colors duration-300 group-hover:text-[#0070AD]">
                        {service.title}
                      </h3>
                    </div>

                    {/* Service Image */}
                    {service.image && (
                      <div className="mb-6 rounded-xl overflow-hidden border border-slate-200/60 aspect-[16/10] relative group-hover:border-[#0070AD]/30 transition-colors shrink-0">
                        <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0070ad]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    )}

                    {/* Content */}
                    <p className="font-body text-sm leading-relaxed text-slate-600 mb-4 line-clamp-3">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2 mb-4 mt-auto">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0070AD] shrink-0" />
                          <span className="truncate font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Hover indicator */}
                    <div className="pt-4 flex items-center gap-2 text-[#0070AD] opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-2">
                      <span className="font-display text-xs tracking-wider font-bold">VIEW DETAILS</span>
                      <svg
                        className="h-4 w-4 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}

        </motion.div>

        {/* View All Services CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border border-[#0070AD] bg-white px-8 py-3.5 font-display text-sm font-bold tracking-wider text-[#0070AD] transition-all duration-300 hover:bg-[#0070AD] hover:text-white hover:shadow-[0_8px_25px_rgba(0,112,173,0.3)] hover:-translate-y-0.5"
          >
            EXPLORE ALL SERVICES
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
