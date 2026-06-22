import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Package, ShoppingCart, PlusCircle, LayoutDashboard, Clock, LogOut, User, Palette, Users } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Items from './components/Items';
import Restock from './components/Restock';
import Sales from './components/Sales';
import SalesHistory from './components/SalesHistory';
import Accounts from './components/Accounts';
import Login from './components/Login';
import PageTransition from './components/PageTransition';
import LogoutTransition from './components/LogoutTransition';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import api from './api';
import { themes, getThemeClasses } from './themes';
import { ThemeProvider } from './ThemeContext';

const MySwal = withReactContent(Swal);

function Sidebar({ user, onLogout, theme, onThemeChange }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const themeConfig = getThemeClasses(theme);

  const linkClass = (path) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative group cursor-pointer ${
    isActive(path) 
      ? `bg-theme-bg-light text-theme-text font-semibold` 
      : 'text-slate-400 hover:bg-white/5 hover:text-white font-medium'
  }`;

  // Menu items based on role
  const managerMenuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/items', icon: Package, label: 'Jenis Barang' },
    { path: '/restock', icon: PlusCircle, label: 'Restock Gudang' },
    { path: '/sales-history', icon: Clock, label: 'Riwayat Penjualan' },
    { path: '/accounts', icon: Users, label: 'Daftar Akun' },
  ];

  const cashierMenuItems = [
    { path: '/', icon: ShoppingCart, label: 'Kasir / POS' },
    { path: '/sales-history', icon: Clock, label: 'Riwayat Penjualan' },
  ];

  const menuItems = user?.role === 'cashier' ? cashierMenuItems : managerMenuItems;

  const handleLogout = () => {
    MySwal.fire({
      title: 'Logout?',
      text: 'Anda yakin ingin keluar dari sistem?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Ya, Logout',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.post('/logout');
        } catch (e) {
          // Token might already be invalid, that's fine
        }
        onLogout();
      }
    });
  };

  const handleThemeChange = () => {
    const themeOptions = Object.entries(themes).map(([key, value]) => ({
      value: key,
      label: value.name,
    }));

    MySwal.fire({
      title: 'Pilih Tema',
      input: 'select',
      inputOptions: Object.fromEntries(themeOptions.map(t => [t.value, t.label])),
      inputValue: theme,
      showCancelButton: true,
      confirmButtonText: 'Terapkan',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        onThemeChange(result.value);
      }
    });
  };

  return (
    <div className="w-64 bg-slate-900 border-r border-white/5 h-screen fixed left-0 top-0 shadow-sm flex flex-col z-50 print:hidden">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${themeConfig.sidebar} flex items-center justify-center`}>
            <Package size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent tracking-tight">InventoriKu</h1>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mt-0.5">
              {user?.role === 'cashier' ? 'Kasir' : 'Manajemen'}
            </p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1.5 mt-4">
        {menuItems.map((item, idx) => (
          <Link key={item.path} to={item.path} className={linkClass(item.path)}>
            {/* Active indicator bar */}
            {isActive(item.path) && (
              <span
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-5 bg-theme-primary rounded-r-full"
                style={{
                  animation: 'slideInLeft 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                }}
              />
            )}
            <item.icon size={18} />
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>
      
      {/* User Info & Logout */}
      <div className="p-4 mx-2 mb-4">
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${themeConfig.sidebar} flex items-center justify-center flex-shrink-0`}>
              <User size={16} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email || ''}</p>
            </div>
          </div>
          <div className="space-y-2">
            <button 
              onClick={handleThemeChange}
              className="w-full py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold rounded-xl transition-all border border-white/5 hover:border-white/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Palette size={13} />
              Ganti Tema
            </button>
            <button 
              onClick={handleLogout}
              className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-xs font-semibold rounded-xl transition-all border border-red-500/10 hover:border-red-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut size={13} />
              Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('blue');
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [entrancePhase, setEntrancePhase] = useState('none'); // 'none' | 'entering' | 'done'

  useEffect(() => {
    // Check for existing auth on mount
    const token = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('auth_user');
    
    if (token && savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setTheme(userData.theme || 'blue');
      setIsAuthenticated(true);
      setEntrancePhase('done'); // Skip entrance if already logged in

      // Verify token validity with the server
      api.get('/me')
        .then(res => {
          setUser(res.data);
          setTheme(res.data.theme || 'blue');
          localStorage.setItem('auth_user', JSON.stringify(res.data));
        })
        .catch(() => {
          handleLogout();
        })
        .finally(() => setCheckingAuth(false));
    } else {
      setCheckingAuth(false);
    }

    // Listen for forced logout events from API interceptor
    const handleForceLogout = () => handleLogout();
    window.addEventListener('auth:logout', handleForceLogout);
    return () => window.removeEventListener('auth:logout', handleForceLogout);
  }, []);

  const handleLoginSuccess = (userData, token) => {
    setUser(userData);
    setTheme(userData.theme || 'blue');
    setEntrancePhase('entering');
    // Small delay so the login exit + entrance animation plays
    setTimeout(() => {
      setIsAuthenticated(true);
      setTimeout(() => setEntrancePhase('done'), 600);
    }, 300);
  };

  const handleLogout = useCallback(() => {
    setIsLoggingOut(true);
  }, []);

  const completeLogout = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
    setTheme('blue');
    setIsAuthenticated(false);
    setIsLoggingOut(false);
    setEntrancePhase('none');
  }, []);

  const handleThemeChange = async (newTheme) => {
    try {
      await api.post('/update-theme', { theme: newTheme });
      setTheme(newTheme);
      const updatedUser = { ...user, theme: newTheme };
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      MySwal.fire({
        icon: 'success',
        title: 'Tema Diperbarui!',
        text: `Tema ${themes[newTheme].name} berhasil diterapkan.`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Tidak dapat mengubah tema. Coba lagi.',
      });
    }
  };

  // Show loading while checking auth
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950">
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-3 border-slate-800 border-t-indigo-500 animate-spin"></div>
          <Package size={16} className="absolute text-indigo-500" />
        </div>
        <p className="mt-4 text-slate-500 font-medium tracking-wide text-xs animate-pulse">Memverifikasi sesi...</p>
      </div>
    );
  }

  // Logout transition overlay
  if (isLoggingOut) {
    return <LogoutTransition onComplete={completeLogout} />;
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Entrance animation styles — only applied to main content, NOT the flex parent,
  // because CSS transforms break position:fixed on the sidebar.
  const entranceStyle = entrancePhase === 'entering' ? {
    opacity: 0,
    transform: 'translateY(12px)',
    transition: 'none',
  } : entrancePhase === 'done' ? {
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  } : {};

  return (
    <Router>
      <ThemeProvider initialTheme={theme}>
        <div className="flex bg-[#f9fafb] min-h-screen font-sans selection:bg-theme-primary/30 print:bg-white">
          <Sidebar user={user} onLogout={handleLogout} theme={theme} onThemeChange={handleThemeChange} />
          <main className="flex-1 ml-64 p-8 print:m-0 print:p-0 print:w-full" style={entranceStyle}>
            <div className="max-w-7xl mx-auto print:max-w-none print:w-full">
              <PageTransition>
                <Routes>
                  {user?.role === 'cashier' ? (
                    // Cashier routes
                    <>
                      <Route path="/" element={<Sales />} />
                      <Route path="/sales-history" element={<SalesHistory />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </>
                  ) : (
                    // Manager routes
                    <>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/items" element={<Items />} />
                      <Route path="/restock" element={<Restock />} />
                      <Route path="/sales-history" element={<SalesHistory />} />
                      <Route path="/accounts" element={<Accounts currentUser={user} />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </>
                  )}
                </Routes>
              </PageTransition>
            </div>
          </main>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
