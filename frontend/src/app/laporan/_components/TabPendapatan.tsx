"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { fmt, fmtAxis } from "./types";
import { PENDAPATAN_HARIAN, PERBANDINGAN, METODE_BAYAR } from "./data";

const LineTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
      <p className="font-semibold mb-0.5">{label}</p>
      <p>{fmt(payload[0].value)}</p>
    </div>
  );
};

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

export default function TabPendapatan() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Pendapatan Harian</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={PENDAPATAN_HARIAN} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="tgl" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={fmtAxis} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={60} />
            <Tooltip content={<LineTooltip />} />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2}
              dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Metode Pembayaran</h3>
          <div className="flex items-center gap-6">
            <PieChart width={160} height={160}>
              <Pie data={METODE_BAYAR} cx={75} cy={75} innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={2}>
                {METODE_BAYAR.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
            <div className="space-y-2">
              {METODE_BAYAR.map((m) => {
                const total = METODE_BAYAR.reduce((s, x) => s + x.value, 0);
                return (
                  <div key={m.name} className="flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: m.color }} />
                    <span className="text-gray-600 w-12">{m.name}</span>
                    <span className="text-gray-500 text-xs">{m.value} ({((m.value / total) * 100).toFixed(2)}%)</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Pendapatan vs Pengeluaran</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={PERBANDINGAN} margin={{ top: 5, right: 10, left: 0, bottom: 5 }} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="tgl" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={fmtAxis} tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={45} />
              <Tooltip content={<BarTooltip />} />
              <Bar dataKey="pendapatan" fill="#22c55e" radius={[3, 3, 0, 0]} />
              <Bar dataKey="pengeluaran" fill="#ef4444" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
