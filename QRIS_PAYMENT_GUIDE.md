# Panduan Pembayaran QRIS - InventoriKu v2.0

## Tentang QRIS

**QRIS (Quick Response Code Indonesian Standard)** adalah standar pembayaran digital menggunakan QR Code yang berlaku di Indonesia. Dalam InventoriKu v2.0, fitur QRIS memungkinkan kasir untuk mencatat transaksi pembayaran non-tunai.

> **Catatan**: Versi saat ini adalah **simulasi QRIS**. Integrasi dengan payment gateway sesungguhnya (seperti Midtrans, Xendit, dll) dapat ditambahkan di versi mendatang.

---

## Cara Menggunakan Pembayaran QRIS

### Langkah-langkah di Kasir

1. **Tambahkan barang** ke keranjang seperti biasa
2. Klik tombol **"Checkout"** (hijau)
3. Di modal pembayaran, pilih metode **"QRIS"** (ikon smartphone 📱)
4. Sistem akan menampilkan:
   - Total belanja
   - Simulasi QR Code
   - Instruksi untuk pelanggan
5. Pelanggan scan QR Code dengan aplikasi e-wallet mereka
6. Setelah pembayaran berhasil, klik **"Konfirmasi Pembayaran QRIS"**
7. Struk digital akan muncul dengan status **"✓ Terbayar"**

### Perbedaan dengan Pembayaran Tunai

| Aspek | Tunai | QRIS |
|-------|-------|------|
| **Input** | Masukkan nominal uang pembeli | Tidak perlu input nominal |
| **Kembalian** | Dihitung otomatis | Tidak ada kembalian |
| **Validasi** | Cek uang cukup atau tidak | Langsung konfirmasi |
| **Struk** | Tampilkan tunai + kembalian | Tampilkan status terbayar |
| **Kecepatan** | Perlu hitung kembalian | Lebih cepat |

---

## Alur Transaksi QRIS

```
┌─────────────────────────────────────────────────────────┐
│ 1. Kasir: Pilih barang → Tambah ke keranjang           │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 2. Kasir: Klik "Checkout"                              │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 3. Kasir: Pilih metode "QRIS"                          │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 4. Pelanggan: Scan QR Code dengan e-wallet             │
│    (GoPay, OVO, Dana, ShopeePay, LinkAja, dll)         │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 5. Pelanggan: Konfirmasi pembayaran di aplikasi        │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 6. Kasir: Klik "Konfirmasi Pembayaran QRIS"            │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 7. Sistem: Simpan transaksi + Tampilkan struk          │
└─────────────────────────────────────────────────────────┘
```

---

## Data yang Tersimpan

Setiap transaksi QRIS menyimpan informasi berikut di database:

| Field | Nilai | Keterangan |
|-------|-------|------------|
| `payment_method` | `'qris'` | Metode pembayaran |
| `cash_paid` | `NULL` | Tidak ada uang tunai |
| `selling_price` | Total harga | Total yang dibayar pelanggan |
| `transaction_id` | UUID | ID unik transaksi |
| `sale_date` | Timestamp | Waktu transaksi |

---

## Laporan & Riwayat

### Melihat Transaksi QRIS

Di halaman **Riwayat Penjualan** (Manager):
1. Semua transaksi ditampilkan termasuk QRIS
2. Metode pembayaran **tidak ditampilkan** di list (fitur mendatang)
3. Untuk melihat detail, expand transaksi

### Filter Transaksi QRIS (Manual Query)

Jika perlu filter transaksi QRIS saja:

```bash
php artisan tinker
```

```php
// Semua transaksi QRIS
$qrisSales = \App\Models\Sale::where('payment_method', 'qris')->get();

// Total pendapatan QRIS hari ini
$today = \Carbon\Carbon::today();
$qrisToday = \App\Models\Sale::where('payment_method', 'qris')
    ->whereDate('sale_date', $today)
    ->sum('selling_price');

echo "Pendapatan QRIS hari ini: Rp " . number_format($qrisToday, 0, ',', '.') . "\n";

// Jumlah transaksi QRIS vs Tunai
$qrisCount = \App\Models\Sale::where('payment_method', 'qris')
    ->distinct('transaction_id')
    ->count('transaction_id');
    
$cashCount = \App\Models\Sale::where('payment_method', 'cash')
    ->distinct('transaction_id')
    ->count('transaction_id');

echo "QRIS: $qrisCount transaksi\n";
echo "Tunai: $cashCount transaksi\n";

exit
```

---

## Integrasi Payment Gateway (Roadmap)

Untuk implementasi QRIS sesungguhnya, Anda dapat mengintegrasikan dengan:

### 1. Midtrans

```php
// Contoh flow (belum diimplementasikan)
// 1. Generate QRIS dari Midtrans
$qrisUrl = Midtrans::generateQRIS($amount);

// 2. Tampilkan QR Code ke pelanggan
// 3. Webhook dari Midtrans saat pembayaran berhasil
// 4. Update status transaksi
```

**Dokumentasi**: https://docs.midtrans.com/

### 2. Xendit

```php
// Contoh flow
$qrCode = Xendit::createQRCode([
    'external_id' => $transactionId,
    'type' => 'DYNAMIC',
    'amount' => $amount,
]);
```

**Dokumentasi**: https://developers.xendit.co/

### 3. Doku

**Dokumentasi**: https://developers.doku.com/

### 4. DANA

**Dokumentasi**: https://developers.dana.id/

---

## Keuntungan Pembayaran QRIS

### Untuk Toko
✅ Tidak perlu siapkan uang kembalian
✅ Mengurangi risiko uang palsu
✅ Transaksi tercatat digital
✅ Lebih cepat (tidak perlu hitung kembalian)
✅ Terlihat modern dan profesional

### Untuk Pelanggan
✅ Tidak perlu bawa uang tunai
✅ Lebih aman (tidak perlu buka dompet)
✅ Dapat cashback/poin dari e-wallet
✅ Riwayat transaksi tersimpan di aplikasi

---

## Best Practices

### Untuk Kasir
1. **Pastikan koneksi internet stabil** sebelum terima QRIS
2. **Tunggu konfirmasi** dari pelanggan bahwa pembayaran berhasil
3. **Cek notifikasi** di aplikasi e-wallet pelanggan
4. **Jangan klik konfirmasi** sebelum pelanggan benar-benar bayar
5. **Simpan struk digital** sebagai bukti

### Untuk Pemilik Toko
1. **Pasang poster QRIS** di kasir agar pelanggan tahu
2. **Latih kasir** cara menggunakan fitur QRIS
3. **Monitor transaksi QRIS** secara berkala
4. **Bandingkan** pendapatan tunai vs QRIS
5. **Pertimbangkan diskon** untuk pembayaran QRIS

---

## Troubleshooting

### Pelanggan sudah bayar tapi kasir belum konfirmasi

**Solusi:**
1. Minta pelanggan tunjukkan bukti pembayaran di aplikasi e-wallet
2. Cek nomor transaksi/reference number
3. Klik "Konfirmasi Pembayaran QRIS" di sistem
4. Jika ragu, hubungi customer service payment gateway

### Tombol "Konfirmasi" tidak aktif

**Penyebab:** Belum pilih metode QRIS atau ada error

**Solusi:**
1. Pastikan sudah pilih metode "QRIS" (bukan "Tunai")
2. Refresh halaman dan coba lagi
3. Cek koneksi internet

### Transaksi QRIS tidak muncul di laporan

**Penyebab:** Transaksi belum tersimpan atau filter salah

**Solusi:**
1. Refresh halaman Riwayat Penjualan
2. Cek filter tanggal (pastikan mencakup tanggal transaksi)
3. Cek database manual (lihat query di atas)

---

## Simulasi vs Real QRIS

### Versi Saat Ini (Simulasi)

| Fitur | Status |
|-------|--------|
| Pilih metode QRIS | ✅ Ada |
| Generate QR Code | ❌ Simulasi saja |
| Scan QR Code | ❌ Tidak berfungsi |
| Webhook payment | ❌ Belum ada |
| Auto-confirm | ❌ Manual confirm |
| Refund | ❌ Belum ada |

### Versi Mendatang (Real Integration)

| Fitur | Status |
|-------|--------|
| Generate QR Code real | 🔄 Roadmap |
| Webhook dari gateway | 🔄 Roadmap |
| Auto-confirm payment | 🔄 Roadmap |
| Refund/void | 🔄 Roadmap |
| Settlement report | 🔄 Roadmap |

---

## FAQ

**Q: Apakah QRIS benar-benar berfungsi?**
A: Saat ini masih simulasi. Untuk QRIS sesungguhnya, perlu integrasi dengan payment gateway.

**Q: Bisakah refund transaksi QRIS?**
A: Belum ada fitur refund. Untuk sementara, catat manual di luar sistem.

**Q: Apakah ada biaya untuk QRIS?**
A: Tergantung payment gateway yang digunakan. Biasanya 0.7% - 1% per transaksi.

**Q: Bagaimana jika pelanggan batalkan pembayaran?**
A: Jangan klik "Konfirmasi" di sistem. Transaksi tidak akan tercatat.

**Q: Apakah bisa partial payment (sebagian tunai, sebagian QRIS)?**
A: Belum bisa. Harus pilih satu metode saja.

---

## Statistik Penggunaan (Contoh)

Untuk melihat perbandingan metode pembayaran:

```sql
-- Query SQL langsung
SELECT 
    payment_method,
    COUNT(DISTINCT transaction_id) as total_transaksi,
    SUM(selling_price) as total_pendapatan
FROM sales
WHERE sale_date >= DATE('now', '-30 days')
GROUP BY payment_method;
```

Output contoh:
```
payment_method | total_transaksi | total_pendapatan
---------------|-----------------|------------------
cash           | 150             | 15,000,000
qris           | 75              | 8,500,000
```

---

## Kesimpulan

Fitur QRIS di InventoriKu v2.0 memudahkan pencatatan transaksi non-tunai. Meskipun saat ini masih simulasi, struktur database dan UI sudah siap untuk integrasi payment gateway sesungguhnya di masa depan.

Untuk implementasi production, disarankan menggunakan payment gateway resmi seperti Midtrans, Xendit, atau Doku.

---

**Selamat menggunakan fitur QRIS!** 💳✨
