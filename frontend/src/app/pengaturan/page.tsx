import Sidebar from "@/components/Sidebar";
import Navbar  from "@/components/Navbar";
import PengaturanContent from "./_components/PengaturanContent";

export default function PengaturanPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <PengaturanContent />
      </div>
    </div>
  );
}
