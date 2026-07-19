"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { ShieldCheck, Mail, Lock, User, Calendar, Map, Phone, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function AuthView() {
  const { login, registerUser, user, addLog } = useApp();
  const [mode, setMode] = useState<"login" | "register">("login");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginRole, setLoginRole] = useState<"user" | "admin" | "moderator">("user");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaTarget] = useState({ q: "5 + 4 = ?", a: "9" });
  const [loginError, setLoginError] = useState("");

  // Register form state
  const [regName, setRegName] = useState("");
  const [regUser, setRegUser] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regConfPass, setRegConfPass] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regDob, setRegDob] = useState("");
  const [regGender, setRegGender] = useState("Laki-laki");
  const [regCountry, setRegCountry] = useState("Indonesia");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpInput, setOtpInput] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail || !loginPass) {
      setLoginError("Email dan Password wajib diisi.");
      return;
    }

    if (captchaAnswer !== captchaTarget.a) {
      setLoginError("Jawaban captcha salah.");
      return;
    }

    login(loginEmail, loginRole);
  };

  const triggerOtp = () => {
    if (!regEmail || !regPhone) {
      alert("Harap isi Email dan No Handphone terlebih dahulu.");
      return;
    }
    const simulatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpCode(simulatedCode);
    setOtpSent(true);
    addLog("info", `OTP terkirim ke ${regEmail} & SMS ${regPhone}: ${simulatedCode}`);
    alert(`[Simulasi SMS/Email OTP] Kode Verifikasi Keamanan Anda adalah: ${simulatedCode}`);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (regPass !== regConfPass) {
      alert("Password konfirmasi tidak cocok.");
      return;
    }

    if (otpSent && otpInput !== otpCode) {
      alert("Kode OTP tidak valid.");
      return;
    }

    registerUser({
      name: regName,
      username: regUser,
      email: regEmail,
      dob: regDob,
      gender: regGender,
      country: regCountry,
      phone: regPhone,
      role: "user",
      avatar: "https://picsum.photos/seed/newprofile/150/150",
    });
  };

  return (
    <div className="relative px-4 py-12 z-10 flex items-center justify-center min-h-[85vh]">
      <div className="w-full max-w-xl p-8 rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Neon decorative background glow blur inside */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />

        {/* Mode Selector Headers */}
        <div className="flex border-b border-slate-900 pb-6 mb-8 justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-1.5">
              <ShieldCheck className="w-6 h-6 text-cyan-400 animate-pulse" /> Security Center
            </h1>
            <p className="text-xxs font-mono text-slate-500 mt-1">SECURE PORT VERIFIED SHA-256</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setMode("login");
                setLoginError("");
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                mode === "login"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                  : "bg-transparent text-slate-500 hover:text-slate-300"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("register")}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                mode === "register"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                  : "bg-transparent text-slate-500 hover:text-slate-300"
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* 1. LOGIN MODE VIEW */}
        {mode === "login" && (
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {loginError && (
              <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30 text-red-300 text-xs flex gap-2 items-center">
                <span>{loginError}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400 block uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  placeholder="name@domain.com"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-cyan-500/50 rounded-xl text-sm focus:outline-none placeholder-slate-600"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400 block uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  required
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-cyan-500/50 rounded-xl text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* Simulated Roles Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400 block uppercase tracking-wider">Pilih Role Akses</label>
              <div className="grid grid-cols-3 gap-3">
                {["user", "moderator", "admin"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setLoginRole(r as any)}
                    className={`py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      loginRole === r
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                        : "bg-slate-950/40 border border-slate-850 text-slate-500"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Captcha Check */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400 block uppercase tracking-wider">Keamanan Captcha</label>
              <div className="flex gap-4">
                <div className="px-5 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-sm font-bold font-mono text-white select-none">
                  {captchaTarget.q}
                </div>
                <input
                  type="text"
                  placeholder="Jawaban?"
                  required
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  className="flex-1 px-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-cyan-500/50 rounded-xl text-sm focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Sign In Options */}
            <div className="flex justify-between items-center text-xs font-mono py-2 text-slate-500">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded bg-slate-950 border-slate-850 text-cyan-500 focus:ring-0" />
                <span>Remember Me</span>
              </label>
              <a href="#" className="hover:text-cyan-400 transition-colors">Forgot Password?</a>
            </div>

            {/* Google / Github Login simulation buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => login("google@rizky.com", "user")}
                className="py-2.5 rounded-xl border border-slate-850 bg-slate-950/40 text-slate-300 text-xs font-mono hover:text-white hover:border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Google Connect
              </button>
              <button
                type="button"
                onClick={() => login("github@rizky.com", "admin")}
                className="py-2.5 rounded-xl border border-slate-850 bg-slate-950/40 text-slate-300 text-xs font-mono hover:text-white hover:border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                GitHub Developer
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-sans font-medium text-sm transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] flex items-center justify-center gap-2 cursor-pointer"
            >
              Sign In to RSC Ecosystem <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* 2. REGISTER MODE VIEW */}
        {mode === "register" && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4 max-h-[550px] overflow-y-auto pr-2">
            <h3 className="text-sm font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" /> Formulir Pendaftaran Anggota Baru
            </h3>

            {/* Linear Grid Form inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xxs font-mono text-slate-400 block uppercase">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xxs font-mono text-slate-400 block uppercase">Username</label>
                <input
                  type="text"
                  required
                  value={regUser}
                  onChange={(e) => setRegUser(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xxs font-mono text-slate-400 block uppercase">Email Address</label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xxs font-mono text-slate-400 block uppercase">No HP (WhatsApp)</label>
                <input
                  type="text"
                  placeholder="+62"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xxs font-mono text-slate-400 block uppercase">Password</label>
                <input
                  type="password"
                  required
                  value={regPass}
                  onChange={(e) => setRegPass(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xxs font-mono text-slate-400 block uppercase">Konfirmasi Password</label>
                <input
                  type="password"
                  required
                  value={regConfPass}
                  onChange={(e) => setRegConfPass(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xxs font-mono text-slate-400 block uppercase">Tanggal Lahir</label>
                <input
                  type="date"
                  required
                  value={regDob}
                  onChange={(e) => setRegDob(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-xs text-slate-400 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xxs font-mono text-slate-400 block uppercase">Jenis Kelamin</label>
                <select
                  value={regGender}
                  onChange={(e) => setRegGender(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>

            {/* OTP Verifikasi box */}
            <div className="p-4 rounded-xl bg-slate-950/85 border border-slate-850 space-y-3 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-xxs font-mono text-cyan-400 uppercase tracking-wider block">Verifikasi OTP Keamanan</span>
                <button
                  type="button"
                  onClick={triggerOtp}
                  className="text-xxs font-mono text-cyan-400 hover:underline cursor-pointer"
                >
                  {otpSent ? "Kirim Ulang OTP" : "Kirim OTP via SMS/WA"}
                </button>
              </div>

              {otpSent && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Masukkan 6-Digit OTP"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono text-center tracking-widest"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-sans font-medium text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Selesaikan Pendaftaran & Masuk
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
