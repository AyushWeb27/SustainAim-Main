import React from "react";
import { Link } from "react-router";
import { Calendar, Clock, User, ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PublicHeader } from "../components/PublicHeader";
import { PublicFooter } from "../components/PublicFooter";

export function BlogsPage() {
  const featuredPost = {
    id: 1,
    title: "Happy World Environment Day! 🌍🌿",
    excerpt: "Today, we celebrate the beauty and vitality of our planet, and remind ourselves of the crucial role each of us plays in protecting it. This year's theme, 'Restore Our Earth,' focuses on ecosystem restoration and emphasizes the urgent need to revive our damaged ecosystems to combat climate change and enhance biodiversity.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    category: "Sustain Aim Climate Solution",
    author: "Mohit Meshram",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    date: "Jun 5, 2024",
    readTime: "5 min read"
  };

  const blogPosts = [
    {
      id: 2,
      title: "5 Ways AI is Helping Tackle Climate Change 🌿",
      excerpt: "The first step towards sustaining our planet with AI technology is to assess the current environmental challenges and identify specific areas where AI can make a meaningful impact.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      category: "AI & Climate",
      date: "Jun 5, 2024",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "Happy Earth Day",
      excerpt: "Celebrating our planet and the collective action needed to protect it for future generations.",
      image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      category: "Sustain Aim Climate Solution",
      date: "April 22, 2024",
      readTime: "3 min read"
    },
    {
      id: 4,
      title: "Science Based Targets Initiative Update",
      excerpt: "The Science Based Targets initiative has just released a statement from its board of trustees regarding the use of environmental attribute certificates, including voluntary carbon markets.",
      image: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      category: "Science Based Targets",
      date: "Jun 1, 2024",
      readTime: "6 min read"
    },
    {
      id: 5,
      title: "TCFD Recommendations Framework",
      excerpt: "The TCFD has developed a framework to help public companies and other organizations more effectively disclose climate-related risks and opportunities through their existing reporting processes.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      category: "TCFD Recommendations",
      date: "Jun 5, 2024",
      readTime: "10 min read"
    },
    {
      id: 6,
      title: "Understanding Scope 3 Emissions",
      excerpt: "Deep dive into measuring and managing Scope 3 emissions across your value chain with practical strategies.",
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      category: "Carbon Accounting",
      date: "Dec 3, 2024",
      readTime: "12 min read"
    },
    {
      id: 7,
      title: "New CSRD Requirements: What Companies Need to Know",
      excerpt: "Navigate the latest EU Corporate Sustainability Reporting Directive requirements with our comprehensive guide.",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      category: "ESG Reporting",
      date: "March 10, 2026",
      readTime: "9 min read"
    }
  ];

  const trendingPosts = [
    { id: 1, title: "The Best Homemade Masks for Face (keep the Pimples Away)", author: "Jane Cooper" },
    { id: 2, title: "17 Pictures of Medium Length Hair in Layers That Will Inspire Your New Haircut", author: "Wade Warren" },
    { id: 3, title: "13 Amazing Poems from Shel Silverstein with Valuable Life Lessons", author: "Esther Howard" },
    { id: 4, title: "9 Half-up/half-down Hairstyles for Long and Medium Hair", author: "Cameron Williamson" },
    { id: 5, title: "Life Insurance And Pregnancy: A Working Mom's Guide", author: "Jenny Wilson" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 py-20 pt-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Breadcrumbs */}
            <div className="flex items-center justify-center gap-2 mb-8 text-white/80 font-bold text-sm">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Blogs</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
              Latest Insights
            </h1>
            <p className="text-xl text-white/90 font-bold max-w-3xl mx-auto">
              Expert perspectives on sustainability, ESG trends, and climate action
            </p>
          </motion.div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Featured Post */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16"
              >
                <Link to={`/blogs/${featuredPost.id}`}>
                  <div className="bg-white rounded-3xl overflow-hidden border-2 border-neutral-100 shadow-xl hover:shadow-2xl hover:border-emerald-200 transition-all group">
                    <div className="relative h-96 overflow-hidden">
                      <ImageWithFallback
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 text-xs text-neutral-500 font-bold uppercase tracking-widest mb-4">
                        <span className="text-emerald-600">{featuredPost.category}</span>
                        <span>•</span>
                        <span>{featuredPost.date}</span>
                        <span>•</span>
                        <span>{featuredPost.readTime}</span>
                      </div>
                      <h2 className="text-3xl font-black text-neutral-900 mb-4 group-hover:text-emerald-600 transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-neutral-600 font-bold leading-relaxed mb-6">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-4 pt-6 border-t border-neutral-100">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <ImageWithFallback
                            src={featuredPost.authorImage}
                            alt={featuredPost.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-black text-neutral-900 text-sm">{featuredPost.author}</p>
                          <p className="text-xs text-neutral-500 font-bold">Author</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link to={`/blogs/${post.id}`}>
                      <div className="bg-white rounded-3xl overflow-hidden border-2 border-neutral-100 shadow-lg hover:shadow-2xl hover:border-emerald-200 transition-all group h-full">
                        <div className="relative h-56 overflow-hidden">
                          <ImageWithFallback
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-black uppercase tracking-widest">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-3 text-xs text-neutral-500 font-bold uppercase tracking-widest mb-3">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                          <h3 className="text-xl font-black text-neutral-900 mb-3 group-hover:text-emerald-600 transition-colors leading-tight">
                            {post.title}
                          </h3>
                          <p className="text-neutral-600 font-bold leading-relaxed text-sm">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              {/* Trending Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl border-2 border-neutral-100 p-8 shadow-lg sticky top-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-2xl font-black text-neutral-900">Sustainable Shopping</h3>
                </div>
                <div className="space-y-6">
                  {trendingPosts.map((post, idx) => (
                    <Link
                      key={post.id}
                      to={`/blogs/${post.id}`}
                      className="flex gap-4 group hover:bg-emerald-50 p-4 rounded-2xl transition-all -mx-4"
                    >
                      <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl flex items-center justify-center font-black text-lg">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-black text-neutral-900 text-sm mb-2 group-hover:text-emerald-600 transition-colors leading-tight">
                          {post.title}
                        </h4>
                        <p className="text-xs text-neutral-500 font-bold">{post.author}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
