import React from 'react';
import { User } from 'lucide-react';

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
    <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } md:translate-x-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">FinanceApp</h1>

        {/* User Profile */}
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

        {/* Menu Items */}
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

        {/* Admin Section */}
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

        {/* Upgrade Button */}
        {userProfile.membership === 'free' && (
          <div className="absolute bottom-6 left-6 right-6">
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Upgrade Premium
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
