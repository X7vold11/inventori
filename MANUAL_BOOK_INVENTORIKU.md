# MANUAL BOOK APLIKASI INVENTORIKU
## Sistem Manajemen Gudang & Penjualan untuk UMKM

---

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

<div align="center">

# INVENTORIKU

## Sistem Manajemen Gudang & Penjualan

### Manual Pengguna

&nbsp;

**Versi 1.0**

**Tahun 2026**

&nbsp;

*Dokumen ini merupakan panduan resmi penggunaan aplikasi InventoriKu*

</div>

---

&nbsp;

&nbsp;

---

# HALAMAN JUDUL

| | |
|---|---|
| **Judul Dokumen** | Manual Book Aplikasi InventoriKu |
| **Versi Aplikasi** | 1.0.0 |
| **Tahun Terbit** | 2026 |
| **Kategori** | Sistem Manajemen Gudang & Penjualan UMKM |
| **Platform** | Web Application (React + Laravel) |

---

&nbsp;

---

# DAFTAR ISI

| Halaman | Judul |
|---|---|
| i | Halaman Judul |
| ii | Daftar Isi |
| **BAB 1** | **PENDAHULUAN** |
| 1 | 1.1 Tentang Aplikasi |
| 2 | 1.2 Tujuan Manual |
| 3 | 1.3 Prasyarat Sistem |
| **BAB 2** | **MEMULAI CEPAT** |
| 4 | 2.1 Login Pertama Kali |
| 6 | 2.2 Navigasi Dasar |
| **BAB 3** | **PANDUAN FITUR** |
| 8 | 3.1 Dashboard |
| 12 | 3.2 Manajemen Data |
| 20 | 3.3 Laporan |
| 28 | 3.4 Pengaturan |
| **BAB 4** | **ADMINISTRASI** |
| 35 | 4.1 Manajemen Pengguna |
| 42 | 4.2 Backup & Restore |
| **BAB 5** | **TROUBLESHOOTING & FAQ** |
| 48 | 5.1 Troubleshooting |
| 52 | 5.2 FAQ |
| **BAB 6** | **LAMPIRAN** |
| 55 | 6.1 Glosarium |
| 57 | 6.2 Kontak Dukungan |

---

&nbsp;

---

# BAB 1: PENDAHULUAN

---

## 1.1 Tentang Aplikasi

**InventoriKu** adalah aplikasi manajemen gudang dan penjualan berbasis web yang dirancang khusus untuk kebutuhan Usaha Mikro, Kecil, dan Menengah (UMKM). Aplikasi ini membantu pemilik usaha dalam mengelola stok barang, mencatat transaksi penjualan, memantau restock dari supplier, serta menganalisis performa bisnis secara real-time melalui dashboard yang informatif.

### Latar Belakang

Banyak pelaku UMKM masih mengelola inventaris secara manual menggunakan buku catatan atau spreadsheet sederhana. Metode ini rentan terhadap kesalahan pencatatan, sulit dilacak, dan tidak memberikan gambaran performa bisnis secara cepat. InventoriKu hadir sebagai solusi digital yang mudah digunakan, ringan, dan dapat diakses melalui browser tanpa perlu instalasi perangkat lunak tambahan.

### Fitur Utama

| No | Fitur | Deskripsi |
|---|---|---|
| 1 | **Dashboard** | Ringkasan performa harian: keuntungan, penjualan, stok, dan grafik tren 7 hari |
| 2 | **Jenis Barang** | Manajemen katalog produk beserta harga jual dan status stok |
| 3 | **Restock Gudang** | Pencatatan pengadaan barang dari supplier dengan kalkulasi harga pokok rata-rata |
| 4 | **Kasir / Penjualan** | Sistem Point of Sale (POS) untuk mencatat transaksi penjualan harian |
| 5 | **Riwayat Penjualan** | Laporan lengkap semua transaksi dengan filter tanggal dan pencarian |

### Teknologi yang Digunakan

- **Frontend**: React.js dengan Vite, Tailwind CSS, Recharts (grafik)
- **Backend**: Laravel 11 (PHP), Laravel Sanctum (autentikasi token)
- **Database**: SQLite (default) / MySQL
- **Komunikasi**: REST API dengan autentikasi Bearer Token

---

## 1.2 Tujuan Manual

Manual book ini disusun dengan tujuan:

1. **Memandu pengguna baru** dalam memahami cara menggunakan seluruh fitur aplikasi InventoriKu dari awal hingga mahir.

2. **Menjadi referensi harian** bagi operator kasir, admin gudang, maupun pemilik usaha dalam menjalankan operasional bisnis menggunakan aplikasi ini.

3. **Membantu pemecahan masalah** ketika pengguna menghadapi kendala teknis atau pertanyaan seputar penggunaan aplikasi.

4. **Mendokumentasikan alur kerja** yang direkomendasikan agar penggunaan aplikasi berjalan optimal dan data tetap akurat.

### Siapa yang Perlu Membaca Manual Ini?

| Peran | Bab yang Relevan |
|---|---|
| **Pemilik Usaha / Manajer** | Semua bab, terutama Bab 3.1 (Dashboard) dan Bab 3.3 (Laporan) |
| **Admin Gudang** | Bab 3.2 (Manajemen Data) dan Bab 3.2.2 (Restock) |
| **Kasir** | Bab 2 (Memulai Cepat) dan Bab 3.2.3 (Kasir/Penjualan) |
| **Admin IT / Teknisi** | Bab 4 (Administrasi) dan Bab 5 (Troubleshooting) |

---

## 1.3 Prasyarat Sistem

Sebelum menggunakan aplikasi InventoriKu, pastikan perangkat Anda memenuhi persyaratan berikut:

### Persyaratan Perangkat Pengguna (Client)

| Komponen | Minimum | Rekomendasi |
|---|---|---|
| **Browser** | Chrome 90+, Firefox 88+, Edge 90+ | Chrome versi terbaru |
| **Resolusi Layar** | 1024 × 768 px | 1366 × 768 px atau lebih |
| **Koneksi Internet** | Diperlukan untuk akses ke server | Koneksi stabil ≥ 1 Mbps |
| **JavaScript** | Harus diaktifkan di browser | — |

### Persyaratan Server (untuk Instalasi Mandiri)

| Komponen | Versi Minimum |
|---|---|
| **PHP** | 8.2 atau lebih baru |
| **Composer** | 2.x |
| **Node.js** | 18.x atau lebih baru |
| **NPM** | 9.x atau lebih baru |
| **Database** | SQLite 3 (default) atau MySQL 8.0+ |
| **Web Server** | Apache / Nginx / Laravel Built-in Server |

### Cara Menjalankan Aplikasi (Lokal)

**Backend (Laravel):**
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

**Frontend (React):**
```bash
cd frontend
npm install
npm run dev
```

Setelah kedua server berjalan, akses aplikasi melalui browser di alamat:
`http://localhost:5173`

> **Catatan:** Pastikan backend berjalan di `http://localhost:8000` agar frontend dapat berkomunikasi dengan API.

---

&nbsp;

---

# BAB 2: MEMULAI CEPAT

---

## 2.1 Login Pertama Kali

Sebelum dapat menggunakan aplikasi InventoriKu, pengguna wajib melakukan proses autentikasi (login) menggunakan akun yang telah terdaftar di sistem.

### Langkah-langkah Login

**Langkah 1 — Buka Aplikasi**

Buka browser (Chrome, Firefox, atau Edge) dan ketikkan alamat URL aplikasi InventoriKu. Anda akan disambut dengan halaman login bergaya gelap (dark mode) dengan efek visual modern.

**Langkah 2 — Masukkan Email**

Pada kolom **Email**, ketikkan alamat email akun Anda.

Contoh: `admin@inventoriku.com`

**Langkah 3 — Masukkan Password**

Pada kolom **Password**, ketikkan kata sandi akun Anda. Klik ikon mata (👁) di sisi kanan kolom password untuk menampilkan atau menyembunyikan karakter password.

**Langkah 4 — Klik Tombol Masuk**

Klik tombol **"Masuk ke Dashboard"** berwarna biru-ungu. Sistem akan memverifikasi kredensial Anda.

**Langkah 5 — Berhasil Login**

Jika login berhasil, akan muncul notifikasi popup bertuliskan **"Selamat Datang!"** beserta nama pengguna. Anda akan otomatis diarahkan ke halaman Dashboard.

### Pesan Error Login

| Pesan Error | Penyebab | Solusi |
|---|---|---|
| *"Email atau password salah"* | Kredensial tidak cocok | Periksa kembali email dan password |
| *"Login Gagal"* | Koneksi ke server bermasalah | Periksa koneksi internet dan status server |
| Halaman tidak terbuka | Server tidak berjalan | Pastikan backend Laravel aktif |

### Keamanan Sesi

- Aplikasi menggunakan sistem **single session** — jika Anda login dari perangkat baru, sesi di perangkat lama akan otomatis berakhir.
- Token autentikasi disimpan di `localStorage` browser. Jangan gunakan komputer publik tanpa logout terlebih dahulu.
- Jika token kedaluwarsa atau tidak valid, sistem akan otomatis mengarahkan kembali ke halaman login.

### Cara Logout

Untuk keluar dari sistem:

1. Lihat panel kiri bawah sidebar — terdapat informasi nama dan email pengguna yang sedang aktif.
2. Klik tombol **"Keluar"** berwarna merah.
3. Akan muncul konfirmasi: *"Anda yakin ingin keluar dari sistem?"*
4. Klik **"Ya, Logout"** untuk konfirmasi, atau **"Batal"** untuk membatalkan.
5. Sistem akan menghapus sesi dan mengarahkan kembali ke halaman login.

---

## 2.2 Navigasi Dasar

Setelah berhasil login, Anda akan melihat tampilan utama aplikasi yang terdiri dari dua bagian utama: **Sidebar Navigasi** di sebelah kiri dan **Area Konten** di sebelah kanan.

### Struktur Tampilan Utama

```
┌─────────────────────────────────────────────────────────┐
│  SIDEBAR (kiri, lebar 288px)  │  AREA KONTEN (kanan)    │
│                               │                          │
│  🔷 InventoriKu               │  [Konten halaman aktif]  │
│     Sistem Manajemen          │                          │
│                               │                          │
│  ▶ Dashboard                  │                          │
│  ▶ Jenis Barang               │                          │
│  ▶ Restock Gudang             │                          │
│  ▶ Kasir / Penjualan          │                          │
│  ▶ Riwayat Penjualan          │                          │
│                               │                          │
│  ┌─────────────────────────┐  │                          │
│  │ 👤 Nama Admin           │  │                          │
│  │    email@domain.com     │  │                          │
│  │  [🚪 Keluar]            │  │                          │
│  └─────────────────────────┘  │                          │
└─────────────────────────────────────────────────────────┘
```

### Menu Navigasi Sidebar

| Menu | Ikon | Fungsi |
|---|---|---|
| **Dashboard** | 📊 LayoutDashboard | Halaman utama dengan ringkasan performa bisnis |
| **Jenis Barang** | 📦 Package | Kelola katalog produk dan lihat status stok |
| **Restock Gudang** | ➕ PlusCircle | Tambah stok barang dari supplier |
| **Kasir / Penjualan** | 🛒 ShoppingCart | Proses transaksi penjualan ke pelanggan |
| **Riwayat Penjualan** | 🕐 Clock | Lihat semua riwayat transaksi dan laporan |

### Cara Berpindah Halaman

Klik salah satu menu di sidebar untuk berpindah ke halaman yang diinginkan. Menu yang sedang aktif ditandai dengan:
- Latar belakang berwarna **biru-indigo** (gradien)
- Garis putih kecil di sisi kiri menu
- Teks berwarna **putih**

Menu yang tidak aktif ditampilkan dengan teks abu-abu dan akan berubah menjadi putih saat kursor diarahkan ke atasnya.

### Informasi Pengguna Aktif

Di bagian bawah sidebar terdapat kartu informasi pengguna yang menampilkan:
- **Nama lengkap** pengguna yang sedang login
- **Alamat email** akun
- **Tombol Keluar** untuk logout dari sistem

### Transisi Halaman

Setiap perpindahan halaman dilengkapi dengan animasi transisi yang halus untuk pengalaman pengguna yang lebih nyaman. Saat pertama kali login, konten utama akan muncul dengan efek fade-in dari bawah.

### Tampilan Responsif

Aplikasi dioptimalkan untuk layar desktop (lebar ≥ 1024px). Pada layar yang lebih kecil, beberapa elemen mungkin tampil dalam tata letak yang berbeda namun tetap dapat digunakan.

---

&nbsp;

---

# BAB 3: PANDUAN FITUR

---

## 3.1 Dashboard

Dashboard adalah halaman pertama yang muncul setelah login. Halaman ini berfungsi sebagai **pusat kendali (command center)** yang memberikan gambaran menyeluruh tentang kondisi bisnis Anda secara real-time.

### Cara Mengakses

Klik menu **"Dashboard"** (ikon grafik) di sidebar, atau akses langsung melalui URL `/`.

### Komponen Dashboard

Dashboard terdiri dari tiga bagian utama:

---

#### 3.1.1 Header Dashboard

Di bagian atas halaman terdapat:
- **Judul halaman**: "Dashboard"
- **Subjudul**: "Ringkasan performa gudang dan penjualan hari ini."
- **Tanggal hari ini**: Ditampilkan dalam format lengkap (contoh: *Minggu, 3 Mei 2026*) di pojok kanan atas, dengan latar belakang biru muda.

---

#### 3.1.2 Kartu Statistik (Stat Cards)

Terdapat **4 kartu statistik** yang menampilkan data kunci bisnis hari ini:

| Kartu | Warna | Data yang Ditampilkan |
|---|---|---|
| **Keuntungan Hari Ini** | Hijau (Emerald) | Total laba bersih dari selisih harga jual dan harga pokok semua penjualan hari ini |
| **Total Penjualan Hari Ini** | Biru | Total pendapatan kotor dari semua transaksi penjualan hari ini |
| **Total Jenis Barang** | Kuning (Amber) | Jumlah jenis/varian produk yang terdaftar di sistem |
| **Total Stok Keseluruhan** | Ungu | Jumlah total unit stok dari semua jenis barang yang tersedia di gudang |

Semua nilai mata uang ditampilkan dalam format **Rupiah Indonesia** (contoh: `Rp 150.000`).

Setiap kartu memiliki efek hover: kartu akan sedikit terangkat ke atas saat kursor diarahkan ke atasnya.

---

#### 3.1.3 Grafik Tren Keuntungan 7 Hari Terakhir

Grafik **Area Chart** di bagian kiri bawah menampilkan tren keuntungan bersih selama 7 hari terakhir.

**Cara membaca grafik:**
- **Sumbu X (horizontal)**: Hari dalam seminggu (Mon, Tue, Wed, dst.)
- **Sumbu Y (vertikal)**: Nilai keuntungan dalam ribuan Rupiah (contoh: `Rp 50k` = Rp 50.000)
- **Area hijau**: Menunjukkan keuntungan pada hari tersebut
- **Tooltip**: Arahkan kursor ke titik grafik untuk melihat nilai keuntungan tepat pada hari tersebut

Jika belum ada data penjualan, grafik akan menampilkan pesan: *"Belum ada data untuk grafik."*

---

#### 3.1.4 Grafik Barang Paling Laris

Grafik **Bar Chart Horizontal** di bagian kanan bawah menampilkan **5 barang dengan penjualan terbanyak** sepanjang waktu (all-time).

**Cara membaca grafik:**
- **Sumbu Y (vertikal)**: Nama barang
- **Sumbu X (horizontal)**: Jumlah unit yang terjual
- **Batang biru**: Panjang batang menunjukkan volume penjualan relatif antar produk

Jika belum ada penjualan, grafik akan menampilkan pesan: *"Belum ada barang terjual."*

---

#### 3.1.5 Loading State Dashboard

Saat data sedang dimuat dari server, Dashboard menampilkan animasi loading berupa lingkaran berputar berwarna kuning dengan teks *"Menghitung performa..."*. Ini normal dan biasanya berlangsung kurang dari 1 detik.

---

### Alur Kerja yang Disarankan

Setiap hari kerja, disarankan untuk:

1. **Buka Dashboard** di awal hari untuk melihat kondisi stok dan performa kemarin.
2. **Perhatikan kartu "Total Stok"** — jika stok rendah, segera lakukan restock.
3. **Pantau grafik tren** untuk mengetahui apakah keuntungan meningkat atau menurun.
4. **Catat barang paling laris** untuk perencanaan pembelian stok berikutnya.

---

## 3.2 Manajemen Data

Bagian ini mencakup tiga fitur utama pengelolaan data operasional: **Jenis Barang**, **Restock Gudang**, dan **Kasir/Penjualan**.

---

### 3.2.1 Jenis Barang

Halaman **Jenis Barang** adalah master data produk. Di sini Anda mendaftarkan semua jenis barang yang dijual beserta harga jualnya.

#### Cara Mengakses

Klik menu **"Jenis Barang"** (ikon kotak/Package) di sidebar.

#### Tampilan Halaman

Halaman ini terdiri dari:
1. **Header** dengan judul "Jenis Barang" dan tombol "Tambah Barang Baru"
2. **3 Kartu Statistik Cepat** di bagian atas
3. **Tabel Daftar Barang** di bagian bawah

#### Kartu Statistik Jenis Barang

| Kartu | Ikon | Informasi |
|---|---|---|
| **Total Jenis** | 🏷️ Tag | Jumlah total jenis barang yang terdaftar |
| **Stok Rendah** | ⚠️ AlertCircle | Jumlah barang dengan stok ≤ 10 unit |
| **Nilai Stok** | 💰 DollarSign | Total nilai stok (harga jual × jumlah stok semua barang) |

#### Tabel Daftar Barang

Tabel menampilkan kolom-kolom berikut:

| Kolom | Keterangan |
|---|---|
| **#** | ID barang (3 digit, contoh: 001, 002) |
| **Nama Barang** | Nama produk beserta deskripsi singkat (jika ada) |
| **Harga Jual** | Harga satuan jual dalam Rupiah |
| **Stok** | Jumlah unit yang tersedia di gudang |
| **Status** | Indikator kondisi stok (lihat tabel status di bawah) |
| **Aksi** | Tombol hapus barang |

#### Status Stok Barang

| Status | Warna | Kondisi |
|---|---|---|
| **Aman** | Hijau (Emerald) | Stok > 50 unit |
| **Cukup** | Biru | Stok 11–50 unit |
| **Rendah** | Kuning (Amber) | Stok 1–10 unit |
| **Habis** | Merah | Stok = 0 unit |

#### Fitur Pencarian Barang

Di atas tabel terdapat kolom pencarian. Ketikkan nama barang untuk memfilter daftar secara real-time. Hasil pencarian menampilkan jumlah barang yang ditemukan (contoh: *"3 dari 10 barang"*).

---

#### Menambah Barang Baru

**Langkah 1:** Klik tombol **"Tambah Barang Baru"** (berwarna ungu-indigo) di pojok kanan atas halaman.

**Langkah 2:** Modal (jendela popup) akan muncul dengan form isian:

| Field | Keterangan | Wajib Diisi |
|---|---|---|
| **Nama Barang** | Nama produk (maks. 255 karakter) | ✅ Ya |
| **Harga Jual (Rp)** | Harga satuan jual ke pelanggan | ✅ Ya |
| **Deskripsi Singkat** | Keterangan tambahan produk | ❌ Opsional |

**Langkah 3:** Isi semua field yang diperlukan, lalu klik **"Simpan Barang"**.

**Langkah 4:** Jika berhasil, akan muncul notifikasi sukses dan barang baru akan muncul di tabel dengan stok awal **0 unit**.

> **Penting:** Stok awal barang baru selalu 0. Untuk menambah stok, gunakan fitur **Restock Gudang**.

#### Menghapus Barang

**Langkah 1:** Klik ikon **tempat sampah** (🗑️) di kolom Aksi pada baris barang yang ingin dihapus.

**Langkah 2:** Akan muncul konfirmasi: *"Data yang dihapus tidak dapat dikembalikan!"*

**Langkah 3:** Klik **"Ya, Hapus!"** untuk konfirmasi penghapusan.

> **Catatan:** Sistem menggunakan **Soft Delete** — data barang tidak benar-benar dihapus dari database, melainkan ditandai sebagai terhapus. Riwayat penjualan yang terkait dengan barang tersebut tetap tersimpan dan akan menampilkan nama barang aslinya.

> **Peringatan:** Jika barang masih memiliki transaksi aktif, penghapusan mungkin akan gagal dengan pesan error.

---

### 3.2.2 Restock Gudang

Halaman **Restock Gudang** digunakan untuk mencatat pengadaan barang dari supplier. Setiap kali Anda membeli stok baru, catat di sini agar stok di sistem selalu akurat.

#### Cara Mengakses

Klik menu **"Restock Gudang"** (ikon plus/PlusCircle) di sidebar.

#### Tampilan Halaman

Halaman ini terdiri dari:
1. **Header** dengan judul "Restock Gudang"
2. **3 Kartu Statistik** di bagian atas
3. **Form Restock** di sebelah kiri
4. **Riwayat Restock** di sebelah kanan

#### Kartu Statistik Restock

| Kartu | Ikon | Informasi |
|---|---|---|
| **Total Restok** | 📦 Boxes | Jumlah total transaksi restock yang pernah dilakukan |
| **Unit Masuk** | 📈 TrendingUp | Total unit barang yang pernah masuk dari semua restock |
| **Total Modal** | 💼 Package | Total uang yang dikeluarkan untuk semua pembelian stok |

---

#### Melakukan Restock Barang

**Langkah 1:** Pada **Form Restock** di sebelah kiri, pilih barang yang ingin di-restock dari dropdown **"Pilih Barang"**. Dropdown menampilkan nama barang beserta stok saat ini.

**Langkah 2:** Isi field **"Jumlah Tambah (Qty)"** dengan jumlah unit yang dibeli dari supplier.

Contoh: Jika membeli 50 botol air mineral, isi dengan `50`.

**Langkah 3:** Isi field **"Total Modal Beli (Rp)"** dengan **total uang yang dibayarkan** untuk pembelian tersebut (bukan harga per satuan).

Contoh: Jika membeli 50 botol dengan total bayar Rp 75.000, isi dengan `75000`.

> **💡 Tips Penting:** Field "Total Modal Beli" adalah **total nominal keseluruhan**, bukan harga per unit. Sistem akan menghitung harga pokok rata-rata (moving average) secara otomatis.

**Langkah 4:** Klik tombol **"Proses Restock"** (berwarna biru-indigo).

**Langkah 5:** Jika berhasil, akan muncul notifikasi sukses dan stok barang akan otomatis bertambah. Catatan restock juga akan muncul di panel riwayat di sebelah kanan.

#### Kalkulasi Harga Pokok Rata-rata (Moving Average)

Sistem InventoriKu menggunakan metode **Moving Average Cost** untuk menghitung harga pokok barang. Ini penting untuk menghitung keuntungan yang akurat.

**Rumus:**
```
Harga Pokok Baru = (Stok Lama × HPP Lama + Modal Beli Baru) ÷ Stok Baru
```

**Contoh:**
- Stok lama: 20 unit, HPP lama: Rp 1.000/unit
- Restock: 50 unit, total modal: Rp 60.000
- HPP baru = (20 × 1.000 + 60.000) ÷ (20 + 50) = 80.000 ÷ 70 = **Rp 1.143/unit**

#### Panel Riwayat Restock

Di sebelah kanan form terdapat daftar semua riwayat restock yang pernah dilakukan, diurutkan dari yang terbaru. Setiap entri menampilkan:
- **Nama barang** yang di-restock
- **Jumlah unit** yang ditambahkan (ditandai dengan ikon hijau `+X unit`)
- **Waktu relatif** (contoh: "2 jam lalu", "3 hari lalu")
- **Total modal** yang dikeluarkan (ditampilkan dengan warna merah sebagai pengeluaran)

Arahkan kursor ke entri riwayat untuk melihat tanggal dan waktu lengkap.

---

### 3.2.3 Kasir / Penjualan

Halaman **Kasir / Penjualan** adalah sistem Point of Sale (POS) untuk mencatat transaksi penjualan kepada pelanggan. Fitur ini dirancang untuk kemudahan dan kecepatan proses kasir.

#### Cara Mengakses

Klik menu **"Kasir / Penjualan"** (ikon keranjang/ShoppingCart) di sidebar.

#### Alur Transaksi Penjualan

Proses penjualan terdiri dari 4 tahap:

```
[Layar Awal] → [Pilih Barang] → [Pembayaran] → [Struk/Konfirmasi]
```

---

#### Tahap 1: Layar Awal

Saat pertama membuka halaman, Anda akan melihat layar awal dengan ikon keranjang besar dan tombol **"Keranjang Baru"**.

Klik tombol **"Keranjang Baru"** untuk memulai sesi transaksi baru.

---

#### Tahap 2: Memilih Barang (POS Interface)

Setelah klik "Keranjang Baru", tampilan berubah menjadi antarmuka POS dua panel:

**Panel Kiri — Daftar Produk:**
- Menampilkan semua barang yang tersedia dalam bentuk **grid kartu**
- Setiap kartu menampilkan: nama barang, stok tersisa, dan harga jual
- Barang dengan stok habis ditampilkan dengan tampilan redup dan tidak dapat diklik
- Terdapat kolom **pencarian** di bagian atas untuk mencari barang dengan cepat
- Angka kecil di pojok kanan atas kartu menunjukkan jumlah barang tersebut di keranjang

**Panel Kanan — Keranjang Belanja:**
- Menampilkan daftar barang yang sudah dipilih
- Setiap item menampilkan: nama, harga satuan, kontrol jumlah (+/-), dan subtotal
- Total belanja ditampilkan di bagian bawah
- Tombol **"Checkout"** untuk melanjutkan ke pembayaran

**Cara Menambah Barang ke Keranjang:**
1. Klik kartu barang di panel kiri — barang otomatis masuk ke keranjang dengan jumlah 1
2. Klik lagi untuk menambah jumlah, atau gunakan tombol **+** di panel keranjang
3. Gunakan tombol **-** untuk mengurangi jumlah (jika jumlah menjadi 0, barang dihapus dari keranjang)
4. Klik ikon **tempat sampah** di keranjang untuk menghapus barang sepenuhnya

**Membatalkan Transaksi:**
Klik tombol **panah kiri** (←) di pojok kiri atas. Jika keranjang tidak kosong, akan muncul konfirmasi pembatalan.

---

#### Tahap 3: Pembayaran

Setelah keranjang terisi, klik tombol **"Checkout"** (berwarna hijau). Modal pembayaran akan muncul.

**Isi Modal Pembayaran:**

| Bagian | Keterangan |
|---|---|
| **Ringkasan Keranjang** | Daftar semua barang yang dibeli beserta subtotal masing-masing |
| **Total Belanja** | Jumlah yang harus dibayar pelanggan |
| **Input Uang Pembeli** | Masukkan nominal uang yang diberikan pelanggan |
| **Tombol Cepat** | Tombol pintas untuk menambah nominal: Uang Pas, +5K, +10K, +50K, +100K |
| **Kembalian** | Otomatis dihitung: Uang Pembeli − Total Belanja |

**Cara Mengisi Pembayaran:**
1. Ketik nominal uang pembeli di field **"Uang Pembeli"**, ATAU
2. Klik **"Uang Pas"** jika pelanggan membayar tepat sesuai total, ATAU
3. Klik tombol **+5K / +10K / +50K / +100K** untuk menambah nominal secara bertahap

Tombol **"Bayar Sekarang"** hanya aktif jika uang pembeli ≥ total belanja.

Klik **"Bayar Sekarang"** untuk memproses transaksi.

---

#### Tahap 4: Struk Transaksi

Setelah pembayaran berhasil, akan muncul **struk digital** yang menampilkan:
- Nama toko: **INVENTORIKU**
- Status: **Transaksi Berhasil**
- Tanggal dan waktu transaksi
- Nama kasir
- Daftar barang yang dibeli (nama, jumlah, harga satuan, subtotal)
- **Total belanja**
- **Uang tunai** yang diterima
- **Kembalian** yang harus diberikan ke pelanggan

Klik **"Tutup & Kembali"** untuk menutup struk dan kembali ke layar awal kasir, siap untuk transaksi berikutnya.

#### Validasi Stok Otomatis

Sistem secara otomatis memvalidasi stok saat transaksi diproses:
- Jika stok tidak mencukupi, transaksi akan **ditolak** dengan pesan error yang menyebutkan nama barang dan sisa stok yang tersedia.
- Stok akan **otomatis berkurang** sesuai jumlah yang terjual setelah transaksi berhasil.

---

## 3.3 Laporan

### 3.3.1 Riwayat Penjualan

Halaman **Riwayat Penjualan** menampilkan laporan lengkap semua transaksi penjualan yang pernah tercatat dalam sistem, dilengkapi dengan fitur filter dan pencarian.

#### Cara Mengakses

Klik menu **"Riwayat Penjualan"** (ikon jam/Clock) di sidebar.

#### Tampilan Halaman

Halaman ini terdiri dari:
1. **Header** dengan judul "Riwayat Penjualan"
2. **4 Kartu Ringkasan** di bagian atas
3. **Panel Filter** di tengah
4. **Daftar Transaksi** di bagian bawah

---

#### Kartu Ringkasan Penjualan

| Kartu | Ikon | Informasi |
|---|---|---|
| **Total Pendapatan** | 💰 DollarSign | Total pendapatan kotor dari semua transaksi (sesuai filter aktif) |
| **Total Keuntungan** | 📈 TrendingUp | Total laba bersih (pendapatan − harga pokok) |
| **Jumlah Transaksi** | 🧾 Receipt | Total jumlah transaksi yang tercatat |
| **Unit Terjual** | 🛒 ShoppingCart | Total unit barang yang terjual |

> **Catatan:** Nilai pada kartu ringkasan akan berubah sesuai filter tanggal yang diterapkan.

---

#### Fitur Filter dan Pencarian

Panel filter menyediakan tiga opsi penyaringan data:

**1. Cari Barang**
Ketikkan nama barang untuk menampilkan hanya transaksi yang mengandung barang tersebut. Filter ini bekerja secara real-time (langsung saat mengetik).

**2. Filter Tanggal**
- **Dari Tanggal**: Pilih tanggal awal periode laporan
- **Sampai Tanggal**: Pilih tanggal akhir periode laporan

**3. Tombol Aksi Filter**

| Tombol | Fungsi |
|---|---|
| **Filter** | Terapkan filter tanggal yang dipilih dan muat ulang data |
| **Reset** | Hapus semua filter dan tampilkan semua data |

**Contoh Penggunaan Filter:**
- Untuk melihat laporan bulan April 2026: isi "Dari Tanggal" = 2026-04-01, "Sampai Tanggal" = 2026-04-30, lalu klik "Filter"
- Untuk melihat penjualan hari ini: isi kedua field dengan tanggal hari ini, lalu klik "Filter"

---

#### Daftar Transaksi

Setiap baris dalam daftar mewakili satu **transaksi** (satu sesi kasir). Informasi yang ditampilkan per transaksi:

| Informasi | Keterangan |
|---|---|
| **ID Transaksi** | 8 karakter pertama dari UUID transaksi (contoh: `A1B2C3D4`) |
| **Label Waktu** | Waktu relatif jika transaksi baru (contoh: "2 jam lalu") |
| **Nama Barang** | Daftar nama barang yang dibeli dalam transaksi ini |
| **Tanggal & Waktu** | Tanggal dan jam transaksi dilakukan |
| **Jumlah Barang & Unit** | Berapa jenis barang dan total unit yang dibeli |
| **Total Pendapatan** | Total nilai transaksi |
| **Laba/Rugi** | Keuntungan bersih transaksi (hijau = untung, merah = rugi) |

#### Melihat Detail Transaksi

Klik pada baris transaksi untuk **memperluas detail** (expand). Detail yang ditampilkan:

| Kolom | Keterangan |
|---|---|
| **Barang** | Nama setiap barang dalam transaksi |
| **Qty** | Jumlah unit yang dibeli |
| **Harga** | Total harga jual untuk barang tersebut |
| **Laba** | Keuntungan per barang (harga jual − harga pokok) |

Di baris paling bawah detail terdapat **baris total** yang merangkum keseluruhan transaksi.

Klik kembali pada baris transaksi untuk menutup detail.

#### Footer Ringkasan

Di bagian bawah daftar transaksi terdapat ringkasan:
- Jumlah transaksi yang ditampilkan
- **Total Pendapatan** keseluruhan
- **Total Laba** keseluruhan

---

#### Memahami Laporan Laba

Laba dihitung dengan rumus:

```
Laba = Harga Jual − Harga Pokok (HPP)
```

Di mana **Harga Pokok** adalah harga pokok rata-rata (moving average) pada saat barang terjual, bukan harga beli terbaru.

Indikator visual laba:
- **Panah hijau ke atas (↗)** + nilai hijau = transaksi menguntungkan
- **Panah merah ke bawah (↘)** + nilai merah = transaksi merugi (harga jual < HPP)

---

## 3.4 Pengaturan

### 3.4.1 Pengaturan Akun

Saat ini, InventoriKu versi 1.0 tidak memiliki halaman pengaturan terpisah. Pengaturan akun dikelola melalui database atau oleh administrator sistem.

**Informasi akun yang dapat dikelola:**
- Nama pengguna
- Alamat email
- Password

Untuk mengubah data akun, hubungi administrator sistem atau lakukan perubahan langsung melalui database (lihat Bab 4.1).

### 3.4.2 Pengaturan Aplikasi

Konfigurasi aplikasi dikelola melalui file `.env` di direktori backend. Beberapa pengaturan penting:

| Parameter | Keterangan |
|---|---|
| `APP_NAME` | Nama aplikasi (default: InventoriKu) |
| `APP_URL` | URL aplikasi backend |
| `DB_CONNECTION` | Jenis database (sqlite/mysql) |
| `DB_DATABASE` | Nama/path database |
| `SANCTUM_STATEFUL_DOMAINS` | Domain yang diizinkan untuk autentikasi |

> **Peringatan:** Perubahan pada file `.env` memerlukan restart server backend. Lakukan hanya jika Anda memahami dampaknya.

---

&nbsp;

---

# BAB 4: ADMINISTRASI

---

## 4.1 Manajemen Pengguna

InventoriKu versi 1.0 menggunakan sistem autentikasi berbasis **Laravel Sanctum** dengan model pengguna tunggal (single user per session). Manajemen pengguna dilakukan langsung melalui database atau command line Laravel.

### Struktur Data Pengguna

Tabel `users` di database menyimpan informasi berikut:

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | Integer | ID unik pengguna |
| `name` | String | Nama lengkap pengguna |
| `email` | String | Alamat email (digunakan untuk login) |
| `password` | String | Password yang sudah di-hash (bcrypt) |
| `created_at` | Timestamp | Waktu akun dibuat |
| `updated_at` | Timestamp | Waktu terakhir akun diperbarui |

### Membuat Pengguna Baru

Untuk membuat akun pengguna baru, gunakan Laravel Tinker melalui terminal:

```bash
cd backend
php artisan tinker
```

Kemudian jalankan perintah berikut di dalam Tinker:

```php
// Membuat pengguna baru
\App\Models\User::create([
    'name' => 'Nama Admin',
    'email' => 'admin@toko.com',
    'password' => bcrypt('password_anda'),
]);
```

Ketik `exit` untuk keluar dari Tinker.

### Mengubah Password Pengguna

Melalui Laravel Tinker:

```bash
php artisan tinker
```

```php
// Cari pengguna berdasarkan email
$user = \App\Models\User::where('email', 'admin@toko.com')->first();

// Update password
$user->update(['password' => bcrypt('password_baru')]);
```

### Mengubah Nama atau Email Pengguna

```php
$user = \App\Models\User::where('email', 'email_lama@toko.com')->first();
$user->update([
    'name' => 'Nama Baru',
    'email' => 'email_baru@toko.com',
]);
```

### Melihat Daftar Pengguna

```php
\App\Models\User::all(['id', 'name', 'email', 'created_at']);
```

### Menghapus Pengguna

```php
$user = \App\Models\User::find(1); // ganti 1 dengan ID pengguna
$user->delete();
```

> **Peringatan:** Menghapus pengguna yang sedang aktif akan memaksa logout sesi tersebut.

### Menggunakan Database Seeder

Untuk membuat data awal (seeding), edit file `backend/database/seeders/DatabaseSeeder.php`:

```php
public function run(): void
{
    \App\Models\User::factory()->create([
        'name' => 'Admin InventoriKu',
        'email' => 'admin@inventoriku.com',
        'password' => bcrypt('password123'),
    ]);
}
```

Kemudian jalankan:

```bash
php artisan db:seed
```

Atau untuk reset database dan seed ulang:

```bash
php artisan migrate:fresh --seed
```

> **⚠️ Peringatan Keras:** Perintah `migrate:fresh` akan **menghapus semua data** di database. Gunakan hanya pada instalasi baru atau lingkungan pengembangan.

### Manajemen Token Autentikasi

InventoriKu menggunakan **single session** — setiap login baru akan menghapus semua token lama pengguna tersebut. Token disimpan di tabel `personal_access_tokens`.

Untuk melihat token aktif:

```php
\Laravel\Sanctum\PersonalAccessToken::all();
```

Untuk mencabut semua token pengguna tertentu:

```php
$user = \App\Models\User::find(1);
$user->tokens()->delete();
```

---

## 4.2 Backup & Restore

Melakukan backup data secara rutin sangat penting untuk mencegah kehilangan data akibat kerusakan hardware, kesalahan manusia, atau insiden lainnya.

### Backup Database SQLite

Jika menggunakan SQLite (default), file database berada di:

```
backend/database/database.sqlite
```

#### Cara Backup Manual (SQLite)

**Windows:**
```powershell
# Salin file database ke lokasi backup
Copy-Item backend/database/database.sqlite backup/database_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss').sqlite
```

**Linux/Mac:**
```bash
cp backend/database/database.sqlite backup/database_backup_$(date +%Y%m%d_%H%M%S).sqlite
```

#### Cara Backup Otomatis (SQLite)

Buat script backup harian menggunakan Task Scheduler (Windows) atau Cron Job (Linux):

**Contoh Cron Job (Linux) — backup setiap hari pukul 23:00:**
```bash
0 23 * * * cp /path/to/backend/database/database.sqlite /path/to/backup/db_$(date +\%Y\%m\%d).sqlite
```

### Backup Database MySQL

Jika menggunakan MySQL, gunakan perintah `mysqldump`:

```bash
# Backup
mysqldump -u username -p nama_database > backup_inventoriku_$(date +%Y%m%d).sql

# Contoh:
mysqldump -u root -p inventoriku_db > backup_inventoriku_20260503.sql
```

### Restore Database SQLite

Untuk memulihkan data dari backup SQLite:

**Langkah 1:** Hentikan server backend terlebih dahulu.

**Langkah 2:** Ganti file database aktif dengan file backup:

```powershell
# Windows
Copy-Item backup/database_backup_20260503.sqlite backend/database/database.sqlite
```

```bash
# Linux/Mac
cp backup/database_backup_20260503.sqlite backend/database/database.sqlite
```

**Langkah 3:** Jalankan kembali server backend.

### Restore Database MySQL

```bash
mysql -u username -p nama_database < backup_inventoriku_20260503.sql
```

### Backup File Konfigurasi

Selain database, backup juga file konfigurasi penting:

| File | Lokasi | Keterangan |
|---|---|---|
| `.env` | `backend/.env` | Konfigurasi environment (DB, APP_KEY, dll.) |
| `database.sqlite` | `backend/database/` | File database SQLite |

> **Penting:** File `.env` mengandung `APP_KEY` yang digunakan untuk enkripsi. Jangan kehilangan file ini.

### Strategi Backup yang Disarankan

| Frekuensi | Jenis Backup | Retensi |
|---|---|---|
| **Harian** | Database penuh | 7 hari terakhir |
| **Mingguan** | Database + konfigurasi | 4 minggu terakhir |
| **Bulanan** | Backup lengkap (database + kode) | 12 bulan terakhir |

### Memindahkan Aplikasi ke Server Baru

**Langkah 1:** Salin seluruh folder `backend` dan `frontend` ke server baru.

**Langkah 2:** Di server baru, jalankan:

```bash
# Backend
cd backend
composer install --no-dev
cp .env.example .env
# Edit .env sesuai konfigurasi server baru
php artisan key:generate
php artisan migrate

# Frontend (build untuk production)
cd frontend
npm install
npm run build
```

**Langkah 3:** Restore database dari backup (lihat langkah di atas).

**Langkah 4:** Konfigurasi web server (Apache/Nginx) untuk mengarahkan ke folder `backend/public` dan `frontend/dist`.

---

&nbsp;

---

# BAB 5: TROUBLESHOOTING & FAQ

---

## 5.1 Troubleshooting

Bagian ini membantu Anda mendiagnosis dan menyelesaikan masalah umum yang mungkin ditemui saat menggunakan InventoriKu.

---

### Masalah Login

#### ❌ Tidak bisa login — "Email atau password salah"

**Penyebab:** Kredensial yang dimasukkan tidak cocok dengan data di database.

**Solusi:**
1. Pastikan tidak ada typo pada email (perhatikan huruf besar/kecil).
2. Pastikan Caps Lock tidak aktif saat mengetik password.
3. Jika lupa password, reset melalui Tinker (lihat Bab 4.1).
4. Hubungi administrator untuk reset akun.

---

#### ❌ Halaman login tidak terbuka / blank putih

**Penyebab:** Server frontend tidak berjalan atau ada error JavaScript.

**Solusi:**
1. Pastikan server frontend berjalan: `npm run dev` di folder `frontend`.
2. Buka Developer Tools browser (F12) → tab Console, cari pesan error.
3. Coba hard refresh: `Ctrl + Shift + R` (Windows) atau `Cmd + Shift + R` (Mac).
4. Coba buka di browser lain.

---

#### ❌ Login berhasil tapi langsung kembali ke halaman login

**Penyebab:** Token autentikasi tidak tersimpan atau server backend tidak merespons.

**Solusi:**
1. Pastikan server backend berjalan: `php artisan serve` di folder `backend`.
2. Periksa apakah browser memblokir `localStorage` (mode incognito/private kadang membatasi ini).
3. Buka Developer Tools → Application → Local Storage, pastikan `auth_token` tersimpan.

---

### Masalah Data Tidak Muncul

#### ❌ Dashboard menampilkan semua angka 0

**Penyebab:** Belum ada data transaksi, atau koneksi ke API backend gagal.

**Solusi:**
1. Pastikan sudah ada data barang dan transaksi penjualan.
2. Buka Developer Tools → tab Network, refresh halaman, cari request ke `/api/dashboard`. Periksa status response.
3. Pastikan backend berjalan dan dapat diakses.

---

#### ❌ Daftar barang kosong padahal sudah ditambahkan

**Penyebab:** Koneksi ke API gagal atau data belum tersimpan.

**Solusi:**
1. Refresh halaman (F5).
2. Periksa koneksi internet.
3. Buka Developer Tools → Network → cari request ke `/api/items`.
4. Jika status 401, sesi telah berakhir — login ulang.
5. Jika status 500, ada error di server — periksa log Laravel di `backend/storage/logs/laravel.log`.

---

### Masalah Transaksi

#### ❌ Tidak bisa checkout — "Stok tidak mencukupi"

**Penyebab:** Jumlah barang di keranjang melebihi stok yang tersedia.

**Solusi:**
1. Kurangi jumlah barang di keranjang sesuai stok yang tersedia.
2. Lakukan restock terlebih dahulu jika stok memang habis (Bab 3.2.2).
3. Stok yang ditampilkan di kartu produk sudah dikurangi dengan jumlah di keranjang — perhatikan angka "Stok: X" pada kartu.

---

#### ❌ Transaksi berhasil tapi stok tidak berkurang

**Penyebab:** Kemungkinan ada delay atau error sinkronisasi.

**Solusi:**
1. Refresh halaman Jenis Barang untuk memuat ulang data stok.
2. Jika masih tidak berubah, periksa log Laravel untuk error database.
3. Pastikan tidak ada error saat proses checkout (perhatikan notifikasi popup).

---

#### ❌ Barang yang sudah dihapus masih muncul di riwayat penjualan

**Penjelasan:** Ini adalah perilaku yang **disengaja dan benar**. Sistem menggunakan Soft Delete — barang yang dihapus tetap ada di database dan riwayat transaksi tetap menampilkan nama barang aslinya. Ini penting untuk integritas data laporan keuangan.

---

### Masalah Performa

#### ❌ Aplikasi terasa lambat / loading lama

**Penyebab:** Koneksi internet lambat, server kelebihan beban, atau database terlalu besar.

**Solusi:**
1. Periksa kecepatan internet.
2. Pastikan server tidak menjalankan proses berat lainnya.
3. Jika database SQLite sudah sangat besar (>100MB), pertimbangkan migrasi ke MySQL.
4. Jalankan `php artisan optimize` di folder backend untuk mengoptimalkan cache Laravel.

---

#### ❌ Grafik dashboard tidak tampil

**Penyebab:** Library Recharts gagal dimuat atau data kosong.

**Solusi:**
1. Refresh halaman.
2. Pastikan ada data penjualan dalam 7 hari terakhir untuk grafik tren.
3. Pastikan ada data penjualan sama sekali untuk grafik barang terlaris.
4. Periksa Console browser untuk error JavaScript.

---

### Masalah Server

#### ❌ Error "500 Internal Server Error"

**Penyebab:** Ada error di kode PHP backend.

**Solusi:**
1. Buka file log: `backend/storage/logs/laravel.log`
2. Cari baris error terbaru (biasanya di bagian bawah file)
3. Identifikasi penyebab error dari pesan yang tertulis
4. Pastikan file `.env` sudah dikonfigurasi dengan benar
5. Jalankan `php artisan config:clear` dan `php artisan cache:clear`

---

#### ❌ Error "CORS" di browser

**Penyebab:** Konfigurasi CORS backend tidak mengizinkan domain frontend.

**Solusi:**
1. Buka `backend/config/cors.php`
2. Pastikan `allowed_origins` mencakup URL frontend Anda
3. Atau tambahkan domain frontend ke `SANCTUM_STATEFUL_DOMAINS` di `.env`

---

## 5.2 FAQ (Pertanyaan yang Sering Diajukan)

---

**Q: Apakah InventoriKu bisa digunakan oleh banyak pengguna sekaligus?**

A: Versi 1.0 mendukung multi-user (banyak akun), namun setiap akun hanya bisa aktif di satu sesi pada satu waktu. Jika login dari perangkat baru, sesi di perangkat lama akan otomatis berakhir. Tidak ada pembatasan jumlah akun yang bisa dibuat.

---

**Q: Apakah data saya aman jika browser ditutup?**

A: Ya. Data tersimpan di database server, bukan di browser. Token autentikasi disimpan di `localStorage` browser, sehingga Anda tidak perlu login ulang setiap kali membuka browser (selama token masih valid). Namun, jika menggunakan mode incognito/private, Anda perlu login ulang setiap sesi.

---

**Q: Bagaimana cara mengubah harga jual barang?**

A: Saat ini, fitur edit harga barang belum tersedia melalui antarmuka grafis. Untuk mengubah harga jual, gunakan Laravel Tinker:

```php
$item = \App\Models\Item::find(1); // ganti 1 dengan ID barang
$item->update(['selling_price' => 2500]); // harga baru dalam Rupiah
```

---

**Q: Apakah bisa mencetak struk fisik?**

A: Struk digital ditampilkan di layar setelah transaksi berhasil. Untuk mencetak, gunakan fungsi print browser (`Ctrl+P`) saat struk ditampilkan. Aplikasi sudah memiliki CSS khusus untuk tampilan cetak (`print:` classes di Tailwind).

---

**Q: Bagaimana jika saya salah input restock?**

A: Saat ini belum ada fitur edit atau hapus riwayat restock melalui antarmuka. Untuk koreksi, gunakan Tinker:

```php
// Hapus entri restock yang salah
$restock = \App\Models\Restock::find(ID_RESTOCK);
$restock->delete();

// Kemudian koreksi stok inventory secara manual
$inventory = \App\Models\Inventory::where('item_id', ID_BARANG)->first();
$inventory->update(['stock' => STOK_YANG_BENAR]);
```

---

**Q: Apakah bisa menggunakan MySQL sebagai pengganti SQLite?**

A: Ya. Edit file `backend/.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database
DB_USERNAME=username_mysql
DB_PASSWORD=password_mysql
```

Kemudian jalankan `php artisan migrate` untuk membuat tabel di MySQL.

---

**Q: Bagaimana cara melihat laporan per bulan?**

A: Gunakan fitur filter tanggal di halaman **Riwayat Penjualan**:
1. Isi "Dari Tanggal" dengan tanggal 1 bulan yang diinginkan (contoh: 2026-04-01)
2. Isi "Sampai Tanggal" dengan tanggal terakhir bulan tersebut (contoh: 2026-04-30)
3. Klik tombol "Filter"
4. Kartu ringkasan akan menampilkan total pendapatan, keuntungan, dan transaksi untuk periode tersebut.

---

**Q: Kenapa keuntungan di dashboard berbeda dengan di riwayat penjualan?**

A: Dashboard menampilkan keuntungan **hari ini saja**, sedangkan riwayat penjualan menampilkan keuntungan sesuai **filter tanggal yang aktif** (default: semua waktu). Pastikan filter di riwayat penjualan disesuaikan dengan periode yang ingin dibandingkan.

---

**Q: Apakah ada fitur diskon atau promo?**

A: Versi 1.0 belum mendukung fitur diskon. Harga yang digunakan adalah harga jual yang terdaftar di master data barang.

---

**Q: Bagaimana cara mengetahui barang mana yang perlu segera di-restock?**

A: Ada dua cara:
1. **Halaman Jenis Barang**: Lihat kolom "Status" — barang dengan status **Rendah** (stok ≤ 10) atau **Habis** (stok = 0) perlu segera di-restock.
2. **Dashboard**: Kartu "Total Stok Keseluruhan" memberikan gambaran umum. Jika angkanya turun drastis, segera cek halaman Jenis Barang.

---

**Q: Apakah aplikasi bisa diakses dari smartphone?**

A: Aplikasi dapat dibuka di browser smartphone, namun tampilan dioptimalkan untuk layar desktop. Beberapa fitur seperti tabel dan grafik mungkin memerlukan scroll horizontal di layar kecil. Untuk penggunaan optimal, gunakan tablet atau laptop.

---

&nbsp;

---

# BAB 6: LAMPIRAN

---

## 6.1 Glosarium

Berikut adalah daftar istilah teknis dan bisnis yang digunakan dalam aplikasi InventoriKu beserta penjelasannya:

---

| Istilah | Definisi |
|---|---|
| **API (Application Programming Interface)** | Antarmuka komunikasi antara frontend (tampilan) dan backend (server). InventoriKu menggunakan REST API. |
| **Autentikasi** | Proses verifikasi identitas pengguna melalui email dan password sebelum dapat mengakses sistem. |
| **Average Purchase Price (HPP Rata-rata)** | Harga pokok pembelian rata-rata per unit barang, dihitung menggunakan metode Moving Average. Digunakan untuk menghitung keuntungan penjualan. |
| **Backend** | Bagian server aplikasi yang mengelola logika bisnis, database, dan API. InventoriKu menggunakan Laravel (PHP). |
| **Bearer Token** | Token autentikasi yang dikirimkan di header setiap request API untuk memverifikasi identitas pengguna. |
| **Dashboard** | Halaman utama yang menampilkan ringkasan data dan indikator kinerja bisnis secara visual. |
| **Database** | Tempat penyimpanan semua data aplikasi (barang, stok, transaksi, pengguna). InventoriKu mendukung SQLite dan MySQL. |
| **Frontend** | Bagian tampilan aplikasi yang dilihat dan digunakan oleh pengguna. InventoriKu menggunakan React.js. |
| **HPP (Harga Pokok Penjualan)** | Biaya yang dikeluarkan untuk mendapatkan barang yang dijual. Digunakan untuk menghitung laba kotor. |
| **Inventory** | Catatan stok barang di gudang, termasuk jumlah unit dan harga pokok rata-rata. |
| **Item** | Jenis/varian barang yang terdaftar dalam sistem. Setiap item memiliki nama, harga jual, dan satu record inventory. |
| **Kasir** | Fitur Point of Sale (POS) untuk memproses transaksi penjualan kepada pelanggan. |
| **Keuntungan / Laba** | Selisih antara harga jual dan harga pokok barang. Laba = Harga Jual − HPP. |
| **Laravel** | Framework PHP yang digunakan untuk membangun backend InventoriKu. |
| **Laravel Sanctum** | Package Laravel untuk autentikasi API berbasis token. |
| **localStorage** | Penyimpanan data di browser pengguna. InventoriKu menyimpan token autentikasi di sini. |
| **Login** | Proses masuk ke sistem menggunakan email dan password. |
| **Logout** | Proses keluar dari sistem yang menghapus sesi aktif dan token autentikasi. |
| **Modal Beli** | Total uang yang dikeluarkan untuk membeli stok barang dari supplier (bukan harga per unit). |
| **Moving Average Cost** | Metode perhitungan harga pokok rata-rata yang diperbarui setiap kali ada restock baru. |
| **Pendapatan** | Total uang yang diterima dari penjualan barang (harga jual × jumlah terjual). |
| **POS (Point of Sale)** | Sistem kasir untuk memproses transaksi penjualan di tempat. |
| **React.js** | Library JavaScript untuk membangun antarmuka pengguna yang interaktif. |
| **Restock** | Proses penambahan stok barang dari supplier ke gudang. |
| **REST API** | Arsitektur komunikasi antara frontend dan backend menggunakan HTTP request (GET, POST, PUT, DELETE). |
| **Sanctum Token** | Token unik yang dihasilkan saat login, digunakan untuk mengautentikasi setiap request API. |
| **Seeder** | Script untuk mengisi database dengan data awal (contoh: akun admin default). |
| **Single Session** | Kebijakan di mana setiap pengguna hanya bisa aktif di satu perangkat pada satu waktu. |
| **Soft Delete** | Metode penghapusan data di mana data tidak benar-benar dihapus dari database, melainkan ditandai sebagai "terhapus". Data masih bisa direferensikan oleh transaksi lama. |
| **SQLite** | Database berbasis file yang digunakan sebagai default InventoriKu. Tidak memerlukan server database terpisah. |
| **Stok** | Jumlah unit barang yang tersedia di gudang pada saat tertentu. |
| **Tailwind CSS** | Framework CSS utility-first yang digunakan untuk styling antarmuka InventoriKu. |
| **Transaction ID** | ID unik (UUID) yang mengidentifikasi satu sesi transaksi kasir. Satu transaksi bisa mencakup beberapa jenis barang. |
| **UUID (Universally Unique Identifier)** | String unik 36 karakter yang digunakan sebagai ID transaksi untuk memastikan tidak ada duplikasi. |
| **Vite** | Build tool modern untuk frontend React yang menyediakan hot-reload cepat saat pengembangan. |

---

## 6.2 Kontak Dukungan

Jika Anda mengalami masalah yang tidak tercakup dalam manual ini, atau membutuhkan bantuan teknis lebih lanjut, berikut adalah panduan untuk mendapatkan dukungan:

---

### Dukungan Teknis Internal

Untuk organisasi yang menggunakan InventoriKu secara internal, hubungi administrator IT atau teknisi yang bertanggung jawab atas instalasi dan pemeliharaan aplikasi.

**Informasi yang perlu disiapkan saat menghubungi dukungan:**

1. **Deskripsi masalah** — Jelaskan apa yang terjadi secara detail
2. **Langkah reproduksi** — Apa yang Anda lakukan sebelum masalah terjadi
3. **Pesan error** — Screenshot atau teks pesan error yang muncul
4. **Browser dan versi** — Contoh: Chrome 124, Firefox 125
5. **Waktu kejadian** — Kapan masalah pertama kali terjadi

---

### Cara Mengumpulkan Informasi Diagnostik

Sebelum menghubungi dukungan, kumpulkan informasi berikut:

**1. Log Browser (Console):**
- Tekan `F12` di browser
- Pilih tab **Console**
- Screenshot atau salin semua pesan error (teks merah)

**2. Log Server Laravel:**
- Buka file: `backend/storage/logs/laravel.log`
- Cari baris dengan kata "ERROR" atau "CRITICAL" terbaru
- Salin 20–30 baris terakhir dari file tersebut

**3. Informasi Versi:**
```bash
# Di folder backend
php --version
php artisan --version

# Di folder frontend
node --version
npm --version
```

---

### Referensi Dokumentasi Resmi

Untuk masalah yang berkaitan dengan teknologi yang digunakan InventoriKu, Anda dapat merujuk ke dokumentasi resmi berikut:

| Teknologi | Dokumentasi |
|---|---|
| **Laravel** | https://laravel.com/docs |
| **Laravel Sanctum** | https://laravel.com/docs/sanctum |
| **React.js** | https://react.dev |
| **Vite** | https://vitejs.dev/guide |
| **Tailwind CSS** | https://tailwindcss.com/docs |
| **Recharts** | https://recharts.org/en-US/api |

---

### Checklist Sebelum Menghubungi Dukungan

Sebelum menghubungi dukungan, pastikan Anda sudah mencoba langkah-langkah berikut:

- [ ] Refresh halaman browser (`F5` atau `Ctrl+R`)
- [ ] Hard refresh browser (`Ctrl+Shift+R`)
- [ ] Coba di browser lain
- [ ] Pastikan koneksi internet stabil
- [ ] Pastikan server backend berjalan (`php artisan serve`)
- [ ] Pastikan server frontend berjalan (`npm run dev`)
- [ ] Periksa Bab 5.1 Troubleshooting untuk solusi masalah umum
- [ ] Periksa log Laravel di `backend/storage/logs/laravel.log`

---

&nbsp;

---

## Catatan Versi

| Versi | Tanggal | Perubahan |
|---|---|---|
| **1.0.0** | Mei 2026 | Rilis pertama — Dashboard, Jenis Barang, Restock, Kasir, Riwayat Penjualan |

---

&nbsp;

---

<div align="center">

*Manual Book InventoriKu — Versi 1.0*

*© 2026 InventoriKu. Sistem Manajemen Gudang & Penjualan untuk UMKM.*

*Dokumen ini dibuat untuk membantu pengguna memaksimalkan penggunaan aplikasi InventoriKu.*

</div>

---
