import { motion } from 'framer-motion';
import { 
  Bot, 
  Smartphone, 
  BrainCircuit, 
  Database, 
  Shield, 
  Phone, 
  Webhook, 
  CreditCard, 
  Truck, 
  Code2,
  Mic,
  MessageSquare,
  Layers,
  Zap
} from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import FixedHeroVideo from '@/components/FixedHeroVideo';
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import { SplitText } from "@/components/SplitText";

const services = [
  {
    icon: BrainCircuit,
    title: 'Custom AI Development',
    description: 'Tailored artificial intelligence solutions designed to automate and optimize your business processes.',
    features: [
      'Machine Learning Models',
      'Natural Language Processing',
      'Computer Vision Solutions',
      'Predictive Analytics'
    ]
  },
  {
    icon: Bot,
    title: 'AI Agents',
    description: 'Intelligent autonomous agents that learn, adapt, and execute complex tasks with minimal human intervention.',
    features: [
      'Task Automation Agents',
      'Customer Support Bots',
      'Data Processing Agents',
      'Workflow Automation'
    ]
  },
  {
    icon: Phone,
    title: 'Voice Call AI',
    description: 'Advanced voice AI solutions for automated calling, customer service, and real-time voice interactions.',
    features: [
      'Automated Outbound Calls',
      'IVR Systems',
      'Voice Recognition',
      'Real-time Transcription'
    ]
  },
  {
    icon: Layers,
    title: 'AI Wrappers & APIs',
    description: 'Custom wrapper solutions around leading AI models like OpenAI, Claude, and Gemini for seamless integration.',
    features: [
      'OpenAI API Wrappers',
      'Claude Integration',
      'Custom Model APIs',
      'Rate Limiting & Caching'
    ]
  },
  {
    icon: Database,
    title: 'CRM Portal',
    description: 'Next-generation customer relationship management systems powered by AI-driven insights.',
    features: [
      'Lead Management',
      'Customer Analytics',
      'Sales Pipeline',
      'Automated Follow-ups'
    ]
  },
  {
    icon: Smartphone,
    title: 'App Development',
    description: 'Native and cross-platform mobile applications with seamless user experiences and robust functionality.',
    features: [
      'iOS & Android Apps',
      'Cross-Platform Development',
      'Progressive Web Apps',
      'App Maintenance'
    ]
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Advanced security solutions to protect your digital assets, data, and infrastructure from cyber threats.',
    features: [
      'Penetration Testing',
      'Security Audits',
      'Threat Monitoring',
      'Compliance Management'
    ]
  },
];

const integrations = [
  {
    icon: Truck,
    name: 'Shiprocket',
    description: 'Seamless shipping and logistics integration for e-commerce platforms with automated order tracking.',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: CreditCard,
    name: 'Razorpay',
    description: 'Complete payment gateway integration with UPI, cards, wallets, and subscription management.',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    icon: Webhook,
    name: 'Custom APIs',
    description: 'Build and integrate custom RESTful APIs and webhooks for any third-party service.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: MessageSquare,
    name: 'WhatsApp Business',
    description: 'Automated WhatsApp messaging, notifications, and chatbot integration for customer engagement.',
    color: 'from-green-400 to-green-600'
  },
  {
    icon: Mic,
    name: 'Voice AI Platforms',
    description: 'Integration with Twilio, Vonage, and custom telephony solutions for voice automation.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Code2,
    name: 'ERP Systems',
    description: 'Connect with SAP, Odoo, Zoho, and custom ERP systems for unified business operations.',
    color: 'from-cyan-500 to-blue-500'
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

import { useEffect } from 'react';

const Services = () => {
  useEffect(() => {
    document.title = "Our Services | AI Agent Development & Fastigo Technology Solutions";

    // Canonical tag for SEO
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    let createdCanonical = false;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
      createdCanonical = true;
    }
    const previousCanonical = canonical.href;
    canonical.href = "https://www.door2fy.in/services";

    // Meta robots for SEO
    let robots = document.querySelector("meta[name='robots']") as HTMLMetaElement;
    let createdRobots = false;
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
      createdRobots = true;
    }
    const previousRobots = robots.content;
    robots.content = "index,follow";

    return () => {
      if (createdCanonical) document.head.removeChild(canonical);
      else canonical.href = previousCanonical;
      
      if (createdRobots) document.head.removeChild(robots);
      else robots.content = previousRobots;
    };
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
              className="text-center max-w-4xl mx-auto"
            >
              <span className="mb-4 inline-block font-display text-sm tracking-widest text-primary">
                OUR SERVICES
              </span>
              <div className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-6xl flex flex-col items-center">
                <SplitText text="Cutting-Edge Solutions" className="text-foreground" />
                <SplitText text="For Modern Business" className="text-gradient-primary" />
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From AI-powered automation to seamless integrations, we deliver technology solutions 
                that transform how businesses operate and grow.
              </p>
              <div className="cyber-line mx-auto max-w-md mt-8" />
            </motion.div>
          </section>

          {/* Main Services */}
          <section className="container mx-auto px-4 mb-24 max-w-[1200px]">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="interactive group"
                >
                  <div className="glass-card h-full rounded-xl p-6 transition-all duration-500 hover:glow-box hover:border-primary/50">
                    <div className="mb-6 inline-flex rounded-lg bg-primary/10 p-3 transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(190_100%_50%/0.3)]">
                      <service.icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="mb-3 font-display text-xl font-semibold tracking-wide text-foreground transition-colors duration-300 group-hover:text-primary">
                      {service.title}
                    </h3>
                    <p className="mb-4 font-body text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Zap className="h-3 w-3 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Integrations Section */}
          <section className="container mx-auto px-4 max-w-[1200px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="mb-4 inline-block font-display text-sm tracking-widest text-primary">
                INTEGRATIONS
              </span>
              <h2 className="mb-6 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                <span className="text-foreground">Seamless Platform</span>
                <br />
                <span className="text-gradient-primary">Integrations</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We connect your business with leading platforms and create custom integrations 
                for unified operations.
              </p>
              <div className="cyber-line mx-auto max-w-md mt-8" />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {integrations.map((integration) => (
                <motion.div
                  key={integration.name}
                  variants={itemVariants}
                  className="interactive group"
                >
                  <div className="glass-card h-full rounded-xl p-6 transition-all duration-500 hover:glow-box hover:border-primary/50">
                    <div className={`mb-4 inline-flex rounded-lg bg-gradient-to-br ${integration.color} p-3`}>
                      <integration.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mb-2 font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {integration.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {integration.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
          {/* SEO Content & FAQ Section for Indexing */}
          <section className="container mx-auto px-4 max-w-[1000px] mt-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card rounded-2xl p-8 md:p-12"
            >
              <h2 className="mb-8 font-display text-3xl font-bold tracking-tight text-foreground">
                Frequently Asked Questions About Our Services
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">How does your custom AI development process work?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our AI development lifecycle begins with a comprehensive data audit and business logic analysis. We then select the optimal machine learning architecture—whether that involves fine-tuning large language models (LLMs), implementing computer vision algorithms, or building predictive data pipelines. Throughout the process, we prioritize scalable deployment, ensuring the AI solution integrates seamlessly with your existing infrastructure and delivers measurable ROI.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">What are autonomous AI agents and how can they help my business?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Unlike traditional chatbots that simply answer questions, autonomous AI agents can actively execute multi-step workflows. They can navigate software, parse unstructured data, draft emails, and make logical decisions based on set parameters. Businesses use our AI agents to automate complex customer support tier-1 resolutions, streamline back-office data entry, and act as intelligent research assistants, drastically reducing operational overhead.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Can you integrate these solutions with our legacy ERP/CRM systems?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Yes, absolutely. A core part of our digital transformation service is ensuring backwards compatibility and data flow with legacy systems. We build secure API wrappers, custom middleware, and automated webhooks to connect our modern AI solutions with enterprise platforms like SAP, Oracle, Salesforce, and custom-built legacy software, ensuring zero disruption to your current operations.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">What measures do you take to ensure data security and privacy?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Security is baked into our engineering culture. We employ zero-trust architecture, end-to-end encryption for data in transit and at rest, and strict access controls. When deploying AI models, we can utilize private cloud infrastructure or on-premise solutions to ensure your proprietary data never leaks into public models. We also conduct rigorous penetration testing and compliance audits before any production release.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>
        </main>

        
      </div>
    </div>
  );
};

export default Services;
