"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 1700);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink-900"
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-16 w-16 items-center justify-center rounded-2xl border-gradient shadow-glow"
          >
            <span className="font-mono text-lg font-semibold text-slate-100">SR</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="mt-7 h-[2px] w-44 overflow-hidden rounded-full bg-white/10"
          >
            <motion.div
              className="h-full w-1/2 rounded-full bg-gradient-to-r from-accent-500 via-accent-400 to-glow"
              initial={{ x: "-150%" }}
              animate={{ x: "350%" }}
              transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="mt-5 font-mono text-[11px] uppercase tracking-[0.4em] text-slate-500"
          >
            Securing Applications
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
