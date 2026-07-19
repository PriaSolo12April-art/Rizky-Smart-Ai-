"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Award, User, Star, Edit, ShieldAlert, CheckCircle, Bell, Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";

export default function UserDashboardView() {
  const { user, isDarkMode, setIsDarkMode, notifications, addLog, registerUser } = useApp();
  const [showEditModal, setShowEditModal] = useState(false);

  // Edit form state
  const [editName, setEditName] = useState(user?.name || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");
  const [editCountry, setEditCountry] = useState(user?.country || "");
  const [editGender, setEditGender] = useState(user?.gender || "Laki-laki");

  const handleUpdateProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    registerUser({
      name: editName,
      username: user.username,
      email: user.email,
      dob: user.dob,
      gender: editGender,
      country: editCountry,
      phone: editPhone,
      role: user.role,
      avatar: user.avatar,
    });

    addLog("success", "Profil pengguna berhasil diperbarui.");
    setShowEditModal(false);
  };

  if (!user) {
    return (
      <div className="p-8 text-center text-slate-500 font-mono">
        SIlahkan masuk terlebih dahulu untuk mengakses Dashboard Akun Anda.
      </div>
    );
  }

  return (
    <div className="relative px-4 md:px-12 py-12 z-10 max-w-6xl mx-auto space-y-8">
      {/* Upper Profile Banner layout */}
      <div className="p-8 rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar frame */}
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 blur opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-slate-900 bg-slate-950">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1.5">
              <h2 className="text-2xl font-bold text-white tracking-tight">{user.name}</h2>
              <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-xxs font-mono uppercase tracking-wider border border-cyan-500/30">
                {user.role}
              </span>
            </div>
            <p className="text-slate-400 text-xs font-mono">{user.email}</p>
            <p className="text-slate-500 text-xs font-mono mt-1">Joined RSC on {user.joinedDate}</p>
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => setShowEditModal(true)}
          className="px-5 py-2 rounded-xl bg-slate-950/60 hover:bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono uppercase tracking-wider cursor-pointer flex items-center gap-1.5"
        >
          <Edit className="w-4 h-4" /> Edit Profil Anda
        </button>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Points Card */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/20 text-center flex flex-col justify-center items-center relative overflow-hidden">
          <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 mb-4 text-cyan-400">
            <Star className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-xxs font-mono text-slate-500 uppercase tracking-widest mb-1">TOTAL REPUTASI POIN</span>
          <h3 className="text-3xl font-bold text-white font-mono tracking-tight">{user.points} Pts</h3>
        </div>

        {/* Badge Card */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/20 text-center flex flex-col justify-center items-center relative overflow-hidden">
          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 mb-4 text-purple-400">
            <Award className="w-6 h-6 animate-bounce" />
          </div>
          <span className="text-xxs font-mono text-slate-500 uppercase tracking-widest mb-1">BADGE PERINGKAT</span>
          <h3 className="text-xl font-bold text-white tracking-tight">{user.badge}</h3>
        </div>

        {/* Level Card */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/20 text-center flex flex-col justify-center items-center relative overflow-hidden">
          <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 mb-4 text-indigo-400">
            <Star className="w-6 h-6" />
          </div>
          <span className="text-xxs font-mono text-slate-500 uppercase tracking-widest mb-1">LEVEL PRESTASI</span>
          <h3 className="text-3xl font-bold text-white font-mono tracking-tight">Lv. {user.level}</h3>
        </div>
      </div>

      {/* Detailed panels layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Notification list & settings (8 cols) */}
        <div className="lg:col-span-8 p-6 md:p-8 rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-xl space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-cyan-400" /> Pusat Notifikasi Sistem
          </h3>

          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
            {notifications.map((notif) => (
              <div key={notif.id} className="p-4 rounded-xl bg-slate-950 border border-slate-900 flex gap-3.5">
                <div className="p-2 rounded-lg bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 flex-shrink-0 h-9 w-9 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">{notif.title}</h4>
                  <p className="text-xs text-slate-400 font-light mt-1 leading-relaxed">{notif.message}</p>
                  <span className="text-xxs text-slate-500 font-mono block mt-2">{notif.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Preferences (Dark mode toggle, etc) (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-xl space-y-6">
          <h3 className="text-sm font-mono uppercase tracking-widest text-cyan-400">PENGATURAN TEMA</h3>

          {/* Dark / Light Mode Toggles */}
          <div className="flex justify-between items-center p-4 rounded-xl bg-slate-950 border border-slate-900">
            <div>
              <span className="text-sm text-slate-300 font-bold block">Ubah Tema Visual</span>
              <span className="text-xxs font-mono text-slate-500 uppercase">
                {isDarkMode ? "Cyber Dark Mode" : "Ambient Light Mode"}
              </span>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:text-white transition-all cursor-pointer"
            >
              {isDarkMode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-500 font-mono leading-relaxed space-y-2">
            <span className="block font-bold text-slate-400 uppercase">Ecosystem Telemetry</span>
            <p>OS CODE: RSC-KERNEL-2026</p>
            <p>CLIENT STATUS: SECURE_LINK_OK</p>
            <p>DATABASE CONTEXT: SQLITE_EMULATOR_LIVE</p>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal overlay */}
      {showEditModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative max-w-md w-full p-8 rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-900 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                <User className="w-5 h-5 text-cyan-400" /> Edit Detail Profil
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-xs font-mono text-slate-500 hover:text-white"
              >
                TUTUP [X]
              </button>
            </div>

            <form onSubmit={handleUpdateProfileSubmit} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-slate-500">NAMA LENGKAP</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-500">NO HP</label>
                <input
                  type="text"
                  required
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-500">NEGARA</label>
                <input
                  type="text"
                  required
                  value={editCountry}
                  onChange={(e) => setEditCountry(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-500">JENIS KELAMIN</label>
                <select
                  value={editGender}
                  onChange={(e) => setEditGender(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none"
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
              >
                Simpan Perubahan
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
