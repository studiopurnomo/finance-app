import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { login as apiLogin } from '../api/apiService';

/**
 * Komponen Halaman Login
 * 
 * Fungsi utama komponen ini adalah untuk menampilkan form login
 * dan menangani proses otentikasi pengguna.
 */
const Login = () => {
  // State untuk menyimpan nilai dari input username dan password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // State untuk menangani pesan error saat login gagal
  const [error, setError] = useState('');
  
  // State untuk menunjukkan status loading saat request API sedang berjalan
  const [loading, setLoading] = useState(false);

  // Hook dari react-router-dom untuk navigasi
  const navigate = useNavigate();
  
  // Mengambil fungsi login dari AuthContext
  const { login } = useContext(AuthContext);

  /**
   * Fungsi untuk menangani submit form login.
   * @param {Event} e - Event dari form submission.
   */
  const handleLogin = async (e) => {
    // Mencegah perilaku default form (reload halaman)
    e.preventDefault();
    
    // Menandakan proses login dimulai
    setLoading(true);
    setError('');

    try {
      // Memanggil fungsi login dari apiService
      const response = await apiLogin({ username, password });

      // Jika login berhasil, panggil fungsi login dari context
      // untuk menyimpan token dan data pengguna
      if (response.data.success) {
        login(response.data.data.token, response.data.data.user);
        // Arahkan pengguna ke halaman dashboard setelah berhasil login
        navigate('/dashboard');
      } else {
        // Jika API mengembalikan success: false
        setError(response.data.data?.[0]?.message || 'Terjadi kesalahan yang tidak diketahui.');
      }

    } catch (err) {
      // Menangani error dari network atau response non-2xx
      const errorMessage = err.response?.data?.data?.[0]?.message || 'Login gagal. Periksa kembali username dan password Anda.';
      setError(errorMessage);
    } finally {
      // Menandakan proses login selesai
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">Montrack</h1>
          <p className="mt-2 text-gray-600">Selamat datang kembali! Silakan masuk ke akun Anda.</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Masukkan username Anda"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Masukkan password Anda"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                Ingat saya
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Lupa password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Belum punya akun?{' '}
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Daftar sekarang
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
