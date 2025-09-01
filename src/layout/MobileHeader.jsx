import React from 'react';
import { Menu, Sun, Moon } from 'lucide-react';

const MobileHeader = ({
  darkMode,
  setDarkMode,
  setSidebarOpen,
  userProfile,
  setShowUpgradeModal
}) => {
  return (
    <div className="md:hidden">
      <div className={`fixed top-0 left-0 right-0 z-40 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="flex items-center justify-between p-4">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">FinanceApp</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setShowUpgradeModal(true)}
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                userProfile.membership === 'premium'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              {userProfile.membership === 'premium' ? 'PREMIUM' : 'FREE'}
            </button>
          </div>
        </div>
      </div>
      <div className="h-16"></div> {/* Spacer for fixed header */}
    </div>
  );
};

export default MobileHeader;
