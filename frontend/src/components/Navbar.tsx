'use client';

import { Bell, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <div>
        <h1 className="font-semibold text-lg text-gray-800">Kasir</h1>
        <span className="text-xs text-gray-500">Toko Sumber Rezeki</span>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-500">Waktu</span>
          <span className="font-medium text-sm text-gray-700">
            {time.toLocaleString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false
            })}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
          <span className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center font-bold text-white text-sm">
            A
          </span>
          <div className="flex flex-col">
            <span className="text-xs text-gray-600">Akbar Hidayat</span>
            <span className="text-xs text-gray-500">Kasir</span>
          </div>
        </div>
      </div>
    </header>
  );
}
