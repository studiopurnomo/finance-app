import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

// Layout Component
import MainLayout from './layout/MainLayout';

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
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-lg font-medium text-gray-700">Memuat Aplikasi...</div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Rute Publik (Login) */}
      {!isAuthenticated && <Route path="/login" element={<Login />} />}

      {/* Rute Privat yang dibungkus oleh MainLayout */}
      {isAuthenticated && (
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
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
            </MainLayout>
          }
        />
      )}

      {/* Redirect semua rute lain ke tujuan yang sesuai */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
};

export default App;
