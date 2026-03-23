"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Package,
  History,
  BarChart3,
  DollarSign,
  Settings,
  LogOut,
  Sun,
  Moon,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "./ui";
import { usePathname, useRouter } from 'next/navigation';

const MENU_ITEMS = [
  { icon: ShoppingCart, label: "Kasir", path: "/kasir" },
  { icon: Package, label: "Barang & Stok", path: "/barang-stock" },
  { icon: History, label: "Riwayat Transaksi", path: "/riwayat-transaksi" },
  { icon: BarChart3, label: "Laporan", path: "/laporan" },
  { icon: DollarSign, label: "Pengeluaran", path: "/pengeluaran" },
  { icon: Settings, label: "Pengatuaran", path: "/pengaturan" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [dark, setDark] = useState(false);
  const router = useRouter();
  const path = usePathname();

  const handleNavigate = (path: string) => {
    router.push(path);
  }

  return (
    <aside
      className={`h-full bg-white flex flex-col transition-all duration-300 shadow ${
        open ? "w-[270px]" : "w-20"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
        {open && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mr-[12px]">
              <ShoppingCart className="w-5 h-5 text-white" 
              />
            </div>
            <div>
              <div className="font-bold text-gray-800 text-lg">Pos System</div>
              <div className="text-xs text-gray-500">Sistem kasir</div>
            </div>
          </div>
        )}
        {!open && (
          <div className="w-full flex justify-center">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white"
                onClick={() => setOpen(!open)}
              />
            </div>
          </div>
        )}
        {open && (
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center p-1 rounded bg-gray-100 hover:bg-gray-200 mx-2"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
        )}
        
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-2 space-y-2 mt-5">
        {MENU_ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-100 rounded transition-colors ${
                item.path === path ? "bg-blue-50 font-medium text-blue-600" : "text-gray-700"
              }`}
              onClick={() => handleNavigate(item.path)}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {open && <span className="text-sm">{item.label}</span>}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      {open ? (
        <div className="mt-auto px-2 pb-4 space-y-2 border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-sm text-gray-600 flex-1">Mode Tampilan</span>
            <button
              onClick={() => setDark(!dark)}
              className="p-1.5 rounded-full hover:bg-gray-100"
            >
              {dark ? (
                <Moon className="w-4 h-4 text-gray-600" />
              ) : (
                <Sun className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
          <Button
            variant="danger"
            size="md"
            className="w-full flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            {open && <span>Keluar</span>}
          </Button>
      </div>
      ) : (
        <div className="mt-auto px-2 pb-4 space-y-2 border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between px-3 py-2">
            <button
              onClick={() => setDark(!dark)}
              className="p-1.5 rounded-full hover:bg-gray-100"
            >
              {dark ? (
                <Moon className="w-4 h-4 text-gray-600" />
              ) : (
                <Sun className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
          <Button
            variant="danger"
            size="md"
            className="w-full flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            {open && <span>Keluar</span>}
          </Button>
      </div>
      )}
    </aside>
  );
}
