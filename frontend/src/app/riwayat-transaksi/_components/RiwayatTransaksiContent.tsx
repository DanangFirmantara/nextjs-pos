"use client";

import { useState, useMemo } from "react";
import { Search, CalendarDays } from "lucide-react";
import { Transaksi } from "./types";
import { DUMMY } from "./data";
import SummaryCards from "./SummaryCards";
import TransaksiTable from "./TransaksiTable";
import DetailModal from "./DetailModal";

export default function RiwayatTransaksiContent() {
  const [data] = useState<Transaksi[]>(DUMMY);
  const [search, setSearch] = useState("");
  const [detailTarget, setDetailTarget] = useState<Transaksi | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter((t) =>
      t.noTransaksi.toLowerCase().includes(q) ||
      t.kasir.toLowerCase().includes(q) ||
      t.metodeBayar.toLowerCase().includes(q)
    );
  }, [data, search]);

  const totalPenjualan = filtered.reduce((s, t) => s + t.totalPembayaran, 0);
  const labaKotor      = filtered.reduce((s, t) => s + t.labaKotor, 0);

  return (
    <main className="flex-1 overflow-y-auto p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Riwayat Transaksi</h2>
        <p className="text-sm text-gray-500 mt-0.5">Lihat dan kelola riwayat penjualan</p>
      </div>

      <SummaryCards totalTransaksi={filtered.length} totalPenjualan={totalPenjualan} labaKotor={labaKotor} />

      {/* Filter bar */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => alert("Filter periode")}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors">
          <CalendarDays className="w-4 h-4" /> Filter periode
        </button>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Cari nama atau kode barang..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
      </div>

      <TransaksiTable filtered={filtered} total={data.length} onDetail={setDetailTarget} />
      <DetailModal target={detailTarget} onClose={() => setDetailTarget(null)} />
    </main>
  );
}
