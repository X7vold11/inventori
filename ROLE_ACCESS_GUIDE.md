# Panduan Role-Based Access Control - InventoriKu v2.0

## Tentang Role-Based Access

InventoriKu v2.0 memiliki sistem **Role-Based Access Control (RBAC)** yang membatasi akses fitur berdasarkan peran (role) pengguna. Ini memastikan setiap user hanya dapat mengakses fitur yang sesuai dengan tanggung jawab mereka.

---

## Daftar Role

### 1. 👔 Manager

**Deskripsi**: Pengelola toko yang bertanggung jawab atas operasional, stok, dan laporan.

**Akses Fitur:**
- ✅ Dashboard (statistik & grafik)
- ✅ Jenis Barang (CRUD master data)
- ✅ Restock Gudang (tambah stok dari supplier)
- ✅ Riwayat Penjualan (laporan lengkap)
- ❌ Kasir/POS (tidak ada akses)

**Menu Sidebar:**
```
📊 Dashboard
📦 Jenis Barang
➕ Restock Gudang
🕐 Riwayat Penjualan
```

**Use Case:**
- Pemilik toko
- Supervisor
- Admin gudang
- Manajer operasional

---

### 2. 💰 Kasir (Cashier)

**Deskripsi**: Operator kasir yang melayani transaksi penjualan langsung ke pelanggan.

**Akses Fitur:**
- ✅ Kasir/POS (Point of Sale)
- ❌ Dashboard (tidak ada akses)
- ❌ Jenis Barang (tidak ada akses)
- ❌ Restock Gudang (tidak ada akses)
- ✅ Riwayat Penjualan (lihat & filter transaksi)

**Menu Sidebar:**
```
🛒 Kasir / POS
🕐 Riwayat Penjualan
```

**Use Case:**
- Kasir toko
- Sales counter
- Front desk

---

## Perbandingan Akses

| Fitur | Manager | Kasir |
|-------|---------|-------|
| **Dashboard** | ✅ Full Access | ❌ No Access |
| **Jenis Barang** | ✅ CRUD | ❌ No Access |
| **Restock Gudang** | ✅ Create & View | ❌ No Access |
| **Kasir/POS** | ❌ No Access | ✅ Full Access |
| **Riwayat Penjualan** | ✅ View & Filter | ✅ View & Filter |
| **Ganti Tema** | ✅ Yes | ✅ Yes |
| **Logout** | ✅ Yes | ✅ Yes |

---

## Alur Kerja Berdasarkan Role

### Workflow Manager

```
Login → Dashboard → Cek Stok Rendah → Restock Barang
                  ↓
            Lihat Grafik Penjualan
                  ↓
            Analisis Barang Laris
                  ↓
            Cek Riwayat Penjualan
                  ↓
            Buat Keputusan Bisnis
```

### Workflow Kasir

```
Login → Kasir/POS → Pilih Barang → Tambah ke Keranjang
                                  ↓
                            Checkout
                                  ↓
                    Pilih Metode Pembayaran
                                  ↓
                        Proses Transaksi
                                  ↓
                        Cetak/Tampilkan Struk
                                  ↓
                        Transaksi Selesai
```

---

## Keamanan & Validasi

### Backend (API Level)

Backend memvalidasi role menggunakan middleware `CheckRole`:

```php
// routes/api.php — Middleware role sudah aktif
Route::middleware(['auth:sanctum', 'role:manager'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::apiResource('items', ItemController::class);
    Route::apiResource('restocks', RestockController::class)->only(['index', 'store']);
    Route::apiResource('users', UserController::class);
});

// Sales endpoints — bisa diakses oleh semua role yang login
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('sales', SaleController::class)->only(['index', 'store']);
    Route::get('/sales/summary', [SaleController::class, 'summary']);
    Route::get('/sales/transactions', [SaleController::class, 'transactions']);
});
```

### Frontend (UI Level)

```javascript
// App.jsx - Routing berdasarkan role
{user?.role === 'cashier' ? (
  // Cashier routes
  <>
    <Route path="/" element={<Sales />} />
    <Route path="/sales-history" element={<SalesHistory />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </>
) : (
  // Manager routes
  <>
    <Route path="/" element={<Dashboard />} />
    <Route path="/items" element={<Items />} />
    <Route path="/restock" element={<Restock />} />
    <Route path="/sales-history" element={<SalesHistory />} />
    <Route path="/accounts" element={<Accounts currentUser={user} />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </>
)}
```

---

## Manajemen User

### Membuat User Baru

#### Via Seeder (Otomatis)

```bash
php artisan db:seed
```

Membuat:
- Manager: `manager@inventoriku.com` / `manager123`
- Kasir: `kasir@inventoriku.com` / `kasir123`

#### Via Tinker (Manual)

```bash
php artisan tinker
```

**Buat Manager:**
```php
\App\Models\User::create([
    'name' => 'Budi Manager',
    'email' => 'budi@toko.com',
    'password' => bcrypt('password123'),
    'role' => 'manager',
    'theme' => 'blue',
]);
```

**Buat Kasir:**
```php
\App\Models\User::create([
    'name' => 'Siti Kasir',
    'email' => 'siti@toko.com',
    'password' => bcrypt('password123'),
    'role' => 'cashier',
    'theme' => 'green',
]);
```

### Mengubah Role User

```bash
php artisan tinker
```

```php
// Ubah kasir menjadi manager
$user = \App\Models\User::where('email', 'kasir@inventoriku.com')->first();
$user->update(['role' => 'manager']);

// Ubah manager menjadi kasir
$user = \App\Models\User::where('email', 'manager@inventoriku.com')->first();
$user->update(['role' => 'cashier']);

exit
```

### Melihat Daftar User

```bash
php artisan tinker
```

```php
// Semua user
\App\Models\User::all(['id', 'name', 'email', 'role']);

// Hanya manager
\App\Models\User::where('role', 'manager')->get(['name', 'email']);

// Hanya kasir
\App\Models\User::where('role', 'cashier')->get(['name', 'email']);

exit
```

---

## Skenario Penggunaan

### Skenario 1: Toko Kecil (1 Pemilik + 2 Kasir)

```
Pemilik (Manager)  → Kelola stok, lihat laporan, analisis
Kasir Shift Pagi   → Transaksi penjualan pagi
Kasir Shift Sore   → Transaksi penjualan sore
```

**Setup:**
```php
// Pemilik
User::create(['name' => 'Pak Budi', 'email' => 'budi@toko.com', 'role' => 'manager']);

// Kasir 1
User::create(['name' => 'Siti', 'email' => 'siti@toko.com', 'role' => 'cashier']);

// Kasir 2
User::create(['name' => 'Andi', 'email' => 'andi@toko.com', 'role' => 'cashier']);
```

---

### Skenario 2: Toko Menengah (1 Manager + 1 Admin Gudang + 3 Kasir)

```
Manager            → Strategi bisnis, laporan eksekutif
Admin Gudang       → Restock, kelola stok (role: manager)
Kasir 1, 2, 3      → Transaksi penjualan
```

**Setup:**
```php
User::create(['name' => 'Manager', 'email' => 'manager@toko.com', 'role' => 'manager']);
User::create(['name' => 'Admin Gudang', 'email' => 'gudang@toko.com', 'role' => 'manager']);
User::create(['name' => 'Kasir 1', 'email' => 'kasir1@toko.com', 'role' => 'cashier']);
User::create(['name' => 'Kasir 2', 'email' => 'kasir2@toko.com', 'role' => 'cashier']);
User::create(['name' => 'Kasir 3', 'email' => 'kasir3@toko.com', 'role' => 'cashier']);
```

---

### Skenario 3: Multi-Outlet (Belum Didukung)

Untuk multi-outlet, perlu tambahan field `outlet_id` di tabel users dan filter data berdasarkan outlet. Ini belum diimplementasikan di v2.0.

---

## Best Practices

### Untuk Administrator

1. **Jangan beri akses Manager ke semua orang**
   - Manager bisa lihat laporan keuangan
   - Manager bisa ubah harga barang
   - Manager bisa hapus data

2. **Gunakan email unik untuk setiap user**
   - Mudah tracking siapa yang login
   - Mudah reset password

3. **Ganti password default**
   - Jangan gunakan `manager123` atau `kasir123` di production
   - Gunakan password kuat minimal 8 karakter

4. **Audit log (Roadmap)**
   - Catat siapa yang login kapan
   - Catat siapa yang ubah data apa
   - Review log secara berkala

### Untuk Manager

1. **Jangan share akun Manager**
   - Setiap orang harus punya akun sendiri
   - Mudah tracking aktivitas

2. **Logout setelah selesai**
   - Jangan tinggalkan komputer dalam keadaan login
   - Terutama di komputer publik

3. **Review transaksi kasir**
   - Cek riwayat penjualan setiap hari
   - Bandingkan dengan uang fisik di kasir

### Untuk Kasir

1. **Jangan coba akses menu Manager**
   - Sistem sudah membatasi akses
   - Fokus pada tugas kasir saja

2. **Logout saat shift selesai**
   - Kasir berikutnya login dengan akun sendiri
   - Jelas siapa yang bertanggung jawab per transaksi

3. **Laporkan masalah ke Manager**
   - Jika ada barang tidak ada di sistem
   - Jika stok tidak sesuai

---

## Troubleshooting

### Kasir tidak bisa akses Dashboard

**Ini normal!** Kasir memang tidak punya akses ke Dashboard. Hanya bisa akses POS.

### Manager tidak bisa akses Kasir/POS

**Ini by design!** Manager fokus pada manajemen, bukan transaksi langsung. Jika Manager perlu akses POS, ubah role menjadi kasir sementara atau buat akun terpisah.

### User bisa akses URL langsung (bypass menu)

**Solusi:** Frontend sudah handle dengan `<Navigate to="/" replace />`. Jika user coba akses URL yang tidak sesuai role, akan di-redirect ke halaman utama mereka.

### Ingin role tambahan (Supervisor, Admin, dll)

**Solusi:** Edit migration dan tambahkan role baru:

```php
// Migration
$table->enum('role', ['manager', 'cashier', 'supervisor', 'admin'])->default('cashier');

// Kemudian update routing di App.jsx
```

---

## Roadmap Fitur Role

### v2.0 (Sekarang)
- ✅ 2 Role: Manager & Kasir
- ✅ Menu berbeda per role
- ✅ Routing protection

### v2.1 (Mendatang)
- 🔄 Middleware role di backend
- 🔄 Audit log aktivitas user
- 🔄 Permission granular (bukan hanya role)

### v3.0 (Future)
- 🔄 Role custom (bisa buat role sendiri)
- 🔄 Multi-outlet support
- 🔄 Approval workflow
- 🔄 User management UI (tidak perlu Tinker)

---

## FAQ

**Q: Bisakah satu user punya 2 role?**
A: Tidak. Satu user hanya bisa punya 1 role. Jika perlu akses keduanya, buat 2 akun terpisah.

**Q: Bisakah Manager juga jadi Kasir?**
A: Bisa, tapi harus ganti role atau buat akun terpisah. Tidak bisa simultan.

**Q: Bagaimana cara membatasi kasir hanya bisa lihat transaksi mereka sendiri?**
A: Belum ada fitur ini di v2.0. Semua kasir bisa proses transaksi tanpa filter per user.

**Q: Apakah ada role Owner atau Admin?**
A: Belum. Saat ini hanya Manager dan Kasir. Owner bisa gunakan role Manager.

**Q: Bisakah kasir lihat riwayat transaksi?**
A: Ya. Sejak v2.0, kasir bisa melihat Riwayat Penjualan (semua transaksi, tidak hanya milik sendiri).

---

## Kesimpulan

Role-Based Access Control di InventoriKu v2.0 memisahkan tanggung jawab antara Manager (manajemen & laporan) dan Kasir (transaksi penjualan). Ini meningkatkan keamanan, akuntabilitas, dan efisiensi operasional toko.

Untuk kebutuhan role yang lebih kompleks, sistem dapat dikembangkan lebih lanjut dengan permission granular dan audit log.

---

**Selamat menggunakan fitur Role-Based Access!** 👔💰
