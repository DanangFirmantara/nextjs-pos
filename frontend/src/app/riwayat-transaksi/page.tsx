import Sidebar from "@/components/Sidebar";
import Navbar  from "@/components/Navbar";
import RiwayatTransaksiContent from "./_components/RiwayatTransaksiContent";

export default function RiwayatTransaksiPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <RiwayatTransaksiContent />
      </div>
    </div>
  );
}
