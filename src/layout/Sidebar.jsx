import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { menuItems, adminMenuItems } from '../data/mockData';
import { User } from 'lucide-react';

/**
 * Komponen Sidebar untuk navigasi utama aplikasi.
 */
const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  
  // Update active menu based on current route
  useEffect(() => {
    const path = location.pathname.slice(1); // Remove leading slash
    if (path === '' || path === 'dashboard') {
      setActiveMenu('dashboard');
    } else if (path.startsWith('admin/')) {
      setActiveMenu(path.replace('/', '-')); // admin/dashboard -> admin-dashboard
    } else {
      setActiveMenu(path);
    }
  }, [location.pathname]);
  
  // Mock data for now
  const darkMode = false;
  const sidebarOpen = true;

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    // Navigate to the corresponding route
    if (menuId === 'admin-dashboard') {
      navigate('/admin/dashboard');
    } else if (menuId === 'broadcast') {
      navigate('/admin/broadcast');
    } else {
      navigate(`/${menuId}`);
    }
  };
  
  return (
    // Sidebar dengan lebar tetap untuk desktop, hidden untuk mobile
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200">
        <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-gray-900">MonTrack</h1>
          </div>

          {/* User Profile */}
          <div className="mt-5 px-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{user?.full_name || user?.username || 'User'}</p>
                  <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-5 px-2">
            <div className="space-y-1">
              {menuItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`${
                      activeMenu === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left`}
                  >
                    <Icon className={`${
                      activeMenu === item.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 h-5 w-5`} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Admin Section */}
          <div className="mt-8 px-2">
            <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Admin
            </h3>
            <div className="mt-2 space-y-1">
              {adminMenuItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`${
                      activeMenu === item.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left`}
                  >
                    <Icon className={`${
                      activeMenu === item.id ? 'text-purple-500' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 h-5 w-5`} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Upgrade Button */}
          <div className="mt-8 px-2">
            {(user?.premium_status === 0 || user?.membership === 'free') && (
              <button
                onClick={() => console.log('Show upgrade modal')}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg font-medium text-sm hover:shadow-lg transition-shadow"
              >
                Upgrade Premium
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
