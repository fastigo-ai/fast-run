import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Heart,
  Target,
  Zap,
  Rocket,
  CheckCircle2,
  ChevronRight,
  Briefcase,
} from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import abstractBg from "@/assets/alliance_abstract.webp"; // Re-using a generated abstract for the hero

// ----------------------------------------------------------------------
// DATA: "Why Join Us"
// ----------------------------------------------------------------------
const benefits = [
  {
    icon: Rocket,
    title: "Hyper-Growth Trajectory",
    description:
      "Work on cutting-edge AI and enterprise tech that is shaping the future, ensuring massive career acceleration.",
    color: "hsl(var(--primary))",
  },
  {
    icon: Heart,
    title: "People First Culture",
    description:
      "We believe in psychological safety, endless learning, and a supportive environment where your ideas actually matter.",
    color: "hsl(340, 80%, 55%)",
  },
  {
    icon: Zap,
    title: "High Impact Work",
    description:
      "You will not be a cog in a machine. Every line of code or strategy you write directly impacts global clients.",
    color: "hsl(45, 100%, 50%)",
  },
  {
    icon: Target,
    title: "Remote & Flexible",
    description:
      "Work from anywhere. We focus entirely on output and results, not hours spent sitting at a desk.",
    color: "hsl(140, 80%, 40%)",
  },
];

// ----------------------------------------------------------------------
// DATA: Open Positions (Requested by User)
// ----------------------------------------------------------------------
const openPositions = [
  {
    id: "ai-developer-intern",
    title: "AI Developer Intern",
    department: "Engineering & Research",
    location: "Remote / New Delhi",
    type: "Internship (3-6 Months)",
    description:
      "Dive into the deep end of Artificial Intelligence. You will be working shoulder-to-shoulder with our senior architects to train models, build AI Agents, and deploy LLM applications for real-world enterprise use cases.",
    requirements: [
      "Strong foundational knowledge of Python and Machine Learning concepts.",
      "Experience (academic or personal projects) with PyTorch or TensorFlow.",
      "Familiarity with NLP, LLMs (OpenAI, Anthropic APIs), and LangChain is a major plus.",
      "A hungry, problem-solving mindset and willingness to learn extremely fast.",
    ],
  },
  {
    id: "seo-marketing",
    title: "SEO Marketing Specialist",
    department: "Marketing & Growth",
    location: "Remote",
    type: "Full-time",
    description:
      "Drive the organic growth engine of Fastigo. You will be responsible for architecting and executing advanced SEO strategies, content architectures, and technical site audits to dominate search rankings in the highly competitive B2B tech space.",
    requirements: [
      "2+ years of hardcore SEO experience, preferably in B2B Tech or SaaS.",
      "Mastery of technical SEO, schema markup, and site architecture optimization.",
      "Experience with tools like Ahrefs, SEMrush, Screaming Frog, and Google Search Console.",
      "Data-driven approach to content mapping and keyword strategy.",
    ],
  },
  {
    id: "bdm-presales",
    title: "Business Dev Manager (BDM) - Pre-Sales",
    department: "Sales & Strategy",
    location: "",
    type: "Full-time",
    description:
      "We are seeking a motivated and results-driven Business Development Representative to join our growing technology team. This role is ideal for someone with 1-2 years of experience who is passionate about driving growth, building relationships, and expanding our market presence in the software industry",
    requirements: [
      "1-2 years of experience in business development, sales, or a related role, preferably in the technology or software industry",
      "Bachelor's degree in Business, Marketing, Computer Science, or a related field",
      "Proven track record of meeting or exceeding sales targets",
      "Experience with CRM software (Salesforce, HubSpot, Zoho, or similar)",
    ],
  },
  {
    id: "it-sales",
    title: "IT Sales Executive",
    department: "Sales",
    location: "Remote / New Delhi",
    type: "Full-time",
    description:
      "Fuel our global expansion. You will be responsible for full-cycle B2B sales—prospecting, pitching, and closing deals for our core IT services (App Dev, Cyber, Cloud migration). We need a relentless closer who understands the value of premium technology services.",
    requirements: [
      "2+ years of direct B2B tech/IT service selling experience.",
      "Proven ability to build a robust pipeline via outbound prospecting (Cold Calling, LinkedIn, Email).",
      "Strong negotiation skills and ability to manage complex sales cycles.",
      "Hunger for immense uncapped commission potential and career growth.",
    ],
  },
];

// ----------------------------------------------------------------------
// DATA: Hiring Timeline
// ----------------------------------------------------------------------
const hiringTimeline = [
  {
    step: "01",
    title: "Application Review",
    desc: "We carefully read every application. No bots, just humans looking for passion and potential.",
  },
  {
    step: "02",
    title: "Introductory Call",
    desc: "A quick 30-minute chat to align on expectations, culture fit, and your career goals.",
  },
  {
    step: "03",
    title: "Technical / Skill Assessment",
    desc: "A practical, real-world task or pair-programming session. We respect your time; no whiteboard puzzles.",
  },
  {
    step: "04",
    title: "Final Interview & Offer",
    desc: "A conversation with the leadership team, followed closely by a transparent, competitive offer.",
  },
];

// ----------------------------------------------------------------------
// COMPONENTS
// ----------------------------------------------------------------------

const InteractiveBenefitCard = ({
  benefit,
}: {
  benefit: (typeof benefits)[0];
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 200 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width - 0.5;
    const yPct = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="interactive group perspective-[1000px] h-full"
    >
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass-card h-full rounded-2xl p-8 transition-all duration-300 hover:glow-box hover:border-primary/50 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${benefit.color}, transparent 70%)`,
          }}
        />

        <div
          className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
          style={{
            backgroundColor: `${benefit.color}15`,
            boxShadow: `0 0 20px ${benefit.color}20`,
            transform: "translateZ(30px)",
          }}
        >
          <benefit.icon
            className="h-7 w-7 transition-transform duration-300"
            style={{ color: benefit.color }}
          />
        </div>

        <h3
          className="mb-3 font-display text-xl font-bold tracking-wide text-foreground transition-colors duration-300 group-hover:text-primary relative"
          style={{ transform: "translateZ(25px)" }}
        >
          {benefit.title}
        </h3>

        <p
          className="font-body text-sm leading-relaxed text-muted-foreground relative"
          style={{ transform: "translateZ(20px)" }}
        >
          {benefit.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

const JobCard = ({
  job,
  onClick,
}: {
  job: (typeof openPositions)[0];
  onClick: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="rounded-2xl border border-white/15 bg-black p-6 md:p-8 cursor-pointer group hover:border-primary/60 transition-all duration-300 relative overflow-hidden"
      onClick={onClick}
    >
      {/* Subtle hover glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500 pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary uppercase tracking-wider">
              {job.department}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary/10 text-secondary-foreground uppercase tracking-wider">
              {job.type}
            </span>
          </div>
          <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">
            {job.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-white/65">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
            {job.location}
          </div>
        </div>

        <div className="flex items-center gap-3 text-primary font-semibold group-hover:translate-x-2 transition-transform">
          View Details
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// MAIN PAGE
// ----------------------------------------------------------------------
const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<
    (typeof openPositions)[0] | null
  >(null);
  const [isApplying, setIsApplying] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden">
      <AnimatedBackground />
      <div className="fixed inset-0 grid-pattern pointer-events-none z-0" />

      <div className="relative z-10 w-full flex flex-col min-h-screen pt-32 pb-20">
        {/* 1. HERO SECTION */}
        <section className="container mx-auto px-4 mb-20 md:mb-32 relative max-w-[1200px]">
          <div className="rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-16 border border-white/15 bg-black overflow-hidden relative">
            {/* Background Image/Glow */}
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.15 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 pointer-events-none"
            >
              <img
                src={abstractBg}
                alt="Careers Background"
                className="w-full h-full object-cover mix-blend-screen"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </motion.div>

            <div className="relative z-10 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-primary"
              >
                <Briefcase className="w-5 h-5" />
                <span className="font-display font-semibold tracking-wide uppercase text-sm">
                  Join The Mission
                </span>
              </motion.div>

              <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
                Build Technologies <br />
                <span className="text-gradient-primary">That Matter.</span>
              </h1>

              <p className="text-xl text-white/70 leading-relaxed mb-10">
                We don't hire employees; we partner with visionaries. If you are
                obsessed with pushing the boundaries of AI, Cloud, and
                Enterprise Tech, you belong here.
              </p>

              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() =>
                  document
                    .getElementById("open-positions")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 rounded-full font-bold text-black transition-all shadow-lg hover:scale-105 bg-primary shadow-[0_0_30px_hsl(190,100%,50%,0.4)]"
              >
                View Open Positions
              </motion.button>
            </div>
          </div>
        </section>

        {/* 2. WHY JOIN US GRID */}
        <section className="container mx-auto px-4 mb-32 max-w-[1200px]">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Why Fastigo?
            </h2>
            <div className="cyber-line mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <InteractiveBenefitCard key={idx} benefit={benefit} />
            ))}
          </div>
        </section>

        {/* 3. HIRING TIMELINE */}
        <section className="container mx-auto px-4 mb-32 max-w-[1200px]">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Our Hiring Process
            </h2>
            <p className="text-muted-foreground  max-w-xl mx-auto">
              Fast, transparent, and designed to discover your true potential
              without wasting your time.
            </p>
            <div className="cyber-line mx-auto mt-6" />
          </div>

          <div className="max-w-5xl mx-auto relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

            <div className="grid lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
              {hiringTimeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-16 h-16 rounded-full bg-card border-2 border-primary border-dashed flex items-center justify-center font-display font-bold text-xl text-primary mb-6 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/10 shadow-[0_0_20px_rgba(0,0,0,0)] group-hover:shadow-[0_0_20px_hsl(190,100%,50%,0.3)]">
                    {item.step}
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. OPEN POSITIONS */}
        <section
          id="open-positions"
          className="container mx-auto px-4 relative z-20 max-w-[1200px]"
        >
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Open Roles
            </h2>
            <div className="cyber-line mx-auto" />
          </div>

          <div className="max-w-5xl mx-auto space-y-4">
            {openPositions.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={() => setSelectedJob(job)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* 5. JOB DETAIL MODAL OVERLAY */}
      {selectedJob && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm bg-background/80">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl border-primary/30 p-6 md:p-10 hide-scrollbar shadow-2xl relative"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary uppercase tracking-wider">
                    {selectedJob.department}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary/10 text-secondary-foreground uppercase tracking-wider">
                    {selectedJob.type}
                  </span>
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                  {selectedJob.title}
                </h2>
                <div className="text-muted-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  {selectedJob.location}
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedJob(null);
                  setIsApplying(false);
                  setIsSubmitted(false);
                }}
                className="px-4 py-2 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full transition-colors font-semibold text-sm"
              >
                Close
              </button>
            </div>

            {!isApplying ? (
              <>
                <div className="space-y-6 mb-10">
                  <div className="p-4 rounded-xl bg-card border border-border">
                    <h4 className="font-display font-semibold text-primary mb-2">
                      Role Overview
                    </h4>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {selectedJob.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-display font-semibold text-lg mb-4">
                      What We're Looking For
                    </h4>
                    <ul className="space-y-3">
                      {selectedJob.requirements.map((req, idx) => (
                        <li key={idx} className="flex flex-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground leading-relaxed">
                            {req}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4 border-t border-border pt-6">
                  <button
                    onClick={() => setIsApplying(true)}
                    className="flex-1 py-4 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-[0_0_20px_hsl(190,100%,50%,0.3)]"
                  >
                    Apply for this role
                  </button>
                </div>
              </>
            ) : isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_hsl(190,100%,50%,0.4)]">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-3xl font-display font-bold mb-4">
                  Application Submitted!
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
                  Thank you for your interest in joining Fastigo. Our recruiting
                  team will review your profile and reach out within 48 hours if
                  there's a match.
                </p>
                <button
                  onClick={() => {
                    setSelectedJob(null);
                    setIsApplying(false);
                    setIsSubmitted(false);
                  }}
                  className="px-8 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-full transition-colors font-semibold"
                >
                  Return to Careers
                </button>
              </motion.div>
            ) : (
              <motion.form
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  onSubmit={async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append(
      "subject",
      `New Job Application - ${selectedJob?.title}`
    );
    formData.append("job_role", selectedJob?.title || "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        form.reset();
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  }}
  className="space-y-6"
>
  {/* Hidden Fields */}
  <input
    type="hidden"
    name="access_key"
    value="59913b8b-06dd-4458-858b-1b5583d49d22"
  />

  <input
    type="hidden"
    name="job_role"
    value={selectedJob?.title}
  />

  <input
    type="hidden"
    name="from_name"
    value="Fastigo Careers Form"
  />

  <input type="checkbox" name="botcheck" className="hidden" />

  {/* Job Info */}
  <div className="p-4 flex flex-col md:flex-row md:items-center gap-3 rounded-xl bg-primary/5 border border-primary/20 mb-6">
    <span className="hidden md:block w-2 h-2 rounded-full bg-primary" />
    <p className="text-sm text-foreground">
      You are applying for:
      <span className="font-bold text-primary block md:inline mt-1 md:mt-0">
        {selectedJob.title}
      </span>
    </p>
  </div>

  {/* Name + Email */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Full Name *
      </label>
      <input
        name="name"
        required
        type="text"
        placeholder="John Doe"
        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
      />
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Email Address *
      </label>
      <input
        name="email"
        required
        type="email"
        placeholder="john@example.com"
        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
      />
    </div>
  </div>

  {/* LinkedIn */}
  <div className="space-y-2">
    <label className="text-sm font-medium text-foreground">
      LinkedIn Profile URL
    </label>
    <input
      name="linkedin"
      type="url"
      placeholder="https://linkedin.com/in/..."
      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
    />
  </div>

  {/* Portfolio */}
  <div className="space-y-2">
    <label className="text-sm font-medium text-foreground">
      Portfolio / GitHub / Website (Optional)
    </label>
    <input
      name="portfolio"
      type="url"
      placeholder="https://..."
      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
    />
  </div>

  {/* Message */}
  <div className="space-y-2">
    <label className="text-sm font-medium text-foreground">
      Why are you a good fit?
    </label>
    <textarea
      name="message"
      rows={4}
      placeholder="Tell us succinctly why you belong at Fastigo..."
      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"
    />
  </div>

  {/* Buttons */}
  <div className="flex flex-col-reverse md:flex-row gap-4 border-t border-border pt-6 mt-6">
    <button
      type="button"
      onClick={() => setIsApplying(false)}
      className="w-full md:w-auto px-6 py-4 bg-muted text-muted-foreground font-bold rounded-xl hover:bg-muted/80 transition-colors"
    >
      Back
    </button>

    <button
      type="submit"
      className="flex-1 py-4 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-[0_0_20px_hsl(190,100%,50%,0.3)]"
    >
      Submit Application
    </button>
  </div>
</motion.form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Careers;
