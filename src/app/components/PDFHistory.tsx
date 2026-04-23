import React from "react";
import { FileText, Download, Calendar, Clock } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

interface PDFHistoryItem {
  id: string;
  title: string;
  date: string;
  time: string;
  size: string;
  type: "ESG" | "GHG";
}

interface PDFHistoryProps {
  type: "ESG" | "GHG";
}

export function PDFHistory({ type }: PDFHistoryProps) {
  const handleDownload = (item: PDFHistoryItem) => {
    toast.success(`Downloading ${item.title}...`);
  };

  // Mock PDF history data
  const pdfHistory: PDFHistoryItem[] = [
    {
      id: "1",
      title: `${type} Report - Q1 2026`,
      date: "2026-04-03",
      time: "14:30",
      size: "2.4 MB",
      type: type,
    },
    {
      id: "2",
      title: `${type} Report - Q4 2025`,
      date: "2026-01-15",
      time: "09:45",
      size: "2.1 MB",
      type: type,
    },
    {
      id: "3",
      title: `${type} Report - Q3 2025`,
      date: "2025-10-20",
      time: "16:20",
      size: "2.3 MB",
      type: type,
    },
    {
      id: "4",
      title: `${type} Report - Q2 2025`,
      date: "2025-07-18",
      time: "11:15",
      size: "2.0 MB",
      type: type,
    },
    {
      id: "5",
      title: `${type} Report - Q1 2025`,
      date: "2025-04-12",
      time: "13:50",
      size: "1.9 MB",
      type: type,
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-neutral-100 p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-black text-neutral-900">PDF Generation History</h2>
      </div>

      <div className="space-y-3">
        {pdfHistory.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 bg-neutral-50 rounded-2xl border-2 border-neutral-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group"
          >
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 bg-white border-2 border-neutral-200 group-hover:border-indigo-300 rounded-xl flex items-center justify-center shrink-0 transition-all">
                <FileText className="w-6 h-6 text-neutral-600 group-hover:text-indigo-600 transition-all" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-black text-neutral-900 mb-2">
                  {item.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-neutral-500" />
                    <span className="text-neutral-600 font-bold">
                      {formatDate(item.date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neutral-500" />
                    <span className="text-neutral-600 font-bold">{item.time}</span>
                  </div>
                  <span className="px-3 py-1 bg-neutral-200 text-neutral-700 rounded-lg text-xs font-black">
                    {item.size}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleDownload(item)}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-black text-sm hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg group-hover:scale-105"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </motion.div>
        ))}
      </div>

      {pdfHistory.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-500 font-bold">No PDF reports generated yet</p>
          <p className="text-neutral-400 font-medium text-sm mt-2">
            Generate your first report to see it here
          </p>
        </div>
      )}
    </div>
  );
}
