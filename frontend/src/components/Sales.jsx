import React, { useState, useEffect } from 'react';
import { ShoppingCart, Banknote, Receipt, Plus, Minus, Trash2, Search, ArrowLeft, X, CreditCard, Smartphone } from 'lucide-react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import api from '../api';
import { ThemedButton, ThemedCard, ThemedInput, ThemedLoadingSpinner, ThemedBadge } from './ThemedComponents';

const MySwal = withReactContent(Swal);

export default function Sales() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // POS States
  const [cart, setCart] = useState([]);
  const [cashPaid, setCashPaid] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [receiptData, setReceiptData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' or 'qris'
  
  // UI States
  const [isShopping, setIsShopping] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/items');
      setItems(response.data);
    } catch (error) {
      console.error("Gagal mendapat data master barang", error);
    } finally {
      setLoading(false);
    }
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };
  
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  const addToCart = (item) => {
    const stock = item.inventory?.stock ?? 0;
    if (stock <= 0) {
      return MySwal.fire({ icon: 'warning', title: 'Stok Habis', text: `${item.name} sedang kosong!` });
    }

    const existingIndex = cart.findIndex(c => c.item_id === item.id);
    if (existingIndex >= 0) {
      const existingItem = cart[existingIndex];
      if (existingItem.quantity + 1 > stock) {
        return MySwal.fire({ icon: 'error', title: 'Stok Tidak Cukup', text: `Maksimal stok ${item.name} adalah ${stock}` });
      }
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { 
        item_id: item.id, 
        name: item.name, 
        price: parseFloat(item.selling_price),
        quantity: 1,
        maxStock: stock
      }]);
    }
  };

  const updateQuantity = (index, delta) => {
    const newCart = [...cart];
    const item = newCart[index];
    const newQty = item.quantity + delta;
    
    if (newQty <= 0) {
      newCart.splice(index, 1);
    } else if (newQty > item.maxStock) {
      MySwal.fire({ icon: 'error', title: 'Limit Stok', text: `Maksimal stok adalah ${item.maxStock}` });
      return;
    } else {
      item.quantity = newQty;
    }
    
    setCart(newCart);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const closeShopping = () => {
    if (cart.length > 0) {
      MySwal.fire({
        title: 'Batalkan Transaksi?',
        text: 'Daftar keranjang akan dihapus.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#94a3b8',
        confirmButtonText: 'Ya, Batalkan',
        cancelButtonText: 'Kembali'
      }).then((result) => {
        if (result.isConfirmed) {
          setCart([]);
          setCashPaid('');
          setIsShopping(false);
          setSearchQuery('');
        }
      });
    } else {
      setIsShopping(false);
      setSearchQuery('');
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const change = parseFloat(cashPaid || 0) - cartTotal;

  const addCash = (amount) => {
    const current = parseFloat(cashPaid || 0);
    setCashPaid((current + amount).toString());
  };
  const setExactCash = () => {
    setCashPaid(cartTotal.toString());
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return MySwal.fire({ icon: 'warning', title: 'Keranjang Kosong' });
    
    if (paymentMethod === 'cash' && change < 0) {
      return MySwal.fire({ icon: 'error', title: 'Uang Kurang', text: 'Uang yang dibayarkan kurang dari total belanja.' });
    }

    try {
      const payload = {
        items: cart.map(c => ({ item_id: c.item_id, quantity: c.quantity })),
        payment_method: paymentMethod,
        cash_paid: paymentMethod === 'cash' ? parseFloat(cashPaid) : null,
      };

      const response = await api.post('/sales', payload);
      
      setReceiptData({
        items: [...cart],
        total: cartTotal,
        cash: paymentMethod === 'cash' ? parseFloat(cashPaid) : cartTotal,
        change: paymentMethod === 'cash' ? change : 0,
        date: new Date(),
        paymentMethod: paymentMethod,
        transactionId: response.data.transaction_id,
      });

      setCart([]);
      setCashPaid('');
      setPaymentMethod('cash');
      fetchData(); 
      
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Gagal Transaksi',
        text: error.response?.data?.error || error.message
      });
    }
  };

  const closeReceipt = () => {
    setReceiptData(null);
    setIsShopping(false); // Go back to start screen
  }

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) return <ThemedLoadingSpinner text="Memuat sistem kasir..." />;

  return (
    <div className="animate-in fade-in duration-300 relative h-full">
      {/* --- SUCCESS SUMMARY MODAL --- */}
      {receiptData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-auto relative overflow-hidden animate-scale-in border border-slate-100 flex flex-col">
            
            {/* Real receipt style body */}
            <div className="p-6 sm:p-8 flex-1 relative">
              {/* Receipt pattern top */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-theme-primary/30 via-theme-accent/30 to-theme-primary/30"></div>
              
              <div className="text-center mb-6 pt-2">
                <h2 className="text-xl font-bold tracking-tight text-slate-800">INVENTORIKU</h2>
                <p className="text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-widest">Nota Pembayaran</p>
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold border border-emerald-100/50">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  Transaksi Berhasil
                </div>
              </div>

              {/* Dotted divider */}
              <div className="border-t border-dashed border-slate-200 my-4"></div>

              {/* Metadata */}
              <div className="space-y-2 text-xs text-slate-500 font-medium">
                <div className="flex justify-between">
                  <span>No. Transaksi:</span>
                  <span className="font-semibold text-slate-700 uppercase">{receiptData.transactionId?.slice(0, 8) || 'TXN-0000'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tanggal:</span>
                  <span className="font-semibold text-slate-700">{formatDate(receiptData.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Metode Pembayaran:</span>
                  <span className="font-semibold text-slate-700">{receiptData.paymentMethod === 'qris' ? '💳 QRIS' : '💵 Tunai'}</span>
                </div>
              </div>

              {/* Dotted divider */}
              <div className="border-t border-dashed border-slate-200 my-4"></div>

              {/* Items List */}
              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {receiptData.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start text-xs">
                    <div className="min-w-0 pr-4">
                      <p className="font-semibold text-slate-700 truncate">{item.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{item.quantity} x {formatRupiah(item.price)}</p>
                    </div>
                    <span className="font-bold text-slate-750 shrink-0">{formatRupiah(item.quantity * item.price)}</span>
                  </div>
                ))}
              </div>

              {/* Dotted divider */}
              <div className="border-t border-dashed border-slate-200 my-4"></div>

              {/* Financial Totals */}
              <div className="space-y-2 text-xs bg-slate-50/50 border border-slate-100 p-4 rounded-xl">
                <div className="flex justify-between font-bold text-slate-800 text-sm pb-2 border-b border-slate-200/60 mb-2">
                  <span>TOTAL</span>
                  <span className="text-theme-text">{formatRupiah(receiptData.total)}</span>
                </div>
                {receiptData.paymentMethod === 'cash' && (
                  <>
                    <div className="flex justify-between text-slate-500 font-medium">
                      <span>Bayar (Tunai)</span>
                      <span className="font-semibold text-slate-700">{formatRupiah(receiptData.cash)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-emerald-600">
                      <span>Kembalian</span>
                      <span>{formatRupiah(receiptData.change)}</span>
                    </div>
                  </>
                )}
                {receiptData.paymentMethod === 'qris' && (
                  <div className="flex justify-between text-blue-600 font-bold">
                    <span>Status</span>
                    <span>✓ Lunas (QRIS)</span>
                  </div>
                )}
              </div>

              {/* Footer barcode design simulation */}
              <div className="mt-8 flex flex-col items-center justify-center opacity-40">
                <div className="flex gap-0.5 h-8 items-stretch mb-1">
                  <div className="w-0.5 bg-slate-850"></div>
                  <div className="w-1 bg-slate-850"></div>
                  <div className="w-0.5 bg-slate-850"></div>
                  <div className="w-1.5 bg-slate-850"></div>
                  <div className="w-0.5 bg-slate-850"></div>
                  <div className="w-0.5 bg-slate-850"></div>
                  <div className="w-1 bg-slate-850"></div>
                  <div className="w-2 bg-slate-850"></div>
                  <div className="w-0.5 bg-slate-850"></div>
                  <div className="w-1 bg-slate-850"></div>
                  <div className="w-0.5 bg-slate-850"></div>
                  <div className="w-1.5 bg-slate-850"></div>
                  <div className="w-0.5 bg-slate-850"></div>
                </div>
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                  {receiptData.transactionId ? `*${receiptData.transactionId.slice(0, 8)}*` : '*INVENTORIKU*'}
                </span>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <ThemedButton 
                onClick={closeReceipt}
                className="w-full flex justify-center items-center gap-2 py-3"
              >
                <span>Tutup & Kembali</span>
              </ThemedButton>
            </div>

          </div>
        </div>
      )}

      {/* START SCREEN */}
      {!isShopping && !receiptData && (
        <div className="flex flex-col items-center justify-center h-[70vh] animate-in fade-in duration-300 slide-in-from-bottom-2">
          <div className="w-24 h-24 bg-theme-bg-light border border-theme-border/30 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <ShoppingCart size={32} className="text-theme-text" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-3 tracking-tight">Kasir & Penjualan</h1>
          <p className="text-slate-400 mb-8 text-center max-w-md text-sm font-medium">
            Mulai sesi keranjang baru untuk memproses transaksi pelanggan.
          </p>
          <ThemedButton 
            onClick={() => setIsShopping(true)}
            className="flex items-center gap-2 px-6"
          >
            <ShoppingCart size={16} />
            <span>Keranjang Baru</span>
          </ThemedButton>
        </div>
      )}

      {/* FULL POS UI */}
      {isShopping && (
        <div className="animate-in fade-in duration-200">
          <div className="mb-6 flex items-center gap-4">
            <button 
              onClick={closeShopping}
              className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200 transition-all shadow-xs cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Pilih Barang</h1>
              <p className="text-slate-400 text-xs mt-0.5 font-medium">Sesi kasir aktif. Tambahkan barang ke keranjang di sebelah kanan.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-170px)]">
            
            {/* LEFT PANEL: PRODUCT LIST */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Cari barang untuk dijual..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-theme-primary/10 focus:border-theme-border-accent transition-all text-sm font-medium text-slate-700 placeholder-slate-400"
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: '100%' }}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredItems.map(item => {
                    const stock = item.inventory?.stock ?? 0;
                    const cartItem = cart.find(c => c.item_id === item.id);
                    const cartQty = cartItem ? cartItem.quantity : 0;
                    const effectiveStock = stock - cartQty;
                    const reallyOutOfStock = effectiveStock <= 0;
 
                    return (
                      <button 
                        key={item.id}
                        onClick={() => addToCart(item)}
                        disabled={reallyOutOfStock}
                        className={`text-left p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between h-32 relative overflow-hidden cursor-pointer ${
                          reallyOutOfStock 
                            ? 'bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed' 
                            : 'bg-white border-slate-150 hover:border-theme-border-accent hover:shadow-sm hover:shadow-theme-shadow/20 hover:-translate-y-0.5 active:translate-y-0'
                        }`}
                      >
                        {cartQty > 0 && (
                          <div className="absolute top-2.5 right-2.5 bg-theme-primary text-white text-[9px] font-bold w-5 h-5 flex items-center justify-center rounded-full z-10 shadow-sm">
                            {cartQty}
                          </div>
                        )}
 
                        <div className="relative z-10 w-full">
                          <p className="font-semibold text-slate-800 line-clamp-2 text-xs leading-tight pr-4">{item.name}</p>
                          <span className={`text-[10px] mt-1.5 font-semibold inline-block px-1.5 py-0.5 rounded ${reallyOutOfStock ? 'text-rose-500 bg-rose-50' : 'text-slate-400 bg-slate-50'}`}>
                            Stok: {effectiveStock}
                          </span>
                        </div>
                        <p className="font-bold text-emerald-600 text-sm mt-2 relative z-10">{formatRupiah(item.selling_price)}</p>
                      </button>
                    )
                  })}
                  {filteredItems.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-16 text-slate-400">
                      <Search size={32} className="mb-3 text-slate-200" />
                      <p className="text-xs font-semibold">Barang tidak ditemukan.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
 
            {/* RIGHT PANEL: CART */}
            <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden h-full">
              {/* Cart Header */}
              <div className="p-4 border-b border-slate-100 bg-white z-10">
                <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Receipt size={16} className="text-theme-text" />
                  Rincian Keranjang
                  <span className="ml-auto bg-theme-bg-light text-theme-text text-[10px] font-semibold px-2 py-0.5 rounded">
                    {cart.length} Item
                  </span>
                </h2>
              </div>
 
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-3 bg-slate-50/20">
                {cart.length > 0 ? (
                  <ul className="space-y-2">
                    {cart.map((item, idx) => (
                      <li key={idx} className="bg-white p-3 shadow-xs border border-slate-100 rounded-xl">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-slate-800 text-xs leading-tight max-w-[80%] line-clamp-2">{item.name}</span>
                          <button onClick={() => removeFromCart(idx)} className="text-slate-400 hover:text-rose-500 hover:bg-rose-50/50 transition-colors p-1 rounded-md cursor-pointer">
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-theme-text font-bold text-xs bg-theme-bg-light px-2 py-0.5 rounded">{formatRupiah(item.price)}</p>
                          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-250 rounded-lg p-0.5">
                            <button onClick={() => updateQuantity(idx, -1)} className="w-5 h-5 flex items-center justify-center rounded hover:bg-white text-slate-500 shadow-xs transition-all cursor-pointer">
                              <Minus size={10} />
                            </button>
                            <span className="font-bold text-[10px] w-4 text-center select-none">{item.quantity}</span>
                            <button onClick={() => updateQuantity(idx, 1)} className="w-5 h-5 flex items-center justify-center rounded hover:bg-white text-theme-text shadow-xs transition-all cursor-pointer">
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>
                        {/* Subtotal per item */}
                        <div className="mt-2 pt-2 border-t border-dashed border-slate-100 flex justify-between items-center">
                          <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">Subtotal</span>
                          <span className="text-xs font-bold text-slate-700">{formatRupiah(item.price * item.quantity)}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 p-6">
                    <ShoppingCart size={32} className="text-slate-200 mb-3" />
                    <p className="text-[10px] font-semibold text-center leading-relaxed">Keranjang kosong.<br/>Pilih barang di sebelah kiri.</p>
                  </div>
                )}
              </div>
 
              {/* Bottom Sticky: Total + Checkout Button */}
              <div className="border-t border-slate-100 bg-white p-4">
                <div className="flex justify-between items-end mb-3 bg-theme-bg-light/60 p-2.5 rounded-xl border border-theme-border/40">
                  <span className="text-slate-500 font-semibold text-[10px] uppercase tracking-wider">Total Belanja</span>
                  <span className="text-lg font-bold text-theme-text tracking-tight">{formatRupiah(cartTotal)}</span>
                </div>
                <button 
                  onClick={() => { if (cart.length > 0) { setCashPaid(''); setIsPaymentOpen(true); } else { MySwal.fire({ icon: 'warning', title: 'Keranjang Kosong' }); } }}
                  disabled={cart.length === 0}
                  className={`w-full py-2.5 rounded-xl shadow-xs transition-all flex justify-center items-center gap-1.5 font-semibold text-xs cursor-pointer
                    ${cart.length === 0
                      ? 'bg-slate-50 text-slate-400 cursor-not-allowed border border-slate-150' 
                      : 'bg-gradient-to-r from-theme-gradient-start to-theme-gradient-end hover:from-theme-gradient-start-hover hover:to-theme-gradient-end-hover text-white shadow-sm shadow-theme-shadow/40 hover:-translate-y-0.5 active:translate-y-0'
                    }
                  `}
                >
                  <CreditCard size={15} />
                  <span>Checkout</span>
                </button>
              </div>
            </div>

            {/* === PAYMENT MODAL === */}
            {isPaymentOpen && (
              <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-auto relative overflow-hidden animate-in scale-in duration-200 border border-slate-100">
                  
                  {/* Header */}
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-theme-bg-light text-theme-text rounded-xl">
                        <Banknote size={16} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-800 tracking-tight">Pembayaran</h3>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Pilih metode pembayaran</p>
                      </div>
                    </div>
                    <button onClick={() => setIsPaymentOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all cursor-pointer">
                      <X size={16} />
                    </button>
                  </div>
  
                  {/* Cart Summary */}
                  <div className="px-6 py-3.5 bg-slate-50/30 border-b border-slate-100 max-h-36 overflow-y-auto">
                    <div className="space-y-2">
                      {cart.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded border border-slate-200/40 shrink-0">
                              {item.quantity}x
                            </span>
                            <span className="text-slate-600 font-semibold truncate">{item.name}</span>
                          </div>
                          <span className="font-semibold text-slate-700 shrink-0 ml-3">{formatRupiah(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
  
                  {/* Payment Form */}
                  <div className="p-6 space-y-4">
                    {/* Total */}
                    <div className="flex justify-between items-center bg-theme-bg-light p-3.5 rounded-xl border border-theme-border/50">
                      <span className="text-xs font-semibold text-slate-600">Total Belanja</span>
                      <span className="text-xl font-bold text-theme-text tracking-tight">{formatRupiah(cartTotal)}</span>
                    </div>
  
                    {/* Payment Method Selection */}
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Metode Pembayaran</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setPaymentMethod('cash')}
                          className={`p-3.5 rounded-xl border transition-all flex flex-col items-center gap-1.5 cursor-pointer flex-1 ${
                            paymentMethod === 'cash'
                              ? 'border-theme-border-accent bg-theme-bg-light text-theme-text font-semibold shadow-sm'
                              : 'border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600'
                          }`}
                        >
                          <Banknote size={20} />
                          <span className="text-xs">Tunai</span>
                        </button>
                        <button
                          onClick={() => setPaymentMethod('qris')}
                          className={`p-3.5 rounded-xl border transition-all flex flex-col items-center gap-1.5 cursor-pointer flex-1 ${
                            paymentMethod === 'qris'
                              ? 'border-theme-border-accent bg-theme-bg-light text-theme-text font-semibold shadow-sm'
                              : 'border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600'
                          }`}
                        >
                          <Smartphone size={20} />
                          <span className="text-xs">QRIS</span>
                        </button>
                      </div>
                    </div>
  
                    {/* Cash Payment Fields */}
                    {paymentMethod === 'cash' && (
                      <>
                        {/* Cash Input */}
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Uang Pembeli</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">Rp</span>
                            <ThemedInput 
                              type="number"
                              value={cashPaid}
                              onChange={(e) => setCashPaid(e.target.value)}
                              placeholder="0"
                              min="0"
                              autoFocus
                              className="pl-10 text-base font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                        </div>
  
                        {/* Quick Cash Buttons */}
                        <div className="flex gap-2 flex-wrap">
                          <button 
                            type="button"
                            onClick={setExactCash} 
                            className="flex-1 py-1.5 px-2 text-[11px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 hover:bg-theme-bg-light hover:text-theme-text hover:border-theme-border rounded-lg transition-all cursor-pointer"
                          >
                            Pas
                          </button>
                          <button 
                            type="button"
                            onClick={() => addCash(5000)} 
                            className="flex-1 py-1.5 px-2 text-[11px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 hover:bg-theme-bg-light hover:text-theme-text hover:border-theme-border rounded-lg transition-all cursor-pointer"
                          >
                            +5K
                          </button>
                          <button 
                            type="button"
                            onClick={() => addCash(10000)} 
                            className="flex-1 py-1.5 px-2 text-[11px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 hover:bg-theme-bg-light hover:text-theme-text hover:border-theme-border rounded-lg transition-all cursor-pointer"
                          >
                            +10K
                          </button>
                          <button 
                            type="button"
                            onClick={() => addCash(50000)} 
                            className="flex-1 py-1.5 px-2 text-[11px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 hover:bg-theme-bg-light hover:text-theme-text hover:border-theme-border rounded-lg transition-all cursor-pointer"
                          >
                            +50K
                          </button>
                          <button 
                            type="button"
                            onClick={() => addCash(100000)} 
                            className="flex-1 py-1.5 px-2 text-[11px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 hover:bg-theme-bg-light hover:text-theme-text hover:border-theme-border rounded-lg transition-all cursor-pointer"
                          >
                            +100K
                          </button>
                        </div>
  
                        {/* Change */}
                        <div className={`p-3.5 rounded-xl flex justify-between items-center border transition-all ${
                          change > 0 
                            ? 'bg-amber-50/40 border-amber-200 text-amber-700' 
                            : change === 0 && cashPaid !== '' 
                            ? 'bg-emerald-50/40 border-emerald-200 text-emerald-700' 
                            : 'bg-slate-50 border-slate-200 text-slate-500'
                        }`}>
                          <span className="font-semibold text-[10px] uppercase tracking-wider">Kembalian</span>
                          <span className={`text-base font-bold ${
                            change > 0 
                              ? 'text-amber-600' 
                              : change === 0 && cashPaid !== '' 
                              ? 'text-emerald-600' 
                              : 'text-slate-400'
                          }`}>
                            {change >= 0 ? formatRupiah(change) : formatRupiah(0)}
                          </span>
                        </div>
                      </>
                    )}
  
                    {/* QRIS Payment Info */}
                    {paymentMethod === 'qris' && (
                      <div className="bg-blue-50/40 border border-blue-200 rounded-xl p-4 text-center">
                        <Smartphone size={36} className="text-blue-500 mx-auto mb-2" />
                        <p className="text-xs font-bold text-blue-800 mb-1">Pembayaran QRIS</p>
                        <p className="text-[10px] text-blue-600">Pelanggan scan QRIS untuk membayar {formatRupiah(cartTotal)}</p>
                        <div className="mt-2.5 p-1.5 bg-white rounded border border-blue-100">
                          <p className="text-[9px] text-slate-400 font-medium">Simulasi: Klik tombol konfirmasi untuk memproses</p>
                        </div>
                      </div>
                    )}
  
                    {/* Pay Button */}
                    <ThemedButton 
                      onClick={() => { setIsPaymentOpen(false); handleCheckout(); }}
                      disabled={paymentMethod === 'cash' && (change < 0 || cashPaid === '')}
                      className={`w-full flex justify-center items-center gap-2 py-3.5 text-xs disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none ${
                        paymentMethod === 'qris'
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20'
                          : ''
                      }`}
                    >
                      {paymentMethod === 'qris' ? <Smartphone size={16} /> : <Banknote size={16} />}
                      <span>{paymentMethod === 'qris' ? 'Konfirmasi Pembayaran QRIS' : 'Bayar Sekarang'}</span>
                    </ThemedButton>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
}

