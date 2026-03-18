import { Eye, Printer } from "lucide-react";
import { Transaksi, fmt } from "./types";

interface Props {
  filtered: Transaksi[];
  total: number;
  onDetail: (t: Transaksi) => void;
}

const HEADERS = ["No. Transaksi","Tanggal/Jam","Kasir","Total item","Total pembayaran","Metode bayar","Status","Aksi"];

export default function TransaksiTable({ filtered, total, onDetail }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {HEADERS.map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-10 text-gray-400 text-sm">Tidak ada data transaksi.</td></tr>
            ) : filtered.map((t) => (
              <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-700 whitespace-nowrap">{t.noTransaksi}</td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{t.tanggal}</td>
                <td className="px-4 py-3 text-gray-600">{t.kasir}</td>
                <td className="px-4 py-3 text-gray-600 text-center">{t.totalItem}</td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{fmt(t.totalPembayaran)}</td>
                <td className="px-4 py-3 text-gray-600">{t.metodeBayar}</td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${t.status === "Lunas" ? "bg-blue-600 text-white" : "bg-yellow-100 text-yellow-700"}`}>{t.status}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => onDetail(t)} className="p-1.5 rounded hover:bg-blue-50 text-blue-500 transition-colors" title="Detail"><Eye className="w-3.5 h-3.5" /></button>
                    <button onClick={() => alert(`Cetak struk ${t.noTransaksi}`)} className="p-1.5 rounded hover:bg-gray-100 text-gray-500 transition-colors" title="Cetak"><Printer className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 text-xs text-gray-500 border-t border-gray-100">
        Menampilkan 1 - {filtered.length} dari {total} data
      </div>
    </div>
  );
}
