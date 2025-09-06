import React, { useState, useContext, useEffect } from 'react';
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
  Lightbulb
} from 'lucide-react';

// Komponen Card untuk Ringkasan Finansial
const StatCard = ({ title, value, percentage, icon, color }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          Rp {value.toLocaleString('id-ID')}
        </p>
        <p className={`text-sm ${percentage > 0 ? 'text-green-600' : 'text-red-600'} mt-1 flex items-center`}>
          {percentage > 0 ? `+${percentage}%` : `${percentage}%`} dari bulan lalu
        </p>
      </div>
      <div className={`w-12 h-12 bg-${color}-100 dark:bg-${color}-900/50 rounded-xl flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // State untuk data finansial (nantinya diisi dari API)
  const [financialData, setFinancialData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0
  });
  const [healthScore, setHealthScore] = useState(0);
  const [consultationSuggestions, setConsultationSuggestions] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // useEffect untuk memuat data dummy (simulasi pemanggilan API)
  useEffect(() => {
    // Di sini seharusnya ada logika untuk fetch data dari API
    // Untuk sekarang, kita gunakan data dummy
    setFinancialData({
      totalIncome: 25000000,
      totalExpense: 18500000,
      balance: 6500000
    });
    setHealthScore(75);
    setConsultationSuggestions([
      { id: 1, type: 'warning', title: 'Pengeluaran Hiburan Tinggi', description: 'Pengeluaran untuk hiburan bulan ini 30% lebih tinggi dari budget.' },
      { id: 2, type: 'success', title: 'Target Tabungan Tercapai', description: 'Selamat! Anda telah mencapai target tabungan bulan ini.' },
      { id: 3, type: 'info', title: 'Peluang Investasi Baru', description: 'Saham sektor teknologi menunjukkan tren positif.' }
    ]);
    setTransactions([
        { id: 1, description: 'Gaji Bulanan', amount: 15000000, type: 'income', category: 'Gaji' },
        { id: 2, description: 'Belanja Bulanan', amount: -850000, type: 'expense', category: 'Kebutuhan' },
        { id: 3, description: 'Bayar Tagihan Internet', amount: -350000, type: 'expense', category: 'Tagihan' },
    ]);
  }, []);


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Selamat Datang, {user?.full_name || 'Pengguna'}!</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Ini ringkasan kondisi keuangan Anda bulan ini.</p>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Pemasukan" value={financialData.totalIncome} percentage={12} color="green" icon={<ArrowUpRight className="w-6 h-6 text-green-600" />} />
        <StatCard title="Total Pengeluaran" value={financialData.totalExpense} percentage={8} color="red" icon={<ArrowDownRight className="w-6 h-6 text-red-600" />} />
        <StatCard title="Saldo Saat Ini" value={financialData.balance} percentage={4} color="teal" icon={<Wallet className="w-6 h-6 text-teal-600" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Skor & Aksi Cepat */}
        <div className="lg:col-span-1 space-y-8">
          {/* Skor Kesehatan Keuangan */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Skor Kesehatan Finansial</h3>
            <div className="flex items-center justify-center text-center">
                <div className="relative w-32 h-32">
                    <svg className="transform -rotate-90 w-full h-full">
                        <circle cx="50%" cy="50%" r="45%" strokeWidth="8" stroke="currentColor" className="text-gray-200 dark:text-gray-700" fill="transparent"/>
                        <circle cx="50%" cy="50%" r="45%" strokeWidth="8" stroke="currentColor" className="text-teal-500" fill="transparent"
                            strokeDasharray={`${(healthScore / 100) * 2 * Math.PI * 45} ${2 * Math.PI * 45}`}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{healthScore}</span>
                    </div>
                </div>
            </div>
            <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-3">
              Skor Anda tergolong <span className="font-semibold text-teal-600 dark:text-teal-400">Baik</span>. Terus pertahankan!
            </p>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Aksi Cepat</h3>
            <div className="space-y-3">
                <button className="w-full flex items-center p-3 bg-teal-50 hover:bg-teal-100 dark:bg-teal-900/50 dark:hover:bg-teal-900/80 rounded-lg transition-colors">
                    <Plus className="w-5 h-5 text-teal-600 dark:text-teal-400 mr-3" />
                    <span className="font-medium text-sm text-teal-800 dark:text-teal-200">Tambah Transaksi Baru</span>
                </button>
                <button onClick={() => navigate('/budget')} className="w-full flex items-center p-3 bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/50 dark:hover:bg-orange-900/80 rounded-lg transition-colors">
                    <Target className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-3" />
                    <span className="font-medium text-sm text-orange-800 dark:text-orange-200">Kelola Anggaran</span>
                </button>
                 <button onClick={() => navigate('/education')} className="w-full flex items-center p-3 bg-sky-50 hover:bg-sky-100 dark:bg-sky-900/50 dark:hover:bg-sky-900/80 rounded-lg transition-colors">
                    <BookOpen className="w-5 h-5 text-sky-600 dark:text-sky-400 mr-3" />
                    <span className="font-medium text-sm text-sky-800 dark:text-sky-200">Lihat Tips Keuangan</span>
                </button>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Transaksi & Saran AI */}
        <div className="lg:col-span-2 space-y-8">
            {/* Recent Transactions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Aktivitas Terakhir</h3>
                <button onClick={() => navigate('/transactions')} className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 text-sm font-medium transition-colors">
                    Lihat Semua
                </button>
                </div>
                <div className="space-y-3">
                {transactions.slice(0, 3).map(t => (
                    <div key={t.id} className="flex items-center justify-between p-3 -mx-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors">
                    <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.type === 'income' ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50'}`}>
                            {t.type === 'income' ? <ArrowUpRight className="w-5 h-5 text-green-600" /> : <ArrowDownRight className="w-5 h-5 text-red-600" />}
                        </div>
                        <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{t.description}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t.category}</p>
                        </div>
                    </div>
                    <p className={`font-semibold text-sm ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {t.type === 'income' ? '+' : ''}Rp {Math.abs(t.amount).toLocaleString('id-ID')}
                    </p>
                    </div>
                ))}
                </div>
            </div>

            {/* AI Financial Insights */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Saran Finansial AI</h3>
                    <div className="flex items-center space-x-2">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">Powered by AI</span>
                    </div>
                </div>
                <div className="space-y-4">
                {consultationSuggestions.map(s => (
                    <div key={s.id} className={`p-4 rounded-xl border-l-4 ${s.type === 'warning' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' : s.type === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-sky-500 bg-sky-50 dark:bg-sky-900/20'}`}>
                    <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${s.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/50' : s.type === 'success' ? 'bg-green-100 dark:bg-green-900/50' : 'bg-sky-100 dark:bg-sky-900/50'}`}>
                            {s.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-yellow-600" /> : s.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-600" /> : <Lightbulb className="w-5 h-5 text-sky-600" />}
                        </div>
                        <div className="flex-1">
                            <p className={`font-medium text-sm text-gray-800 dark:text-gray-200`}>{s.title}</p>
                            <p className={`text-sm mt-1 text-gray-600 dark:text-gray-400`}>{s.description}</p>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
