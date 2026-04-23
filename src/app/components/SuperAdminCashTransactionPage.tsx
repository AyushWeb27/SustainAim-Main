import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  X,
  Save,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Building2,
  CreditCard,
  ArrowUpCircle,
  ArrowDownCircle,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface Transaction {
  id: number;
  transactionId: string;
  customerName: string;
  customerEmail: string;
  type: "Income" | "Expense" | "Refund";
  category: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: "Completed" | "Pending" | "Failed" | "Cancelled";
  date: string;
  description: string;
}

export function SuperAdminCashTransactionPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      transactionId: "TXN-2024-001",
      customerName: "TechCorp Global",
      customerEmail: "admin@techcorp.com",
      type: "Income",
      category: "Subscription Payment",
      amount: 416583,
      currency: "INR",
      paymentMethod: "Credit Card",
      status: "Completed",
      date: "2024-03-20",
      description: "Enterprise Plan - Annual Subscription",
    },
    {
      id: 2,
      transactionId: "TXN-2024-002",
      customerName: "GreenManufacturing Inc",
      customerEmail: "contact@greenmfg.com",
      type: "Income",
      category: "Subscription Payment",
      amount: 166583,
      currency: "INR",
      paymentMethod: "Bank Transfer",
      status: "Completed",
      date: "2024-03-19",
      description: "Professional Plan - Monthly Subscription",
    },
    {
      id: 3,
      transactionId: "TXN-2024-003",
      customerName: "EcoRetail Solutions",
      customerEmail: "admin@ecoretail.com",
      type: "Refund",
      category: "Subscription Refund",
      amount: 41583,
      currency: "INR",
      paymentMethod: "Credit Card",
      status: "Completed",
      date: "2024-03-18",
      description: "Partial refund for downgraded plan",
    },
    {
      id: 4,
      transactionId: "TXN-2024-004",
      customerName: "Sustainable Logistics",
      customerEmail: "info@suslog.com",
      type: "Income",
      category: "Subscription Payment",
      amount: 24916,
      currency: "INR",
      paymentMethod: "UPI",
      status: "Pending",
      date: "2024-03-17",
      description: "Starter Plan - Monthly Subscription",
    },
    {
      id: 5,
      transactionId: "TXN-2024-005",
      customerName: "CleanEnergy Partners",
      customerEmail: "team@cleanenergy.com",
      type: "Income",
      category: "Add-on Purchase",
      amount: 66583,
      currency: "INR",
      paymentMethod: "Credit Card",
      status: "Completed",
      date: "2024-03-16",
      description: "Advanced Analytics Module",
    },
    {
      id: 6,
      transactionId: "TXN-2024-006",
      customerName: "Urban Development Co",
      customerEmail: "admin@urbandev.com",
      type: "Income",
      category: "Subscription Payment",
      amount: 166583,
      currency: "INR",
      paymentMethod: "Credit Card",
      status: "Failed",
      date: "2024-03-15",
      description: "Professional Plan - Monthly Subscription",
    },
    {
      id: 7,
      transactionId: "TXN-2024-007",
      customerName: "System Maintenance",
      customerEmail: "admin@sustainaim.com",
      type: "Expense",
      category: "Infrastructure",
      amount: 291667,
      currency: "INR",
      paymentMethod: "Bank Transfer",
      status: "Completed",
      date: "2024-03-14",
      description: "AWS Cloud Services - Monthly Bill",
    },
    {
      id: 8,
      transactionId: "TXN-2024-008",
      customerName: "FutureTech Industries",
      customerEmail: "billing@futuretech.com",
      type: "Income",
      category: "Subscription Payment",
      amount: 416583,
      currency: "INR",
      paymentMethod: "Wire Transfer",
      status: "Completed",
      date: "2024-03-13",
      description: "Enterprise Plan - Annual Subscription",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingTransaction, setViewingTransaction] = useState<Transaction | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"All" | "Income" | "Expense" | "Refund">("All");
  const [filterStatus, setFilterStatus] = useState<"All" | "Completed" | "Pending" | "Failed" | "Cancelled">("All");

  const handleViewTransaction = (transaction: Transaction) => {
    setViewingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setViewingTransaction(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      setTransactions(transactions.filter((transaction) => transaction.id !== id));
      toast.success("Transaction deleted successfully!");
    }
  };

  const handleExport = () => {
    toast.success("Exporting transactions to CSV...");
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === "All" || transaction.type === filterType;
    const matchesStatus = filterStatus === "All" || transaction.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate summary statistics
  const totalIncome = transactions
    .filter((t) => t.type === "Income" && t.status === "Completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense" && t.status === "Completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalRefunds = transactions
    .filter((t) => t.type === "Refund" && t.status === "Completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const netRevenue = totalIncome - totalExpense - totalRefunds;

  const summaryCards = [
    {
      label: "Total Income",
      value: `₹${totalIncome.toLocaleString('en-IN')}`,
      change: "+12.5%",
      icon: ArrowUpCircle,
      color: "emerald",
    },
    {
      label: "Total Expenses",
      value: `₹${totalExpense.toLocaleString('en-IN')}`,
      change: "+3.2%",
      icon: ArrowDownCircle,
      color: "red",
    },
    {
      label: "Total Refunds",
      value: `₹${totalRefunds.toLocaleString('en-IN')}`,
      change: "-2.1%",
      icon: TrendingDown,
      color: "amber",
    },
    {
      label: "Net Revenue",
      value: `₹${netRevenue.toLocaleString('en-IN')}`,
      change: "+15.8%",
      icon: DollarSign,
      color: "blue",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-xl ${
                    card.color === "emerald"
                      ? "bg-emerald-50"
                      : card.color === "red"
                      ? "bg-red-50"
                      : card.color === "amber"
                      ? "bg-amber-50"
                      : "bg-blue-50"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      card.color === "emerald"
                        ? "text-emerald-600"
                        : card.color === "red"
                        ? "text-red-600"
                        : card.color === "amber"
                        ? "text-amber-600"
                        : "text-blue-600"
                    }`}
                  />
                </div>
                <span
                  className={`text-xs font-black px-2 py-1 rounded-lg ${
                    card.change.startsWith("+")
                      ? "text-emerald-600 bg-emerald-50"
                      : "text-red-600 bg-red-50"
                  }`}
                >
                  {card.change}
                </span>
              </div>
              <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-1">
                {card.label}
              </p>
              <p className="text-3xl font-black text-neutral-900">{card.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Filters and Actions */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 sm:flex-initial w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="w-full sm:w-auto px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            >
              <option value="All">All Types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
              <option value="Refund">Refund</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full sm:w-auto px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            >
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <button
            onClick={handleExport}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-200"
          >
            <Download className="w-5 h-5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Transaction ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Payment Method
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-sm text-neutral-900">
                      {transaction.transactionId}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-sm text-neutral-900">
                        {transaction.customerName}
                      </p>
                      <p className="text-xs text-neutral-500">{transaction.customerEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-black ${
                        transaction.type === "Income"
                          ? "bg-emerald-50 text-emerald-700"
                          : transaction.type === "Expense"
                          ? "bg-red-50 text-red-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-neutral-900">
                      {transaction.currency} ₹{transaction.amount.toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-neutral-500">{transaction.category}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-neutral-400" />
                      <span className="text-sm font-bold text-neutral-900">
                        {transaction.paymentMethod}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-black ${
                        transaction.status === "Completed"
                          ? "bg-emerald-50 text-emerald-700"
                          : transaction.status === "Pending"
                          ? "bg-blue-50 text-blue-700"
                          : transaction.status === "Failed"
                          ? "bg-red-50 text-red-700"
                          : "bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-neutral-400" />
                      <span className="text-sm font-bold text-neutral-900">
                        {new Date(transaction.date).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewTransaction(transaction)}
                        className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-all"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
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

        {filteredTransactions.length === 0 && (
          <div className="p-12 text-center">
            <AlertCircle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-lg font-bold text-neutral-900 mb-2">No transactions found</p>
            <p className="text-sm text-neutral-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        <div className="p-6 border-t border-neutral-200 flex items-center justify-between">
          <p className="text-sm text-neutral-500 font-bold">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-neutral-200 rounded-lg text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-all">
              Previous
            </button>
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-all">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* View Transaction Modal */}
      <AnimatePresence>
        {isModalOpen && viewingTransaction && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
                  <h2 className="text-2xl font-black text-neutral-900">
                    Transaction Details
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-2">
                        Transaction ID
                      </p>
                      <p className="text-lg font-bold text-neutral-900">
                        {viewingTransaction.transactionId}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-2">
                        Date
                      </p>
                      <p className="text-lg font-bold text-neutral-900">
                        {new Date(viewingTransaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-2">
                      Customer
                    </p>
                    <p className="text-lg font-bold text-neutral-900">
                      {viewingTransaction.customerName}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {viewingTransaction.customerEmail}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-2">
                        Type
                      </p>
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-sm font-black ${
                          viewingTransaction.type === "Income"
                            ? "bg-emerald-50 text-emerald-700"
                            : viewingTransaction.type === "Expense"
                            ? "bg-red-50 text-red-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {viewingTransaction.type}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-2">
                        Status
                      </p>
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-sm font-black ${
                          viewingTransaction.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700"
                            : viewingTransaction.status === "Pending"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {viewingTransaction.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-2">
                      Amount
                    </p>
                    <p className="text-3xl font-black text-neutral-900">
                      {viewingTransaction.currency} ₹
                      {viewingTransaction.amount.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-2">
                        Category
                      </p>
                      <p className="text-sm font-bold text-neutral-900">
                        {viewingTransaction.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-2">
                        Payment Method
                      </p>
                      <p className="text-sm font-bold text-neutral-900">
                        {viewingTransaction.paymentMethod}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-2">
                      Description
                    </p>
                    <p className="text-sm text-neutral-900">
                      {viewingTransaction.description}
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleCloseModal}
                      className="w-full px-6 py-3 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl font-bold transition-all shadow-lg shadow-emerald-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
