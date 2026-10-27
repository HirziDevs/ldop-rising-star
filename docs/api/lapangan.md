# Lapangan

Kontrak untuk `/api/lapangan` dan `/api/lapangan/:id`. Route menggunakan runtime
default Node.js untuk mendukung Prisma dan pemrosesan gambar dengan `sharp` sebelum
gambar disimpan di Cloudflare R2.

## Ringkasan

| Method | Endpoint | Akses |
|---|---|---|
| GET | `/api/lapangan` | Publik; menampilkan lapangan aktif dan nonaktif |
| POST | `/api/lapangan` | ADMIN |
| GET | `/api/lapangan/:id` | Publik; semua status, lapangan nonaktif hanya untuk dilihat |
| PUT | `/api/lapangan/:id` | ADMIN |
| PATCH | `/api/lapangan/:id` | ADMIN |
| DELETE | `/api/lapangan/:id` | ADMIN |

## Model respons

Field `Lapangan` yang muncul di semua respons sukses (kecuali `DELETE`):

| Field | Tipe | Keterangan |
|---|---|---|
| `id` | string | ID dokumen (ObjectId, 24 karakter hex). |
| `nama` | string | Nama lapangan. |
| `harga` | number | Harga sebagai bilangan bulat. |
| `aktif` | boolean | Status lapangan. Lapangan nonaktif tetap dapat dilihat. |
| `gambar` | string \| null | Key objek gambar di R2, bukan URL publik. |
| `gambarUrl` | string \| null | URL gambar publik, atau `null` jika belum ada gambar. |
| `createdAt` | string | Waktu pembuatan dalam serialisasi JSON tanggal. |

Semua error berbentuk `{ "message": string }`.

## Ketentuan gambar

Berlaku untuk field `gambar` di `POST`, `PUT`, dan `PATCH`.

| Aturan | Nilai |
|---|---|
| Ukuran maksimal | 2 MB |
| MIME yang diterima | `image/jpeg`, `image/png`, `image/webp` |
| Validasi isi file | Isi file dibaca oleh `sharp`; file yang bukan gambar asli ditolak meski MIME-nya benar. |
| Hasil penyimpanan | Dipotong ke rasio 16:9 (1600×900), diputar sesuai orientasi EXIF, dikonversi ke WebP kualitas 80. |
| Nama objek | `lapangan/<uuid>.webp`, dibuat server. Nama file asli tidak dipakai. |

Database hanya menyimpan key (`gambar`). `gambarUrl` dibangun dari `R2_PUBLIC_URL`,
jadi domain CDN dapat diganti tanpa migrasi data. Gambar yang diganti atau dihapus,
termasuk saat lapangan dihapus, ikut dihapus dari R2.

## `GET /api/lapangan`

Publik; tidak memerlukan sesi. Mengembalikan semua lapangan, aktif maupun nonaktif,
terbaru lebih dahulu. Konsumen API dapat menggunakan field `aktif` untuk membedakan
lapangan yang tersedia dari lapangan yang hanya dapat dilihat.

`200 OK`

```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "nama": "Lapangan ITERA",
    "harga": 200000,
    "aktif": true,
    "gambar": "lapangan/6d8262a4-4da3-4d79-a7f3-93491ab317fa.webp",
    "gambarUrl": "https://cdn.example.com/lapangan/6d8262a4-4da3-4d79-a7f3-93491ab317fa.webp",
    "createdAt": "2026-10-26T10:00:00.000Z"
  }
]
```

## `POST /api/lapangan`

Memerlukan sesi role `ADMIN`. Request harus berupa `multipart/form-data`.
Jangan mengisi header `Content-Type` secara manual dari browser; biarkan browser
menambahkan boundary.

| Field | Tipe | Wajib | Aturan |
|---|---|---|---|
| `nama` | string | Ya | Setelah trim, 3–100 karakter. |
| `harga` | string angka | Ya | Harus dapat diparse sebagai bilangan bulat lebih dari 0. |
| `aktif` | string | Tidak | Nilai tepat `false` membuat status nonaktif; selain itu aktif. |
| `gambar` | file | Tidak | Lihat [Ketentuan gambar](#ketentuan-gambar). |

`201 Created`; objek lapangan hasil penyimpanan dengan `gambarUrl`.

| Status | Kondisi |
|---|---|
| 400 | Body bukan multipart, nama/harga tidak valid, atau file bukan gambar yang valid. |
| 401 | Belum masuk. |
| 403 | Role bukan `ADMIN`. |
| 413 | Gambar lebih besar dari 2 MB. |
| 415 | MIME gambar tidak didukung. |
| 500 | Gagal menyimpan data lapangan. Gambar yang sempat terunggah dihapus kembali. |
| 502 | Gagal mengunggah gambar ke penyimpanan objek. |

Validasi nama dan harga dijalankan sebelum gambar diunggah, sehingga request yang
ditolak tidak meninggalkan file di R2.

## `GET /api/lapangan/:id`

Publik; tidak memerlukan sesi. Detail lapangan tetap dapat dilihat meski statusnya
nonaktif. Lapangan nonaktif bersifat hanya untuk dilihat oleh konsumen publik.

`200 OK`; objek lapangan dengan `gambarUrl`.

| Status | Kondisi |
|---|---|
| 404 | ID bukan ObjectId yang valid atau lapangan tidak ada. |

## `PUT /api/lapangan/:id` dan `PATCH /api/lapangan/:id`

Memerlukan sesi role `ADMIN`. Request harus berupa `multipart/form-data`.

- `PUT` mengganti data teks secara penuh: `nama` dan `harga` wajib, dan `aktif` yang
  tidak dikirim dianggap `true`.
- `PATCH` bersifat parsial: hanya field yang dikirim yang diubah. Request tanpa satu
  pun perubahan ditolak dengan 400.

| Field | Tipe | Aturan |
|---|---|---|
| `nama` | string | Sama seperti `POST`. Wajib pada `PUT`. |
| `harga` | string angka | Sama seperti `POST`. Wajib pada `PUT`. |
| `aktif` | string | Nilai tepat `false` menonaktifkan; selain itu mengaktifkan. |
| `gambar` | file | Mengganti gambar. Lihat [Ketentuan gambar](#ketentuan-gambar). |
| `hapusGambar` | string | Nilai tepat `true` menghapus gambar. Diabaikan jika `gambar` juga dikirim. |

Jika `gambar` dan `hapusGambar` sama-sama tidak dikirim, gambar tidak berubah (berlaku
juga untuk `PUT`). Gambar lama dihapus dari R2 hanya setelah data baru berhasil
tersimpan.

`200 OK`; objek lapangan hasil perubahan dengan `gambarUrl`.

| Status | Kondisi |
|---|---|
| 400 | Body bukan multipart, nama/harga tidak valid, file bukan gambar valid, atau (`PATCH`) tidak ada perubahan. |
| 401 / 403 | Belum masuk / role bukan `ADMIN`. |
| 404 | ID tidak valid atau lapangan tidak ada. |
| 413 / 415 | Gambar terlalu besar / MIME tidak didukung. |
| 500 | Gagal menyimpan perubahan. Gambar baru yang sempat terunggah dihapus kembali. |
| 502 | Gagal mengunggah gambar ke penyimpanan objek. |

## `DELETE /api/lapangan/:id`

Memerlukan sesi role `ADMIN`. Menghapus lapangan beserta gambarnya.

`200 OK`

```json
{ "message": "Lapangan dihapus." }
```

| Status | Kondisi |
|---|---|
| 401 / 403 | Belum masuk / role bukan `ADMIN`. |
| 404 | ID tidak valid atau lapangan tidak ada. |
| 409 | Lapangan sudah memiliki booking. Gunakan `PATCH` dengan `aktif=false` sebagai gantinya. |
| 500 | Gagal menghapus lapangan. |
