"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { fmt, fmtAxis } from "./types";
import { PERBANDINGAN } from "./data";

const BarTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 text-xs px-3 py-2 rounded-lg shadow-lg">
      <p className="font-semibold mb-1 text-gray-700">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.fill }}>{p.name === "pendapatan" ? "Pendapatan" : "Pengeluaran"}: {fmt(p.value)}</p>
      ))}
    </div>
  );
};

export default function TabPerbandingan() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Pendapatan vs Pengeluaran</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={PERBANDINGAN} margin={{ top: 5, right: 20, left: 10, bottom: 5 }} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="tgl" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={fmtAxis} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={55} />
          <Tooltip content={<BarTooltip />} />
          <Legend formatter={(v) => v === "pendapatan" ? "Pendapatan" : "Pengeluaran"} wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="pendapatan" fill="#22c55e" radius={[3, 3, 0, 0]} />
          <Bar dataKey="pengeluaran" fill="#ef4444" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
