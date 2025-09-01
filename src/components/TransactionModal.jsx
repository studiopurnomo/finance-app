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

/**
 * Komponen Modal untuk menambah atau mengedit transaksi.
 */
const TransactionModal = ({
  darkMode,
  setShowTransactionModal,
  transactionType,
  setTransactionType,
  categories
}) => {
  // Di sini Anda akan menambahkan logika untuk menangani state form dan submit
  // const [amount, setAmount] = useState('');
  // const [selectedCategory, setSelectedCategory] = useState(null);
  // ... etc

  const handleSave = () => {
    // 1. Kumpulkan data dari state form
    // 2. Panggil fungsi API `addTransaction`
    // 3. Jika berhasil, panggil `refreshTransactions()` dari props
    // 4. Tutup modal `setShowTransactionModal(false)`
    console.log("Menyimpan transaksi...");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl w-full max-w-md flex flex-col max-h-[90vh]`}>
        {/* Header Modal */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Tambah Transaksi</h3>
            <button onClick={() => setShowTransactionModal(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Konten Form yang Dapat Di-scroll */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {/* Pilihan Tipe Transaksi */}
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

          {/* Input Jumlah */}
          <div>
            <label className="block text-sm font-medium mb-2">Jumlah</label>
            <input
              type="number"
              placeholder="0"
              className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            />
          </div>

          {/* Pilihan Kategori */}
          <div>
            <label className="block text-sm font-medium mb-2">Kategori</label>
            <div className="grid grid-cols-4 gap-2">
              {categories[transactionType].map(category => {
                const CategoryIcon = category.icon;
                return (
                  <button
                    key={category.id}
                    className={`p-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 flex flex-col items-center justify-center gap-1`}
                  >
                    <div className={`w-8 h-8 rounded-full ${category.color} flex items-center justify-center`}>
                      <CategoryIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs text-center">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Input Keterangan */}
          <div>
            <label className="block text-sm font-medium mb-2">Keterangan</label>
            <input
              type="text"
              placeholder="Tambahkan catatan..."
              className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            />
          </div>

          {/* Tombol Upload Struk */}
          <div>
            <label className="block text-sm font-medium mb-2">Upload Struk (Opsional)</label>
            <button className={`w-full p-4 border-2 border-dashed rounded-lg flex items-center justify-center gap-2 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
              <Camera className="w-5 h-5" />
              <span>Foto/Upload Struk</span>
            </button>
          </div>
        </div>

        {/* Footer Modal dengan Tombol Aksi */}
        <div className="p-6 border-t">
          <button
            onClick={handleSave}
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold"
          >
            Simpan Transaksi
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
