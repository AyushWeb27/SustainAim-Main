import React from "react";
import { Link } from "react-router";
import { ArrowRight, Leaf, Zap, TrendingDown, Recycle, Trash2, Target, Shield, AlertTriangle, Droplet, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PublicHeader } from "../components/PublicHeader";
import { PublicFooter } from "../components/PublicFooter";

export function ServicesPage() {
  const services = [
    {
      icon: Leaf,
      title: "Climate Change",
      description: "Leading the charge in climate action, we pioneer innovative solutions that merge advanced technology with environmental stewardship.",
      image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      color: "emerald"
    },
    {
      icon: Zap,
      title: "Energy Efficiency",
      description: "We revolutionize energy efficiency with advanced technologies and AI-driven solutions, optimizing energy use and reducing waste.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      color: "blue"
    },
    {
      icon: TrendingDown,
      title: "Carbon Markets",
      description: "Our carbon market services facilitate seamless participation in global carbon trading, helping clients meet sustainability goals while driving positive environmental impact.",
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      color: "purple"
    },
    {
      icon: Recycle,
      title: "Circular Economy",
      description: "Our services help businesses adopt circular practices that maximize efficiency, minimize environmental impact, and create long-term value.",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      color: "green"
    },
    {
      icon: Trash2,
      title: "Waste Management",
      description: "Our services help businesses and communities minimize environmental impact, streamline operations, and promote a more sustainable, circular approach to waste.",
      image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      color: "amber"
    },
    {
      icon: Target,
      title: "Sustainability",
      description: "Our services focus on optimizing resource use, reducing waste, and driving long-term sustainability, empowering clients to create a positive impact on both the planet and their bottom line.",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      color: "teal"
    },
    {
      icon: Shield,
      title: "Environmental Social & Governance",
      description: "Our services help businesses enhance sustainability, promote social responsibility, and ensure transparent governance, driving long-term value and positive global impact.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      color: "indigo"
    },
    {
      icon: AlertTriangle,
      title: "Environmental Health & Safety",
      description: "Our services help businesses minimize risks, comply with regulations, and enhance workplace safety while driving positive environmental impact.",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      color: "red"
    },
    {
      icon: Droplet,
      title: "Hydrogen Economy",
      description: "Our services support businesses in transitioning to hydrogen-based systems, driving sustainability, reducing emissions, and shaping a low-carbon future.",
      image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      color: "cyan"
    },
    {
      icon: BookOpen,
      title: "Training and Internship",
      description: "We offer cutting-edge training and support services to equip businesses with the knowledge and tools needed to navigate today's environmental challenges.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      color: "orange"
    }
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
              <span className="text-white">Services</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
              Our Services
            </h1>
            <p className="text-xl text-white/90 font-bold max-w-3xl mx-auto">
              Comprehensive sustainability solutions powered by cutting-edge technology and environmental expertise
            </p>
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-white rounded-3xl overflow-hidden border-2 border-neutral-100 shadow-lg hover:shadow-2xl hover:border-emerald-200 transition-all cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Icon */}
                    <div className="absolute top-6 left-6 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/40">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-black text-neutral-900 mb-4 group-hover:text-emerald-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-neutral-600 font-bold leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-12 border-2 border-emerald-200"
          >
            <h2 className="text-4xl font-black text-neutral-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-neutral-700 font-bold mb-8 max-w-2xl mx-auto">
              Contact us today to learn how our services can help your organization achieve its sustainability goals
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-200 group"
            >
              Get In Touch
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
