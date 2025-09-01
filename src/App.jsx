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
  initialUserProfile,
  initialFinancialData,
  categories,
  transactions as mockTransactions,
  consultationSuggestions,
  paymentMethods,
  menuItems,
  adminMenuItems
} from './data/mockData';

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


const FinanceApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [transactionType, setTransactionType] = useState('expense');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  
  // State initialized from imported mock data
  const [userProfile, setUserProfile] = useState(initialUserProfile);
  const [financialData, setFinancialData] = useState(initialFinancialData);
  const [transactions, setTransactions] = useState(mockTransactions);

  // Financial Health Score Calculation
  const calculateHealthScore = () => {
    if (financialData.totalExpense === 0) return 100; // Avoid division by zero
    const incomeExpenseRatio = financialData.totalIncome / financialData.totalExpense;
    const savingsRate = financialData.totalIncome > 0 ? financialData.currentSavings / financialData.totalIncome : 0;
    const budgetCompliance = financialData.totalExpense <= financialData.monthlyBudget ? 1 : 0.7;
    
    const score = Math.round((incomeExpenseRatio * 30 + savingsRate * 40 + budgetCompliance * 30));
    return Math.min(score, 100);
  };

  const healthScore = calculateHealthScore();

  // Main render based on active menu
  const renderContent = () => {
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
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <MobileHeader
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setSidebarOpen={setSidebarOpen}
        userProfile={userProfile}
        setShowUpgradeModal={setShowUpgradeModal}
      />

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

      {/* Main Content */}
      <div className="md:ml-64">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          userProfile={userProfile}
          setShowUpgradeModal={setShowUpgradeModal}
          activeMenu={activeMenu}
          menuItems={menuItems}
          adminMenuItems={adminMenuItems}
        />
        
        {/* Page Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>

      <MobileBottomNav
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        setShowTransactionModal={setShowTransactionModal}
      />

      {/* Modals */}
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
