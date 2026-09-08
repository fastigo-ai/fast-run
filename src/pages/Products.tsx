import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { SplitText } from '@/components/SplitText';

import { Link } from 'react-router-dom';
import { products } from '@/data/productData';

const showcaseProducts = Object.values(products).map((product, index) => ({
  id: product.id,
  title: product.title,
  subtitle: product.subtitle,
  description: product.description,
  image: product.heroImage,
  features: product.features.map(f => f.title).slice(0, 3), // Show first 3 features
  reverse: index % 2 !== 0
}));


const Products = () => {

  return (
    <>
      <div className="min-h-screen bg-background overflow-x-hidden relative">
        
        {/* Animated Background Texture (Hero Only) */}
        <div className="absolute top-0 left-0 right-0 h-screen z-0 overflow-hidden pointer-events-none opacity-60">
            <motion.div
                animate={{ x: [0, 100, -50, 0], y: [0, -80, 50, 0], scale: [1, 1.2, 0.9, 1] }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                className="absolute top-0 left-0 lg:left-1/4 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-[#0070AD]/10 rounded-full blur-[120px] mix-blend-multiply"
            />
            <motion.div
                animate={{ x: [0, -100, 80, 0], y: [0, 100, -80, 0], scale: [1, 1.1, 0.8, 1] }}
                transition={{ duration: 25, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                className="absolute bottom-0 right-0 lg:right-1/4 w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-[#00A3E0]/10 rounded-full blur-[120px] mix-blend-multiply"
            />
        </div>

        <main className="relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-28">
          
          {/* Hero Section */}
          <div className="container mx-auto px-4 max-w-[1200px] text-center mb-20 lg:mb-32">
            <span className="mb-4 inline-block font-display text-xs sm:text-sm font-semibold tracking-widest text-[#0070AD] uppercase bg-blue-50/80 px-3.5 py-1.5 rounded-full border border-blue-100">
              Fastigo Solutions
            </span>
            <div className="mb-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight flex flex-col items-center px-4">
              <SplitText text="Enterprise-grade" className="text-[#0B192C]" />
              <SplitText text="products & infrastructure" className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070AD] via-[#0084C7] to-[#00A3E0]" />
            </div>
            <p className="text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto px-4 leading-relaxed font-normal">
              Explore our suite of high-performance cloud infrastructure, AI databases, and edge security solutions powering the world's most innovative companies.
            </p>
          </div>

          {/* Product Showcase Blocks */}
          <div className="container mx-auto px-4 sm:px-6 max-w-[1400px] space-y-24 lg:space-y-32 mb-20 lg:mb-32">
            {showcaseProducts.map((product, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-24 ${product.reverse ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Image Side */}
                <div className="flex-1 w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="relative rounded-2xl lg:rounded-[2rem] overflow-hidden shadow-xl shadow-slate-900/5 border border-slate-200/80 bg-white group w-full"
                  >
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-[300px] sm:h-[400px] lg:h-[580px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/50 via-transparent to-transparent" />
                  </motion.div>
                </div>

                {/* Text Side */}
                <div className="flex-1 max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, x: product.reverse ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="px-2 sm:px-0"
                  >
                    <span className="inline-block px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0070AD] border border-blue-100 text-xs font-semibold tracking-wider uppercase mb-4 lg:mb-6">
                      {product.subtitle}
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-[#0B192C] leading-tight mb-4 lg:mb-6 tracking-tight">
                      {product.title}
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 mb-6 lg:mb-8 leading-relaxed font-normal">
                      {product.description}
                    </p>
                    
                    <ul className="space-y-3 lg:space-y-4 mb-8 lg:mb-10">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#0070AD] shrink-0" />
                          <span className="text-sm sm:text-base text-slate-700 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link to={`/products/${product.id}`} className="inline-block">
                      <button className="bg-transparent border border-[#0070AD] text-[#0070AD] hover:bg-[#0070AD] hover:text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2 group">
                        Learn more
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Products;
