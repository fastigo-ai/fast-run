import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getSlug } from '@/data/services';
import {
  MicrosoftLogo,
  SalesforceLogo,
  AWSLogo,
  OpenAILogo,
  AnthropicLogo,
  ElevenLabsLogo,
} from '@/components/icons/AllianceLogos';

const alliances = [
  {
    logo: MicrosoftLogo,
    name: 'Microsoft',
    description: 'Strategic alliance delivering enterprise-grade Microsoft Azure cloud, Copilot AI Studio, and Azure OpenAI infrastructure.',
    color: '#00A4EF',
    bgGlow: 'rgba(0, 164, 239, 0.10)',
  },
  {
    logo: SalesforceLogo,
    name: 'Salesforce',
    description: 'Enterprise partner architecting Customer 360, Agentforce autonomous AI agents, Data Cloud, and Lightning workflows.',
    color: '#00A1E0',
    bgGlow: 'rgba(0, 161, 224, 0.10)',
  },
  {
    logo: AWSLogo,
    name: 'AWS',
    description: 'Advanced consulting partner for Amazon Web Services, Amazon Bedrock generative models, SageMaker, and serverless architectures.',
    color: '#FF9900',
    bgGlow: 'rgba(255, 153, 0, 0.10)',
  },
  {
    logo: OpenAILogo,
    name: 'OpenAI',
    description: 'Frontier AI alliance implementing specialized enterprise GPT-4o models, cognitive assistants, and autonomous reasoning agents.',
    color: '#10A37F',
    bgGlow: 'rgba(16, 163, 127, 0.10)',
  },
  {
    logo: AnthropicLogo,
    name: 'Anthropic',
    description: 'Constitutional AI partnership deploying Claude 3.5 models, advanced context reasoning, and enterprise-grade safe AI systems.',
    color: '#CC785C',
    bgGlow: 'rgba(204, 120, 92, 0.10)',
  },
  {
    logo: ElevenLabsLogo,
    name: 'ElevenLabs',
    description: 'Pioneering conversational voice alliance integrating lifelike synthetic speech, real-time voice bots, and multi-lingual voice AI.',
    color: '#1D68EE',
    bgGlow: 'rgba(29, 104, 238, 0.10)',
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
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const AllianceSection = () => {
  return (
    <section id="alliances" className="relative py-20 sm:py-28 px-4 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#0070AD]/5 blur-[220px] pointer-events-none" />

      <div className="container relative z-10 mx-auto max-w-[1240px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 sm:mb-18 text-center"
        >
          <span className="mb-3 inline-block font-display text-xs sm:text-sm font-bold tracking-widest text-[#0070AD] uppercase">
            STRATEGIC ALLIANCES
          </span>
          <h2 className="mb-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0E0A42]">
            Our Technology{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070AD] via-[#00A3E0] to-[#0070AD]">
              Partners
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600 text-sm sm:text-base font-body leading-relaxed">
            Partnering with global AI and cloud leaders to architect breakthrough digital solutions and accelerate enterprise value.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0070AD] to-[#00A3E0] rounded-full mx-auto mt-6" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
        >
          {alliances.map((alliance) => {
            const LogoComp = alliance.logo;
            return (
              <Link
                key={alliance.name}
                to={`/alliances/${getSlug(alliance.name)}`}
                className="interactive group block h-full"
              >
                <motion.div
                  variants={itemVariants}
                  className="h-full"
                >
                  <div className="bg-white/95 backdrop-blur-xl border border-slate-200/80 h-full rounded-2xl p-7 text-center transition-all duration-400 hover:-translate-y-1.5 shadow-[0_4px_24px_rgba(0,112,173,0.06)] hover:shadow-[0_20px_45px_rgba(0,112,173,0.14)] hover:border-[#0070AD]/40 flex flex-col items-center justify-between">
                    <div className="flex flex-col items-center w-full">
                      <div
                        className="mb-5 inline-flex h-16 w-16 sm:h-18 sm:w-18 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 p-3 shadow-sm border border-slate-100"
                        style={{
                          backgroundColor: alliance.bgGlow,
                        }}
                      >
                        <LogoComp className="h-9 w-9 sm:h-10 sm:w-10" />
                      </div>
                      <h3 className="mb-2 font-display text-lg sm:text-xl font-bold tracking-tight text-[#0E0A42] transition-colors duration-300 group-hover:text-[#0070AD]">
                        {alliance.name}
                      </h3>
                      <p className="font-body text-xs sm:text-[13px] leading-relaxed text-slate-600">
                        {alliance.description}
                      </p>
                    </div>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0070AD] opacity-75 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                      <span>Explore Alliance</span>
                      <span>&rarr;</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AllianceSection;
