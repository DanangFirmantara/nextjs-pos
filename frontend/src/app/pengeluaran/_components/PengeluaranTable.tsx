import { Pencil, Trash2 } from "lucide-react";
import { Pengeluaran, KATEGORI_STYLE, fmt } from "./types";

interface Props {
  filtered: Pengeluaran[];
  onEdit: (p: Pengeluaran) => void;
  onDelete: (p: Pengeluaran) => void;
}

const HEADERS = ["Tanggal","Kategori pengeluaran","Deskripsi","Nominal","Pengguna","Aksi"];

export default function PengeluaranTable({ filtered, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {HEADERS.map((h) => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-10 text-gray-400 text-sm">Tidak ada data pengeluaran.</td></tr>
            ) : filtered.map((p) => (
              <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{p.tanggal}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${KATEGORI_STYLE[p.kategori]}`}>{p.kategori}</span>
                </td>
                <td className="px-4 py-3 text-gray-700">{p.deskripsi}</td>
                <td className="px-4 py-3 font-semibold text-red-500 whitespace-nowrap">{fmt(p.nominal)}</td>
                <td className="px-4 py-3 text-gray-600">{p.pengguna}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => onEdit(p)} className="p-1.5 rounded hover:bg-blue-50 text-blue-500 transition-colors" title="Edit"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => onDelete(p)} className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors" title="Hapus"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 text-sm text-gray-500 border-t border-gray-100">
        Menampilkan 1 - {filtered.length} dari {filtered.length} data
      </div>
    </div>
  );
}
