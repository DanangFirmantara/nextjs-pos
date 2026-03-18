import { ShoppingCart, FileText, Wallet } from "lucide-react";
import { fmt } from "./types";

interface Props {
  totalTransaksi: number;
  totalPenjualan: number;
  labaKotor: number;
}

export default function SummaryCards({ totalTransaksi, totalPenjualan, labaKotor }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
          <ShoppingCart className="w-5 h-5 text-purple-500" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Total transaksi</p>
          <p className="text-2xl font-bold text-purple-600">{totalTransaksi}</p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Total penjualan</p>
          <p className="text-xl font-bold text-blue-600">{fmt(totalPenjualan)}</p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
          <Wallet className="w-5 h-5 text-green-500" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Laba kotor</p>
          <p className="text-xl font-bold text-green-600">{fmt(labaKotor)}</p>
        </div>
      </div>
    </div>
  );
}
