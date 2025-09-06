import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * Komponen Rute Privat (Protected Route).
 * 
 * Komponen ini berfungsi untuk melindungi rute-rute yang hanya boleh
 * diakses oleh pengguna yang sudah terotentikasi.
 * 
 * @returns {React.ReactElement} - Merender komponen 'Outlet' jika terotentikasi,
 * atau mengarahkan ke halaman '/login' jika tidak.
 */
const PrivateRoute = () => {
  // Mengambil status otentikasi dari AuthContext.
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  // Menampilkan status loading selagi context memeriksa otentikasi awal.
  // Ini mencegah redirect yang tidak perlu sebelum status otentikasi diketahui.
  if (isLoading) {
    return <div>Loading...</div>; // Atau bisa diganti dengan komponen spinner/skeleton screen
  }

  // Jika tidak terotentikasi, arahkan ke halaman login.
  // 'replace' digunakan agar pengguna tidak bisa kembali ke halaman sebelumnya (yang dilindungi) dengan tombol back browser.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Jika terotentikasi, render komponen anak yang sesungguhnya (misal: Dashboard, Transactions, dll).
  // <Outlet /> adalah placeholder dari react-router-dom untuk merender komponen rute anak.
  return <Outlet />;
};

export default PrivateRoute;
