"use client";

import React from "react";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex w-full items-center justify-center bg-background-cream p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary-dark mb-2 tracking-tight">{title}</h1>
          <p className="text-gray-500">{subtitle}</p>
        </div>
        {children}
      </motion.div>
    </div>
  );
}
