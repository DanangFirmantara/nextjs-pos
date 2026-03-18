"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, CalendarDays, Printer, Plus } from "lucide-react";
import { Pengeluaran, EMPTY_FORM, KATEGORI_OPTIONS, fmt } from "./types";
import { INITIAL } from "./data";
import PengeluaranTable from "./PengeluaranTable";
import PengeluaranModal from "./PengeluaranModal";
import DeleteModal from "./DeleteModal";

export default function PengeluaranContent() {
  const [data, setData]               = useState<Pengeluaran[]>(INITIAL);
  const [search, setSearch]           = useState("");
  const [filterKat, setFilterKat]     = useState("Semua kategori");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen]     = useState(false);
  const [editTarget, setEditTarget]   = useState<Pengeluaran | null>(null);
  const [form, setForm]               = useState<Omit<Pengeluaran, "id">>(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState<Pengeluaran | null>(null);

  const filtered = useMemo(() => data.filter((p) => {
    const matchKat = filterKat === "Semua kategori" || p.kategori === filterKat;
    const q = search.toLowerCase();
    return matchKat && (p.deskripsi.toLowerCase().includes(q) || p.kategori.toLowerCase().includes(q));
  }), [data, search, filterKat]);

  const totalNominal = filtered.reduce((s, p) => s + p.nominal, 0);

  const openAdd = () => { setEditTarget(null); setForm(EMPTY_FORM); setModalOpen(true); };
  const openEdit = (p: Pengeluaran) => { setEditTarget(p); const { id, ...rest } = p; setForm(rest); setModalOpen(true); };

  const handleSave = () => {
    if (!form.deskripsi || !form.tanggal || form.nominal <= 0) return;
    if (editTarget) {
      setData((prev) => prev.map((p) => p.id === editTarget.id ? { ...form, id: editTarget.id } : p));
    } else {
      const newId = data.length ? Math.max(...data.map((p) => p.id)) + 1 : 1;
      setData((prev) => [...prev, { ...form, id: newId }]);
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setData((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <main className="flex-1 overflow-y-auto p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Pengeluaran Toko</h2>
          <p className="text-sm text-gray-500 mt-0.5">Catat dan kelola pengeluaran operasional</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => alert("Cetak Pengeluaran")} className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-blue-600 text-blue-600 rounded-lg bg-white hover:bg-blue-50 transition-colors">
            <Printer className="w-4 h-4" /> Cetak Pengeluaran
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" /> Tambah Pengeluaran
          </button>
        </div>
      </div>

      {/* Summary Banner */}
      <div className="flex items-center justify-between px-5 py-4 mb-5 bg-red-50 border border-red-200 rounded-xl">
        <div>
          <p className="text-sm font-medium text-red-500 mb-0.5">Total pengeluaran</p>
          <p className="text-2xl font-bold text-red-600">{fmt(totalNominal)}</p>
        </div>
        <p className="text-sm font-semibold text-red-500">{filtered.length} Pengeluaran tercatat</p>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <button onClick={() => setDropdownOpen((v) => !v)} className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 min-w-[160px] justify-between">
              {filterKat} <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {dropdownOpen && (
              <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md py-1">
                {["Semua kategori", ...KATEGORI_OPTIONS].map((k) => (
                  <li key={k}>
                    <button onClick={() => { setFilterKat(k); setDropdownOpen(false); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${filterKat === k ? "text-blue-600 font-medium" : "text-gray-700"}`}>{k}</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button onClick={() => alert("Filter periode")} className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
            <CalendarDays className="w-4 h-4" /> Filter periode
          </button>
        </div>
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Cari deskripsi pengeluaran..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
      </div>

      <PengeluaranTable filtered={filtered} onEdit={openEdit} onDelete={setDeleteTarget} />
      <PengeluaranModal open={modalOpen} onClose={() => setModalOpen(false)} editTarget={editTarget} form={form} setForm={setForm} onSave={handleSave} />
      <DeleteModal itemName={deleteTarget?.deskripsi ?? null} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} />
    </main>
  );
}
