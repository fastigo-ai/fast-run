import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Target,
  Zap,
  Rocket,
  CheckCircle2,
  ChevronRight,
  Briefcase,
  Search,
  MapPin,
  Clock,
  IndianRupee,
  Sparkles,
  Layers,
  X,
  Send,
  Building,
} from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import abstractBg from "@/assets/alliance_abstract.webp";
import { api, Job, ApplicationInput } from "@/lib/api";
import ResumeUploadArea from "@/components/ResumeUploadArea";

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
// Interactive Benefit Card
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

// ----------------------------------------------------------------------
// Dynamic Job Card
// ----------------------------------------------------------------------
const DynamicJobCard = ({
  job,
  onClick,
}: {
  job: Job;
  onClick: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm hover:shadow-xl hover:border-[#0070AD]/60 p-6 md:p-8 cursor-pointer group transition-all duration-300 relative overflow-hidden backdrop-blur-md"
      onClick={onClick}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#0070AD]/5 rounded-full blur-2xl group-hover:bg-[#0070AD]/15 transition-colors duration-500 pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#0070AD]/10 text-[#0070AD] uppercase tracking-wider">
              {job.department}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 uppercase tracking-wider">
              {job.job_type}
            </span>
            {job.experience && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                {job.experience}
              </span>
            )}
          </div>

          <h3 className="text-2xl font-display font-bold text-slate-900 group-hover:text-[#0070AD] transition-colors">
            {job.title}
          </h3>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#0070AD]" />
              {job.location}
            </span>
            {job.salary && (
              <span className="flex items-center gap-1.5 font-medium text-emerald-600">
                <IndianRupee className="w-4 h-4" />
                {job.salary.replace(/\$/g, '₹').replace(/^₹\s*/, '')}
              </span>
            )}
          </div>

          {/* Skills tags */}
          {job.skills && job.skills.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {job.skills.slice(0, 5).map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-600 text-xs font-mono border border-slate-200"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 5 && (
                <span className="text-xs text-slate-400">+{job.skills.length - 5} more</span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 text-[#0070AD] font-semibold group-hover:translate-x-2 transition-transform shrink-0">
          <span>View Details &amp; Apply</span>
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// MAIN CAREERS PAGE
// ----------------------------------------------------------------------
const Careers = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Job & Application Form States
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [appError, setAppError] = useState<string | null>(null);

  // Application Form Inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    experience_years: '',
    message: '',
    resume_url: '',
    resume_name: '',
  });

  const fetchPublicJobs = async () => {
    setIsLoading(true);
    try {
      const data = await api.jobs.list({
        department: selectedDept !== 'All' ? selectedDept : undefined,
        job_type: selectedType !== 'All' ? selectedType : undefined,
        search: searchQuery || undefined,
      });
      setJobs(data);
    } catch (err) {
      console.error('Failed to load published jobs from backend:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPublicJobs();
  }, [selectedDept, selectedType]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPublicJobs();
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setIsSubmitting(true);
    setAppError(null);

    const payload: ApplicationInput = {
      job_id: selectedJob.id,
      job_title: selectedJob.title,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      linkedin: formData.linkedin || undefined,
      portfolio: formData.portfolio || undefined,
      experience_years: formData.experience_years || undefined,
      message: formData.message || undefined,
      resume_url: formData.resume_url || undefined,
    };

    try {
      await api.applications.submit(payload);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        linkedin: '',
        portfolio: '',
        experience_years: '',
        message: '',
        resume_url: '',
        resume_name: '',
      });
    } catch (err: any) {
      setAppError(err.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const departments = [
    'All',
    'Engineering & Research',
    'Marketing & Growth',
    'Sales & Strategy',
    'Sales',
    'Cloud & Infrastructure',
  ];

  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden font-body selection:bg-[#0070ad] selection:text-white">
      <AnimatedBackground />
      <div className="fixed inset-0 grid-pattern pointer-events-none z-0" />

      <div className="relative z-10 w-full flex flex-col min-h-screen pt-32 pb-20">
        {/* 1. HERO SECTION */}
        <section className="container mx-auto px-4 mb-20 md:mb-28 relative max-w-[1240px]">
          <div className="rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-16 border border-white/20 bg-gradient-to-br from-black via-slate-950 to-slate-900 shadow-2xl overflow-hidden relative">
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.2 }}
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
                className="inline-flex items-center gap-2.5 mb-6 px-4 py-1.5 rounded-full border border-[#0070AD]/40 bg-[#0070AD]/15 backdrop-blur-md text-[#38bdf8]"
              >
                <Briefcase className="w-4 h-4" />
                <span className="font-display font-semibold tracking-wide uppercase text-xs">
                  Join Fastigo AI &amp; Engineering
                </span>
              </motion.div>

              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold mb-6 text-white leading-[1.1] tracking-tight">
                Build Your Future <br />
                <span className="text-gradient-primary">With Fastigo.</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
                We partner with bold visionaries to engineer autonomous AI systems, cloud platforms, and enterprise digital solutions. Explore active openings and accelerate your impact.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={() =>
                    document
                      .getElementById("open-positions")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-8 py-3.5 rounded-full font-bold text-white transition-all shadow-lg hover:scale-105 bg-gradient-to-r from-[#0070AD] to-[#00A3E0] shadow-[#0070AD]/30 cursor-pointer text-sm sm:text-base"
                >
                  Explore {jobs.length > 0 ? `${jobs.length} ` : ''}Open Positions
                </motion.button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. WHY JOIN US GRID */}
        <section className="container mx-auto px-4 mb-28 max-w-[1240px]">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Why Fastigo?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              Empowering innovators with true autonomy, rapid trajectory, and world-class AI challenges.
            </p>
            <div className="cyber-line mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <InteractiveBenefitCard key={idx} benefit={benefit} />
            ))}
          </div>
        </section>

        {/* 3. HIRING TIMELINE */}
        <section className="container mx-auto px-4 mb-28 max-w-[1240px]">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Our Hiring Process
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              Fast, human-centric, and structured to assess your real-world creativity without delays.
            </p>
            <div className="cyber-line mx-auto mt-4" />
          </div>

          <div className="max-w-5xl mx-auto relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#0070AD]/30 to-transparent -translate-y-1/2" />

            <div className="grid lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
              {hiringTimeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-[#0070AD] border-dashed flex items-center justify-center font-display font-bold text-xl text-[#0070AD] mb-5 transition-all duration-500 group-hover:scale-110 group-hover:bg-[#0070AD]/10 shadow-sm">
                    {item.step}
                  </div>
                  <h3 className="font-display font-bold text-base mb-1.5 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. OPEN POSITIONS (DYNAMIC FASTAPI FETCH) */}
        <section
          id="open-positions"
          className="container mx-auto px-4 relative z-20 max-w-[1240px]"
        >
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0070AD] bg-[#0070AD]/10 px-3 py-1 rounded-full border border-[#0070AD]/20">
              Live Hiring Board
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-2 text-foreground">
              Open Positions
            </h2>
            <p className="text-sm text-muted-foreground">
              Find the role that matches your superpowers.
            </p>
            <div className="cyber-line mx-auto mt-4" />
          </div>

          {/* Search & Filter Controls */}
          <div className="max-w-4xl mx-auto mb-8 rounded-2xl bg-white/90 border border-slate-200/80 p-4 shadow-sm backdrop-blur-md flex flex-col sm:flex-row gap-3 items-center justify-between">
            <form onSubmit={handleSearch} className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#0070AD] rounded-xl py-2 pl-10 pr-4 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-hidden"
              />
            </form>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-xl px-3 py-2 outline-hidden focus:border-[#0070AD]"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === 'All' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-xl px-3 py-2 outline-hidden focus:border-[#0070AD]"
              >
                <option value="All">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          {/* Jobs List */}
          <div className="max-w-4xl mx-auto space-y-4">
            {isLoading ? (
              <div className="space-y-4 py-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 rounded-2xl bg-slate-200/50 animate-pulse" />
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-12 text-center backdrop-blur-md">
                <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800 mb-1">No Openings Found</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
                  We are continuously expanding our talent pool. Try clearing your filters or check back soon.
                </p>
                <button
                  onClick={() => {
                    setSelectedDept('All');
                    setSelectedType('All');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-[#0070AD] text-white text-xs font-semibold rounded-xl hover:bg-[#005f94]"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              jobs.map((job) => (
                <DynamicJobCard
                  key={job.id}
                  job={job}
                  onClick={() => {
                    setSelectedJob(job);
                    setIsApplying(false);
                    setIsSubmitted(false);
                  }}
                />
              ))
            )}
          </div>
        </section>
      </div>

      {/* ── JOB DETAIL & APPLY MODAL ── */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 backdrop-blur-md bg-black/60 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-10 relative"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-6 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#0070AD]/10 text-[#0070AD] uppercase tracking-wider">
                      {selectedJob.department}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 uppercase tracking-wider">
                      {selectedJob.job_type}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                    {selectedJob.title}
                  </h2>
                  <div className="text-sm text-slate-500 flex flex-wrap items-center gap-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-[#0070AD]" />
                      {selectedJob.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {selectedJob.experience}
                    </span>
                    {selectedJob.salary && (
                      <span className="flex items-center gap-1 font-medium text-emerald-600">
                        <IndianRupee className="w-4 h-4" />
                        {selectedJob.salary.replace(/\$/g, '₹').replace(/^₹\s*/, '')}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedJob(null);
                    setIsApplying(false);
                    setIsSubmitted(false);
                  }}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* View: Job Details vs Application Form */}
              {!isApplying ? (
                <div className="space-y-6">
                  {/* Role Overview */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <h4 className="font-display font-semibold text-[#0070AD] text-sm mb-1.5 uppercase tracking-wider">
                      Role Mission &amp; Overview
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {selectedJob.description}
                    </p>
                  </div>

                  {/* Responsibilities */}
                  {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
                    <div>
                      <h4 className="font-display font-bold text-base text-slate-900 mb-3">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2.5">
                        {selectedJob.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-[#0070AD] shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-600 leading-relaxed">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Requirements */}
                  {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                    <div>
                      <h4 className="font-display font-bold text-base text-slate-900 mb-3">
                        What We're Looking For
                      </h4>
                      <ul className="space-y-2.5">
                        {selectedJob.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-600 leading-relaxed">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Skills tags */}
                  {selectedJob.skills && selectedJob.skills.length > 0 && (
                    <div>
                      <h4 className="font-display font-bold text-sm text-slate-900 mb-2">
                        Target Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 rounded-lg bg-sky-50 text-[#0070AD] text-xs font-mono font-medium border border-sky-100"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Apply Action Bar */}
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                    <button
                      onClick={() => setIsApplying(true)}
                      className="flex-1 py-3.5 bg-gradient-to-r from-[#0070AD] to-[#00A3E0] hover:from-[#005f94] hover:to-[#008ec4] text-white font-bold rounded-2xl transition-all shadow-lg shadow-[#0070AD]/25 text-sm cursor-pointer"
                    >
                      Apply For This Role Now
                    </button>
                  </div>
                </div>
              ) : isSubmitted ? (
                /* Success Screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">
                    Application Successfully Submitted!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you for applying for <strong className="text-slate-900">{selectedJob.title}</strong>. Your profile has been stored in our talent database. Our team will review your application and contact you directly.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedJob(null);
                      setIsApplying(false);
                      setIsSubmitted(false);
                    }}
                    className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
                  >
                    Close &amp; Back to Careers
                  </button>
                </motion.div>
              ) : (
                /* Application Form */
                <motion.form
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onSubmit={handleApplicationSubmit}
                  className="space-y-4"
                >
                  <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-100 flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#0070AD]" />
                    <p className="text-xs text-slate-700">
                      Applying for: <strong className="text-[#0070AD]">{selectedJob.title}</strong>
                    </p>
                  </div>

                  {appError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs">
                      {appError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#0070AD] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#0070AD] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 9876543210"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#0070AD] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Years of Experience
                      </label>
                      <input
                        type="text"
                        value={formData.experience_years}
                        onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                        placeholder="e.g. 2 years, Fresher"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#0070AD] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        LinkedIn Profile URL
                      </label>
                      <input
                        type="url"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#0070AD] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Portfolio / GitHub URL
                      </label>
                      <input
                        type="url"
                        value={formData.portfolio}
                        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#0070AD] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Cloudinary Resume / CV Upload Area */}
                  <ResumeUploadArea
                    value={formData.resume_url}
                    fileName={formData.resume_name}
                    onChange={(url, name) =>
                      setFormData({
                        ...formData,
                        resume_url: url,
                        resume_name: name,
                      })
                    }
                    onRemove={() =>
                      setFormData({
                        ...formData,
                        resume_url: '',
                        resume_name: '',
                      })
                    }
                  />

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Why are you a good fit? (Cover note)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly highlight your key strengths and why you're passionate about joining Fastigo..."
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#0070AD] rounded-xl p-3 text-xs sm:text-sm text-slate-900 outline-hidden resize-none"
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setIsApplying(false)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
                    >
                      Back to Details
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3 bg-[#0070AD] hover:bg-[#005f94] text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-[#0070AD]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting Application...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Application</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Careers;
