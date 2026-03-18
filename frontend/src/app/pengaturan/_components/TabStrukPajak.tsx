"use client";

import { useState } from "react";
import Toggle from "./Toggle";
import { Label, Input, Select, SaveBtn } from "./FormFields";

export default function TabStrukPajak() {
  const [ppn, setPpn]                     = useState(true);
  const [diskon, setDiskon]               = useState("");
  const [pembulatan, setPembulatan]       = useState("Tidak ada pembulatan");
  const [formatNomor, setFormatNomor]     = useState("");
  const [resetNomor, setResetNomor]       = useState("Reset setiap bulan");
  const [ukuranKertas, setUkuranKertas]   = useState("Thermal 88mm");
  const [margin, setMargin]               = useState("");
  const [cetakOtomatis, setCetakOtomatis] = useState(true);

  const sec = "bg-white rounded-xl border border-gray-200 p-6 space-y-4";
  return (
    <div className="space-y-4">
      {/* Pengaturan Pajak */}
      <div className={sec}>
        <h3 className="text-base font-semibold text-gray-800">Pengaturan Pajak</h3>
        <div className="flex items-center justify-between py-3 px-4 border border-gray-200 rounded-lg">
          <div><p className="text-sm font-medium text-gray-700">PPN 11%</p><p className="text-xs text-gray-400 mt-0.5">Aktifkan PPN secara default pada transaksi baru</p></div>
          <Toggle checked={ppn} onChange={() => setPpn((v) => !v)} />
        </div>
        <div><Label text="Diskon Maksimal (%)" /><Input placeholder="Contoh: 50" value={diskon} onChange={setDiskon} /><p className="text-xs text-gray-400 mt-1">Batas maksimal diskon yang bisa diberikan kasir</p></div>
        <div><Label text="Pembulatan Harga" /><Select value={pembulatan} onChange={setPembulatan} options={["Tidak ada pembulatan","Pembulatan ke atas","Pembulatan ke bawah","Pembulatan terdekat"]} /></div>
        <SaveBtn label="Simpan Pengaturan Pajak" />
      </div>

      {/* Nomor Dokumen */}
      <div className={sec}>
        <h3 className="text-base font-semibold text-gray-800">Nomor Dokumen</h3>
        <div><Label text="Format Nomor Transaksi" /><Input placeholder="Contoh: DD-MM-YYYY" value={formatNomor} onChange={setFormatNomor} /><p className="text-xs text-gray-400 mt-1">(DD) = Tanggal, (MM) = Bulan, (YYYY) = Tahun</p></div>
        <div><Label text="Reset Nomor Urut" /><Select value={resetNomor} onChange={setResetNomor} options={["Reset setiap bulan","Reset setiap hari","Reset setiap tahun","Tidak reset"]} /></div>
        <SaveBtn label="Simpan Format Nomor" />
      </div>

      {/* Printer */}
      <div className={sec}>
        <h3 className="text-base font-semibold text-gray-800">Printer</h3>
        <div><Label text="Ukuran Kertas" /><Select value={ukuranKertas} onChange={setUkuranKertas} options={["Thermal 58mm","Thermal 80mm","Thermal 88mm","A4"]} /></div>
        <div><Label text="Margin (mm)" /><Input placeholder="Contoh: 5" value={margin} onChange={setMargin} /></div>
        <div className="flex items-center justify-between py-3 px-4 border border-gray-200 rounded-lg">
          <div><p className="text-sm font-medium text-gray-700">Cetak Otomatis</p><p className="text-xs text-gray-400 mt-0.5">Cetak struk secara otomatis setelah pembayaran</p></div>
          <Toggle checked={cetakOtomatis} onChange={() => setCetakOtomatis((v) => !v)} />
        </div>
        <div className="flex gap-3">
          <SaveBtn label="Simpan Format Nomor" />
          <button onClick={() => alert("Tes cetak")} className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">Tes Cetak</button>
        </div>
      </div>
    </div>
  );
}
