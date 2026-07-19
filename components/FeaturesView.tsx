"use client";

import React from "react";
import { useApp, AppView } from "../context/AppContext";
import {
  Users,
  GraduationCap,
  Briefcase,
  Bot,
  Gamepad2,
  Newspaper,
  MessageSquareCode,
  LayoutDashboard,
  BookmarkCheck,
  Radio,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "motion/react";

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  emoji: string;
  desc: string;
  targetView: AppView;
  color: string;
  glow: string;
}

export default function FeaturesView() {
  const { setActiveView } = useApp();

  const features: FeatureCard[] = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community",
      emoji: "👨",
      desc: "Forum diskusi interaktif untuk bertanya, berbagi ilmu, menyukai post, dan berkolaborasi.",
      targetView: "community",
      color: "from-cyan-500 to-blue-500",
      glow: "rgba(6,182,212,0.3)",
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI Assistant",
      emoji: "🤖",
      desc: "Kecerdasan Buatan Gemini 3.5 untuk konsultasi koding, ringkasan siber, dan riset IT secara instan.",
      targetView: "ai-assistant",
      color: "from-purple-500 to-indigo-500",
      glow: "rgba(168,85,247,0.3)",
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: "Mini Games",
      emoji: "🎮",
      desc: "Mainkan 5 game cyber-retro: Snake, Memory, Tic-Tac-Toe, 2048, & Tech Quiz untuk raih skor tertinggi.",
      targetView: "games",
      color: "from-indigo-500 to-purple-600",
      glow: "rgba(99,102,241,0.3)",
    },
    {
      icon: <LayoutDashboard className="w-6 h-6" />,
      title: "Dashboard",
      emoji: "📈",
      desc: "Akses profil pengguna, rekam poin kontribusi, naikkan level, kumpulkan badge, dan atur dark mode.",
      targetView: "dashboard",
      color: "from-blue-500 to-cyan-500",
      glow: "rgba(59,130,246,0.3)",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Learning",
      emoji: "📚",
      desc: "Kurikulum pemrograman berstruktur tinggi: Next.js, React, siber security, dan visualisasi 3D.",
      targetView: "blog",
      color: "from-teal-500 to-emerald-500",
      glow: "rgba(20,184,166,0.3)",
    },
    {
      icon: <Newspaper className="w-6 h-6" />,
      title: "News & Article",
      emoji: "📰",
      desc: "Artikel teknologi siber dan update inovasi terbaru dari dunia kecerdasan buatan.",
      targetView: "blog",
      color: "from-pink-500 to-rose-500",
      glow: "rgba(236,72,153,0.3)",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Jobs & Career",
      emoji: "💼",
      desc: "Hubungkan bakat Anda dengan informasi lowongan kerja teknologi modern di seluruh Indonesia.",
      targetView: "contact",
      color: "from-amber-500 to-orange-500",
      glow: "rgba(245,158,11,0.3)",
    },
    {
      icon: <MessageSquareCode className="w-6 h-6" />,
      title: "Realtime Chat",
      emoji: "💬",
      desc: "Tinggalkan komentar, log masukan sistem, dan kirim tanggapan real-time di forum kami.",
      targetView: "community",
      color: "from-teal-500 to-cyan-500",
      glow: "rgba(20,184,166,0.3)",
    },
    {
      icon: <BookmarkCheck className="w-6 h-6" />,
      title: "Education Events",
      emoji: "🎓",
      desc: "Gabung event teknologi, dapatkan QR-ticket digital instan, dan saksikan kuliah umum teknologi.",
      targetView: "events",
      color: "from-violet-500 to-purple-600",
      glow: "rgba(139,92,246,0.3)",
    },
    {
      icon: <Radio className="w-6 h-6" />,
      title: "Networking",
      emoji: "🌐",
      desc: "Bina kolaborasi erat antarmahasiswa Universitas Bina Bangsa Getsempena dan komunitas digital.",
      targetView: "developer",
      color: "from-indigo-600 to-pink-500",
      glow: "rgba(99,102,241,0.3)",
    },
  ];

  return (
    <div className="relative px-4 md:px-12 py-16 z-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-400 mb-2">INTELLIGENT SUITE</h2>
        <h1 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
          Pusat Layanan <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">RSC Ecosystem</span>
        </h1>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto font-light leading-relaxed">
          Pilih modul di bawah untuk menjelajah, berpartisipasi, bermain game, berkonsultasi dengan kecerdasan buatan, atau mengatur profil Anda secara instan.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => setActiveView(feat.targetView)}
            className="group relative p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 backdrop-blur-xl shadow-2xl cursor-pointer overflow-hidden transition-all duration-300"
            style={{
              boxShadow: `0 4px 30px rgba(0, 0, 0, 0.4)`,
            }}
          >
            {/* Dynamic Hover Outer Glow */}
            <div
              className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${feat.glow}, transparent 60%)`,
              }}
            />

            {/* Glowing corner blob */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:bg-gradient-to-br group-hover:from-cyan-500/10 transition-all duration-300" />

            {/* Icon Header */}
            <div className="flex justify-between items-start mb-5">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${feat.color} text-white shadow-md shadow-slate-950/50`}>
                {feat.icon}
              </div>
              <span className="text-2xl font-sans">{feat.emoji}</span>
            </div>

            {/* Content info */}
            <div className="flex items-center gap-1.5 mb-2">
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {feat.title}
              </h3>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>

            <p className="text-slate-400 text-sm font-light leading-relaxed">
              {feat.desc}
            </p>

            {/* Custom High-tech details lines */}
            <div className="mt-5 pt-4 border-t border-white/10 flex justify-between items-center text-xs font-mono text-slate-500">
              <span className="group-hover:text-cyan-500 transition-colors">MODULE RSC // 0{index + 1}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400">LAUNCH →</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
