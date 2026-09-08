import { BrainCircuit, Database, Shield, Smartphone, Link as LinkIcon, Cloud, Cpu, Activity, Globe, Zap, LucideIcon } from 'lucide-react';
import sustainability from '@/assets/sustainability.webp';
import Network from '@/assets/Network-Solutions.webp';
import mobilityImg from '@/assets/mobality.webp';
import sustainImg from '@/assets/sustainablity1.webp';
import techImg from '@/assets/tech.webp';
import { Car, Leaf, Code2 } from 'lucide-react';

export interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  color: string;
  icon: LucideIcon;
}

export const servicesData: Record<string, ServiceData> = {
  'artificial-intelligence-and-data-analytics': {
    icon: BrainCircuit,
    title: 'Artificial Intelligence and Data & Analytics',
    subtitle: 'Extracting Value from Data at Scale',
    description: 'We help organizations leverage state-of-the-art AI and advanced analytics to unlock deep business insights. Our services cover everything from data modernization to the deployment of cognitive solutions that drive decision-making.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600',
    features: ['Machine Learning & Deep Learning', 'Enterprise Data Strategy', 'Natural Language Processing', 'Computer Vision Solutions'],
    color: '#0070AD',
  },
  'cloud': {
    icon: Cloud,
    title: 'Cloud Services',
    subtitle: 'Scalable, Secure, and Resilient Digital Core',
    description: 'Accelerate your digital transformation with our comprehensive cloud solutions. We provide tailored strategies for cloud migration, hybrid cloud management, and cloud-native application development.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600',
    features: ['Multi-Cloud Orchestration', 'Cloud Migration & Strategy', 'Serverless Computing', 'DevSecOps & SRE'],
    color: '#0070AD',
  },
  'cognitive-business-operations': {
    icon: Activity,
    title: 'Cognitive Business Operations',
    subtitle: 'AI-Driven Operational Excellence',
    description: 'Redesigning business processes with embedded intelligence. We create frictionless, automated workflows that improve efficiency and user experience across the enterprise.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600',
    features: ['Intelligent Process Automation', 'Digital Customer Experience', 'Predictive Resource Planning', 'Process Mining & Analytics'],
    color: '#0070AD',
  },
  'consulting': {
    icon: Globe,
    title: 'Consulting',
    subtitle: 'Strategic Guidance for a Digital Future',
    description: 'Partnering with global leaders to design and execute digital transformation strategies. We provide actionable roadmaps that align technology with core business objectives.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1600',
    features: ['Digital Transformation Roadmap', 'IT Operating Model Design', 'Cyber-Resilience Strategy', 'ESG & Sustainability Advisory'],
    color: '#0070AD',
  },
  'cybersecurity': {
    icon: Shield,
    title: 'Cybersecurity',
    subtitle: 'Zero-Trust Resilience at Scale',
    description: 'Protecting your digital enterprise with advanced threat intelligence and a zero-trust approach. We secure your data, identity, and infrastructure against evolving global threats.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600',
    features: ['Managed Detection & Response', 'Identity Access Management', 'Cloud Security Posture', 'Threat Intelligence & Risk'],
    color: '#0070AD',
  },
  'enterprise-solutions': {
    icon: Database,
    title: 'Enterprise Solutions',
    subtitle: 'Unified Platforms for Global Business',
    description: 'Optimizing your enterprise with integrated platforms like SAP, Oracle, and Microsoft. We help break down silos and enable real-time visibility across global supply chains.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600',
    features: ['ERP Implementation & Migration', 'Supply Chain Digitization', 'Platform Automation', 'Integrated CRM Solutions'],
    color: '#0070AD',
  },
  'iot-and-digital-engineering': {
    icon: Cpu,
    title: 'IoT and Digital Engineering',
    subtitle: 'Connecting the Physical and Digital Worlds',
    description: 'Engineering smart, connected products and robust IoT ecosystems. We help industrial clients harness sensor data to create superior customer experiences and new revenue streams.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600',
    features: ['Embedded Systems Engineering', 'Industrial IoT (IIoT)', 'Edge Computing Solutions', 'Digital Twin Technology'],
    color: '#0070AD',
  },
  'network-solutions-and-services': {
    icon: LinkIcon,
    title: 'Network Solutions and Services',
    subtitle: 'Agile Connectivity for the Hybrid World',
    description: 'Architecting software-defined networks that are secure and agile. We prepare your infrastructure for the demands of 5G, edge computing, and high-performance cloud applications.',
    image: Network,
    features: ['SD-WAN & Network Slicing', '5G Infrastructure Design', 'Network Function Virtualization', 'Secure Hybrid Connectivity'],
    color: '#0070AD',
  },
  'sustainability-services': {
    icon: Zap,
    title: 'Sustainability Services',
    subtitle: 'Data-Driven Path to Net-Zero',
    description: 'Leveraging digital tools to help organizations track, report, and reduce their environmental impact. We integrate sustainability into the core of your business strategy.',
    image: sustainability,
    features: ['ESG Data Management', 'Circular Economy Solutions', 'Zero-Harm Digital Twin', 'Green IT & Infrastructure'],
    color: '#0070AD',
  },
  'fastigo-interactive': {
    icon: Smartphone,
    title: 'Fastigo Interactive',
    subtitle: 'Crafting Immersive Customer Experiences',
    description: 'Fusing creative design with deep technology to build engaging user journeys. We design high-performance mobile apps, immersive AR/VR experiences, and modern web platforms.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1600',
    features: ['Experience-Led Engineering', 'AR/VR/XR Solutions', 'Digital Marketing Tech', 'UX Strategy & Design'],
    color: '#0070AD',
  },
  'mobility': {
    icon: Car,
    title: 'Mobility',
    subtitle: 'Intelligent and Sustainable Transportation',
    description: 'Transforming the future of transportation with intelligent, connected, and autonomous solutions. By seamlessly combining digital, AI and physical engineering, we deliver innovative solutions that redefine how goods and people move.',
    image: mobilityImg,
    features: ['Autonomous Systems', 'Connected Vehicles', 'Smart Fleet Management', 'EV Infrastructure'],
    color: '#0070AD',
  },
  'sustainability': {
    icon: Leaf,
    title: 'Sustainability',
    subtitle: 'Driving Eco-Friendly Innovations',
    description: 'Driving eco-friendly innovations and smart energy management for a greener tomorrow. We partner with businesses across the process, plant, and manufacturing sectors to build a sustainable and responsible future.',
    image: sustainImg,
    features: ['Smart Energy Management', 'Carbon Footprint Tracking', 'Sustainable Manufacturing', 'Green Supply Chain'],
    color: '#0070AD',
  },
  'tech': {
    icon: Code2,
    title: 'Tech',
    subtitle: 'Foundational Technologies for Innovation',
    description: 'Empowering businesses with cutting-edge software, cloud computing, and AI-driven platforms. Our Tech segment delivers the foundational technologies that power innovation and elevate operational excellence across industries.',
    image: techImg,
    features: ['Custom Software Development', 'Cloud Architecture', 'AI Integration', 'Enterprise Platforms'],
    color: '#0070AD',
  },
};

// Aliases to fix routing mismatches from MegaMenu slugs
servicesData['artificial-intelligence'] = servicesData['artificial-intelligence-and-data-analytics'];
servicesData['data-analytics'] = servicesData['artificial-intelligence-and-data-analytics'];
servicesData['cloud-solutions'] = servicesData['cloud'];
servicesData['cognitive-business'] = servicesData['cognitive-business-operations'];
servicesData['iot-digital-engineering'] = servicesData['iot-and-digital-engineering'];
servicesData['network-services'] = servicesData['network-solutions-and-services'];
servicesData['interactive-design'] = servicesData['fastigo-interactive'];

export const getSlug = (name: string) => {
  return name.toLowerCase()
    .replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '')
    .replace(/\s+/g, '-');
};
