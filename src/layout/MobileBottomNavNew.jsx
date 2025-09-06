import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FileText, Plus, Brain, Settings } from 'lucide-react';

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    return location.pathname === path;
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-5 py-2">
        <button
          onClick={() => navigate('/dashboard')}
          className={`flex flex-col items-center py-2 px-1 ${
            isActive('/dashboard') ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </button>
        
        <button
          onClick={() => navigate('/transactions')}
          className={`flex flex-col items-center py-2 px-1 ${
            isActive('/transactions') ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <FileText className="w-6 h-6" />
          <span className="text-xs mt-1">Transaksi</span>
        </button>
        
        <button
          onClick={() => console.log('Add transaction')}
          className="flex flex-col items-center py-2 px-1"
        >
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center -mt-6 shadow-lg">
            <Plus className="w-6 h-6 text-white" />
          </div>
        </button>
        
        <button
          onClick={() => navigate('/consultation')}
          className={`flex flex-col items-center py-2 px-1 ${
            isActive('/consultation') ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <Brain className="w-6 h-6" />
          <span className="text-xs mt-1">Konsultasi</span>
        </button>
        
        <button
          onClick={() => navigate('/settings')}
          className={`flex flex-col items-center py-2 px-1 ${
            isActive('/settings') ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <Settings className="w-6 h-6" />
          <span className="text-xs mt-1">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default MobileBottomNav;
