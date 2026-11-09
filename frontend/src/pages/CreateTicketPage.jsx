import { useState } from "react";
import Button from "../components/Button";

function CreateTicketPage() {
  const [formData, setFormData] = useState({
    requester_name: "",
    requester_email: "",
    title: "",
    description: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("1. SUBMIT TERPANGGIL");
    console.log("2. DATA FORM:", formData);

    try {
      const response = await fetch("http://localhost:8080/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("3. RESPONSE STATUS:", response.status);

      if (response.ok) {
        console.log("Tiket berhasil dibuat");

        setFormData({
          requester_name: "",
          requester_email: "",
          title: "",
          description: "",
        });
      } else {
        console.log("Tiket gagal dibuat");
        console.log("Pesan:", await response.text());
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <main className="flex min-h-[80vh] flex-col items-start gap-5 bg-slate-50 px-6 py-12">
      {/* Bagian atas */}
      <div className="flex w-full flex-col gap-5 p-5">
        <h1 className="text-2xl font-semibold lg:text-6xl">Buat Tiket Baru</h1>

        <p className="text-base lg:text-lg">
          Isi form berikut untuk melaporkan masalah atau mengajukan permintaan
          bantuan.
        </p>
      </div>

      {/* Form */}
      <div className="w-full p-5">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8"
        >
          {/* Nama dan email */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="requester_name"
                className="font-medium text-slate-700"
              >
                Nama lengkap*
              </label>

              <input
                type="text"
                name="requester_name"
                id="requester_name"
                placeholder="Masukkan nama lengkap"
                value={formData.requester_name}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    requester_name: event.target.value,
                  })
                }
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="requester_email"
                className="font-medium text-slate-700"
              >
                Email*
              </label>

              <input
                type="email"
                name="requester_email"
                id="requester_email"
                placeholder="nama@email.com"
                value={formData.requester_email}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    requester_email: event.target.value,
                  })
                }
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Judul tiket */}
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-medium text-slate-700">
              Judul tiket*
            </label>

            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  title: event.target.value,
                })
              }
              placeholder="Contoh: Laptop tidak bisa menyala"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Deskripsi masalah */}
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="font-medium text-slate-700">
              Deskripsi masalah*
            </label>

            <textarea
              name="description"
              id="description"
              rows="5"
              placeholder="Jelaskan masalah yang kamu alami secara detail..."
              value={formData.description}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  description: event.target.value,
                })
              }
              required
              className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Catatan penggunaan */}
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm leading-6 text-amber-800">
              <span className="font-semibold">Perhatian:</span> Mohon isi
              formulir dengan identitas yang benar dan informasi yang jelas.
              Laporan palsu, iseng, atau tidak memiliki tujuan yang jelas tidak
              akan diproses.
            </p>
          </div>

          {/* Tombol */}
          <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-5">
            <Button isi="Batal" warna="merah" type="button" />
            <Button isi="Kirim Tiket" warna="biru" type="submit" />
          </div>
        </form>
      </div>
    </main>
  );
}

export default CreateTicketPage;
