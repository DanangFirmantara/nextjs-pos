import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ListMenu from "@/components/ListMenu";
import RingkasanPembayaran from "@/components/RingkasanPembayaran";

import { KasirProvider } from "@/components/KasirContext";

export default function KasirPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <KasirProvider>
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 p-6 overflow-y-auto">
              <ListMenu />
            </div>
            <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
              <RingkasanPembayaran />
            </div>
          </div>
        </KasirProvider>
      </div>
    </div>
  );
}
