# 📦 InventoriKu v2.0

> Sistem Manajemen Gudang & Penjualan untuk UMKM dengan Role-Based Access, QRIS Payment, dan Theme Switcher

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](CHANGELOG_V2.md)
[![Laravel](https://img.shields.io/badge/Laravel-11-red.svg)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev)
[![License](https://img.shields.io/badge/license-Proprietary-green.svg)](LICENSE)

---

## ✨ Fitur Utama

### 🆕 Baru di v2.0

- **👔 Role-Based Access Control**
  - Manager: Dashboard, Jenis Barang, Restock, Riwayat Penjualan
  - Kasir: Point of Sale (POS) only
  
- **💳 Pembayaran QRIS**
  - Metode pembayaran: Tunai & QRIS
  - Struk otomatis sesuai metode
  - Siap integrasi payment gateway
  
- **🎨 Theme Switcher**
  - 6 tema warna: Biru, Ungu, Hijau, Oranye, Pink, Gelap
  - Preferensi tersimpan per user
  - Ganti tema tanpa reload

### 📊 Fitur Core

- ✅ Dashboard real-time dengan grafik
- ✅ Manajemen stok dengan moving average cost
- ✅ Restock dari supplier
- ✅ Point of Sale (POS) untuk kasir
- ✅ Riwayat penjualan lengkap
- ✅ Filter & pencarian
- ✅ Struk digital otomatis

---

## 🚀 Quick Start

### Instalasi 5 Menit

```bash
# 1. Clone repository
git clone <repository-url>
cd inventoriku

# 2. Setup Backend
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve

# 3. Setup Frontend (terminal baru)
cd frontend
npm install
npm run dev
```

### Login

Buka browser: `http://localhost:5173`

**Manager:**
- Email: `manager@inventoriku.com`
- Password: `manager123`

**Kasir:**
- Email: `kasir@inventoriku.com`
- Password: `kasir123`

---

## 📚 Dokumentasi

| Dokumen | Deskripsi |
|---------|-----------|
| **[📋 DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)** | **Indeks semua dokumentasi** |
| [🚀 QUICK_START.md](QUICK_START.md) | Instalasi cepat & testing |
| [📖 README_SETUP.md](README_SETUP.md) | Setup lengkap & konfigurasi |
| [📚 MANUAL_BOOK_INVENTORIKU.md](MANUAL_BOOK_INVENTORIKU.md) | Manual book 60+ halaman |
| [🔄 UPGRADE_GUIDE.md](UPGRADE_GUIDE.md) | Upgrade dari v1.0 ke v2.0 |
| [👔 ROLE_ACCESS_GUIDE.md](ROLE_ACCESS_GUIDE.md) | Panduan Manager & Kasir |
| [💳 QRIS_PAYMENT_GUIDE.md](QRIS_PAYMENT_GUIDE.md) | Panduan pembayaran QRIS |
| [🎨 THEME_GUIDE.md](THEME_GUIDE.md) | Panduan tema warna |
| [📝 CHANGELOG_V2.md](CHANGELOG_V2.md) | Semua perubahan v2.0 |

**👉 Mulai dari [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) untuk navigasi lengkap!**

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Laravel 11
- **Database**: SQLite (default) / MySQL
- **Auth**: Laravel Sanctum (Token-based)
- **API**: RESTful API

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Alerts**: SweetAlert2
- **HTTP Client**: Axios

---

## 📁 Struktur Project

```
inventoriku/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/
│   │   └── Models/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/api.php
│
├── frontend/                # React SPA
│   ├── src/
│   │   ├── components/
│   │   ├── api.js
│   │   ├── themes.js
│   │   └── App.jsx
│   └── package.json
│
└── docs/                    # Dokumentasi
    ├── QUICK_START.md
    ├── MANUAL_BOOK_INVENTORIKU.md
    └── ...
```

---

## 🎯 Use Cases

### Toko Retail
- Kelola stok barang
- Catat penjualan harian
- Lihat laporan keuntungan

### Warung/Minimarket
- Kasir cepat dengan POS
- Restock dari supplier
- Monitor barang laris

### Toko Online + Offline
- Sinkronisasi stok
- Multi metode pembayaran
- Laporan terpusat

---

## 🔐 Keamanan

- ✅ Token-based authentication (Sanctum)
- ✅ Role-based access control
- ✅ Password hashing (bcrypt)
- ✅ CSRF protection
- ✅ SQL injection prevention (Eloquent ORM)
- ✅ XSS protection

---

## 📊 Screenshots

### Dashboard Manager
![Dashboard](docs/screenshots/dashboard.png)

### POS Kasir
![POS](docs/screenshots/pos.png)

### Theme Switcher
![Themes](docs/screenshots/themes.png)

*(Screenshots coming soon)*

---

## 🚦 Status Project

- ✅ **v1.0** - Initial Release (April 2026)
- ✅ **v2.0** - Role, QRIS, Themes (May 2026)
- 🔄 **v2.1** - Audit Log, User Management UI (Planned)
- 🔄 **v3.0** - Multi-outlet, Real QRIS Integration (Future)

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Proprietary - © 2026 InventoriKu. All rights reserved.

---

## 👥 Team

- **Developer**: Tim InventoriKu
- **Designer**: UI/UX Team
- **Documentation**: Tech Writers

---

## 📞 Support

- 📧 Email: support@inventoriku.com
- 📱 WhatsApp: +62 xxx xxxx xxxx
- 🌐 Website: https://inventoriku.com
- 📖 Docs: [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)

---

## 🙏 Acknowledgments

- [Laravel](https://laravel.com) - The PHP Framework
- [React](https://react.dev) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework
- [Lucide](https://lucide.dev) - Beautiful & consistent icons
- [Recharts](https://recharts.org) - A composable charting library

---

## ⭐ Star History

If you find this project useful, please consider giving it a star!

[![Star History Chart](https://api.star-history.com/svg?repos=inventoriku/inventoriku&type=Date)](https://star-history.com/#inventoriku/inventoriku&Date)

---

<div align="center">

**Made with ❤️ by InventoriKu Team**

[Documentation](DOCUMENTATION_INDEX.md) • [Quick Start](QUICK_START.md) • [Changelog](CHANGELOG_V2.md)

</div>
