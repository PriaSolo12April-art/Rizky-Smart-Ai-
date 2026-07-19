"use client";

import React from "react";
import { Eye, Rocket, Target, Globe2, Network, Terminal, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";

export default function AboutView() {
  const objectives = [
    {
      icon: <Globe2 className="w-6 h-6 text-cyan-400" />,
      title: "Global Collaboration",
      desc: "Menyatukan talenta IT global dalam ekosistem riset & inovasi yang inklusif.",
    },
    {
      icon: <Network className="w-6 h-6 text-purple-400" />,
      title: "Advanced Networking",
      desc: "Menghubungkan mahasiswa dengan industri teknologi berskala internasional.",
    },
    {
      icon: <Terminal className="w-6 h-6 text-indigo-400" />,
      title: "Real Case Studies",
      desc: "Menyediakan ruang untuk memecahkan problem riil melalui AI, IoT, & Web 3D.",
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-teal-400" />,
      title: "Siber Protection",
      desc: "Mempelopori pembelajaran dan pengawasan siber demi menciptakan platform internet aman.",
    },
  ];

  return (
    <div className="relative px-4 md:px-12 py-16 z-10 max-w-6xl mx-auto">
      {/* View Header */}
      <div className="text-center mb-16">
        <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-400 mb-2">INTELLIGENT HUB</h2>
        <h1 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
          Tentang <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">Rizky Smart Community</span>
        </h1>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto font-light leading-relaxed">
          Platform komunitas teknologi masa depan yang didirikan oleh Muhammad Rizky, berfokus pada kolaborasi cerdas, literasi AI, siber security, dan inovasi web 3D.
        </p>
      </div>

      {/* Vision & Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Visi Card */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
          className="relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/25 transition-all duration-500" />
          <div className="p-3 w-12 h-12 rounded-xl bg-cyan-950/50 border border-cyan-500/40 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Eye className="w-6 h-6 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Visi Kami</h2>
          <p className="text-slate-300 leading-relaxed font-light">
            Menjadi ekosistem komunitas teknologi terdepan di tingkat nasional yang melahirkan inovator digital berdaya saing global, mandiri, kreatif, serta menjunjung tinggi etika teknologi digital untuk kebaikan masyarakat.
          </p>
        </motion.div>

        {/* Misi Card */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
          className="relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/25 transition-all duration-500" />
          <div className="p-3 w-12 h-12 rounded-xl bg-purple-950/50 border border-purple-500/40 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Rocket className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Misi Kami</h2>
          <ul className="text-slate-300 space-y-3 font-light list-disc list-inside">
            <li>Menyelenggarakan program pelatihan pemrograman dasar hingga mahir (Next.js, Three.js).</li>
            <li>Mengembangkan kecerdasan buatan (Artificial Intelligence) praktis yang membantu produktivitas harian.</li>
            <li>Mengintegrasikan proyek Internet of Things (IoT) dengan fokus siber security dan efisiensi sistem.</li>
            <li>Membangun platform forum diskusi kolaboratif yang transparan bagi mahasiswa ilmu komputer seluruh dunia.</li>
          </ul>
        </motion.div>
      </div>

      {/* Tujuan / Objectives Section */}
      <div className="p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-3 mb-8">
          <Target className="w-6 h-6 text-indigo-400 animate-pulse" />
          <h2 className="text-2xl font-bold text-white">Tujuan Utama Komunitas</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {objectives.map((obj, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300">
              <div className="flex-shrink-0 mt-1">{obj.icon}</div>
              <div>
                <h3 className="font-semibold text-white mb-1">{obj.title}</h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed">{obj.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
