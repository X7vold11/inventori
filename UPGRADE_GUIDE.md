# Panduan Upgrade InventoriKu v2.0

## Fitur Baru

### 1. Role-Based Access Control
- **Manager**: Akses penuh ke Dashboard, Jenis Barang, Restock, dan Riwayat Penjualan
- **Kasir**: Hanya akses ke halaman POS (Point of Sale)

### 2. Pembayaran QRIS
- Kasir sekarang bisa memilih metode pembayaran: Tunai atau QRIS
- Struk otomatis menampilkan metode pembayaran yang digunakan

### 3. Theme Switcher
- 6 pilihan tema warna: Biru Klasik, Ungu Elegan, Hijau Segar, Oranye Hangat, Pink Modern, Gelap Premium
- Setiap user bisa memilih tema favorit mereka
- Tema tersimpan dan diterapkan otomatis saat login

---

## Langkah Upgrade dari v1.0 ke v2.0

### Backend

1. **Jalankan migrasi database baru:**
   ```bash
   cd backend
   php artisan migrate
   ```

2. **Seed user baru (Manager dan Kasir):**
   ```bash
   php artisan db:seed
   ```

   Ini akan membuat 2 akun:
   - **Manager**: `manager@inventoriku.com` / `manager123`
   - **Kasir**: `kasir@inventoriku.com` / `kasir123`

3. **Update user lama (opsional):**
   Jika Anda memiliki user lama yang ingin dipertahankan, update role mereka:
   ```bash
   php artisan tinker
   ```
   ```php
   $user = \App\Models\User::where('email', 'admin@inventoriku.com')->first();
   $user->update(['role' => 'manager', 'theme' => 'blue']);
   ```

### Frontend

1. **Install dependencies baru (jika ada):**
   ```bash
   cd frontend
   npm install
   ```

2. **Restart development server:**
   ```bash
   npm run dev
   ```

---

## Perubahan Database

### Tabel `users`
- **Kolom baru**: `role` (enum: 'manager', 'cashier')
- **Kolom baru**: `theme` (string: 'blue', 'purple', 'green', 'orange', 'pink', 'dark')

### Tabel `sales`
- **Kolom baru**: `payment_method` (enum: 'cash', 'qris')
- **Kolom baru**: `cash_paid` (decimal, nullable)

---

## API Endpoints Baru

### POST `/api/update-theme`
Update tema user yang sedang login.

**Request:**
```json
{
  "theme": "purple"
}
```

**Response:**
```json
{
  "message": "Tema berhasil diperbarui.",
  "theme": "purple"
}
```

---

## Cara Menggunakan Fitur Baru

### 1. Login sebagai Manager atau Kasir

**Manager:**
- Email: `manager@inventoriku.com`
- Password: `manager123`
- Akses: Dashboard, Jenis Barang, Restock, Riwayat Penjualan

**Kasir:**
- Email: `kasir@inventoriku.com`
- Password: `kasir123`
- Akses: Hanya halaman Kasir/POS

### 2. Ganti Tema

1. Login ke aplikasi
2. Lihat sidebar kiri bawah
3. Klik tombol **"Ganti Tema"** (ikon palet)
4. Pilih tema favorit Anda
5. Klik **"Terapkan"**

### 3. Pembayaran QRIS (Kasir)

1. Tambahkan barang ke keranjang
2. Klik **"Checkout"**
3. Pilih metode pembayaran **"QRIS"**
4. Klik **"Konfirmasi Pembayaran QRIS"**
5. Struk akan menampilkan status "Terbayar" untuk QRIS

---

## Troubleshooting

### Error: "Column not found: role"
Anda belum menjalankan migrasi. Jalankan:
```bash
php artisan migrate
```

### Tidak bisa login dengan akun lama
Update role user lama Anda:
```bash
php artisan tinker
```
```php
\App\Models\User::where('email', 'YOUR_EMAIL')->update(['role' => 'manager', 'theme' => 'blue']);
```

### Tema tidak berubah
1. Logout dan login kembali
2. Clear cache browser (Ctrl+Shift+Delete)
3. Pastikan backend sudah di-restart

---

## Rollback (jika diperlukan)

Jika Anda ingin kembali ke v1.0:

```bash
cd backend
php artisan migrate:rollback --step=2
```

**Peringatan:** Ini akan menghapus kolom `role`, `theme`, `payment_method`, dan `cash_paid`. Data pembayaran QRIS akan hilang.

---

## Kontak

Jika ada pertanyaan atau masalah, hubungi tim development atau buka issue di repository.
