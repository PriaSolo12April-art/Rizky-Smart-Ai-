"use client";

import React from "react";
import { useApp } from "../context/AppContext";
import { ArrowRight, Bot, Compass, Shield, Users2, Sparkles, Award } from "lucide-react";
import { motion } from "motion/react";

export default function HeroView() {
  const { setActiveView, user } = useApp();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-4 md:px-12 py-10 z-10">
      {/* Decorative top neon badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/25 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-8 shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-md"
      >
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
        Sistem Integrasi AI Terkini
      </motion.div>

      {/* Main Title Heading */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-4xl sm:text-6xl md:text-8xl font-sans font-bold tracking-tight text-white mb-6 select-none"
      >
        <span className="block bg-gradient-to-r from-slate-100 via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
          Welcome to
        </span>
        <span className="block bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(6,182,212,0.2)]">
          Rizky Smart Community
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-2xl text-lg sm:text-2xl text-slate-400 font-sans tracking-wide mb-12 font-light leading-relaxed"
      >
        Smart Innovation For Everyone. Menghubungkan kreativitas, kecerdasan buatan, dan teknologi siber dalam satu ekosistem futuristik.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 w-full max-w-lg"
      >
        <button
          onClick={() => setActiveView("features")}
          id="btn-explore-ecosystem"
          className="group relative w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 font-sans font-medium text-white shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 overflow-hidden cursor-pointer"
        >
          {/* Ripple / Shine hover effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
          <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
          Jelajahi Ekosistem
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => setActiveView("ai-assistant")}
          id="btn-ask-gemini"
          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-950/60 hover:bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 font-sans font-medium text-slate-300 hover:text-cyan-300 transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
        >
          <Bot className="w-5 h-5 text-cyan-400 animate-bounce" />
          Tanya AI Assistant
        </button>

        {!user && (
          <button
            onClick={() => setActiveView("login")}
            id="btn-login-cta"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-950/20 hover:bg-cyan-900/40 border border-cyan-500/30 font-sans font-medium text-cyan-300 hover:text-white transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer"
          >
            Gabung Sekarang
          </button>
        )}
      </motion.div>

      {/* Floating high-tech statistics highlights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full"
      >
        <div className="flex flex-col items-center justify-center p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl hover:border-cyan-500/40 transition-colors group relative overflow-hidden shadow-2xl">
          <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-cyan-500/10 rounded-full blur-xl"></div>
          <Bot className="w-6 h-6 text-cyan-400 mb-2 relative z-10" />
          <span className="text-2xl font-black text-white font-mono relative z-10">Gemini 3.5</span>
          <span className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-widest font-bold relative z-10">AI Integration</span>
        </div>
        <div className="flex flex-col items-center justify-center p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl hover:border-purple-500/40 transition-colors group relative overflow-hidden shadow-2xl">
          <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-purple-500/10 rounded-full blur-xl"></div>
          <Users2 className="w-6 h-6 text-purple-400 mb-2 relative z-10" />
          <span className="text-2xl font-black text-white font-mono relative z-10">12K+</span>
          <span className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-widest font-bold relative z-10">Members Active</span>
        </div>
        <div className="flex flex-col items-center justify-center p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl hover:border-indigo-500/40 transition-colors group relative overflow-hidden shadow-2xl">
          <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-indigo-500/10 rounded-full blur-xl"></div>
          <Award className="w-6 h-6 text-indigo-400 mb-2 relative z-10" />
          <span className="text-2xl font-black text-white font-mono relative z-10">Level Up!</span>
          <span className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-widest font-bold relative z-10">Gamified Badges</span>
        </div>
        <div className="flex flex-col items-center justify-center p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl hover:border-teal-500/40 transition-colors group relative overflow-hidden shadow-2xl">
          <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-teal-500/10 rounded-full blur-xl"></div>
          <Shield className="w-6 h-6 text-teal-400 mb-2 relative z-10" />
          <span className="text-2xl font-black text-white font-mono relative z-10">99.9%</span>
          <span className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-widest font-bold relative z-10">Secure Firewall</span>
        </div>
      </motion.div>
    </div>
  );
}
