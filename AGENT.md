# AGENT.md — Panduan untuk Semua Model AI

**Proyek:** InventoriKu v2.0 — Sistem Manajemen Gudang & Penjualan UMKM
**Ditetapkan:** 22 Juni 2026

Dokumen ini adalah satu-satunya sumber kebenaran bagi AI yang mengerjakan proyek ini. Setiap perubahan, analisis, dan keputusan harus mematuhi aturan berikut.

---

## 1. PRINSIP DASAR (dari AGENT.py)

| Prinsip | Deskripsi | Implementasi di Projek |
|---------|-----------|----------------------|
| **Input Validation** | Blokir PII/credentials sebelum diproses | Laravel Request validation, sanctum auth |
| **Tool/Endpoint Whitelisting** | Hanya endpoint terdaftar yang boleh diakses | Route api.php explicit, tidak ada wildcard |
| **Audit Trail** | Setiap operasi tercatat (siapa, apa, kapan) | Token auth, user teridentifikasi di setiap request |
| **Error Handling** | Retry mechanism, jangan expose stack trace | DB transactions + try-catch di controllers |
| **Output Sanitization** | Jangan expose password/token di response | Sanctum token dikirim hanya saat login |
| **Honest Simplicity** | Sederhana, jujur, deterministik > kompleks palsu | Fitur yang tidak reliable dihapus (v2.0) |

Filosofi utama: *"Simple and honest beats sophisticated and broken"*

---

## 2. WORKFLOW PENGEMBANGAN (CI/CD)

Setiap perubahan WAJIB mengikuti alur ini:

```
Edit Code di Local → Test di Localhost → Lolos? → Commit & Push ke GitHub
       ↑                                      ↓
       └── Gagal ← Analisa Log Error ← Gagal ← GitHub Actions Auto Test
                                                    ↓
                                                 Lolos → Bisa Merge/Deploy
```

### Aturan Detail:

1. **Sebelum coding**: Baca file terkait dan pahami konteksnya
2. **Setelah edit**: Jalankan test lokal
   - Backend: `cd backend && php artisan test`
   - Frontend: `cd frontend && npm run lint`
3. **Jika test lokal lolos**: Commit dan push
   ```
   git add <file>
   git commit -m "deskripsi perubahan singkat"
   git push
   ```
4. **GitHub Actions** akan auto-test. Cek hasilnya di tab Actions.
5. **Jika test gagal di GitHub**:
   - Analisa log error dari Actions
   - Perbaiki code di local
   - Test ulang → commit → push → ulangi sampai lolos

---

## 3. ARSITEKTUR APLIKASI

### 3.1 Tech Stack

| Layer | Teknologi |
|-------|-----------|
| **Backend** | Laravel 11 + PHP 8.x |
| **Frontend** | React 19 + Vite 8 + Tailwind CSS 4 |
| **Database** | SQLite (default) / MySQL |
| **Auth** | Laravel Sanctum (token-based) |
| **State** | React Context + localStorage |
| **HTTP Client** | Axios |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Modals** | SweetAlert2 |

### 3.2 Database Schema

| Tabel | Kolom |
|-------|-------|
| `users` | id, name, email, password, role (manager\|cashier), theme, timestamps |
| `items` | id, name, selling_price, description, timestamps, deleted_at |
| `inventories` | id, item_id (FK→items), stock, average_purchase_price, timestamps |
| `sales` | id, item_id (FK→items), quantity, selling_price, purchase_price, sale_date, transaction_id (UUID), payment_method (cash\|qris), cash_paid, timestamps |
| `restocks` | id, item_id (FK→items), quantity, purchase_price, restock_date, timestamps |

### 3.3 Role Access Matrix

| Fitur | Manager | Kasir |
|-------|---------|-------|
| Dashboard (statistik & grafik) | ✅ | ❌ |
| Jenis Barang (CRUD) | ✅ | ❌ |
| Restock Gudang | ✅ | ❌ |
| Kasir / POS | ❌ | ✅ |
| Riwayat Penjualan | ✅ | ✅ |
| Ganti Tema | ✅ | ✅ |
| Daftar Akun (CRUD) | ✅ | ❌ |

### 3.4 API Endpoints

| Method | Endpoint | Controller | Akses |
|--------|----------|-----------|-------|
| POST | `/api/login` | AuthController@login | Public |
| POST | `/api/register` | AuthController@register | Public |
| GET | `/api/me` | AuthController@me | Any auth |
| POST | `/api/logout` | AuthController@logout | Any auth |
| POST | `/api/update-theme` | AuthController@updateTheme | Any auth |
| GET | `/api/users` | UserController@index | Manager* |
| POST | `/api/users` | UserController@store | Manager* |
| PUT | `/api/users/{id}` | UserController@update | Manager* |
| DELETE | `/api/users/{id}` | UserController@destroy | Manager* |
| GET | `/api/dashboard` | DashboardController@index | Manager** |
| GET | `/api/items` | ItemController@index | Manager** |
| POST | `/api/items` | ItemController@store | Manager** |
| GET | `/api/items/{id}` | ItemController@show | Manager** |
| PUT | `/api/items/{id}` | ItemController@update | Manager** |
| DELETE | `/api/items/{id}` | ItemController@destroy | Manager** |
| GET | `/api/restocks` | RestockController@index | Manager** |
| POST | `/api/restocks` | RestockController@store | Manager** |
| GET | `/api/sales` | SaleController@index | Any auth |
| POST | `/api/sales` | SaleController@store | Any auth |
| GET | `/api/sales/summary` | SaleController@summary | Any auth |
| GET | `/api/sales/transactions` | SaleController@transactions | Any auth |

*\* = Inline role check di controller*
*\*\* = TIDAK ADA role check — HARUS DIPERBAIKI*

---

## 4. ANALISIS KESELARASAN (ALIGNMENT CHECK)

### 4.1 ✅ Sudah Selaras

| Komponen | Status | Keterangan |
|----------|--------|------------|
| DB Schema ↔ Models | ✅ | Semua migration sesuai Eloquent models |
| Frontend Routes ↔ API | ✅ | Items, Dashboard, Restock, Sales, Accounts semua punya endpoint |
| Auth Flow ↔ Frontend | ✅ | Token di localStorage, verify via `/me`, Axios interceptor untuk 401 |
| Theme System (front↔back↔DB) | ✅ | Tema per-user tersimpan di DB, endpoint update, persist di localStorage |
| Sale Transaction Logic | ✅ | Debit inventory + insert sale dalam 1 DB transaction |
| Restock Moving Average | ✅ | Update stock + hitung ulang average_purchase_price dalam 1 transaction |
| Item + Inventory Init | ✅ | Create item + inventory (stock=0) dalam 1 transaction |
| Soft Delete Items | ✅ | Model pakai `SoftDeletes`, migration sudah ada |
| QRIS Payment | ✅ | `payment_method` + `cash_paid` di DB, UI checkout dengan opsi Tunai/QRIS |
| Multi Theme (6 tema) | ✅ | Frontend CSS variables, Recharts, sidebar, button semua terintegrasi |

### 4.2 ❌ Belum Selaras (Wajib Diperbaiki)

| No | Issue | Detail | Severity | Rekomendasi |
|----|-------|--------|----------|-------------|
| 1 | **DashboardController tanpa role check** | Cashier bisa akses `/api/dashboard` langsung via API meskipun frontend menyembunyikannya | **HIGH** 🔴 | Tambah `if ($request->user()->role !== 'manager')` seperti di UserController |
| 2 | **ItemController tanpa role check** | Cashier bisa akses CRUD `/api/items` langsung via API | **HIGH** 🔴 | Tambah role check di semua method (index, store, update, destroy) |
| 3 | **RestockController tanpa role check** | Cashier bisa akses `/api/restocks` langsung via API | **HIGH** 🔴 | Tambah role check di index() dan store() |
| 4 | **ROLE_ACCESS_GUIDE.md outdated** | Dokumen baris 47 & 396 menyatakan "Kasir ❌ Riwayat Penjualan" tapi kode sudah mengizinkan sejak v2.0 | **MEDIUM** 🟡 | Update matriks akses: Kasir ✅ Riwayat Penjualan |
| 5 | **UserController role check inline** | Bekerja tapi tidak konsisten — controller lain tidak memilikinya | **MEDIUM** 🟡 | Buat middleware `CheckRole` terpusat agar semua controller konsisten |

### 4.3 Rekomendasi: Middleware CheckRole

Buat middleware terpusat agar role check konsisten di semua controller:

```php
// app/Http/Middleware/CheckRole.php
class CheckRole
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if ($request->user()->role !== $role) {
            return response()->json(['message' => 'Akses ditolak.'], 403);
        }
        return $next($request);
    }
}
```

```php
// routes/api.php — setelah middleware terdaftar
Route::middleware(['auth:sanctum', 'role:manager'])->group(function () {
    Route::apiResource('items', ItemController::class);
    Route::apiResource('users', UserController::class);
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::apiResource('restocks', RestockController::class)->only(['index', 'store']);
});
```

---

## 5. CODING CONVENTIONS

### Backend (Laravel)
- DB transactions untuk operasi multi-tabel (Item+Inventory, Sale+Inventory, Restock+Inventory)
- SoftDeletes untuk items (jangan hapus permanen)
- Role check di **backend**, bukan hanya di frontend
- Return JSON response dengan status code yang sesuai (200, 201, 400, 403, 500)
- Validasi input pakai `$request->validate()` sebelum diproses

### Frontend (React)
- Functional components + hooks (useState, useEffect, useCallback)
- State via localStorage + Context (bukan Redux)
- API via Axios instance (`api.js`) — handle token otomatis
- Routing via react-router-dom v7
- Styling Tailwind + CSS variables (theme dari `themes.js`)

### Database
- Migration harus reversible (up() dan down())
- Foreign key constraints
- DB transactions untuk data consistency

### Git
- Commit message Bahasa Indonesia atau English
- Satu commit = satu perubahan logis
- Jangan commit `node_modules/`, `vendor/`, `.env`
- Jangan commit credentials atau secrets

---

## 6. DOKUMENTASI YANG WAJIB SINKRON

| File | Isi | Status |
|------|-----|--------|
| `README.md` | Gambaran umum, quick start, akun default | ✅ OK |
| `AGENT.md` | Rules untuk AI (file ini) | ✅ OK |
| `RINGKASAN_LENGKAP_SEMUA_FITUR.md` | Daftar fitur lengkap v2.0 | ✅ OK |
| `ROLE_ACCESS_GUIDE.md` | Panduan RBAC | 🟡 Perlu update (Kasir ✅ Riwayat) |
| `MANUAL_BOOK_INVENTORIKU.md` | Manual book lengkap | ✅ OK |
| `CHANGELOG_V2.md` | Catatan perubahan versi | ✅ OK |

Jika ada perubahan fitur, UPDATE dokumentasi yang relevan di commit yang SAMA.

---

## 7. TESTING

- Backend: `cd backend && php artisan test`
- Frontend: `cd frontend && npm run lint`
- Sebelum commit: Pastikan test lokal lolos
- Setelah push: Cek GitHub Actions
- Jika test gagal: Analisa → Perbaiki → Test ulang → Commit → Push

---

*Ditetapkan: 22 Juni 2026*
*Wajib dipatuhi oleh semua model AI yang bekerja pada proyek InventoriKu.*
