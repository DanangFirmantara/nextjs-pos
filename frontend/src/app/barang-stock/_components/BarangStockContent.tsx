"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, ChevronDown, Download, Plus, AlertTriangle, CheckCircle, Loader } from "lucide-react";
import { Barang, EMPTY_FORM, KATEGORI_OPTIONS } from "./types";
import { useGetAllBarangQuery, useCreateBarangMutation, useUpdateBarangMutation, useDeleteBarangMutation } from "@/store/api/barangApi";
import BarangTable from "./BarangTable";
import BarangModal from "./BarangModal";
import DeleteModal from "./DeleteModal";
import Toast from "@/components/Toast";

export default function BarangStockContent() {
  const { data: apiData = [], isLoading, error } = useGetAllBarangQuery();
  const [createBarang, { isLoading: isCreating }] = useCreateBarangMutation();
  const [updateBarang, { isLoading: isUpdating }] = useUpdateBarangMutation();
  const [deleteBarang, { isLoading: isDeleting }] = useDeleteBarangMutation();
  const [data, setData]                   = useState<Barang[]>([]);
  const [search, setSearch]               = useState("");
  const [kategori, setKategori]           = useState("Semua kategori");
  const [dropdownOpen, setDropdownOpen]   = useState(false);
  const [modalOpen, setModalOpen]         = useState(false);
  const [editTarget, setEditTarget]       = useState<Barang | null>(null);
  const [form, setForm]                   = useState<Omit<Barang, "id">>(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget]   = useState<Barang | null>(null);
  const [toast, setToast]                 = useState<string | null>(null);

  // Update local data when API data changes
  useEffect(() => {
    if (apiData.length > 0) {
      setData(apiData);
    }
  }, [apiData]);

  // Auto-dismiss toast after 2.5s
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  // Show error toast if API fails
  useEffect(() => {
    if (error) {
      setToast("Gagal memuat data barang");
    }
  }, [error]);

  const filtered = useMemo(() => data.filter((b) => {
    const matchKat = kategori === "Semua kategori" || b.ikategori === KATEGORI_OPTIONS.indexOf(kategori);
    const q = search.toLowerCase();
    return matchKat && (b.vname.toLowerCase().includes(q) || b.kodeBarang.toLowerCase().includes(q));
  }), [data, search, kategori]);

  const lowStockCount = data.filter((b) => b.istock < b.iminStock).length;

  const openAdd = () => { setEditTarget(null); setForm(EMPTY_FORM); setModalOpen(true); };
  const openEdit = (b: Barang) => {
    setEditTarget(b);
    const { id, ...rest } = b;
    setForm(rest);
    setModalOpen(true);
  };

  const handleSave = async () => {
    // Better validation - check required fields properly
    if ( !form.vname?.trim()) {
      setToast("Nama barang harus diisi");
      return;
    }
    
    try {
      if (editTarget) {
        const result = await updateBarang({ id: editTarget.id, data: form }).unwrap();
        setToast("Data berhasil diperbarui");
      } else {
        const result = await createBarang(form).unwrap();

        setToast("Data berhasil ditambahkan");
      }
      setModalOpen(false);
      setForm(EMPTY_FORM);
      setEditTarget(null);
    } catch (err: any) {
      const errorMsg = err?.data?.message || err?.data?.error || err?.message || "Gagal menyimpan data barang";
      setToast(errorMsg);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    
    try {
      await deleteBarang(deleteTarget.id).unwrap();
      setDeleteTarget(null);
      setToast("Barang berhasil dihapus");
    } catch (err: any) {
      setToast(err?.data?.message || "Gagal menghapus barang");
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-6 relative">

      {/* Toast Notification */}
      {toast && <Toast message={toast} duration={3000} onClose={() => setToast("")} />}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader className="w-6 h-6 text-blue-600 animate-spin" />
          <span className="ml-3 text-sm text-gray-600">Memuat data barang...</span>
        </div>
      )}

      {!isLoading && (
        <>
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
          <BarangModal open={modalOpen} onClose={() => setModalOpen(false)} editTarget={editTarget} form={form} setForm={setForm} onSave={handleSave} isSaving={isCreating || isUpdating} />
          <DeleteModal itemName={deleteTarget?.vname ?? null} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} isDeleting={isDeleting} />
        </>
      )}
    </main>
  );
}
