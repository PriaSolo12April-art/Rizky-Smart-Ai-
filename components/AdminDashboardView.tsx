"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Users,
  FileText,
  Calendar,
  MessageSquare,
  Shield,
  Activity,
  UserPlus,
  Trash2,
  Lock,
  Download,
  Terminal,
  Settings,
} from "lucide-react";
import { motion } from "motion/react";

export default function AdminDashboardView() {
  const { logs, addLog, addNotification } = useApp();
  const [adminTab, setAdminTab] = useState<"users" | "content" | "logs" | "settings">("users");

  // Mock registered users state
  const [registeredUsers, setRegisteredUsers] = useState([
    { id: "u1", name: "Muhammad Rizky", email: "muhammadrizky120406@gmail.com", role: "admin", status: "Active" },
    { id: "u2", name: "Andi Wijaya", email: "andi.wijaya@rizky.com", role: "moderator", status: "Active" },
    { id: "u3", name: "Siti Rahmah", email: "siti.rahmah@rizky.com", role: "user", status: "Active" },
    { id: "u4", name: "Budi Santoso", email: "budi.s@rizky.com", role: "user", status: "Active" },
    { id: "u5", name: "Farah Amalia", email: "farah.amalia@rizky.com", role: "user", status: "Banned" },
  ]);

  const handleRoleChange = (userId: string, newRole: string) => {
    setRegisteredUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    addLog("security", `User ${userId} role changed to ${newRole.toUpperCase()}`);
    addNotification("Sistem Diperbarui", `Role pengguna ID ${userId} berhasil diubah menjadi ${newRole}.`);
  };

  const handleToggleStatus = (userId: string) => {
    setRegisteredUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === "Active" ? "Banned" : "Active";
          addLog("security", `User ${userId} account status set to ${nextStatus}`);
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const exportReport = (format: "Excel" | "PDF") => {
    addLog("success", `Laporan analitik diexport dalam format ${format}.`);
    addNotification(`Export ${format} Sukses`, `Laporan aktivitas ekosistem RSC tahun 2026 telah terunduh.`);
    alert(`[Simulasi Export] Berhasil membuat berkas laporan RSC_Analytics_Report.${format === "Excel" ? "xlsx" : "pdf"}`);
  };

  return (
    <div className="relative px-4 md:px-12 py-12 z-10 max-w-7xl mx-auto space-y-8 text-slate-100">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-900 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-cyan-400" /> Admin Command Center
          </h1>
          <p className="text-xxs font-mono text-slate-500 mt-1 uppercase tracking-wider">
            Rizky Smart Community Root VM Dashboard // Secure Shell OK
          </p>
        </div>

        {/* Exporter Buttons */}
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={() => exportReport("Excel")}
            className="flex-1 md:flex-none px-4 py-2 bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-400 hover:text-white rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" /> Export Excel
          </button>
          <button
            onClick={() => exportReport("PDF")}
            className="flex-1 md:flex-none px-4 py-2 bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-400 hover:text-white rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* Grid Quick Stats Boxes */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-800/80 bg-slate-950/20">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xxs font-mono text-slate-500 uppercase tracking-widest">TOTAL ANGGOTA</span>
            <Users className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-2xl font-bold font-mono text-white">1,240</h3>
          <span className="text-xxs text-emerald-400 font-mono mt-1 block">+12.4% / bln</span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800/80 bg-slate-950/20">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xxs font-mono text-slate-500 uppercase tracking-widest">ARTIKEL AKTIF</span>
            <FileText className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold font-mono text-white">42</h3>
          <span className="text-xxs text-slate-500 font-mono mt-1 block">Riset & Jurnal IT</span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800/80 bg-slate-950/20">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xxs font-mono text-slate-500 uppercase tracking-widest">EVENT KOMUNITAS</span>
            <Calendar className="w-5 h-5 text-indigo-400" />
          </div>
          <h3 className="text-2xl font-bold font-mono text-white">3</h3>
          <span className="text-xxs text-cyan-400 font-mono mt-1 block">Aktif Terdaftar</span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800/80 bg-slate-950/20">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xxs font-mono text-slate-500 uppercase tracking-widest">KOMENTAR FORUM</span>
            <MessageSquare className="w-5 h-5 text-teal-400" />
          </div>
          <h3 className="text-2xl font-bold font-mono text-white">241</h3>
          <span className="text-xxs text-emerald-400 font-mono mt-1 block">Interaksi Tinggi</span>
        </div>
      </div>

      {/* Main double column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Admin Tab Navigation & Workspace (8 cols) */}
        <div className="lg:col-span-8 p-6 md:p-8 rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-xl space-y-6">
          <div className="flex gap-2 border-b border-slate-900 pb-4">
            {[
              { id: "users", label: "Kelola User 👥" },
              { id: "content", label: "Kelola Konten 📝" },
              { id: "logs", label: "System Logs 💻" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id as any)}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  adminTab === tab.id
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                    : "bg-transparent text-slate-500 hover:text-slate-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: KELOLA USER */}
          {adminTab === "users" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="text-slate-500 border-b border-slate-900 pb-3">
                    <th className="py-2.5">NAMA</th>
                    <th className="py-2.5">EMAIL</th>
                    <th className="py-2.5">ROLE</th>
                    <th className="py-2.5">STATUS</th>
                    <th className="py-2.5 text-right">AKSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60">
                  {registeredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-900/20 transition-colors">
                      <td className="py-3.5 font-bold text-white">{u.name}</td>
                      <td className="py-3.5 text-slate-400">{u.email}</td>
                      <td className="py-3.5 text-cyan-400 font-semibold">{u.role.toUpperCase()}</td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded text-xxs font-bold ${u.status === "Active" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right space-x-1.5">
                        <button
                          onClick={() => handleRoleChange(u.id, u.role === "admin" ? "user" : u.role === "moderator" ? "admin" : "moderator")}
                          className="px-2 py-1 bg-slate-950 border border-slate-850 text-slate-400 hover:text-cyan-400 rounded transition-all cursor-pointer"
                          title="Ubah Role"
                        >
                          Role
                        </button>
                        <button
                          onClick={() => handleToggleStatus(u.id)}
                          className="px-2 py-1 bg-slate-950 border border-slate-850 text-slate-400 hover:text-red-400 rounded transition-all cursor-pointer"
                        >
                          {u.status === "Active" ? "Ban" : "Unban"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: KELOLA KONTEN */}
          {adminTab === "content" && (
            <div className="space-y-4">
              <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-2">Buat Artikel Berita Baru</h3>
              <div className="space-y-3.5 text-xs font-mono">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-500">JUDUL KONTEN</label>
                    <input type="text" placeholder="Masukkan judul..." className="w-full p-2.5 bg-slate-950 border border-slate-850 rounded-lg text-slate-200" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-500">KATEGORI</label>
                    <select className="w-full p-2.5 bg-slate-950 border border-slate-850 rounded-lg text-slate-300">
                      <option>AI</option>
                      <option>Siber Security</option>
                      <option>WebDev</option>
                      <option>IoT</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-500">RINGKASAN ARTIKEL</label>
                  <textarea placeholder="Ringkasan singkat..." className="w-full h-24 p-2.5 bg-slate-950 border border-slate-850 rounded-lg text-slate-200 resize-none" />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    addLog("success", "Artikel berita baru berhasil diterbitkan.");
                    addNotification("Berita Baru", "Artikel siber-teknologi RSC terbaru telah dipublikasikan secara global.");
                    alert("Konten berhasil diterbitkan ke blog publik!");
                  }}
                  className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-sans font-medium uppercase tracking-wider"
                >
                  Publikasikan Konten Berita
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SYSTEM LOGS */}
          {adminTab === "logs" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider">VM Terminal Log Outputs</h3>
                <span className="text-xxs px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded font-mono animate-pulse">SYSTEM_STABLE</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 font-mono text-xs text-slate-400 space-y-2 h-[220px] overflow-y-auto">
                {logs.map((log) => (
                  <div key={log.id} className="flex gap-4">
                    <span className="text-slate-600 flex-shrink-0">[{log.timestamp}]</span>
                    <span className={`flex-shrink-0 uppercase font-bold text-xxs ${
                      log.type === "success" ? "text-emerald-400" : log.type === "warning" ? "text-amber-500" : log.type === "security" ? "text-cyan-400" : "text-slate-500"
                    }`}>
                      [{log.type}]
                    </span>
                    <span className="text-slate-300">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column: Activity chart & Security Settings (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Analytical Growth chart */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-xl">
            <h3 className="text-sm font-mono uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-1">
              <Activity className="w-4 h-4" /> Activity Analytics
            </h3>

            {/* Custom high-tech SVG Graph illustrating simulated data */}
            <div className="h-32 w-full bg-slate-950 rounded-xl border border-slate-900 p-2 relative flex items-end">
              <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 30" preserveAspectRatio="none">
                <path
                  d="M 0 25 Q 20 10 40 18 T 80 5 T 100 2"
                  fill="none"
                  stroke="rgba(6, 182, 212, 0.6)"
                  strokeWidth="1.5"
                />
                <path
                  d="M 0 25 Q 20 10 40 18 T 80 5 T 100 2 L 100 30 L 0 30 Z"
                  fill="rgba(6, 182, 212, 0.05)"
                />
              </svg>
              <div className="flex justify-between w-full text-xxs font-mono text-slate-600 px-2">
                <span>JAN</span>
                <span>MAR</span>
                <span>MAY</span>
                <span>JUL</span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className="text-xxs font-mono text-slate-500 uppercase">Membership Growth RSC 2026</span>
            </div>
          </div>

          {/* Secure Settings Console */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-1">
              <Settings className="w-4 h-4" /> Security Hardening
            </h3>

            <div className="space-y-3 text-xs font-mono text-slate-400">
              <div className="flex justify-between items-center py-2 border-b border-slate-900/40">
                <span>SQL Injection Shield</span>
                <span className="text-emerald-400 font-bold">ACTIVE</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-900/40">
                <span>Rate Limiting Tracker</span>
                <span className="text-emerald-400 font-bold">MONITORING</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-900/40">
                <span>2FA Verification</span>
                <span className="text-amber-500 font-bold">OPTIONAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
