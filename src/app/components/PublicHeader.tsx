import React from "react";
import { Link, useLocation } from "react-router";
import logo from "figma:asset/d2b54bb4fb2df7689021db18296d99a7d218dac6.png";

export function PublicHeader() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <img src={logo} alt="SustainAIM Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="font-black text-xl text-neutral-900 tracking-tighter leading-none">
                Sustain<span className="text-emerald-600">AIM</span>
              </h1>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/#features"
              className={`text-sm font-black transition-colors uppercase tracking-widest ${
                isActive("/#features")
                  ? "text-emerald-600"
                  : "text-neutral-600 hover:text-emerald-600"
              }`}
            >
              Features
            </Link>
            <Link
              to="/services"
              className={`text-sm font-black transition-colors uppercase tracking-widest ${
                isActive("/services")
                  ? "text-emerald-600"
                  : "text-neutral-600 hover:text-emerald-600"
              }`}
            >
              Services
            </Link>
            <Link
              to="/#how-it-works"
              className="text-sm font-black text-neutral-600 hover:text-emerald-600 transition-colors uppercase tracking-widest"
            >
              How It Works
            </Link>
            <Link
              to="/#testimonials"
              className="text-sm font-black text-neutral-600 hover:text-emerald-600 transition-colors uppercase tracking-widest"
            >
              Testimonials
            </Link>
            <Link
              to="/blogs"
              className={`text-sm font-black transition-colors uppercase tracking-widest ${
                isActive("/blogs")
                  ? "text-emerald-600"
                  : "text-neutral-600 hover:text-emerald-600"
              }`}
            >
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
  );
}
