import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { categoryDataStore } from '@/data/categoryData';
import { ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react';
import { caseStudies } from '@/data/portfolio';

const CategoryDetail = () => {
    const { category, itemSlug } = useParams<{ category: string; itemSlug: string }>();
    const solutionsRef = useRef<HTMLDivElement>(null);

    // Resolve data based on URL parameters
    const getCategoryData = () => {
        if (!category || !itemSlug) return null;
        const validCategory = categoryDataStore[category.toLowerCase()];
        if (validCategory) {
            return validCategory[itemSlug];
        }
        return null;
    };

    const itemData = getCategoryData();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [itemSlug, category]);

    const handleExploreSolutions = () => {
        solutionsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const relatedCaseStudies = caseStudies.filter(cs => {
        if (!itemData) return false;
        const searchStr = `${cs.industry} ${cs.sector} ${cs.category}`.toLowerCase();
        const targetStr = itemData.title.toLowerCase();
        const words = targetStr.split(/\s+/).filter(w => w.length > 3 && w !== "services");
        return words.some(w => searchStr.includes(w)) || searchStr.includes(targetStr.split(' ')[0]);
    });
    const displayCaseStudies = relatedCaseStudies.length > 0 ? relatedCaseStudies : caseStudies.slice(0, 3);

    if (!itemData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-[#0070ad] px-4 text-center">
                <h2 className="text-4xl font-display font-bold mb-4">Content Not Found</h2>
                <p className="text-slate-500 mb-8 max-w-md">The page you are looking for might be under development or has been moved.</p>
                <Link to="/" className="bg-[#0070AD] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#005c8f] transition-colors shadow-sm">
                    Return to Homepage
                </Link>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full bg-background overflow-x-hidden pt-20">
            {/* Breadcrumbs */}
            <div className="bg-white/70 backdrop-blur-md border-b border-slate-200/60 py-4">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <nav className="flex items-center gap-2 text-sm font-body">
                        <Link to="/" className="text-slate-500 hover:text-[#0070AD] transition-colors">Home</Link>
                        <span className="text-slate-300">/</span>
                        <span className="text-slate-500 capitalize">{category}</span>
                        <span className="text-slate-300">/</span>
                        <span className="text-[#0070ad] font-medium">{itemData.title}</span>
                    </nav>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-10 pb-20 lg:pt-16 lg:pb-32 overflow-hidden border-b border-slate-200/60">
                <div className="container mx-auto px-4 relative z-10 max-w-[1200px]">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        {/* Text Content */}
                        <div className="flex-1 max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="inline-block px-4 py-1.5 rounded-lg bg-blue-50 text-[#0070AD] text-xs font-bold tracking-widest uppercase mb-6 border border-blue-100">
                                    {category?.replace('-', ' ')} Expertise
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#0E0A42] leading-[1.1] mb-8">
                                    {itemData.title}
                                </h1>
                                <p className="text-xl md:text-2xl text-[#0070ad]/80 font-display font-medium leading-relaxed mb-8">
                                    {itemData.subtitle}
                                </p>
                                <div className="h-1 w-20 bg-[#0070AD] mb-10 rounded-full" />
                                <p className="text-[17px] text-slate-600 font-body leading-relaxed mb-12">
                                    {itemData.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-4">
                                    <button 
                                        onClick={handleExploreSolutions}
                                        className="bg-[#0070AD] text-white px-8 py-4 rounded-full text-base font-bold tracking-wide hover:bg-[#005a8c] hover:shadow-[0_8px_25px_rgba(0,112,173,0.3)] hover:-translate-y-0.5 transition-all flex items-center gap-2"
                                    >
                                        Explore Solutions
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                    <Link to="/contact">
                                        <button className="bg-white border-2 border-slate-200 text-[#0070ad] px-8 py-4 rounded-full text-base font-bold hover:border-[#0070AD] hover:text-[#0070AD] transition-all">
                                            Strategic Roadmap
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        {/* Image Side */}
                        <div className="flex-1 w-full lg:w-auto">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,112,173,0.1)] border border-slate-200/80"
                            >
                                <img 
                                    src={itemData.image} 
                                    alt={itemData.title}
                                    className="w-full h-[350px] lg:h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0070ad]/40 to-transparent" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                        <div className="max-w-xl">
                            <span className="text-xs font-bold tracking-widest text-[#0070AD] uppercase mb-3 block font-display">
                                Strategic Capabilities
                            </span>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0E0A42] mb-6">
                                Delivering Measurable Impact
                            </h2>
                            <p className="text-slate-600 font-body text-base sm:text-lg">
                                We accelerate business value through specialized domain knowledge and technical engineering excellence.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {itemData.features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 border border-slate-200/80 rounded-2xl hover:border-[#0070AD]/40 hover:shadow-xl hover:shadow-[#0070AD]/10 hover:-translate-y-1 transition-all group bg-white"
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-[#0070AD] transition-colors">
                                    <CheckCircle2 className="w-6 h-6 text-[#0070AD] group-hover:text-white" />
                                </div>
                                <h4 className="text-lg font-display font-bold text-[#0070ad] mb-4 tracking-tight leading-snug group-hover:text-[#0070AD] transition-colors">
                                    {feature}
                                </h4>
                                <p className="text-sm text-slate-500 font-body leading-relaxed">
                                    Tailored digital strategy focused on operational resilience and competitive advantage.
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related Solutions / Case Studies Section */}
            <section ref={solutionsRef} className="py-24 bg-slate-50/60 border-b border-slate-200/60">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0E0A42] mb-6">
                                Client Case Studies & Solutions
                            </h2>
                            <p className="text-slate-600 font-body text-base sm:text-lg">
                                Discover how we have implemented robust, scalable solutions for clients in {itemData.title}.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {displayCaseStudies.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-[#0070AD]/10 hover:-translate-y-1 transition-all duration-400 flex flex-col h-full"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={project.image} 
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0070ad]/80 to-transparent" />
                                    <div className="absolute top-4 right-4">
                                        <span className="text-[10px] font-display tracking-wider text-white bg-white/20 border border-white/20 backdrop-blur-md px-3 py-1 rounded-full uppercase">
                                            {project.sector}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 border-b border-slate-100 flex-none">
                                    <span className="text-xs font-display font-bold tracking-wider text-[#0070AD] uppercase">
                                        {project.category}
                                    </span>
                                    <h3 className="mt-2 font-display text-xl font-bold text-[#0070ad] group-hover:text-[#0070AD] transition-colors line-clamp-2">
                                        {project.title}
                                    </h3>
                                </div>

                                <div className="p-6 flex-grow flex flex-col justify-between">
                                    <p className="text-sm text-slate-500 font-body mb-6 line-clamp-3">
                                        {project.description}
                                    </p>
                                    
                                    <Link 
                                        to={`/portfolio/${project.id}`}
                                        className="inline-flex items-center gap-2 text-sm text-[#0070AD] font-display font-bold tracking-wider group/link mt-auto"
                                    >
                                        VIEW CASE STUDY
                                        <ArrowRight className="h-4 w-4 transform transition-transform group-hover/link:translate-x-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-[#041021] relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10 max-w-[1200px]">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8">
                        Define your digital future.
                    </h2>
                    <p className="text-[#00A3E0] text-xl font-body mb-12 max-w-2xl mx-auto">
                        Connect with our strategic consultants to build a roadmap for excellence.
                    </p>
                    <div className="flex justify-center gap-6 flex-wrap">
                        <Link to="/contact" className="bg-[#0070AD] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#005a8c] hover:shadow-[0_8px_25px_rgba(0,112,173,0.35)] transition-all flex items-center gap-3">
                            <MessageSquare className="w-5 h-5" />
                            Consult with Experts
                        </Link>
                    </div>
                </div>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full grid-pattern" />
                </div>
            </section>
        </div>
    );
};

export default CategoryDetail;
