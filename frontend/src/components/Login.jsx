import React, { useState } from 'react';
import { Package, Eye, EyeOff, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import api from '../api';

const MySwal = withReactContent(Swal);

export default function Login({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('cashier');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response;
      if (isRegister) {
        response = await api.post('/register', { name, email, password, role });
      } else {
        response = await api.post('/login', { email, password });
      }
      const { user, token } = response.data;

      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));

      MySwal.fire({
        icon: 'success',
        title: isRegister ? 'Registrasi Berhasil!' : 'Selamat Datang!',
        text: `Halo, ${user.name}`,
        timer: 1500,
        showConfirmButton: false,
      });

      onLoginSuccess(user, token);
    } catch (error) {
      const message = error.response?.data?.errors?.email?.[0]
        || error.response?.data?.message
        || 'Terjadi kesalahan. Coba lagi.';
      
      MySwal.fire({
        icon: 'error',
        title: isRegister ? 'Registrasi Gagal' : 'Login Gagal',
        text: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      
      {/* Background Decorative Blur Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl"
             style={{ background: 'radial-gradient(circle, #3b82f6, transparent)', top: '10%', left: '10%' }}></div>
        <div className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl"
             style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)', bottom: '10%', right: '10%' }}></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4 my-8">
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-3xl shadow-2xl shadow-black/40 overflow-hidden">
          
          {/* Top subtle highlight bar */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-80"></div>

          <div className="p-8 sm:p-10">
            {/* Logo Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20">
                <Package size={22} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">InventoriKu</h1>
              <p className="text-xs mt-1.5 text-slate-400 font-medium">
                {isRegister ? 'Buat akun manajemen baru' : 'Masuk ke sistem manajemen gudang'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div className="animate-in fade-in slide-in-from-top-3 duration-200">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1.5">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Nama lengkap Anda..."
                    className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.08] rounded-xl text-sm font-medium text-white placeholder-slate-500 transition-all duration-200 focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500/50"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1.5">
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@inventoriku.com"
                  className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.08] rounded-xl text-sm font-medium text-white placeholder-slate-500 transition-all duration-200 focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 bg-white/[0.05] border border-white/[0.08] rounded-xl text-sm font-medium text-white placeholder-slate-500 transition-all duration-200 focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {isRegister && (
                <div className="animate-in fade-in slide-in-from-top-3 duration-200">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1.5">
                    Role / Hak Akses
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.08] rounded-xl text-sm font-medium text-white placeholder-slate-500 transition-all duration-200 focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500/50 appearance-none cursor-pointer"
                  >
                    <option value="cashier" className="text-slate-800 bg-white">Kasir</option>
                    <option value="manager" className="text-slate-800 bg-white">Manager</option>
                  </select>
                </div>
              )}

              <div className="pt-3">
                <button
                  id="login-submit"
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-md shadow-indigo-500/10 hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none disabled:transform-none transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    isRegister ? 'Daftar Akun Baru' : 'Masuk ke Dashboard'
                  )}
                </button>
              </div>
            </form>

            {/* Toggle Link */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setName('');
                  setEmail('');
                  setPassword('');
                  setRole('cashier');
                }}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/5 cursor-pointer"
              >
                {isRegister ? 'Sudah punya akun? Masuk di sini' : 'Belum punya akun? Daftar di sini'}
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-[10px] font-semibold text-slate-500 tracking-wider">
                © 2026 INVENTORIKU • SISTEM MANAJEMEN GUDANG
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
