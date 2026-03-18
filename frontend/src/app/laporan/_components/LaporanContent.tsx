"use client";

import { useState } from "react";
import { CalendarDays, Printer } from "lucide-react";
import { Tab } from "./types";
import SummaryCards from "./SummaryCards";
import TabPendapatan from "./TabPendapatan";
import TabPengeluaran from "./TabPengeluaran";
import TabPerbandingan from "./TabPerbandingan";

const TABS: Tab[] = ["Pendapatan", "Pengeluaran", "Perbandingan"];

export default function LaporanContent() {
  const [tab, setTab] = useState<Tab>("Pendapatan");
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Laporan</h2>
          <p className="text-sm text-gray-500 mt-0.5">Analisa keuangan dan performa toko</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => alert("Filter periode")} className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors">
            <CalendarDays className="w-4 h-4" /> Filter periode
          </button>
          <button onClick={() => alert("Cetak Laporan")} className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-blue-600 text-blue-600 rounded-lg bg-white hover:bg-blue-50 transition-colors">
            <Printer className="w-4 h-4" /> Cetak Laporan
          </button>
        </div>
      </div>

      <SummaryCards />

      <div className="flex gap-1 mb-5">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Pendapatan"   && <TabPendapatan />}
      {tab === "Pengeluaran"  && <TabPengeluaran />}
      {tab === "Perbandingan" && <TabPerbandingan />}
    </main>
  );
}
