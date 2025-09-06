import React, { useState, useContext } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileHeader from './MobileHeader';
import MobileBottomNav from './MobileBottomNav';
import { AuthContext } from '../context/AuthContext';
import UpgradeModal from '../components/UpgradeModal';
import ConsultationModal from '../components/ConsultationModal';

const MainLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const { user } = useContext(AuthContext);

  // Mock data, akan diganti dengan data dari API nanti
  const userProfile = {
    name: user?.full_name || 'Pengguna',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    membership: user?.premium_status ? 'premium' : 'free',
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'transactions', label: 'Transaksi' },
    { id: 'budget', label: 'Anggaran' },
    { id: 'community', label: 'Komunitas' },
    { id: 'education', label: 'Edukasi' },
    { id: 'referral', label: 'Referral' },
    { id: 'settings', label: 'Pengaturan' },
  ];

  const adminMenuItems = [
    { id: 'admin-dashboard', label: 'Admin Dashboard' },
    { id: 'broadcast', label: 'Broadcast' },
  ];


  return (
    <div className={`${darkMode ? 'dark' : ''} font-sans`}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar
          userProfile={userProfile}
          setShowUpgradeModal={setShowUpgradeModal}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          menuItems={menuItems}
          adminMenuItems={adminMenuItems}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            userProfile={userProfile}
            setShowUpgradeModal={setShowUpgradeModal}
            activeMenu={activeMenu}
            menuItems={menuItems}
            adminMenuItems={adminMenuItems}
          />
          <MobileHeader
            userProfile={userProfile}
            setShowUpgradeModal={setShowUpgradeModal}
          />

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6 py-8">
              {children}
            </div>
          </main>

          <MobileBottomNav
             activeMenu={activeMenu}
             setActiveMenu={setActiveMenu}
          />
        </div>
      </div>

      {showUpgradeModal && <UpgradeModal setShowUpgradeModal={setShowUpgradeModal} />}
      {showConsultationModal && <ConsultationModal setShowConsultationModal={setShowConsultationModal} />}
    </div>
  );
};

export default MainLayout;
