import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { servicesData } from '@/data/services';
import { ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react';
import { SplitText } from '@/components/SplitText';

const ServiceDetail = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const service = serviceId ? servicesData[serviceId] : null;

    // Scroll to top on mount or service change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [serviceId]);

    if (!service) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-[#0B192C] px-4 text-center">
                <h2 className="text-4xl font-display font-bold mb-4">Service Not Found</h2>
                <p className="text-slate-500 mb-8 max-w-md">The service you are looking for might have been moved or renamed.</p>
                <Link to="/" className="bg-[#0070AD] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#005c8f] transition-colors shadow-sm">
                    Return to Homepage
                </Link>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full bg-background overflow-x-hidden pt-20">
            {/* Animated Gradient Mesh Texture */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-80">
                <motion.div
                    animate={{
                        x: [0, 100, -50, 0],
                        y: [0, -80, 50, 0],
                        scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut"
                    }}
                    className="absolute top-0 left-0 lg:left-1/4 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-[#0070AD]/10 rounded-full blur-[100px] mix-blend-multiply"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 80, 0],
                        y: [0, 100, -80, 0],
                        scale: [1, 1.1, 0.8, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-0 right-0 lg:right-1/4 w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-[#00A3E0]/10 rounded-full blur-[100px] mix-blend-multiply"
                />
            </div>
            
            {/* Breadcrumbs */}
            <div className="relative z-10 bg-white/70 backdrop-blur-md border-b border-slate-200/60 py-4">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <nav className="flex items-center gap-2 text-sm font-body">
                        <Link to="/" className="text-slate-500 hover:text-[#0070AD] transition-colors">Home</Link>
                        <span className="text-slate-300">/</span>
                        <span className="text-slate-500">Services</span>
                        <span className="text-slate-300">/</span>
                        <span className="text-[#0B192C] font-medium">{service.title}</span>
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
                                    Engineering Future
                                </span>
                                <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.1] mb-8 text-[#0B192C]">
                                    <SplitText text={service.title} className="text-[#0B192C]" />
                                </div>
                                <p className="text-xl md:text-2xl text-[#0B192C]/80 font-display font-medium leading-relaxed mb-8">
                                    {service.subtitle}
                                </p>
                                <div className="h-1 w-20 bg-[#0070AD] mb-10 rounded-full" />
                                <p className="text-[17px] text-slate-600 font-body leading-relaxed mb-12">
                                    {service.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-4">
                                    <Link to="/contact">
                                        <button className="bg-[#0070AD] text-white px-8 py-4 rounded-full font-bold hover:bg-[#005a8c] hover:shadow-[0_8px_25px_rgba(0,112,173,0.3)] hover:-translate-y-0.5 transition-all flex items-center gap-2">
                                            Contact Us
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        {/* Image Showcase */}
                        <div className="flex-1 w-full">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_12px_40px_rgba(0,112,173,0.1)] aspect-[4/3]"
                            >
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/40 via-transparent to-transparent" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features / Capabilities */}
            <section className="py-24 bg-slate-50/50 relative">
                <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                        <div className="max-w-xl">
                            <span className="text-xs font-bold tracking-widest text-[#0070AD] uppercase mb-3 block font-display">
                                What We Deliver
                            </span>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0B192C] mb-6">
                                Core Capabilities
                            </h2>
                            <p className="text-slate-600 font-body text-base sm:text-lg">
                                We combine deep domain expertise with cutting-edge engineering to deliver transformative results.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {service.features.map((feature, idx) => (
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
                                <h4 className="text-lg font-display font-bold text-[#0B192C] mb-4 group-hover:text-[#0070AD] transition-colors">
                                    {feature}
                                </h4>
                                <p className="text-sm text-slate-500 font-body leading-relaxed">
                                    Production-ready implementation focused on scalability and long-term business value.
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-[#041021] relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10 max-w-[1200px]">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8">
                        Ready to innovate?
                    </h2>
                    <p className="text-[#00A3E0] text-xl font-body mb-12 max-w-2xl mx-auto">
                        Join our ecosystem of engineering excellence and let's build the future together.
                    </p>
                    <div className="flex justify-center gap-6 flex-wrap">
                        <Link to="/contact">
                            <button className="bg-[#0070AD] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#005a8c] hover:shadow-[0_8px_25px_rgba(0,112,173,0.35)] transition-all flex items-center gap-3">
                                <MessageSquare className="w-5 h-5" />
                                Speak with an Expert
                            </button>
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

export default ServiceDetail;
