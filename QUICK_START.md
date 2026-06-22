# 🚀 Quick Start - InventoriKu v2.0

## Instalasi Cepat (5 Menit)

### 1️⃣ Setup Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
```

✅ Backend running di `http://localhost:8000`

---

### 2️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend running di `http://localhost:5173`

---

### 3️⃣ Login & Test

Buka browser: `http://localhost:5173`

**Login sebagai Manager:**
- Email: `manager@inventoriku.com`
- Password: `manager123`

**Login sebagai Kasir:**
- Email: `kasir@inventoriku.com`
- Password: `kasir123`

---

## ✨ Fitur Baru v2.0

### 1. Role-Based Access
- **Manager**: Dashboard, Jenis Barang, Restock, Riwayat
- **Kasir**: Hanya POS

### 2. Pembayaran QRIS
- Pilih metode: Tunai atau QRIS
- Struk otomatis sesuai metode

### 3. Theme Switcher
- 6 tema warna tersedia
- Klik "Ganti Tema" di sidebar

---

## 📖 Dokumentasi Lengkap

| File | Deskripsi |
|------|-----------|
| `README_SETUP.md` | Panduan instalasi lengkap |
| `UPGRADE_GUIDE.md` | Cara upgrade dari v1.0 |
| `MIGRATION_COMMANDS.md` | Perintah migrasi database |
| `ROLE_ACCESS_GUIDE.md` | Panduan role Manager & Kasir |
| `QRIS_PAYMENT_GUIDE.md` | Panduan pembayaran QRIS |
| `THEME_GUIDE.md` | Panduan ganti tema |
| `CHANGELOG_V2.md` | Semua perubahan v2.0 |
| `MANUAL_BOOK_INVENTORIKU.md` | Manual book lengkap |

---

## 🔧 Troubleshooting Cepat

### Backend tidak jalan
```bash
cd backend
php artisan config:clear
php artisan cache:clear
php artisan serve
```

### Frontend tidak jalan
```bash
cd frontend
rm -rf node_modules
npm install
npm run dev
```

### Database error
```bash
cd backend
php artisan migrate:fresh --seed
```

### User tidak bisa login
```bash
cd backend
php artisan tinker
```
```php
$user = \App\Models\User::where('email', 'EMAIL')->first();
$user->update(['password' => bcrypt('password_baru')]);
exit
```

---

## 🎯 Testing Checklist

- [ ] Login sebagai Manager berhasil
- [ ] Manager bisa akses Dashboard
- [ ] Manager bisa tambah barang
- [ ] Manager bisa restock
- [ ] Manager bisa lihat riwayat
- [ ] Login sebagai Kasir berhasil
- [ ] Kasir hanya lihat POS
- [ ] Kasir bisa transaksi Tunai
- [ ] Kasir bisa transaksi QRIS
- [ ] Ganti tema berhasil
- [ ] Logout berhasil

---

## 📞 Butuh Bantuan?

1. Baca dokumentasi di folder root
2. Cek `TROUBLESHOOTING` di manual book
3. Hubungi tim development

---

**Selamat menggunakan InventoriKu v2.0!** 🎉
