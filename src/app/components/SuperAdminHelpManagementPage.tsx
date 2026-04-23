import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Save,
  X,
  HelpCircle,
  Sparkles,
  Filter,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Book,
  Zap,
  BarChart3,
  CreditCard,
  Shield,
  Leaf,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  status: "published" | "draft";
  createdAt: Date;
  updatedAt: Date;
}

export function SuperAdminHelpManagementPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: "1",
      question: "How do I get started with SustainAIM?",
      answer: "Getting started is easy! After signing up, you'll be guided through a quick onboarding process. First, set up your organization profile, then connect your data sources. You can start tracking emissions immediately by adding your first scope 1, 2, or 3 activities.",
      category: "getting-started",
      status: "published",
      createdAt: new Date("2024-03-01"),
      updatedAt: new Date("2024-03-15"),
    },
    {
      id: "2",
      question: "What are Scope 1, 2, and 3 emissions?",
      answer: "Scope 1 emissions are direct emissions from owned or controlled sources (e.g., company vehicles, on-site fuel combustion). Scope 2 emissions are indirect emissions from purchased energy (e.g., electricity, heating). Scope 3 emissions are all other indirect emissions in your value chain.",
      category: "getting-started",
      status: "published",
      createdAt: new Date("2024-03-01"),
      updatedAt: new Date("2024-03-10"),
    },
    {
      id: "3",
      question: "How accurate are the emission calculations?",
      answer: "Our calculations use internationally recognized emission factors from databases like DEFRA, EPA, and IPCC. We update these factors regularly to ensure accuracy. Our methodology is aligned with the GHG Protocol standards.",
      category: "emissions",
      status: "published",
      createdAt: new Date("2024-03-05"),
      updatedAt: new Date("2024-03-20"),
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "getting-started",
    status: "published" as "published" | "draft",
  });

  const categories = [
    { id: "all", label: "All Categories", icon: Book },
    { id: "getting-started", label: "Getting Started", icon: Zap },
    { id: "emissions", label: "Emissions Tracking", icon: Leaf },
    { id: "reports", label: "Reports & Analytics", icon: BarChart3 },
    { id: "account", label: "Account & Billing", icon: CreditCard },
    { id: "security", label: "Security", icon: Shield },
  ];

  const statuses = [
    { id: "all", label: "All Status" },
    { id: "published", label: "Published" },
    { id: "draft", label: "Draft" },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || faq.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddFaq = () => {
    if (!formData.question || !formData.answer) return;

    const newFaq: FAQ = {
      id: Date.now().toString(),
      question: formData.question,
      answer: formData.answer,
      category: formData.category,
      status: formData.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setFaqs([...faqs, newFaq]);
    setIsAddModalOpen(false);
    setFormData({
      question: "",
      answer: "",
      category: "getting-started",
      status: "published",
    });
  };

  const handleEditFaq = () => {
    if (!editingFaq || !formData.question || !formData.answer) return;

    setFaqs(
      faqs.map((faq) =>
        faq.id === editingFaq.id
          ? {
              ...faq,
              question: formData.question,
              answer: formData.answer,
              category: formData.category,
              status: formData.status,
              updatedAt: new Date(),
            }
          : faq
      )
    );

    setIsEditModalOpen(false);
    setEditingFaq(null);
    setFormData({
      question: "",
      answer: "",
      category: "getting-started",
      status: "published",
    });
  };

  const handleDeleteFaq = (id: string) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      setFaqs(faqs.filter((faq) => faq.id !== id));
    }
  };

  const openEditModal = (faq: FAQ) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      status: faq.status,
    });
    setIsEditModalOpen(true);
  };

  const stats = [
    {
      label: "Total FAQs",
      value: faqs.length,
      icon: HelpCircle,
      color: "emerald",
    },
    {
      label: "Published",
      value: faqs.filter((f) => f.status === "published").length,
      icon: CheckCircle2,
      color: "green",
    },
    {
      label: "Drafts",
      value: faqs.filter((f) => f.status === "draft").length,
      icon: AlertCircle,
      color: "amber",
    },
    {
      label: "Categories",
      value: categories.length - 1,
      icon: Book,
      color: "blue",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-neutral-900 mb-2">Help Management</h1>
          <p className="text-neutral-600 font-medium">
            Manage FAQ questions and answers for customer support
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
        >
          <Plus className="w-5 h-5" />
          Add FAQ
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl border-2 border-neutral-100 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-12 h-12 bg-${stat.color}-50 rounded-xl flex items-center justify-center`}
              >
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <span className={`text-3xl font-black text-${stat.color}-600`}>{stat.value}</span>
            </div>
            <p className="text-sm font-bold text-neutral-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border-2 border-neutral-100 p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-1">
            <label className="block text-sm font-black text-neutral-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQs..."
                className="w-full pl-10 pr-4 py-2.5 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-black text-neutral-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-black text-neutral-700 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
            >
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* FAQs List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-neutral-900">
            {filteredFaqs.length} {filteredFaqs.length === 1 ? "FAQ" : "FAQs"}
          </h2>
        </div>

        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-neutral-100 p-16 text-center">
            <HelpCircle className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-xl font-black text-neutral-900 mb-2">No FAQs Found</h3>
            <p className="text-neutral-600 font-medium mb-6">
              {searchQuery || selectedCategory !== "all" || selectedStatus !== "all"
                ? "Try adjusting your filters"
                : "Get started by adding your first FAQ"}
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-black hover:bg-emerald-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add FAQ
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl border-2 border-neutral-100 overflow-hidden hover:border-emerald-200 transition-all shadow-sm"
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-black ${
                          faq.status === "published"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {faq.status.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 bg-neutral-50 text-neutral-700 rounded-lg text-xs font-black border border-neutral-200">
                        {categories.find((c) => c.id === faq.category)?.label}
                      </span>
                    </div>
                    <h3 className="font-black text-neutral-900 text-lg mb-2">{faq.question}</h3>
                    <div className={expandedFaqId === faq.id ? "block" : "line-clamp-2"}>
                      <p className="text-neutral-600 font-medium leading-relaxed">{faq.answer}</p>
                    </div>
                    {faq.answer.length > 150 && (
                      <button
                        onClick={() => setExpandedFaqId(expandedFaqId === faq.id ? null : faq.id)}
                        className="mt-2 text-sm font-black text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                      >
                        {expandedFaqId === faq.id ? "Show Less" : "Show More"}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            expandedFaqId === faq.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                    <div className="mt-4 flex items-center gap-4 text-xs text-neutral-500 font-medium">
                      <span>Created: {faq.createdAt.toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Updated: {faq.updatedAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(faq)}
                      className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteFaq(faq.id)}
                      className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(isAddModalOpen || isEditModalOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => {
              setIsAddModalOpen(false);
              setIsEditModalOpen(false);
              setEditingFaq(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-neutral-900">
                      {isAddModalOpen ? "Add New FAQ" : "Edit FAQ"}
                    </h2>
                    <p className="text-sm text-neutral-600 font-medium">
                      {isAddModalOpen
                        ? "Create a new FAQ for customer support"
                        : "Update FAQ content and settings"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                    setEditingFaq(null);
                  }}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-neutral-400" />
                </button>
              </div>

              <div className="space-y-5">
                {/* Question */}
                <div>
                  <label className="block text-sm font-black text-neutral-700 mb-2">
                    Question *
                  </label>
                  <input
                    type="text"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    placeholder="Enter the FAQ question..."
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>

                {/* Answer */}
                <div>
                  <label className="block text-sm font-black text-neutral-700 mb-2">
                    Answer *
                  </label>
                  <textarea
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    placeholder="Enter the detailed answer..."
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500 focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Category and Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-black text-neutral-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                    >
                      {categories
                        .filter((c) => c.id !== "all")
                        .map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.label}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-black text-neutral-700 mb-2">
                      Status *
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as "published" | "draft",
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4">
                  <button
                    onClick={isAddModalOpen ? handleAddFaq : handleEditFaq}
                    disabled={!formData.question || !formData.answer}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 text-white rounded-xl font-black hover:bg-emerald-700 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-200"
                  >
                    <Save className="w-5 h-5" />
                    {isAddModalOpen ? "Add FAQ" : "Save Changes"}
                  </button>
                  <button
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setIsEditModalOpen(false);
                      setEditingFaq(null);
                      setFormData({
                        question: "",
                        answer: "",
                        category: "getting-started",
                        status: "published",
                      });
                    }}
                    className="px-6 py-4 bg-neutral-100 text-neutral-700 rounded-xl font-black hover:bg-neutral-200 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
