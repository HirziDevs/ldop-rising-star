# LDOP RISING STAR

Repository pengumpulan hasil **LDOP RISING STAR**, kegiatan kaderisasi HMIF ITERA.
Setiap kelompok mengerjakan satu website sesuai tema yang dipilih, men-deploy-nya secara online, lalu mengumpulkan source code ke repository ini melalui **fork + pull request** ke branch kelompoknya masing-masing.

---

<!-- ============================================================ -->
<!-- BAGIAN INI UNTUK PESERTA — HAPUS SETELAH TAHAP PENGUMPULAN   -->
<!-- ============================================================ -->

## 0. Bagian yang Harus Dibaca (hapus bagian ini sebelum repo difinalkan)

### 0.1 Peta branch

Repository ini punya 1 branch `main` dan 10 branch pengumpulan:

| Branch tujuan | Dipakai oleh | Isi branch |
| --- | --- | --- |
| `main` | Panitia | README, juknis, aturan. Peserta **tidak boleh** PR ke sini. |
| `kelompok-1` | Kelompok 1 | Source code + README kelompok 1 |
| `kelompok-2` | Kelompok 2 | Source code + README kelompok 2 |
| `kelompok-3` | Kelompok 3 | Source code + README kelompok 3 |
| `kelompok-4` | Kelompok 4 | Source code + README kelompok 4 |
| `kelompok-5` | Kelompok 5 | Source code + README kelompok 5 |
| `kelompok-6` | Kelompok 6 | Source code + README kelompok 6 |
| `kelompok-7` | Kelompok 7 | Source code + README kelompok 7 |
| `kelompok-8` | Kelompok 8 | Source code + README kelompok 8 |
| `kelompok-9` | Kelompok 9 | Source code + README kelompok 9 |
| `kelompok-10` | Kelompok 10 | Source code + README kelompok 10 |

**Aturan wajib:** nama branch di fork kalian **harus sama persis** dengan branch tujuan (`kelompok-N`), lalu pull request diarahkan ke branch `kelompok-N` di repository ini — **bukan** ke `main`.

### 0.2 Alur fork & pull request

1. **Fork** repository ini ke akun GitHub masing-masing (tombol `Fork` di kanan atas).
2. **Clone** hasil fork:
   ```bash
   git clone https://github.com/<username-kalian>/ldop-rising-star.git
   cd ldop-rising-star
   ```
3. **Buat branch** dengan nama yang sama seperti branch tujuan (contoh untuk Kelompok 3):
   ```bash
   git checkout -b kelompok-3
   ```
4. **Kerjakan project** di branch tersebut, commit berkala dengan pesan yang jelas:
   ```bash
   git add .
   git commit -m "feat: halaman beranda"
   git push -u origin kelompok-3
   ```
5. **Buka pull request** dari fork ke repository ini:
   - `base repository` : repo HMIF ITERA (repo ini)
   - `base branch`     : `kelompok-3` (sesuai nomor kelompok)
   - `head repository` : fork kalian
   - `compare branch`  : `kelompok-3`
   - Judul PR: `Kelompok 3 — <Tema yang Dipilih>`
6. **Jangan close PR** sebelum batas akhir. Pembaruan cukup `git push` lagi ke branch yang sama; PR akan otomatis ter-update.

### 0.3 Menyamakan fork dengan `main` (opsional tapi disarankan)

Kalau panitia memperbarui README/aturan di `main`, tarik perubahannya supaya branch kelompok kalian tidak tertinggal:

```bash
git remote add upstream https://github.com/hmif-itera/ldop-rising-star.git
git fetch upstream
git merge upstream/main      # atau: git rebase upstream/main
```

Jangan pernah `push --force` ke branch tujuan setelah PR dibuka.

### 0.4 Aturan pengumpulan

- Satu kelompok = satu branch = satu pull request. Tidak boleh ada branch tambahan sebagai branch tujuan.
- Hanya anggota kelompok yang bersangkutan yang boleh mengubah branch-nya. Dilarang push/PR ke branch kelompok lain.
- Branch tujuan **tidak di-merge ke `main`** oleh peserta; panitia yang menangani setelah penilaian.
- `README.md` di root branch kelompok **wajib** dilengkapi (lihat Bagian 1). README adalah bagian penilaian "Kerja Sama Tim & Proses".
- Source code diletakkan di root repository branch tersebut (boleh berisi framework/tooling apa pun, selama bisa di-deploy).
- Website **wajib online** dan link-nya aktif saat penilaian (minimal Vercel).
- Jangan commit `node_modules/`, `.env`, file build, atau kredensial. Sertakan `.gitignore`.
- Tampilan minimal responsif di desktop dan mobile.
- Aset (gambar/ikon/font) harus bebas hak cipta atau berlisensi terbuka; cantumkan sumbernya di README.

### 0.5 Checklist sebelum PR dibuka

- [ ] Nama branch di fork = `kelompok-N` (persis, huruf kecil, pakai tanda hubung).
- [ ] PR mengarah ke branch `kelompok-N` di repo ini, bukan ke `main`.
- [ ] README sudah diisi lengkap: tema, anggota + pembagian tugas, tech stack, struktur kode, penjelasan project, link deployment.
- [ ] Website sudah ter-deploy dan link-nya bisa dibuka (mode incognito).
- [ ] Tidak ada `node_modules/`, `.env`, atau file rahasia yang ikut ter-commit.
- [ ] Tampilan dicek di desktop dan mobile.
- [ ] Memenuhi syarat di Bagian 2 (follow GitHub & LinkedIn HMIF ITERA).


### 0.6 Daftar tema (pilih satu, satu tema hanya untuk satu kelompok — siapa cepat, dapat)

1. Company profile UMKM
2. Website sekolah / bimbingan belajar
3. Landing page acara/event
4. Portal berita mini
5. Katalog produk toko online
6. Platform booking lapangan olahraga (futsal/badminton)
7. Aplikasi resep masakan
8. Website wisata/destinasi lokal
9. Perpustakaan digital mini
10. Website komunitas hobi
11. Landing page startup fiktif
12. Website to-do list / manajemen tugas
13. Website ulasan film/buku
14. Website donasi/penggalang dana fiktif
15. Marketplace jasa freelance mini

Klaim tema dengan mengisi tabel di bawah **sebelum** mulai development (PR pertama). Panitia akan menolak tema yang sudah dipakai kelompok lain.

| Branch | Kelompok | Tema | Status |
| --- | --- | --- | --- |
| `kelompok-1` | Kelompok 1 | `<isi tema>` | `<diklaim / kosong>` |
| `kelompok-2` | Kelompok 2 | `<isi tema>` | `<diklaim / kosong>` |
| `kelompok-3` | Kelompok 3 | `<isi tema>` | `<diklaim / kosong>` |
| `kelompok-4` | Kelompok 4 | `<isi tema>` | `<diklaim / kosong>` |
| `kelompok-5` | Kelompok 5 | `<isi tema>` | `<diklaim / kosong>` |
| `kelompok-6` | Kelompok 6 | `<isi tema>` | `<diklaim / kosong>` |
| `kelompok-7` | Kelompok 7 | `<isi tema>` | `<diklaim / kosong>` |
| `kelompok-8` | Kelompok 8 | `<isi tema>` | `<diklaim / kosong>` |
| `kelompok-9` | Kelompok 9 | `<isi tema>` | `<diklaim / kosong>` |
| `kelompok-10` | Kelompok 10 | `<isi tema>` | `<diklaim / kosong>` |

---

<!-- ============================================================ -->
<!-- BAGIAN INI WAJIB DIISI OLEH SETIAP KELOMPOK DI BRANCH-NYA   -->
<!-- ============================================================ -->

## 1. Bagian yang Wajib Diisi / Dilengkapi

Isi seluruh sub-bagian berikut di branch kelompok kalian. Hapus teks penunjuk (`<...>`) setelah diisi, jangan biarkan kosong.

### 1.1 Identitas kelompok

| Item | Keterangan |
| --- | --- |
| Nomor kelompok | `<1–10>` |
| Nama kelompok (opsional) | `<nama kelompok / nama produk>` |
| Tema yang dipilih | `<salin dari daftar tema Bagian 0.7>` |
| Link website (deployment) | `<https://...vercel.app>` |
| Repository | `<https://github.com/...>` |

### 1.2 Anggota kelompok & pembagian tugas

| No | Nama | NIM | Peran | Tugas yang dikerjakan |
| --- | --- | --- | --- | --- |
| 1 | `<nama>` | `<nim>` | `<ketua / front-end / back-end / desain / dokumentasi / QA>` | `<rincian tugas>` |
| 2 | `<nama>` | `<nim>` | `<...>` | `<...>` |
| 3 | `<nama>` | `<nim>` | `<...>` | `<...>` |
| 4 | `<nama>` | `<nim>` | `<...>` | `<...>` |
| 5 | `<nama>` | `<nim>` | `<...>` | `<...>` |

Catatan: setiap anggota wajib punya kontribusi yang terlihat di riwayat commit branch ini. Pembagian tugas boleh tidak simetris, tapi harus jelas dan sesuai kenyataan.

### 1.3 Tech stack

| Bagian | Teknologi | Alasan pemilihan |
| --- | --- | --- |
| Bahasa / framework | `<mis. Next.js 15 + TypeScript>` | `<...>` |
| Styling / UI | `<mis. Tailwind CSS, shadcn/ui>` | `<...>` |
| Data / state | `<mis. JSON statis, Supabase>` | `<...>` |
| Build & tooling | `<mis. Vite, pnpm>` | `<...>` |
| Hosting | `<mis. Vercel>` | `<...>` |
| Lainnya | `<ikon, font, aset>` | `<...>` |

Cara menjalankan project secara lokal:

```bash
# isi perintah yang benar-benar dipakai kelompok kalian
pnpm install
pnpm dev          # buka http://localhost:<port>
pnpm build        # build produksi
```

### 1.4 Struktur kode

Ganti contoh di bawah dengan struktur nyata repository kalian (`tree -L 3 -I node_modules`), lalu jelaskan fungsi folder/file penting.

```text
.
├── README.md
├── package.json
├── public/                 # aset statis (gambar, ikon, font)
├── src/
│   ├── app/                # routing & halaman
│   │   ├── page.tsx        # beranda
│   │   └── ...
│   ├── components/         # komponen UI yang dipakai ulang
│   ├── lib/                # helper, util, data
│   └── styles/             # styling global
└── ...
```

| Path | Fungsi |
| --- | --- |
| `<src/app/>` | `<...>` |
| `<src/components/>` | `<...>` |
| `<...>` | `<...>` |

### 1.5 Penjelasan singkat project

Tulis 2–4 paragraf yang mencakup:

- **Latar belakang / masalah** yang ingin diselesaikan sesuai tema.
- **Fitur utama** yang sudah berjalan (bullet list, sebutkan halaman yang tersedia).
- **Alur penggunaan** singkat dari sudut pandang pengunjung.
- **Batas kemampuan** (opsional): fitur yang belum sempat dikerjakan atau keterbatasan data statis.

Fitur utama:

- `<fitur 1>`
- `<fitur 2>`
- `<fitur 3>`

### 1.6 Screenshot (opsional)

Simpan gambar di `docs/` (mis. `docs/beranda.png`) dan tampilkan di sini:

```markdown
![Beranda](docs/beranda.png)
```

---

<!-- ============================================================ -->
<!-- SYARAT — BOLEH DIHAPUS SETELAH DIVERIFIKASI PANITIA          -->
<!-- ============================================================ -->

## 2. Syarat Wajib (boleh dihapus setelah diverifikasi panitia)

Sebagai bagian dari rangkaian kaderisasi, **setiap anggota kelompok** wajib:

1. **Follow GitHub HMIF ITERA** — [github.com/hmif-itera](https://github.com/hmif-itera)
2. **Follow LinkedIn HMIF ITERA** — [linkedin.com/company/himpunan-mahasiswa-informatika-itera](https://www.linkedin.com/company/himpunan-mahasiswa-informatika-itera/)

Panitia akan mengecek daftar follow sebelum menutup penilaian. Syarat yang belum terpenuhi dapat menahan proses verifikasi kelompok.

---

## 3. Ketentuan tambahan

- Bahasa pemrograman, framework, dan pustaka bebas selama website bisa di-deploy dan diakses publik.
- Website hasil jiplakan tanpa modifikasi berarti akan didiskualifikasi.
- Joki atau pengerjaan oleh pihak di luar kelompok ditindak sesuai aturan kaderisasi.
- Penilaian: Desain & UI/UX (25%), Fungsionalitas (25%), Kerja Sama Tim & Proses (25%), Kualitas Teknis & Deployment (25%).
- Hal yang belum diatur akan ditentukan panitia dan diinformasikan menyusul.

Ada pertanyaan? Hubungi panitia kaderisasi HMIF ITERA.
