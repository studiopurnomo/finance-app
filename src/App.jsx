import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  CreditCard, 
  PieChart, 
  Users, 
  BookOpen, 
  Settings,
  Menu,
  X,
  Plus,
  Camera,
  Download,
  TrendingUp,
  TrendingDown,
  Target,
  Bell,
  ChevronRight,
  Sun,
  Moon,
  Home,
  FileText,
  Gift,
  Shield,
  Brain,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Search,
  User,
  LogOut,
  Star,
  MessageSquare,
  Share2,
  Award,
  Zap,
  HelpCircle,
  BarChart3,
  PiggyBank,
  AlertTriangle,
  Coffee,
  ShoppingCart,
  Car,
  Heart,
  Briefcase,
  Film,
  Smartphone,
  MoreHorizontal
} from 'lucide-react';

const FinanceApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [transactionType, setTransactionType] = useState('expense');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  
  // Demo data
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    membership: 'free',
    transactionCount: 450,
    joinDate: '2024-01-15'
  });

  const [financialData, setFinancialData] = useState({
    totalIncome: 15000000,
    totalExpense: 12500000,
    balance: 2500000,
    monthlyBudget: 13000000,
    savingsGoal: 5000000,
    currentSavings: 1500000
  });

  const categories = {
    expense: [
      { id: 1, name: 'Makanan', icon: Coffee, color: 'bg-orange-500' },
      { id: 2, name: 'Transportasi', icon: Car, color: 'bg-blue-500' },
      { id: 3, name: 'Belanja', icon: ShoppingCart, color: 'bg-purple-500' },
      { id: 4, name: 'Kesehatan', icon: Heart, color: 'bg-red-500' },
      { id: 5, name: 'Hiburan', icon: Film, color: 'bg-pink-500' },
      { id: 6, name: 'Tagihan', icon: FileText, color: 'bg-gray-500' },
      { id: 7, name: 'Lainnya', icon: MoreHorizontal, color: 'bg-indigo-500' }
    ],
    income: [
      { id: 8, name: 'Gaji', icon: Briefcase, color: 'bg-green-500' },
      { id: 9, name: 'Freelance', icon: Smartphone, color: 'bg-teal-500' },
      { id: 10, name: 'Investasi', icon: TrendingUp, color: 'bg-emerald-500' },
      { id: 11, name: 'Lainnya', icon: DollarSign, color: 'bg-cyan-500' }
    ]
  };

  const transactions = [
    { id: 1, type: 'expense', category: 'Makanan', amount: 125000, date: '2025-01-22', note: 'Makan siang meeting' },
    { id: 2, type: 'income', category: 'Gaji', amount: 15000000, date: '2025-01-20', note: 'Gaji bulanan' },
    { id: 3, type: 'expense', category: 'Transportasi', amount: 250000, date: '2025-01-21', note: 'Bensin mobil' },
    { id: 4, type: 'expense', category: 'Belanja', amount: 1500000, date: '2025-01-19', note: 'Belanja bulanan' },
    { id: 5, type: 'expense', category: 'Tagihan', amount: 500000, date: '2025-01-15', note: 'Listrik & Internet' }
  ];

  const consultationSuggestions = [
    {
      id: 1,
      type: 'warning',
      title: 'Pengeluaran Makan Meningkat',
      message: 'Pengeluaran makan bulan ini meningkat 20% dari bulan lalu. Pertimbangkan meal-prep untuk hemat hingga 30%.',
      action: 'Lihat Tips Hemat',
      priority: 'high'
    },
    {
      id: 2,
      type: 'success',
      title: 'Cashflow Positif!',
      message: 'Saldo akhir bulan positif Rp 2.5jt! Alokasikan 20% ke investasi reksadana untuk pertumbuhan jangka panjang.',
      action: 'Mulai Investasi',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'info',
      title: 'Target Tabungan',
      message: 'Anda sudah mencapai 30% dari target tabungan. Dengan pola saat ini, target akan tercapai dalam 4 bulan.',
      action: 'Lihat Simulasi',
      priority: 'low'
    }
  ];

  const paymentMethods = [
    { id: 'ovo', name: 'OVO', icon: '💳' },
    { id: 'gopay', name: 'GoPay', icon: '💰' },
    { id: 'dana', name: 'Dana', icon: '💸' },
    { id: 'shopeepay', name: 'ShopeePay', icon: '🛍️' },
    { id: 'qris', name: 'QRIS', icon: '📱' },
    { id: 'va', name: 'Virtual Account', icon: '🏦' },
    { id: 'card', name: 'Kartu Kredit/Debit', icon: '💳' }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'transactions', label: 'Transaksi', icon: FileText },
    { id: 'budget', label: 'Budget', icon: Target },
    { id: 'consultation', label: 'Konsultasi', icon: Brain },
    { id: 'education', label: 'Edukasi', icon: BookOpen },
    { id: 'community', label: 'Komunitas', icon: Users },
    { id: 'referral', label: 'Referral', icon: Gift },
    { id: 'settings', label: 'Pengaturan', icon: Settings }
  ];

  // Financial Health Score Calculation
  const calculateHealthScore = () => {
    const incomeExpenseRatio = financialData.totalIncome / financialData.totalExpense;
    const savingsRate = financialData.currentSavings / financialData.totalIncome;
    const budgetCompliance = financialData.totalExpense <= financialData.monthlyBudget ? 1 : 0.7;
    
    const score = Math.round((incomeExpenseRatio * 30 + savingsRate * 40 + budgetCompliance * 30));
    return Math.min(score, 100);
  };

  const healthScore = calculateHealthScore();

  // Admin Menu Items
  const adminMenuItems = [
    { id: 'admin-dashboard', label: 'Admin Dashboard', icon: BarChart3 },
    { id: 'broadcast', label: 'Broadcast', icon: Bell },
    { id: 'members', label: 'Member Management', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'content', label: 'Content Management', icon: FileText }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      {/* Financial Health Score */}
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

      {/* Quick Actions */}
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

      {/* AI Suggestions */}
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

      {/* Recent Transactions */}
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

  const renderTransactions = () => (
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

  const renderBudget = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Pengaturan Budget</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className="text-lg font-semibold mb-4">Simulasi Goal Keuangan</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Pilih Goal</label>
              <select className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <option>Dana Darurat (6x pengeluaran)</option>
                <option>DP Rumah</option>
                <option>Liburan Impian</option>
                <option>Pendidikan Anak</option>
                <option>Pensiun Dini</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Target Amount</label>
              <input 
                type="number" 
                placeholder="50000000"
                className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              />
            </div>
            <button className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
              Hitung Simulasi
            </button>
          </div>
        </div>

        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className="text-lg font-semibold mb-4">Financial Health Check</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Rasio Income/Expense</span>
              </div>
              <span className="font-semibold text-green-600">Baik</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                <span>Dana Darurat</span>
              </div>
              <span className="font-semibold text-yellow-600">Perlu Ditingkatkan</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Tingkat Tabungan</span>
              </div>
              <span className="font-semibold text-green-600">Sangat Baik</span>
            </div>
            <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-4">
              Lihat Detail Analisis
            </button>
          </div>
        </div>
      </div>

      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-lg font-semibold mb-4">Riwayat Konsultasi</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-purple-500 pl-4">
            <p className="font-medium">Strategi Menabung untuk DP Rumah</p>
            <p className="text-sm text-gray-500">20 Jan 2025 • 15 rekomendasi</p>
            <button className="text-purple-500 text-sm mt-1">Lihat Detail →</button>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-medium">Optimasi Pengeluaran Bulanan</p>
            <p className="text-sm text-gray-500">15 Jan 2025 • 8 rekomendasi</p>
            <button className="text-blue-500 text-sm mt-1">Lihat Detail →</button>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <p className="font-medium">Rencana Investasi Pemula</p>
            <p className="text-sm text-gray-500">10 Jan 2025 • 12 rekomendasi</p>
            <button className="text-green-500 text-sm mt-1">Lihat Detail →</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Edukasi Keuangan</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="h-40 bg-gradient-to-br from-blue-400 to-blue-600"></div>
          <div className="p-4">
            <h3 className="font-semibold mb-2">Investasi untuk Pemula</h3>
            <p className="text-sm text-gray-500 mb-3">Pelajari dasar-dasar investasi yang aman dan menguntungkan</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-500">10 menit baca</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="h-40 bg-gradient-to-br from-green-400 to-green-600"></div>
          <div className="p-4">
            <h3 className="font-semibold mb-2">Budgeting 50/30/20</h3>
            <p className="text-sm text-gray-500 mb-3">Metode efektif mengatur keuangan bulanan Anda</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-500">8 menit baca</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="h-40 bg-gradient-to-br from-purple-400 to-purple-600"></div>
          <div className="p-4">
            <h3 className="font-semibold mb-2">Dana Darurat</h3>
            <p className="text-sm text-gray-500 mb-3">Pentingnya memiliki dana darurat dan cara memulainya</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-500">12 menit baca</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-lg font-semibold mb-4">Video Tutorial</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-4">
            <div className="w-32 h-20 bg-red-100 rounded-lg flex items-center justify-center">
              <Film className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h4 className="font-medium">Cara Menabung Efektif</h4>
              <p className="text-sm text-gray-500">15 menit • 2.3k views</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-32 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
              <Film className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h4 className="font-medium">Memahami Reksadana</h4>
              <p className="text-sm text-gray-500">20 menit • 1.8k views</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommunity = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Komunitas</h2>
      
      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-lg font-semibold mb-4">Forum Diskusi</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Tips Hemat Belanja Bulanan</p>
                  <p className="text-sm text-gray-500">oleh Sarah • 2 jam lalu</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" /> 24
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" /> 156
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm">Hai semua! Mau share tips hemat belanja bulanan yang berhasil ngurangin pengeluaran sampe 30%...</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Pengalaman Investasi Reksadana Pertama</p>
                  <p className="text-sm text-gray-500">oleh Budi • 5 jam lalu</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" /> 45
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" /> 289
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm">Setelah 6 bulan invest di reksadana, ini hasil dan pembelajaran saya...</p>
            </div>
          </div>
        </div>
        
        <button className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Lihat Semua Diskusi
        </button>
      </div>
    </div>
  );

  const renderReferral = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Program Referral</h2>
      
      <div className={`rounded-xl p-8 text-center ${darkMode ? 'bg-gradient-to-br from-yellow-900 to-orange-900' : 'bg-gradient-to-br from-yellow-400 to-orange-500'} text-white shadow-lg`}>
        <Gift className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Ajak Teman, Dapat Reward!</h3>
        <p className="mb-6">Dapatkan 1 bulan gratis untuk setiap teman yang upgrade ke premium</p>
        <div className={`inline-block px-6 py-3 ${darkMode ? 'bg-gray-800' : 'bg-white'} text-gray-800 rounded-lg font-mono`}>
          KODE: FINANCE2025
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`rounded-xl p-6 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <Share2 className="w-12 h-12 mx-auto mb-3 text-blue-500" />
          <h4 className="font-semibold mb-2">Bagikan Kode</h4>
          <p className="text-sm text-gray-500">Share kode referral ke teman-teman Anda</p>
        </div>
        
        <div className={`rounded-xl p-6 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <Users className="w-12 h-12 mx-auto mb-3 text-green-500" />
          <h4 className="font-semibold mb-2">Teman Daftar</h4>
          <p className="text-sm text-gray-500">Teman daftar dan upgrade ke premium</p>
        </div>
        
        <div className={`rounded-xl p-6 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <Award className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
          <h4 className="font-semibold mb-2">Dapat Reward</h4>
          <p className="text-sm text-gray-500">Nikmati 1 bulan premium gratis</p>
        </div>
      </div>
      
      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-lg font-semibold mb-4">Statistik Referral</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-500">5</p>
            <p className="text-sm text-gray-500">Total Referral</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-500">3</p>
            <p className="text-sm text-gray-500">Berhasil Upgrade</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-500">3</p>
            <p className="text-sm text-gray-500">Bulan Gratis</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Pengaturan</h2>
      
      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-lg font-semibold mb-4">Profil</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nama</label>
            <input 
              type="text" 
              value={userProfile.name}
              className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input 
              type="email" 
              value={userProfile.email}
              className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            />
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Simpan Perubahan
          </button>
        </div>
      </div>
      
      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-lg font-semibold mb-4">Preferensi</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Mode Gelap</p>
              <p className="text-sm text-gray-500">Gunakan tema gelap</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-gray-300'} relative transition-colors`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notifikasi Push</p>
              <p className="text-sm text-gray-500">Terima notifikasi saran keuangan</p>
            </div>
            <button className="w-12 h-6 rounded-full bg-blue-500 relative">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 translate-x-6" />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Mingguan</p>
              <p className="text-sm text-gray-500">Ringkasan keuangan mingguan</p>
            </div>
            <button className="w-12 h-6 rounded-full bg-blue-500 relative">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 translate-x-6" />
            </button>
          </div>
        </div>
      </div>
      
      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-lg font-semibold mb-4">Keamanan</h3>
        <div className="space-y-4">
          <button className="w-full py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
            Ubah Password
          </button>
          <button className="w-full py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
            Aktifkan 2FA
          </button>
          <button className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  // Admin Pages
  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Users</p>
              <p className="text-2xl font-bold">12,543</p>
              <p className="text-sm text-green-500">+12% dari bulan lalu</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Premium Users</p>
              <p className="text-2xl font-bold">3,287</p>
              <p className="text-sm text-green-500">+25% dari bulan lalu</p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Revenue</p>
              <p className="text-2xl font-bold">Rp 278M</p>
              <p className="text-sm text-green-500">+18% dari bulan lalu</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Today</p>
              <p className="text-2xl font-bold">8,921</p>
              <p className="text-sm text-blue-500">Live now</p>
            </div>
            <Zap className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            [Chart: User growth over time]
          </div>
        </div>
        
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className="text-lg font-semibold mb-4">Revenue Breakdown</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            [Chart: Revenue by subscription type]
          </div>
        </div>
      </div>
    </div>
  );

  const renderBroadcast = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Broadcast Message</h2>
      
      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Target Audience</label>
            <select className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <option>All Users</option>
              <option>Premium Users Only</option>
              <option>Free Users Only</option>
              <option>Inactive Users (30+ days)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Message Type</label>
            <select className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <option>Push Notification</option>
              <option>Email</option>
              <option>In-App Message</option>
              <option>All Channels</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <input 
              type="text" 
              placeholder="Promo Spesial Akhir Bulan!"
              className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea 
              rows="6"
              placeholder="Tulis pesan Anda di sini..."
              className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            />
          </div>
          
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Send Now
            </button>
            <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
              Schedule
            </button>
          </div>
        </div>
      </div>
      
      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-lg font-semibold mb-4">Recent Broadcasts</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Promo Premium 50% Off</p>
              <p className="text-sm text-gray-500">Sent to Free Users • 2 days ago</p>
            </div>
            <div className="text-sm text-gray-500">
              <p>Open Rate: 45%</p>
              <p>Click Rate: 12%</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Tips Keuangan Mingguan</p>
              <p className="text-sm text-gray-500">Sent to All Users • 7 days ago</p>
            </div>
            <div className="text-sm text-gray-500">
              <p>Open Rate: 62%</p>
              <p>Click Rate: 23%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Modals
  const TransactionModal = () => (
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

  const ConsultationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-2xl my-8`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Konsultasi Keuangan AI</h3>
          <button onClick={() => setShowConsultationModal(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-6">
          <div className={`rounded-lg p-4 ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
            <h4 className="font-semibold mb-2">Analisis Keuangan Anda</h4>
            <p className="text-sm">Berdasarkan data transaksi 3 bulan terakhir:</p>
          </div>
          
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4">
              <h5 className="font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                Pengeluaran Makan Meningkat
              </h5>
              <p className="text-sm mt-1">
                Pengeluaran untuk kategori makanan meningkat 20% (Rp 2.5jt → Rp 3jt) dibanding bulan lalu.
              </p>
              <div className="mt-3 space-y-2">
                <p className="font-medium text-sm">Rekomendasi:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Pertimbangkan meal prep di akhir pekan (hemat 30-40%)</li>
                  <li>• Manfaatkan promo/diskon aplikasi food delivery</li>
                  <li>• Batasi makan di luar maksimal 2x seminggu</li>
                  <li>• Alokasikan budget harian Rp 100rb untuk makan</li>
                </ul>
              </div>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <h5 className="font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Cashflow Positif
              </h5>
              <p className="text-sm mt-1">
                Saldo bulanan Anda positif Rp 2.5jt. Ini adalah kesempatan bagus untuk investasi!
              </p>
              <div className="mt-3 space-y-2">
                <p className="font-medium text-sm">Rekomendasi:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Alokasikan 20% (Rp 500rb) ke reksadana pasar uang</li>
                  <li>• Sisihkan 30% (Rp 750rb) untuk dana darurat</li>
                  <li>• Pertimbangkan deposito untuk dana jangka menengah</li>
                  <li>• Pelajari investasi saham dengan modal kecil dulu</li>
                </ul>
              </div>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <h5 className="font-semibold flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Progress Target Tabungan
              </h5>
              <p className="text-sm mt-1">
                Target tabungan Rp 5jt tercapai 30% (Rp 1.5jt). Dengan pola saat ini, target tercapai dalam 4 bulan.
              </p>
              <div className="mt-3 space-y-2">
                <p className="font-medium text-sm">Rekomendasi:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Naikkan alokasi tabungan jadi Rp 1jt/bulan</li>
                  <li>• Otomatisasi transfer di awal bulan</li>
                  <li>• Cari side income untuk percepat target</li>
                  <li>• Review dan kurangi pengeluaran tidak penting</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h4 className="font-semibold mb-2">Action Plan Bulan Ini</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Kurangi makan di luar</p>
                  <p className="text-xs text-gray-500">Target: Max 2x/minggu</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Mulai investasi</p>
                  <p className="text-xs text-gray-500">Rp 500rb ke reksadana</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Tambah dana darurat</p>
                  <p className="text-xs text-gray-500">Target: Rp 750rb</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Review subscription</p>
                  <p className="text-xs text-gray-500">Cancel yang tidak perlu</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="flex-1 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold">
              Terapkan Rekomendasi
            </button>
            <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const UpgradeModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-md`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Upgrade ke Premium</h3>
          <button onClick={() => setShowUpgradeModal(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="text-center">
            <Shield className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <p className="text-lg font-medium mb-2">Limit Transaksi Tercapai!</p>
            <p className="text-sm text-gray-500">
              Anda telah mencapai limit 500 transaksi untuk akun gratis.
            </p>
          </div>
          
          <div className="space-y-3">
            <div className={`border-2 border-blue-500 rounded-lg p-4 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Premium Bulanan</h4>
                <span className="text-2xl font-bold">Rp 20rb</span>
              </div>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  500 transaksi tambahan/bulan
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Konsultasi AI unlimited
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Export data Excel/PDF
                </li>
              </ul>
            </div>
            
            <div className={`border rounded-lg p-4 relative ${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
              <div className="absolute -top-3 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                BEST VALUE
              </div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Premium Lifetime</h4>
                <span className="text-2xl font-bold">Rp 85rb</span>
              </div>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Unlimited transaksi selamanya
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Semua fitur premium
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Priority support
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-3">Pilih Metode Pembayaran:</p>
            <div className="grid grid-cols-3 gap-2">
              {paymentMethods.map(method => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`p-3 rounded-lg border-2 ${
                    selectedPaymentMethod === method.id 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                      : 'border-gray-200 dark:border-gray-600'
                  } hover:border-blue-500 flex flex-col items-center gap-1`}
                >
                  <span className="text-2xl">{method.icon}</span>
                  <span className="text-xs">{method.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <button 
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold disabled:opacity-50"
            disabled={!selectedPaymentMethod}
          >
            Lanjutkan Pembayaran
          </button>
        </div>
      </div>
    </div>
  );

  const renderConsultation = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Konsultasi Keuangan AI</h2>
      
      <div className={`rounded-xl p-8 text-center ${darkMode ? 'bg-gradient-to-br from-purple-900 to-blue-900' : 'bg-gradient-to-br from-purple-500 to-blue-500'} text-white shadow-lg`}>
        <Brain className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Konsultan Keuangan AI Anda</h3>
        <p className="mb-6">Dapatkan saran personalisasi berdasarkan data keuangan Anda</p>
        <button 
          onClick={() => setShowConsultationModal(true)}
          className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100"
        >
          Mulai Konsultasi
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className="text-lg font-semibold mb-4">Simulasi Goal Keuangan</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Pilih Goal</label>
              <select className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <option>Dana Darurat (6x pengeluaran)</option>
                <option>DP Rumah</option>
                <option>Liburan Impian</option>
                <option>Pendidikan Anak</option>
                <option>Pensiun Dini</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Target Amount</label>
              <input 
                type="number" 
                placeholder="50000000"
                className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              />
            </div>
            <button className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
              Hitung Simulasi
            </button>
          </div>
        </div>

        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className="text-lg font-semibold mb-4">Riwayat Konsultasi</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-500 pl-4">
              <p className="font-medium">Strategi Menabung untuk DP Rumah</p>
              <p className="text-sm text-gray-500">20 Jan 2025 • 15 rekomendasi</p>
              <button className="text-purple-500 text-sm mt-1">Lihat Detail →</button>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-medium">Optimasi Pengeluaran Bulanan</p>
              <p className="text-sm text-gray-500">15 Jan 2025 • 8 rekomendasi</p>
              <button className="text-blue-500 text-sm mt-1">Lihat Detail →</button>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-medium">Rencana Investasi Pemula</p>
              <p className="text-sm text-gray-500">10 Jan 2025 • 12 rekomendasi</p>
              <button className="text-green-500 text-sm mt-1">Lihat Detail →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render based on active menu
  const renderContent = () => {
    switch(activeMenu) {
      case 'dashboard': return renderDashboard();
      case 'transactions': return renderTransactions();
      case 'budget': return renderBudget();
      case 'consultation': return renderConsultation();
      case 'education': return renderEducation();
      case 'community': return renderCommunity();
      case 'referral': return renderReferral();
      case 'settings': return renderSettings();
      case 'admin-dashboard': return renderAdminDashboard();
      case 'broadcast': return renderBroadcast();
      default: return renderDashboard();
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Mobile Header */}
      <div className="md:hidden">
        <div className={`fixed top-0 left-0 right-0 z-40 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <div className="flex items-center justify-between p-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">FinanceApp</h1>
            <div className="flex items-center gap-2">
              <button onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button 
                onClick={() => setShowUpgradeModal(true)}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  userProfile.membership === 'premium' 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                {userProfile.membership === 'premium' ? 'PREMIUM' : 'FREE'}
              </button>
            </div>
          </div>
        </div>
        <div className="h-16"></div>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8">FinanceApp</h1>
          
          {/* User Profile */}
          <div className={`mb-6 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium">{userProfile.name}</p>
                <p className="text-xs text-gray-500">{userProfile.email}</p>
              </div>
            </div>
          </div>
          
          {/* Menu Items */}
          <nav className="space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveMenu(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeMenu === item.id 
                      ? 'bg-blue-500 text-white' 
                      : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
          
          {/* Admin Section */}
          <div className="mt-8">
            <p className="text-xs text-gray-500 uppercase mb-2">Admin</p>
            <nav className="space-y-2">
              {adminMenuItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveMenu(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      activeMenu === item.id 
                        ? 'bg-purple-500 text-white' 
                        : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          
          {/* Upgrade Button */}
          {userProfile.membership === 'free' && (
            <div className="absolute bottom-6 left-6 right-6">
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
              >
                Upgrade Premium
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Desktop Header */}
        <div className={`hidden md:block sticky top-0 z-30 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <div className="flex items-center justify-between p-6">
            <h2 className="text-2xl font-bold">
              {menuItems.find(item => item.id === activeMenu)?.label || 
               adminMenuItems.find(item => item.id === activeMenu)?.label}
            </h2>
            <div className="flex items-center gap-4">
              <button className="relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
              <button 
                onClick={() => setShowUpgradeModal(true)}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  userProfile.membership === 'premium' 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                {userProfile.membership === 'premium' ? 'PREMIUM' : 'UPGRADE'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Page Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
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

      {/* Modals */}
      {showTransactionModal && <TransactionModal />}
      {showConsultationModal && <ConsultationModal />}
      {showUpgradeModal && <UpgradeModal />}
      
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default FinanceApp;
