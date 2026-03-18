export default function TabData() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
      <h3 className="text-base font-semibold text-gray-800">Manajemen Data</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-gray-200 rounded-xl p-4 space-y-2">
          <p className="text-sm font-medium text-gray-700">Ekspor Data</p>
          <p className="text-xs text-gray-400">Unduh seluruh data toko dalam format CSV atau JSON</p>
          <button onClick={() => alert("Ekspor data")} className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">Ekspor CSV</button>
        </div>
        <div className="border border-red-200 rounded-xl p-4 space-y-2">
          <p className="text-sm font-medium text-red-600">Reset Data</p>
          <p className="text-xs text-gray-400">Hapus seluruh data transaksi. Tindakan tidak dapat dibatalkan.</p>
          <button onClick={() => { if (confirm("Yakin ingin mereset semua data?")) alert("Data direset"); }}
            className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Reset Data</button>
        </div>
      </div>
    </div>
  );
}
