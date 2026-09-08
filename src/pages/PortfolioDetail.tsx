import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { caseStudies } from '@/data/portfolio';
import { ArrowLeft, CheckCircle2, MessageSquare, ExternalLink, Cpu, Globe, Rocket, ShieldCheck, Zap } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Footer from '@/components/Footer';

const PortfolioDetail = () => {
    const { id } = useParams<{ id: string }>();

    const itemData = caseStudies.find(study => study.id === id);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!itemData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4 text-center">
                <h2 className="text-4xl font-display font-bold mb-4">Case Study Not Found</h2>
                <p className="text-muted-foreground mb-8 max-w-md">The case study you are looking for might have been moved or is currently unavailable.</p>
                <Link to="/portfolio" className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-primary/30 transition-all">
                    Return to Portfolio
                </Link>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-background overflow-x-hidden">
            <AnimatedBackground />
            <div className="fixed inset-0 grid-pattern pointer-events-none z-0" />

            {/* Content Wrapper */}
            <div className="relative z-10 pt-32 pb-20">
                {/* Breadcrumbs */}
                <div className="container mx-auto px-4 max-w-[1200px] mb-12">
                    <nav className="flex items-center gap-2 text-sm font-display tracking-wider">
                        <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">HOME</Link>
                        <span className="text-muted-foreground/50">/</span>
                        <Link to="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">PORTFOLIO</Link>
                        <span className="text-muted-foreground/50">/</span>
                        <span className="text-primary font-medium">{itemData.title.toUpperCase()}</span>
                    </nav>
                </div>

                {/* Hero Section */}
                <section className="container mx-auto px-4 max-w-[1200px]">
                    <div className="block flow-root">
                        {/* Image Section */}
                        <div className="w-full lg:w-[45%] float-none lg:float-right lg:ml-12 lg:mb-8 mb-10">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative group"
                            >
                                <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl group-hover:bg-primary/30 transition-all duration-500" />
                                <div className="relative rounded-2xl overflow-hidden glass-card border-2 border-primary/20 hover:border-primary/50 transition-all duration-500 shadow-2xl mb-6">
                                    <img 
                                        src={itemData.image} 
                                        alt={itemData.title}
                                        className="w-full h-auto object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                                </div>
                                
                                {/* Separated Stats or Badge */}
                                <div className="relative px-6 py-4 glass-card rounded-xl border-2 border-primary/20 hover:border-primary/50 transition-all duration-500 shadow-2xl backdrop-blur-md">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                                            <ShieldCheck className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Project Verified</div>
                                            <div className="text-foreground font-display font-bold text-lg">Fastigo Digital Transformation</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Text Content */}
                        <div className="w-full">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-display tracking-widest uppercase mb-6 border border-primary/20">
                                    {itemData.type} | {itemData.industry}
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-8">
                                    {itemData.title}
                                </h1>
                                
                                <div className="cyber-line mb-10" />

                                <div className="space-y-12">
                                    {/* The Challenge */}
                                    <div>
                                        <h2 className="text-2xl font-display font-bold text-primary mb-4 flex items-center gap-3">
                                            <Zap className="w-6 h-6" />
                                            THE CHALLENGE
                                        </h2>
                                        <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                            {itemData.challenge}
                                        </p>
                                    </div>

                                    {/* What Fastigo Built */}
                                    <div>
                                        <h2 className="text-2xl font-display font-bold text-primary mb-4 flex items-center gap-3">
                                            <Cpu className="w-6 h-6" />
                                            WHAT FASTIGO BUILT
                                        </h2>
                                        <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                            {itemData.solution}
                                        </p>
                                    </div>

                                    {/* Results */}
                                    <div>
                                        <h2 className="text-2xl font-display font-bold text-primary mb-6 flex items-center gap-3">
                                            <Rocket className="w-6 h-6" />
                                            THE RESULTS
                                        </h2>
                                        <div className="grid gap-4">
                                            {itemData.results.map((result, idx) => (
                                                <div key={idx} className="flex items-start gap-4 glass-card p-4 rounded-xl border-l-4 border-l-primary">
                                                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                                                    <span className="text-foreground font-medium">{result}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Technologies */}
                                    <div>
                                        <h2 className="text-2xl font-display font-bold text-primary mb-6 flex items-center gap-3">
                                            <Globe className="w-6 h-6" />
                                            TECHNOLOGIES USED
                                        </h2>
                                        <div className="flex flex-wrap gap-3">
                                            {itemData.technologies.map((tech, idx) => (
                                                <span 
                                                    key={idx} 
                                                    className="px-4 py-2 rounded-lg bg-background border border-border text-sm font-medium text-muted-foreground hover:border-primary/50 hover:text-primary transition-all cursor-default"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-16 flex flex-wrap gap-6 mb-8">
                                    <Link to="/contact" className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-primary/30 transition-all">
                                        <MessageSquare className="w-5 h-5" />
                                        Discuss Similar Project
                                    </Link>
                                    <Link to="/portfolio" className="inline-flex items-center gap-3 bg-background border border-border text-foreground px-10 py-4 rounded-lg font-bold text-lg hover:border-primary transition-all">
                                        <ArrowLeft className="w-5 h-5" />
                                        Back to Portfolio
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PortfolioDetail;
