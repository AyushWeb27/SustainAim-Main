import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  ArrowLeft,
  CreditCard,
  Wallet,
  Building2,
  Shield,
  Check,
  Calendar,
  Lock,
  IndianRupee,
  Sparkles,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  User,
  FileText
} from "lucide-react";
import { motion } from "motion/react";
import logo from "figma:asset/d2b54bb4fb2df7689021db18296d99a7d218dac6.png";

interface PlanDetails {
  id: string;
  name: string;
  duration: string;
  monthlyPrice: number;
  totalPrice: number;
  discount: number;
}

export function BillingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const planDetails = location.state?.plan as PlanDetails | undefined;

  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "netbanking">("card");
  const [billingInfo, setBillingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    gstNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Redirect if no plan selected
  useEffect(() => {
    if (!planDetails) {
      navigate("/pricing");
    }
  }, [planDetails, navigate]);

  if (!planDetails) {
    return null;
  }

  const gstAmount = (planDetails.totalPrice * 0.18).toFixed(2);
  const finalTotal = (planDetails.totalPrice + parseFloat(gstAmount)).toFixed(2);

  const indianBanks = [
    "State Bank of India (SBI)",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Canara Bank",
    "IDFC First Bank",
    "Yes Bank"
  ];

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeTerms) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      console.log("Payment processed:", {
        plan: planDetails,
        billingInfo,
        paymentMethod,
        total: finalTotal
      });
      setProcessing(false);
      navigate("/dashboard");
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + "/" + v.slice(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-emerald-50/30">
      {/* Header */}
      <div className="border-b border-neutral-100 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/pricing")}
                className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-bold">Back to Pricing</span>
              </button>
              <div className="h-6 w-px bg-neutral-200" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center">
                  <img src={logo} alt="SustainAIM Logo" className="w-full h-full object-contain" />
                </div>
                <h1 className="font-black text-lg text-neutral-900 tracking-tighter leading-none">
                  Sustain<span className="text-emerald-600">AIM</span>
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Billing Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border-2 border-neutral-100 shadow-xl p-8"
            >
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full mb-4">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span className="text-xs font-black tracking-widest uppercase text-emerald-600">
                    Step 1 of 2
                  </span>
                </div>
                <h2 className="text-3xl font-black text-neutral-900 mb-2">Complete Your Purchase</h2>
                <p className="text-neutral-600 font-medium">
                  Enter your billing information and payment details to get started
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Billing Information */}
                <div>
                  <h3 className="text-xl font-black text-neutral-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-emerald-600" />
                    Billing Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-neutral-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={billingInfo.fullName}
                        onChange={(e) => setBillingInfo({ ...billingInfo, fullName: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-neutral-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={billingInfo.email}
                        onChange={(e) => setBillingInfo({ ...billingInfo, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-neutral-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={billingInfo.phone}
                        onChange={(e) => setBillingInfo({ ...billingInfo, phone: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-neutral-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={billingInfo.companyName}
                        onChange={(e) => setBillingInfo({ ...billingInfo, companyName: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium"
                        placeholder="Your company name"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-neutral-700 mb-2">
                        GST Number (Optional)
                      </label>
                      <input
                        type="text"
                        value={billingInfo.gstNumber}
                        onChange={(e) => setBillingInfo({ ...billingInfo, gstNumber: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium"
                        placeholder="22AAAAA0000A1Z5"
                        maxLength={15}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-neutral-700 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={billingInfo.address}
                        onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium"
                        placeholder="Street address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-neutral-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={billingInfo.city}
                        onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-neutral-700 mb-2">
                        State *
                      </label>
                      <select
                        required
                        value={billingInfo.state}
                        onChange={(e) => setBillingInfo({ ...billingInfo, state: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium"
                      >
                        <option value="">Select State</option>
                        {indianStates.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-neutral-700 mb-2">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={billingInfo.pincode}
                        onChange={(e) => setBillingInfo({ ...billingInfo, pincode: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium"
                        placeholder="400001"
                        maxLength={6}
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div>
                  <h3 className="text-xl font-black text-neutral-900 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-600" />
                    Payment Method
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === "card"
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-neutral-200 hover:border-emerald-300"
                      }`}
                    >
                      <CreditCard className={`w-6 h-6 mx-auto mb-2 ${paymentMethod === "card" ? "text-emerald-600" : "text-neutral-400"}`} />
                      <p className="text-sm font-black text-neutral-900">Credit/Debit Card</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === "upi"
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-neutral-200 hover:border-emerald-300"
                      }`}
                    >
                      <Wallet className={`w-6 h-6 mx-auto mb-2 ${paymentMethod === "upi" ? "text-emerald-600" : "text-neutral-400"}`} />
                      <p className="text-sm font-black text-neutral-900">UPI</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("netbanking")}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === "netbanking"
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-neutral-200 hover:border-emerald-300"
                      }`}
                    >
                      <Building2 className={`w-6 h-6 mx-auto mb-2 ${paymentMethod === "netbanking" ? "text-emerald-600" : "text-neutral-400"}`} />
                      <p className="text-sm font-black text-neutral-900">Net Banking</p>
                    </button>
                  </div>

                  {/* Payment Details */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-neutral-700 mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          required
                          value={cardDetails.cardNumber}
                          onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: formatCardNumber(e.target.value) })}
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-neutral-700 mb-2">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={cardDetails.cardName}
                          onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium"
                          placeholder="Name on card"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-neutral-700 mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            required
                            value={cardDetails.expiryDate}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: formatExpiryDate(e.target.value) })}
                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-neutral-700 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            required
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, "") })}
                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium"
                            placeholder="123"
                            maxLength={3}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div>
                      <label className="block text-sm font-bold text-neutral-700 mb-2">
                        UPI ID *
                      </label>
                      <input
                        type="text"
                        required
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium"
                        placeholder="yourname@paytm"
                      />
                      <p className="text-xs text-neutral-500 font-medium mt-2">
                        Enter your UPI ID (e.g., mobile@paytm, name@okaxis, etc.)
                      </p>
                    </div>
                  )}

                  {paymentMethod === "netbanking" && (
                    <div>
                      <label className="block text-sm font-bold text-neutral-700 mb-2">
                        Select Your Bank *
                      </label>
                      <select
                        required
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium"
                      >
                        <option value="">Choose your bank</option>
                        {indianBanks.map((bank) => (
                          <option key={bank} value={bank}>
                            {bank}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Terms & Conditions */}
                <div className="bg-neutral-50 border-2 border-neutral-100 rounded-xl p-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-5 h-5 mt-0.5 rounded border-2 border-neutral-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-neutral-700 font-medium">
                      I agree to the{" "}
                      <a href="#" className="text-emerald-600 font-bold hover:underline">
                        Terms & Conditions
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-emerald-600 font-bold hover:underline">
                        Privacy Policy
                      </a>
                      . I understand that I will be charged ₹{parseFloat(finalTotal).toLocaleString('en-IN')} including GST.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={processing}
                  className={`w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                    processing ? "opacity-50 cursor-not-allowed" : "hover:scale-105 active:scale-95"
                  }`}
                >
                  {processing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Complete Secure Payment
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 font-medium">
                  <Shield className="w-4 h-4" />
                  <span>Your payment information is encrypted and secure</span>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl border-2 border-neutral-100 shadow-xl p-6 sticky top-24"
            >
              <h3 className="text-xl font-black text-neutral-900 mb-6">Order Summary</h3>

              {/* Selected Plan */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl border-2 border-emerald-200 p-4 mb-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-black text-neutral-900">{planDetails.name}</h4>
                    <p className="text-xs text-neutral-600 font-medium">{planDetails.duration} Subscription</p>
                  </div>
                  <Calendar className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex items-baseline gap-1">
                  <IndianRupee className="w-4 h-4 text-neutral-900 mt-1" />
                  <span className="text-2xl font-black text-neutral-900">
                    {planDetails.monthlyPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-neutral-600 font-medium">/month</span>
                </div>
                {planDetails.discount > 0 && (
                  <div className="mt-2 inline-flex items-center gap-1 bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-black">
                    Save {planDetails.discount}%
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600 font-medium">Subscription ({planDetails.duration})</span>
                  <span className="font-black text-neutral-900">₹{planDetails.totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600 font-medium">GST (18%)</span>
                  <span className="font-black text-neutral-900">₹{parseFloat(gstAmount).toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t-2 border-neutral-100 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-neutral-900">Total Amount</span>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <IndianRupee className="w-5 h-5 text-emerald-600" />
                        <span className="text-2xl font-black text-emerald-600">
                          {parseFloat(finalTotal).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 font-medium">Including all taxes</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Included */}
              <div className="border-t-2 border-neutral-100 pt-6">
                <h4 className="text-sm font-black text-neutral-700 uppercase tracking-widest mb-3">
                  What's Included
                </h4>
                <div className="space-y-2">
                  {[
                    "14-day money-back guarantee",
                    "Instant account activation",
                    "24/7 customer support",
                    "Free upgrades & updates",
                    "Cancel anytime"
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-xs text-neutral-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 bg-neutral-50 rounded-xl p-4 border border-neutral-100">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-black text-neutral-900">Secure Payment</span>
                </div>
                <p className="text-xs text-neutral-600 font-medium">
                  Your payment is protected by 256-bit SSL encryption
                </p>
              </div>

              {/* Support Info */}
              <div className="mt-6 text-center">
                <p className="text-xs text-neutral-500 font-medium mb-2">Need help?</p>
                <a href="#" className="text-xs text-emerald-600 font-black hover:underline">
                  Contact Support →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-100 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-xl flex items-center justify-center">
                <img src={logo} alt="SustainAIM Logo" className="w-full h-full object-contain" />
              </div>
              <p className="text-neutral-400 text-xs font-black uppercase tracking-widest">
                © 2026 SustainAIM • Secure Payment
              </p>
            </div>
            <div className="flex items-center gap-4">
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
