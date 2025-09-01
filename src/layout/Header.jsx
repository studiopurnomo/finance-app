import React from 'react';
import { Bell, Sun, Moon } from 'lucide-react';

const Header = ({
  darkMode,
  setDarkMode,
  userProfile,
  setShowUpgradeModal,
  activeMenu,
  menuItems,
  adminMenuItems
}) => {
  const getPageTitle = () => {
    const regularItem = menuItems.find(item => item.id === activeMenu);
    if (regularItem) return regularItem.label;
    const adminItem = adminMenuItems.find(item => item.id === activeMenu);
    if (adminItem) return adminItem.label;
    return 'Dashboard'; // Default title
  };

  return (
    <div className={`hidden md:block sticky top-0 z-30 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div className="flex items-center justify-between p-6">
        <h2 className="text-2xl font-bold">
          {getPageTitle()}
        </h2>
        <div className="flex items-center gap-4">
          <button className="relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
          <button
            onClick={() => setShowUpgradeModal(true)}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              userProfile.membership === 'premium'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            {userProfile.membership === 'premium' ? 'PREMIUM' : 'UPGRADE'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
