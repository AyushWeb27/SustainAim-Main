import React from "react";
import { MoreHorizontal, ArrowUpRight, CheckCircle2, Clock, AlertCircle, MapPin } from "lucide-react";

const tableData = [
  {
    id: 1,
    project: "Solar Panel Installation",
    location: "Berlin, DE",
    status: "Completed",
    impact: "+15.2% Efficiency",
    date: "Feb 12, 2026",
    color: "emerald"
  },
  {
    id: 2,
    project: "Fleet Electrification",
    location: "London, UK",
    status: "In Progress",
    impact: "Pending Analysis",
    date: "Feb 08, 2026",
    color: "blue"
  },
  {
    id: 3,
    project: "Waste Reduction Initiative",
    location: "New York, US",
    status: "Delayed",
    impact: "-4.5% Waste",
    date: "Jan 28, 2026",
    color: "rose"
  },
  {
    id: 4,
    project: "Green Supply Chain",
    location: "Paris, FR",
    status: "Completed",
    impact: "+8.1% ESG Score",
    date: "Jan 15, 2026",
    color: "emerald"
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed": return <CheckCircle2 className="w-4 h-4" />;
    case "In Progress": return <Clock className="w-4 h-4" />;
    case "Delayed": return <AlertCircle className="w-4 h-4" />;
    default: return null;
  }
};

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Completed": return "bg-emerald-50 text-emerald-700 border-emerald-100";
    case "In Progress": return "bg-blue-50 text-blue-700 border-blue-100";
    case "Delayed": return "bg-rose-50 text-rose-700 border-rose-100";
    default: return "bg-neutral-50 text-neutral-700 border-neutral-100";
  }
};

export function ImpactTable() {
  return (
    <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-xl shadow-neutral-100/30 overflow-hidden">
      <div className="p-8 border-b border-neutral-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-50/20">
        <div>
          <h3 className="text-xl font-black text-neutral-900 tracking-tight">Project Activity Feed</h3>
          <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest mt-1">Real-time sustainability metrics</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-200">
          View All <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-neutral-100">
              <th className="px-8 py-5 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Initiative</th>
              <th className="px-8 py-5 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Location</th>
              <th className="px-8 py-5 text-[10px] font-black text-neutral-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Performance</th>
              <th className="px-8 py-5 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Timestamp</th>
              <th className="px-8 py-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50">
            {tableData.map((row) => (
              <tr key={row.id} className="hover:bg-neutral-50/50 transition-all group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${row.status === 'Completed' ? 'bg-emerald-500' : row.status === 'Delayed' ? 'bg-rose-500' : 'bg-blue-500'}`} />
                    <span className="text-sm font-black text-neutral-900">{row.project}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <MapPin className="w-3.5 h-3.5 text-neutral-300" />
                    <span className="text-sm font-bold">{row.location}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(row.status)}`}>
                    {getStatusIcon(row.status)}
                    {row.status}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`text-sm font-black ${row.impact.includes('+') ? 'text-emerald-600' : row.impact.includes('-') ? 'text-rose-600' : 'text-neutral-900'}`}>
                    {row.impact}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">{row.date}</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2.5 text-neutral-300 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-all">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
