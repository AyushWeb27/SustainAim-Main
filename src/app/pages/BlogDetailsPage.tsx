import React from "react";
import { Link, useParams } from "react-router";
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PublicHeader } from "../components/PublicHeader";
import { PublicFooter } from "../components/PublicFooter";

export function BlogDetailsPage() {
  const { id } = useParams();

  // Sample blog data - in a real app, this would be fetched based on the ID
  const blog = {
    id: 1,
    title: "Happy World Environment Day! 🌍🌿",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    category: "Sustain Aim Climate Solution",
    author: {
      name: "Mohit Meshram",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
      bio: "Climate Action Advocate and Sustainability Expert"
    },
    date: "Jun 5, 2024",
    readTime: "5 min read",
    content: `
      <p>Today, we celebrate the beauty and vitality of our planet, and remind ourselves of the crucial role each of us plays in protecting it. This year's theme, "Restore Our Earth," focuses on ecosystem restoration and emphasizes the urgent need to revive our damaged ecosystems to combat climate change and enhance biodiversity.</p>

      <p>Whether it's through reforestation, reducing plastic waste, conserving water, or supporting sustainable practices, every small action counts. Let's unite in our efforts to make a lasting, positive impact on our environment. Together, we can build a greener, healthier, and more sustainable future for generations to come.</p>

      <h2>Why Ecosystem Restoration Matters</h2>

      <p>Ecosystem restoration is not just about planting trees – it's about reviving entire ecosystems, from forests and wetlands to oceans and grasslands. These ecosystems are the foundation of life on Earth, providing us with clean air, water, food, and countless other resources.</p>

      <p>By restoring damaged ecosystems, we can:</p>
      <ul>
        <li>Combat climate change by capturing carbon from the atmosphere</li>
        <li>Protect biodiversity and endangered species</li>
        <li>Improve water quality and availability</li>
        <li>Create sustainable livelihoods for communities</li>
        <li>Build resilience against natural disasters</li>
      </ul>

      <h2>How You Can Take Action</h2>

      <p>Every individual has the power to make a difference. Here are some practical ways you can contribute to environmental restoration:</p>

      <h3>1. Reduce, Reuse, Recycle</h3>
      <p>The three R's remain one of the most effective ways to reduce our environmental footprint. Before buying something new, ask yourself if you really need it. Choose reusable products over single-use items, and make sure to recycle properly.</p>

      <h3>2. Support Reforestation Efforts</h3>
      <p>Trees are essential for a healthy planet. Consider supporting organizations that plant trees or participate in local tree-planting initiatives. Even planting a tree in your backyard can make a difference.</p>

      <h3>3. Conserve Water</h3>
      <p>Water is a precious resource that we often take for granted. Simple actions like fixing leaks, taking shorter showers, and using water-efficient appliances can significantly reduce water waste.</p>

      <h3>4. Choose Sustainable Products</h3>
      <p>Support businesses that prioritize sustainability and environmental responsibility. Look for eco-friendly certifications and choose products made from sustainable materials.</p>

      <h3>5. Reduce Plastic Waste</h3>
      <p>Plastic pollution is one of the biggest threats to our oceans and wildlife. Carry reusable bags, bottles, and containers to minimize your plastic consumption.</p>

      <h2>The Power of Collective Action</h2>

      <p>While individual actions are important, collective action amplifies our impact. Join the movement, take action, and share your commitment to the Earth. Together, we can create a wave of change that will protect our planet for future generations.</p>

      <p>This World Environment Day, let's commit to being stewards of our planet. Let's restore our Earth, not just for ourselves, but for all living beings who call this beautiful planet home.</p>

      <p><strong>What will you do today to make a difference? Share your actions using #RestoreOurEarth and inspire others to join the movement!</strong></p>
    `
  };

  const relatedPosts = [
    {
      id: 2,
      title: "5 Ways AI is Helping Tackle Climate Change",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      category: "AI & Climate",
      date: "Jun 5, 2024"
    },
    {
      id: 3,
      title: "Understanding Scope 3 Emissions",
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      category: "Carbon Accounting",
      date: "Dec 3, 2024"
    },
    {
      id: 4,
      title: "New CSRD Requirements: What Companies Need to Know",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      category: "ESG Reporting",
      date: "March 10, 2026"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Back Button */}
      <div className="bg-neutral-50 border-b border-neutral-200 mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-emerald-600 font-bold text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[500px] overflow-hidden">
        <ImageWithFallback
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 max-w-4xl w-full px-4">
          <span className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest">
            {blog.category}
          </span>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
        >
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 pb-8 mb-8 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <ImageWithFallback
                  src={blog.author.image}
                  alt={blog.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-black text-neutral-900 text-sm">{blog.author.name}</p>
                <p className="text-xs text-neutral-500 font-bold">{blog.author.bio}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-neutral-500 font-bold">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{blog.date}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-sm font-black text-neutral-700 uppercase tracking-widest">Share:</span>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-blue-100 flex items-center justify-center transition-colors group">
                <Facebook className="w-5 h-5 text-neutral-600 group-hover:text-blue-600" />
              </button>
              <button className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-sky-100 flex items-center justify-center transition-colors group">
                <Twitter className="w-5 h-5 text-neutral-600 group-hover:text-sky-600" />
              </button>
              <button className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-blue-100 flex items-center justify-center transition-colors group">
                <Linkedin className="w-5 h-5 text-neutral-600 group-hover:text-blue-700" />
              </button>
              <button className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-emerald-100 flex items-center justify-center transition-colors group">
                <Mail className="w-5 h-5 text-neutral-600 group-hover:text-emerald-600" />
              </button>
            </div>
          </div>

          {/* Article Body */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-black prose-headings:text-neutral-900 prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-neutral-700 prose-p:font-bold prose-p:leading-relaxed prose-p:mb-6
              prose-ul:my-6 prose-li:text-neutral-700 prose-li:font-bold prose-li:my-2
              prose-strong:text-neutral-900 prose-strong:font-black"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </motion.article>

        {/* Related Posts */}
        <div className="mt-20 mb-20">
          <h2 className="text-3xl font-black text-neutral-900 mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Link key={post.id} to={`/blogs/${post.id}`}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl overflow-hidden border-2 border-neutral-100 shadow-lg hover:shadow-xl hover:border-emerald-200 transition-all group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-black">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-neutral-500 font-bold mb-2">{post.date}</p>
                    <h3 className="font-black text-neutral-900 group-hover:text-emerald-600 transition-colors leading-tight">
                      {post.title}
                    </h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
