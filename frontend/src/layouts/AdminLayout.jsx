import { useState } from "react";
import { Outlet } from "react-router";
import SidebarAdmin from "../components/SidebarAdmin";

function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarAdmin isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="min-w-0 flex-1">
        {/* Header Mobile */}
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-slate-200 bg-white p-4 md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="text-2xl text-slate-700"
          >
            ☰
          </button>

          <h1 className="font-bold text-blue-600">Helpdesk Admin</h1>
        </header>

        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
