import React, { useState, useEffect } from 'react';
import { PackagePlus, Calendar, ArrowUpRight, Package, TrendingUp, Boxes, Clock } from 'lucide-react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import api from '../api';
import { useTheme } from '../ThemeContext';
import { ThemedButton, ThemedCard, ThemedInput, ThemedSelect, ThemedPageHeader, ThemedStatCard, ThemedLoadingSpinner, ThemedBadge } from './ThemedComponents';

const MySwal = withReactContent(Swal);

export default function Restock() {
  const { themeConfig } = useTheme();
  const [items, setItems] = useState([]);
  const [restockHistory, setRestockHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ item_id: '', quantity: '', purchase_price: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [itemsRes, restockRes] = await Promise.all([
        api.get('/items'),
        api.get('/restocks')
      ]);
      setItems(itemsRes.data);
      setRestockHistory(restockRes.data);
    } catch (error) {
      console.error("Gagal mendapatkan data", error);
    } finally {
      setLoading(false);
    }
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };
  
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const formatRelativeDate = (dateString) => {
    const d = new Date(dateString);
    const now = new Date();
    const diffMs = now - d;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Baru saja';
    if (diffMins < 60) return `${diffMins} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays < 7) return `${diffDays} hari lalu`;
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleRestock = async (e) => {
    e.preventDefault();
    if (!formData.item_id) {
      return MySwal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Pilih barang yang ingin di-restock terlebih dahulu!'
      });
    }

    setIsSubmitting(true);
    try {
      await api.post('/restocks', {
        item_id: parseInt(formData.item_id),
        quantity: parseInt(formData.quantity),
        purchase_price: parseInt(formData.purchase_price)
      });
      MySwal.fire({
        icon: 'success',
        title: 'Restock Berhasil!',
        text: 'Stok barang telah ditambah dan tercatat di riwayat.',
        timer: 1500,
        showConfirmButton: false
      });
      setFormData({ item_id: '', quantity: '', purchase_price: '' });
      fetchData();
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Gagal Restock',
        text: error.response?.data?.error || error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate summary stats
  const totalRestockCost = restockHistory.reduce((sum, e) => sum + parseFloat(e.purchase_price || 0), 0);
  const totalRestockQty = restockHistory.reduce((sum, e) => sum + parseInt(e.quantity || 0), 0);

  if (loading) return <ThemedLoadingSpinner text="Memuat data restock..." />;

  return (
    <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
      {/* === PAGE HEADER === */}
      <ThemedPageHeader 
        title="Restock Gudang" 
        subtitle="Manajemen Stok" 
        icon={PackagePlus}
      />

      {/* === QUICK STATS === */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <ThemedStatCard 
          title="Total Restok"
          value={String(restockHistory.length)}
          icon={Boxes}
          suffix="transaksi"
        />
        <ThemedStatCard 
          title="Unit Masuk"
          value={`+${totalRestockQty.toLocaleString('id-ID')}`}
          icon={TrendingUp}
          suffix="unit"
          className="border-emerald-100/50"
        />
        <ThemedStatCard 
          title="Total Modal"
          value={formatRupiah(totalRestockCost)}
          icon={Package}
          className="border-rose-100/50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* === FORM PANEL === */}
        <div className="lg:col-span-1">
          <ThemedCard className="sticky top-8 relative overflow-hidden" hover={false}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-theme-bg-light text-theme-text rounded-xl">
                <PackagePlus size={18} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-800 tracking-tight">Form Restock</h2>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">Isi detail pengadaan barang</p>
              </div>
            </div>
            
            <form onSubmit={handleRestock} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Pilih Barang</label>
                <div className="relative">
                  <ThemedSelect 
                    required
                    value={formData.item_id}
                    onChange={e => setFormData({...formData, item_id: e.target.value})}
                  >
                    <option value="">── Pilih Barang ──</option>
                    {items.map(item => (
                      <option key={item.id} value={item.id}>{item.name} (Stok: {item.inventory?.stock ?? 0})</option>
                    ))}
                  </ThemedSelect>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Jumlah Tambah (Qty)</label>
                <ThemedInput 
                  type="number" 
                  required
                  value={formData.quantity}
                  onChange={e => setFormData({...formData, quantity: e.target.value})}
                  placeholder="Misal: 50"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Total Modal Beli (Rp)</label>
                <ThemedInput 
                  type="number" 
                  required
                  value={formData.purchase_price}
                  onChange={e => setFormData({...formData, purchase_price: e.target.value})}
                  placeholder="Total uang dibayarkan..."
                  min="0"
                />
                <div className="flex items-start gap-2 mt-2.5 p-2 rounded-lg bg-amber-50/50 border border-amber-100/50">
                  <span className="text-amber-500 text-[10px] mt-px">💡</span>
                  <p className="text-[10px] text-amber-700/80 font-medium leading-relaxed">Bukan harga satuan, tapi total modal belanja keseluruhan untuk barang ini.</p>
                </div>
              </div>

              <ThemedButton 
                type="submit" 
                disabled={isSubmitting}
                className="w-full mt-2 flex justify-center items-center gap-2"
              >
                <ArrowUpRight size={16} />
                <span>{isSubmitting ? 'Memproses...' : 'Proses Restock'}</span>
              </ThemedButton>
            </form>
          </ThemedCard>
        </div>

        {/* === HISTORY PANEL === */}
        <div className="lg:col-span-2">
          <ThemedCard className="overflow-hidden p-0!" hover={false}>
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-theme-bg-light text-theme-text rounded-xl">
                  <Clock size={16} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-800 tracking-tight">Riwayat Restock Terakhir</h2>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">Timeline pembelian dari supplier</p>
                </div>
              </div>
              <span className="bg-theme-bg-light text-theme-text text-[10px] font-semibold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                {restockHistory.length} catatan
              </span>
            </div>
            
            {/* Content */}
            <div>
              {restockHistory.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {restockHistory.map((entry, index) => (
                    <div 
                      key={entry.id} 
                      className="p-5 px-6 hover:bg-slate-50/30 transition-all duration-200 group cursor-default"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Timeline indicator */}
                          <div className="relative">
                            <div className="w-9 h-9 rounded-lg bg-theme-bg-light flex items-center justify-center text-theme-text border border-theme-border/30 group-hover:bg-theme-bg-lighter transition-all">
                              <PackagePlus size={15} />
                            </div>
                          </div>
                          
                          {/* Info */}
                          <div>
                            <p className="font-semibold text-slate-800 text-sm tracking-tight">{entry.item?.name}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-100/50">
                                <TrendingUp size={9} />
                                +{entry.quantity} unit
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                                <Calendar size={9} />
                                {formatRelativeDate(entry.restock_date)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Cost */}
                        <div className="text-right">
                          <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Modal</p>
                          <p className="text-sm font-bold text-rose-600 stat-value">-{formatRupiah(entry.purchase_price)}</p>
                        </div>
                      </div>
                      
                      {/* Expand hint on hover */}
                      <div className="mt-1.5 pt-1.5 border-t border-slate-100/0 group-hover:border-slate-100 transition-all duration-200 overflow-hidden max-h-0 group-hover:max-h-8 opacity-0 group-hover:opacity-100">
                        <p className="text-[10px] text-slate-400 font-medium">{formatDate(entry.restock_date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-16 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-slate-50 rounded-2xl flex items-center justify-center">
                    <Package size={28} className="text-slate-300" />
                  </div>
                  <p className="font-semibold text-slate-500 text-sm">Belum ada riwayat restock.</p>
                  <p className="text-xs text-slate-400 mt-1">Gunakan form di sebelah kiri untuk memulai.</p>
                </div>
              )}
            </div>
          </ThemedCard>
        </div>
      </div>
    </div>
  );
}

