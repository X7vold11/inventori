import React, { useState, useEffect, useCallback } from 'react';
import { Receipt, TrendingUp, ShoppingCart, DollarSign, Calendar, Search, Filter, Package, ArrowUpRight, ArrowDownRight, RefreshCw, ChevronDown, Clock } from 'lucide-react';
import api from '../api';
import { useTheme } from '../ThemeContext';
import { 
  ThemedButton, 
  ThemedCard, 
  ThemedInput, 
  ThemedPageHeader, 
  ThemedStatCard, 
  ThemedLoadingSpinner,
  ThemedBadge 
} from './ThemedComponents';

export default function SalesHistory() {
  const { themeConfig } = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    total_revenue: 0,
    total_profit: 0,
    total_transactions: 0,
    total_quantity: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);
  const [expandedTxn, setExpandedTxn] = useState(null);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchData = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const params = {};
      if (filters.date_from || dateFrom) params.date_from = filters.date_from || dateFrom;
      if (filters.date_to || dateTo) params.date_to = filters.date_to || dateTo;

      const [txnRes, summaryRes] = await Promise.all([
        api.get('/sales/transactions', { params }),
        api.get('/sales/summary', { params }),
      ]);
      setTransactions(txnRes.data);
      setSummary(summaryRes.data);
    } catch (error) {
      console.error("Gagal memuat data penjualan:", error);
    } finally {
      setLoading(false);
    }
  }, [dateFrom, dateTo]);

  const handleFilter = () => {
    setIsFiltering(true);
    fetchData({ date_from: dateFrom, date_to: dateTo }).finally(() => setIsFiltering(false));
  };

  const handleReset = () => {
    setDateFrom('');
    setDateTo('');
    setSearchQuery('');
    fetchData({ date_from: '', date_to: '' });
  };

  const toggleExpand = (txnId) => {
    setExpandedTxn(expandedTxn === txnId ? null : txnId);
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  const formatShortDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
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
    return null;
  };

  // Client-side search filter
  const filteredTransactions = transactions.filter(txn => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return txn.items.some(item => item.item_name.toLowerCase().includes(query));
  });

  if (loading) {
    return <ThemedLoadingSpinner text="Memuat riwayat penjualan..." />;
  }

  return (
    <div className="animate-slide-up">
      {/* === PAGE HEADER === */}
      <ThemedPageHeader
        title="Riwayat Penjualan"
        subtitle="Laporan"
        icon={Receipt}
      />

      {/* === SUMMARY CARDS === */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <ThemedStatCard 
          title="Total Pendapatan" 
          value={formatRupiah(summary.total_revenue)} 
          icon={DollarSign} 
        />
        <ThemedStatCard 
          title="Total Keuntungan" 
          value={formatRupiah(summary.total_profit)} 
          icon={TrendingUp} 
        />
        <ThemedStatCard 
          title="Jumlah Transaksi" 
          value={summary.total_transactions} 
          icon={Receipt} 
          suffix="transaksi" 
        />
        <ThemedStatCard 
          title="Unit Terjual" 
          value={summary.total_quantity} 
          icon={ShoppingCart} 
          suffix="unit" 
        />
      </div>

      {/* === FILTERS === */}
      <ThemedCard hover={false} className="p-6 mb-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-4 items-end relative">
          <div className="flex-1 min-w-0">
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Cari Barang</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
              <ThemedInput
                type="text"
                placeholder="Ketik nama barang..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11"
              />
            </div>
          </div>
          <div className="w-full lg:w-auto">
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Dari Tanggal</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
              <ThemedInput
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="pl-11 min-w-[180px]"
              />
            </div>
          </div>
          <div className="w-full lg:w-auto">
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Sampai Tanggal</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
              <ThemedInput
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="pl-11 min-w-[180px]"
              />
            </div>
          </div>
          <div className="flex gap-2 w-full lg:w-auto">
            <ThemedButton
              onClick={handleFilter}
              disabled={isFiltering}
              variant="primary"
              className="flex-1 lg:flex-none flex items-center justify-center gap-2"
            >
              <Filter size={15} />
              Filter
            </ThemedButton>
            <ThemedButton
              onClick={handleReset}
              variant="secondary"
              className="flex-1 lg:flex-none flex items-center justify-center gap-2"
            >
              <RefreshCw size={14} />
              Reset
            </ThemedButton>
          </div>
        </div>
      </ThemedCard>

      {/* === TRANSACTION LIST === */}
      <ThemedCard hover={false} className="p-0 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-theme-bg-light text-theme-text rounded-xl">
              <Receipt size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800 tracking-tight">Daftar Transaksi</h2>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Klik transaksi untuk melihat detail barang</p>
            </div>
          </div>
          <ThemedBadge variant="default" className="text-[10px] tracking-wider uppercase px-3 py-1.5">
            {filteredTransactions.length} Transaksi
          </ThemedBadge>
        </div>

        {/* Transactions */}
        <div>
          {filteredTransactions.length === 0 ? (
            <div className="py-20 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
                  <Package size={28} className="text-slate-300" />
                </div>
                <p className="font-semibold text-slate-400 text-sm">Belum ada transaksi.</p>
                <p className="text-xs text-slate-300 mt-1 max-w-[260px]">Data transaksi akan muncul setelah ada penjualan dari kasir.</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredTransactions.map((txn) => {
                const isExpanded = expandedTxn === txn.transaction_id;
                const isProfit = txn.total_profit > 0;
                const itemNames = txn.items.map(i => i.item_name).join(', ');
                const relativeDate = formatRelativeDate(txn.sale_date);

                return (
                  <div key={txn.transaction_id} className="group border-b border-slate-100 last:border-0">
                    {/* Transaction Row (clickable) */}
                    <button
                      onClick={() => toggleExpand(txn.transaction_id)}
                      className="w-full text-left p-5 px-6 hover:bg-theme-bg-light/10 transition-all duration-200 flex items-center gap-4 cursor-pointer"
                    >
                      {/* Transaction icon */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-250 ${
                        isExpanded 
                          ? `bg-gradient-to-br ${themeConfig.sidebar} text-white shadow-sm shadow-theme-shadow` 
                          : `bg-theme-bg-light text-theme-text border border-theme-border/50`
                      }`}>
                        <Receipt size={18} />
                      </div>

                      {/* Transaction info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                            {txn.transaction_id.slice(0, 8).toUpperCase()}
                          </span>
                          {relativeDate && (
                            <span className="text-[10px] font-semibold text-theme-text bg-theme-bg-light px-2 py-0.5 rounded-md flex items-center gap-1">
                              <Clock size={9} />
                              {relativeDate}
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-slate-700 truncate group-hover:text-theme-text transition-colors">
                          {itemNames}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                            <Calendar size={10} />
                            {formatShortDate(txn.sale_date)} · {formatTime(txn.sale_date)}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">
                            {txn.items.length} barang · {txn.total_quantity} unit
                          </span>
                        </div>
                      </div>

                      {/* Right side: amounts */}
                      <div className="text-right shrink-0 mr-1">
                        <p className="text-base font-bold text-slate-800 stat-value">{formatRupiah(txn.total_revenue)}</p>
                        <span className={`inline-flex items-center gap-0.5 text-xs font-semibold mt-0.5 px-1.5 py-0.5 rounded-md ${
                          isProfit 
                            ? 'text-emerald-700 bg-emerald-50 border border-emerald-100/40' 
                            : 'text-rose-700 bg-rose-50 border border-rose-100/40'
                        }`}>
                          {isProfit ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                          {isProfit ? '+' : ''}{formatRupiah(txn.total_profit)}
                        </span>
                      </div>

                      {/* Expand icon */}
                      <div className={`text-slate-300 transition-transform duration-250 ${isExpanded ? 'rotate-180 text-theme-text' : ''}`}>
                        <ChevronDown size={18} />
                      </div>
                    </button>

                    {/* Expanded Detail */}
                    {isExpanded && (
                      <div className="px-6 pb-5 animate-fade-in">
                        <div className="ml-[56px] bg-slate-50/50 rounded-xl border border-slate-100 overflow-hidden">
                          {/* Detail table header */}
                          <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-slate-100/50 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                            <div className="col-span-5">Barang</div>
                            <div className="col-span-2 text-center">Qty</div>
                            <div className="col-span-2 text-right">Harga</div>
                            <div className="col-span-3 text-right">Laba</div>
                          </div>
                          
                          {/* Detail rows */}
                          <div className="divide-y divide-slate-100/60">
                            {txn.items.map((item) => {
                              const itemProfit = item.profit;
                              const isItemProfit = itemProfit > 0;
                              return (
                                <div key={item.id} className="grid grid-cols-12 gap-2 px-4 py-2.5 items-center hover:bg-white/60 transition-colors">
                                  <div className="col-span-5">
                                    <p className="text-sm font-semibold text-slate-700">{item.item_name}</p>
                                  </div>
                                  <div className="col-span-2 text-center">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white text-slate-600 border border-slate-200/50">
                                      {item.quantity} unit
                                    </span>
                                  </div>
                                  <div className="col-span-2 text-right">
                                    <span className="text-sm font-semibold text-slate-700">{formatRupiah(item.selling_price)}</span>
                                  </div>
                                  <div className="col-span-3 text-right">
                                    <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-xs font-semibold ${
                                      isItemProfit
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100/40'
                                        : 'bg-rose-50 text-rose-700 border border-rose-100/40'
                                    }`}>
                                      {isItemProfit ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                                      {isItemProfit ? '+' : ''}{formatRupiah(itemProfit)}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Transaction total row */}
                          <div className="grid grid-cols-12 gap-2 px-4 py-2.5 bg-white/80 border-t border-slate-200/60 items-center">
                            <div className="col-span-5">
                              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total</span>
                            </div>
                            <div className="col-span-2 text-center">
                              <span className="text-xs font-bold text-slate-600">{txn.total_quantity} unit</span>
                            </div>
                            <div className="col-span-2 text-right">
                              <span className="text-sm font-bold text-slate-800">{formatRupiah(txn.total_revenue)}</span>
                            </div>
                            <div className="col-span-3 text-right">
                              <span className={`text-sm font-bold ${isProfit ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {isProfit ? '+' : ''}{formatRupiah(txn.total_profit)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Table footer summary */}
        {filteredTransactions.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400 font-semibold">
              Menampilkan <span className="text-slate-600 font-bold">{filteredTransactions.length}</span> transaksi
            </p>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Total Pendapatan</p>
                <p className="text-base font-bold text-slate-800 stat-value">{formatRupiah(summary.total_revenue)}</p>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Total Laba</p>
                <p className="text-base font-bold text-emerald-600 stat-value">{formatRupiah(summary.total_profit)}</p>
              </div>
            </div>
          </div>
        )}
      </ThemedCard>
    </div>
  );
}
