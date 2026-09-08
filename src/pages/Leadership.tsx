import { motion } from "framer-motion";
import { ArrowRight, Linkedin } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import FixedHeroVideo from "@/components/FixedHeroVideo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import Lalit from "@/assets/lalit4.webp";

interface Leader {
  role: string;
  name: string;
  bio: string;
  image: string;
  linkedin: string;
}

const boardOfDirectors: Leader[] = [
  {
    role: "Director & Chief Marketing Officer",
    name: "Lalit Kumar Sirsu",
    bio: "Lalit Kumar Sirsu serves as the Director & Chief Marketing Officer, bringing extensive experience in strategic marketing, institutional engagement, and public-sector collaboration. With a strong network across the Government and PSU ecosystem, he plays a key role in building high-impact partnerships and driving sustainable growth initiatives. Over the years, he has led large-scale engagement programs, strengthened stakeholder relationships, and aligned marketing strategies with governance frameworks and national digital transformation goals. His leadership combines vision, execution excellence, and policy-aligned innovation — reinforcing long-term value creation and organizational credibility.",
    image: Lalit,
    linkedin: "https://www.linkedin.com/in/lalit-kumar-86ba84bb/",
  },

  //   {
  //     role: 'CHIEF TECHNOLOGY OFFICER',
  //     name: 'Priya Sharma',
  //     bio: 'Priya Sharma serves as the CTO of Fastigo Technology, leading the company\'s research and development initiatives. A pioneer in AI and machine learning, she has filed over 15 patents and leads a team of 200+ engineers building next-generation solutions.',
  //     image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop&crop=face',
  //   },
  //   {
  //     role: 'CHIEF OPERATING OFFICER',
  //     name: 'Arun Mehta',
  //     bio: 'Arun Mehta is the COO of Fastigo Technology, responsible for global operations and delivery excellence. He brings 18 years of experience in scaling technology companies and has overseen the successful delivery of 500+ enterprise projects.',
  //     image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop&crop=face',
  //   },
];

const LeaderCard = ({ leader, index }: { leader: Leader; index: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group"
    >
      <div className="grid md:grid-cols-2 gap-0 glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/40">
        {/* Text Content */}
        <div
          className={`p-8 md:p-12 flex flex-col justify-center ${index % 2 === 1 ? "md:order-2" : ""}`}
        >
          <span className="font-display text-xs tracking-[0.3em] text-primary mb-3 block">
            {leader.role}
          </span>
          <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 tracking-tight">
            {leader.name}
          </h3>
          <p
            className={`text-muted-foreground leading-relaxed text-sm md:text-base ${!expanded ? "line-clamp-4 md:line-clamp-none" : ""}`}
          >
            {leader.bio}
          </p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="md:hidden mt-3 text-primary text-sm flex items-center gap-2"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
          <div className="mt-6 hidden md:flex items-center gap-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer interactive">
            <span className="text-sm font-medium">Read more</span>

            <ArrowRight className="h-4 w-4" />
            <a
              href={leader.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:scale-110 transition-transform duration-300"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            
          </div>
        </div>

        {/* Image */}
        <div
          className={`relative h-72 md:h-[420px] overflow-hidden ${index % 2 === 1 ? "md:order-1" : ""}`}
        >
          <img
            src={leader.image}
           
            className="w-11/12 h-full object-contain object-top transition-transform duration-700  "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </div>
      </div>
    </motion.div>
  );
};

const Leadership = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <AnimatedBackground />
      <FixedHeroVideo />
      <div className="fixed inset-0 grid-pattern pointer-events-none z-0" />

      <div className="relative z-10">
        <main className="pt-32 pb-20">
          {/* Hero */}
          <section className="container mx-auto px-4 mb-20 max-w-[1200px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="mb-4 inline-block font-display text-sm tracking-widest text-primary">
                WHO WE ARE
              </span>
              <h1 className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-6xl">
                <span className="text-foreground">Our </span>
                <span className="text-[#177ce4]">Leadership</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the visionary leaders driving Fastigo Technology's mission
                to transform businesses through cutting-edge AI and digital
                innovation.
              </p>
              <div className="cyber-line mx-auto max-w-md mt-8" />
            </motion.div>
          </section>

          {/* Board of Directors heading */}
          <section className="container mx-auto px-4 mb-12 max-w-[1200px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-xs tracking-[0.3em] text-foreground mb-2">
                BOARD OF DIRECTORS
              </h2>
              <div className="w-16 h-px bg-primary" />
            </motion.div>
          </section>

          {/* Leader Cards */}
          <section className="container mx-auto px-4 space-y-8 max-w-[1200px]">
            {boardOfDirectors.map((leader, index) => (
              <LeaderCard key={leader.name} leader={leader} index={index} />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Leadership;
