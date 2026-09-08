import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getSlug } from '@/data/services';
import { 
  Cloud, Server, Database, Layers, Sparkles,
  Settings, Globe, Palette, Workflow, Radio 
} from 'lucide-react';

const alliances = [
  {
    icon: Layers,
    name: 'Microsoft',
    description: 'Gold partner delivering Azure cloud, Dynamics 365, and Microsoft 365 enterprise solutions.',
    color: 'hsl(200, 90%, 50%)',
  },
  {
    icon: Cloud,
    name: 'AWS',
    description: 'Advanced consulting partner for scalable cloud infrastructure, serverless, and AI/ML services.',
    color: 'hsl(35, 100%, 50%)',
  },
  {
    icon: Globe,
    name: 'Google Cloud',
    description: 'Premier partner for BigQuery analytics, Vertex AI, and Kubernetes-based modernization.',
    color: 'hsl(140, 70%, 45%)',
  },
  {
    icon: Database,
    name: 'SAP',
    description: 'Certified partner for S/4HANA implementation, migration, and intelligent enterprise transformation.',
    color: 'hsl(210, 80%, 55%)',
  },
  {
    icon: Sparkles,
    name: 'Salesforce',
    description: 'Strategic partner for CRM, Marketing Cloud, and custom Lightning platform development.',
    color: 'hsl(200, 85%, 55%)',
  },
  {
    icon: Server,
    name: 'Oracle',
    description: 'Partner for Oracle Cloud Infrastructure, ERP, and autonomous database solutions.',
    color: 'hsl(0, 80%, 50%)',
  },
  {
    icon: Settings,
    name: 'ServiceNow',
    description: 'Elite partner for IT service management, workflow automation, and digital workplace solutions.',
    color: 'hsl(150, 70%, 45%)',
  },
  {
    icon: Palette,
    name: 'Adobe',
    description: 'Partner for Experience Cloud, content management, and personalized digital experience delivery.',
    color: 'hsl(350, 80%, 50%)',
  },
  {
    icon: Workflow,
    name: 'Pega',
    description: 'Alliance partner for intelligent automation, case management, and customer engagement.',
    color: 'hsl(220, 75%, 55%)',
  },
  {
    icon: Radio,
    name: 'Cisco',
    description: 'Partner for networking, cybersecurity, collaboration, and IoT infrastructure solutions.',
    color: 'hsl(190, 80%, 45%)',
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
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const AllianceSection = () => {
  return (
    <section id="alliances" className="relative py-24 px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[200px]" />

      <div className="container relative z-10 mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-display text-sm font-bold tracking-widest text-[#0070AD]">
            STRATEGIC ALLIANCES
          </span>
          <h2 className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-5xl text-[#0B192C]">
            Our Technology <br />
            <span className="text-gradient-primary">Partners</span>
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            Partnering with industry leaders to deliver best-in-class solutions and maximize value for our clients.
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
          {alliances.map((alliance) => (
            <Link
              key={alliance.name}
              to={`/alliances/${getSlug(alliance.name)}`}
              className="interactive group block"
            >
              <motion.div
                variants={itemVariants}
                className="h-full"
              >
                <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 h-full rounded-2xl p-6 text-center transition-all duration-400 hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,112,173,0.05)] hover:shadow-[0_16px_36px_rgba(0,112,173,0.12)] hover:border-[#0070AD]/40 flex flex-col items-center">
                  <div
                    className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${alliance.color}15`,
                      boxShadow: `0 0 25px ${alliance.color}20`,
                    }}
                  >
                    <alliance.icon
                      className="h-8 w-8 transition-transform duration-300"
                      style={{ color: alliance.color }}
                    />
                  </div>
                  <h3 className="mb-2 font-display text-base font-bold tracking-tight text-[#0B192C] transition-colors duration-300 group-hover:text-[#0070AD]">
                    {alliance.name}
                  </h3>
                  <p className="font-body text-xs leading-relaxed text-slate-600">
                    {alliance.description}
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

export default AllianceSection;

