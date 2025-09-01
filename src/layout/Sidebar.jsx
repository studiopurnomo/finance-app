import React from 'react';
import { User } from 'lucide-react';

/**
 * Komponen Sidebar untuk navigasi utama aplikasi.
 * @param {object} props - Props yang diterima dari komponen induk (App.jsx)
 * @param {boolean} props.sidebarOpen - Status visibilitas sidebar (untuk mobile)
 * @param {object} props.userProfile - Data profil pengguna
 * @param {Array} props.menuItems - Daftar item menu utama
 * @param {Array} props.adminMenuItems - Daftar item menu admin
 * @param {string} props.activeMenu - ID menu yang sedang aktif
 * @param {Function} props.setActiveMenu - Fungsi untuk mengubah menu aktif
 * @param {Function} props.setSidebarOpen - Fungsi untuk mengubah status visibilitas sidebar
 * @param {Function} props.setShowUpgradeModal - Fungsi untuk menampilkan modal upgrade
 * @param {boolean} props.darkMode - Status mode gelap
 */
const Sidebar = ({
  sidebarOpen,
  userProfile,
  menuItems,
  adminMenuItems,
  activeMenu,
  setActiveMenu,
  setSidebarOpen,
  setShowUpgradeModal,
  darkMode
}) => {
  return (
    // Kontainer utama sidebar dengan transisi untuk mobile
    <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } md:translate-x-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
      {/* Layout flex untuk memisahkan header, konten, dan footer sidebar */}
      <div className="p-6 flex flex-col h-full">
        {/* Bagian Header Sidebar (Logo & Profil) */}
        <div>
          <h1 className="text-2xl font-bold mb-8">FinanceApp</h1>

          {/* Kartu Profil Pengguna */}
          <div className={`mb-6 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium">{userProfile.name}</p>
                <p className="text-xs text-gray-500">{userProfile.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Area Konten Menu yang Dapat Di-scroll */}
        <div className="flex-grow overflow-y-auto -mr-6 pr-6">
          {/* Navigasi Menu Utama */}
          <nav className="space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveMenu(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeMenu === item.id
                      ? 'bg-blue-500 text-white'
                      : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Navigasi Menu Admin */}
          <div className="mt-8">
            <p className="text-xs text-gray-500 uppercase mb-2">Admin</p>
            <nav className="space-y-2">
              {adminMenuItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveMenu(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      activeMenu === item.id
                        ? 'bg-purple-500 text-white'
                        : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bagian Footer Sidebar (Tombol Upgrade) */}
        <div className="pt-4">
          {userProfile.membership === 'free' && (
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Upgrade Premium
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
