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
npm run dev                   # http://localhost:3000
```

> `.env` **tidak boleh di-commit**. Isi `DATABASE_URL` dengan connection string MongoDB dan `AUTH_SECRET` dengan secret Auth.js (`npx auth secret`). Prisma memerlukan MongoDB replica set; MongoDB Atlas sudah menyediakannya. Untuk unggah gambar lapangan, isi `R2_BUCKET`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, dan `R2_PUBLIC_URL` dari Cloudflare R2. Bucket perlu dapat menyajikan gambar melalui URL publik tersebut.

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Jalankan server development |
| `npm run build` | Buat build produksi |
| `npm start` | Jalankan build produksi |
| `npm run lint` | Cek kode dengan ESLint |
| `npx prisma db push` | Sinkronkan skema Prisma dengan MongoDB |
| `npx prisma generate` | Buat Prisma Client di `node_modules/@prisma/client` |

---

## 2. Struktur Folder

```
app/
├── (public)/
│   ├── layout.tsx                  ← header halaman publik
│   ├── page.tsx                    -> /
│   ├── lapangan/
│   │   ├── page.tsx                -> /lapangan
│   │   └── [id]/
│   │       ├── page.tsx            -> /lapangan/[id]
│   │       └── booking/page.tsx    -> /lapangan/[id]/booking
│   └── booking/
│       ├── page.tsx                -> /booking
│       └── [id]/page.tsx           -> /booking/[id]
├── (auth)/
│   ├── layout.tsx                  ← header halaman autentikasi
│   ├── login/page.tsx              -> /login
│   └── register/page.tsx           -> /register
├── admin/
│   ├── layout.tsx                  ← header admin
│   ├── page.tsx                    -> /admin
│   ├── booking/page.tsx            -> /admin/booking
│   ├── users/page.tsx              -> /admin/users
│   ├── lapangan/
│   │   ├── page.tsx                -> /admin/lapangan
│   │   ├── create/page.tsx         -> /admin/lapangan/create
│   │   └── [id]/page.tsx           -> /admin/lapangan/[id]
├── favicon.ico
├── api/
│   ├── auth/[...nextauth]/route.ts
│   ├── auth/register/route.ts      ← pendaftaran akun
│   ├── lapangan/
│   │   ├── route.ts
│   │   └── [id]/route.ts
│   └── bookings/
│       ├── route.ts
│       └── [id]/route.ts
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
└── schema.prisma                   ← skema database
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
| `/lapangan/[id]` | Detail lapangan |
| `/lapangan/[id]/booking` | Form booking lapangan |
| `/booking` | Booking pengguna |
| `/booking/[id]` | Detail booking |
| `/login` | Masuk |
| `/register` | Daftar akun |
| `/admin` | Ringkasan admin |
| `/admin/booking` | Kelola booking |
| `/admin/lapangan` | Daftar lapangan admin, termasuk status dan gambar |
| `/admin/lapangan/create` | Tambah lapangan (nama, harga, status aktif, gambar opsional) |
| `/admin/lapangan/[id]` | Detail lapangan |
| `/admin/users` | Kelola pengguna |

---

## 4. Struktur API

```
app/api/
├── auth/[...nextauth]/route.ts       GET POST               Auth.js
├── auth/register/route.ts            POST                   Pendaftaran akun
├── users/route.ts                    GET                    Daftar user
├── users/[id]/route.ts               GET PUT PATCH DELETE   Kelola user
├── lapangan/route.ts                 GET POST               Daftar & tambah lapangan
├── lapangan/[id]/route.ts            GET PUT PATCH DELETE   Detail, ubah, hapus lapangan
└── bookings/
    ├── route.ts                      GET POST               Daftar & buat booking
    └── [id]/route.ts                 GET PUT PATCH DELETE   Detail, ubah, hapus booking
```

Setiap HTTP method (GET, POST, PUT, PATCH, DELETE) adalah **named export** di file `route.ts` yang sama.

| Status | Penjelasan |
|---|---|
| 200/201 | Permintaan berhasil diproses. |
| 400/409/503 | Permintaan tidak dapat diproses. |
| 401/403 | Akses tidak diizinkan. |
| 413/415/502 | Gambar tidak dapat diproses. |
| 501 | Fitur belum tersedia. |

---

## 5. Database

Skema MongoDB berada di `prisma/schema.prisma`. Model memakai `ObjectId`; relasi booking menyimpan `userId` dan `lapanganId` sebagai `ObjectId`.

| Model | Keterangan |
|---|---|
| `User` | Nama, email, password hash, dan role (`USER` atau `ADMIN`) |
| `Lapangan` | Nama, harga, status aktif, lokasi Google Maps, deskripsi, dan key gambar opsional di Cloudflare R2 |
| `Booking` | Pengguna, lapangan, rentang waktu, dan status booking |

Setelah mengubah skema:

```bash
npx prisma db push          # terapkan skema ke MongoDB
npx prisma generate         # generate ulang Prisma Client
```
