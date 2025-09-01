import React from 'react';
import {
  Filter,
  Download,
  Plus,
  Search,
  TrendingUp,
  TrendingDown,
  MoreHorizontal
} from 'lucide-react';

const Transactions = ({ darkMode, transactions, setShowTransactionModal }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">Riwayat Transaksi</h2>
        <div className="flex flex-wrap gap-2">
          <button className={`px-4 py-2 rounded-lg flex items-center gap-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className={`px-4 py-2 rounded-lg flex items-center gap-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={() => setShowTransactionModal(true)}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white flex items-center gap-2 hover:bg-blue-600"
          >
            <Plus className="w-4 h-4" />
            Tambah
          </button>
        </div>
      </div>

      <div className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg overflow-hidden`}>
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari transaksi..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'
              }`}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className="px-4 py-3 text-left">Tanggal</th>
                <th className="px-4 py-3 text-left">Kategori</th>
                <th className="px-4 py-3 text-left">Keterangan</th>
                <th className="px-4 py-3 text-right">Jumlah</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <td className="px-4 py-3">{transaction.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'income' ?
                          <TrendingUp className="w-4 h-4 text-green-600" /> :
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        }
                      </div>
                      {transaction.category}
                    </div>
                  </td>
                  <td className="px-4 py-3">{transaction.note}</td>
                  <td className={`px-4 py-3 text-right font-semibold ${
                    transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'} Rp {transaction.amount.toLocaleString('id-ID')}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-blue-500 hover:text-blue-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
