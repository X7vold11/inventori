# InventoriKu v2.0 - Setup Guide

Sistem Manajemen Gudang & Penjualan untuk UMKM dengan Role-Based Access, QRIS Payment, dan Theme Switcher.

---

## Fitur Utama

✅ **Role-Based Access Control**
- Manager: Dashboard, Jenis Barang, Restock, Riwayat Penjualan
- Kasir: Point of Sale (POS) only

✅ **Pembayaran Multi-Method**
- Tunai (Cash) dengan kalkulasi kembalian otomatis
- QRIS (simulasi pembayaran digital)

✅ **Theme Switcher**
- 6 tema warna: Biru, Ungu, Hijau, Oranye, Pink, Gelap
- Preferensi tema tersimpan per user

✅ **Fitur Lainnya**
- Dashboard real-time dengan grafik
- Manajemen stok dengan moving average cost
- Riwayat penjualan lengkap dengan filter
- Struk digital otomatis

---

## Prasyarat Sistem

- **PHP** 8.2+
- **Composer** 2.x
- **Node.js** 18.x+
- **NPM** 9.x+
- **Database**: SQLite (default) atau MySQL

---

## Instalasi

### 1. Clone Repository

```bash
git clone <repository-url>
cd inventoriku
```

### 2. Setup Backend (Laravel)

```bash
cd backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate

# Seed database (membuat user Manager dan Kasir)
php artisan db:seed

# Start backend server
php artisan serve
```

Backend akan berjalan di `http://localhost:8000`

### 3. Setup Frontend (React)

Buka terminal baru:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

### 4. Akses Aplikasi

Buka browser dan akses: `http://localhost:5173`

---

## Akun Default

Setelah seeding, Anda bisa login dengan:

### Manager
- **Email**: `manager@inventoriku.com`
- **Password**: `manager123`
- **Akses**: Dashboard, Jenis Barang, Restock, Riwayat Penjualan

### Kasir
- **Email**: `kasir@inventoriku.com`
- **Password**: `kasir123`
- **Akses**: Kasir/POS only

---

## Struktur Project

```
inventoriku/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/
│   │   └── Models/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/
│       └── api.php
├── frontend/                # React SPA
│   ├── src/
│   │   ├── components/
│   │   ├── api.js
│   │   ├── themes.js
│   │   └── App.jsx
│   └── package.json
├── MANUAL_BOOK_INVENTORIKU.md
├── UPGRADE_GUIDE.md
└── README_SETUP.md
```

---

## Konfigurasi Database

### SQLite (Default)

Tidak perlu konfigurasi tambahan. File database akan dibuat otomatis di `backend/database/database.sqlite`.

### MySQL

Edit `backend/.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=inventoriku_db
DB_USERNAME=root
DB_PASSWORD=your_password
```

Kemudian jalankan:

```bash
php artisan migrate
php artisan db:seed
```

---

## Development

### Backend

```bash
cd backend

# Run migrations
php artisan migrate

# Rollback migrations
php artisan migrate:rollback

# Fresh migration + seed
php artisan migrate:fresh --seed

# Clear cache
php artisan cache:clear
php artisan config:clear

# Laravel Tinker (console)
php artisan tinker
```

### Frontend

```bash
cd frontend

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Production Build

### Backend

```bash
cd backend

# Install production dependencies
composer install --no-dev --optimize-autoloader

# Optimize Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Frontend

```bash
cd frontend

# Build production assets
npm run build

# Output akan ada di folder dist/
```

Deploy folder `backend/` ke server PHP dan folder `frontend/dist/` ke web server (Apache/Nginx).

---

## API Endpoints

### Authentication
- `POST /api/login` - Login user
- `GET /api/me` - Get current user
- `POST /api/logout` - Logout
- `POST /api/update-theme` - Update user theme

### Manager Only
- `GET /api/dashboard` - Dashboard statistics
- `GET /api/items` - List items
- `POST /api/items` - Create item
- `PUT /api/items/{id}` - Update item
- `DELETE /api/items/{id}` - Delete item
- `GET /api/restocks` - List restocks
- `POST /api/restocks` - Create restock

### Both Roles
- `GET /api/sales` - List sales
- `POST /api/sales` - Create sale (Cashier)
- `GET /api/sales/transactions` - List transactions
- `GET /api/sales/summary` - Sales summary

---

## Troubleshooting

### Port sudah digunakan

**Backend (8000):**
```bash
php artisan serve --port=8001
```

**Frontend (5173):**
Edit `frontend/vite.config.js`:
```js
export default defineConfig({
  server: {
    port: 3000
  }
})
```

### CORS Error

Pastikan `backend/.env` memiliki:
```env
SANCTUM_STATEFUL_DOMAINS=localhost:5173
```

### Database Error

```bash
cd backend
php artisan migrate:fresh --seed
```

### Frontend tidak bisa connect ke backend

Periksa `frontend/src/api.js`, pastikan `baseURL` sesuai:
```js
const api = axios.create({
  baseURL: '/api',  // atau 'http://localhost:8000/api'
});
```

---

## Testing

### Manual Testing

1. Login sebagai Manager
2. Tambah beberapa jenis barang
3. Lakukan restock
4. Login sebagai Kasir
5. Lakukan transaksi penjualan (Tunai dan QRIS)
6. Login kembali sebagai Manager
7. Cek Dashboard dan Riwayat Penjualan
8. Ganti tema warna

---

## Lisensi

Proprietary - © 2026 InventoriKu

---

## Kontak & Support

Untuk bantuan teknis atau pertanyaan, hubungi tim development.

**Manual Book Lengkap**: Lihat `MANUAL_BOOK_INVENTORIKU.md`

**Upgrade Guide**: Lihat `UPGRADE_GUIDE.md`
