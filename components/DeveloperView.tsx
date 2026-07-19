"use client";

import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  MessageCircle,
  Award,
  Globe,
  Database,
  Cpu,
  BrainCircuit,
  Lock,
  LineChart,
  Cloud,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import rizkyProfileImg from "@/src/assets/images/rizky_profile_1784067583304.jpg";

export default function DeveloperView() {
  const [activePortfolio, setActivePortfolio] = useState<string | null>(null);

  // Counter stats with automated ticking simulation
  const [stats, setStats] = useState({
    projects: 0,
    certificates: 0,
    studyHours: 0,
    contributions: 0,
    visits: 0,
    users: 0,
  });

  useEffect(() => {
    const duration = 2000; // ms
    const startTime = Date.now();

    const targets = {
      projects: 24,
      certificates: 18,
      studyHours: 1540,
      contributions: 420,
      visits: 8940,
      users: 1240,
    };

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setStats({
        projects: Math.floor(targets.projects * progress),
        certificates: Math.floor(targets.certificates * progress),
        studyHours: Math.floor(targets.studyHours * progress),
        contributions: Math.floor(targets.contributions * progress),
        visits: Math.floor(targets.visits * progress),
        users: Math.floor(targets.users * progress),
      });

      if (progress === 1) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const skills = [
    { name: "HTML5 & Web Core", percent: 95 },
    { name: "CSS3 & Typography", percent: 92 },
    { name: "JavaScript & ES6+", percent: 90 },
    { name: "React.js Ecosystem", percent: 88 },
    { name: "Next.js App Router", percent: 85 },
    { name: "Tailwind CSS Layouts", percent: 92 },
    { name: "Node.js & Express API", percent: 83 },
    { name: "Three.js & Canvas 3D", percent: 80 },
    { name: "Python Core & ML", percent: 87 },
    { name: "UI/UX & Figma", percent: 86 },
    { name: "Git & Enterprise CI/CD", percent: 90 },
    { name: "Complex Problem Solving", percent: 94 },
  ];

  const portfolios = [
    {
      id: "p1",
      title: "Website Development",
      icon: <Globe className="w-5 h-5" />,
      desc: "Sistem e-commerce multitenant dan landing page interaktif dengan optimasi SEO kelas dunia.",
      tech: "Next.js, Tailwind, React",
      rating: "⭐ 4.9/5",
    },
    {
      id: "p2",
      title: "Mobile Application",
      icon: <Cpu className="w-5 h-5" />,
      desc: "Aplikasi mobile pelacak aktivitas fitness dan produktivitas dengan integrasi data offline.",
      tech: "React Native, Node.js",
      rating: "⭐ 4.8/5",
    },
    {
      id: "p3",
      title: "Artificial Intelligence",
      icon: <BrainCircuit className="w-5 h-5" />,
      desc: "Model deep learning pengklasifikasi penyakit tanaman serta asisten koding multi-bahasa.",
      tech: "Python, TensorFlow, Gemini API",
      rating: "⭐ 5.0/5",
    },
    {
      id: "p4",
      title: "Interactive 3D Web",
      icon: <Sparkles className="w-5 h-5" />,
      desc: "Visualisasi planet, anatomi manusia, dan grid siber 3D interaktif berkinerja tinggi.",
      tech: "Three.js, WebGL, Canvas",
      rating: "⭐ 4.9/5",
    },
    {
      id: "p5",
      title: "Cyber Security Project",
      icon: <Lock className="w-5 h-5" />,
      desc: "Sistem audit keamanan jaringan komputer, perlindungan SQL Injection, dan skema enkripsi data.",
      tech: "Kali Linux, JWT, CSRF Shields",
      rating: "⭐ 4.7/5",
    },
    {
      id: "p6",
      title: "Data Analytics",
      icon: <LineChart className="w-5 h-5" />,
      desc: "Dashboard analitik demografis mahasiswa dan visualisasi log aktivitas sistem real-time.",
      tech: "D3.js, Python, Pandas",
      rating: "⭐ 4.8/5",
    },
    {
      id: "p7",
      title: "Cloud Computing",
      icon: <Cloud className="w-5 h-5" />,
      desc: "Infrastruktur cloud server-less otomatis dengan pemantauan container auto-scale.",
      tech: "Google Cloud, Railway, Docker",
      rating: "⭐ 4.9/5",
    },
    {
      id: "p8",
      title: "Internet of Things (IoT)",
      icon: <Database className="w-5 h-5" />,
      desc: "Sistem otomasi hidroponik cerdas menggunakan mikrokontroler esp32 dan database terpusat.",
      tech: "C++, ESP32, Firebase",
      rating: "⭐ 4.8/5",
    },
  ];

  const educationTimeline = [
    { year: "2006", title: "Kelahiran", desc: "Lahir di Aceh Besar pada tanggal 12 April 2006." },
    { year: "Masa Sekolah", title: "Pendidikan Dasar & Menengah", desc: "Menempuh pendidikan dasar dan menengah dengan ketertarikan tinggi pada komputer di Aceh." },
    { year: "2024", title: "Kuliah Perdana", desc: "Memulai jenjang pendidikan tinggi di Universitas Bina Bangsa Getsempena, Program Studi Ilmu Komputer." },
    { year: "2026", title: "Semester Aktif", desc: "Menyelesaikan Semester 4 dengan IPK memuaskan dan bersiap meluncur ke Semester 5 sambil terus berkontribusi di bidang IT." },
  ];

  return (
    <div className="relative px-4 md:px-12 py-16 z-10 max-w-7xl mx-auto">
      {/* View Header */}
      <div className="text-center mb-16">
        <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-400 mb-2">CREATOR SPOTLIGHT</h2>
        <h1 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
          About <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">The Creator</span>
        </h1>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto font-light leading-relaxed">
          Temui Muhammad Rizky, pengembang teknologi visioner yang membangun platform ekosistem digital Rizky Smart Community.
        </p>
      </div>

      {/* Profile & Biodata Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
        {/* Profile Card Center (4 cols) */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <div className="relative group">
            {/* Pulsing Neon Glow Ring */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-slate-900 bg-slate-950 flex items-center justify-center">
              <Image
                src={rizkyProfileImg}
                alt="Muhammad Rizky"
                width={192}
                height={192}
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Glowing floating objects count badge */}
            <span className="absolute bottom-2 right-2 px-3 py-1 bg-cyan-500 text-white rounded-full text-xxs font-mono uppercase tracking-wider font-bold shadow-lg shadow-cyan-500/40">
              Founder
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white mt-6 mb-1 text-center font-sans tracking-tight">
            Muhammad Rizky
          </h2>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-6">Computer Science Student</span>

          {/* Social Icons Hub */}
          <div className="flex flex-wrap gap-2.5 justify-center max-w-xs">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-400/40 transition-all shadow-md hover:scale-105 cursor-pointer"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/40 transition-all shadow-md hover:scale-105 cursor-pointer"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-pink-400 hover:border-pink-400/40 transition-all shadow-md hover:scale-105 cursor-pointer"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-blue-500 hover:border-blue-500/40 transition-all shadow-md hover:scale-105 cursor-pointer"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-red-500 hover:border-red-500/40 transition-all shadow-md hover:scale-105 cursor-pointer"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="mailto:muhammadrizky120406@gmail.com"
              className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-teal-400 hover:border-teal-400/40 transition-all shadow-md hover:scale-105 cursor-pointer"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-400/40 transition-all shadow-md hover:scale-105 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Biodata & Tentang Saya (8 cols) */}
        <div className="lg:col-span-8 p-6 md:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl shadow-2xl">
          <div className="border-b border-slate-900 pb-6 mb-6">
            <h3 className="text-xl font-bold text-white mb-2">🌟 Tentang Saya</h3>
            <p className="text-slate-300 text-sm font-light leading-relaxed">
              Muhammad Rizky adalah mahasiswa Program Studi Ilmu Komputer di Universitas Bina Bangsa Getsempena (BBG) yang memiliki ketertarikan besar pada pengembangan teknologi modern, khususnya di bidang pengembangan aplikasi web, kecerdasan buatan (Artificial Intelligence), Internet of Things (IoT), dan keamanan siber. Dengan semangat belajar yang tinggi, ia terus mengembangkan keterampilan teknis melalui berbagai proyek dan eksplorasi teknologi untuk menghasilkan solusi digital yang bermanfaat bagi masyarakat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-900/40">
              <span className="text-slate-500 font-mono">NAMA LENGKAP</span>
              <span className="text-slate-200 font-medium">Muhammad Rizky</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-900/40">
              <span className="text-slate-500 font-mono">ASAL</span>
              <span className="text-slate-200 font-medium">Cadek, Aceh Besar, Aceh</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-900/40">
              <span className="text-slate-500 font-mono">TANGGAL LAHIR</span>
              <span className="text-slate-200 font-medium">12 April 2006</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-900/40">
              <span className="text-slate-500 font-mono">STATUS</span>
              <span className="text-slate-200 font-medium text-cyan-400">Mahasiswa Aktif</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-900/40">
              <span className="text-slate-500 font-mono">UNIVERSITAS</span>
              <span className="text-slate-200 font-medium">Univ Bina Bangsa Getsempena</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-900/40">
              <span className="text-slate-500 font-mono">PROGRAM STUDI</span>
              <span className="text-slate-200 font-medium">Ilmu Komputer</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-900/40 col-span-1 md:col-span-2">
              <span className="text-slate-500 font-mono">SEMESTER</span>
              <span className="text-slate-200 font-medium">Semester 4 (Bersiap menuju Semester 5)</span>
            </div>
          </div>

          {/* Interest Tags */}
          <div className="mt-8">
            <span className="block text-slate-500 font-mono text-xs uppercase tracking-wider mb-3">MINAT UTAMA</span>
            <div className="flex flex-wrap gap-2">
              {["Web Development", "Artificial Intelligence (AI)", "Internet of Things (IoT)", "UI/UX Design", "Cyber Security", "Teknologi Digital"].map((item, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg shadow-sm font-light"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Moto */}
          <div className="mt-8 p-4 rounded-xl bg-cyan-950/15 border border-cyan-500/20 text-cyan-300 text-sm font-light italic">
            &ldquo;Belajar tanpa henti, berinovasi tanpa batas, dan menciptakan teknologi yang bermanfaat bagi masyarakat.&rdquo;
          </div>
        </div>
      </div>

      {/* Visual Stats Counters Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-20">
        {[
          { label: "Project Selesai", value: stats.projects, suffix: "+" },
          { label: "Sertifikat", value: stats.certificates, suffix: "" },
          { label: "Jam Belajar", value: stats.studyHours, suffix: "h" },
          { label: "Kontribusi", value: stats.contributions, suffix: "" },
          { label: "Pengunjung", value: stats.visits, suffix: "" },
          { label: "Anggota", value: stats.users, suffix: "" },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-center flex flex-col justify-center hover:border-cyan-500/30 transition-all shadow-lg"
          >
            <span className="text-3xl md:text-4xl font-bold text-white font-mono tracking-tight">
              {stat.value}
              {stat.suffix}
            </span>
            <span className="text-xxs text-slate-500 uppercase font-mono tracking-wider mt-2 block leading-tight">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Vision & Mission Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" /> Visi Muhammad Rizky
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed font-light">
            Menjadi seorang profesional di bidang teknologi yang mampu menciptakan solusi digital inovatif, modern, dan bermanfaat bagi masyarakat melalui pemanfaatan ilmu komputer dan perkembangan teknologi terkini.
          </p>
        </div>
        <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-400" /> Misi Muhammad Rizky
          </h3>
          <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside font-light">
            <li>Mengembangkan aplikasi yang inovatif dan mudah digunakan.</li>
            <li>Terus belajar dan mengikuti perkembangan teknologi terbaru.</li>
            <li>Berkontribusi dalam membangun ekosistem digital yang bermanfaat.</li>
            <li>Menghasilkan karya yang memberikan dampak positif bagi masyarakat.</li>
          </ul>
        </div>
      </div>

      {/* Dynamic Interactive Portfolios Cards (3D grid click description details) */}
      <div className="mb-20">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2 font-sans tracking-tight">
          💼 Portofolio & Keahlian Praktis
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolios.map((port) => {
            const isActive = activePortfolio === port.id;

            return (
              <div
                key={port.id}
                onClick={() => setActivePortfolio(isActive ? null : port.id)}
                className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  isActive
                    ? "bg-slate-950 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                    : "bg-white/5 border border-white/10 backdrop-blur-md hover:border-cyan-500/30 hover:bg-white/10 shadow-lg"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2.5 rounded-xl ${isActive ? "bg-cyan-500 text-white" : "bg-slate-900 text-slate-400"}`}>
                    {port.icon}
                  </div>
                  <span className="text-xs text-slate-500 font-mono">{port.rating}</span>
                </div>

                <h4 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
                  {port.title} <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "rotate-95 text-cyan-400" : "text-slate-600"}`} />
                </h4>

                {isActive ? (
                  <div className="mt-3 text-sm text-slate-300 font-light space-y-3">
                    <p className="leading-relaxed">{port.desc}</p>
                    <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-xxs font-mono text-slate-500">
                      <span>STACK: {port.tech}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm font-light line-clamp-2">{port.desc}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Educational vertical Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        {/* Left Side: Skills progress bars */}
        <div className="lg:col-span-6">
          <h3 className="text-2xl font-bold text-white mb-8">🏆 Skill Keahlian</h3>
          <div className="space-y-5">
            {skills.map((skill, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">{skill.name}</span>
                  <span className="text-cyan-400">{skill.percent}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-900 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.percent}%` }}
                    transition={{ duration: 1.5, delay: idx * 0.05 }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Timeline */}
        <div className="lg:col-span-6">
          <h3 className="text-2xl font-bold text-white mb-8">🕒 Timeline Perjalanan</h3>
          <div className="relative border-l border-slate-800 ml-3 pl-8 space-y-8">
            {educationTimeline.map((item, i) => (
              <div key={i} className="relative group">
                {/* Node indicator */}
                <div className="absolute -left-12 top-1 w-8 h-8 rounded-full border border-slate-800 bg-slate-950 flex items-center justify-center text-cyan-400 text-xs font-mono group-hover:border-cyan-500 shadow-md transition-colors">
                  🎯
                </div>
                <div>
                  <span className="text-xxs font-mono text-cyan-400 uppercase tracking-widest">{item.year}</span>
                  <h4 className="text-lg font-bold text-white mt-1 mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inspirational Quote Card */}
      <div className="p-8 md:p-12 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950/60 to-slate-950/30 text-center max-w-4xl mx-auto shadow-xl">
        <p className="text-xl md:text-2xl text-slate-300 italic font-light leading-relaxed mb-6">
          &ldquo;Teknologi bukan hanya tentang menciptakan sesuatu yang canggih, tetapi tentang menghadirkan solusi yang memberi manfaat nyata bagi kehidupan banyak orang.&rdquo;
        </p>
        <span className="block text-cyan-400 font-mono text-sm uppercase tracking-wider font-semibold">
          — Muhammad Rizky
        </span>
      </div>
    </div>
  );
}
