import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Trash2, Edit3, Mail, Lock, Shield, X, RefreshCw } from 'lucide-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import api from '../api';
import { 
  ThemedButton, 
  ThemedCard, 
  ThemedBadge, 
  ThemedInput, 
  ThemedSelect, 
  ThemedPageHeader, 
  ThemedStatCard, 
  ThemedLoadingSpinner 
} from './ThemedComponents';

const MySwal = withReactContent(Swal);

export default function Accounts({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // Null for create, user object for edit

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('cashier');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Gagal memuat daftar user:", error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Gagal mengambil data user dari server.'
      });
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setName('');
    setEmail('');
    setPassword('');
    setRole('cashier');
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPassword(''); // Leave password blank on edit unless they want to change it
    setRole(user.role);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingUser) {
        // Edit User
        const payload = { name, email, role };
        if (password.trim()) {
          payload.password = password;
        }

        await api.put(`/users/${editingUser.id}`, payload);
        MySwal.fire({
          icon: 'success',
          title: 'Akun Diperbarui',
          text: `Akun ${name} berhasil diperbarui.`,
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        // Create User
        if (!password.trim()) {
          MySwal.fire({
            icon: 'warning',
            title: 'Password Diperlukan',
            text: 'Password wajib diisi untuk akun baru.'
          });
          setSubmitting(false);
          return;
        }

        await api.post('/users', { name, email, password, role });
        MySwal.fire({
          icon: 'success',
          title: 'Akun Terdaftar',
          text: `Akun ${name} berhasil didaftarkan.`,
          timer: 1500,
          showConfirmButton: false
        });
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Gagal menyimpan akun:", error);
      MySwal.fire({
        icon: 'error',
        title: 'Gagal Menyimpan',
        text: error.response?.data?.message || 'Terjadi kesalahan saat menghubungi server.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (user) => {
    if (user.id === currentUser?.id) {
      return MySwal.fire({
        icon: 'error',
        title: 'Tidak Diizinkan',
        text: 'Anda tidak dapat menghapus akun Anda sendiri yang sedang aktif.'
      });
    }

    MySwal.fire({
      title: 'Hapus Akun?',
      text: `Apakah Anda yakin ingin menghapus akun ${user.name}? Tindakan ini tidak dapat dibatalkan.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/users/${user.id}`);
          MySwal.fire({
            icon: 'success',
            title: 'Terhapus',
            text: 'Akun berhasil dihapus.',
            timer: 1500,
            showConfirmButton: false
          });
          fetchUsers();
        } catch (error) {
          console.error("Gagal menghapus user:", error);
          MySwal.fire({
            icon: 'error',
            title: 'Gagal Menghapus',
            text: error.response?.data?.error || 'Tidak dapat menghapus user.'
          });
        }
      }
    });
  };

  const formatShortDate = (dateString) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Helper stats
  const totalUsers = users.length;
  const managersCount = users.filter(u => u.role === 'manager').length;
  const cashiersCount = users.filter(u => u.role === 'cashier').length;

  if (loading) {
    return <ThemedLoadingSpinner text="Memuat daftar akun..." />;
  }

  return (
    <div className="animate-slide-up">
      {/* Page Header */}
      <ThemedPageHeader
        title="Daftar Akun"
        subtitle="Manajemen Pengguna"
        icon={Users}
        action={
          <ThemedButton onClick={openCreateModal} variant="primary" className="flex items-center gap-2">
            <UserPlus size={18} />
            Daftar Akun Baru
          </ThemedButton>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ThemedStatCard title="Total Pengguna" value={totalUsers} icon={Users} suffix="user" />
        <ThemedStatCard title="Total Manager" value={managersCount} icon={Shield} suffix="akun" />
        <ThemedStatCard title="Total Kasir" value={cashiersCount} icon={Users} suffix="akun" />
      </div>

      {/* Accounts List Table */}
      <ThemedCard className="overflow-hidden p-0" hover={false}>
        {/* Table Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-800 tracking-tight">Akun Terdaftar</h2>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Kelola data user dan hak akses sistem</p>
          </div>
          <button 
            onClick={fetchUsers}
            className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all border border-slate-100 cursor-pointer"
          >
            <RefreshCw size={14} />
          </button>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse premium-table">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Nama & Email</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Tema Aktif</th>
                <th className="py-4 px-6">Terdaftar Sejak</th>
                <th className="py-4 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm font-semibold text-slate-600">
              {users.map((u) => {
                const isSelf = u.id === currentUser?.id;
                return (
                  <tr key={u.id} className="hover:bg-slate-50/30 transition-colors">
                    {/* User profile info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${
                          u.role === 'manager' ? 'from-indigo-400/80 to-purple-500/80' : 'from-emerald-400/80 to-teal-500/80'
                        } flex items-center justify-center text-white text-xs font-bold shadow-sm shrink-0`}>
                          {u.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-800 flex items-center gap-1.5 truncate">
                            {u.name}
                            {isSelf && (
                              <span className="text-[9px] font-semibold bg-theme-bg-light text-theme-text border border-theme-border/50 px-1.5 py-0.5 rounded uppercase">
                                Anda
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-slate-400 font-medium truncate">{u.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role badge */}
                    <td className="py-4 px-6">
                      <ThemedBadge 
                        variant={u.role === 'manager' ? 'solid' : 'default'}
                        className="capitalize"
                      >
                        {u.role === 'manager' ? '👔 Manager' : '💰 Kasir'}
                      </ThemedBadge>
                    </td>

                    {/* Theme Preference */}
                    <td className="py-4 px-6 capitalize">
                      <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-500">
                        🎨 {u.theme || 'blue'}
                      </span>
                    </td>

                    {/* Date Registered */}
                    <td className="py-4 px-6 font-medium text-slate-400">
                      {formatShortDate(u.created_at)}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(u)}
                          title="Edit Akun"
                          className="p-2 bg-slate-50 hover:bg-theme-bg-light text-slate-500 hover:text-theme-text rounded-xl border border-slate-200/50 transition-all cursor-pointer"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(u)}
                          disabled={isSelf}
                          title={isSelf ? "Tidak dapat menghapus akun Anda sendiri" : "Hapus Akun"}
                          className="p-2 bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-xl border border-slate-200/50 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ThemedCard>

      {/* CREATE / EDIT ACCOUNT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-auto relative overflow-hidden animate-scale-in">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-theme-bg-light text-theme-text rounded-xl">
                  <UserPlus size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800 tracking-tight">
                    {editingUser ? 'Edit Akun' : 'Daftar Akun Baru'}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {editingUser ? 'Ubah informasi akun' : 'Buat kredensial login baru'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-2 text-slate-350 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-450 mb-2 uppercase tracking-wider">Nama Lengkap</label>
                <ThemedInput
                  type="text"
                  required
                  placeholder="Ketik nama lengkap..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-455 mb-2 uppercase tracking-wider">Alamat Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
                  <ThemedInput
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-455 mb-2 uppercase tracking-wider">
                  Password {editingUser && <span className="text-[10px] font-normal lowercase text-slate-400">(biarkan kosong jika tidak ingin diubah)</span>}
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
                  <ThemedInput
                    type="password"
                    required={!editingUser}
                    placeholder="Minimal 6 karakter..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11"
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-455 mb-2 uppercase tracking-wider">Role / Hak Akses</label>
                <div className="relative">
                  <ThemedSelect
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="cashier">💰 Kasir (Akses POS & Riwayat Saja)</option>
                    <option value="manager">👔 Manager (Akses Penuh Master & Dashboard)</option>
                  </ThemedSelect>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex gap-3">
                <ThemedButton
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  variant="secondary"
                  className="flex-1 py-3"
                >
                  Batal
                </ThemedButton>
                <ThemedButton
                  type="submit"
                  disabled={submitting}
                  variant="primary"
                  className="flex-1 py-3"
                >
                  {submitting ? 'Menyimpan...' : editingUser ? 'Simpan Perubahan' : 'Daftar Akun'}
                </ThemedButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
