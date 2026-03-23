"use client";

import { useRef } from "react";
import { X, FileText } from "lucide-react";
import { Pengeluaran, Kategori, KATEGORI_OPTIONS } from "./types";

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
  editTarget: Pengeluaran | null;
  form: Omit<Pengeluaran, "id">;
  setForm: React.Dispatch<React.SetStateAction<Omit<Pengeluaran, "id">>>;
  onSave: () => void;
}

export default function PengeluaranModal({ open, onClose, editTarget, form, setForm, onSave }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  if (!open) return null;

  const field = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 flex flex-col max-h-[92vh] overflow-hidden">

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <div>
            <h3 className="font-semibold text-gray-900 text-base">
              {editTarget ? "Edit Pengeluaran" : "Tambah Pengeluaran Baru"}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">Catat pengeluaran operasional toko</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full mt-0.5">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 overflow-y-auto">

          {/* Tanggal */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Tanggal <span className="text-red-500">*</span>
            </label>
            <input type="text" placeholder="00/00/0000" value={form.tanggal}
              onChange={(e) => setForm((f) => ({ ...f, tanggal: e.target.value }))}
              className={field} />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Kategori <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select value={form.kategori}
                onChange={(e) => setForm((f) => ({ ...f, kategori: e.target.value as Kategori }))}
                className={`${field} appearance-none pr-8`}>
                <option value="">Pilih kategori</option>
                {KATEGORI_OPTIONS.map((k) => <option key={k}>{k}</option>)}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Deskripsi (opsional)</label>
            <textarea placeholder="Deskripsi singkat barang (opsional)" value={form.deskripsi}
              onChange={(e) => setForm((f) => ({ ...f, deskripsi: e.target.value }))}
              rows={3} className={`${field} resize-none`} />
          </div>

          {/* Nominal */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Nominal pengeluaran (Rp) <span className="text-red-500">*</span>
            </label>
            <input type="text" inputMode="numeric" placeholder="Rp 0" value={formatNumberInput(String(form.nominal || ""))}
              onChange={(e) => { const numValue = parseNumberInput(e.target.value); setForm((f) => ({ ...f, nominal: numValue })); }}
              className={field} />
          </div>

          {/* Lampiran */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Lampiran (opsional)</label>
            <input ref={fileRef} type="file" accept="image/*,.pdf" className="hidden" />
            <button type="button" onClick={() => fileRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg py-4 flex flex-col items-center gap-1 hover:border-blue-400 hover:bg-blue-50/30 transition-colors">
              <FileText className="w-7 h-7 text-gray-400 mb-0.5" />
              <span className="text-sm text-gray-500 font-medium">Klik untuk upload</span>
              <span className="text-xs text-gray-400">Format: JPG, PNG, atau PDF</span>
              <span className="text-xs text-gray-400">Ukuran maksimal: 2MB</span>
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
