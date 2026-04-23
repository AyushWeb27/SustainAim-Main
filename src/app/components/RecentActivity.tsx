import React from "react";
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  ArrowRight,
  User,
  Zap,
  Leaf
} from "lucide-react";
import { motion } from "motion/react";

const activities = [
  {
    id: 1,
    type: "alert",
    title: "Scope 1 Threshold Exceeded",
    time: "2h ago",
    status: "critical",
    icon: AlertTriangle,
    color: "bg-rose-500",
    text: "rose-600"
  },
  {
    id: 2,
    type: "report",
    title: "Q4 Environmental Audit Ready",
    time: "5h ago",
    status: "info",
    icon: CheckCircle2,
    color: "bg-emerald-500",
    text: "emerald-600"
  },
  {
    id: 3,
    type: "system",
    title: "Solar Grid Connectivity Active",
    time: "Yesterday",
    status: "success",
    icon: Zap,
    color: "bg-amber-500",
    text: "amber-600"
  },
  {
    id: 4,
    type: "user",
    title: "New Inventory Data Added by HR",
    time: "2 days ago",
    status: "neutral",
    icon: User,
    color: "bg-blue-500",
    text: "blue-600"
  }
];

export function RecentActivity() {
  return (
    <div className="bg-white p-8 rounded-[3rem] border border-neutral-100 shadow-xl shadow-neutral-100/30 flex flex-col h-full group overflow-hidden relative">
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h3 className="text-xl font-black text-neutral-900 tracking-tight">Activity Stream</h3>
          <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">Real-time system updates</p>
        </div>
        <button className="p-2 text-neutral-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all">
          <Bell className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6 relative z-10 flex-1">
        {activities.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-4 p-4 hover:bg-neutral-50 rounded-3xl transition-all border border-transparent hover:border-neutral-100 group/item"
          >
            <div className={`p-3 rounded-2xl ${item.color} shadow-lg shadow-${item.text}/20 shrink-0`}>
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-black text-neutral-900 truncate leading-tight mb-1 group-hover/item:text-emerald-600 transition-colors">{item.title}</h4>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3 text-neutral-300" />
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{item.time}</span>
              </div>
            </div>
            <button className="opacity-0 group-hover/item:opacity-100 transition-all p-2 text-neutral-400 hover:text-emerald-600">
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      <button className="mt-8 py-4 bg-neutral-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-900/20 w-full">
        View Full Audit Log
      </button>

      {/* Decorative background element */}
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-neutral-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
    </div>
  );
}
