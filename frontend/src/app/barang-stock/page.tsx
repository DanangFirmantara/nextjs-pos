import Sidebar from "@/components/Sidebar";
import Navbar  from "@/components/Navbar";
import BarangStockContent from "./_components/BarangStockContent";

export default function BarangStockPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <BarangStockContent />
      </div>
    </div>
  );
}
