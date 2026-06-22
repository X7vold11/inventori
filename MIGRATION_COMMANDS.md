# Perintah Migrasi Database - InventoriKu v2.0

## Langkah-langkah Migrasi

### 1. Backup Database Lama (PENTING!)

Sebelum migrasi, backup database Anda:

**SQLite:**
```bash
cp backend/database/database.sqlite backend/database/database_backup_$(date +%Y%m%d).sqlite
```

**MySQL:**
```bash
mysqldump -u username -p database_name > backup_$(date +%Y%m%d).sql
```

---

### 2. Jalankan Migrasi

```bash
cd backend
php artisan migrate
```

Output yang diharapkan:
```
Running migrations.
2026_05_10_000000_add_role_and_theme_to_users_table ............. DONE
2026_05_10_000001_add_payment_method_to_sales_table ............. DONE
```

---

### 3. Seed User Baru

```bash
php artisan db:seed
```

Output yang diharapkan:
```
Database seeding completed successfully.
```

Ini akan membuat/update 2 user:
- Manager: `manager@inventoriku.com` / `manager123`
- Kasir: `kasir@inventoriku.com` / `kasir123`

---

### 4. Verifikasi Migrasi

Cek struktur tabel users:

```bash
php artisan tinker
```

```php
// Cek kolom baru di tabel users
\Illuminate\Support\Facades\Schema::getColumnListing('users');

// Cek user yang ada
\App\Models\User::all(['id', 'name', 'email', 'role', 'theme']);

// Keluar
exit
```

---

## Migrasi Fresh (Reset Database)

⚠️ **PERINGATAN**: Ini akan menghapus SEMUA data!

```bash
php artisan migrate:fresh --seed
```

Gunakan ini hanya untuk:
- Development/testing
- Instalasi baru
- Reset total database

---

## Rollback Migrasi

Jika ada masalah, rollback ke versi sebelumnya:

```bash
# Rollback 2 migrasi terakhir
php artisan migrate:rollback --step=2
```

---

## Update User Lama

Jika Anda memiliki user lama yang ingin dipertahankan:

```bash
php artisan tinker
```

```php
// Update user lama menjadi manager
$user = \App\Models\User::where('email', 'admin@inventoriku.com')->first();
if ($user) {
    $user->update([
        'role' => 'manager',
        'theme' => 'blue'
    ]);
    echo "User updated successfully!\n";
}

// Atau update semua user lama
\App\Models\User::whereNull('role')->update([
    'role' => 'manager',
    'theme' => 'blue'
]);

exit
```

---

## Membuat User Baru Manual

```bash
php artisan tinker
```

```php
// Buat user Manager baru
\App\Models\User::create([
    'name' => 'Nama Manager',
    'email' => 'manager2@toko.com',
    'password' => bcrypt('password123'),
    'role' => 'manager',
    'theme' => 'purple',
]);

// Buat user Kasir baru
\App\Models\User::create([
    'name' => 'Nama Kasir',
    'email' => 'kasir2@toko.com',
    'password' => bcrypt('password123'),
    'role' => 'cashier',
    'theme' => 'green',
]);

exit
```

---

## Troubleshooting

### Error: "SQLSTATE[42S21]: Column already exists"

Kolom sudah ada. Skip migrasi atau rollback dulu:
```bash
php artisan migrate:rollback --step=2
php artisan migrate
```

### Error: "Class 'Database\Seeders\Hash' not found"

Pastikan import di DatabaseSeeder.php:
```php
use Illuminate\Support\Facades\Hash;
```

### Error: "Base table or view not found: users"

Jalankan semua migrasi dari awal:
```bash
php artisan migrate
```

### User tidak bisa login setelah migrasi

Reset password user:
```bash
php artisan tinker
```
```php
$user = \App\Models\User::where('email', 'EMAIL_USER')->first();
$user->update(['password' => bcrypt('password_baru')]);
exit
```

---

## Cek Status Migrasi

```bash
# Lihat migrasi yang sudah dijalankan
php artisan migrate:status

# Output:
# Migration name ................................................ Batch / Status
# 0001_01_01_000000_create_users_table .......................... [1] Ran
# 0001_01_01_000001_create_cache_table .......................... [1] Ran
# 2026_04_08_000000_create_umkm_tables .......................... [1] Ran
# 2026_05_10_000000_add_role_and_theme_to_users_table .......... [2] Ran
# 2026_05_10_000001_add_payment_method_to_sales_table .......... [2] Ran
```

---

## Testing Setelah Migrasi

### 1. Test Login Manager
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"manager@inventoriku.com","password":"manager123"}'
```

### 2. Test Login Kasir
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"kasir@inventoriku.com","password":"kasir123"}'
```

### 3. Test Update Theme
```bash
# Ganti YOUR_TOKEN dengan token dari response login
curl -X POST http://localhost:8000/api/update-theme \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"theme":"purple"}'
```

---

## Perintah Berguna Lainnya

```bash
# Clear semua cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Optimize untuk production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Lihat semua routes
php artisan route:list

# Lihat info database
php artisan db:show
```

---

## Checklist Migrasi Sukses

- [ ] Backup database lama sudah dibuat
- [ ] Migrasi berjalan tanpa error
- [ ] Seeding berhasil membuat user Manager dan Kasir
- [ ] Bisa login sebagai Manager
- [ ] Bisa login sebagai Kasir
- [ ] Manager bisa akses Dashboard, Items, Restock, Sales History
- [ ] Kasir hanya bisa akses POS
- [ ] Bisa ganti tema warna
- [ ] Bisa transaksi dengan metode Tunai
- [ ] Bisa transaksi dengan metode QRIS
- [ ] Struk menampilkan metode pembayaran yang benar

---

Jika semua checklist terpenuhi, migrasi berhasil! 🎉
