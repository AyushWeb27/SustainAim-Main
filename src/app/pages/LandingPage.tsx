import React from "react";
import { Link, useNavigate } from "react-router";
import { ArrowRight, BarChart3, Shield, Target, CheckCircle, TrendingDown, Users, Award, Gauge, FileText, Cloud, Lock, Workflow, LineChart } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import logo from "figma:asset/d2b54bb4fb2df7689021db18296d99a7d218dac6.png";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <img src={logo} alt="SustainAIM Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="font-black text-xl text-neutral-900 tracking-tighter leading-none">
                  Sustain<span className="text-emerald-600">AIM</span>
                </h1>
              </div>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-black text-neutral-600 hover:text-emerald-600 transition-colors uppercase tracking-widest">
                Features
              </a>
              <Link to="/services" className="text-sm font-black text-neutral-600 hover:text-emerald-600 transition-colors uppercase tracking-widest">
                Services
              </Link>
              <a href="#how-it-works" className="text-sm font-black text-neutral-600 hover:text-emerald-600 transition-colors uppercase tracking-widest">
                How It Works
              </a>
              <a href="#testimonials" className="text-sm font-black text-neutral-600 hover:text-emerald-600 transition-colors uppercase tracking-widest">
                Testimonials
              </a>
              <Link to="/blogs" className="text-sm font-black text-neutral-600 hover:text-emerald-600 transition-colors uppercase tracking-widest">
                Blogs
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Link
                to="/signin"
                className="px-6 py-2.5 text-sm font-black text-neutral-700 hover:text-emerald-600 transition-colors uppercase tracking-widest"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
              >
                Inquiry
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-emerald-50/30 via-white to-blue-50/30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full mb-8"
              >
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-emerald-700">
                  Enterprise ESG Platform
                </span>
              </motion.div>

              {/* Headline */}
              <h1 className="text-5xl md:text-7xl font-black text-neutral-900 tracking-tighter mb-6 leading-[0.95]">
                The Future of
                <br />
                <span className="text-emerald-600">Sustainability</span>
                <br />
                Management
              </h1>

              <p className="text-xl text-neutral-600 font-bold mb-10 leading-relaxed max-w-xl">
                Enterprise-grade carbon accounting and ESG reporting platform. 
                Track emissions across all three scopes, generate compliance reports, 
                and accelerate your net-zero journey.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
                <Link
                  to="/register"
                  className="px-10 py-5 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-200 flex items-center gap-3 group"
                >
                  Submit Inquiry
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="px-10 py-5 bg-white text-neutral-700 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-neutral-50 transition-all border-2 border-neutral-200 shadow-xl">
                  Watch Demo
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-black text-neutral-500 uppercase tracking-widest">
                    ISO 27001 Certified
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-black text-neutral-500 uppercase tracking-widest">
                    GHG Protocol Aligned
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-black text-neutral-500 uppercase tracking-widest">
                    TCFD Compliant
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Hero Image/Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1769697646209-f7ca8736d0f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMG9mZmljZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzc0Mjk0MzE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="SustainAIM Dashboard"
                  className="w-full h-auto"
                />
                {/* Floating Stats Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute top-6 left-6 bg-white p-4 rounded-2xl shadow-2xl"
                >
                  <p className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-1">
                    Total Emissions
                  </p>
                  <p className="text-2xl font-black text-neutral-900">2,450</p>
                  <p className="text-xs font-black text-emerald-600">↓ 12.5%</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-6 right-6 bg-emerald-600 p-4 rounded-2xl shadow-2xl"
                >
                  <p className="text-xs font-black text-emerald-100 uppercase tracking-widest mb-1">
                    ESG Score
                  </p>
                  <p className="text-2xl font-black text-white">A+</p>
                </motion.div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -z-10 top-10 -right-10 w-72 h-72 bg-emerald-200 rounded-full blur-3xl opacity-30" />
              <div className="absolute -z-10 -bottom-10 -left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30" />
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: "2,400+", label: "Organizations" },
              { value: "15M+", label: "Tons CO₂ Tracked" },
              { value: "99.9%", label: "Uptime" },
              { value: "150+", label: "Countries" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-lg text-center">
                <p className="text-3xl md:text-4xl font-black text-neutral-900 mb-2">{stat.value}</p>
                <p className="text-xs font-black text-neutral-400 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em] mb-4 block">
                Simple Process
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-neutral-900 tracking-tighter mb-6">
                Get Started in <span className="text-emerald-600">3 Steps</span>
              </h2>
              <p className="text-lg text-neutral-500 font-bold max-w-2xl mx-auto">
                From data collection to actionable insights in minutes
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: FileText,
                title: "Connect Your Data",
                description: "Import emissions data from your existing systems via API, CSV, or manual entry. Support for 500+ data sources.",
                color: "emerald"
              },
              {
                step: "02",
                icon: Gauge,
                title: "Analyze & Track",
                description: "Our AI-powered engine automatically categorizes emissions across Scope 1, 2, and 3 with real-time monitoring.",
                color: "blue"
              },
              {
                step: "03",
                icon: FileText,
                title: "Report & Optimize",
                description: "Generate compliance-ready reports and receive actionable recommendations to reduce your carbon footprint.",
                color: "purple"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative bg-white p-8 rounded-3xl border-2 border-neutral-100 shadow-xl hover:shadow-2xl transition-all group"
              >
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                  {item.step}
                </div>
                <div className="mt-6">
                  <div className={`w-16 h-16 bg-${item.color}-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-8 h-8 text-${item.color}-600`} />
                  </div>
                  <h3 className="text-2xl font-black text-neutral-900 mb-4 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-neutral-500 font-bold leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 md:py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em] mb-4 block">
                Powerful Platform
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-neutral-900 tracking-tighter mb-6">
                Everything You Need to <span className="text-emerald-600">Succeed</span>
              </h2>
              <p className="text-lg text-neutral-500 font-bold max-w-2xl mx-auto">
                Comprehensive tools designed for sustainability professionals
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: "Real-Time Analytics",
                description: "Monitor emissions across all scopes with live dashboards and intelligent insights powered by AI.",
                color: "emerald"
              },
              {
                icon: Shield,
                title: "Compliance Ready",
                description: "Automated reports aligned with GHG Protocol, CDP, TCFD, and CSRD frameworks.",
                color: "blue"
              },
              {
                icon: Target,
                title: "Goal Tracking",
                description: "Set science-based targets and track progress toward net-zero commitments with precision.",
                color: "purple"
              },
              {
                icon: TrendingDown,
                title: "Carbon Reduction",
                description: "Identify emission hotspots and implement data-driven reduction strategies that work.",
                color: "rose"
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Multi-user access with role-based permissions and automated workflow management.",
                color: "amber"
              },
              {
                icon: Award,
                title: "ESG Reporting",
                description: "Generate investor-grade sustainability reports with one click. Export to PDF or Excel.",
                color: "indigo"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-xl hover:shadow-2xl transition-all group"
              >
                <div className={`w-16 h-16 bg-${feature.color}-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                </div>
                <h4 className="text-2xl font-black text-neutral-900 mb-3 tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-neutral-500 font-bold leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em] mb-4 block">
                Our Services
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-neutral-900 tracking-tighter mb-6">
                Comprehensive <span className="text-emerald-600">Solutions</span>
              </h2>
              <p className="text-lg text-neutral-500 font-bold max-w-2xl mx-auto">
                End-to-end sustainability services tailored to your organization's needs
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Carbon Accounting",
                description: "Measure and track greenhouse gas emissions across all three scopes with accuracy and compliance.",
                features: ["Scope 1, 2 & 3 tracking", "GHG Protocol aligned", "Automated calculations"]
              },
              {
                title: "ESG Reporting",
                description: "Generate comprehensive ESG reports that meet global standards and stakeholder expectations.",
                features: ["CDP & TCFD compliant", "Custom dashboards", "Audit-ready reports"]
              },
              {
                title: "Net-Zero Strategy",
                description: "Develop and execute science-based strategies to achieve your carbon neutrality goals.",
                features: ["Target setting", "Roadmap planning", "Progress tracking"]
              },
              {
                title: "Supply Chain Management",
                description: "Track and reduce emissions across your entire value chain with vendor engagement tools.",
                features: ["Supplier assessment", "Scope 3 management", "Collaboration portal"]
              },
              {
                title: "Compliance & Auditing",
                description: "Ensure regulatory compliance and prepare for audits with automated documentation.",
                features: ["Regulatory updates", "Audit trails", "Documentation management"]
              },
              {
                title: "Consulting Services",
                description: "Expert guidance from our sustainability professionals to accelerate your ESG journey.",
                features: ["Strategy development", "Implementation support", "Training programs"]
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl border-2 border-neutral-100 shadow-lg hover:shadow-2xl hover:border-emerald-200 transition-all group"
              >
                <h3 className="text-2xl font-black text-neutral-900 mb-4 group-hover:text-emerald-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-neutral-600 font-bold mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="space-y-3">
                  {service.features.map((feature, featureIdx) => (
                    <div key={featureIdx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span className="text-neutral-700 font-bold text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/register"
              className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-200 group"
            >
              Request a Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Platform Showcase Section */}
      <div className="py-20 md:py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-neutral-100">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1761735485907-c59db6a69ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwZGF0YSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NzQyOTQzMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Analytics Dashboard"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-emerald-600 p-6 rounded-2xl shadow-2xl">
                <p className="text-white/80 font-bold text-sm mb-2">Reduction Rate</p>
                <p className="text-4xl font-black text-white">-35%</p>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em] mb-4 block">
                Advanced Analytics
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tighter mb-6">
                Data-Driven <span className="text-emerald-600">Insights</span> at Your Fingertips
              </h2>
              <p className="text-lg text-neutral-600 font-bold mb-8 leading-relaxed">
                Transform raw emissions data into actionable intelligence. Our platform 
                provides real-time visibility into your environmental impact across all 
                business operations.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: LineChart, text: "Automated data collection from 500+ sources" },
                  { icon: Workflow, text: "AI-powered emission factor matching" },
                  { icon: Cloud, text: "Cloud-based infrastructure with 99.9% uptime" },
                  { icon: Lock, text: "Bank-level security and data encryption" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <p className="text-neutral-700 font-bold">{item.text}</p>
                  </div>
                ))}
              </div>

              <Link
                to="/register"
                className="mt-10 px-10 py-5 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-200 flex items-center gap-3 group inline-flex"
              >
                Get In Touch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Integration Section */}
      <div className="py-20 md:py-32 bg-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-black text-emerald-400 uppercase tracking-[0.3em] mb-4 block">
                Seamless Integration
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
                Works With Your <span className="text-emerald-400">Existing</span> Stack
              </h2>
              <p className="text-lg text-white/60 font-bold max-w-2xl mx-auto">
                Connect to your favorite tools and data sources in minutes
              </p>
            </motion.div>
          </div>

          {/* Integration Logos Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
          >
            {[
              "SAP", "Salesforce", "Microsoft", "Oracle", "Workday", "NetSuite",
              "QuickBooks", "Xero", "AWS", "Azure", "Google Cloud", "Snowflake"
            ].map((integration, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-center justify-center hover:bg-white/10 transition-all group"
              >
                <p className="text-white/80 font-black text-sm group-hover:text-white transition-colors">
                  {integration}
                </p>
              </div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <p className="text-white/40 font-bold text-sm">
              + 500 more integrations available
            </p>
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div id="testimonials" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em] mb-4 block">
                Customer Success
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-neutral-900 tracking-tighter mb-6">
                Trusted by Industry <span className="text-emerald-600">Leaders</span>
              </h2>
              <p className="text-lg text-neutral-500 font-bold max-w-2xl mx-auto">
                Join organizations worldwide making measurable environmental impact
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "SustainAIM transformed how we track and report our environmental impact. The platform is intuitive, powerful, and has become essential to our ESG strategy.",
                author: "Sarah Chen",
                role: "Chief Sustainability Officer",
                company: "TechCorp Global",
                rating: 5
              },
              {
                quote: "We reduced our carbon footprint by 35% in the first year using SustainAIM's actionable insights. The ROI has been exceptional.",
                author: "Michael Rodriguez",
                role: "VP of Operations",
                company: "GreenManufacturing Inc",
                rating: 5
              },
              {
                quote: "The compliance reporting features saved us countless hours. Automated CDP and TCFD reports are a game-changer for our team.",
                author: "Emily Watson",
                role: "Head of ESG",
                company: "Financial Services Ltd",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                className="bg-white p-8 rounded-3xl border-2 border-neutral-100 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="text-emerald-500 text-xl">★</div>
                  ))}
                </div>
                <p className="text-neutral-700 font-bold leading-relaxed mb-8 text-lg">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-neutral-100 pt-6">
                  <p className="text-neutral-900 font-black text-sm mb-1">{testimonial.author}</p>
                  <p className="text-neutral-400 font-bold text-xs uppercase tracking-widest mb-1">
                    {testimonial.role}
                  </p>
                  <p className="text-emerald-600 font-black text-xs uppercase tracking-widest">
                    {testimonial.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Blogs Section */}
      <div id="blogs" className="py-20 md:py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em] mb-4 block">
                Latest Insights
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-neutral-900 tracking-tighter mb-6">
                From Our <span className="text-emerald-600">Blog</span>
              </h2>
              <p className="text-lg text-neutral-500 font-bold max-w-2xl mx-auto">
                Expert perspectives on sustainability, ESG trends, and climate action
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                category: "Carbon Accounting",
                date: "March 15, 2026",
                title: "Understanding Scope 3 Emissions: A Complete Guide",
                excerpt: "Deep dive into measuring and managing Scope 3 emissions across your value chain.",
                readTime: "8 min read"
              },
              {
                image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                category: "ESG Reporting",
                date: "March 10, 2026",
                title: "New CSRD Requirements: What Companies Need to Know",
                excerpt: "Navigate the latest EU Corporate Sustainability Reporting Directive requirements.",
                readTime: "6 min read"
              },
              {
                image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                category: "Net-Zero Strategy",
                date: "March 5, 2026",
                title: "Setting Science-Based Targets: Best Practices for 2026",
                excerpt: "Learn how leading organizations are setting and achieving science-based climate targets.",
                readTime: "10 min read"
              }
            ].map((blog, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden border-2 border-neutral-100 shadow-lg hover:shadow-2xl hover:border-emerald-200 transition-all group cursor-pointer"
              >
                <div className="relative overflow-hidden h-56">
                  <ImageWithFallback
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-xs text-neutral-500 font-bold uppercase tracking-widest mb-4">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-black text-neutral-900 mb-4 group-hover:text-emerald-600 transition-colors leading-tight">
                    {blog.title}
                  </h3>
                  <p className="text-neutral-600 font-bold leading-relaxed mb-6">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="inline-flex items-center gap-3 px-10 py-5 border-2 border-neutral-900 text-neutral-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-all group">
              View All Articles
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-32 bg-gradient-to-br from-emerald-600 to-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-tight">
              Ready to Make an Impact?
            </h2>
            <p className="text-2xl text-white/80 font-bold mb-12">
              Join thousands of organizations already on their sustainability journey
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="px-12 py-6 bg-white text-emerald-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-neutral-100 transition-all shadow-2xl flex items-center gap-3 group"
              >
                Submit Inquiry
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/signin"
                className="px-12 py-6 bg-transparent text-white border-2 border-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Logo & Description */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                  <img src={logo} alt="SustainAIM Logo" className="w-full h-full object-contain" />
                </div>
                <h3 className="font-black text-xl tracking-tighter">
                  Sustain<span className="text-emerald-400">AIM</span>
                </h3>
              </div>
              <p className="text-white/60 font-bold text-sm">
                Enterprise-grade carbon accounting and ESG reporting platform
              </p>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="font-black text-sm uppercase tracking-widest mb-4">Product</h4>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'Integrations', 'API'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-white/60 hover:text-white font-bold text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-sm uppercase tracking-widest mb-4">Company</h4>
              <ul className="space-y-3">
                {['About', 'Blog', 'Careers', 'Press'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-white/60 hover:text-white font-bold text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-sm uppercase tracking-widest mb-4">Support</h4>
              <ul className="space-y-3">
                {['Documentation', 'Help Center', 'Contact', 'Status'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-white/60 hover:text-white font-bold text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-xs font-black uppercase tracking-widest">
              © 2026 SustainAIM • All rights reserved
            </p>
            <div className="flex items-center gap-6">
              {['Privacy', 'Terms', 'Security', 'Cookies'].map(link => (
                <a key={link} href="#" className="text-white/40 hover:text-white text-xs font-black uppercase tracking-widest transition-colors">
                  {link}
                </a>
              ))}
              <Link 
                to="/super-admin/login" 
                className="text-white/40 hover:text-emerald-400 text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-1"
              >
                <Shield className="w-3 h-3" />
                Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}