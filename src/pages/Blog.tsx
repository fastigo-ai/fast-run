import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  ArrowUpRight, 
  Brain, 
  Sparkles, 
  Search, 
  Filter, 
  BookOpen,
  SlidersHorizontal,
  BookmarkCheck,
  TrendingUp,
  Share2
} from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { aiMlBlogs, blogCategories, BlogPost } from "@/data/blogs";

const BlogCard: React.FC<{ blog: BlogPost; index: number }> = ({ blog, index }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Link to={`/blog/${blog.slug}`} className="block h-full group">
        <div className="relative h-[490px] sm:h-[540px] rounded-[28px] overflow-hidden bg-slate-950 border border-slate-200/90 shadow-[0_12px_36px_rgba(11,25,44,0.08)] hover:shadow-[0_24px_56px_rgba(0,112,173,0.25)] hover:border-[#0070AD]/40 transition-all duration-500 flex flex-col justify-between">
          
          {/* Background Image with Smooth Scale Zoom on Hover */}
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
            loading="lazy"
          />

          {/* Dark Base Vignette Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/20 transition-opacity duration-500 group-hover:opacity-95" />

          {/* Subtle Ambient Radial Highlight on Hover */}
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#0070AD]/50 via-[#0B192C]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Top Bar: Category Pill & Read Time over Image */}
          <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-black/50 text-white/95 border border-white/20 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse" />
              {blog.tags[0] || "AI / ML"}
            </span>

            <span className="inline-flex items-center gap-1 text-xs font-medium text-white/90 px-2.5 py-1 rounded-full backdrop-blur-md bg-black/40 border border-white/15">
              <Clock className="w-3 h-3 text-sky-400" />
              {blog.readTime}
            </span>
          </div>

          {/* Bottom Area: Main Title Directly Over Image in Default State + Full Details Revealed on Hover */}
          <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-end">
            
            {/* Signature Flowing Ribbon Wave Motif */}
            <div className="w-full mb-3 overflow-hidden pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity duration-500">
              <svg className="w-full h-7" viewBox="0 0 320 32" fill="none">
                <path
                  d="M0 20 C 60 6, 120 28, 180 12 C 240 0, 280 26, 320 14"
                  stroke="url(#blogWaveGrad)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M0 26 C 70 12, 140 30, 210 18 C 260 8, 290 26, 320 20"
                  stroke="url(#blogWaveGrad2)"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="blogWaveGrad" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.3" />
                    <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.95" />
                    <stop offset="80%" stopColor="#FBBF24" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="blogWaveGrad2" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Main Heading Text directly over image */}
            <h3 className="text-xl sm:text-[22px] font-display font-bold text-white tracking-tight leading-snug drop-shadow-md group-hover:text-white transition-colors duration-300 line-clamp-2">
              {blog.title}
            </h3>

            {/* DETAILS CONTAINER: Expands smoothly when hovering over the card */}
            <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-64 group-hover:opacity-100 transition-all duration-500 ease-out">
              
              {/* Short Summary Description */}
              <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-slate-200/90 font-body line-clamp-3">
                {blog.shortDescription}
              </p>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {blog.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/10 text-slate-200 backdrop-blur-sm border border-white/15"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author Info & Read Article Action */}
              <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    className="w-7 h-7 rounded-full object-cover border border-white/30"
                  />
                  <div>
                    <p className="text-xs font-semibold text-white">{blog.author.name}</p>
                    <p className="text-[10px] text-slate-300">{blog.author.role}</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 group-hover:text-white transition-colors">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-sky-400" />
                </span>
              </div>

            </div>

          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Blog: React.FC = () => {
  const category = blogCategories.find((c) => c.slug === "ai-ml");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Collect unique tags across blogs for filtering
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    aiMlBlogs.forEach((b) => b.tags.forEach((t) => tagsSet.add(t)));
    return ["all", ...Array.from(tagsSet).slice(0, 7)];
  }, []);

  // Filtered list
  const filteredBlogs = useMemo(() => {
    return aiMlBlogs.filter((blog) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag =
        selectedTag === "all" ||
        blog.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());

      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  const featuredPost = aiMlBlogs[0];
  const regularPosts = filteredBlogs.filter((b) => b.id !== featuredPost.id);

  return (
    <div className="relative min-h-screen w-full bg-white text-slate-900 overflow-x-hidden font-body selection:bg-[#0070ad] selection:text-white pt-20">
      <SEOHead
        title="AI & Machine Learning Insights | Fastigo Blog"
        description="Explore our latest insights on AI, machine learning, voice AI, autonomous agents, and enterprise AI solutions. Stay ahead with Fastigo's expert perspectives."
        keywords={["AI blog", "machine learning insights", "voice AI", "autonomous agents", "MLOps", "enterprise AI"]}
        ogTitle="AI & Machine Learning Insights | Fastigo Blog"
        ogDescription="Expert insights on AI, machine learning, and intelligent automation solutions."
        ogImage="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop"
      />
      
      {/* Ambient Neural Light Mesh Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.45, 0.3],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-1/4 w-[750px] h-[750px] bg-gradient-to-br from-[#0070AD]/8 to-sky-200/20 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-gradient-to-bl from-[#00A3E0]/8 to-blue-100/30 rounded-full blur-[130px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0070ad08_1px,transparent_1px),linear-gradient(to_bottom,#0070ad08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10">
        {/* Breadcrumb Navigation Bar */}
        <div className="border-b border-slate-200/80 bg-white/85 backdrop-blur-md py-3.5 px-4 sm:px-6">
          <div className="container mx-auto max-w-[1280px] flex items-center justify-between text-xs sm:text-sm">
            <nav className="flex items-center gap-2 text-slate-500 font-medium">
              <Link to="/" className="hover:text-[#0070AD] transition-colors">
                Home
              </Link>
              <span className="text-slate-300">/</span>
              <span className="text-[#0B192C] font-semibold">Blog &amp; Insights</span>
            </nav>
            <div className="hidden md:flex items-center gap-2 text-xs text-[#0070AD] font-mono px-3 py-1 rounded-full bg-sky-50 border border-sky-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Fastigo Publications &amp; Research</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="pt-12 sm:pt-16 pb-12 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 max-w-[1280px]">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto"
            >
              {/* Eyebrow Badge */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-sky-200 bg-sky-50/90 text-[#0070AD] text-xs font-bold tracking-wider uppercase mb-5 backdrop-blur-md shadow-sm"
              >
                <Brain className="w-3.5 h-3.5 text-[#0070AD]" />
                <span>FASTIGO PUBLICATIONS &amp; RESEARCH</span>
              </motion.div>
              
              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-[#0E0A42] mb-5 tracking-tight leading-[1.12]">
                Insights &amp; Innovations
              </h1>
              
              {/* Subtext Description */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-base sm:text-lg text-slate-600 leading-relaxed font-body max-w-2xl mx-auto"
              >
                {category?.description || "Explore cutting-edge perspectives on artificial intelligence, autonomous agentic systems, and cloud architectures reshaping enterprise technology."}
              </motion.p>

              {/* Search Box with Interactive Glow & Hover */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-8 max-w-xl mx-auto flex items-center gap-2 bg-white rounded-full p-2 border border-slate-200 shadow-[0_4px_20px_rgba(0,112,173,0.06)] focus-within:ring-2 focus-within:ring-[#0070AD]/30 focus-within:border-[#0070AD] transition-all"
              >
                <div className="pl-3.5 text-slate-400">
                  <Search className="w-4 h-4 text-[#0070AD]" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by title, topic, or keyword..."
                  className="w-full bg-transparent text-sm text-[#0B192C] placeholder:text-slate-400 focus:outline-none px-2 py-1"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="pr-3 text-xs font-semibold text-slate-400 hover:text-[#0070AD] transition-colors"
                  >
                    Clear
                  </button>
                )}
              </motion.div>

              {/* Quick Filter Tag Pills */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-2 mt-5"
              >
                {allTags.map((tag) => (
                  <motion.button
                    key={tag}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedTag(tag)}
                    className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-200 ${
                      selectedTag === tag
                        ? "bg-[#0070AD] text-white shadow-md shadow-sky-500/20"
                        : "bg-white border border-[#0070AD]/30 text-[#0070AD] hover:bg-[#0070AD] hover:text-white shadow-2xs"
                    }`}
                  >
                    {tag === "all" ? "All Topics" : tag}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Featured Headline Post (Full Bleed Editorial Portrait Card) */}
        {!searchQuery && selectedTag === "all" && featuredPost && (
          <section className="py-6 sm:py-10">
            <div className="container mx-auto px-4 sm:px-6 max-w-[1280px]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link to={`/blog/${featuredPost.slug}`} className="block group">
                  <div className="relative h-[480px] sm:h-[540px] md:h-[580px] rounded-[32px] sm:rounded-[36px] overflow-hidden bg-slate-950 border border-slate-200/90 shadow-[0_16px_48px_rgba(11,25,44,0.1)] hover:shadow-[0_28px_64px_rgba(0,112,173,0.3)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between">
                    
                    {/* Full-bleed Background Image */}
                    <img
                      src={featuredPost.featuredImage}
                      alt={featuredPost.title}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/20 transition-opacity duration-500 group-hover:opacity-90" />

                    {/* Top Bar: Badge & Publication Date */}
                    <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#E0533C] text-white shadow-md">
                          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                          Featured Analysis
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/90 px-3 py-1.5 rounded-full backdrop-blur-md bg-black/40 border border-white/20">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          {new Date(featuredPost.publishDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <span className="text-xs font-medium text-white/90 px-3 py-1.5 rounded-full backdrop-blur-md bg-black/40 border border-white/20">
                        <Clock className="w-3.5 h-3.5 inline mr-1 text-sky-400" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    {/* Bottom Content Area: Heading directly over image + Full details revealed on hover */}
                    <div className="relative z-10 p-6 sm:p-10 flex flex-col justify-end max-w-4xl">
                      
                      {/* Ribbon Wave Graphic */}
                      <div className="w-full max-w-md mb-3 overflow-hidden pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity duration-500">
                        <svg className="w-full h-8" viewBox="0 0 320 32" fill="none">
                          <path
                            d="M0 20 C 60 6, 120 28, 180 12 C 240 0, 280 26, 320 14"
                            stroke="url(#featWaveGrad)"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                          />
                          <path
                            d="M0 26 C 70 12, 140 30, 210 18 C 260 8, 290 26, 320 20"
                            stroke="url(#featWaveGrad2)"
                            strokeWidth="1"
                            strokeLinecap="round"
                          />
                          <defs>
                            <linearGradient id="featWaveGrad" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.3" />
                              <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.95" />
                              <stop offset="70%" stopColor="#FBBF24" stopOpacity="0.9" />
                              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.6" />
                            </linearGradient>
                            <linearGradient id="featWaveGrad2" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
                              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.8" />
                              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.3" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>

                      {/* Headline written over the image */}
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-display font-bold text-white tracking-tight leading-[1.18] drop-shadow-md">
                        {featuredPost.title}
                      </h2>

                      {/* Details container: smoothly reveals on hover */}
                      <div className="overflow-hidden max-h-0 md:max-h-20 group-hover:max-h-56 opacity-90 md:opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                        <p className="mt-3 text-sm sm:text-base text-slate-200 font-body leading-relaxed line-clamp-3">
                          {featuredPost.shortDescription}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-4 mt-5 pt-4 border-t border-white/15">
                          <div className="flex items-center gap-3">
                            <img
                              src={featuredPost.author.avatar}
                              alt={featuredPost.author.name}
                              className="w-10 h-10 rounded-full object-cover border border-white/30"
                            />
                            <div>
                              <p className="font-semibold text-sm text-white">{featuredPost.author.name}</p>
                              <p className="text-xs text-slate-300">{featuredPost.author.role}</p>
                            </div>
                          </div>

                          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0070AD] text-white text-sm font-semibold shadow-md group-hover:bg-[#005a8c] transition-all">
                            <span>Read Full Report</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>

                    </div>

                  </div>
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        {/* All Articles Grid */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 max-w-[1280px]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between mb-8 sm:mb-10 pb-4 border-b border-slate-200/80"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0E0A42] tracking-tight">
                  {searchQuery ? `Search Results (${filteredBlogs.length})` : "Curated Articles"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Hover over any publication to reveal key findings, executive summaries, and author details.
                </p>
              </div>

              <div className="text-xs font-semibold text-[#0070AD] hidden sm:block px-3 py-1 rounded-full bg-sky-50 border border-sky-200">
                Showing {searchQuery ? filteredBlogs.length : regularPosts.length} insights
              </div>
            </motion.div>

            {/* Cards Grid */}
            {filteredBlogs.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300"
              >
                <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-[#0B192C]">No articles found</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Try searching for a different keyword or select "All Topics".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTag("all");
                  }}
                  className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-[#0070AD] text-white hover:bg-[#005a8c] transition-colors"
                >
                  Reset Filters
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {(searchQuery ? filteredBlogs : regularPosts).map((blog, index) => (
                  <BlogCard key={blog.id} blog={blog} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Executive Consultation CTA Section */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-[1240px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="relative overflow-hidden rounded-[32px] p-8 sm:p-14 bg-gradient-to-br from-sky-50/90 via-white to-sky-100/40 border border-sky-200/80 shadow-[0_20px_50px_rgba(0,112,173,0.08)]">
                {/* Subtle Ambient Decorative Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0070AD]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-sky-100/80 border border-sky-200 text-[#0070AD] text-xs font-bold uppercase tracking-wider mb-4">
                    Fastigo Advisory &amp; Solutions
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-[#0E0A42] mb-4 tracking-tight">
                    Ready to Transform Your Enterprise with AI?
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Connect directly with Fastigo's AI architects and solutions directors to build custom models, autonomous workflows, and intelligent platforms.
                  </p>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#0070AD] hover:bg-[#005a8c] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#0070AD]/25 transition-all duration-300 shadow-md group cursor-pointer"
                    >
                      <span>Initiate Executive Consultation</span>
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;
