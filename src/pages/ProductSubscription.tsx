import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Star, ChevronDown } from 'lucide-react';
import { products } from '@/data/productData';
import { Switch } from '@/components/ui/switch';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProductSubscription = () => {
  const { productId } = useParams<{ productId: string }>();
  const [isAnnual, setIsAnnual] = useState(false);

  // Fallback if product not found
  const product = productId ? products[productId] : null;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <h1 className="text-4xl font-display font-bold text-slate-800 mb-4">Product Not Found</h1>
        <Link to="/products" className="text-[#0070AD] hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background font-body text-slate-800 overflow-x-hidden selection:bg-blue-100">
        
        {/* Animated Background Gradients */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
          <motion.div
            animate={{ x: [0, 50, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.9, 1] }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0070AD]/15 rounded-full blur-[120px] mix-blend-multiply"
          />
          <motion.div
            animate={{ x: [0, -60, 30, 0], y: [0, 60, -30, 0], scale: [1, 1.2, 0.8, 1] }}
            transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00A3E0]/15 rounded-full blur-[120px] mix-blend-multiply"
          />
        </div>

        <main className="relative z-10 pt-32 pb-24">
          {/* Back Navigation */}
          <div className="container mx-auto px-4 lg:px-8 mb-8">
            <Link to="/products" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-[#0070AD] transition-colors group">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Products
            </Link>
          </div>

          {/* Hero Section */}
          <section className="container mx-auto px-4 lg:px-8 mb-24">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex-1 max-w-2xl"
              >
                <span className="inline-block px-3.5 py-1 mb-6 rounded-full bg-blue-50/80 border border-blue-100 text-xs font-semibold uppercase tracking-widest text-[#0070AD] shadow-sm">
                  {product.subtitle}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#0E0A42] leading-[1.1] mb-6 tracking-tight">
                  {product.title}
                </h1>
                <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed font-normal">
                  {product.description}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <button className="bg-[#0070AD] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#005c8f] hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300">
                    Get Started Now
                  </button>
                  <button className="bg-white text-[#0070ad] border border-slate-200 px-8 py-3.5 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shadow-sm">
                    Book a Demo
                  </button>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1 w-full relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-white">
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent z-10 pointer-events-none" />
                  <img 
                    src={product.heroImage} 
                    alt={product.title} 
                    className="w-full h-auto aspect-video object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="container mx-auto px-4 lg:px-8 mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0E0A42] mb-6">Simple, transparent pricing</h2>
              
              <div className="flex items-center justify-center gap-4 mt-8">
                <span className={`text-sm font-semibold ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
                <Switch 
                  checked={isAnnual} 
                  onCheckedChange={setIsAnnual}
                  className="data-[state=checked]:bg-[#0070AD]" 
                />
                <span className={`text-sm font-semibold flex items-center gap-2 ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
                  Annually
                  <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Save 20%</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {product.pricing.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                    plan.isPopular 
                      ? 'bg-[#0070ad] text-white border-[#0070ad] shadow-2xl shadow-blue-950/30 md:scale-105 z-10' 
                      : 'bg-white/80 backdrop-blur-xl border-slate-200/80 text-slate-800 shadow-lg hover:shadow-xl hover:border-[#0070AD]/30'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#0070AD] to-[#00A3E0] text-white px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-md">
                      Most Popular
                    </div>
                  )}
                  
                  <h3 className={`text-xl font-display font-bold mb-2 ${plan.isPopular ? 'text-white' : 'text-[#0070ad]'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-6 h-10 ${plan.isPopular ? 'text-slate-300' : 'text-slate-500'}`}>
                    {plan.description}
                  </p>
                  
                  <div className="mb-8">
                    <span className="text-4xl font-bold tracking-tight">
                      {isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    {plan.price.monthly !== 'Custom' && <span className={`text-sm font-medium ${plan.isPopular ? 'text-slate-300' : 'text-slate-500'}`}>/mo</span>}
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.isPopular ? 'text-[#00A3E0]' : 'text-[#0070AD]'}`} />
                        <span className={`text-sm ${plan.isPopular ? 'text-slate-200' : 'text-slate-700'}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full py-3.5 rounded-xl font-semibold transition-all duration-300 bg-[#0070AD] hover:bg-[#005a8c] text-white shadow-md hover:shadow-lg cursor-pointer">
                    {plan.ctaText}
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Feature Comparison */}
          <section className="container mx-auto px-4 lg:px-8 mb-32 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0E0A42] mb-10 text-center">Compare features</h2>
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/70">
                      <th className="p-6 font-semibold text-slate-900 w-1/4">Features</th>
                      <th className="p-6 font-semibold text-slate-900 text-center">Starter</th>
                      <th className="p-6 font-semibold text-[#0070AD] text-center bg-blue-50/60">Pro</th>
                      <th className="p-6 font-semibold text-slate-900 text-center">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.comparison.map((item, index) => (
                      <tr key={index} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <td className="p-6 text-sm font-medium text-slate-700">{item.feature}</td>
                        <td className="p-6 text-center">
                          {typeof item.starter === 'boolean' ? (
                            item.starter ? <CheckCircle2 className="w-5 h-5 text-slate-400 mx-auto" /> : <span className="text-slate-300">-</span>
                          ) : (
                            <span className="text-sm text-slate-600">{item.starter}</span>
                          )}
                        </td>
                        <td className="p-6 text-center bg-blue-50/30">
                          {typeof item.pro === 'boolean' ? (
                            item.pro ? <CheckCircle2 className="w-5 h-5 text-[#0070AD] mx-auto" /> : <span className="text-slate-300">-</span>
                          ) : (
                            <span className="text-sm font-semibold text-[#0070AD]">{item.pro}</span>
                          )}
                        </td>
                        <td className="p-6 text-center">
                          {typeof item.enterprise === 'boolean' ? (
                            item.enterprise ? <CheckCircle2 className="w-5 h-5 text-slate-900 mx-auto" /> : <span className="text-slate-300">-</span>
                          ) : (
                            <span className="text-sm text-slate-900 font-medium">{item.enterprise}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="container mx-auto px-4 lg:px-8 mb-32 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0E0A42] mb-10 text-center">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {product.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white border border-slate-200/80 rounded-xl px-6 py-2 shadow-sm [&[data-state=open]]:shadow-md transition-shadow">
                  <AccordionTrigger className="text-left font-semibold text-slate-900 hover:no-underline hover:text-[#0070AD]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed pt-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* CTA Section */}
          <section className="container mx-auto px-4 lg:px-8">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#041021] via-[#0070ad] to-[#041021] py-16 px-8 md:px-16 text-center shadow-2xl border border-slate-800">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=2000')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#041021] to-transparent"></div>
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                  Ready to transform your workflow?
                </h2>
                <p className="text-lg text-slate-300 mb-10">
                  Join thousands of companies already using {product.title} to accelerate their growth.
                </p>
                <button className="bg-[#0070AD] text-white border border-white/20 px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#005a8c] hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(0,112,173,0.4)] cursor-pointer">
                  Start Your Free Trial
                </button>
                <p className="mt-6 text-sm text-slate-400">No credit card required • 14-day free trial</p>
              </div>
            </div>
          </section>

        </main>
      </div>
    </>
  );
};

export default ProductSubscription;
