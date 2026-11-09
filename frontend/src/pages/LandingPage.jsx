
import { Link } from 'react-router'
import Button from '../components/Button'

function LandingPage() {
  return (
    <main className="flex min-h-[80vh] items-center bg-slate-50 px-6 py-12">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">

        {/* Bagian kiri: pengenalan */}
        <section className="space-y-6">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Helpdesk Ticket System
          </span>

          <h1 className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Butuh bantuan?
            <span className="block text-blue-600">
              Kami siap membantu.
            </span>
          </h1>

          <p className="max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
            Laporkan masalah teknis dengan mudah. Buat tiket bantuan,
            pantau status laporan, dan dapatkan penanganan yang lebih terorganisir.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/tickets/new">
              <Button isi="Buat Tiket" warna="biru" />
            </Link>

            <Link to="/dashboard">
              <Button isi="Lihat Dashboard" warna="merah" />
            </Link>
          </div>
        </section>

        {/* Bagian kanan: ringkasan fitur */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Bagaimana cara kerjanya?
          </h2>

          <div className="space-y-5">
            <div className="flex gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                1
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Buat laporan
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Jelaskan kendala yang sedang kamu alami.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                2
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Tim memeriksa tiket
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Laporan akan diperiksa dan ditangani.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                3
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Pantau status
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Status tiket dapat dipantau melalui sistem.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}

export default LandingPage
