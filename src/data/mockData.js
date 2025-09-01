import {
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
  DollarSign,
  Home,
  Target,
  Brain,
  BookOpen,
  Users,
  Gift,
  Settings,
  BarChart3,
  Bell,
  PieChart
} from 'lucide-react';

export const initialUserProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  membership: 'free',
  transactionCount: 450,
  joinDate: '2024-01-15'
};

export const initialFinancialData = {
  totalIncome: 15000000,
  totalExpense: 12500000,
  balance: 2500000,
  monthlyBudget: 13000000,
  savingsGoal: 5000000,
  currentSavings: 1500000
};

export const categories = {
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

export const transactions = [
  { id: 1, type: 'expense', category: 'Makanan', amount: 125000, date: '2025-01-22', note: 'Makan siang meeting' },
  { id: 2, type: 'income', category: 'Gaji', amount: 15000000, date: '2025-01-20', note: 'Gaji bulanan' },
  { id: 3, type: 'expense', category: 'Transportasi', amount: 250000, date: '2025-01-21', note: 'Bensin mobil' },
  { id: 4, type: 'expense', category: 'Belanja', amount: 1500000, date: '2025-01-19', note: 'Belanja bulanan' },
  { id: 5, type: 'expense', category: 'Tagihan', amount: 500000, date: '2025-01-15', note: 'Listrik & Internet' }
];

export const consultationSuggestions = [
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

export const paymentMethods = [
  { id: 'ovo', name: 'OVO', icon: '💳' },
  { id: 'gopay', name: 'GoPay', icon: '💰' },
  { id: 'dana', name: 'Dana', icon: '💸' },
  { id: 'shopeepay', name: 'ShopeePay', icon: '🛍️' },
  { id: 'qris', name: 'QRIS', icon: '📱' },
  { id: 'va', name: 'Virtual Account', icon: '🏦' },
  { id: 'card', name: 'Kartu Kredit/Debit', icon: '💳' }
];

export const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'transactions', label: 'Transaksi', icon: FileText },
  { id: 'budget', label: 'Budget', icon: Target },
  { id: 'consultation', label: 'Konsultasi', icon: Brain },
  { id: 'education', label: 'Edukasi', icon: BookOpen },
  { id: 'community', label: 'Komunitas', icon: Users },
  { id: 'referral', label: 'Referral', icon: Gift },
  { id: 'settings', label: 'Pengaturan', icon: Settings }
];

export const adminMenuItems = [
  { id: 'admin-dashboard', label: 'Admin Dashboard', icon: BarChart3 },
  { id: 'broadcast', label: 'Broadcast', icon: Bell },
  { id: 'members', label: 'Member Management', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: PieChart },
  { id: 'content', label: 'Content Management', icon: FileText }
];
