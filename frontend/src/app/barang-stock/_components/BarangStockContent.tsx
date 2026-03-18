"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, ChevronDown, Download, Plus, AlertTriangle, CheckCircle } from "lucide-react";
import { Barang, EMPTY_FORM, KATEGORI_OPTIONS } from "./types";
import { INITIAL_DATA } from "./data";
import BarangTable from "./BarangTable";
import BarangModal from "./BarangModal";
import DeleteModal from "./DeleteModal";

export default function BarangStockContent() {
  const [data, setData]                   = useState<Barang[]>(INITIAL_DATA);
  const [search, setSearch]               = useState("");
  const [kategori, setKategori]           = useState("Semua kategori");
  const [dropdownOpen, setDropdownOpen]   = useState(false);
  const [modalOpen, setModalOpen]         = useState(false);
  const [editTarget, setEditTarget]       = useState<Barang | null>(null);
  const [form, setForm]                   = useState<Omit<Barang, "id">>(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget]   = useState<Barang | null>(null);
  const [toast, setToast]                 = useState<string | null>(null);

  // Auto-dismiss toast after 2.5s
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const filtered = useMemo(() => data.filter((b) => {
    const matchKat = kategori === "Semua kategori" || b.kategori === kategori;
    const q = search.toLowerCase();
    return matchKat && (b.nama.toLowerCase().includes(q) || b.kode.toLowerCase().includes(q));
  }), [data, search, kategori]);

  const lowStockCount = data.filter((b) => b.stok < b.minStok).length;

  const openAdd = () => { setEditTarget(null); setForm(EMPTY_FORM); setModalOpen(true); };
  const openEdit = (b: Barang) => {
    setEditTarget(b);
    const { id, ...rest } = b;
    setForm(rest);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.kode || !form.nama || !form.satuan) return;
    if (editTarget) {
      setData((prev) => prev.map((b) => b.id === editTarget.id ? { ...form, id: editTarget.id } : b));
      setToast("Data berhasil diperbarui");
    } else {
      setData((prev) => [...prev, { ...form, id: Math.max(...prev.map((b) => b.id)) + 1 }]);
      setToast("Data berhasil ditambahkan");
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setData((prev) => prev.filter((b) => b.id !== deleteTarget.id));
    setDeleteTarget(null);
    setToast("Barang berhasil dihapus");
  };

  return (
    <main className="flex-1 overflow-y-auto p-6 relative">

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-lg animate-fade-in">
          <CheckCircle className="w-4 h-4 shrink-0" />
          {toast}
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Daftar Barang</h2>
          <p className="text-sm text-gray-500 mt-0.5">Kelola data barang &amp; inventori</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => alert("Ekspor PDF")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" /> Ekspor PDF
          </button>
          <button onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" /> Tambah Barang
          </button>
        </div>
      </div>

      {/* Low-stock alert */}
      {lowStockCount > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 mb-5 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-sm font-medium">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-500" />
          {lowStockCount} barang memiliki stok di bawah minimum
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center justify-between mb-4 gap-3">
        {/* Category dropdown */}
        <div className="relative">
          <button onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 min-w-[160px] justify-between">
            {kategori} <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>
          {dropdownOpen && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md py-1">
              {KATEGORI_OPTIONS.map((k) => (
                <li key={k}>
                  <button onClick={() => { setKategori(k); setDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${kategori === k ? "text-blue-600 font-medium" : "text-gray-700"}`}>
                    {k}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-sm ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Cari nama atau kode barang..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
      </div>

      <BarangTable filtered={filtered} total={data.length} onEdit={openEdit} onDelete={setDeleteTarget} />
      <BarangModal open={modalOpen} onClose={() => setModalOpen(false)} editTarget={editTarget} form={form} setForm={setForm} onSave={handleSave} />
      <DeleteModal itemName={deleteTarget?.nama ?? null} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} />
    </main>
  );
}
