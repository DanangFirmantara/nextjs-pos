"use client";

import { useState, useRef } from "react";
import { File } from "lucide-react";
import { Label, Input, SaveBtn } from "./FormFields";

export default function TabProfilToko() {
  const [nama, setNama]         = useState("");
  const [alamat, setAlamat]     = useState("");
  const [telp, setTelp]         = useState("");
  const [wa, setWa]             = useState("");
  const [npwp, setNpwp]         = useState("");
  const [logoName, setLogoName] = useState<string | null>(null);
  const fileRef                 = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
      <h3 className="text-base font-semibold text-gray-800">Informasi Toko</h3>
      <div><Label text="Nama toko" required /><Input placeholder="Contoh: Sumber Rezeki 5" value={nama} onChange={setNama} /></div>
      <div>
        <Label text="Alamat lengkap" required />
        <textarea placeholder="Contoh: Jl. Merdeka Kendala, KM.14, C..." value={alamat} onChange={(e) => setAlamat(e.target.value)}
          rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><Label text="Nomor telepon" required /><Input placeholder="+62" value={telp} onChange={setTelp} /></div>
        <div><Label text="Nomor WhatsApp" required /><Input placeholder="+62" value={wa} onChange={setWa} /></div>
      </div>
      <div><Label text="NPWP (opsional)" /><Input placeholder="Contoh: 01.000.000.000" value={npwp} onChange={setNpwp} /></div>
      <div>
        <Label text="Logo toko (opsional)" />
        <div className="flex items-start gap-4">
          <button onClick={() => fileRef.current?.click()}
            className="flex flex-col items-center justify-center w-36 h-28 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-blue-400 hover:text-blue-400 transition-colors text-xs gap-1">
            <File className="w-6 h-6" />
            <span>{logoName ?? "Klik untuk upload"}</span>
          </button>
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/svg+xml" className="hidden"
            onChange={(e) => setLogoName(e.target.files?.[0]?.name ?? null)} />
          <div className="text-xs text-gray-400 mt-2 space-y-0.5"><p>Format: JPG, PNG, atau SVG</p><p>Ukuran maksimal: 2MB</p></div>
        </div>
      </div>
      <SaveBtn label="Simpan Perubahan" onClick={() => alert("Profil toko disimpan")} />
    </div>
  );
}
