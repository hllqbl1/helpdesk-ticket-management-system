import { useState } from "react";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Pesan berhasil dikirim! (Demo)");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12 sm:px-8 lg:px-16">
      {/* Header */}
      <section className="mx-auto mb-12 max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
          Hubungi Kami
        </h1>

        <p className="mt-4 text-slate-600">
          Punya pertanyaan atau mengalami kendala? Tim Helpdesk kami siap
          membantu menyelesaikan masalahmu.
        </p>
      </section>

      {/* Informasi Kontak dan Form */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Informasi Kontak */}
        <div className="rounded-2xl bg-blue-600 p-7 text-white shadow-sm">
          <h2 className="text-2xl font-semibold">Informasi Kontak</h2>

          <p className="mt-3 text-sm leading-relaxed text-blue-100">
            Hubungi tim support kami melalui informasi berikut.
          </p>

          <div className="mt-10 space-y-8">
            {/* Email */}
            <div className="flex gap-4">
              <span className="text-2xl">✉</span>

              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="mt-1 text-sm text-blue-100">
                  support@helpdesk-demo.com
                </p>
              </div>
            </div>

            {/* Telepon */}
            <div className="flex gap-4">
              <span className="text-2xl">☎</span>

              <div>
                <h3 className="font-semibold">Telepon</h3>
                <p className="mt-1 text-sm text-blue-100">+62 812-3456-7890</p>
              </div>
            </div>

            {/* Lokasi */}
            <div className="flex gap-4">
              <span className="text-2xl">⌖</span>

              <div>
                <h3 className="font-semibold">Alamat</h3>
                <p className="mt-1 text-sm leading-relaxed text-blue-100">
                  Jl. Teknologi No. 25,
                  <br />
                  Semarang, Jawa Tengah
                </p>
              </div>
            </div>

            {/* Jam Operasional */}
            <div className="flex gap-4">
              <span className="text-2xl">◷</span>

              <div>
                <h3 className="font-semibold">Jam Operasional</h3>
                <p className="mt-1 text-sm text-blue-100">Senin - Jumat</p>
                <p className="text-sm text-blue-100">08.00 - 17.00 WIB</p>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-blue-400 pt-6">
            <p className="text-sm text-blue-100">
              Kami berusaha memberikan pelayanan terbaik untuk setiap pengguna
              Helpdesk.
            </p>
          </div>
        </div>

        {/* Form Kontak */}
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm lg:col-span-2">
          <h2 className="text-2xl font-semibold text-slate-800">Kirim Pesan</h2>

          <p className="mt-2 text-sm text-slate-500">
            Isi formulir berikut untuk mengirimkan pertanyaan atau pesan.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Nama */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Nama Lengkap
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="contoh@email.com"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Subjek */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Subjek
              </label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Masukkan subjek pesan"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Pesan */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Pesan
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tuliskan pesan atau pertanyaanmu..."
                rows={5}
                required
                className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;
