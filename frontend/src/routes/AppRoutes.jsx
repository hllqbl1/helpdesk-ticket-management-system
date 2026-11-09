import { Routes, Route } from "react-router";

import LandingPage from "../pages/LandingPage";
import CreateTicketPage from "../pages/CreateTicketPage";
import DashboardTicketPage from "../pages/DashboardTicketPage";
import ContactPage from "../pages/ContactPage";

// Admin Pages
import DashboardAdminPage from "../pages/admin/DashboardAdminPage";
import AdminTicketsPage from "../pages/admin/AdminTicketPage";
import AdminLayout from "../layouts/AdminLayout";

// Import uji
import Navbar from "../components/Navbar";

function AppRoutes() {
  return (
    <Routes>
      {/* Halaman awal */}
      <Route path="/" element={<LandingPage />} />

      {/* Membuat tiket */}
      <Route path="/tickets/new" element={<CreateTicketPage />} />

      {/* Dashboard User */}
      <Route path="/dashboard" element={<DashboardTicketPage />} />

      {/* Contact */}
      <Route path="/contact" element={<ContactPage />} />

      {/* Halaman Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardAdminPage />} />
        <Route path="tickets" element={<AdminTicketsPage />} />
      </Route>

      {/* Halaman Uji Coba */}
      <Route path="/uji" element={<Navbar />} />
    </Routes>
  );
}

export default AppRoutes;
