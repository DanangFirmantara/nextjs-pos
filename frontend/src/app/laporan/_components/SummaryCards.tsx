import { ShoppingCart, FileText, Wallet } from "lucide-react";
import { fmt } from "./types";
import { SUMMARY } from "./data";

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
          <ShoppingCart className="w-5 h-5 text-purple-500" />
        </div>
        <div>
          <p className="text-xs text-gray-500">Total transaksi</p>
          <p className="text-2xl font-bold text-purple-600">{SUMMARY.totalTransaksi}</p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <p className="text-xs text-gray-500">Total pendapatan</p>
          <p className="text-lg font-bold text-blue-600">{fmt(SUMMARY.totalPendapatan)}</p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-red-500" />
        </div>
        <div>
          <p className="text-xs text-gray-500">Total pengeluaran</p>
          <p className="text-lg font-bold text-red-500">{fmt(SUMMARY.totalPengeluaran)}</p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
          <Wallet className="w-5 h-5 text-green-500" />
        </div>
        <div>
          <p className="text-xs text-gray-500">Laba kotor</p>
          <p className="text-lg font-bold text-green-600">{fmt(SUMMARY.labaKotor)}</p>
        </div>
      </div>
    </div>
  );
}
