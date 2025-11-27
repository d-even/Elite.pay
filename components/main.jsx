import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ElitePayApp = () => {
  const [currentPage, setCurrentPage] = useState('/auth/login');

  const renderPage = () => {
    switch (currentPage) {
      case '/auth/login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case '/auth/signup':
        return <SignupPage onNavigate={setCurrentPage} />;
      case '/dashboard':
        return <DashboardPage onNavigate={setCurrentPage} />;
      case '/dashboard/transactions':
        return <TransactionsPage onNavigate={setCurrentPage} />;
      case '/dashboard/add-product':
        return <AddProductPage onNavigate={setCurrentPage} />;
      default:
        return <LoginPage onNavigate={setCurrentPage} />;
    }
  };

  return <div className="min-h-screen bg-slate-950 text-white">{renderPage()}</div>;
};

export default ElitePayApp;