import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  Plus, 
  Target, 
  Brain, 
  BookOpen, 
  ChevronRight,
  Zap,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Minus,
  BarChart3
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [darkMode] = useState(false);

  // Mock data
  const financialData = {
    totalIncome: 25000000,
    totalExpense: 18500000,
    balance: 6500000
  };

  const healthScore = 75;

  const consultationSuggestions = [
    {
      id: 1,
      type: 'warning',
      title: 'Pengeluaran Hiburan Tinggi',
      description: 'Pengeluaran untuk hiburan bulan ini 30% lebih tinggi dari budget. Pertimbangkan untuk mengurangi.'
    },
    {
      id: 2,
      type: 'success',
      title: 'Target Tabungan Tercapai',
      description: 'Selamat! Anda telah mencapai target tabungan bulan ini. Pertahankan kebiasaan baik ini.'
    },
    {
      id: 3,
      type: 'info',
      title: 'Investasi Saham Recommended',
      description: 'Berdasarkan profil risiko Anda, saham teknologi sedang dalam tren positif untuk investasi jangka panjang.'
    }
  ];

  const transactions = [
    {
      id: 1,
      description: 'Gaji Bulanan',
      amount: 15000000,
      type: 'income',
      category: 'Gaji',
      date: '2024-01-15'
    },
    {
      id: 2,
      description: 'Belanja Groceries',
      amount: -850000,
      type: 'expense',
      category: 'Makanan',
      date: '2024-01-14'
    },
    {
      id: 3,
      description: 'Transfer ke Tabungan',
      amount: -2000000,
      type: 'expense',
      category: 'Tabungan',
      date: '2024-01-13'
    },
    {
      id: 4,
      description: 'Freelance Project',
      amount: 3500000,
      type: 'income',
      category: 'Freelance',
      date: '2024-01-12'
    },
    {
      id: 5,
      description: 'Bayar Listrik',
      amount: -450000,
      type: 'expense',
      category: 'Utilities',
      date: '2024-01-11'
    }
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Income */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Pemasukan</p>
              <p className="text-2xl font-bold text-gray-900">
                Rp {financialData.totalIncome.toLocaleString('id-ID')}
              </p>
              <p className="text-sm text-green-600 mt-1 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                +12% dari bulan lalu
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Total Expense */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Pengeluaran</p>
              <p className="text-2xl font-bold text-gray-900">
                Rp {financialData.totalExpense.toLocaleString('id-ID')}
              </p>
              <p className="text-sm text-red-600 mt-1 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                +8% dari bulan lalu
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <ArrowDownRight className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        {/* Balance */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Saldo</p>
              <p className="text-2xl font-bold text-gray-900">
                Rp {financialData.balance.toLocaleString('id-ID')}
              </p>
              <p className="text-sm text-blue-600 mt-1 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Stabil
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Skor Kesehatan Keuangan */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Financial Health Score</h3>
        <div className="flex items-center space-x-6">
          <div className="relative w-28 h-28">
            <svg className="transform -rotate-90 w-28 h-28">
              <circle
                cx="56"
                cy="56"
                r="48"
                stroke="#f3f4f6"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="56"
                cy="56"
                r="48"
                stroke={healthScore > 70 ? '#10b981' : healthScore > 40 ? '#f59e0b' : '#ef4444'}
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(healthScore / 100) * 301.59} 301.59`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">{healthScore}</span>
            </div>
          </div>
          <div className="flex-1">
            <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mb-2 ${
              healthScore > 70 ? 'bg-green-100 text-green-800' :
              healthScore > 40 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {healthScore > 70 ? 'Sangat Baik' : healthScore > 40 ? 'Cukup Baik' : 'Perlu Perhatian'}
            </div>
            <p className="text-gray-600 text-sm mb-3">
              {healthScore > 70 ? 'Kesehatan keuangan Anda sangat baik! Pertahankan kebiasaan menabung dan pengelolaan yang bijak.' :
               healthScore > 40 ? 'Kesehatan keuangan Anda cukup baik, ada ruang untuk perbaikan dalam pengeluaran dan tabungan.' :
               'Kesehatan keuangan perlu perhatian lebih. Mulai dengan mengatur budget dan mengurangi pengeluaran tidak penting.'}
            </p>
            <button
              onClick={() => console.log('Show consultation modal')}
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center text-sm transition-colors"
            >
              Dapatkan Saran Personal <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Aksi Cepat</h3>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
            Lihat Semua
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => console.log('Show transaction modal')}
            className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-md transition-all hover:scale-105"
          >
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-3">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-blue-700">Tambah Transaksi</span>
          </button>

          <button
            onClick={() => navigate('/budget')}
            className="flex flex-col items-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-md transition-all hover:scale-105"
          >
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-3">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-green-700">Atur Budget</span>
          </button>

          <button
            onClick={() => console.log('Show consultation modal')}
            className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-md transition-all hover:scale-105"
          >
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-3">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-purple-700">Konsultasi AI</span>
          </button>

          <button
            onClick={() => navigate('/education')}
            className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 hover:shadow-md transition-all hover:scale-105"
          >
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-3">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-orange-700">Tips Keuangan</span>
          </button>
        </div>
      </div>

      {/* AI Financial Insights */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Saran Keuangan Otomatis</h3>
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-gray-500">AI Powered</span>
          </div>
        </div>
        <div className="space-y-4">
          {consultationSuggestions.map(suggestion => (
            <div
              key={suggestion.id}
              className={`p-4 rounded-xl border-l-4 ${
                suggestion.type === 'warning' ? 'border-l-yellow-500 bg-yellow-50' :
                suggestion.type === 'success' ? 'border-l-green-500 bg-green-50' :
                'border-l-blue-500 bg-blue-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  suggestion.type === 'warning' ? 'bg-yellow-100' :
                  suggestion.type === 'success' ? 'bg-green-100' :
                  'bg-blue-100'
                }`}>
                  {suggestion.type === 'warning' ? (
                    <AlertTriangle className={`w-5 h-5 ${
                      suggestion.type === 'warning' ? 'text-yellow-600' :
                      suggestion.type === 'success' ? 'text-green-600' :
                      'text-blue-600'
                    }`} />
                  ) : suggestion.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-medium text-sm ${
                    suggestion.type === 'warning' ? 'text-yellow-800' :
                    suggestion.type === 'success' ? 'text-green-800' :
                    'text-blue-800'
                  }`}>
                    {suggestion.title}
                  </p>
                  <p className={`text-sm mt-1 ${
                    suggestion.type === 'warning' ? 'text-yellow-700' :
                    suggestion.type === 'success' ? 'text-green-700' :
                    'text-blue-700'
                  }`}>
                    {suggestion.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-md transition-all">
          Lihat Saran Lengkap
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Transaksi Terakhir</h3>
          <button
            onClick={() => navigate('/transactions')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            Lihat Semua
          </button>
        </div>
        <div className="space-y-3">
          {transactions.slice(0, 5).map(transaction => (
            <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowUpRight className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{transaction.description}</p>
                  <p className="text-xs text-gray-500">{transaction.category} • {transaction.date}</p>
                </div>
              </div>
              <p className={`font-semibold text-sm ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : ''}Rp {Math.abs(transaction.amount).toLocaleString('id-ID')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
