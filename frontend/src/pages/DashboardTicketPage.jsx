import { useState, useEffect } from "react";

function DashboardTicketPage() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Format tanggal
  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "-";

    return parsedDate.toLocaleString("id-ID", {
      dateStyle: "long",
      timeStyle: "short",
    });
  };

  // Mengambil data tiket dari backend
  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:8080/tickets");

      if (!response.ok) {
        throw new Error("Gagal mengambil data tiket");
      }

      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Mengambil detail tiket berdasarkan ID
  const handleDetail = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/tickets/${id}`);

      if (!response.ok) {
        throw new Error("Gagal mengambil detail tiket");
      }

      const data = await response.json();
      setSelectedTicket(data);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert(error.message);
    }
  };

  // Perhitungan statistik tiket
  const totalTiket = tickets.length;

  const tiketSelesai = tickets.filter(
    (ticket) => ticket.status === "resolved",
  ).length;

  const tiketDiproses = tickets.filter(
    (ticket) => ticket.status === "in_progress",
  ).length;

  const tiketDitolak = tickets.filter(
    (ticket) => ticket.status === "open",
  ).length;

  return (
    <main className="flex min-h-[80vh] w-full flex-col items-start bg-slate-50 px-6 py-12">
      {/* Header Dashboard */}
      <div className="flex w-full flex-col gap-4 p-5">
        <h1 className="text-2xl font-semibold lg:text-5xl">
          Halo, Selamat Datang!!
        </h1>

        <p>Di sini kamu bisa melihat status tiket yang pernah diajukan!</p>

        <p>Statistik bulan ini:</p>
      </div>

      {/* Container Dashboard */}
      <div className="flex w-full flex-col gap-6 p-5">
        {/* Bagian Statistik */}
        <div className="grid w-full grid-cols-1 gap-5 rounded-2xl border border-slate-300 bg-white p-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-gray-200 p-5">
            <p className="text-2xl font-semibold">TOTAL TIKET</p>
            <p>{totalTiket}</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-gray-200 p-5">
            <p className="text-2xl font-semibold">SELESAI</p>
            <p>{tiketSelesai}</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-gray-200 p-5">
            <p className="text-2xl font-semibold">DIPROSES</p>
            <p>{tiketDiproses}</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-gray-200 p-5">
            <p className="text-2xl font-semibold">MENUNGGU</p>
            <p>{tiketDitolak}</p>
          </div>
        </div>

        {/* Bagian Tabel Tiket */}
        <div className="w-full overflow-hidden rounded-2xl border border-slate-300 bg-white p-5">
          <h2 className="mb-5 text-xl font-semibold">Daftar Tiket</h2>

          {loading ? (
            <p className="py-8 text-center text-slate-500">
              Memuat data tiket...
            </p>
          ) : error ? (
            <p className="py-8 text-center text-red-500">{error}</p>
          ) : tickets.length === 0 ? (
            <p className="py-8 text-center text-slate-500">
              Belum ada tiket yang diajukan.
            </p>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-300 bg-slate-100">
                    <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                      ID
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                      JUDUL
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                      STATUS
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                      AKSI
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50"
                    >
                      <td className="px-5 py-4 text-sm text-slate-600">
                        #{ticket.id}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-slate-800">
                        {ticket.title}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {ticket.status}
                      </td>

                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => handleDetail(ticket.id)}
                          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                          Lihat Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal Detail Tiket */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            {/* Header Modal */}
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">
                Detail Tiket
              </h2>

              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="text-xl text-slate-500 hover:text-slate-800"
              >
                &times;
              </button>
            </div>

            {/* Informasi Tiket */}
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-slate-500">ID Tiket</p>
                <p className="font-medium text-slate-800">
                  #{selectedTicket.id}
                </p>
              </div>

              <div>
                <p className="text-slate-500">Tanggal Dibuat</p>
                <p className="font-medium text-slate-800">
                  {formatDate(selectedTicket.created_at)}
                </p>
              </div>

              <div>
                <p className="text-slate-500">Nama Requester</p>
                <p className="font-medium text-slate-800">
                  {selectedTicket.requester_name}
                </p>
              </div>

              <div>
                <p className="text-slate-500">Email</p>
                <p className="font-medium text-slate-800">
                  {selectedTicket.requester_email}
                </p>
              </div>

              <div>
                <p className="text-slate-500">Judul Tiket</p>
                <p className="font-medium text-slate-800">
                  {selectedTicket.title}
                </p>
              </div>

              <div>
                <p className="text-slate-500">Deskripsi</p>
                <p className="whitespace-pre-wrap text-slate-800">
                  {selectedTicket.description}
                </p>
              </div>

              <div>
                <p className="text-slate-500">Priority</p>
                <p className="font-medium text-slate-800">
                  {selectedTicket.priority}
                </p>
              </div>

              <div>
                <p className="text-slate-500">Status</p>
                <p className="font-medium text-slate-800">
                  {selectedTicket.status}
                </p>
              </div>
            </div>

            {/* Tombol Tutup */}
            <button
              type="button"
              onClick={() => setSelectedTicket(null)}
              className="mt-6 w-full rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-700 hover:bg-slate-300"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default DashboardTicketPage;
