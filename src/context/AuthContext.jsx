import React, { createContext, useState, useEffect } from 'react';

/**
 * @typedef {object} User
 * @property {number} id
 * @property {string} username
 * @property {string} email
 * @property {string} full_name
 * @property {number} premium_status
 */

/**
 * @typedef {object} AuthContextType
 * @property {boolean} isAuthenticated - Status otentikasi pengguna.
 * @property {string|null} token - Token otentikasi (misal: JWT).
 * @property {User|null} user - Data pengguna yang sedang login.
 * @property {boolean} isLoading - Status loading untuk memeriksa otentikasi awal.
 * @property {(token: string, userData: User) => void} login - Fungsi untuk melakukan login.
 * @property {() => void} logout - Fungsi untuk melakukan logout.
 */

// Membuat context baru untuk otentikasi.
// Memberikan nilai default untuk auto-completion di IDE.
/** @type {React.Context<AuthContextType>} */
export const AuthContext = createContext({
  isAuthenticated: false,
  token: null,
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

/**
 * Komponen Provider untuk AuthContext.
 * Komponen ini akan "membungkus" aplikasi React dan menyediakan
 * state otentikasi serta fungsi-fungsi terkait ke semua komponen di dalamnya.
 * @param {{children: React.ReactNode}} props
 */
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [isLoading, setIsLoading] = useState(true);

  // useEffect untuk memeriksa token di localStorage saat aplikasi pertama kali dimuat.
  useEffect(() => {
    // Cek apakah ada token di localStorage.
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      // Jika ada, set state sesuai data yang tersimpan.
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    // Selesai memeriksa, set loading ke false.
    setIsLoading(false);
  }, []);

  /**
   * Fungsi untuk menangani proses login.
   * Menyimpan token dan data pengguna ke state dan localStorage.
   * @param {string} newToken - Token yang didapat dari API.
   * @param {User} userData - Data pengguna yang didapat dari API.
   */
  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  /**
   * Fungsi untuk menangani proses logout.
   * Menghapus token dan data pengguna dari state dan localStorage.
   */
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Nilai yang akan disediakan oleh context provider.
  const value = {
    isAuthenticated: !!token, // true jika token ada, false jika null.
    token,
    user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
