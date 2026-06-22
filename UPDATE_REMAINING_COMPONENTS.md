# Panduan Update Sales.jsx dan SalesHistory.jsx

## Yang Perlu Dilakukan

Kedua file ini masih menggunakan warna hardcoded dan perlu diupdate untuk menggunakan tema dinamis.

### 1. Tambahkan Import di Awal File

```jsx
import { useTheme } from '../ThemeContext';
```

### 2. Tambahkan Hook di Dalam Component

```jsx
export default function Sales() {
  const { themeConfig } = useTheme();
  // ... rest of code
}
```

### 3. Ganti Semua Warna Hardcoded

#### Pattern Penggantian:

**Gradients:**
- `from-emerald-500 to-emerald-600` → `${themeConfig.sidebar}`
- `from-blue-500 to-indigo-600` → `${themeConfig.sidebar}`
- `from-violet-600 to-indigo-600` → `${themeConfig.sidebar}`

**Buttons:**
- `bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700` → `bg-gradient-to-r ${themeConfig.button}`

**Text Colors:**
- `text-blue-600` → `text-${themeConfig.text}`
- `text-violet-600` → `text-${themeConfig.text}`

**Backgrounds:**
- `bg-blue-50` → `bg-${themeConfig.light}`
- `bg-violet-50` → `bg-${themeConfig.light}`

**Borders:**
- `border-blue-200` → `border-${themeConfig.border}`
- `border-violet-200` → `border-${themeConfig.border}`

**Shadows:**
- `shadow-blue-500/30` → `shadow-${themeConfig.shadow}`
- `shadow-emerald-500/30` → `shadow-${themeConfig.shadow}`

**Focus Rings:**
- `focus:ring-blue-500/10 focus:border-blue-400` → `focus:ring-${themeConfig.accent}/10 focus:border-${themeConfig.accent}`

## Contoh Sebelum dan Sesudah

### SEBELUM:
```jsx
<button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/30">
  Mulai Belanja
</button>
```

### SESUDAH:
```jsx
<button className={`bg-gradient-to-r ${themeConfig.button} text-white shadow-lg shadow-${themeConfig.shadow}`}>
  Mulai Belanja
</button>
```

## File yang Perlu Diupdate

1. **frontend/src/components/Sales.jsx** (599 lines)
2. **frontend/src/components/SalesHistory.jsx** (444 lines)

## Catatan

- Jangan ubah warna untuk status (success=emerald, warning=amber, danger=red)
- Pastikan semua template literals menggunakan backticks
- Test setiap perubahan untuk memastikan tidak ada error
