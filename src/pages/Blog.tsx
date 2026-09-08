import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight, Brain, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SplitText } from "@/components/SplitText";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { aiMlBlogs, blogCategories, BlogPost } from "@/data/blogs";

const BlogCard = ({ blog, index }: { blog: BlogPost; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="max-w-[1200px]"
    >
      <Link to={`/blog/${blog.slug}`}>
        <Card className="group bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden h-full">
          <div className="relative overflow-hidden">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground">
              AI / ML
            </Badge>
          </div>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground max-w-[1200px]">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(blog.publishDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {blog.readTime}
              </span>
            </div>
            
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {blog.title}
            </h3>
            
            <p className="text-muted-foreground line-clamp-3">{blog.shortDescription}</p>
            
            <div className="flex flex-wrap gap-2">
              {blog.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center gap-3">
                <img
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{blog.author.name}</p>
                  <p className="text-xs text-muted-foreground">{blog.author.role}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-300" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

const Blog = () => {
  const category = blogCategories.find((c) => c.slug === "ai-ml");

  return (
    <div className="min-h-screen bg-background w-full">
      <SEOHead
        title="AI & Machine Learning Insights | Fastigo Blog"
        description="Explore our latest insights on AI, machine learning, voice AI, autonomous agents, and enterprise AI solutions. Stay ahead with Fastigo's expert perspectives."
        keywords={["AI blog", "machine learning insights", "voice AI", "autonomous agents", "MLOps", "enterprise AI"]}
        ogTitle="AI & Machine Learning Insights | Fastigo Blog"
        ogDescription="Expert insights on AI, machine learning, and intelligent automation solutions."
        ogImage="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop"
      />
      
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent " />
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Brain className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">AI / Machine Learning</span>
            </div>
            
            
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 flex flex-row justify-center gap-3 flex-wrap">
              <SplitText text="Insights &" className="text-foreground" />
              <SplitText text="Innovations" className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent" />
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {category?.description || "Explore our latest thoughts on artificial intelligence, machine learning, and how we're using these technologies to transform businesses."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link to={`/blog/${aiMlBlogs[0].slug}`}>
              <Card className="group bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={aiMlBlogs[0].featuredImage}
                      alt={aiMlBlogs[0].title}
                      className="w-full h-72 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/50 hidden md:block" />
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(aiMlBlogs[0].publishDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {aiMlBlogs[0].readTime}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-4">
                      {aiMlBlogs[0].title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-6">{aiMlBlogs[0].shortDescription}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {aiMlBlogs[0].tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <img
                        src={aiMlBlogs[0].author.avatar}
                        alt={aiMlBlogs[0].author.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-foreground">{aiMlBlogs[0].author.name}</p>
                        <p className="text-sm text-muted-foreground">{aiMlBlogs[0].author.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-2">All Articles</h2>
            <p className="text-muted-foreground">Explore all our AI & Machine Learning insights</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiMlBlogs.slice(1).map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-primary/10 via-card/50 to-cyan-500/10 border-primary/20 p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Transform Your Business with AI?
              </h2>
              <p className="text-muted-foreground mb-8">
                Let's discuss how our AI solutions can help you achieve your business goals.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 group"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </Card>
          </motion.div>
        </div>
      </section>

      
    </div>
  );
};

export default Blog;
