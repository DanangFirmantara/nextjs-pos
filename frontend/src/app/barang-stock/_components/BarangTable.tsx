import { Pencil, Trash2 } from "lucide-react";
import { Barang, formatRupiah, KATEGORI_OPTIONS } from "./types";

interface Props {
  filtered: Barang[];
  total: number;
  onEdit: (b: Barang) => void;
  onDelete: (b: Barang) => void;
}

const HEADERS = [
  "Kode barang","Nama barang","Kategori","Satuan",
  "Harga beli","Harga jual","Stok","Min. stok","Status","Aksi"
];

export default function BarangTable({ filtered, total, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {HEADERS.map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-10 text-gray-400 text-sm">
                  Tidak ada data yang ditemukan.
                </td>
              </tr>
            ) : (
              filtered.map((b) => {
                const isBelowMin = b.istock < b.iminStock;
                return (
                  <tr key={b.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">{b.kodeBarang}</td>
                    <td className="px-4 py-3 text-gray-700">{b.vname}</td>
                    <td className="px-4 py-3 text-gray-600">{KATEGORI_OPTIONS[b.ikategori]}</td>
                    <td className="px-4 py-3 text-gray-600">{b.ijenisSatuan}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{formatRupiah(b.hargaBeli)}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{formatRupiah(b.hargaJual)}</td>
                    <td className={`px-4 py-3 font-semibold whitespace-nowrap ${isBelowMin ? "text-red-500" : "text-gray-700"}`}>{b.istock}</td>
                    <td className="px-4 py-3 text-gray-600">{b.iminStock}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${b.bis_active ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}>
                        {b.bis_active ? "Aktif" : "Tidak Aktif"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => onEdit(b)}
                          className="p-1.5 rounded hover:bg-blue-50 text-blue-500 transition-colors" title="Edit">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => onDelete(b)}
                          className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors" title="Hapus">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 text-xs text-gray-500 border-t border-gray-100">
        Menampilkan 1 - {filtered.length} dari {total} data
      </div>
    </div>
  );
}
