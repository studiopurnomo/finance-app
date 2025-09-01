import React from 'react';
import { Home, FileText, Plus, Brain, Settings } from 'lucide-react';

const MobileBottomNav = ({ activeMenu, setActiveMenu, setShowTransactionModal }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg">
      <div className="flex justify-around py-2">
        <button
          onClick={() => setActiveMenu('dashboard')}
          className={`flex flex-col items-center p-2 ${activeMenu === 'dashboard' ? 'text-blue-500' : ''}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </button>
        <button
          onClick={() => setActiveMenu('transactions')}
          className={`flex flex-col items-center p-2 ${activeMenu === 'transactions' ? 'text-blue-500' : ''}`}
        >
          <FileText className="w-6 h-6" />
          <span className="text-xs">Transaksi</span>
        </button>
        <button
          onClick={() => setShowTransactionModal(true)}
          className="flex flex-col items-center p-2"
        >
          <div className="bg-blue-500 rounded-full p-3">
            <Plus className="w-6 h-6 text-white" />
          </div>
        </button>
        <button
          onClick={() => setActiveMenu('consultation')}
          className={`flex flex-col items-center p-2 ${activeMenu === 'consultation' ? 'text-blue-500' : ''}`}
        >
          <Brain className="w-6 h-6" />
          <span className="text-xs">Konsultasi</span>
        </button>
        <button
          onClick={() => setActiveMenu('settings')}
          className={`flex flex-col items-center p-2 ${activeMenu === 'settings' ? 'text-blue-500' : ''}`}
        >
          <Settings className="w-6 h-6" />
          <span className="text-xs">Setting</span>
        </button>
      </div>
    </div>
  );
};

export default MobileBottomNav;
