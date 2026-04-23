import React from "react";
import { Link } from "react-router";
import { Shield } from "lucide-react";
import logo from "figma:asset/d2b54bb4fb2df7689021db18296d99a7d218dac6.png";

export function PublicFooter() {
  return (
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
              <li>
                <Link to="/#features" className="text-white/60 hover:text-white font-bold text-sm transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-white/60 hover:text-white font-bold text-sm transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white font-bold text-sm transition-colors">
                  Integrations
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white font-bold text-sm transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-sm uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/#about" className="text-white/60 hover:text-white font-bold text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-white/60 hover:text-white font-bold text-sm transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white font-bold text-sm transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white font-bold text-sm transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-sm uppercase tracking-widest mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/60 hover:text-white font-bold text-sm transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white font-bold text-sm transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <Link to="/register" className="text-white/60 hover:text-white font-bold text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white font-bold text-sm transition-colors">
                  Status
                </a>
              </li>
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
  );
}
