"use client";

import { useState } from "react";
import { Store, Receipt, Users, Database } from "lucide-react";
import TabProfilToko from "./TabProfilToko";
import TabStrukPajak from "./TabStrukPajak";
import TabPengguna   from "./TabPengguna";
import TabData       from "./TabData";

type Tab = "Profil Toko" | "Struk & Pajak" | "Pengguna" | "Data";

const TABS: { label: Tab; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { label: "Profil Toko",  icon: Store    },
  { label: "Struk & Pajak", icon: Receipt },
  { label: "Pengguna",     icon: Users    },
  { label: "Data",         icon: Database },
];

export default function PengaturanContent() {
  const [activeTab, setActiveTab] = useState<Tab>("Profil Toko");
  return (
    <main className="flex-1 overflow-y-auto p-6 space-y-5">
      <h1 className="text-xl font-bold text-gray-800">Pengaturan</h1>

      {/* Tab Bar */}
      <div className="flex gap-1 border-b border-gray-200">
        {TABS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => setActiveTab(label)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === label
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Profil Toko"  && <TabProfilToko />}
      {activeTab === "Struk & Pajak" && <TabStrukPajak />}
      {activeTab === "Pengguna"     && <TabPengguna />}
      {activeTab === "Data"         && <TabData />}
    </main>
  );
}
