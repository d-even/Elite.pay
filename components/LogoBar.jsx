'use client';
import { motion } from 'framer-motion';

export default function LogoBar() {
  return (
    <div className="flex items-center justify-between p-6 bg-slate-900/50 backdrop-blur-sm border-b border-slate-800">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
      >
        Elite Pay
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-lg font-semibold text-gray-400"
      >
        GasYard
      </motion.div>
    </div>
  );
}