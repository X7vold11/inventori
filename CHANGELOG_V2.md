# Changelog - InventoriKu v2.0

## 🎉 Version 2.0.0 - Major Update (May 2026)

### 🆕 Fitur Baru

#### 1. Role-Based Access Control (RBAC)
- **2 Role Baru**: Manager dan Kasir
- **Manager**: Akses penuh ke Dashboard, Jenis Barang, Restock, dan Riwayat Penjualan
- **Kasir**: Hanya akses ke halaman POS (Point of Sale)
- Menu sidebar dinamis berdasarkan role user
- Routing protection untuk mencegah akses tidak sah
- Seeder otomatis untuk membuat user Manager dan Kasir

#### 2. Pembayaran QRIS
- Metode pembayaran baru: **QRIS** (selain Tunai)
- Modal pembayaran dengan pilihan metode: Tunai atau QRIS
- Simulasi pembayaran QRIS dengan konfirmasi manual
- Struk digital menampilkan metode pembayaran yang digunakan
- Database menyimpan `payment_method` dan `cash_paid` untuk setiap transaksi
- Siap untuk integrasi payment gateway (Midtrans, Xendit, dll)

#### 3. Theme Switcher
- **6 Tema Warna**: Biru Klasik, Ungu Elegan, Hijau Segar, Oranye Hangat, Pink Modern, Gelap Premium
- Setiap user dapat memilih tema favorit mereka
- Tema tersimpan di database per user
- Tombol "Ganti Tema" di sidebar dengan ikon palet
- Tema diterapkan otomatis saat login
- Sidebar, tombol, dan komponen UI menyesuaikan dengan tema

---

### 🔧 Perubahan Backend

#### Database Migrations
1. **`2026_05_10_000000_add_role_and_theme_to_users_table.php`**
   - Tambah kolom `role` (enum: 'manager', 'cashier')
   - Tambah kolom `theme` (string: 'blue', 'purple', 'green', 'orange', 'pink', 'dark')

2. **`2026_05_10_000001_add_payment_method_to_sales_table.php`**
   - Tambah kolom `payment_method` (enum: 'cash', 'qris')
   - Tambah kolom `cash_paid` (decimal, nullable)

#### Models
- **User.php**: Tambah `role` dan `theme` ke fillable
- **Sale.php**: Tambah `payment_method` dan `cash_paid` ke fillable

#### Controllers
- **AuthController.php**:
  - Method `login()`: Return user dengan role dan theme
  - Method `updateTheme()`: Endpoint baru untuk update tema user
  
- **SaleController.php**:
  - Method `store()`: Support payment_method dan cash_paid
  - Return transaction_id dan payment_method setelah checkout

#### Routes
- **api.php**:
  - `POST /api/update-theme`: Update tema user
  - Semua route sudah siap untuk middleware role (commented)

#### Seeders
- **DatabaseSeeder.php**:
  - Buat user Manager: `manager@inventoriku.com` / `manager123`
  - Buat user Kasir: `kasir@inventoriku.com` / `kasir123`

---

### 🎨 Perubahan Frontend

#### New Files
- **`src/themes.js`**: Konfigurasi 6 tema warna dengan class Tailwind

#### Components
- **App.jsx**:
  - Import themes configuration
  - State management untuk theme
  - Sidebar component menerima props theme dan onThemeChange
  - Menu sidebar dinamis berdasarkan role (Manager vs Kasir)
  - Routing berbeda untuk Manager dan Kasir
  - Handler untuk ganti tema dengan SweetAlert2 modal
  - Tombol "Ganti Tema" di sidebar
  
- **Sales.jsx**:
  - State `paymentMethod` untuk pilih Tunai atau QRIS
  - Modal pembayaran dengan 2 pilihan metode
  - UI berbeda untuk Tunai (input uang + kembalian) vs QRIS (simulasi)
  - Struk menampilkan metode pembayaran dan ikon sesuai
  - Payload checkout include payment_method dan cash_paid

#### Styling
- Sidebar gradient menyesuaikan tema
- Tombol primary menyesuaikan tema
- Avatar user menyesuaikan tema
- Tombol "Ganti Tema" dengan warna tema aktif

---

### 📚 Dokumentasi Baru

1. **UPGRADE_GUIDE.md**: Panduan upgrade dari v1.0 ke v2.0
2. **README_SETUP.md**: Panduan instalasi dan setup lengkap
3. **MIGRATION_COMMANDS.md**: Perintah-perintah migrasi database
4. **THEME_GUIDE.md**: Panduan lengkap fitur tema warna
5. **QRIS_PAYMENT_GUIDE.md**: Panduan pembayaran QRIS
6. **ROLE_ACCESS_GUIDE.md**: Panduan Role-Based Access Control
7. **CHANGELOG_V2.md**: Changelog lengkap v2.0 (file ini)

---

### 🔄 Breaking Changes

#### Database Schema
- Tabel `users` sekarang **wajib** punya kolom `role` dan `theme`
- Tabel `sales` sekarang punya kolom `payment_method` dan `cash_paid`
- User lama perlu di-update dengan role dan theme default

#### API Response
- `POST /api/login` sekarang return user dengan field `role` dan `theme`
- `POST /api/sales` sekarang require `payment_method` dan optional `cash_paid`

#### Frontend Routing
- Manager tidak bisa akses `/sales` (POS)
- Kasir hanya bisa akses `/` (POS)
- Akses URL langsung akan di-redirect sesuai role

---

### 🐛 Bug Fixes

- Fix: Sidebar tidak responsive di layar kecil (masih ada di v1.0)
- Fix: Token expired tidak auto-redirect ke login (sudah diperbaiki)
- Fix: Struk tidak menampilkan metode pembayaran (fixed di v2.0)

---

### ⚡ Performance Improvements

- Optimasi theme switching tanpa reload halaman
- Lazy load komponen berdasarkan role
- Reduce bundle size dengan code splitting

---

### 🔐 Security Enhancements

- Role-based routing protection di frontend
- Siap untuk middleware role di backend
- Validasi payment_method di backend
- Enum constraint untuk role dan payment_method di database

---

### 📊 Statistics

- **Files Changed**: 15+
- **Lines Added**: 2000+
- **New Features**: 3 major features
- **New Endpoints**: 1 (`/api/update-theme`)
- **New Migrations**: 2
- **New Documentation**: 7 files

---

### 🚀 Upgrade Path

#### From v1.0 to v2.0

1. **Backup database**
   ```bash
   cp backend/database/database.sqlite backup/
   ```

2. **Pull latest code**
   ```bash
   git pull origin main
   ```

3. **Install dependencies**
   ```bash
   cd backend && composer install
   cd ../frontend && npm install
   ```

4. **Run migrations**
   ```bash
   cd backend
   php artisan migrate
   php artisan db:seed
   ```

5. **Update existing users** (optional)
   ```bash
   php artisan tinker
   ```
   ```php
   \App\Models\User::whereNull('role')->update(['role' => 'manager', 'theme' => 'blue']);
   ```

6. **Restart servers**
   ```bash
   # Backend
   php artisan serve
   
   # Frontend (new terminal)
   npm run dev
   ```

---

### 🎯 Roadmap v2.1

- [ ] Backend middleware untuk role validation
- [ ] Audit log untuk tracking aktivitas user
- [ ] User management UI (tidak perlu Tinker)
- [ ] Filter transaksi berdasarkan kasir
- [ ] Export laporan ke Excel/PDF
- [ ] Integrasi payment gateway real (Midtrans/Xendit)
- [ ] Multi-outlet support
- [ ] Permission granular (tidak hanya role)

---

### 🙏 Credits

- **Developer**: Tim InventoriKu
- **Framework**: Laravel 11 + React 18
- **UI Library**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Alerts**: SweetAlert2

---

### 📞 Support

Untuk pertanyaan atau masalah:
- Baca dokumentasi di folder root project
- Buka issue di repository
- Hubungi tim development

---

### 📝 License

Proprietary - © 2026 InventoriKu

---

## Version History

### v2.0.0 (May 2026)
- ✨ Role-Based Access Control
- ✨ QRIS Payment Method
- ✨ Theme Switcher
- 📚 7 dokumentasi baru

### v1.0.0 (April 2026)
- 🎉 Initial release
- ✅ Dashboard dengan grafik
- ✅ Manajemen Jenis Barang
- ✅ Restock Gudang
- ✅ Kasir/POS (Tunai only)
- ✅ Riwayat Penjualan
- ✅ Moving Average Cost
- ✅ Soft Delete

---

**Thank you for using InventoriKu!** 🎉
