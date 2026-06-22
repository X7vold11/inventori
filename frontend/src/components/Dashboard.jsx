import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Package, ShoppingCart, DollarSign, LayoutDashboard } from 'lucide-react';
import api from '../api';
import { useTheme } from '../ThemeContext';
import { ThemedCard, ThemedLoadingSpinner, ThemedStatCard, ThemedPageHeader } from './ThemedComponents';

export default function Dashboard() {
  const { themeConfig } = useTheme();
  const [stats, setStats] = useState({
    totalItems: 0,
    totalStock: 0,
    todaySales: 0,
    todayProfit: 0
  });
  
  const [profitData, setProfitData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/dashboard');
        const data = response.data;
        
        setStats({
          totalItems: data.total_items,
          totalStock: data.total_stock,
          todaySales: data.today_sales,
          todayProfit: data.today_profit
        });
        
        // Reverse chart data so oldest is first for the graph left-to-right
        setProfitData([...data.chart_data].reverse());
        
        // Map top items to match Recharts expectations
        setSalesData(data.top_items.map(item => ({
          name: item.name,
          sales: parseInt(item.sales.split(' ')[0]) || 0
        })));
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(number);
  };

  if (loading) return <ThemedLoadingSpinner text="Menghitung performa..." />;

  const dateBadge = (
    <div className="bg-theme-bg-light border border-theme-border/60 rounded-xl text-xs font-semibold text-theme-text shadow-sm flex items-center justify-center px-4 py-2">
      {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
    </div>
  );

  return (
    <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
      <ThemedPageHeader 
        title="Dashboard" 
        subtitle="Ringkasan Performa" 
        icon={LayoutDashboard}
        action={dateBadge}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <ThemedStatCard 
          title="Keuntungan Hari Ini" 
          value={formatRupiah(stats.todayProfit)} 
          icon={TrendingUp} 
        />
        <ThemedStatCard 
          title="Total Penjualan Hari Ini" 
          value={formatRupiah(stats.todaySales)} 
          icon={ShoppingCart} 
        />
        <ThemedStatCard 
          title="Total Jenis Barang" 
          value={String(stats.totalItems)} 
          icon={Package} 
          suffix="barang"
        />
        <ThemedStatCard 
          title="Total Stok Keseluruhan" 
          value={String(stats.totalStock)} 
          icon={DollarSign} 
          suffix="pcs"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 min-w-0">
        <ThemedCard className="lg:col-span-2 min-w-0 overflow-hidden" hover={false}>
          <h2 className="text-base font-semibold text-slate-800 mb-6">Tren Keuntungan 7 Hari Terakhir</h2>
          <div className="h-72 w-full min-w-0">
            {profitData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={profitData}>
                  <defs>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--theme-accent, #10b981)" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="var(--theme-accent, #10b981)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dx={-10} tickFormatter={(val) => `Rp ${val/1000}k`} />
                  <Tooltip 
                    formatter={(value) => formatRupiah(value)}
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid var(--theme-border, #e2e8f0)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      fontFamily: 'inherit',
                      fontSize: '12px'
                    }}
                  />
                  <Area type="monotone" dataKey="profit" stroke="var(--theme-accent, #10b981)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorProfit)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : <p className="text-slate-400 text-sm">Belum ada data untuk grafik.</p>}
          </div>
        </ThemedCard>

        <ThemedCard className="lg:col-span-1 min-w-0 overflow-hidden" hover={false}>
          <h2 className="text-base font-semibold text-slate-800 mb-6">Barang Paling Laris</h2>
          <div className="h-72 w-full min-w-0">
            {salesData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 11, fontWeight: 500}} width={80} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid var(--theme-border, #e2e8f0)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      fontFamily: 'inherit',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="sales" fill="var(--theme-primary, #3b82f6)" radius={[0, 4, 4, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            ) : <p className="text-slate-400 text-sm">Belum ada barang terjual.</p>}
          </div>
        </ThemedCard>
      </div>
    </div>
  );
}

