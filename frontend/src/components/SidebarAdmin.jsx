import { NavLink } from "react-router";

function SidebarAdmin({ isOpen, setIsOpen }) {
  const menuClass = ({ isActive }) => {
    if (isActive) {
      return "flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition bg-blue-600 text-white";
    }

    return "flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition text-slate-600 hover:bg-slate-100";
  };

  return (
    <>
      {/* Overlay untuk HP */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white p-5 transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">Helpdesk</h1>
            <p className="mt-1 text-sm text-slate-500">Admin Panel</p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-xl text-slate-500 md:hidden"
          >
            ✕
          </button>
        </div>

        {/* Navigasi */}
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/admin"
            end
            className={menuClass}
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/tickets"
            className={menuClass}
            onClick={() => setIsOpen(false)}
          >
            Manajemen Tiket
          </NavLink>
        </nav>

        {/* Informasi Admin */}
        <div className="mt-auto border-t border-slate-200 pt-5">
          <p className="font-semibold text-slate-800">Administrator</p>
          <p className="text-sm text-slate-500">Admin Panel</p>
        </div>
      </aside>
    </>
  );
}

export default SidebarAdmin;
