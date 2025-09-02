import React, { useState, useEffect } from 'react';
import {
  X,
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
import { addTransaction, updateTransaction } from '../api/apiService';

/**
 * Komponen Modal untuk menambah atau mengedit transaksi.
 */
const TransactionModal = ({
  darkMode,
  setShowTransactionModal,
  transactionType,
  setTransactionType,
  categories,
  editingTransaction, // null jika 'tambah', berisi objek transaksi jika 'edit'
  refreshTransactions
}) => {
  // State untuk mengelola input form
  const [amount, setAmount] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default ke hari ini

  // useEffect untuk mengisi form saat mode edit
  useEffect(() => {
    if (editingTransaction) {
      setTransactionType(editingTransaction.type);
      setAmount(editingTransaction.amount);
      const category = categories[editingTransaction.type].find(c => c.name === editingTransaction.category);
      setSelectedCategoryId(category ? category.id : null);
      setNote(editingTransaction.note);
      setDate(editingTransaction.date);
    } else {
      // Reset form jika mode tambah
      setAmount('');
      setSelectedCategoryId(null);
      setNote('');
      setDate(new Date().toISOString().split('T')[0]);
    }
  }, [editingTransaction, categories]);

  const handleSave = async () => {
    if (!amount || !selectedCategoryId) {
      alert('Jumlah dan kategori tidak boleh kosong!');
      return;
    }

    const category = categories[transactionType].find(c => c.id === selectedCategoryId);
    const transactionData = {
      amount: parseFloat(amount),
      category: category.name, // Mengirim nama kategori sesuai data yang ada
      type: transactionType,
      note,
      transaction_date: date, // Sesuaikan dengan nama kolom di DB
    };

    try {
      if (editingTransaction) {
        // Mode Edit
        await updateTransaction(editingTransaction.id, transactionData);
        alert('Transaksi berhasil diperbarui!');
      } else {
        // Mode Tambah
        await addTransaction(transactionData);
        alert('Transaksi berhasil ditambahkan!');
      }
      await refreshTransactions();
      setShowTransactionModal(false);
    } catch (error) {
      console.error('Gagal menyimpan transaksi:', error);
      alert('Gagal menyimpan transaksi.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl w-full max-w-md flex flex-col max-h-[90vh]`}>
        {/* Header Modal */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{editingTransaction ? 'Edit Transaksi' : 'Tambah Transaksi'}</h3>
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
              disabled={!!editingTransaction} // Nonaktifkan jika mode edit
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
              disabled={!!editingTransaction} // Nonaktifkan jika mode edit
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
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            />
          </div>

          {/* Input Tanggal */}
          <div>
            <label className="block text-sm font-medium mb-2">Tanggal</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
                    onClick={() => setSelectedCategoryId(category.id)}
                    className={`p-2 rounded-lg border-2 flex flex-col items-center justify-center gap-1 ${
                      selectedCategoryId === category.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-gray-200 dark:border-gray-600'
                    }`}
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
              value={note}
              onChange={(e) => setNote(e.target.value)}
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
            {editingTransaction ? 'Simpan Perubahan' : 'Simpan Transaksi'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
