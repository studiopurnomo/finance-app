import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { login as apiLogin } from '../api/apiService';
import { ShieldCheck, LogIn } from 'lucide-react';

/**
 * Komponen Halaman Login dengan UI/UX yang Ditingkatkan
 * 
 * Menggunakan layout dua kolom untuk tampilan yang lebih profesional.
 * Kolom kiri untuk branding, dan kolom kanan untuk form login.
 */
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiLogin({ username, password });
      if (response.data.success) {
        login(response.data.data.token, response.data.data.user);
        navigate('/dashboard');
      } else {
        setError(response.data.data?.[0]?.message || 'Terjadi kesalahan yang tidak diketahui.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.data?.[0]?.message || 'Login gagal. Periksa kembali username dan password Anda.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* Kolom Kiri - Branding */}
        <div className="relative flex flex-col justify-center p-8 text-white bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl md:w-1/2">
           <div className="absolute inset-0 bg-black opacity-20 rounded-2xl"></div>
           <div className="relative z-10">
              <h1 className="text-5xl font-bold tracking-tight">Montrack</h1>
              <p className="mt-4 text-lg font-light text-cyan-100">
                Ambil kendali penuh atas keuangan Anda. Lacak, anggarkan, dan capai tujuan finansial Anda dengan mudah.
              </p>
              <div className="flex items-center mt-8 pt-8 border-t border-cyan-400">
                  <ShieldCheck className="w-10 h-10 mr-4" />
                  <div>
                      <p className="font-semibold">Aman & Terpercaya</p>
                      <p className="text-sm text-cyan-200">Data Anda terenkripsi dan terlindungi.</p>
                  </div>
              </div>
           </div>
        </div>

        {/* Kolom Kanan - Form Login */}
        <div className="flex flex-col justify-center p-8 md:p-14 md:w-1/2">
          <span className="mb-3 text-4xl font-bold text-gray-800">Selamat Datang</span>
          <span className="font-light text-gray-500 mb-8">
            Silakan masuk untuk melanjutkan ke dashboard Anda.
          </span>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="py-2">
              <label htmlFor="username" className="mb-2 text-md font-medium text-gray-700">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg placeholder:font-light focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Masukkan username"
              />
            </div>
            <div className="py-2">
              <label htmlFor="password"className="mb-2 text-md font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg placeholder:font-light focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Masukkan password"
              />
            </div>

            {error && (
              <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                {error}
              </div>
            )}

            <div className="flex justify-between w-full py-4">
              <div className="mr-24">
                <input type="checkbox" name="remember-me" id="remember-me" className="mr-2" />
                <label htmlFor="remember-me" className="text-md font-light text-gray-700">Ingat saya</label>
              </div>
              <span className="font-medium text-cyan-600 hover:text-cyan-700 cursor-pointer">Lupa password?</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-600 to-teal-500 text-white p-3 rounded-lg font-semibold hover:shadow-lg hover:from-cyan-700 hover:to-teal-600 transition-all duration-300 disabled:opacity-70 flex items-center justify-center"
            >
              <LogIn className="w-5 h-5 mr-2" />
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div className="text-center mt-8 text-gray-500">
            Belum punya akun? <span className="font-medium text-cyan-600 hover:text-cyan-700 cursor-pointer">Daftar sekarang</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
