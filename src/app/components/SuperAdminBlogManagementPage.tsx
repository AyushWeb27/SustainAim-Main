import React, { useState } from "react";
import { Plus, Edit, Trash2, Search, FileText, Eye, Save, X, Calendar, User } from "lucide-react";
import { motion } from "motion/react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  authorImage: string;
  date: string;
  readTime: string;
  status: "Published" | "Draft" | "Scheduled";
  views: number;
  createdDate: string;
  updatedDate: string;
}

export function SuperAdminBlogManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [statusFilter, setStatusFilter] = useState<"All" | "Published" | "Draft" | "Scheduled">("All");

  const [blogs, setBlogs] = useState<BlogPost[]>([
    {
      id: 1,
      title: "Happy World Environment Day! 🌍🌿",
      excerpt: "Today, we celebrate the beauty and vitality of our planet, and remind ourselves of the crucial role each of us plays in protecting it.",
      content: "Full article content here...",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
      category: "Sustain Aim Climate Solution",
      author: "Mohit Meshram",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      date: "Jun 5, 2024",
      readTime: "5 min read",
      status: "Published",
      views: 1250,
      createdDate: "2024-06-01",
      updatedDate: "2024-06-05"
    },
    {
      id: 2,
      title: "5 Ways AI is Helping Tackle Climate Change 🌿",
      excerpt: "The first step towards sustaining our planet with AI technology is to assess the current environmental challenges.",
      content: "Full article content here...",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      category: "AI & Climate",
      author: "Dr. Priya Sharma",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      date: "Jun 5, 2024",
      readTime: "8 min read",
      status: "Published",
      views: 2340,
      createdDate: "2024-06-03",
      updatedDate: "2024-06-05"
    },
    {
      id: 3,
      title: "Happy Earth Day",
      excerpt: "Celebrating our planet and the collective action needed to protect it for future generations.",
      content: "Full article content here...",
      image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6",
      category: "Sustain Aim Climate Solution",
      author: "Rahul Kumar",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      date: "April 22, 2024",
      readTime: "3 min read",
      status: "Published",
      views: 890,
      createdDate: "2024-04-20",
      updatedDate: "2024-04-22"
    },
    {
      id: 4,
      title: "Science Based Targets Initiative Update",
      excerpt: "The Science Based Targets initiative has just released a statement from its board of trustees.",
      content: "Full article content here...",
      image: "https://images.unsplash.com/photo-1460472178825-e5240623afd5",
      category: "Science Based Targets",
      author: "Anita Desai",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      date: "Jun 1, 2024",
      readTime: "6 min read",
      status: "Published",
      views: 1560,
      createdDate: "2024-05-28",
      updatedDate: "2024-06-01"
    },
    {
      id: 5,
      title: "TCFD Recommendations Framework",
      excerpt: "The TCFD has developed a framework to help public companies and other organizations more effectively disclose climate-related risks.",
      content: "Full article content here...",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
      category: "TCFD Recommendations",
      author: "Vikram Singh",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      date: "Jun 5, 2024",
      readTime: "10 min read",
      status: "Published",
      views: 1980,
      createdDate: "2024-06-02",
      updatedDate: "2024-06-05"
    },
    {
      id: 6,
      title: "Understanding Scope 3 Emissions",
      excerpt: "Deep dive into measuring and managing Scope 3 emissions across your value chain with practical strategies.",
      content: "Full article content here...",
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce",
      category: "Carbon Accounting",
      author: "Sneha Patel",
      authorImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
      date: "Dec 3, 2024",
      readTime: "12 min read",
      status: "Published",
      views: 3120,
      createdDate: "2024-12-01",
      updatedDate: "2024-12-03"
    },
    {
      id: 7,
      title: "New CSRD Requirements: What Companies Need to Know",
      excerpt: "Navigate the latest EU Corporate Sustainability Reporting Directive requirements with our comprehensive guide.",
      content: "Full article content here...",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9",
      category: "ESG Reporting",
      author: "Arjun Mehta",
      authorImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      date: "March 10, 2026",
      readTime: "9 min read",
      status: "Published",
      views: 4560,
      createdDate: "2026-03-08",
      updatedDate: "2026-03-10"
    }
  ]);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    category: "",
    author: "",
    authorImage: "",
    date: new Date().toISOString().split('T')[0],
    readTime: "5 min read",
    status: "Draft" as "Published" | "Draft" | "Scheduled"
  });

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || blog.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddBlog = () => {
    const newBlog: BlogPost = {
      id: blogs.length + 1,
      ...formData,
      views: 0,
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0]
    };
    setBlogs([...blogs, newBlog]);
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleEditBlog = () => {
    if (selectedBlog) {
      setBlogs(blogs.map(blog => 
        blog.id === selectedBlog.id 
          ? { ...blog, ...formData, updatedDate: new Date().toISOString().split('T')[0] }
          : blog
      ));
      setIsEditModalOpen(false);
      setSelectedBlog(null);
      resetForm();
    }
  };

  const handleDeleteBlog = (id: number) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setBlogs(blogs.filter(blog => blog.id !== id));
    }
  };

  const openEditModal = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      category: blog.category,
      author: blog.author,
      authorImage: blog.authorImage,
      date: blog.date,
      readTime: blog.readTime,
      status: blog.status
    });
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      image: "",
      category: "",
      author: "",
      authorImage: "",
      date: new Date().toISOString().split('T')[0],
      readTime: "5 min read",
      status: "Draft"
    });
  };

  const stats = [
    { label: "Total Posts", value: blogs.length, color: "emerald" },
    { label: "Published", value: blogs.filter(b => b.status === "Published").length, color: "blue" },
    { label: "Draft", value: blogs.filter(b => b.status === "Draft").length, color: "amber" },
    { label: "Total Views", value: blogs.reduce((sum, b) => sum + b.views, 0).toLocaleString(), color: "purple" }
  ];

  const categories = [
    "Sustain Aim Climate Solution",
    "AI & Climate",
    "Science Based Targets",
    "TCFD Recommendations",
    "Carbon Accounting",
    "ESG Reporting",
    "Circular Economy",
    "Energy Efficiency"
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm`}
          >
            <p className="text-neutral-500 font-bold text-sm mb-2">{stat.label}</p>
            <p className={`text-3xl font-black text-${stat.color}-600`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Actions Bar */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            >
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Scheduled">Scheduled</option>
            </select>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20"
            >
              <Plus className="w-5 h-5" />
              Add Blog Post
            </button>
          </div>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-700 uppercase tracking-wider">
                  Post
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-700 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-700 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-700 uppercase tracking-wider">
                  Published
                </th>
                <th className="px-6 py-4 text-right text-xs font-black text-neutral-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredBlogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-16 h-12 rounded-lg object-cover"
                      />
                      <div className="max-w-xs">
                        <p className="font-bold text-neutral-900 line-clamp-1">{blog.title}</p>
                        <p className="text-xs text-neutral-500 line-clamp-1">{blog.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-bold">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={blog.authorImage}
                        alt={blog.author}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-bold text-neutral-900">{blog.author}</p>
                        <p className="text-xs text-neutral-500">{blog.readTime}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                        blog.status === "Published"
                          ? "bg-emerald-100 text-emerald-700"
                          : blog.status === "Draft"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-neutral-600 font-medium">
                      <Eye className="w-4 h-4" />
                      {blog.views.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Calendar className="w-4 h-4" />
                      {blog.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(blog)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-500 font-bold">No blog posts found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-neutral-900">
                  {isAddModalOpen ? "Add New Blog Post" : "Edit Blog Post"}
                </h2>
                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                    resetForm();
                  }}
                  className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  placeholder="Enter blog post title"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                  placeholder="Enter short excerpt for the blog post"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                  placeholder="Enter full blog post content"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">
                    Featured Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    placeholder="Enter author name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">
                    Author Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.authorImage}
                    onChange={(e) => setFormData({ ...formData, authorImage: e.target.value })}
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">
                    Publish Date
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    placeholder="Jun 5, 2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    placeholder="5 min read"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-neutral-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                  resetForm();
                }}
                className="px-6 py-2.5 border border-neutral-200 text-neutral-700 rounded-xl font-bold text-sm hover:bg-neutral-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={isAddModalOpen ? handleAddBlog : handleEditBlog}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20"
              >
                <Save className="w-4 h-4" />
                {isAddModalOpen ? "Add Blog Post" : "Save Changes"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
