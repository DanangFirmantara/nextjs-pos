"use client";

import { useRef, useState } from "react";
import { X, Image as ImageIcon, Loader } from "lucide-react";
import { useGetReferensiByTypeQuery } from "@/store/api/masterReferensiApi";
import { Barang } from "./types";

// Utility functions untuk format input harga dengan separator ribuan
function formatNumberInput(value: string): string {
  // Strip semua non-digit characters
  const numericValue = value.replace(/\D/g, "");
  if (!numericValue) return "";
  // Format dengan separator ribuan (Indonesian format: dot for thousands)
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function parseNumberInput(value: string): number {
  // Remove all non-digit characters and convert to number
  const numericValue = value.replace(/\D/g, "");
  return numericValue ? Number(numericValue) : 0;
}

interface Props {
  open: boolean;
  onClose: () => void;
  editTarget: Barang | null;
  form: Omit<Barang, "id">;
  setForm: React.Dispatch<React.SetStateAction<Omit<Barang, "id">>>;
  onSave: () => void;
  isSaving?: boolean;
}

export default function BarangModal({ open, onClose, editTarget, form, setForm, onSave, isSaving = false }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  // State untuk error field
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  // Fetch kategori dan satuan dari API
  const { data: kategoris = [], isLoading: isLoadingKategori } = useGetReferensiByTypeQuery("Kategori", { skip: !open });
  const { data: satuans = [], isLoading: isLoadingSatuan } = useGetReferensiByTypeQuery("Satuan", { skip: !open });

  if (!open) return null;

  // Helper untuk styling error
  const field =
    "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const fieldError =
    "w-full border border-red-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-red-50";

  // Validasi field required
  function validate() {
    const newErrors: { [key: string]: boolean } = {};
    if (!form.vname?.trim()) newErrors.vname = true;
    // kodeBarang tidak required lagi
    if (form.ikategori === undefined || form.ikategori === null) newErrors.ikategori = true;
    if (form.ijenisSatuan === undefined || form.ijenisSatuan === null) newErrors.ijenisSatuan = true;
    if (!form.hargaBeli || form.hargaBeli <= 0) newErrors.hargaBeli = true;
    if (!form.hargaJual || form.hargaJual <= 0) newErrors.hargaJual = true;
    if (form.istock === undefined || form.istock === null || isNaN(form.istock)) newErrors.istock = true;
    if (form.iminStock === undefined || form.iminStock === null || isNaN(form.iminStock)) newErrors.iminStock = true;
    return newErrors;
  }

  // Handler Simpan
  function handleSave() {
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSave();
    }
  }

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
            <input type="text" placeholder="Contoh: Barang A" value={form.vname}
              onChange={(e) => { setForm((f) => ({ ...f, vname: e.target.value })); setErrors((err) => ({ ...err, vname: false })); }}
              className={errors.vname ? fieldError : field} />
          </div>

          {/* Kode | Barcode */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Kode barang
              </label>
              <input type="text" placeholder="Akan diisi otomatis" value={form.kodeBarang}
                disabled
                className={field + " bg-gray-100 text-gray-400 cursor-not-allowed"} />
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
              <select 
                value={form.ikategori}
                onChange={(e) => { setForm((f) => ({ ...f, ikategori: Number(e.target.value) })); setErrors((err) => ({ ...err, ikategori: false })); }}
                className={errors.ikategori ? fieldError : field}
                disabled={isLoadingKategori}>
                <option value="">
                  {isLoadingKategori ? "Loading..." : "Pilih kategori"}
                </option>
                {kategoris.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.vname}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Satuan <span className="text-red-500">*</span>
              </label>
              <select 
                value={form.ijenisSatuan}
                onChange={(e) => { setForm((f) => ({ ...f, ijenisSatuan: Number(e.target.value) })); setErrors((err) => ({ ...err, ijenisSatuan: false })); }}
                className={errors.ijenisSatuan  ? fieldError : field}
                disabled={isLoadingSatuan}>
                <option value="">
                  {isLoadingSatuan ? "Loading..." : "Pilih satuan"}
                </option>
                {satuans.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.vname}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Harga beli | Harga jual */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Harga beli (Rp) <span className="text-red-500">*</span>
              </label>
              <input type="text" inputMode="numeric" placeholder="Rp 0" value={formatNumberInput(String(form.hargaBeli || ""))}
                onChange={(e) => { const numValue = parseNumberInput(e.target.value); setForm((f) => ({ ...f, hargaBeli: numValue })); setErrors((err) => ({ ...err, hargaBeli: false })); }}
                className={errors.hargaBeli ? fieldError : field} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Harga jual (Rp) <span className="text-red-500">*</span>
              </label>
              <input type="text" inputMode="numeric" placeholder="Rp 0" value={formatNumberInput(String(form.hargaJual || ""))}
                onChange={(e) => { const numValue = parseNumberInput(e.target.value); setForm((f) => ({ ...f, hargaJual: numValue })); setErrors((err) => ({ ...err, hargaJual: false })); }}
                className={errors.hargaJual ? fieldError : field} />
            </div>
          </div>

          {/* Stok awal | Minimum stok */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Stok awal <span className="text-red-500">*</span>
              </label>
              <input type="number" placeholder="0" value={form.istock || ""}
                onChange={(e) => { setForm((f) => ({ ...f, istock: Number(e.target.value) })); setErrors((err) => ({ ...err, istock: false })); }}
                className={errors.istock  ? fieldError : field} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Minimum stok <span className="text-red-500">*</span>
              </label>
              <input type="number" placeholder="0" value={form.iminStock || ""}
                onChange={(e) => { setForm((f) => ({ ...f, iminStock: Number(e.target.value) })); setErrors((err) => ({ ...err, iminStock: false })); }}
                className={errors.iminStock  ? fieldError : field} />
            </div>
          </div>

          {/* Status aktif toggle */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Status aktif</label>
            <button type="button"
              onClick={() => setForm((f) => ({ ...f, bis_active: f.bis_active ? false : true }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${form.bis_active ? "bg-blue-600" : "bg-gray-300"}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${form.bis_active ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-gray-200 shrink-0">
          <button onClick={onClose}
            disabled={isSaving}
            className="flex-1 px-4 py-2.5 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Batal
          </button>
          <button onClick={handleSave}
            disabled={isSaving}
            className="flex-1 px-4 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {isSaving && <Loader className="w-4 h-4 animate-spin" />}
            {editTarget ? "Simpan Perubahan" : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}
