# Panduan Implementasi Tema Komprehensif

## Overview

Sistem tema di InventoriKu v2.0 sekarang menggunakan **React Context API** untuk menyebarkan konfigurasi tema ke seluruh aplikasi. Setiap komponen dapat mengakses tema aktif dan menyesuaikan tampilan mereka.

---

## Arsitektur Tema

### 1. Theme Configuration (`themes.js`)

File ini berisi konfigurasi lengkap untuk setiap tema:

```javascript
{
  name: 'Nama Tema',
  primary: 'warna-utama',
  secondary: 'warna-sekunder',
  
  // Gradients
  sidebar: 'from-X to-Y',
  button: 'from-X to-Y hover:from-X2 hover:to-Y2',
  cardHeader: 'from-X to-Y',
  
  // Solid colors
  accent: 'warna-500',
  accentHover: 'warna-600',
  light: 'warna-50',
  lighter: 'warna-100',
  text: 'warna-600',
  textDark: 'warna-700',
  
  // Borders
  border: 'warna-200',
  borderAccent: 'warna-500',
  
  // Shadows
  shadow: 'warna-500/30',
  shadowHover: 'warna-500/50',
}
```

### 2. Theme Context (`ThemeContext.jsx`)

Context provider yang menyediakan:
- `theme`: Nama tema aktif (string)
- `themeConfig`: Objek konfigurasi tema
- `setTheme`: Function untuk ganti tema

### 3. Themed Components (`ThemedComponents.jsx`)

Komponen reusable yang sudah terintegrasi dengan tema:
- `ThemedButton`
- `ThemedCard`
- `ThemedBadge`
- `ThemedIconContainer`
- `ThemedInput`
- `ThemedSelect`
- `ThemedPageHeader`
- `ThemedStatCard`
- `ThemedLoadingSpinner`

---

## Cara Menggunakan Tema di Komponen

### Import Hook

```javascript
import { useTheme } from '../ThemeContext';
```

### Akses Konfigurasi Tema

```javascript
function MyComponent() {
  const { theme, themeConfig } = useTheme();
  
  return (
    <div className={`bg-${themeConfig.light} text-${themeConfig.text}`}>
      Tema aktif: {theme}
    </div>
  );
}
```

---

## Contoh Implementasi per Komponen

### 1. Dashboard.jsx

```javascript
import { useTheme } from '../ThemeContext';
import { ThemedCard, ThemedLoadingSpinner, ThemedPageHeader } from './ThemedComponents';

export default function Dashboard() {
  const { themeConfig } = useTheme();
  
  return (
    <div>
      {/* Header dengan tema */}
      <h1 className={`text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${themeConfig.cardHeader}`}>
        Dashboard
      </h1>
      
      {/* Badge dengan tema */}
      <div className={`bg-gradient-to-r from-${themeConfig.light} to-${themeConfig.lighter} border border-${themeConfig.border} text-${themeConfig.text}`}>
        {new Date().toLocaleDateString()}
      </div>
      
      {/* Stat Cards dengan tema */}
      <ThemedStatCard 
        title="Total Penjualan"
        value="Rp 1.000.000"
        icon={DollarSign}
      />
    </div>
  );
}
```

### 2. Items.jsx

```javascript
import { useTheme } from '../ThemeContext';
import { ThemedButton, ThemedPageHeader, ThemedInput, ThemedStatCard } from './ThemedComponents';

export default function Items() {
  const { themeConfig } = useTheme();
  
  return (
    <div>
      {/* Page Header */}
      <ThemedPageHeader
        title="Jenis Barang"
        subtitle="Master Data"
        icon={Package}
        action={
          <ThemedButton variant="primary">
            <Plus size={18} />
            Tambah Barang Baru
          </ThemedButton>
        }
      />
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-5">
        <ThemedStatCard title="Total Jenis" value={totalItems} icon={Tag} suffix="barang" />
        <ThemedStatCard title="Stok Rendah" value={lowStock} icon={AlertCircle} suffix="barang" />
        <ThemedStatCard title="Nilai Stok" value={formatRupiah(totalValue)} icon={DollarSign} />
      </div>
      
      {/* Search Input */}
      <ThemedInput 
        type="text"
        placeholder="Cari nama barang..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      {/* Table dengan border tema */}
      <div className={`border-t-4 border-${themeConfig.borderAccent}`}>
        {/* Table content */}
      </div>
    </div>
  );
}
```

### 3. Restock.jsx

```javascript
import { useTheme } from '../ThemeContext';
import { ThemedButton, ThemedCard, ThemedSelect, ThemedInput } from './ThemedComponents';

export default function Restock() {
  const { themeConfig } = useTheme();
  
  return (
    <div>
      {/* Form Card */}
      <ThemedCard>
        <div className={`flex items-center gap-3 mb-6 border-b-2 border-${themeConfig.accent} pb-4`}>
          <div className={`p-3 bg-gradient-to-br ${themeConfig.sidebar} text-white rounded-xl`}>
            <PackagePlus size={22} />
          </div>
          <h2 className={`text-lg font-extrabold text-${themeConfig.textDark}`}>
            Form Restock
          </h2>
        </div>
        
        <form>
          <ThemedSelect>
            <option>Pilih Barang</option>
            {items.map(item => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </ThemedSelect>
          
          <ThemedInput 
            type="number"
            placeholder="Jumlah"
          />
          
          <ThemedButton type="submit" variant="primary">
            Proses Restock
          </ThemedButton>
        </form>
      </ThemedCard>
    </div>
  );
}
```

### 4. Sales.jsx

```javascript
import { useTheme } from '../ThemeContext';
import { ThemedButton, ThemedCard } from './ThemedComponents';

export default function Sales() {
  const { themeConfig } = useTheme();
  
  return (
    <div>
      {/* Start Button */}
      <ThemedButton 
        variant="primary"
        onClick={() => setIsShopping(true)}
      >
        <ShoppingCart size={24} />
        Keranjang Baru
      </ThemedButton>
      
      {/* Product Cards */}
      {items.map(item => (
        <button
          key={item.id}
          className={`border-2 border-slate-100 hover:border-${themeConfig.accent} hover:shadow-lg hover:shadow-${themeConfig.shadow}`}
        >
          {item.name}
        </button>
      ))}
      
      {/* Checkout Button */}
      <ThemedButton 
        variant="primary"
        disabled={cart.length === 0}
      >
        Checkout
      </ThemedButton>
    </div>
  );
}
```

### 5. SalesHistory.jsx

```javascript
import { useTheme } from '../ThemeContext';
import { ThemedButton, ThemedStatCard, ThemedInput } from './ThemedComponents';

export default function SalesHistory() {
  const { themeConfig } = useTheme();
  
  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-5">
        <ThemedStatCard title="Total Pendapatan" value={formatRupiah(revenue)} icon={DollarSign} />
        <ThemedStatCard title="Total Keuntungan" value={formatRupiah(profit)} icon={TrendingUp} />
        <ThemedStatCard title="Jumlah Transaksi" value={totalTxn} icon={Receipt} suffix="transaksi" />
        <ThemedStatCard title="Unit Terjual" value={totalQty} icon={ShoppingCart} suffix="unit" />
      </div>
      
      {/* Filter Panel */}
      <ThemedCard>
        <div className="flex gap-4">
          <ThemedInput type="text" placeholder="Cari barang..." />
          <ThemedInput type="date" />
          <ThemedInput type="date" />
          <ThemedButton variant="primary">Filter</ThemedButton>
        </div>
      </ThemedCard>
      
      {/* Transaction List dengan accent color */}
      <div className={`border-l-4 border-${themeConfig.accent}`}>
        {/* Transactions */}
      </div>
    </div>
  );
}
```

---

## Pattern untuk Elemen UI

### Buttons

```javascript
// Primary Button
<button className={`bg-gradient-to-r ${themeConfig.button} text-white shadow-lg shadow-${themeConfig.shadow} hover:shadow-${themeConfig.shadowHover}`}>
  Click Me
</button>

// Secondary Button
<button className={`bg-${themeConfig.light} text-${themeConfig.text} hover:bg-${themeConfig.lighter} border border-${themeConfig.border}`}>
  Cancel
</button>

// Outline Button
<button className={`border-2 border-${themeConfig.accent} text-${themeConfig.text} hover:bg-${themeConfig.light}`}>
  More
</button>
```

### Cards

```javascript
// Basic Card
<div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg">
  Content
</div>

// Card dengan accent border
<div className={`bg-white rounded-2xl p-6 border-t-4 border-${themeConfig.borderAccent}`}>
  Content
</div>

// Card dengan gradient header
<div className="bg-white rounded-2xl overflow-hidden">
  <div className={`bg-gradient-to-r ${themeConfig.cardHeader} p-4 text-white`}>
    Header
  </div>
  <div className="p-6">
    Content
  </div>
</div>
```

### Badges

```javascript
// Solid Badge
<span className={`bg-gradient-to-r ${themeConfig.button} text-white px-3 py-1 rounded-lg text-xs font-bold`}>
  New
</span>

// Light Badge
<span className={`bg-${themeConfig.light} text-${themeConfig.text} border border-${themeConfig.border} px-3 py-1 rounded-lg text-xs font-bold`}>
  Active
</span>

// Outline Badge
<span className={`border-2 border-${themeConfig.accent} text-${themeConfig.text} px-3 py-1 rounded-lg text-xs font-bold`}>
  Draft
</span>
```

### Icons

```javascript
// Icon Container
<div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${themeConfig.sidebar} flex items-center justify-center shadow-lg shadow-${themeConfig.shadow}`}>
  <Icon size={20} className="text-white" />
</div>

// Icon dengan background light
<div className={`p-3 bg-${themeConfig.light} text-${themeConfig.text} rounded-xl`}>
  <Icon size={20} />
</div>
```

### Inputs

```javascript
// Text Input
<input 
  className={`w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-${themeConfig.accent} focus:ring-4 focus:ring-${themeConfig.accent}/10`}
/>

// Select
<select 
  className={`w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-${themeConfig.accent} focus:ring-4 focus:ring-${themeConfig.accent}/10`}
>
  <option>Choose</option>
</select>
```

### Headers

```javascript
// Page Title
<h1 className={`text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${themeConfig.cardHeader}`}>
  Page Title
</h1>

// Section Title
<h2 className={`text-2xl font-bold text-${themeConfig.textDark}`}>
  Section Title
</h2>

// Subtitle
<p className={`text-${themeConfig.text} font-medium`}>
  Subtitle text
</p>
```

### Borders & Dividers

```javascript
// Accent Border Top
<div className={`border-t-4 border-${themeConfig.borderAccent}`}>
  Content
</div>

// Accent Border Left
<div className={`border-l-4 border-${themeConfig.accent}`}>
  Content
</div>

// Divider
<div className={`h-px bg-gradient-to-r ${themeConfig.sidebar}`}></div>
```

---

## Checklist Implementasi Tema

Untuk setiap komponen, pastikan elemen berikut menggunakan tema:

- [ ] **Page Header** - Judul dengan gradient tema
- [ ] **Buttons** - Primary button dengan gradient tema
- [ ] **Cards** - Border atau header dengan warna tema
- [ ] **Stat Cards** - Icon background dengan warna tema
- [ ] **Inputs** - Focus ring dengan warna tema
- [ ] **Badges** - Background dengan warna tema
- [ ] **Icons** - Container dengan gradient tema
- [ ] **Borders** - Accent borders dengan warna tema
- [ ] **Loading States** - Spinner dengan warna tema
- [ ] **Hover Effects** - Shadow dengan warna tema

---

## Testing Tema

Setelah implementasi, test dengan:

1. **Ganti tema** dari sidebar
2. **Cek semua halaman**:
   - Dashboard
   - Jenis Barang
   - Restock Gudang
   - Kasir/POS
   - Riwayat Penjualan
3. **Verifikasi elemen** yang berubah:
   - Sidebar
   - Buttons
   - Cards
   - Headers
   - Icons
   - Borders
   - Badges
4. **Test semua 6 tema**

---

## Troubleshooting

### Warna tidak berubah

**Penyebab:** Class Tailwind tidak di-generate

**Solusi:**
1. Pastikan semua class ada di `tailwind.config.js` safelist
2. Rebuild: `npm run build`
3. Restart dev server: `npm run dev`

### Tema tidak konsisten

**Penyebab:** Beberapa komponen tidak menggunakan `useTheme()`

**Solusi:**
1. Import `useTheme` di semua komponen
2. Ganti hardcoded colors dengan `themeConfig`
3. Gunakan `ThemedComponents` jika memungkinkan

---

## Best Practices

1. **Gunakan ThemedComponents** untuk konsistensi
2. **Hindari hardcode colors** - selalu gunakan `themeConfig`
3. **Test semua tema** sebelum deploy
4. **Dokumentasikan** custom themed components
5. **Konsisten** dengan pattern yang sudah ada

---

Dengan panduan ini, semua komponen akan memiliki tampilan yang konsisten dan menyesuaikan dengan tema yang dipilih user! 🎨✨
