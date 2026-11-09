import { useState, useEffect } from "react";

function AdminTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State modal detail
  const [selectedTicket, setSelectedTicket] = useState(null);

  // State modal edit
  const [editTicket, setEditTicket] = useState(null);

  // State form edit
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "open",
  });

  const [saving, setSaving] = useState(false);

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

  // Mengambil seluruh data tiket
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

  // Menampilkan detail tiket
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

  // Membuka modal edit
  const handleEdit = (ticket) => {
    setEditTicket(ticket);

    setEditForm({
      title: ticket.title || "",
      description: ticket.description || "",
      priority: ticket.priority || "low",
      status: ticket.status || "open",
    });
  };

  // Mengubah nilai form
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Menyimpan perubahan tiket
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editTicket || saving) return;

    try {
      setSaving(true);

      const title = editForm.title.trim();
      const description = editForm.description.trim();

      if (title.length < 5 || title.length > 150) {
        throw new Error("Judul harus terdiri dari 5-150 karakter");
      }

      if (!description) {
        throw new Error("Deskripsi tidak boleh kosong");
      }

      // Update judul, deskripsi, dan priority
      const detailResponse = await fetch(
        `http://localhost:8080/tickets/${editTicket.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            priority: editForm.priority,
          }),
        },
      );

      if (!detailResponse.ok) {
        const message = await detailResponse.text();
        throw new Error(message || "Gagal memperbarui detail tiket");
      }

      // Update status
      const statusResponse = await fetch(
        `http://localhost:8080/tickets/${editTicket.id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: editForm.status,
          }),
        },
      );

      if (!statusResponse.ok) {
        const message = await statusResponse.text();
        throw new Error(message || "Gagal memperbarui status tiket");
      }

      alert("Tiket berhasil diperbarui!");

      setEditTicket(null);
      await fetchTickets();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  // Menghapus tiket
  const handleDelete = async (id) => {
    const konfirmasi = window.confirm(
      "Apakah kamu yakin ingin menghapus tiket ini?",
    );

    if (!konfirmasi) return;

    try {
      const response = await fetch(`http://localhost:8080/tickets/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus tiket");
      }

      alert("Tiket berhasil dihapus!");

      await fetchTickets();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert(error.message);
    }
  };

  return (
    <main className="min-h-screen w-full bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-800 sm:text-3xl">
          Manajemen Tiket
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Kelola seluruh tiket yang masuk ke sistem Helpdesk.
        </p>
      </div>

      {/* Total Tiket */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-sm font-medium text-slate-500">TOTAL TIKET</p>

        <p className="mt-2 text-3xl font-bold text-slate-800">
          {tickets.length}
        </p>
      </div>

      {/* Tabel Tiket */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-5 text-lg font-semibold text-slate-800">
          Daftar Tiket Masuk
        </h2>

        {loading ? (
          <p className="py-8 text-center text-slate-500">
            Memuat data tiket...
          </p>
        ) : error ? (
          <p className="py-8 text-center text-red-500">{error}</p>
        ) : tickets.length === 0 ? (
          <p className="py-8 text-center text-slate-500">
            Belum ada tiket masuk.
          </p>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100">
                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    ID
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    REQUESTER
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    JUDUL
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    PRIORITY
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    STATUS
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    CREATED AT
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

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {ticket.requester_name}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-800">
                      {ticket.title}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {ticket.priority}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {ticket.status}
                    </td>

                    {/* Created At */}
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {formatDate(ticket.created_at)}
                    </td>

                    {/* Tombol Aksi */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleDetail(ticket.id)}
                          className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                          Detail
                        </button>

                        <button
                          type="button"
                          onClick={() => handleEdit(ticket)}
                          className="rounded-lg bg-yellow-500 px-3 py-2 text-sm font-medium text-white hover:bg-yellow-600"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(ticket.id)}
                          className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Detail */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
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

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-slate-500">ID Tiket</p>
                <p className="font-medium text-slate-800">
                  #{selectedTicket.id}
                </p>
              </div>

              {/* Created At */}
              <div>
                <p className="text-slate-500">Tanggal Dibuat</p>
                <p className="font-medium text-slate-800">
                  {formatDate(selectedTicket.created_at)}
                </p>
              </div>

              <div>
                <p className="text-slate-500">Requester</p>
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
                <p className="text-slate-500">Judul</p>
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

      {/* Modal Edit */}
      {editTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">
                Edit Tiket #{editTicket.id}
              </h2>

              <button
                type="button"
                onClick={() => setEditTicket(null)}
                disabled={saving}
                className="text-xl text-slate-500 hover:text-slate-800"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Judul */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Judul Tiket
                </label>

                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  required
                  minLength={5}
                  maxLength={150}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Deskripsi */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Deskripsi
                </label>

                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  required
                  rows={4}
                  className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Priority
                </label>

                <select
                  name="priority"
                  value={editForm.priority}
                  onChange={handleEditChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select
                  name="status"
                  value={editForm.status}
                  onChange={handleEditChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              {/* Tombol */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditTicket(null)}
                  disabled={saving}
                  className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300 disabled:opacity-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default AdminTicketsPage;
