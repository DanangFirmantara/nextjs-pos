import Sidebar from "@/components/Sidebar";
import Navbar  from "@/components/Navbar";
import PengeluaranContent from "./_components/PengeluaranContent";

export default function PengeluaranPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <PengeluaranContent />
      </div>
    </div>
  );
}
