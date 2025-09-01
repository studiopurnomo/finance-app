import React, { useState, useEffect } from 'react';
import { 
  // Keep only the icons needed for App.jsx itself, others are in their components
  Sun,
  Moon,
  Users,
  CreditCard,
  PieChart,
  BookOpen,
  Settings,
  Menu,
  X,
  Plus,
  Bell,
  Home,
  FileText,
  Gift,
  Shield,
  Brain,
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

// Import data
import {
  categories,
  consultationSuggestions,
  paymentMethods,
  menuItems,
  adminMenuItems
} from './data/mockData';

// Import API Service
import { getDashboardData, getUserProfile, getTransactions } from './api/apiService';

// Import Layout Components
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import MobileHeader from './layout/MobileHeader';
import MobileBottomNav from './layout/MobileBottomNav';

// Import Page Components
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';
import Consultation from './pages/Consultation';
import Education from './pages/Education';
import Community from './pages/Community';
import Referral from './pages/Referral';
import SettingsPage from './pages/Settings'; // Renamed to avoid conflict with 'Settings' icon
import AdminDashboard from './pages/AdminDashboard';
import Broadcast from './pages/Broadcast';

// Import Modal Components
import TransactionModal from './components/TransactionModal';
import ConsultationModal from './components/ConsultationModal';
import UpgradeModal from './components/UpgradeModal';


/**
 * Komponen utama aplikasi FinanceApp.
 * Bertanggung jawab untuk mengelola state utama, routing halaman, dan layout.
 */
const FinanceApp = () => {
  // State untuk mengelola tema (gelap/terang)
  const [darkMode, setDarkMode] = useState(false);
  // State untuk mengelola visibilitas sidebar di mode mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // State untuk melacak menu/halaman yang sedang aktif
  const [activeMenu, setActiveMenu] = useState('dashboard');
  // State untuk menampilkan atau menyembunyikan modal
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  // State untuk form transaksi
  const [transactionType, setTransactionType] = useState('expense');
  // State untuk form upgrade
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  
  // State untuk data aplikasi, diinisialisasi sebagai null atau array kosong
  const [userProfile, setUserProfile] = useState(null);
  const [financialData, setFinancialData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  // State untuk status loading data awal
  const [isLoading, setIsLoading] = useState(true);

  // Hook useEffect untuk mengambil data awal dari API saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Panggil beberapa API secara bersamaan
        const [profile, finData, transData] = await Promise.all([
          getUserProfile(),
          getDashboardData(),
          getTransactions()
        ]);
        setUserProfile(profile);
        setFinancialData(finData);
        setTransactions(transData);
      } catch (error) {
        console.error("Gagal mengambil data awal:", error);
        // Di aplikasi nyata, Anda mungkin ingin menampilkan pesan error ke pengguna
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fungsi untuk menghitung skor kesehatan keuangan
  const calculateHealthScore = () => {
    if (!financialData || financialData.totalExpense === 0) return 0;
    const incomeExpenseRatio = financialData.totalIncome / financialData.totalExpense;
    const savingsRate = financialData.totalIncome > 0 ? financialData.currentSavings / financialData.totalIncome : 0;
    const budgetCompliance = financialData.totalExpense <= financialData.monthlyBudget ? 1 : 0.7;
    
    const score = Math.round((incomeExpenseRatio * 30 + savingsRate * 40 + budgetCompliance * 30));
    return Math.min(score, 100);
  };

  const healthScore = calculateHealthScore();

  // Fungsi untuk me-refresh data transaksi (bisa dipanggil setelah ada penambahan)
  const refreshTransactions = async () => {
    try {
      const transData = await getTransactions();
      setTransactions(transData);
    } catch (error) {
      console.error("Gagal me-refresh transaksi:", error);
    }
  };

  // Tampilkan komponen loading jika data belum siap
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-xl dark:text-white">Memuat data aplikasi...</p>
      </div>
    );
  }

  // Render komponen utama setelah data siap
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header untuk tampilan mobile */}
      <MobileHeader
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setSidebarOpen={setSidebarOpen}
        userProfile={userProfile}
        setShowUpgradeModal={setShowUpgradeModal}
      />

      {/* Sidebar utama */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        userProfile={userProfile}
        menuItems={menuItems}
        adminMenuItems={adminMenuItems}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        setSidebarOpen={setSidebarOpen}
        setShowUpgradeModal={setShowUpgradeModal}
        darkMode={darkMode}
      />

      {/* Konten Utama */}
      <div className="md:ml-64">
        {/* Header untuk tampilan desktop */}
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          userProfile={userProfile}
          setShowUpgradeModal={setShowUpgradeModal}
          activeMenu={activeMenu}
          menuItems={menuItems}
          adminMenuItems={adminMenuItems}
        />
        
        {/* Konten Halaman Dinamis */}
        <main className="p-6">
          {(() => {
            // Logika untuk menampilkan halaman yang sesuai dengan menu aktif
            switch(activeMenu) {
              case 'dashboard':
                return <Dashboard
                          darkMode={darkMode}
                          financialData={financialData}
                          healthScore={healthScore}
                          consultationSuggestions={consultationSuggestions}
                          transactions={transactions}
                          setActiveMenu={setActiveMenu}
                          setShowTransactionModal={setShowTransactionModal}
                          setShowConsultationModal={setShowConsultationModal}
                        />;
              case 'transactions':
                return <Transactions
                          darkMode={darkMode}
                          transactions={transactions}
                          refreshTransactions={refreshTransactions}
                          setShowTransactionModal={setShowTransactionModal}
                        />;
              case 'budget':
                return <Budget darkMode={darkMode} />;
              case 'consultation':
                return <Consultation
                          darkMode={darkMode}
                          setShowConsultationModal={setShowConsultationModal}
                        />;
              case 'education':
                return <Education darkMode={darkMode} />;
              case 'community':
                return <Community darkMode={darkMode} />;
              case 'referral':
                return <Referral darkMode={darkMode} />;
              case 'settings':
                return <SettingsPage
                          darkMode={darkMode}
                          setDarkMode={setDarkMode}
                          userProfile={userProfile}
                        />;
              case 'admin-dashboard':
                return <AdminDashboard darkMode={darkMode} />;
              case 'broadcast':
                return <Broadcast darkMode={darkMode} />;
              default:
                return <Dashboard
                          darkMode={darkMode}
                          financialData={financialData}
                          healthScore={healthScore}
                          consultationSuggestions={consultationSuggestions}
                          transactions={transactions}
                          setActiveMenu={setActiveMenu}
                          setShowTransactionModal={setShowTransactionModal}
                          setShowConsultationModal={setShowConsultationModal}
                        />;
            }
          })()}
        </main>
      </div>

      {/* Navigasi Bawah untuk tampilan mobile */}
      <MobileBottomNav
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        setShowTransactionModal={setShowTransactionModal}
      />

      {/* Kumpulan Modal Aplikasi */}
      {showTransactionModal && <TransactionModal
                                  darkMode={darkMode}
                                  setShowTransactionModal={setShowTransactionModal}
                                  transactionType={transactionType}
                                  setTransactionType={setTransactionType}
                                  categories={categories}
                                />}
      {showConsultationModal && <ConsultationModal
                                    darkMode={darkMode}
                                    setShowConsultationModal={setShowConsultationModal}
                                  />}
      {showUpgradeModal && <UpgradeModal
                              darkMode={darkMode}
                              setShowUpgradeModal={setShowUpgradeModal}
                              paymentMethods={paymentMethods}
                              selectedPaymentMethod={selectedPaymentMethod}
                              setSelectedPaymentMethod={setSelectedPaymentMethod}
                            />}
      
      {/* Overlay untuk menutup sidebar di mode mobile */}
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
