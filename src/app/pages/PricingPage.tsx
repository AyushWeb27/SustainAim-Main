import React, { useState } from "react";
import { useNavigate } from "react-router";
import { 
  Check, 
  X, 
  Calendar,
  CalendarDays,
  CalendarRange,
  Trophy,
  Shield,
  BarChart3,
  Users,
  FileText,
  Headphones,
  Crown,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { motion } from "motion/react";
import logo from "figma:asset/d2b54bb4fb2df7689021db18296d99a7d218dac6.png";

interface Plan {
  id: string;
  name: string;
  duration: string;
  icon: any;
  monthlyPrice: number;
  totalPrice: number;
  originalMonthlyPrice: number;
  discount: number;
  description: string;
  features: string[];
  notIncluded?: string[];
  popular?: boolean;
  cta: string;
  color: string;
  badge?: string;
}

export function PricingPage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans: Plan[] = [
    {
      id: "1-month",
      name: "1 Month Plan",
      duration: "1 Month",
      icon: Calendar,
      monthlyPrice: 2999,
      totalPrice: 2999,
      originalMonthlyPrice: 2999,
      discount: 0,
      description: "Perfect for trying out our platform",
      features: [
        "Full Scope 1, 2 & 3 tracking",
        "Advanced analytics & insights",
        "Up to 5 user accounts",
        "Basic email support",
        "CSV data import/export",
        "Monthly emission reports",
        "Standard dashboard access",
        "Mobile app access"
      ],
      notIncluded: [
        "API access",
        "Custom integrations",
        "Priority support",
        "Dedicated account manager"
      ],
      cta: "Start 1 Month Trial",
      color: "blue",
    },
    {
      id: "6-months",
      name: "6 Months Plan",
      duration: "6 Months",
      icon: CalendarDays,
      monthlyPrice: 2499,
      totalPrice: 14994,
      originalMonthlyPrice: 2999,
      discount: 17,
      description: "Great for medium-term sustainability goals",
      features: [
        "Everything in 1 Month Plan",
        "Up to 15 user accounts",
        "Priority email support",
        "API access (basic)",
        "Automated data collection",
        "Weekly reports & alerts",
        "Custom emission factors",
        "Standard integrations",
        "Quarterly business reviews"
      ],
      cta: "Start 6 Months Plan",
      color: "emerald",
      badge: "SAVE 17%"
    },
    {
      id: "1-year",
      name: "1 Year Plan",
      duration: "1 Year",
      icon: CalendarRange,
      monthlyPrice: 1999,
      totalPrice: 23988,
      originalMonthlyPrice: 2999,
      discount: 33,
      description: "Most popular choice for committed organizations",
      features: [
        "Everything in 6 Months Plan",
        "Unlimited user accounts",
        "24/7 priority support",
        "Full API access",
        "Custom integrations",
        "Advanced security features",
        "White-label reports",
        "Dedicated success manager",
        "Monthly strategy calls",
        "Training & onboarding",
        "Custom branding"
      ],
      popular: true,
      cta: "Start 1 Year Plan",
      color: "emerald",
      badge: "SAVE 33%"
    },
    {
      id: "3-years",
      name: "3 Years Plan",
      duration: "3 Years",
      icon: Trophy,
      monthlyPrice: 1499,
      totalPrice: 53964,
      originalMonthlyPrice: 2999,
      discount: 50,
      description: "Ultimate value for long-term sustainability commitment",
      features: [
        "Everything in 1 Year Plan",
        "Lifetime price lock guarantee",
        "Premium 24/7 phone support",
        "Dedicated account manager",
        "Custom feature development",
        "Advanced API with higher limits",
        "Multi-location support",
        "SSO & SAML integration",
        "SLA guarantee (99.9% uptime)",
        "Unlimited custom integrations",
        "Audit-ready compliance reports",
        "Free quarterly upgrades",
        "Executive dashboard access",
        "Annual in-person training"
      ],
      cta: "Start 3 Years Plan",
      color: "purple",
      badge: "SAVE 50%"
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    
    // Navigate to billing page with plan details
    setTimeout(() => {
      const selectedPlanDetails = plans.find(p => p.id === planId);
      console.log("Selected plan:", planId, "Duration:", selectedPlanDetails?.duration);
      navigate("/billing", {
        state: {
          plan: {
            id: selectedPlanDetails?.id,
            name: selectedPlanDetails?.name,
            duration: selectedPlanDetails?.duration,
            monthlyPrice: selectedPlanDetails?.monthlyPrice,
            totalPrice: selectedPlanDetails?.totalPrice,
            discount: selectedPlanDetails?.discount,
          }
        }
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-emerald-50/30">
      {/* Header */}
      <div className="border-b border-neutral-100 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
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
            <button
              onClick={() => navigate("/dashboard")}
              className="text-sm font-bold text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Skip for now →
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-black tracking-widest uppercase text-emerald-600">
              Indian Pricing Plans
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-neutral-900 tracking-tighter mb-6">
            Choose Your Subscription<br />
            <span className="text-emerald-600">Period & Save More</span>
          </h2>
          <p className="text-xl text-neutral-600 font-bold max-w-2xl mx-auto">
            Select the perfect plan duration for your organization. Longer commitments = bigger savings!
          </p>

          {/* Savings Indicator */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-black border border-emerald-200">
              <TrendingUp className="w-4 h-4" />
              Save up to 50% with 3 Years Plan
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan, index) => {
            const isSelected = selectedPlan === plan.id;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-3xl border-2 transition-all ${
                  plan.popular
                    ? "border-emerald-500 shadow-2xl shadow-emerald-500/20 scale-105 lg:scale-110"
                    : "border-neutral-200 shadow-lg hover:shadow-xl"
                } ${isSelected ? "ring-4 ring-emerald-500/30" : ""}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Discount Badge */}
                {plan.discount > 0 && !plan.popular && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                      <div className="text-center">
                        <div className="text-xs font-black leading-none">{plan.badge}</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {/* Plan Header */}
                  <div className="mb-6">
                    <div className={`w-12 h-12 bg-${plan.color}-50 rounded-2xl flex items-center justify-center mb-4`}>
                      <plan.icon className={`w-6 h-6 text-${plan.color}-600`} />
                    </div>
                    <h3 className="text-xl font-black text-neutral-900 mb-1 tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-neutral-100">
                    <div className="flex items-start gap-1 mb-1">
                      <span className="text-2xl font-black text-neutral-900 mt-1">
                        ₹
                      </span>
                      <span className="text-4xl font-black text-neutral-900">
                        {plan.monthlyPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-neutral-500 font-bold mt-2">
                        /month
                      </span>
                    </div>
                    
                    {plan.discount > 0 && (
                      <div className="mb-2">
                        <p className="text-xs text-neutral-400 font-medium line-through">
                          ₹{plan.originalMonthlyPrice.toLocaleString('en-IN')}/month
                        </p>
                      </div>
                    )}
                    
                    <div className="bg-neutral-50 rounded-lg px-3 py-2 mb-2">
                      <p className="text-xs text-neutral-600 font-bold">
                        Total: ₹{plan.totalPrice.toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs text-neutral-500 font-medium">
                        Billed for {plan.duration.toLowerCase()}
                      </p>
                    </div>
                    
                    {plan.discount > 0 && (
                      <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full text-xs font-black">
                        <TrendingUp className="w-3 h-3" />
                        Save ₹{((plan.originalMonthlyPrice - plan.monthlyPrice) * (plan.id === '6-months' ? 6 : plan.id === '1-year' ? 12 : 36)).toLocaleString('en-IN')}
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={isSelected}
                    className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg mb-6 ${
                      plan.popular
                        ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:shadow-xl hover:scale-105"
                        : "bg-neutral-900 text-white hover:bg-neutral-800"
                    } ${isSelected ? "opacity-50 cursor-not-allowed" : ""} active:scale-95`}
                  >
                    {isSelected ? "Selected ✓" : plan.cta}
                  </button>

                  {/* Features List */}
                  <div className="space-y-2">
                    <p className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-3">
                      What's Included
                    </p>
                    {plan.features.slice(0, 6).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-emerald-50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-emerald-600" />
                        </div>
                        <span className="text-xs text-neutral-700 font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                    {plan.features.length > 6 && (
                      <p className="text-xs text-emerald-600 font-black pl-6">
                        + {plan.features.length - 6} more features
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}</div>

        {/* Feature Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl border-2 border-neutral-100 shadow-xl overflow-hidden mb-16"
        >
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-8 py-6">
            <h3 className="text-2xl font-black mb-2">Compare All Plans</h3>
            <p className="text-white/80 font-medium">
              See what's included in each subscription period
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-100">
                  <th className="px-6 py-4 text-left text-xs font-black text-neutral-600 uppercase tracking-wider">
                    Feature
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-black text-neutral-600 uppercase tracking-wider">
                    1 Month
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-black text-neutral-600 uppercase tracking-wider">
                    6 Months
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-black text-neutral-600 uppercase tracking-wider bg-emerald-50/30">
                    1 Year
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-black text-neutral-600 uppercase tracking-wider">
                    3 Years
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Monthly Price", month1: "₹2,999", month6: "₹2,499", year1: "₹1,999", year3: "₹1,499" },
                  { feature: "User Accounts", month1: "5", month6: "15", year1: "Unlimited", year3: "Unlimited" },
                  { feature: "Scope 1, 2 & 3 Tracking", month1: true, month6: true, year1: true, year3: true },
                  { feature: "API Access", month1: false, month6: "Basic", year1: "Full", year3: "Advanced" },
                  { feature: "Custom Integrations", month1: false, month6: "Standard", year1: true, year3: "Unlimited" },
                  { feature: "Support Level", month1: "Email", month6: "Priority", year1: "24/7", year3: "Premium" },
                  { feature: "Dedicated Manager", month1: false, month6: false, year1: true, year3: true },
                  { feature: "White-label Reports", month1: false, month6: false, year1: true, year3: true },
                  { feature: "Training & Onboarding", month1: false, month6: false, year1: true, year3: true },
                  { feature: "Price Lock Guarantee", month1: false, month6: false, year1: false, year3: true },
                  { feature: "SLA Guarantee", month1: false, month6: false, year1: false, year3: true },
                  { feature: "Annual In-person Training", month1: false, month6: false, year1: false, year3: true }
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-neutral-50 hover:bg-neutral-50/50">
                    <td className="px-6 py-3 text-xs font-bold text-neutral-700">
                      {row.feature}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {typeof row.month1 === "boolean" ? (
                        row.month1 ? (
                          <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-neutral-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-xs font-black text-neutral-900">{row.month1}</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {typeof row.month6 === "boolean" ? (
                        row.month6 ? (
                          <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-neutral-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-xs font-black text-neutral-900">{row.month6}</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-center bg-emerald-50/10">
                      {typeof row.year1 === "boolean" ? (
                        row.year1 ? (
                          <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-neutral-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-xs font-black text-neutral-900">{row.year1}</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {typeof row.year3 === "boolean" ? (
                        row.year3 ? (
                          <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-neutral-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-xs font-black text-neutral-900">{row.year3}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            {
              icon: Shield,
              title: "Secure & Compliant",
              description: "Bank-level encryption & ISO 27001 certified"
            },
            {
              icon: Headphones,
              title: "Expert Support",
              description: "24/7 assistance from sustainability experts"
            },
            {
              icon: BarChart3,
              title: "Real-time Analytics",
              description: "Live dashboards & automated reporting"
            },
            {
              icon: Users,
              title: "2,400+ Customers",
              description: "Trusted by organizations across India"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-neutral-100 p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="text-sm font-black text-neutral-900 mb-2">{item.title}</h4>
              <p className="text-xs text-neutral-500 font-medium">{item.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Money-back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-3xl border-2 border-emerald-200 p-8 text-center"
        >
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-black text-neutral-900 mb-3">
            14-Day Money-Back Guarantee
          </h3>
          <p className="text-neutral-600 font-bold mb-6 max-w-2xl mx-auto">
            Try any plan risk-free. If you're not completely satisfied within 14 days, we'll refund 100% of your payment. No questions asked.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-emerald-200">
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-black text-neutral-700">No Setup Fees</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-emerald-200">
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-black text-neutral-700">Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-emerald-200">
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-black text-neutral-700">Instant Activation</span>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-black text-neutral-900 mb-4">
            Have Questions About Pricing?
          </h3>
          <p className="text-neutral-600 font-bold mb-6">
            Our team is here to help you choose the right plan for your organization
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl">
              Contact Sales Team
            </button>
            <button className="px-8 py-4 bg-white border-2 border-neutral-200 text-neutral-900 rounded-xl font-black text-sm uppercase tracking-widest hover:border-emerald-500 hover:bg-emerald-50/20 transition-all shadow-sm">
              View FAQ
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-100 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center">
                <img src={logo} alt="SustainAIM Logo" className="w-full h-full object-contain" />
              </div>
              <p className="text-neutral-400 text-xs font-black uppercase tracking-widest">
                © 2026 SustainAIM • All rights reserved
              </p>
            </div>
            <div className="flex items-center gap-6">
              {['Privacy', 'Terms', 'Refund Policy'].map((link) => (
                <a key={link} href="#" className="text-xs font-black text-neutral-400 hover:text-emerald-600 uppercase tracking-widest transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}