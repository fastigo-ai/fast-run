import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  ArrowRight, 
  Tag, 
  Share2, 
  Linkedin, 
  Twitter, 
  Facebook,
  ChevronRight,
  MessageSquare
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlogSEOHead } from "@/components/SEOHead";
import { getBlogBySlug, getRelatedBlogs, BlogPost as BlogPostType } from "@/data/blogs";
import { useEffect, useState } from "react";

const RelatedBlogCard = ({ blog }: { blog: BlogPostType }) => {
  return (
    <Link to={`/blog/${blog.slug}`}>
      <Card className="group bg-card/40 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden h-full">
        <div className="relative overflow-hidden aspect-video">
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60" />
        </div>
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-primary font-semibold">
            {blog.segment.replace("-", " ")}
          </div>
          <h4 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {blog.title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
            <Clock className="w-3 h-3" />
            {blog.readTime}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const blog = slug ? getBlogBySlug(slug) : undefined;
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  const relatedBlogs = getRelatedBlogs(blog, 3);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out this article: ${blog.title}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.shortDescription,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <BlogSEOHead seo={blog.seo} url={shareUrl} />
      
      <Navbar />

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary z-[100] origin-left shadow-[0_0_10px_rgba(var(--primary),0.5)]"
        style={{ scaleX }}
      />

      {/* Floating Social Share (Desktop) */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 z-40">
        <div className="flex flex-col gap-3 p-2 rounded-full bg-card/50 backdrop-blur-md border border-border/50">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <Share2 className="w-5 h-5" />
          </Button>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Twitter className="w-5 h-5" />
            </Button>
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </Button>
          </a>
          <div className="w-full h-px bg-border my-1" />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <MessageSquare className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Hero Section - Immersive Design */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[100px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground truncate max-w-[200px] md:max-w-none">{blog.title}</span>
            </nav>

            {/* Back Button Mobile */}
            <Link
              to="/blog"
              className="inline-flex lg:hidden items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Insights
            </Link>

            <div className="space-y-6">
              <Badge className="px-4 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold uppercase tracking-widest">
                {blog.segment.replace("-", " ")}
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-[#0E0A42] leading-[1.1] tracking-tight">
                {blog.title}
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-3xl">
                {blog.shortDescription}
              </p>

              {/* Enhanced Meta Info */}
              <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-border/50 mt-12">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-lg leading-tight">{blog.author.name}</p>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">{blog.author.role}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Published</span>
                    <span className="flex items-center gap-2 font-semibold text-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      {new Date(blog.publishDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="w-px h-10 bg-border/50 hidden md:block" />
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Read Time</span>
                    <span className="flex items-center gap-2 font-semibold text-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      {blog.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="relative px-4 lg:px-0">
        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 border border-border/50"
          >
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-[400px] md:h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Article Content */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-8"
            >
              <div
                className="prose prose-lg md:prose-xl dark:prose-invert max-w-none
                  prose-headings:text-foreground prose-headings:font-extrabold prose-headings:tracking-tight
                  prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b prose-h2:border-border/30 prose-h2:text-primary/90
                  prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-foreground/90
                  prose-p:text-muted-foreground prose-p:leading-[1.8] prose-p:mb-8 prose-p:text-lg md:prose-p:text-xl
                  prose-ul:text-muted-foreground prose-ul:space-y-4 prose-ul:mb-10 prose-ul:list-none prose-ul:pl-0
                  prose-ul:text-lg md:prose-ul:text-xl
                  prose-ol:text-muted-foreground prose-ol:space-y-4 prose-ol:mb-10
                  prose-li:text-lg md:prose-li:text-xl prose-li:relative
                  prose-strong:text-foreground prose-strong:font-bold prose-strong:bg-primary/10 prose-strong:px-1 prose-strong:rounded-md
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-foreground/90 prose-blockquote:my-10 prose-blockquote:shadow-sm
                  prose-a:text-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline hover:prose-a:decoration-2 hover:prose-a:underline-offset-4 transition-all
                  prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-12 prose-img:border prose-img:border-border/50
                  [&>ul>li]:before:content-[''] [&>ul>li]:before:absolute [&>ul>li]:before:left-[-1.5rem] [&>ul>li]:before:top-3 [&>ul>li]:before:w-2 [&>ul>li]:before:h-2 [&>ul>li]:before:bg-primary [&>ul>li]:before:rounded-full [&>ul]:pl-6"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Tags Section */}
              <div className="flex flex-wrap gap-3 mt-16 pt-12 border-t border-border/50">
                <span className="w-full text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-primary" />
                  Related Tags
                </span>
                {blog.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="px-4 py-2 bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer text-sm font-medium border border-border/50"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Social Interaction Bar */}
              <div className="flex flex-wrap items-center justify-between gap-6 mt-16 p-8 rounded-3xl bg-card/40 backdrop-blur-sm border border-border/50">
                <div className="space-y-1">
                  <p className="text-xl font-bold text-foreground">Found this helpful?</p>
                  <p className="text-muted-foreground">Share it with your network and join the conversation.</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    className="gap-2 rounded-full px-6 py-6 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    onClick={handleShare}
                  >
                    <Share2 className="w-5 h-5" />
                    Share Now
                  </Button>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-border/30 hover:bg-[#0077b5] hover:text-white transition-all duration-300"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-border/30 hover:bg-black hover:text-white transition-all duration-300"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Enhanced Author Card */}
              <div className="mt-20 group">
                <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-card to-background border border-border/50 overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full group-hover:bg-primary/10 transition-colors duration-700" />
                  
                  <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="relative shrink-0">
                      <img
                        src={blog.author.avatar}
                        alt={blog.author.name}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] object-cover border-4 border-background shadow-xl"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        Author
                      </div>
                    </div>
                    
                    <div className="text-center md:text-left">
                      <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Written By</p>
                      <h3 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">{blog.author.name}</h3>
                      <p className="text-xl font-semibold text-muted-foreground mb-6">{blog.author.role}</p>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                        Expert in AI solutions and enterprise software development at Fastigo. Helping businesses navigate the complex landscape of digital transformation and intelligent automation.
                      </p>
                      <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <Button variant="outline" className="rounded-full gap-2 px-6">
                          Follow Author
                        </Button>
                        <Button variant="ghost" className="rounded-full gap-2 px-6 hover:text-primary">
                          View All Posts
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-12">
              {/* Related Posts */}
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-foreground tracking-tight">Up Next</h3>
                    <Link to="/blog" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                      View All
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                  
                  <div className="space-y-6">
                    {relatedBlogs.map((relatedBlog) => (
                      <RelatedBlogCard key={relatedBlog.id} blog={relatedBlog} />
                    ))}
                  </div>

                  {/* High-End CTA Card */}
                  <div className="mt-12 relative group overflow-hidden rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-cyan-500 transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    
                    <div className="relative p-8 text-center text-white space-y-6">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-2 border border-white/30">
                        <MessageSquare className="w-8 h-8" />
                      </div>
                      <h4 className="text-2xl font-extrabold">Ready to start your AI journey?</h4>
                      <p className="text-white/80 font-medium">
                        Consult with our experts today and discover how Fastigo can scale your business.
                      </p>
                      <Link to="/contact" className="block">
                        <Button className="w-full py-7 bg-white text-primary hover:bg-white/90 font-bold text-lg rounded-2xl shadow-xl shadow-black/20 group">
                          Book a Consultation
                          <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Newsletter Signup */}
                  <div className="mt-12 p-8 rounded-3xl bg-card/50 border border-border/50">
                    <h4 className="text-xl font-bold text-foreground mb-2">Weekly Insights</h4>
                    <p className="text-sm text-muted-foreground mb-6">Get the latest AI trends and business strategies delivered to your inbox.</p>
                    <div className="space-y-3">
                      <input 
                        type="email" 
                        placeholder="your@email.com" 
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      />
                      <Button className="w-full rounded-xl py-6 font-bold uppercase tracking-widest text-xs">
                        Subscribe Now
                      </Button>
                      <p className="text-[10px] text-center text-muted-foreground">We respect your privacy. Unsubscribe anytime.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Footer is usually included in the main layout, but if not, it should be here */}
     
    </div>
  );
};

export default BlogPost;
