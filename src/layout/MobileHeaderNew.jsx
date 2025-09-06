import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { menuItems } from '../data/mockData';
import { Menu, Bell, Sun, Moon, X, User } from 'lucide-react';

const MobileHeader = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <div className="md:hidden">
        <div className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <button 
              onClick={() => setShowSidebar(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            
            <h1 className="text-xl font-bold text-gray-900">MonTrack</h1>
            
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-700" />
              </button>
              <button
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  user?.premium_status === 1
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {user?.premium_status === 1 ? 'PREMIUM' : 'FREE'}
              </button>
            </div>
          </div>
        </div>
        <div className="h-16"></div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowSidebar(false)}
          ></div>
          
          {/* Sidebar */}
          <div className="fixed top-0 left-0 bottom-0 w-80 bg-white shadow-xl transform transition-transform duration-300">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h1 className="text-xl font-bold text-gray-900">MonTrack</h1>
                <button 
                  onClick={() => setShowSidebar(false)} 
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* User Profile */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user?.full_name || user?.username || 'User'}</p>
                    <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="flex-1 overflow-y-auto p-4">
                <nav className="space-y-2">
                  {menuItems.map(item => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (item.id === 'dashboard') {
                            navigate('/dashboard');
                          } else {
                            navigate(`/${item.id}`);
                          }
                          setShowSidebar(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Icon className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700 font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Upgrade Button */}
              <div className="p-4 border-t border-gray-200">
                {user?.premium_status !== 1 && (
                  <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-200">
                    Upgrade ke Premium
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileHeader;
