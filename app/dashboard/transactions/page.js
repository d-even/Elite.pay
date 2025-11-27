'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground';
import LogoBar from '@/components/LogoBar';
import SidePanel from '@/components/SidePanel';

export default function TransactionsPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const transactions = [
    { id: '1', amount: '150.00', token: 'USDT', network: 'Ethereum', status: 'success', date: '2025-11-27' },
    { id: '2', amount: '75.50', token: 'USDC', network: 'Polygon', status: 'pending', date: '2025-11-26' },
    { id: '3', amount: '200.00', token: 'DAI', network: 'BSC', status: 'failed', date: '2025-11-25' },
  ];

  const statusColors = {
    success: 'bg-green-500/20 text-green-400 border-green-500/50',
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    failed: 'bg-red-500/20 text-red-400 border-red-500/50',
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />

      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />

      <div className="relative">
        <LogoBar />

        <button
          onClick={() => setIsPanelOpen(true)}
          className="fixed top-6 left-6 z-30 p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-3xl font-bold text-white mb-8">Transaction History</h1>

            <div className="space-y-4">
              {transactions.map((tx, idx) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700 p-6 hover:border-slate-600 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl font-bold text-white">${tx.amount}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[tx.status]}`}>
                          {tx.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {tx.token} • {tx.network} • {tx.date}
                      </p>
                    </div>
                    <div className="text-gray-500">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}