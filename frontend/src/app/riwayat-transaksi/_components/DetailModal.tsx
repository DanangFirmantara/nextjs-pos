import { X, Printer } from "lucide-react";
import { Transaksi, fmt } from "./types";

interface Props {
  target: Transaksi | null;
  onClose: () => void;
}

export default function DetailModal({ target, onClose }: Props) {
  if (!target) return null;

  const subTotal = target.items.reduce((s, i) => s + i.subtotal, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 flex flex-col max-h-[92vh] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <h3 className="font-semibold text-gray-900">Detail Transaksi</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5 overflow-y-auto text-sm">

          {/* Info grid */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 divide-y divide-gray-200">
            <div className="grid grid-cols-2 divide-x divide-gray-200">
              <div className="px-4 py-3">
                <p className="text-xs text-gray-500 mb-0.5">No. Transaksi</p>
                <p className="font-semibold text-gray-800">{target.noTransaksi}</p>
              </div>
              <div className="px-4 py-3">
                <p className="text-xs text-gray-500 mb-0.5">Tanggal/Jam</p>
                <p className="font-semibold text-gray-800">{target.tanggal}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-200">
              <div className="px-4 py-3">
                <p className="text-xs text-gray-500 mb-0.5">No. Transaksi</p>
                <p className="font-semibold text-gray-800">{target.kasir}</p>
              </div>
              <div className="px-4 py-3">
                <p className="text-xs text-gray-500 mb-0.5">Status</p>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${target.status === "Lunas" ? "bg-blue-600 text-white" : "bg-yellow-100 text-yellow-700"}`}>
                  {target.status}
                </span>
              </div>
            </div>
          </div>

          {/* Item Transaksi */}
          <div>
            <p className="font-semibold text-gray-800 mb-3">Item Transaksi</p>
            <div className="space-y-2">
              {target.items.map((item, i) => (
                <div key={i} className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">{item.nama}</p>
                    <p className="text-xs text-gray-500">{fmt(item.harga)} x {item.qty}</p>
                  </div>
                  <span className="font-semibold text-gray-800 whitespace-nowrap">{fmt(item.subtotal)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subtotals */}
          <div className="space-y-2 border-t border-gray-100 pt-4">
            <div className="flex justify-between text-gray-600">
              <span>Sub total</span><span>{fmt(subTotal)}</span>
            </div>
            {target.ppn > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>PPN 11%</span><span>{fmt(target.ppn)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold border-t border-gray-100 pt-3 mt-1">
              <span className="text-gray-800">Total pembayaran</span>
              <span className="text-blue-600 text-base">{fmt(target.totalPembayaran)}</span>
            </div>
          </div>

          {/* Pembayaran */}
          <div className="border-t border-gray-100 pt-4 space-y-1.5">
            <p className="font-semibold text-gray-800 mb-2">Pembayaran</p>
            <div className="flex justify-between text-gray-600">
              <span>{target.metodeBayar}</span>
              <span>{fmt(target.bayar)}</span>
            </div>
            {target.kembalian > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Kembalian</span>
                <span>{fmt(target.kembalian)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-gray-200 shrink-0">
          <button onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            Tutup
          </button>
          <button onClick={() => alert(`Cetak struk ${target.noTransaksi}`)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Printer className="w-4 h-4" /> Cetak ulang
          </button>
        </div>
      </div>
    </div>
  );
}
