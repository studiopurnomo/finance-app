import React from 'react';
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  ChevronRight,
  Plus,
  Target,
  Brain,
  BookOpen,
  Zap,
  AlertTriangle,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

/**
 * Komponen untuk halaman Dashboard.
 * Menampilkan ringkasan keuangan, skor kesehatan, aksi cepat, dan data relevan lainnya.
 * @param {object} props - Props yang diterima dari komponen induk (App.jsx).
 */
const Dashboard = ({
  darkMode,
  financialData,
  healthScore,
  consultationSuggestions,
  transactions,
  setActiveMenu,
  setShowTransactionModal,
  setShowConsultationModal
}) => {
  return (
    <div className="space-y-6">
      {/* Bagian Ringkasan Utama */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Kartu Total Pemasukan */}
        {/* Kartu Total Pengeluaran */}
        {/* Kartu Saldo */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Pemasukan</p>
              <p className="text-2xl font-bold text-green-500">
                Rp {financialData.totalIncome.toLocaleString('id-ID')}
              </p>
            </div>
            <ArrowUpRight className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Pengeluaran</p>
              <p className="text-2xl font-bold text-red-500">
                Rp {financialData.totalExpense.toLocaleString('id-ID')}
              </p>
            </div>
            <ArrowDownRight className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Saldo</p>
              <p className="text-2xl font-bold text-blue-500">
                Rp {financialData.balance.toLocaleString('id-ID')}
              </p>
            </div>
            <Wallet className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Skor Kesehatan Keuangan */}
      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-lg font-semibold mb-4">Financial Health Score</h3>
        <div className="flex items-center space-x-4">
          <div className="relative w-32 h-32">
            <svg className="transform -rotate-90 w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke={darkMode ? '#374151' : '#e5e7eb'}
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke={healthScore > 70 ? '#10b981' : healthScore > 40 ? '#f59e0b' : '#ef4444'}
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${(healthScore / 100) * 351.86} 351.86`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold">{healthScore}</span>
            </div>
          </div>
          <div className="flex-1">
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {healthScore > 70 ? 'Kesehatan keuangan Anda sangat baik!' :
               healthScore > 40 ? 'Kesehatan keuangan Anda cukup baik, ada ruang untuk perbaikan.' :
               'Kesehatan keuangan perlu perhatian lebih.'}
            </p>
            <button
              onClick={() => setShowConsultationModal(true)}
              className="mt-2 text-blue-500 hover:text-blue-600 font-medium flex items-center"
            >
              Dapatkan Saran <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Tombol Aksi Cepat */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => setShowTransactionModal(true)}
          className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-lg transition-all`}
        >
          <Plus className="w-8 h-8 text-blue-500 mb-2" />
          <p className="text-sm font-medium">Tambah Transaksi</p>
        </button>

        <button
          onClick={() => setActiveMenu('budget')}
          className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-lg transition-all`}
        >
          <Target className="w-8 h-8 text-green-500 mb-2" />
          <p className="text-sm font-medium">Atur Budget</p>
        </button>

        <button
          onClick={() => setShowConsultationModal(true)}
          className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-lg transition-all`}
        >
          <Brain className="w-8 h-8 text-purple-500 mb-2" />
          <p className="text-sm font-medium">Konsultasi AI</p>
        </button>

        <button
          onClick={() => setActiveMenu('education')}
          className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-lg transition-all`}
        >
          <BookOpen className="w-8 h-8 text-orange-500 mb-2" />
          <p className="text-sm font-medium">Tips Keuangan</p>
        </button>
      </div>

      {/* Saran dari AI */}
      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Saran Keuangan Otomatis</h3>
          <Zap className="w-5 h-5 text-yellow-500" />
        </div>
        <div className="space-y-3">
          {consultationSuggestions.map(suggestion => (
            <div
              key={suggestion.id}
              className={`p-4 rounded-lg border ${
                suggestion.type === 'warning' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                suggestion.type === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              }`}
            >
              <div className="flex items-start space-x-3">
                {suggestion.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" /> :
                 suggestion.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" /> :
                 <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />}
                <div className="flex-1">
                  <p className="font-medium">{suggestion.title}</p>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {suggestion.message}
                  </p>
                  <button className="text-sm font-medium text-blue-500 hover:text-blue-600 mt-2">
                    {suggestion.action} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daftar Transaksi Terakhir */}
      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Transaksi Terakhir</h3>
          <button
            onClick={() => setActiveMenu('transactions')}
            className="text-blue-500 hover:text-blue-600 text-sm font-medium"
          >
            Lihat Semua
          </button>
        </div>
        <div className="space-y-3">
          {transactions.slice(0, 5).map(transaction => (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'income' ?
                    <ArrowUpRight className="w-5 h-5 text-green-600" /> :
                    <ArrowDownRight className="w-5 h-5 text-red-600" />
                  }
                </div>
                <div>
                  <p className="font-medium">{transaction.category}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {transaction.date}
                  </p>
                </div>
              </div>
              <p className={`font-semibold ${
                transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
              }`}>
                {transaction.type === 'income' ? '+' : '-'} Rp {transaction.amount.toLocaleString('id-ID')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
