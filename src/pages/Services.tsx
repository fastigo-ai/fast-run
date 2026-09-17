import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Cloud,
  Shield,
  Database,
  Cpu,
  Building2,
  Workflow,
  Network,
  Zap,
  Smartphone,
  Car,
  Code2,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const directoryServices = [
  {
    slug: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    eyebrow: 'Autonomous Reasoning & Vision',
    icon: BrainCircuit,
    description:
      'Architect and deploy production-grade Artificial Intelligence: LLMs, autonomous agentic swarms, real-time computer vision, and private model guardrails.',
    features: [
      'Agentic & Generative AI Swarms',
      'Computer Vision & Optical AI',
      'Enterprise MLOps & Quantization',
      'Responsible & Explainable AI',
    ],
  },
  {
    slug: 'cloud',
    title: 'Cloud Transformation',
    eyebrow: 'Hybrid & Multi-Cloud',
    icon: Cloud,
    description:
      'Scalable digital foundations across AWS, Azure, and Google Cloud with zero-downtime cutover, Kubernetes orchestration, and autonomous FinOps governance.',
    features: [
      'Multi-Cloud Landing Zones',
      'Microservices & Serverless Runtimes',
      'Autonomous FinOps & SRE',
      'Active-Active DR Failover',
    ],
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity & Resilience',
    eyebrow: 'Zero-Trust Cyber Defense',
    icon: Shield,
    description:
      'End-to-end Zero Trust security architectures, 24/7 Managed Detection and Response (MDR), and continuous threat hunting containing attacks in minutes.',
    features: [
      'Zero-Trust Identity & PAM',
      '24/7 AI-Assisted SOC & MDR',
      'Cloud Security Posture (CSPM)',
      'Offensive Red Team Penetration Testing',
    ],
  },
  {
    slug: 'data-analytics',
    title: 'Data & Analytics',
    eyebrow: 'Modern Data Architecture',
    icon: Database,
    description:
      'Turn fragmented data silos into unified, high-performance lakehouses on Snowflake and Databricks. Deliver self-service BI and real-time streaming at scale.',
    features: [
      'Unified Lakehouse Architecture',
      'Kafka & Flink Real-Time Streaming',
      'Governed Data Mesh & dbt Modeling',
      'Executive Sub-Second BI Dashboards',
    ],
  },
  {
    slug: 'iot-and-digital-engineering',
    title: 'IoT & Digital Engineering',
    eyebrow: 'Industrial Edge & Twins',
    icon: Cpu,
    description:
      'Bridge physical machinery and software intelligence with edge computing gateways, digital twin simulations, and safety-critical embedded firmware.',
    features: [
      'ARM & RTOS Embedded Firmware',
      'Factory PLC/SCADA Edge Gateways',
      '3D Physics Digital Twin Simulation',
      'Predictive Asset Health Telemetry',
    ],
  },
  {
    slug: 'enterprise-solutions',
    title: 'Enterprise Solutions',
    eyebrow: 'Clean-Core ERP & Platforms',
    icon: Building2,
    description:
      'Optimize mission-critical enterprise workflows with clean-core SAP S/4HANA, Oracle Cloud ERP, Salesforce CPQ, and unified supply chain synchronization.',
    features: [
      'SAP S/4HANA & Oracle Cloud Core',
      'Salesforce CPQ & Revenue Operations',
      'Extended Warehouse Management (EWM)',
      'API-Led Enterprise Integration Mesh',
    ],
  },
  {
    slug: 'cognitive-business-operations',
    title: 'Cognitive Business Operations',
    eyebrow: 'Process Intelligence & RPA',
    icon: Workflow,
    description:
      'Reimagine enterprise back-office operations with process mining (Celonis), unattended robotic automation (UiPath), and intelligent document processing.',
    features: [
      'Process Mining & Bottleneck Discovery',
      'Touchless Accounts Payable Automation',
      'Cognitive Claims & Underwriting',
      'Intelligent Document OCR Parsing',
    ],
  },
  {
    slug: 'network-solutions-and-services',
    title: 'Network Solutions & 5G',
    eyebrow: 'SD-WAN & Private Cellular',
    icon: Network,
    description:
      'Engineer agile, software-defined enterprise networks built for low-latency cloud connectivity. SD-WAN overlays, Private 5G, and SASE security.',
    features: [
      'Software-Defined WAN (SD-WAN)',
      'Private 5G & Industrial CBRS',
      'Secure Access Service Edge (SASE)',
      '24/7 Managed NOC & Telemetry',
    ],
  },
  {
    slug: 'sustainability',
    title: 'Sustainability & ESG',
    eyebrow: 'Net-Zero Transformation',
    icon: Zap,
    description:
      'Accelerate your journey to net-zero with audited carbon accounting (GHG Protocol Scope 1-3), IoT plant energy sub-metering, and green software practices.',
    features: [
      'Automated Scope 1-3 Carbon Mesh',
      'IoT Facility Energy Sub-Metering',
      'Digital Product Passports (DPP)',
      'Carbon-Aware Software Engineering',
    ],
  },
  {
    slug: 'fastigo-interactive',
    title: 'Fastigo Interactive',
    eyebrow: 'Human-Centered UI/UX',
    icon: Smartphone,
    description:
      'Bespoke design systems, high-conversion headless eCommerce platforms, and immersive mobile applications crafted for exceptional user engagement.',
    features: [
      'Enterprise Figma Design Systems',
      'Sub-Second Headless Storefronts',
      'Cross-Platform Mobile Apps (React Native)',
      'WCAG 2.1 AA Accessibility Auditing',
    ],
  },
  {
    slug: 'mobility',
    title: 'Intelligent Mobility',
    eyebrow: 'Software-Defined Vehicles',
    icon: Car,
    description:
      'Pioneer future transportation with connected vehicle telematics, electric vehicle battery optimization, smart depot charging, and ADAS sensor perception.',
    features: [
      'Software-Defined Vehicle (AUTOSAR)',
      'EV Battery Health & Depot Smart Charging',
      'Sub-Second Connected Fleet Telematics',
      'Autonomous Vision & Sensor Fusion',
    ],
  },
  {
    slug: 'tech',
    title: 'Foundational Tech',
    eyebrow: 'Custom Software Systems',
    icon: Code2,
    description:
      'Engineer mission-critical digital engines from first principles. High-throughput transactional backends, distributed consensus fabrics, and robust APIs.',
    features: [
      'High-Concurrency Microservices (Go/Rust)',
      'Distributed State & In-Memory Caching',
      'Federated GraphQL & gRPC Gateways',
      'Automated Chaos Testing & SRE',
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const Services: React.FC = () => {
  useEffect(() => {
    document.title = 'Enterprise Services Directory | Fastigo Technology Solutions';
    window.scrollTo(0, 0);

    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    let createdCanonical = false;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
      createdCanonical = true;
    }
    const previousCanonical = canonical.href;
    canonical.href = 'https://www.door2fy.in/services';

    return () => {
      if (createdCanonical) document.head.removeChild(canonical);
      else canonical.href = previousCanonical;
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-white text-slate-900 overflow-x-hidden font-body pt-24 pb-28">
      {/* Ambient Neural Light Mesh Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-1/4 w-[750px] h-[750px] bg-gradient-to-br from-[#0070AD]/8 to-sky-200/20 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-gradient-to-bl from-[#00A3E0]/8 to-blue-100/30 rounded-full blur-[130px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0070ad08_1px,transparent_1px),linear-gradient(to_bottom,#0070ad08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 max-w-[1240px] relative z-10">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
            <Link to="/" className="hover:text-[#0070AD] transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-[#0070ad] font-semibold">Services Directory</span>
          </nav>
        </div>

        {/* Directory Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-200 bg-sky-50 text-[#0070AD] text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0070AD]" />
            <span>Enterprise Services Directory</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[#0E0A42] mb-6 leading-tight">
            Specialized Engineering for the{' '}
            <span className="animate-text-shimmer-light bg-clip-text text-transparent bg-gradient-to-r from-[#0070AD] via-[#00A3E0] to-[#0070AD] font-extrabold">
              Adaptive Enterprise
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
            Explore our specialized practices across artificial intelligence, cloud architecture, cybersecurity, and digital engineering. Built for resilience and high concurrency.
          </p>
        </div>

        {/* Services Directory Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-28"
        >
          {directoryServices.map((service) => {
            const ServiceIcon = service.icon;
            return (
              <motion.div
                key={service.slug}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="rounded-3xl p-8 bg-white border border-slate-200/90 hover:border-[#0070AD]/50 hover:shadow-[0_16px_45px_rgba(0,112,173,0.12)] transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#0070AD]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0070AD] group-hover:bg-[#0070AD] group-hover:text-white transition-all shadow-xs">
                      <ServiceIcon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#0070AD] font-bold bg-sky-50/80 px-3 py-1 rounded-full border border-sky-200/80">
                      {service.eyebrow}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-[#0070ad] mb-3 group-hover:text-[#0070AD] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-body mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-8">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0070AD] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/services/${service.slug}`}
                  className="w-full py-3.5 px-5 rounded-xl font-bold text-sm bg-[#0070AD] hover:bg-[#005a8c] text-white border border-[#0070AD] transition-all flex items-center justify-between group/link shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span>Explore Practice</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Executive FAQ Section */}
        <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 bg-slate-50/80 border border-slate-200/90 shadow-sm">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0070AD] font-mono block mb-2">
              Architecture &amp; Delivery
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0E0A42]">
              Enterprise Engagement FAQ
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <h3 className="text-base font-bold text-[#0070ad] mb-2">
                How are multi-disciplinary practices staffed for enterprise engagements?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We assemble cross-functional pods led by a Principal Enterprise Architect, pairing deep domain specialists (e.g. cloud engineers, cybersecurity analysts, machine learning researchers) with dedicated agile delivery leads to ensure rapid velocity and strict governance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <h3 className="text-base font-bold text-[#0070ad] mb-2">
                Can your teams modernize legacy on-premise systems with zero business interruption?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Yes. We specialize in the strangler-fig pattern, dual-write synchronization, and automated cutover factories. This allows organizations to gradually transition transactional ledgers, ERPs, and databases to modern cloud architectures with verified zero transactional loss and zero unplanned downtime.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <h3 className="text-base font-bold text-[#0070ad] mb-2">
                What security and compliance frameworks govern these practices?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                All engineering workflows adhere strictly to ISO 27001, SOC 2 Type II, and Zero-Trust architecture baselines. For regulated industries, we provide pre-audited compliance mapping for HIPAA, PCI-DSS 4.0, ISO 26262 ASIL-D, and GDPR.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
