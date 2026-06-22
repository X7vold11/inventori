# Panduan Tema Warna - InventoriKu v2.0

## Daftar Tema yang Tersedia

InventoriKu v2.0 menyediakan 6 tema warna yang dapat dipilih oleh setiap user:

### 1. 🔵 Biru Klasik (Default)
- **Kode**: `blue`
- **Warna Utama**: Biru & Indigo
- **Cocok untuk**: Tampilan profesional dan formal
- **Sidebar**: Gradien biru-indigo
- **Tombol**: Biru cerah

### 2. 🟣 Ungu Elegan
- **Kode**: `purple`
- **Warna Utama**: Ungu & Violet
- **Cocok untuk**: Tampilan modern dan kreatif
- **Sidebar**: Gradien ungu-violet
- **Tombol**: Ungu cerah

### 3. 🟢 Hijau Segar
- **Kode**: `green`
- **Warna Utama**: Hijau Emerald & Teal
- **Cocok untuk**: Tampilan natural dan menenangkan
- **Sidebar**: Gradien hijau-teal
- **Tombol**: Hijau emerald

### 4. 🟠 Oranye Hangat
- **Kode**: `orange`
- **Warna Utama**: Oranye & Amber
- **Cocok untuk**: Tampilan energik dan ramah
- **Sidebar**: Gradien oranye-amber
- **Tombol**: Oranye cerah

### 5. 🩷 Pink Modern
- **Kode**: `pink`
- **Warna Utama**: Pink & Rose
- **Cocok untuk**: Tampilan ceria dan menarik
- **Sidebar**: Gradien pink-rose
- **Tombol**: Pink cerah

### 6. ⚫ Gelap Premium
- **Kode**: `dark`
- **Warna Utama**: Slate & Gray
- **Cocok untuk**: Tampilan elegan dan minimalis
- **Sidebar**: Gradien slate-gray gelap
- **Tombol**: Abu-abu gelap

---

## Cara Mengganti Tema

### Melalui Aplikasi (Recommended)

1. **Login** ke aplikasi InventoriKu
2. Lihat **sidebar kiri bawah**
3. Klik tombol **"Ganti Tema"** (ikon palet 🎨)
4. Pilih tema yang diinginkan dari dropdown
5. Klik **"Terapkan"**
6. Tema akan langsung berubah tanpa perlu refresh

### Melalui API

```bash
curl -X POST http://localhost:8000/api/update-theme \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"theme":"purple"}'
```

### Melalui Database (Manual)

```bash
php artisan tinker
```

```php
// Update tema user tertentu
$user = \App\Models\User::where('email', 'manager@inventoriku.com')->first();
$user->update(['theme' => 'green']);

// Update tema semua user
\App\Models\User::query()->update(['theme' => 'blue']);

exit
```

---

## Preferensi Tema

### Penyimpanan
- Tema disimpan di database (kolom `theme` di tabel `users`)
- Setiap user memiliki preferensi tema sendiri
- Tema tersimpan permanen dan diterapkan otomatis saat login

### Default
- Tema default untuk user baru: **Biru Klasik** (`blue`)
- Manager default: Biru
- Kasir default: Hijau (dari seeder)

---

## Komponen yang Terpengaruh Tema

Tema akan mengubah warna pada komponen berikut:

### Sidebar
- Logo aplikasi
- Background menu aktif
- Indikator menu aktif
- Avatar user
- Tombol "Ganti Tema"

### Tombol & Button
- Tombol primary (Tambah, Simpan, Checkout, dll)
- Tombol hover state
- Shadow effect

### Kartu & Badge
- Kartu statistik
- Badge status
- Border accent

### Ikon & Dekorasi
- Ikon aplikasi
- Dekorasi background
- Gradient overlay

---

## Kustomisasi Tema (Developer)

### Menambah Tema Baru

Edit file `frontend/src/themes.js`:

```javascript
export const themes = {
  // ... tema yang sudah ada
  
  // Tema baru
  cyan: {
    name: 'Cyan Segar',
    primary: 'cyan',
    secondary: 'sky',
    sidebar: 'from-cyan-600 to-sky-600',
    button: 'from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700',
    accent: 'cyan-500',
    light: 'cyan-50',
    text: 'cyan-600',
  },
};
```

Update enum di migration:

```php
// backend/database/migrations/..._add_role_and_theme_to_users_table.php
$table->enum('theme', ['blue', 'purple', 'green', 'orange', 'pink', 'dark', 'cyan'])
```

Update validation di AuthController:

```php
// backend/app/Http/Controllers/AuthController.php
$request->validate([
    'theme' => 'required|in:blue,purple,green,orange,pink,dark,cyan',
]);
```

### Mengubah Tema Default

Edit file `backend/database/migrations/..._add_role_and_theme_to_users_table.php`:

```php
$table->string('theme', 50)->default('purple')->after('password');
```

---

## Best Practices

### Untuk User
1. **Pilih tema yang nyaman** untuk mata Anda
2. **Sesuaikan dengan lingkungan kerja** (terang/gelap)
3. **Konsisten** - tidak perlu sering ganti tema
4. **Tema Kasir**: Disarankan hijau atau oranye (energik)
5. **Tema Manager**: Disarankan biru atau gelap (profesional)

### Untuk Administrator
1. **Biarkan user memilih** tema sendiri
2. **Jangan paksa** satu tema untuk semua user
3. **Backup preferensi** saat migrasi database
4. **Test semua tema** sebelum deploy production

---

## Troubleshooting

### Tema tidak berubah setelah klik "Terapkan"

**Solusi:**
1. Logout dan login kembali
2. Clear cache browser (Ctrl+Shift+Delete)
3. Hard refresh (Ctrl+Shift+R)

### Tema kembali ke default setelah login

**Penyebab:** Token expired atau localStorage terhapus

**Solusi:**
1. Pastikan backend berjalan
2. Cek API `/api/me` mengembalikan data user dengan tema
3. Cek localStorage browser ada `auth_user` dengan field `theme`

### Error "Invalid theme value"

**Penyebab:** Tema yang dipilih tidak ada dalam daftar

**Solusi:**
1. Pilih tema dari daftar yang tersedia
2. Cek enum di database: `blue`, `purple`, `green`, `orange`, `pink`, `dark`

### Warna tidak sesuai dengan tema

**Penyebab:** Tailwind CSS tidak generate class untuk tema tersebut

**Solusi:**
1. Pastikan semua class warna ada di `tailwind.config.js`
2. Rebuild frontend: `npm run build`
3. Restart dev server: `npm run dev`

---

## FAQ

**Q: Apakah tema mempengaruhi performa aplikasi?**
A: Tidak. Tema hanya mengubah class CSS, tidak ada impact pada performa.

**Q: Bisakah satu toko menggunakan tema yang sama untuk semua user?**
A: Bisa, tapi tidak disarankan. Biarkan setiap user memilih tema yang nyaman untuk mereka.

**Q: Apakah tema tersimpan di server atau browser?**
A: Tersimpan di server (database). Jadi tema akan sama di perangkat manapun user login.

**Q: Bisakah membuat tema custom sendiri?**
A: Ya, lihat bagian "Kustomisasi Tema (Developer)" di atas.

**Q: Apakah tema mempengaruhi struk cetak?**
A: Tidak. Struk cetak menggunakan style khusus yang tidak terpengaruh tema.

---

## Rekomendasi Tema per Role

| Role | Tema Rekomendasi | Alasan |
|------|------------------|--------|
| **Manager** | Biru Klasik / Gelap Premium | Profesional, fokus pada data |
| **Kasir** | Hijau Segar / Oranye Hangat | Energik, ramah pelanggan |
| **Owner** | Ungu Elegan / Pink Modern | Modern, menarik |
| **Admin IT** | Gelap Premium | Minimalis, fokus teknis |

---

## Contoh Penggunaan

### Scenario 1: Toko dengan 3 Kasir

```
Kasir 1 (Pagi)   → Tema Hijau Segar (fresh start)
Kasir 2 (Siang)  → Tema Oranye Hangat (energik)
Kasir 3 (Malam)  → Tema Gelap Premium (tidak silau)
Manager          → Tema Biru Klasik (profesional)
```

### Scenario 2: Toko Fashion

```
Semua Staff → Tema Pink Modern (sesuai branding toko)
```

### Scenario 3: Toko Elektronik

```
Semua Staff → Tema Gelap Premium (tech-savvy look)
```

---

Selamat menggunakan fitur tema warna! 🎨✨
