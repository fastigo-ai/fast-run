import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const CtaSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse position values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth out the mouse movements
    const smoothX = useSpring(mouseX, { damping: 30, stiffness: 200 });
    const smoothY = useSpring(mouseY, { damping: 30, stiffness: 200 });

    // Map mouse position to rotation values
    const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        // Get mouse position relative to the container
        const rect = containerRef.current.getBoundingClientRect();

        // Normalize coordinates between -0.5 and 0.5
        const xPct = (event.clientX - rect.left) / rect.width - 0.5;
        const yPct = (event.clientY - rect.top) / rect.height - 0.5;

        mouseX.set(xPct);
        mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
        // Reset position on leave
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section className="relative py-24 px-4 overflow-hidden">
            <div className="container relative z-10 mx-auto lg:max-w-6xl">
                {/* The CTA Banner */}
                <div
                    className="max-w-[1200px] relative rounded-3xl overflow-hidden border border-[#0070AD]/30 bg-[#041021] p-6 sm:p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 shadow-[0_20px_50px_rgba(0,112,173,0.15)]"
                    style={{
                        background: 'linear-gradient(135deg, #041021 0%, #0B192C 100%)',
                    }}
                >
                    {/* Background Ambient Glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#0070AD]/25 blur-[120px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00A3E0]/20 blur-[120px] rounded-full pointer-events-none transform -translate-x-1/2 translate-y-1/2" />

                    {/* Left Side: Content */}
                    <div className="flex-1 text-center lg:text-left z-10">
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Unlock the Power of <br />
                            <span className="text-gradient-primary">Next-Gen Technology</span>
                        </h2>

                        <p className="text-lg text-slate-300 mb-8 max-w-xl font-body">
                            Drive your business forward with our custom AI solutions, intelligent agent frameworks, and secure digital infrastructure.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <button className="px-8 py-4 rounded-full bg-[#0070AD] text-white font-bold text-base hover:bg-[#005a8c] transition-all duration-300 shadow-[0_8px_25px_rgba(0,112,173,0.35)] hover:shadow-[0_12px_30px_rgba(0,112,173,0.5)] hover:-translate-y-0.5 flex items-center gap-2 group mx-auto md:mx-0">
                                <span>GET STARTED</span>
                                <svg
                                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </motion.div>
                    </div>

                    {/* Right Side: 3D Interactive Element */}
                    <div className="flex-1 w-full flex justify-center items-center z-10 perspective-[1000px]">
                        <motion.div
                            ref={containerRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: 'preserve-3d'
                            }}
                            className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] cursor-crosshair group flex items-center justify-center"
                        >
                            {/* 3D Layers */}

                            {/* Back Layer - Glowing Ring */}
                            <motion.div
                                style={{ translateZ: -50 }}
                                className="absolute inset-0 border-2 border-secondary/30 rounded-full blur-[2px] transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Middle Layer - Data Rings */}
                            <motion.div
                                style={{ translateZ: 0 }}
                                className="absolute inset-10 border border-primary/50 rounded-full border-dashed"
                            >
                                {/* Rotating inner element */}
                                <div className="w-full h-full rounded-full border-t-2 border-b-2 border-primary animate-spin" style={{ animationDuration: '8s' }} />
                            </motion.div>

                            {/* Front Layer - Core Graphic / Soundwave style */}
                            <motion.div
                                style={{ translateZ: 50 }}
                                className="absolute inset-20 bg-gradient-to-tr from-primary/80 to-secondary/80 rounded-2xl shadow-[0_0_50px_hsl(190_100%_50%/0.5)] flex items-center justify-center overflow-hidden"
                            >
                                {/* Simulate the vertical sound bars from user's image */}
                                <div className="flex items-center justify-center h-full gap-1 w-full px-4 rotate-45">
                                    {[10, 30, 60, 100, 60, 30, 10].map((h, i) => (
                                        <div
                                            key={i}
                                            className="w-2 bg-white rounded-full mx-[2px] opacity-80 shadow-[0_0_10px_white]"
                                            style={{ height: `${h}%` }}
                                        />
                                    ))}
                                </div>
                            </motion.div>

                            {/* Absolute Foreground Layer - Play/Action Icon */}
                            <motion.div
                                style={{ translateZ: 100 }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110"
                            >
                                <svg className="w-8 h-8 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </motion.div>

                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CtaSection;
