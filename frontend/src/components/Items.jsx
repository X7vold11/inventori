import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Tag, DollarSign, Archive, Box, AlertCircle, X, Sparkles } from 'lucide-react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import api from '../api';
import { useTheme } from '../ThemeContext';
import { ThemedButton, ThemedCard, ThemedInput, ThemedPageHeader, ThemedStatCard, ThemedLoadingSpinner, ThemedBadge } from './ThemedComponents';

const MySwal = withReactContent(Swal);

export default function Items() {
  const { themeConfig } = useTheme();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', selling_price: '', description: '' });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data } = await api.get('/items');
      setItems(data);
    } catch (error) {
      console.error("Gagal mendapatkan data barang", error);
    } finally {
      setLoading(false);
    }
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.post('/items', {
        name: formData.name,
        selling_price: parseInt(formData.selling_price),
        description: formData.description
      });
      setIsModalOpen(false);
      setFormData({ name: '', selling_price: '', description: '' });
      MySwal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data barang baru telah ditambahkan.',
        timer: 1500,
        showConfirmButton: false
      });
      fetchItems();
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Gagal Menyimpan',
        text: error.response?.data?.error || 'Terjadi kesalahan sistem.'
      });
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    MySwal.fire({
      title: 'Hapus Barang?',
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/items/${id}`);
          MySwal.fire({
            icon: 'success',
            title: 'Terhapus!',
            text: 'Data barang berhasil dihapus.',
            timer: 1500,
            showConfirmButton: false
          });
          fetchItems();
        } catch (error) {
          MySwal.fire({
            icon: 'error',
            title: 'Gagal Menghapus',
            text: 'Barang tidak dapat dihapus, mungkin karena sedang terikat transaksi.'
          });
        }
      }
    });
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stats
  const totalItems = items.length;
  const lowStockItems = items.filter(i => (i.inventory?.stock ?? 0) <= 10).length;
  const totalStockValue = items.reduce((sum, i) => sum + (i.selling_price * (i.inventory?.stock ?? 0)), 0);

  const getStockStatus = (stock) => {
    if (stock === 0) return { label: 'Habis', bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100', dot: 'bg-red-500' };
    if (stock <= 10) return { label: 'Rendah', bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', dot: 'bg-amber-500' };
    if (stock <= 50) return { label: 'Cukup', bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', dot: 'bg-blue-500' };
    return { label: 'Aman', bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', dot: 'bg-emerald-500' };
  };

  if (loading) return <ThemedLoadingSpinner text="Memuat data barang..." />;

  const actionButton = (
    <ThemedButton 
      onClick={() => setIsModalOpen(true)}
      className="flex items-center gap-2 group whitespace-nowrap"
    >
      <Plus size={16} className="group-hover:rotate-90 transition-transform duration-200" />
      <span>Tambah Barang Baru</span>
    </ThemedButton>
  );

  return (
    <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
      {/* === PAGE HEADER === */}
      <ThemedPageHeader 
        title="Jenis Barang" 
        subtitle="Master Data" 
        icon={Box}
        action={actionButton}
      />

      {/* === QUICK STATS === */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <ThemedStatCard 
          title="Total Jenis"
          value={String(totalItems)}
          icon={Tag}
          suffix="barang"
        />
        <ThemedStatCard 
          title="Stok Rendah"
          value={String(lowStockItems)}
          icon={AlertCircle}
          suffix="barang"
          className="border-amber-100/50"
        />
        <ThemedStatCard 
          title="Nilai Stok"
          value={formatRupiah(totalStockValue)}
          icon={DollarSign}
        />
      </div>

      {/* === ITEMS TABLE === */}
      <ThemedCard className="overflow-hidden p-0!" hover={false}>
        {/* Search Bar */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-theme-text transition-colors duration-200" size={16} />
            <input 
              type="text" 
              placeholder="Cari nama barang..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-theme-primary/10 focus:border-theme-border-accent transition-all duration-200 text-sm font-medium text-slate-700 placeholder-slate-400 premium-input"
            />
          </div>
          <span className="bg-theme-bg-light text-theme-text text-[10px] font-semibold px-3 py-1.5 rounded-lg uppercase tracking-wider shrink-0">
            {filteredItems.length} dari {items.length} barang
          </span>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left premium-table">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-150">
                <th className="py-3 px-6 text-slate-400 font-semibold text-xs tracking-wider">Nama Barang</th>
                <th className="py-3 px-6 text-slate-400 font-semibold text-xs tracking-wider">Harga Jual</th>
                <th className="py-3 px-6 text-slate-400 font-semibold text-xs tracking-wider">Stok</th>
                <th className="py-3 px-6 text-slate-400 font-semibold text-xs tracking-wider">Status</th>
                <th className="py-3 px-6 text-right text-slate-400 font-semibold text-xs tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                        <Archive size={28} className="text-slate-300" />
                      </div>
                      <p className="font-semibold text-slate-500 text-sm">
                        {searchQuery ? 'Barang tidak ditemukan.' : 'Belum ada barang terdaftar.'}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {searchQuery ? 'Coba kata kunci lain.' : 'Klik "Tambah Barang Baru" untuk memulai.'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
              {filteredItems.map((item, index) => {
                const stock = item.inventory?.stock ?? 0;
                const status = getStockStatus(stock);
                
                return (
                  <tr 
                    key={item.id} 
                    className="border-b border-slate-100/80 group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-theme-bg-light flex items-center justify-center border border-theme-border/30 group-hover:bg-theme-bg-lighter transition-all">
                          <Box size={14} className="text-theme-text" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 text-sm tracking-tight transition-colors">{item.name}</p>
                          {item.description && (
                            <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1 max-w-[280px] font-medium">{item.description}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-slate-700 text-sm stat-value">{formatRupiah(item.selling_price)}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-slate-800 text-sm stat-value">
                        {stock}
                        <span className="text-[10px] font-medium text-slate-400 ml-1">unit</span>
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider ${status.bg} ${status.text} border ${status.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                        {status.label}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50/50 transition-all rounded-lg cursor-pointer"
                        title="Hapus barang"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ThemedCard>

      {/* === MODAL ADD ITEM === */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in scale-in duration-200 relative border border-slate-100">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-theme-bg-light text-theme-text rounded-xl">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 tracking-tight">Tambah Jenis Barang</h3>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">Daftarkan produk baru ke katalog</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Nama Barang</label>
                <ThemedInput 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Misal: Kopi Kapal Api"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Harga Jual (Rp)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-xs">Rp</span>
                  <ThemedInput 
                    type="number" 
                    required
                    value={formData.selling_price}
                    onChange={e => setFormData({...formData, selling_price: e.target.value})}
                    className="pl-10!"
                    placeholder="1500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Deskripsi Singkat <span className="text-slate-300 normal-case font-normal">(Opsional)</span></label>
                <textarea 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-theme-primary/10 focus:border-theme-border-accent transition-all text-sm font-medium text-slate-700 placeholder-slate-400 premium-input resize-none"
                  rows="2"
                  placeholder="Keterangan tambahan..."
                ></textarea>
              </div>
              <div className="pt-2 flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                >
                  Batal
                </button>
                <ThemedButton 
                  type="submit" 
                  className="px-4 py-2! text-xs!"
                >
                  Simpan Barang
                </ThemedButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

