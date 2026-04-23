import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export interface EmissionRecord {
  id: number;
  branch?: string;
  year: number;
  month: string;
  category: string;
  inputDate: string;
  invoice: string;
  activityData: string;
  emissionFactor: string;
  emissions: string;
}

interface EmissionTableProps {
  records: EmissionRecord[];
  headerColor: string;
  accentColor: string;
  badgeBg: string; // Background for the invoice/bill ID
  onEdit?: (record: EmissionRecord) => void;
  onDelete?: (id: number) => void;
}

export function EmissionTable({ records, headerColor, accentColor, badgeBg, onEdit, onDelete }: EmissionTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className={`${headerColor} text-white`}>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">SR. NO.</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">BRANCH</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">YEAR</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">MONTH</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">CATEGORY</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">INPUT DATE</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">INVOICE/BILL</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">ACTIVITY Data</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest whitespace-nowrap text-center">EMISSION FACTOR</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">EMISSION (TCO2E)</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest whitespace-nowrap text-center">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {records.map((record, index) => (
            <tr key={record.id} className="hover:bg-neutral-50/50 transition-colors group">
              <td className="px-6 py-5 text-sm font-black text-neutral-400">{index + 1}</td>
              <td className="px-6 py-5">
                <span className="inline-block px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-black border border-emerald-100">
                  {record.branch || "N/A"}
                </span>
              </td>
              <td className="px-6 py-5 text-sm font-black text-neutral-900">{record.year}</td>
              <td className="px-6 py-5 text-sm font-bold text-neutral-500">{record.month}</td>
              <td className="px-6 py-5 text-sm font-black text-neutral-800">{record.category}</td>
              <td className="px-6 py-5 text-sm font-bold text-neutral-400">{record.inputDate}</td>
              <td className="px-6 py-5">
                <span className={`inline-block px-4 py-2 rounded-xl text-sm font-black ${badgeBg} ${accentColor} border border-current/10 shadow-sm`}>
                  {record.invoice}
                </span>
              </td>
              <td className="px-6 py-5 text-sm font-black text-neutral-600">{record.activityData}</td>
              <td className="px-6 py-5 text-center">
                <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-lg text-xs font-black uppercase tracking-tight">
                  {record.emissionFactor}
                </span>
              </td>
              <td className="px-6 py-5">
                <span className="inline-block px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-sm font-black border border-rose-100 shadow-sm">
                  {record.emissions}
                </span>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center justify-center gap-2">
                  {onEdit && (
                    <button 
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border border-transparent hover:border-blue-100" 
                      onClick={() => onEdit(record)}
                      title="Edit Record"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  )}
                  {onDelete && (
                    <button 
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-transparent hover:border-rose-100" 
                      onClick={() => onDelete(record.id)}
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}