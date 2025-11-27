'use client';
import { motion } from 'framer-motion';

export default function AnimatedCheckmark() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="w-20 h-20 mx-auto mb-4"
    >
      <motion.svg viewBox="0 0 52 52" className="w-full h-full">
        <motion.circle
          cx="26"
          cy="26"
          r="25"
          fill="none"
          stroke="#2D8CFF"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.path
          fill="none"
          stroke="#2D8CFF"
          strokeWidth="3"
          strokeLinecap="round"
          d="M14 27l7 7 16-16"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      </motion.svg>
    </motion.div>
  );
}