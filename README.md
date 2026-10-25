# Website Booking Lapangan Olahraga

Panduan teknis untuk tim (Backend & Frontend): cara menjalankan project, struktur folder, routing, dan kondisi API saat ini.

**Stack:** Next.js 15 (App Router, TypeScript) · Tailwind CSS + shadcn/ui · SQLite · Prisma 6 · Auth.js v5

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
npm install @prisma/client dotenv
cp .env.example .env          # sesuaikan nilainya jika diperlukan
npx prisma migrate dev        # buat tabel
npx prisma generate           # buat Prisma Client di lib/generated/prisma
npm run dev                   # http://localhost:3000
```

Untuk PowerShell, salin `.env` dengan:

```powershell
Copy-Item .env.example .env
```

> `.env` **tidak boleh di-commit**. Database development memakai SQLite dengan URL default `file:./dev.db`.

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Jalankan server development |
| `npm run build` | Buat build produksi |
| `npm start` | Jalankan build produksi |
| `npm run lint` | Cek kode dengan ESLint |
| `npx prisma migrate dev` | Buat atau terapkan migrasi database |
| `npx prisma generate` | Buat Prisma Client di `lib/generated/prisma` |

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
components/
├── ui/                             ← komponen shadcn/ui
├── navbar.tsx                      ← header publik, auth, dan admin
└── page-placeholder.tsx            ← penanda halaman yang belum dikerjakan
lib/
├── placeholder.ts                  ← respons 501 untuk API kerangka
└── utils.ts                        ← helper className
prisma/
├── schema.prisma                   ← skema database
├── migrations/                     ← migrasi database
└── dev.db                          ← database SQLite lokal
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
| `/admin/lapangan` | Kelola lapangan |
| `/admin/lapangan/create` | Tambah lapangan |
| `/admin/lapangan/[id]` | Detail lapangan |
| `/admin/settings` | Pengaturan admin |

> Halaman masih berupa kerangka `<PagePlaceholder>`. Ganti isinya saat mulai mengimplementasikan fitur.

---

## 4. Struktur API

```
app/api/
├── auth/[...nextauth]/route.ts       GET POST               Kerangka Auth.js
├── lapangan/route.ts                 GET POST               Daftar & tambah lapangan
├── lapangan/[id]/route.ts            GET PUT PATCH DELETE   Detail, ubah, hapus lapangan
└── bookings/
    ├── route.ts                      GET POST               Daftar & buat booking
    ├── [id]/route.ts                 GET PUT PATCH DELETE   Detail, ubah, hapus booking
    └── tersedia/route.ts             GET                    Cek ketersediaan
```

Setiap HTTP method (GET, POST, PUT, PATCH, DELETE) adalah **named export** di file `route.ts` yang sama.

> **Status saat ini:** semua handler API di atas masih berupa kerangka dan mengembalikan status **501** (belum diimplementasi). Autentikasi, validasi input, dan operasi database belum tersedia.

| Status | Kapan digunakan | Kondisi di project ini |
|---|---|---|
| 501 | Endpoint belum dikerjakan | Semua endpoint saat ini |

### ⚠️ Next.js 15: `params` adalah Promise

Di Next.js 15, `params` pada dynamic route (misalnya `/api/lapangan/[id]`) **harus di-`await`**.

```ts
// ❌ Next.js 14 (jangan dipakai)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
}

// ✅ Next.js 15
type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
}
```

---

## 5. Database

Skema SQLite berada di `prisma/schema.prisma`.

| Model | Keterangan |
|---|---|
| `User` | Pengguna, email, dan role |
| `Lapangan` | Nama, harga, dan status aktif lapangan |
| `Booking` | Pengguna, lapangan, rentang waktu, dan status booking |

Setelah mengubah skema:

```bash
npx prisma migrate dev      # buat migrasi
npx prisma generate         # generate ulang Prisma Client
```
