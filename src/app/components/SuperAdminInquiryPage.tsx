import React, { useState } from "react";
import {
  Mail,
  Phone,
  Building2,
  User,
  Calendar,
  MessageSquare,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Filter,
  Download,
  Search,
  MoreVertical
} from "lucide-react";

export function SuperAdminInquiryPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

  // Mock inquiry data
  const inquiries = [
    {
      id: 1,
      fullName: "Rajesh Kumar",
      email: "rajesh.kumar@techcorp.in",
      phoneNumber: "+91 98765 43210",
      company: "TechCorp Solutions Pvt Ltd",
      interestedIn: "Climate Change",
      message: "We are looking to track our carbon emissions across 15 manufacturing facilities in India. Need a comprehensive solution.",
      status: "new",
      submittedAt: "2026-04-08T10:30:00Z",
      location: "Mumbai, Maharashtra"
    },
    {
      id: 2,
      fullName: "Priya Sharma",
      email: "priya@greenenergy.co.in",
      phoneNumber: "+91 87654 32109",
      company: "Green Energy India Pvt Ltd",
      interestedIn: "Energy Efficiency",
      message: "Interested in energy efficiency tracking for our solar panel manufacturing units.",
      status: "contacted",
      submittedAt: "2026-04-07T14:15:00Z",
      location: "Bangalore, Karnataka"
    },
    {
      id: 3,
      fullName: "Amit Patel",
      email: "amit.patel@ecoretail.com",
      phoneNumber: "+91 98765 12345",
      company: "EcoRetail Solutions",
      interestedIn: "Carbon Footprint & Carbon Markets",
      message: "We want to participate in carbon credit markets and need proper tracking mechanisms.",
      status: "converted",
      submittedAt: "2026-04-06T09:45:00Z",
      location: "Ahmedabad, Gujarat"
    },
    {
      id: 4,
      fullName: "Sneha Reddy",
      email: "sneha@wastemanagement.in",
      phoneNumber: "+91 76543 21098",
      company: "Sustainable Waste Management Ltd",
      interestedIn: "Waste Management",
      message: "Looking for comprehensive waste tracking and circular economy solutions for 20+ cities.",
      status: "new",
      submittedAt: "2026-04-08T08:20:00Z",
      location: "Hyderabad, Telangana"
    },
    {
      id: 5,
      fullName: "Vikram Singh",
      email: "vikram@hydrogenpower.co.in",
      phoneNumber: "+91 65432 10987",
      company: "Hydrogen Power India",
      interestedIn: "Hydrogen Economy",
      message: "We are developing green hydrogen facilities and need ESG reporting framework.",
      status: "contacted",
      submittedAt: "2026-04-05T16:30:00Z",
      location: "Pune, Maharashtra"
    },
    {
      id: 6,
      fullName: "Ananya Iyer",
      email: "ananya@sustainconsult.com",
      phoneNumber: "+91 54321 09876",
      company: "Sustain Consultancy Services",
      interestedIn: "Environmental Social & Governance",
      message: "Need ESG reporting platform for our consulting clients. Interested in bulk licensing.",
      status: "new",
      submittedAt: "2026-04-08T11:45:00Z",
      location: "Chennai, Tamil Nadu"
    },
    {
      id: 7,
      fullName: "Rahul Verma",
      email: "rahul@circulareconomy.in",
      phoneNumber: "+91 43210 98765",
      company: "Circular Economy Solutions",
      interestedIn: "Circular Economy",
      message: "Looking for training programs for our team on circular economy practices.",
      status: "contacted",
      submittedAt: "2026-04-07T13:10:00Z",
      location: "Delhi, NCR"
    },
    {
      id: 8,
      fullName: "Meera Nair",
      email: "meera@ehssolutions.co.in",
      phoneNumber: "+91 32109 87654",
      company: "EHS Solutions India",
      interestedIn: "Environmental Health Safety",
      message: "We need comprehensive EHS tracking for our manufacturing operations across India.",
      status: "rejected",
      submittedAt: "2026-04-04T10:00:00Z",
      location: "Kochi, Kerala"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "contacted":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "converted":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-neutral-100 text-neutral-700 border-neutral-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <Clock className="w-4 h-4" />;
      case "contacted":
        return <MessageSquare className="w-4 h-4" />;
      case "converted":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesStatus = selectedStatus === "all" || inquiry.status === selectedStatus;
    const matchesSearch =
      inquiry.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = [
    { label: "Total Inquiries", value: inquiries.length, color: "emerald" },
    { label: "New Inquiries", value: inquiries.filter(i => i.status === "new").length, color: "blue" },
    { label: "Contacted", value: inquiries.filter(i => i.status === "contacted").length, color: "amber" },
    { label: "Converted", value: inquiries.filter(i => i.status === "converted").length, color: "emerald" }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border-2 border-neutral-100 shadow-sm">
            <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-2">
              {stat.label}
            </p>
            <p className="text-3xl font-black text-neutral-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-6 border-2 border-neutral-100 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500 focus:outline-none transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-neutral-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 focus:border-emerald-500 focus:outline-none transition-all"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Export Button */}
          <button className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="bg-white rounded-2xl border-2 border-neutral-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b-2 border-neutral-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-700 uppercase tracking-widest">
                  Contact Info
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-700 uppercase tracking-widest">
                  Company
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-700 uppercase tracking-widest">
                  Interested In
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-700 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-700 uppercase tracking-widest">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-700 uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredInquiries.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-bold text-neutral-900">{inquiry.fullName}</p>
                        <div className="flex items-center gap-1 text-xs text-neutral-500 mt-1">
                          <Mail className="w-3 h-3" />
                          {inquiry.email}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-neutral-500 mt-0.5">
                          <Phone className="w-3 h-3" />
                          {inquiry.phoneNumber}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-neutral-400" />
                      <div>
                        <p className="font-bold text-neutral-900">{inquiry.company}</p>
                        <p className="text-xs text-neutral-500">{inquiry.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 rounded-lg bg-neutral-100 text-neutral-700 text-xs font-bold">
                      {inquiry.interestedIn}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${getStatusColor(inquiry.status)}`}>
                      {getStatusIcon(inquiry.status)}
                      {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-neutral-600">
                      <Calendar className="w-4 h-4" />
                      {new Date(inquiry.submittedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedInquiry(inquiry)}
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
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
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-black text-neutral-900">Inquiry Details</h3>
                <p className="text-sm text-neutral-500 font-bold mt-1">
                  Submitted on {new Date(selectedInquiry.submittedAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-all"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Contact Information */}
              <div>
                <h4 className="text-xs font-black text-neutral-700 uppercase tracking-widest mb-3">
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl">
                    <User className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-xs text-neutral-500 font-bold">Full Name</p>
                      <p className="font-bold text-neutral-900">{selectedInquiry.fullName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl">
                    <Mail className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-xs text-neutral-500 font-bold">Email Address</p>
                      <p className="font-bold text-neutral-900">{selectedInquiry.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl">
                    <Phone className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-xs text-neutral-500 font-bold">Phone Number</p>
                      <p className="font-bold text-neutral-900">{selectedInquiry.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl">
                    <Building2 className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-xs text-neutral-500 font-bold">Company</p>
                      <p className="font-bold text-neutral-900">{selectedInquiry.company}</p>
                      <p className="text-sm text-neutral-600">{selectedInquiry.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interest */}
              <div>
                <h4 className="text-xs font-black text-neutral-700 uppercase tracking-widest mb-3">
                  Area of Interest
                </h4>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <p className="font-bold text-emerald-900">{selectedInquiry.interestedIn}</p>
                </div>
              </div>

              {/* Message */}
              <div>
                <h4 className="text-xs font-black text-neutral-700 uppercase tracking-widest mb-3">
                  Message
                </h4>
                <div className="p-4 bg-neutral-50 rounded-xl">
                  <p className="text-neutral-700 leading-relaxed">{selectedInquiry.message}</p>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <h4 className="text-xs font-black text-neutral-700 uppercase tracking-widest mb-3">
                  Update Status
                </h4>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">
                    Mark as New
                  </button>
                  <button className="flex-1 px-4 py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-all">
                    Mark as Contacted
                  </button>
                  <button className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all">
                    Mark as Converted
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-xl font-black hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Send Email
                </button>
                <button className="flex-1 px-6 py-3 bg-neutral-600 text-white rounded-xl font-black hover:bg-neutral-700 transition-all flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
