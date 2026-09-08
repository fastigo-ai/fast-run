
import oncology from '../assets/oncology-AI.webp'

export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  type: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  image: string;
  sector: string;
  category: string;
  description: string;
}



export const caseStudiesByCategory: Record<string, CaseStudy[]> = {
  "E-Commerce": [
    {
      id: "ai-customer-support",
      title: "AI-Powered Customer Support",
      industry: "E-Commerce",
      type: "AI Agents",
      sector: "E-Commerce",
      category: "AI Agents",
      description: "Built an intelligent voice AI system that handles 80% of customer queries automatically, reducing support costs by 60%.",
      challenge: "A fast-growing e-commerce company was drowning in customer queries. Their support team was overwhelmed handling thousands of repetitive questions daily about order status, returns, refunds, and product information. Response times were slow, customer satisfaction was dropping, and hiring more support staff was becoming unsustainably expensive.",
      solution: "Fastigo designed and deployed an intelligent AI voice and chat agent system, powered by custom natural language processing models trained specifically on the client's product catalogue, FAQs, and customer interaction history. The AI agent handles incoming customer queries in real time understanding intent, pulling live order data, processing return requests, and escalating only the genuinely complex cases to human agents.",
      results: [
        "80% of all customer queries handled automatically by AI without human intervention",
        "Support costs reduced by 60% within the first 3 months",
        "Average customer response time dropped from hours to seconds",
        "Customer satisfaction scores improved significantly due to instant, accurate responses",
        "Human support team freed to focus exclusively on high-value, complex interactions"
      ],
      technologies: ["AI Voice Agents", "NLP", "Custom ML Models", "CRM Integration", "Omnichannel Deployment"],
      image: "/case_study_ai_support_1776144867075.png"
    },
    {
      id: "logistics-automation-platform",
      title: "Logistics Automation Platform",
      industry: "E-Commerce",
      type: "Integration",
      sector: "E-Commerce",
      category: "Integration",
      description: "Shiprocket integration with AI-powered route optimization, reducing delivery times by 25%.",
      challenge: "A growing e-commerce business was struggling with delivery inefficiencies—late shipments, poor route planning, high last-mile delivery costs, and zero real-time visibility. Their manual dispatch process was creating bottlenecks during peak seasons.",
      solution: "Fastigo integrated Shiprocket as the logistics backbone and built a custom AI-powered route optimisation layer on top of it intelligently assigning delivery routes based on real-time traffic data, delivery density, and package priority.",
      results: [
        "Delivery times reduced by 25% through AI-powered route optimisation",
        "Last-mile delivery costs significantly reduced through smarter route assignment",
        "Real-time tracking visibility provided to both operations team and end customers",
        "Manual dispatch process replaced entirely with automated, intelligent assignment",
        "Customer complaints related to delivery delays dropped sharply within 60 days"
      ],
      technologies: ["Shiprocket Integration", "AI Route Optimisation", "Real-Time Tracking", "Automated Dispatch", "Logistics Dashboard"],
      image: "/case_study_logistics_1776144952229.png"
    }
  ],
  "Manufacturing": [
    {
      id: "smart-inventory-management",
      title: "Smart Inventory Management",
      industry: "Manufacturing",
      type: "Custom AI",
      sector: "Manufacturing",
      category: "Custom AI",
      description: "Developed a predictive analytics platform that reduced inventory holding costs by 40% through demand forecasting.",
      challenge: "A mid-sized manufacturing company was losing significant revenue to inventory mismanagement. Overstocking was tying up working capital. Understocking was causing production delays and missed delivery deadlines. Their existing inventory system was manual, reactive, and completely disconnected from demand signals.",
      solution: "Fastigo developed a custom AI-powered predictive analytics platform that integrates directly with the client's existing ERP and supply chain systems. Using machine learning models trained on historical sales data, seasonal patterns, supplier lead times, and real-time demand signals, the platform forecasts inventory requirements with high accuracy automatically triggering reorder alerts.",
      results: [
        "Inventory holding costs reduced by 40% through intelligent demand forecasting",
        "Production delays caused by stockouts eliminated almost entirely",
        "Working capital freed up significantly through leaner, smarter inventory positioning",
        "Supplier ordering process automated, reducing manual procurement work by 70%",
        "Full visibility across all warehouse locations through a unified analytics dashboard"
      ],
      technologies: ["Custom AI", "Predictive Analytics", "Machine Learning", "ERP Integration", "Real-Time Dashboard"],
      image: "/case_study_inventory_1776144894446.png"
    }
  ],
  "Banking": [
    {
      id: "unified-payment-gateway",
      title: "Unified Payment Gateway",
      industry: "Banking",
      type: "Integration",
      sector: "Banking",
      category: "Integration",
      description: "Integrated Razorpay with custom fraud detection, handling ₹10Cr+ monthly transactions with 99.9% uptime.",
      challenge: "A financial services company needed to consolidate multiple payment systems into one seamless, secure platform while maintaining the highest levels of transaction security, regulatory compliance, and uptime reliability. They were processing crores in transactions monthly across fragmented systems.",
      solution: "Fastigo integrated Razorpay as the unified payment backbone, layering it with a custom-built fraud detection engine that uses AI to analyse transaction patterns in real time and flag suspicious activity before it causes damage. The system also includes automated reconciliation and multi-currency support.",
      results: [
        "₹10Cr+ in monthly transactions processed with 99.9% uptime",
        "Fraud detection system catches suspicious transactions in real time",
        "Payment reconciliation time reduced from days to hours through automation",
        "Full regulatory compliance maintained across all transaction types",
        "Single unified dashboard replacing five previously disconnected payment systems"
      ],
      technologies: ["Razorpay Integration", "AI Fraud Detection", "Payment Automation", "Reconciliation Engine", "Security Framework"],
      image: "/case_study_banking_1776144920089.png"
    }
  ],
  "Healthcare": [
    {
      id: "healthcare-data-platform",
      title: "Healthcare Data Platform",
      industry: "Healthcare",
      type: "CRM Portal",
      sector: "Healthcare",
      category: "CRM Portal",
      description: "A prominent healthcare provider was struggling with fragmented patient data, manual scheduling processes, and siloed clinical workflows. Fastigo developed a HIPAA-compliant Patient Management System and CRM Portal from the ground up to address these systemic issues. By integrating a centralized data repository with an AI-driven appointment engine, the solution streamlined operations, reduced administrative overhead, and significantly improved patient care coordination.",
      challenge: "Background: The Need for Transformation\nIn the modern healthcare landscape, providers are under immense pressure to deliver high-quality, coordinated care while managing complex administrative and regulatory requirements. For this organization, legacy software and disconnected systems had become a significant bottleneck. They needed a unified solution that could handle the entire patient lifecycle—from intake and scheduling to clinical care and follow-ups—without compromising data security or HIPAA compliance.\n\nThe Challenge: What the Hospital Was Going Through\nPrior to engaging Fastigo, the healthcare provider faced several critical operational challenges:\n\n1. Disconnected Systems and Data Silos\nPatient data was scattered across multiple, non-integrated systems. Clinicians and administrative staff had to constantly switch between different software applications to piece together a complete patient history. This lack of a unified view led to delayed decision-making, redundant data entry, and an increased risk of medical errors.\n\n2. Manual and Error-Prone Scheduling\nAppointment scheduling was a heavily manual process. Receptionists spent hours coordinating schedules via phone, leading to frequent scheduling conflicts, long patient wait times, and high administrative costs.\n\n3. High No-Show Rates\nWithout an automated system for patient reminders, the clinic experienced high rates of missed appointments. This not only disrupted clinical workflows but also resulted in significant lost revenue and delayed patient care.\n\n4. Administrative Burden on Clinical Staff\nNurses and doctors were spending a disproportionate amount of time navigating clunky interfaces to manage clinical workflows. This administrative burden contributed to staff burnout and reduced the actual face-to-time clinicians could spend with their patients.\n\n5. Compliance Risks\nManaging patient data across disparate legacy systems made it increasingly difficult to ensure consistent compliance with strict HIPAA regulations. The organization needed a robust, secure infrastructure to mitigate the risk of data breaches and regulatory penalties.",
      solution: "The Solution: Fastigo's Healthcare Data Platform\nTo solve these challenges, Fastigo architected and deployed a comprehensive, HIPAA-compliant patient management system. The solution was built around a centralized CRM portal tailored specifically for healthcare workflows.\n\nCentralized Patient Data Repository\nWe eliminated data silos by migrating and consolidating patient records into a single, secure repository. Clinicians now have real-time access to complete patient histories, treatment plans, and diagnostic results from a unified dashboard.\n\nAI-Driven Appointment Scheduling Engine\nWe implemented an intelligent scheduling system that optimizes appointment slots based on provider availability, appointment type, and historical patient data. The AI engine simplifies booking, handles rescheduling, and provides a seamless experience for patients.\n\nAutomated Reminder System\nTo combat no-shows, the platform includes an automated reminder system that proactively notifies patients of upcoming appointments and allows for easy confirmations or cancellations.\n\nClinical Workflow Management Portal\nA custom CRM portal was designed with the end-user in mind, streamlining daily tasks for both administrative and clinical staff. It provides intuitive tools for patient intake, credentialing, and ongoing care management.\n\nConclusion\nBy replacing fragmented, manual processes with a unified, AI-enhanced digital platform, Fastigo enabled the healthcare provider to shift its focus from administrative troubleshooting back to its core mission: delivering exceptional patient care.",
      results: [
        "Unified Intelligence: Patient data is fully centralized and accessible in real-time across all departments, enabling faster, more informed clinical decisions.",
        "Optimized Scheduling: The AI-powered appointment scheduling system dramatically reduced no-shows by automating timely patient reminders.",
        "Enhanced Efficiency: Clinical workflow efficiency improved significantly, drastically reducing the administrative workload on doctors and nurses.",
        "Robust Security: Full HIPAA compliance was established and maintained across all patient data storage, transmission, and access points.",
        "Elevated Patient Care: Patient satisfaction scores saw a marked improvement due to faster service, reduced wait times, and more coordinated care delivery."
      ],
      technologies: ["HIPAA-Compliant Architecture", "AI Scheduling", "CRM Portal", "Patient Data Management", "Automated Reminders"],
      image: oncology
    }
  ],
  "Startup": [
    {
      id: "startup-growth-app",
      title: "Startup Growth App",
      industry: "Startup",
      type: "App Development",
      sector: "Startup",
      category: "App Development",
      description: "Cross-platform mobile app with real-time analytics dashboard, achieving 50K+ downloads in 3 months.",
      challenge: "An early-stage startup needed a high-quality, scalable app built quickly one that could handle rapid user growth without breaking, and give their team real-time visibility into user behaviour and growth metrics.",
      solution: "Fastigo built a cross-platform mobile application using React Native deployable simultaneously on iOS and Android. The app was integrated with a real-time analytics dashboard that gives live visibility into user acquisition, engagement, and retention metrics.",
      results: [
        "50,000+ downloads achieved within the first 3 months of launch",
        "Simultaneous iOS and Android deployment from a single React Native codebase",
        "Real-time analytics dashboard giving leadership full visibility into growth metrics",
        "App performance maintained consistently as user base scaled rapidly",
        "Time to market significantly reduced compared to native development approach"
      ],
      technologies: ["React Native", "iOS/Android", "Real-Time Analytics", "Scalable Cloud Architecture", "Growth Dashboard"],
      image: "/case_study_startup_1776145021369.png"
    }
  ]
};

export const caseStudies: CaseStudy[] = Object.values(caseStudiesByCategory).flat()