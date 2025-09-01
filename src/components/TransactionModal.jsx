import React from 'react';
import {
  X,
  Plus,
  Camera,
  Coffee,
  Car,
  ShoppingCart,
  Heart,
  Film,
  FileText,
  MoreHorizontal,
  Briefcase,
  Smartphone,
  TrendingUp,
  DollarSign
} from 'lucide-react';

const TransactionModal = ({
  darkMode,
  setShowTransactionModal,
  transactionType,
  setTransactionType,
  categories
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-md`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Tambah Transaksi</h3>
          <button onClick={() => setShowTransactionModal(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setTransactionType('expense')}
              className={`flex-1 py-2 rounded-lg ${
                transactionType === 'expense'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              Pengeluaran
            </button>
            <button
              onClick={() => setTransactionType('income')}
              className={`flex-1 py-2 rounded-lg ${
                transactionType === 'income'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              Pemasukan
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Jumlah</label>
            <input
              type="number"
              placeholder="0"
              className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Kategori</label>
            <div className="grid grid-cols-3 gap-2">
              {categories[transactionType].map(category => {
                const CategoryIcon = category.icon;
                return (
                  <button
                    key={category.id}
                    className={`p-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 flex flex-col items-center gap-1`}
                  >
                    <div className={`w-10 h-10 rounded-full ${category.color} flex items-center justify-center`}>
                      <CategoryIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Keterangan</label>
            <input
              type="text"
              placeholder="Tambahkan catatan..."
              className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Upload Struk (Opsional)</label>
            <button className={`w-full p-4 border-2 border-dashed rounded-lg flex items-center justify-center gap-2 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
              <Camera className="w-5 h-5" />
              <span>Foto/Upload Struk</span>
            </button>
          </div>

          <button className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold">
            Simpan Transaksi
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
