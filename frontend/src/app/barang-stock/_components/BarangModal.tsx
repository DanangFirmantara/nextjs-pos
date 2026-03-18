"use client";

import { useRef } from "react";
import { X, Image as ImageIcon } from "lucide-react";
import { Barang } from "./types";

interface Props {
  open: boolean;
  onClose: () => void;
  editTarget: Barang | null;
  form: Omit<Barang, "id">;
  setForm: React.Dispatch<React.SetStateAction<Omit<Barang, "id">>>;
  onSave: () => void;
}

export default function BarangModal({ open, onClose, editTarget, form, setForm, onSave }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  if (!open) return null;

  const field =
    "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden flex flex-col max-h-[92vh]">

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <div>
            <h3 className="font-semibold text-gray-900 text-base">
              {editTarget ? "Edit Barang" : "Tambah Barang Baru"}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {editTarget ? "Ubah detail barang" : "Masukkan detail barang baru"}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full mt-0.5">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 overflow-y-auto">

          {/* Nama barang */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Nama barang <span className="text-red-500">*</span>
            </label>
            <input type="text" placeholder="Contoh: Barang A" value={form.nama}
              onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))}
              className={field} />
          </div>

          {/* Kode | Barcode */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Kode barang <span className="text-red-500">*</span>
              </label>
              <input type="text" placeholder="Contoh: BRG-001" value={form.kode}
                onChange={(e) => setForm((f) => ({ ...f, kode: e.target.value }))}
                className={field} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Barcode (opsional)</label>
              <input type="text" placeholder="Contoh: 00000000" value={form.barcode ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, barcode: e.target.value }))}
                className={field} />
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Deskripsi (opsional)</label>
            <textarea placeholder="Deskripsi singkat barang (opsional)" value={form.deskripsi ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, deskripsi: e.target.value }))}
              rows={3}
              className={`${field} resize-none`} />
          </div>

          {/* Gambar produk */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Gambar produk (opsional)</label>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" />
            <button type="button" onClick={() => fileRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg py-5 flex flex-col items-center gap-1 hover:border-blue-400 hover:bg-blue-50/30 transition-colors">
              <ImageIcon className="w-7 h-7 text-gray-400 mb-0.5" />
              <span className="text-sm text-gray-500 font-medium">Klik untuk upload</span>
              <span className="text-xs text-gray-400">Format: JPG, PNG, atau GIF</span>
              <span className="text-xs text-gray-400">Ukuran maksimal: 2MB</span>
              <span className="text-xs text-gray-400">Rasio: 1:1 (persegi)</span>
            </button>
          </div>

          {/* Kategori | Satuan */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Kategori <span className="text-red-500">*</span>
              </label>
              <select value={form.kategori}
                onChange={(e) => setForm((f) => ({ ...f, kategori: e.target.value as Barang["kategori"] }))}
                className={field}>
                <option value="">Pilih kategori</option>
                <option>Minuman</option>
                <option>Makanan</option>
                <option>Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Satuan <span className="text-red-500">*</span>
              </label>
              <select value={form.satuan}
                onChange={(e) => setForm((f) => ({ ...f, satuan: e.target.value }))}
                className={field}>
                <option value="">Pilih satuan</option>
                <option>Pcs</option>
                <option>Botol</option>
                <option>Cup</option>
                <option>Kg</option>
                <option>Gram</option>
              </select>
            </div>
          </div>

          {/* Harga beli | Harga jual */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Harga beli (Rp) <span className="text-red-500">*</span>
              </label>
              <input type="number" placeholder="Rp 0" value={form.hargaBeli || ""}
                onChange={(e) => setForm((f) => ({ ...f, hargaBeli: Number(e.target.value) }))}
                className={field} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Harga jual (Rp) <span className="text-red-500">*</span>
              </label>
              <input type="number" placeholder="Rp 0" value={form.hargaJual || ""}
                onChange={(e) => setForm((f) => ({ ...f, hargaJual: Number(e.target.value) }))}
                className={field} />
            </div>
          </div>

          {/* Stok awal | Minimum stok */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Stok awal <span className="text-red-500">*</span>
              </label>
              <input type="number" placeholder="0" value={form.stok || ""}
                onChange={(e) => setForm((f) => ({ ...f, stok: Number(e.target.value) }))}
                className={field} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Minimum stok <span className="text-red-500">*</span>
              </label>
              <input type="number" placeholder="0" value={form.minStok || ""}
                onChange={(e) => setForm((f) => ({ ...f, minStok: Number(e.target.value) }))}
                className={field} />
            </div>
          </div>

          {/* Status aktif toggle */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Status aktif</label>
            <button type="button"
              onClick={() => setForm((f) => ({ ...f, status: f.status === "Aktif" ? "Nonaktif" : "Aktif" }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${form.status === "Aktif" ? "bg-blue-600" : "bg-gray-300"}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${form.status === "Aktif" ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-gray-200 shrink-0">
          <button onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            Batal
          </button>
          <button onClick={onSave}
            className="flex-1 px-4 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            {editTarget ? "Simpan Perubahan" : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}
