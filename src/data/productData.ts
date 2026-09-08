import { Users, Mic, ShoppingCart, Shield, Zap, BarChart3, Clock, Lock, Globe, MessageSquare, Headphones, TrendingUp, Smartphone, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface PricingPlan {
  name: string;
  price: {
    monthly: string;
    annual: string;
  };
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export interface FeatureComparison {
  feature: string;
  starter: string | boolean;
  pro: string | boolean;
  enterprise: string | boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export interface ProductFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ProductData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  color: string; // Tailwind color class for accents
  features: ProductFeature[];
  pricing: PricingPlan[];
  comparison: FeatureComparison[];
  faqs: FAQ[];
  testimonials: Testimonial[];
}

export const products: Record<string, ProductData> = {
  "fastigox-hrms": {
    id: "fastigox-hrms",
    title: "FastigoX HRMS",
    subtitle: "Next-generation Human Resource Management",
    description: "Automate payroll, manage benefits, and track employee performance all in one unified platform designed for modern enterprises.",
    heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000",
    color: "blue",
    features: [
      { title: "Automated Payroll", description: "Run payroll in minutes with automated tax calculations and direct deposits.", icon: Zap },
      { title: "Performance Tracking", description: "Set goals, conduct reviews, and track employee progress seamlessly.", icon: BarChart3 },
      { title: "Time & Attendance", description: "Easy clock-in/out functionality with robust timesheet management.", icon: Clock },
      { title: "Secure Data", description: "Enterprise-grade encryption protecting all sensitive employee information.", icon: Lock }
    ],
    pricing: [
      {
        name: "Starter",
        price: { monthly: "$49", annual: "$39" },
        description: "Perfect for small businesses just getting started.",
        features: ["Up to 50 employees", "Basic payroll processing", "Employee self-service portal", "Email support"],
        ctaText: "Start Free Trial"
      },
      {
        name: "Pro",
        price: { monthly: "$99", annual: "$79" },
        description: "Everything you need to manage a growing team.",
        features: ["Up to 250 employees", "Advanced performance tracking", "Time & attendance tracking", "Priority support"],
        isPopular: true,
        ctaText: "Get Pro"
      },
      {
        name: "Enterprise",
        price: { monthly: "Custom", annual: "Custom" },
        description: "Advanced features and support for large organizations.",
        features: ["Unlimited employees", "Custom workflows", "Dedicated account manager", "24/7 phone support"],
        ctaText: "Contact Sales"
      }
    ],
    comparison: [
      { feature: "Max Employees", starter: "50", pro: "250", enterprise: "Unlimited" },
      { feature: "Payroll Processing", starter: true, pro: true, enterprise: true },
      { feature: "Performance Reviews", starter: false, pro: true, enterprise: true },
      { feature: "Custom Workflows", starter: false, pro: false, enterprise: true },
      { feature: "Support", starter: "Email", pro: "Priority", enterprise: "24/7 Dedicated" }
    ],
    faqs: [
      { question: "How long does it take to implement FastigoX HRMS?", answer: "Most companies can be fully up and running within 2-4 weeks, depending on data migration requirements." },
      { question: "Does it integrate with our existing accounting software?", answer: "Yes, we offer native integrations with QuickBooks, Xero, NetSuite, and many other popular accounting platforms." },
      { question: "Is employee data secure?", answer: "Absolutely. We use bank-level 256-bit AES encryption for all data at rest and in transit." }
    ],
    testimonials: [
      {
        quote: "FastigoX HRMS completely transformed how we manage our remote workforce. Payroll processing time was cut in half.",
        author: "Sarah Jenkins",
        role: "HR Director",
        company: "TechNova Inc.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
      },
      {
        quote: "The performance tracking modules have helped us align team goals with company objectives seamlessly.",
        author: "Michael Chen",
        role: "COO",
        company: "Global Logistics",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
      }
    ]
  },
  "ai-voice-agent": {
    id: "ai-voice-agent",
    title: "AI Voice Agent",
    subtitle: "Intelligent conversational voice solutions",
    description: "Deploy human-like AI voice assistants to handle customer support, sales calls, and appointment scheduling 24/7.",
    heroImage: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=2000",
    color: "purple",
    features: [
      { title: "Natural Language Processing", description: "Understands context, intent, and nuances in over 40 languages.", icon: MessageSquare },
      { title: "Zero Latency", description: "Real-time responses that feel completely natural to callers.", icon: Zap },
      { title: "Global Reach", description: "Deploy numbers in over 100 countries instantly.", icon: Globe },
      { title: "Seamless Handoff", description: "Automatically transfers complex queries to human agents with full context.", icon: Headphones }
    ],
    pricing: [
      {
        name: "Basic",
        price: { monthly: "$199", annual: "$159" },
        description: "Ideal for handling out-of-hours calls and basic FAQs.",
        features: ["1,000 minutes per month", "5 concurrent calls", "Standard voices", "Email support"],
        ctaText: "Start Free Trial"
      },
      {
        name: "Advanced",
        price: { monthly: "$499", annual: "$399" },
        description: "Perfect for high-volume customer service operations.",
        features: ["5,000 minutes per month", "20 concurrent calls", "Premium natural voices", "CRM integrations"],
        isPopular: true,
        ctaText: "Get Advanced"
      },
      {
        name: "Enterprise",
        price: { monthly: "Custom", annual: "Custom" },
        description: "Custom solutions for large call centers.",
        features: ["Unlimited minutes", "Unlimited concurrent calls", "Voice cloning", "Dedicated success manager"],
        ctaText: "Contact Sales"
      }
    ],
    comparison: [
      { feature: "Monthly Minutes", starter: "1,000", pro: "5,000", enterprise: "Unlimited" },
      { feature: "Concurrent Calls", starter: "5", pro: "20", enterprise: "Unlimited" },
      { feature: "Premium Voices", starter: false, pro: true, enterprise: true },
      { feature: "Voice Cloning", starter: false, pro: false, enterprise: true },
      { feature: "Integrations", starter: "Basic", pro: "Advanced CRM", enterprise: "Custom API" }
    ],
    faqs: [
      { question: "Can the AI understand accents?", answer: "Yes, our models are trained on diverse datasets and can accurately understand a wide variety of regional accents." },
      { question: "How long does it take to train the agent?", answer: "You can have a basic agent running in minutes. Fine-tuning on your specific business knowledge base usually takes a few days." },
      { question: "What happens if the AI doesn't know the answer?", answer: "You can configure failover rules to gracefully transfer the call to a human agent or take a message." }
    ],
    testimonials: [
      {
        quote: "Our customer satisfaction scores actually went UP after implementing the AI voice agent for after-hours support.",
        author: "Emily Rodriguez",
        role: "VP Customer Success",
        company: "HealthCare Plus",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
      },
      {
        quote: "The voice cloning feature is incredible. Our customers think they are talking to our actual sales reps.",
        author: "David Kim",
        role: "Sales Director",
        company: "AutoLead Group",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"
      }
    ]
  },
  "omni-sell-agent": {
    id: "omni-sell-agent",
    title: "Omni Sell Agent",
    subtitle: "Unified multi-channel sales automation",
    description: "Automate your sales outreach across Email, LinkedIn, WhatsApp, and SMS from a single intelligent platform.",
    heroImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=2000",
    color: "emerald",
    features: [
      { title: "Multi-Channel Sequences", description: "Build complex workflows spanning email, social, and text.", icon: TrendingUp },
      { title: "Smart Personalization", description: "AI analyzes prospect data to craft hyper-personalized messages.", icon: Settings },
      { title: "Mobile Ready", description: "Manage campaigns and respond to leads on the go.", icon: Smartphone },
      { title: "Advanced Analytics", description: "Track opens, clicks, and conversions across all channels.", icon: BarChart3 }
    ],
    pricing: [
      {
        name: "Growth",
        price: { monthly: "$79", annual: "$65" },
        description: "For small sales teams looking to scale outreach.",
        features: ["2 connected accounts", "Email & LinkedIn automation", "500 AI credits/mo", "Standard reporting"],
        ctaText: "Start Free Trial"
      },
      {
        name: "Scale",
        price: { monthly: "$199", annual: "$159" },
        description: "For established teams demanding omni-channel presence.",
        features: ["5 connected accounts", "All channels (WhatsApp/SMS)", "2,000 AI credits/mo", "Advanced analytics"],
        isPopular: true,
        ctaText: "Get Scale"
      },
      {
        name: "Enterprise",
        price: { monthly: "Custom", annual: "Custom" },
        description: "For large organizations with complex sales structures.",
        features: ["Unlimited accounts", "Custom workflows", "Unlimited AI credits", "Dedicated success manager"],
        ctaText: "Contact Sales"
      }
    ],
    comparison: [
      { feature: "Connected Accounts", starter: "2", pro: "5", enterprise: "Unlimited" },
      { feature: "Channels", starter: "Email/LI", pro: "All Channels", enterprise: "All Channels" },
      { feature: "AI Personalization", starter: "500 credits", pro: "2,000 credits", enterprise: "Unlimited" },
      { feature: "White-labeling", starter: false, pro: false, enterprise: true },
      { feature: "Reporting", starter: "Standard", pro: "Advanced", enterprise: "Custom Dashboards" }
    ],
    faqs: [
      { question: "Is this compliant with LinkedIn's terms of service?", answer: "Yes, our automation mimics human behavior with randomized delays and strict daily limits to keep your accounts safe." },
      { question: "Can I bring my own WhatsApp Business API?", answer: "Yes, we support integration with existing Twilio, MessageBird, or direct WhatsApp API setups." },
      { question: "How does the AI personalization work?", answer: "Our AI scrapes the prospect's LinkedIn profile and company website to generate highly relevant icebreakers and value props." }
    ],
    testimonials: [
      {
        quote: "Omni Sell Agent doubled our meeting book rate within the first month. The multi-channel sequences are a game changer.",
        author: "Marcus Johnson",
        role: "Head of Growth",
        company: "SaaS Rocket",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200"
      },
      {
        quote: "Finally, a tool that brings all our outreach into one dashboard. The AI personalization saves us hours every day.",
        author: "Jessica Alba",
        role: "Sales Manager",
        company: "FinTech Solutions",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
      }
    ]
  }
};
