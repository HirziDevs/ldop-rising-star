# Website Booking Lapangan Olahraga

Panduan teknis untuk tim (Backend & Frontend): cara menjalankan project, struktur folder, routing, dan kondisi API saat ini.

**Stack:** Next.js 16 (App Router, TypeScript) · Tailwind CSS 4 + shadcn/ui · MongoDB · Prisma 6 · Auth.js v5 · Cloudflare R2

## Pembagian Role Anggota Kelompok

| Role | Nama | NIM |
|---|---|---|
| **Backend** | Hirzi Rifazio Adiesta Ramadhan | 125140132 |
| | Naela Wafiq Azizah | 125140208 |
| | Fatakhul Mubarok | 125140183 |
| | Muhammad Iqbal Algajali | 125140146 |
| **Frontend** | Aulia Rahmania Falah | 125140204 |
| | Enos Sean Adhyaksa Sianturi | 125140107 |
| | Fandy Agung Pratama | 125140206 |
| | Heri Sutanto Nababan | 125140170 |
| **Desain** | Michelle Natalie Loisa | 125140109 |
| | Mutiara Nur Islami | 125140153 |
| | Audita Gea Salsabillah | 125140111 |
| | Muhammad Alfarisy Jundana Muttaqin | 125140108 |
| | Joviena Alya Sinatra | 125140103 |
| | Haris Ahmad Izatha | 125140115 |

---

## 1. Menjalankan Project

```bash
git clone <repo>
cd <nama-folder-project>
npm install
cp .env.example .env          # isi DATABASE_URL, AUTH_SECRET, dan konfigurasi Cloudflare R2
npx prisma generate           # buat Prisma Client di node_modules/@prisma/client
npx prisma db push            # sinkronkan skema dengan MongoDB
npm run db:seed               # isi data sample (4 user, 2 lapangan, 6 booking)
npm run dev                   # http://localhost:3000
```

Perintah seed membaca `prisma/data-awal/contoh.csv` dan memerlukan Node.js 22.6 atau
lebih baru.

Email akun sample: `hirzi@example.test`, `naela@example.test`,
`fatakhul@example.test`, dan `iqbal@example.test`. Semuanya memakai kata sandi
`Sample123!`. Data seed memakai ID tetap dan aman dijalankan ulang untuk
memperbarui record sample. Gunakan hanya untuk development atau demo, bukan
sebagai akun produksi.

> `.env` **tidak boleh di-commit**. Isi `DATABASE_URL` dengan connection string MongoDB dan `AUTH_SECRET` dengan secret Auth.js (`npx auth secret`). Prisma memerlukan MongoDB replica set; MongoDB Atlas sudah menyediakannya. Untuk unggah gambar lapangan, isi `R2_BUCKET`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, dan `R2_PUBLIC_URL` dari Cloudflare R2. Bucket perlu dapat menyajikan gambar melalui URL publik tersebut.

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Jalankan server development |
| `npm run build` | Buat build produksi |
| `npm start` | Jalankan build produksi |
| `npm run lint` | Cek kode dengan ESLint |
| `npx prisma db push` | Sinkronkan skema Prisma dengan MongoDB (MongoDB tidak memakai Prisma Migrate) |
| `npx prisma generate` | Buat Prisma Client di `node_modules/@prisma/client` |
| `npm run db:seed` | Buat atau perbarui 4 user, 2 lapangan, dan 6 booking sample |

---

## 2. Struktur Folder

```
app/
├── (public)/
│   ├── layout.tsx                  ← header halaman publik
│   ├── page.tsx                    -> /
│   ├── lapangan/page.tsx           -> /lapangan
│   └── booking/
│       ├── page.tsx                -> /booking
│       └── [id]/page.tsx            -> /booking/[id]
├── (auth)/
│   ├── layout.tsx                  ← header halaman autentikasi
│   ├── login/page.tsx              -> /login
│   └── register/page.tsx           -> /register
├── admin/
│   ├── layout.tsx                  ← header admin
│   ├── page.tsx                    -> /admin
│   ├── booking/page.tsx            -> /admin/booking
│   ├── lapangan/
│   │   ├── page.tsx                -> /admin/lapangan
│   │   ├── create/page.tsx         -> /admin/lapangan/create
│   │   └── [id]/page.tsx           -> /admin/lapangan/[id]
│   └── settings/page.tsx           -> /admin/settings
├── api/
│   ├── auth/[...nextauth]/route.ts
│   ├── auth/register/route.ts      ← pendaftaran akun
│   ├── lapangan/
│   │   ├── route.ts
│   │   └── [id]/route.ts
│   └── bookings/
│       ├── route.ts
│       ├── [id]/route.ts
│       └── tersedia/route.ts
├── layout.tsx                      ← layout akar, metadata, dan font
├── globals.css
├── not-found.tsx
└── error.tsx
components/                         ← komponen UI
lib/                                ← utilitas dan integrasi aplikasi
auth.config.ts                      ← konfigurasi Auth.js tanpa akses database
types/
└── next-auth.d.ts                  ← tipe tambahan untuk session dan JWT Auth.js
prisma/
├── schema.prisma                   ← skema database
├── migrations/                     ← migrasi SQLite lama; tidak dipakai MongoDB
```

- Folder dengan kurung seperti `(public)` dan `(auth)` adalah **route group**: hanya untuk mengelompokkan halaman, **tidak muncul di URL**.
- Folder `[id]` = **dynamic route** (parameter). `[...slug]` = catch-all.
- Satu halaman = folder + `page.tsx`. Satu API = folder di `app/api/` + `route.ts`.

---

## 3. Rute Halaman

| URL | Keterangan |
|---|---|
| `/` | Beranda |
| `/lapangan` | Daftar lapangan |
| `/booking` | Booking pengguna |
| `/booking/[id]` | Detail booking |
| `/login` | Masuk |
| `/register` | Daftar akun |
| `/admin` | Ringkasan admin |
| `/admin/booking` | Kelola booking |
| `/admin/lapangan` | Daftar lapangan admin, termasuk status dan gambar |
| `/admin/lapangan/create` | Tambah lapangan (nama, harga, status aktif, gambar opsional) |
| `/admin/lapangan/[id]` | Detail lapangan |
| `/admin/settings` | Pengaturan admin |

---

## 4. Struktur API

```
app/api/
├── auth/[...nextauth]/route.ts       GET POST               Auth.js
├── auth/register/route.ts            POST                   Pendaftaran akun
├── lapangan/route.ts                 GET POST               Daftar & tambah lapangan (GET publik; POST khusus admin)
├── lapangan/[id]/route.ts            GET PUT PATCH DELETE   Detail, ubah, hapus lapangan
└── bookings/
    ├── route.ts                      GET POST               Daftar & buat booking
    ├── [id]/route.ts                 GET PUT PATCH DELETE   Detail, ubah, hapus booking
    └── tersedia/route.ts             GET                    Cek ketersediaan
```

Setiap HTTP method (GET, POST, PUT, PATCH, DELETE) adalah **named export** di file `route.ts` yang sama.

| Status | Kapan digunakan | Kondisi di project ini |
|---|---|---|
| 200/201 | Permintaan berhasil; 201 menandai data baru dibuat | Auth.js, pendaftaran akun, dan GET/POST `/api/lapangan` |
| 400/409/503 | Input salah, email sudah dipakai, atau database tidak tersedia | Pendaftaran akun; validasi POST lapangan memakai 400 |
| 401/403 | Belum login atau role tidak punya akses | API lapangan dan booking yang dilindungi |
| 413/415/502 | Gambar terlalu besar, format tidak didukung, atau unggah R2 gagal | POST `/api/lapangan` |
| 501 | Endpoint belum dikerjakan | Operasi booking dan operasi detail `/api/lapangan/[id]` |

---

## 5. Database

Skema MongoDB berada di `prisma/schema.prisma`. Model memakai `ObjectId`; relasi booking menyimpan `userId` dan `lapanganId` sebagai `ObjectId`.

| Model | Keterangan |
|---|---|
| `User` | Nama, email, password hash, dan role (`USER` atau `ADMIN`) |
| `Lapangan` | Nama, harga, status aktif, dan key gambar opsional di Cloudflare R2 |
| `Booking` | Pengguna, lapangan, rentang waktu, dan status booking |

Setelah mengubah skema:

```bash
npx prisma db push          # terapkan skema ke MongoDB
npx prisma generate         # generate ulang Prisma Client
```
