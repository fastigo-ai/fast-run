import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, MessageSquare, Clock } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useToast } from '@/hooks/use-toast';
import { SplitText } from '@/components/SplitText';
import { api } from '@/lib/api';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    value: 'Info@fastigo.co',
    description: 'For general inquiries and support'
  },
  {
    icon: Phone,
    title: 'Call Us',
    value: '+91 9217477169',
    description: 'Mon-Fri from 9am to 6pm'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: 'G-81 & G-82, Old No G-23-A PVT Office NO-201 Second Floor Laxmi Nagar, New Delhi, New Delhi, New Delhi, Delhi, India, 110092',
    description: 'Schedule an in-person meeting'
  },
  {
    icon: Clock,
    title: 'Response Time',
    value: 'Within 24 Hours',
    description: 'We respond to all inquiries quickly'
  },
];

const Contact = () => {
  useEffect(() => {
    document.title = "Contact Fastigo | Get in Touch with Fastigo Technology";
  }, []);

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await api.contact.submit({
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        service: formData.service || undefined,
        message: formData.message,
      });
      
      toast({
        title: "Message Sent!",
        description: "Thank you! We have received your inquiry and will respond within 24 hours.",
      });
      setFormData({ name: '', email: '', company: '', service: '', message: '' });
    } catch (err: any) {
      toast({
        title: "Submission Error",
        description: err.message || "Failed to send message. Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="relative min-h-screen bg-background">
      <AnimatedBackground />
      <div className="fixed inset-0 grid-pattern pointer-events-none z-0" />
      
      <div className="relative z-10">
      
        
        <main className="pt-24 sm:pt-32 pb-14 sm:pb-20">
          {/* Hero Section */}
          <section className="container mx-auto px-4 mb-14 sm:mb-20 max-w-[1200px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="mb-3 sm:mb-4 inline-block font-display text-xs sm:text-sm tracking-widest text-primary">
                GET IN TOUCH
              </span>
              <div className="mb-4 sm:mb-6 font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight flex flex-col items-center">
                <SplitText text="Let's Build" className="text-foreground" />
                <SplitText text="Something Amazing" className="text-gradient-primary" />
              </div>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Have a project in mind? We'd love to hear from you. Send us a message 
                and we'll respond as soon as possible.
              </p>
              <div className="cyber-line mx-auto max-w-md mt-6 sm:mt-8" />
            </motion.div>
          </section>

          {/* Contact Info Cards */}
          <section className="container mx-auto px-4 mb-12 sm:mb-16 max-w-[1200px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card rounded-xl p-4 sm:p-5 text-center"
                >
                  <div className="mx-auto mb-2.5 sm:mb-3 inline-flex rounded-lg bg-primary/10 p-2">
                    <info.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-xs sm:text-sm font-semibold tracking-wider text-foreground mb-1">
                    {info.title}
                  </h3>
                  <p className="text-primary font-medium text-xs sm:text-sm mb-1 break-words">{info.value}</p>
                  <p className="text-[11px] sm:text-xs text-muted-foreground">{info.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Contact Form */}
          <section className="container mx-auto px-4 max-w-[1200px]">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="glass-card rounded-2xl p-5 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Send Us a Message
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                          placeholder="Company Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                          placeholder="company@gmail.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">Company</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                          placeholder="Your Company"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">Service Interested In</label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                        >
                          <option value="">Select a service</option>
                          <option value="ai-development">Custom AI Development</option>
                          <option value="ai-agents">AI Agents</option>
                          <option value="voice-ai">Voice Call AI</option>
                          <option value="integrations">Platform Integrations</option>
                          <option value="crm">CRM Portal</option>
                          <option value="app-dev">App Development</option>
                          <option value="cybersecurity">Cybersecurity</option>
                          <option value="blockchain">Block Chain</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Your Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-display text-sm tracking-wider text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          SENDING...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          SEND MESSAGE
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="glass-card rounded-2xl p-8 glow-box">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                    Why Work With Us?
                  </h3>
                  <ul className="space-y-4">
                    {[
                      'Dedicated project manager for every engagement',
                      'Transparent pricing with no hidden costs',
                      'Agile development with weekly progress updates',
                      'Post-launch support and maintenance included',
                      'NDA and complete confidentiality guaranteed'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass-card rounded-2xl p-8">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                    Quick Project Estimate
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Need a quick estimate? Include these details in your message:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Project type and scope</li>
                    <li>• Desired timeline</li>
                    <li>• Budget range (if any)</li>
                    <li>• Technical requirements</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        
      </div>
    </div>
  );
};

export default Contact;
