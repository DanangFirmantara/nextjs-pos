import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import TemplateContent from "./_components/TemplateContent";

export default function TemplatePage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <TemplateContent />
      </div>
    </div>
  );
}
