// Data tailored for Industries, Research & Innovation, and Alliances
import { getSlug } from './services';
import Travel from '@/assets/travel.webp';
import sustainability from '@/assets/sustainability.webp';
import Edge from '@/assets/edge.webp';
import ComputerVision from '@/assets/computer-vision.webp';
import MicrosoftAlliance from '@/assets/Microsoft-Alliance.webp'
import Mobility from '@/assets/mobality.webp'
import SAP from '@/assets/SAP.webp'
import health from '../assets/healthCare.webp'
export interface CategoryItemData {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    features: string[];
    color: string;
}

export const categoryDataStore: Record<string, Record<string, CategoryItemData>> = {
    industries: {
        'healthcare-life-sciences': {
            title: 'Healthcare & Life Sciences',
            subtitle: 'Accelerating Digital Health Transformation',
            description: 'We deliver intelligent solutions that improve patient outcomes, streamline clinical trials, and ensure regulatory compliance through advanced data analytics and unified platforms.',
            image: health,
            features: ['Electronic Health Records (EHR) Integration', 'Telemedicine & Virtual Care Platforms', 'AI-Driven Clinical Trial Analytics', 'Regulatory Compliance Monitoring'],
            color: '#0070AD',
        },
        'banking-financial-services': {
            title: 'Banking & Financial Services',
            subtitle: 'Modernizing Global Financial Ecosystems',
            description: 'Empowering financial institutions with secure, scalable, and personalized digital banking experiences. We specialize in legacy modernization, open banking APIs, and advanced fraud detection AI.',
            image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80&w=1600',
            features: ['AI-Powered Fraud Detection', 'Digital Banking Portal Modernization', 'Open Banking API Frameworks', 'Anti-Money Laundering (AML) Analytics'],
            color: '#0070AD',
        },
        'telecom-media': {
            title: 'Telecom & Media',
            subtitle: 'Monetizing 5G and Next-Gen Connectivity',
            description: 'We help telecommunications and media companies optimize network operations and deliver hyper-personalized content experiences to global audiences using 5G and edge computing.',
            image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1600',
            features: ['5G Network Slicing & Monetization', 'OSS/BSS Modernization', 'Hyper-Personalized Content Engines', 'Edge Computing for Video Orchestration'],
            color: '#0070AD',
        },
        'manufacturing': {
            title: 'Manufacturing',
            subtitle: 'Industry 4.0 and Smart Productivity',
            description: 'Transforming traditional manufacturing floors into smart, data-driven factories. We leverage IoT, predictive maintenance, and digital twins to optimize production lines and global supply chains.',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600',
            features: ['AI-Driven Predictive Maintenance', 'Global Supply Chain Visibility', 'IoT Sensor Data Orchestration', 'Digital Twin Factory Simulation'],
            color: '#0070AD',
        },
        'retail-e-commerce': {
            title: 'Retail & E-Commerce',
            subtitle: 'Unified Commerce for the Modern Consumer',
            description: 'Creating seamless omnichannel retail experiences. We build intelligent e-commerce platforms, automated inventory systems, and AI-driven personalization engines that drive loyalty.',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600',
            features: ['Omnichannel Platform Integration', 'AI recommendation & Personalization', 'Inventory & Warehouse Automation', 'Dynamic Pricing Orchestration'],
            color: '#0070AD',
        },
        'energy-utilities': {
            title: 'Energy & Utilities',
            subtitle: 'Digital Foundations for a Sustainable Energy Grid',
            description: 'Navigating the energy transition with digital innovation. We specialize in smart grid optimization, renewable energy forecasting, and robust utility management systems.',
            image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1600',
            features: ['Smart Grid Analytics & Optimization', 'Renewable Energy Forecasting', 'Grid Security & Resilience', 'Smart Metering Data Orchestration'],
            color: '#0070AD',
        },
        'government-public-sector': {
            title: 'Government & Public Sector',
            subtitle: 'Citizen-Centric Digital Governance',
            description: 'Modernizing public sector infrastructure to deliver secure, transparent, and efficient services to citizens while ensuring stringent data protection and regulatory compliance.',
            image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1600',
            features: ['Secure Citizen Portals', 'Data Governance & Sovereignty', 'Legacy Modernization Strategies', 'Inter-Agency Data Interoperability'],
            color: '#0070AD',
        },
        'insurance': {
            title: 'Insurance',
            subtitle: 'Agile Insurtech and Automated Risk Management',
            description: 'Redefining insurance experiences with data-driven underwriting, telematics, and AI-powered claims processing that reduces fraud and accelerates customer payouts.',
            image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1600',
            features: ['AI-Driven Claims Processing', 'Telematics & Usage-Based Pricing', 'Predictive Underwriting Engines', 'Bancassurance Integration'],
            color: '#0070AD',
        },
        'travel-hospitality': {
            title: 'Travel & Hospitality',
            subtitle: 'Hyper-Personalized Journeys and Guest Experiences',
            description: 'Elevating the travel experience with intelligent booking engines, dynamic pricing algorithms, and personalized hospitality management systems that build brand loyalty.',
            image: Travel,
            features: ['Dynamic Pricing & Revenue Management', 'Unified Booking Multi-Platforms', 'Guest Personalization Engines', 'Contactless Hospitality Solutions'],
            color: '#0070AD',
        },
        'education-edtech': {
            title: 'Education & EdTech',
            subtitle: 'Inclusive Learning through Digital Innovation',
            description: 'Building scalable learning management systems (LMS), immersive virtual classrooms, and adaptive learning platforms that personalize education for diverse learners globally.',
            image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1600',
            features: ['Adaptive Learning AI Models', 'Immersive Virtual Classrooms', 'Scalable Enterprise LMS', 'Educational Data Analytics'],
            color: '#0070AD',
        },
        'mobility': {
            title: 'Mobility',
            subtitle: 'Engineering the Future of Intelligent Transit',
            description: 'We are committed to engineering intelligent and sustainable mobility for safer and personalized user experiences. By fusing digital, AI, and physical engineering, we deliver innovative solutions that redefine how goods and people move across Automotive, Aerospace, and Rail.',
            image: Mobility,
            features: ['Autonomous Driving Systems', 'Vehicle-to-Everything (V2X) Connectivity', 'Smart Fleet Management', 'Aerospace Engineering Solutions'],
            color: '#0070AD',
        },
        'sustainability': {
            title: 'Sustainability',
            subtitle: 'Enabling Intelligent and Responsible Production',
            description: 'Building a sustainable and responsible future by enabling intelligent products and production processes. We partner with industries across the process, plant, and manufacturing sectors to fulfill the demands of today without compromising the future.',
            image: sustainability,
            features: ['Carbon Footprint Monitoring', 'Circular Economy Frameworks', 'Smart Energy Management', 'Sustainability Reporting Tools'],
            color: '#0070AD',
        },
        'tech': {
            title: 'Tech',
            subtitle: 'Pervasive Intelligence for Modern Innovation',
            description: 'Delivering the foundational technologies that power innovation and elevate operational excellence across industries. From Medical Technology to Hi-tech, we empower human lives through cutting-edge advancements and reliable intelligent solutions.',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600',
            features: ['Next-Gen Medical Devices', 'Semiconductor Engineering', 'Consumer Electronics Innovation', 'Enterprise Software Ecosystems'],
            color: '#0070AD',
        },
    },
    research: {
        'ai-machine-learning-lab': {
            title: 'AI & Machine Learning Lab',
            subtitle: 'Accelerating the Frontier of Intelligence',
            description: 'Our core laboratory dedicated to fundamental and applied AI research. We focus on developing proprietary algorithms for deep learning and neural network optimization.',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600',
            features: ['Proprietary Algorithm Design', 'Neural Network Efficiency', 'Reinforcement Learning Research', 'Edge AI Optimization'],
            color: '#0070AD',
        },
        'blockchain-research': {
            title: 'Blockchain Research',
            subtitle: 'Architecting Decentralized Trust',
            description: 'Exploring next-generation consensus protocols, zero-knowledge proofs, and scalable decentralized networks to architect the future of secure, trustless global applications.',
            image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1600',
            features: ['Consensus Protocol Innovation', 'Zero-Knowledge Proof Research', 'Scalability & Layer-2 Labs', 'Decentralized Identity Frameworks'],
            color: '#0070AD',
        },
        'quantum-computing': {
            title: 'Quantum Computing',
            subtitle: 'Preparing for the Post-Classical Computing Era',
            description: 'Researching quantum algorithms and cryptography. We are actively developing frameworks to leverage quantum mechanics for complex enterprise optimization problems.',
            image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1600',
            features: ['Quantum Cryptography Standards', 'Post-Quantum Algorithm Research', 'Quantum-Hybrid Cloud Architectures', 'Error Correction Methodology'],
            color: '#0070AD',
        },
        // ... adding other slugs for consistency with getSlug output in MegaMenu
        'edge-computing': {
           title: 'Edge Computing',
           subtitle: 'Distributed Intelligence at the Periphery',
           description: 'Developing ultra-low latency architectures that process data close to the source, enabling real-time decisions for industrial automation and autonomous systems.',
           image: Edge,
           features: ['Low-Latency Edge Fabrics', 'Edge-to-Cloud Orchestration', 'Distributed AI Inference', 'Remote Infrastructure Security'],
           color: '#0070AD',
        },
        'digital-twin-technology': {
            title: 'Digital Twin Technology',
            subtitle: 'Multidimensional Virtual-Physical Synchronicity',
            description: 'Simulating complex physical systems in the digital realm with high fidelity. We research multidimensional modeling to predict failures and optimize global operations.',
            image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1600',
            features: ['Hifi System Modeling', 'Real-time Telemetry Sync', 'Predictive Failure Analysis', 'Operational Optimization Sim'],
            color: '#0070AD',
        },
        'natural-language-processing': {
             title: 'Natural Language Processing',
             subtitle: 'Advanced Computational Linguistics Research',
             description: 'Advancing the field of language understanding. We focus on training large language models (LLMs), semantic analysis, and highly contextual machine translation.',
             image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1600',
             features: ['Large Language Model (LLM) Tuning', 'Contextual Semantic Analysis', 'Privacy-Preserving NLP', 'Multi-Lingual Intent Parsing'],
             color: '#0070AD',
        },
        'computer-vision': {
             title: 'Computer Vision',
             subtitle: 'Intelligent Visual Perception Systems',
             description: 'Innovating visual data analysis for industrial and security applications. Our research covers real-time object detection and spatial analysis for autonomous navigation.',
             image:ComputerVision, 
             features: ['Real-Time Spatial Analysis', 'Advanced Object Tracking', 'Vision-Based Navigation', 'Behavioral Biometrics'],
             color: '#0070AD',
        },
        'robotic-process-automation': {
             title: 'Robotic Process Automation',
             subtitle: 'Next-Generation Cognitive Automation',
             description: 'Developing cognitive RPA bots that can interpret unstructured data and make autonomous routine decisions to crush enterprise complexity.',
             image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1600',
             features: ['Cognitive Document Parsing', 'Autonomous Workflow Logic', 'Self-Healing Bot Architectures', 'Integration-as-a-Bot'],
             color: '#0070AD',
        },
        'generative-ai': {
             title: 'Generative AI',
             subtitle: 'Pioneering Synthetic Intelligence Lab',
             description: 'Exploring the frontiers of generative architectures including GANs and Diffusion models to synthesize realistic enterprise data, code, and immersive media.',
             image: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=1600',
             features: ['Enterprise Diffusion Models', 'Safe Generative Frameworks', 'Code Synthesis Research', 'Synthetic Data Generation'],
             color: '#0070AD',
        },
        '5g-beyond': {
             title: '5G & Beyond',
             subtitle: 'Engineering the Next Wave of Connectivity',
             description: 'Researching the next generation of telecom infrastructure. We analyze network slicing and MIMO technologies to pave the groundwork for 6G.',
             image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=1600',
             features: ['6G Theoretical Frameworks', 'Massive MIMO Lab', 'Open RAN Architecture', 'Network Slicing Security'],
             color: '#0070AD',
        },
    },
    alliances: {
        'microsoft': {
            title: 'Microsoft Alliance',
            subtitle: 'Enterprise-Grade Cloud & AI Partnership',
            description: 'As a strategic Microsoft partner, we leverage the full Azure cloud ecosystem, M365 suite, and Copilot AI tools to architect globally scalable solutions.',
            image: MicrosoftAlliance,
            features: ['Custom Azure Architecture', 'Microsoft AI Lab Integration', 'Secure Modern Workplace', 'Dynamics 365 Optimization'],
            color: '#0070AD',
        },
        'aws': {
            title: 'AWS Alliance',
            subtitle: 'Cloud-Native Engineering Excellence',
            description: 'Partnering with Amazon Web Services to build resilient, serverless architectures, robust data lakes, and deploy advanced machine learning pipelines globally.',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600',
            features: ['Serverless Cloud-Native Dev', 'AWS Sagemaker ML Lab', 'Data Lakehouse Architecture', 'AWS Migration Acceleration'],
            color: '#0070AD',
        },
        'google-cloud': {
            title: 'Google Cloud Alliance',
            subtitle: 'Data Agility and AI-First Transformation',
            description: 'Harnessing Google Cloud Platform for unparalleled data analytics with BigQuery, scalable GKE deployments, and industry-leading security and AI models.',
            image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1600',
            features: ['BigQuery ML & Analytics', 'Google Kubernetes Engine (GKE)', 'Vertex AI Implementation', 'Google Cloud Security Lab'],
            color: '#0070AD',
        },
        'sap': {
            title: 'SAP Alliance',
            subtitle: 'The Intelligent Business Core',
            description: 'We orchestrate comprehensive SAP S/4HANA migrations and integrate disparate systems to create a unified, intelligent business core for global enterprises.',
            image: SAP,
            features: ['SAP S/4HANA Transformation', 'BTP Platform Integration', 'Process Intelligence Lab', 'SAP RISE Acceleration'],
            color: '#0070AD',
        },
        'salesforce': {
             title: 'Salesforce Alliance',
             subtitle: 'Customer-Centric CRM Ecosystems',
             description: 'Customizing Salesforce Customer 360 to connect marketing, sales, and service into one seamless, AI-driven global view of the customer.',
             image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600',
             features: ['Customer 360 Implementation', 'Salesforce AI Data Cloud', 'MuleSoft API Orchestration', 'Commerce Cloud Design'],
             color: '#0070AD',
        },
        'oracle': {
             title: 'Oracle Alliance',
             subtitle: 'Modern Database & Cloud Infrastructure',
             description: 'Leveraging Oracle Cloud Infrastructure (OCI) and autonomous database technology to manage mission-critical enterprise workloads with maximum reliability.',
             image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600',
             features: ['Oracle OCI Migration', 'Autonomous Database Ops', 'NetSuite Implementation', 'Java Enterprise Modernization'],
             color: '#0070AD',
        },
        'servicenow': {
             title: 'ServiceNow Alliance',
             subtitle: 'The Platform of Platforms for Workflow',
             description: 'Transforming IT and enterprise operations through the Now Platform. We automate silos and optimize service management across the entire organization.',
             image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=1600',
             features: ['ITSM & ITOM Automation', 'ServiceNow HRSD Design', 'Low-Code App Engine Lab', 'Platform Governance & SRE'],
             color: '#0070AD',
        },
        'adobe': {
             title: 'Adobe Alliance',
             subtitle: 'Content Velocity and Experience Excellence',
             description: 'Combining creativity and data with Adobe Experience Cloud to deliver personalized customer journeys and high-speed marketing intelligence.',
             image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1600',
             features: ['Adobe Experience Platform', 'Marketing Cloud Strategy', 'Experience Design Lab', 'Adobe Analytics Orchestration'],
             color: '#0070AD',
        },
        'pega': {
             title: 'Pega Alliance',
             subtitle: 'Agile Low-Code Business Automation',
             description: 'Deploying Pega Infinity to crush business complexity and build agile enterprise applications that adapt to changing rules in real-time.',
             image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1600',
             features: ['Pega Low-Code Lab', 'Real-Time Decisioning AI', 'Intelligent Business Process', 'Complexity Management'],
             color: '#0070AD',
        },
        'cisco': {
             title: 'Cisco Alliance',
             subtitle: 'Agile & Secure Software-Defined Networking',
             description: 'Architecting ultra-secure, software-defined networks (SDN) and robust unified communications infrastructures for global enterprise resilience.',
             image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1600',
             features: ['Cisco SD-WAN Architecture', 'Zero-Trust Network Access', 'Unified Communications Collaboration', 'Cisco DNA Center Ops'],
             color: '#0070AD',
        },
    }
};

// Aliases to fix routing mismatches from MegaMenu slugs for Research
categoryDataStore.research['ai-ml-lab'] = categoryDataStore.research['ai-machine-learning-lab'];
categoryDataStore.research['digital-twin'] = categoryDataStore.research['digital-twin-technology'];
