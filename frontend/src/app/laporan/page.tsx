import Sidebar from "@/components/Sidebar";
import Navbar  from "@/components/Navbar";
import LaporanContent from "./_components/LaporanContent";

export default function LaporanPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <LaporanContent />
      </div>
    </div>
  );
}
