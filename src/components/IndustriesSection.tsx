import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getSlug } from '@/data/services';
import {
  Heart,
  Building2,
  Wifi,
  Factory,
  ShoppingCart,
  Zap,
  Landmark,
  Shield,
  Plane,
  GraduationCap,
} from 'lucide-react';

const industries = [
  {
    icon: Heart,
    title: 'Healthcare & Life Sciences',
    description:
      'AI-driven diagnostics, telemedicine platforms, drug discovery acceleration, and patient management systems.',
    color: 'hsl(340, 80%, 55%)',
  },
  {
    icon: Building2,
    title: 'Banking & Financial Services',
    description:
      'Secure fintech solutions, fraud detection, algorithmic trading, and intelligent banking automation.',
    color: 'hsl(210, 80%, 55%)',
  },
  {
    icon: Wifi,
    title: 'Telecom & Media',
    description:
      'Network optimization, content delivery platforms, subscriber analytics, and 5G-ready solutions.',
    color: 'hsl(190, 80%, 50%)',
  },
  {
    icon: Factory,
    title: 'Manufacturing',
    description:
      'Smart factory solutions, IoT integration, predictive maintenance, and supply chain optimization.',
    color: 'hsl(45, 80%, 55%)',
  },
  {
    icon: ShoppingCart,
    title: 'Retail & E-Commerce',
    description:
      'Personalized shopping, inventory AI, recommendation engines, and seamless omnichannel experiences.',
    color: 'hsl(160, 80%, 45%)',
  },
  {
    icon: Zap,
    title: 'Energy & Utilities',
    description:
      'Smart grid management, renewable energy optimization, predictive analytics, and sustainability solutions.',
    color: 'hsl(50, 90%, 50%)',
  },
  {
    icon: Landmark,
    title: 'Government & Public Sector',
    description:
      'Digital governance, citizen services portals, smart city infrastructure, and secure data management.',
    color: 'hsl(220, 70%, 60%)',
  },
  {
    icon: Shield,
    title: 'Insurance',
    description:
      'Claims automation, risk assessment AI, underwriting intelligence, and customer experience platforms.',
    color: 'hsl(260, 70%, 60%)',
  },
  {
    icon: Plane,
    title: 'Travel & Hospitality',
    description:
      'Booking engines, dynamic pricing, personalized travel experiences, and guest management systems.',
    color: 'hsl(15, 80%, 55%)',
  },
  {
    icon: GraduationCap,
    title: 'Education & EdTech',
    description:
      'Learning management systems, adaptive learning AI, virtual classrooms, and student analytics.',
    color: 'hsl(280, 70%, 55%)',
  },
];

const IndustriesSection = () => {
  return (
    <section
      id="industries"
      className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6"
    >
      {/* Background glow */}
      <div className="absolute top-0 left-0 h-[400px] sm:h-[500px] lg:h-[600px] w-[400px] sm:w-[500px] lg:w-[600px] rounded-full bg-primary/5 blur-[150px] lg:blur-[180px] max-w-[1200px]" />

      <div className="container relative z-10 mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-12 sm:mb-16 text-center px-2">
          <span className="mb-4 inline-block font-display text-xs sm:text-sm font-bold tracking-widest text-[#0070AD]">
            INDUSTRIES WE SERVE
          </span>

          <h2 className="mb-6 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-[#0B192C]">
            Deep Domain <br />
            <span className="text-gradient-primary">Expertise</span>
          </h2>

          <p className="mx-auto max-w-xl sm:max-w-2xl text-sm sm:text-base text-slate-600">
            Driving transformation with solutions tailored to your sector's
            unique challenges and opportunities.
          </p>

          <div className="cyber-line mx-auto max-w-xs sm:max-w-md mt-6 sm:mt-8" />
        </div>

        {/* Grid */}
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5 
          gap-5 sm:gap-6
        ">
          {industries.map((industry) => (
            <Link
              key={industry.title}
              to={`/industries/${getSlug(industry.title)}`}
              className="group transition-all duration-400 block"
            >
              <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 h-full rounded-2xl p-5 sm:p-6 text-center transition-all duration-400 hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,112,173,0.05)] hover:shadow-[0_16px_36px_rgba(0,112,173,0.12)] hover:border-[#0070AD]/40 max-w-[1200px]">

                {/* Icon */}
                <div
                  className="mx-auto max-w-[1200px] mb-4 inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${industry.color}15`,
                    boxShadow: `0 0 25px ${industry.color}20`,
                  }}
                >
                  <industry.icon
                    className="h-6 w-6 sm:h-7 sm:w-7"
                    style={{ color: industry.color }}
                  />
                </div>

                {/* Title */}
                <h3 className="mb-2 font-display text-sm sm:text-base font-bold tracking-tight text-[#0B192C] group-hover:text-[#0070AD] transition-colors duration-300">
                  {industry.title}
                </h3>

                {/* Description */}
                <p className="font-body text-xs sm:text-sm leading-relaxed text-slate-600">
                  {industry.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;

