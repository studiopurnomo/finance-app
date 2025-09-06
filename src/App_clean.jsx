import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

// Layout Components
import Sidebar from './layout/Sidebar';
import MobileHeader from './layout/MobileHeader';
import MobileBottomNav from './layout/MobileBottomNav';

// Components
import PrivateRoute from './components/PrivateRoute';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';
import Consultation from './pages/Consultation';
import Education from './pages/Education';
import Community from './pages/Community';
import Referral from './pages/Referral';
import Settings from './pages/Settings';
import AdminDashboard from './pages/AdminDashboard';
import Broadcast from './pages/Broadcast';

/**
 * Komponen utama aplikasi yang dibungkus oleh AuthProvider.
 */
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

/**
 * Komponen yang mengatur tata letak dan rute aplikasi.
 * Logikanya bergantung pada status otentikasi pengguna.
 */
const AppContent = () => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  // Menampilkan layar loading saat status otentikasi sedang diperiksa
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
        <div className="text-lg font-medium text-gray-700">Memuat Aplikasi...</div>
      </div>
    );
  }

  return (
    <>
      {/* Jika pengguna sudah terotentikasi, tampilkan layout utama dengan rute privat */}
      {isAuthenticated ? (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
          <div className="h-screen flex overflow-hidden">
            <Sidebar />
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
              <div className="md:hidden">
                <MobileHeader />
              </div>
              <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none md:ml-64">
                <div className="py-6">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <Routes>
                      {/* Semua rute di dalam PrivateRoute hanya bisa diakses setelah login */}
                      <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/transactions" element={<Transactions />} />
                        <Route path="/budget" element={<Budget />} />
                        <Route path="/consultation" element={<Consultation />} />
                        <Route path="/education" element={<Education />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/referral" element={<Referral />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/broadcast" element={<Broadcast />} />
                        {/* Rute default setelah login adalah dashboard */}
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      </Route>
                    </Routes>
                  </div>
                </div>
              </main>
              <div className="md:hidden">
                <MobileBottomNav />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Jika pengguna tidak terotentikasi, hanya tampilkan rute publik (login) */
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* Redirect semua rute lain ke login jika tidak terotentikasi */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
