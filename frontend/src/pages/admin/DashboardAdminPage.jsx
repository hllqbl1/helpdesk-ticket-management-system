import { useState, useEffect } from "react";

function DashboardAdminPage() {
  const [tickets, setTickets] = useState([]);

  // Mengambil data tiket dari backend
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("http://localhost:8080/tickets");

        if (!response.ok) {
          throw new Error("Gagal mengambil data tiket");
        }

        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };

    fetchTickets();
  }, []);

  // Perhitungan statistik
  const totalTiket = tickets.length;

  const tiketBaru = tickets.filter((ticket) => ticket.status === "open").length;

  const tiketDiproses = tickets.filter(
    (ticket) => ticket.status === "in_progress",
  ).length;

  const tiketSelesai = tickets.filter(
    (ticket) => ticket.status === "resolved",
  ).length;

  return (
    <main className="flex min-h-screen w-full flex-col items-start bg-slate-50 px-6 py-12">
      {/* Header Dashboard */}
      <div className="flex w-full flex-col gap-3 p-5">
        <h1 className="text-2xl font-semibold lg:text-4xl">Dashboard Admin</h1>

        <p className="text-slate-600">
          Selamat datang di halaman administrasi Helpdesk Ticket Management
          System.
        </p>

        <p className="mt-3 font-medium text-slate-700">Ringkasan tiket:</p>
      </div>

      {/* Container Dashboard */}
      <div className="flex w-full flex-col gap-6 p-5">
        {/* Statistik */}
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="font-medium text-slate-500">TOTAL TIKET</p>
            <p className="text-3xl font-bold text-slate-800">{totalTiket}</p>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="font-medium text-slate-500">TIKET BARU</p>
            <p className="text-3xl font-bold text-blue-600">{tiketBaru}</p>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="font-medium text-slate-500">SEDANG DIPROSES</p>
            <p className="text-3xl font-bold text-yellow-600">
              {tiketDiproses}
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="font-medium text-slate-500">SELESAI</p>
            <p className="text-3xl font-bold text-green-600">{tiketSelesai}</p>
          </div>
        </div>

        {/* Informasi Tambahan */}
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-3 text-xl font-semibold text-slate-800">
            Informasi
          </h2>

          <p className="text-slate-600">
            Saat ini terdapat {totalTiket} tiket yang tersimpan dalam sistem.
            Kamu dapat mengelola tiket melalui menu Manajemen Tiket.
          </p>
        </div>
      </div>
    </main>
  );
}

export default DashboardAdminPage;
