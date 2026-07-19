"use client";

import React, { useState } from "react";
import { useApp, AppView } from "../context/AppContext";
import ThreeBackground from "../components/ThreeBackground";
import HeroView from "../components/HeroView";
import AboutView from "../components/AboutView";
import FeaturesView from "../components/FeaturesView";
import GalleryView from "../components/GalleryView";
import BlogView from "../components/BlogView";
import DeveloperView from "../components/DeveloperView";
import AIChatView from "../components/AIChatView";
import CommunityView from "../components/CommunityView";
import EventsView from "../components/EventsView";
import GamesView from "../components/GamesView";
import AuthView from "../components/AuthView";
import UserDashboardView from "../components/UserDashboardView";
import AdminDashboardView from "../components/AdminDashboardView";

import {
  Menu,
  X,
  User,
  LogOut,
  Sparkles,
  Award,
  Bell,
  Heart,
  Mail,
  ChevronRight,
  Shield,
  Bot,
  Gamepad2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Home() {
  const {
    activeView,
    setActiveView,
    user,
    logout,
    notifications,
    markNotificationsAsRead,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showNotificationsOpen, setShowNotificationsOpen] = useState(false);

  const navItems: { id: AppView; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "features", label: "Features" },
    { id: "gallery", label: "Gallery" },
    { id: "blog", label: "Blog" },
    { id: "developer", label: "Developer" },
    { id: "community", label: "Forum" },
    { id: "events", label: "Events" },
    { id: "games", label: "Cyber Games" },
    { id: "ai-assistant", label: "AI Assistant" },
  ];

  const handleNavClick = (view: AppView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    setShowNotificationsOpen(false);
  };

  const handleNotificationClick = () => {
    setShowNotificationsOpen(!showNotificationsOpen);
    setProfileDropdownOpen(false);
    markNotificationsAsRead();
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <main className="relative min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 bg-[#020617] overflow-x-hidden">
      {/* 3D Moving mesh and particles canvas background */}
      <ThreeBackground />

      {/* Artistic Flair Aurora Backgrounds */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-50px] right-[-50px] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
        <div className="grid grid-cols-12 h-full w-full">
          <div className="border-r border-slate-300"></div>
          <div className="border-r border-slate-300"></div>
          <div className="border-r border-slate-300"></div>
          <div className="border-r border-slate-300"></div>
          <div className="border-r border-slate-300"></div>
          <div className="border-r border-slate-300"></div>
          <div className="border-r border-slate-300"></div>
          <div className="border-r border-slate-300"></div>
          <div className="border-r border-slate-300"></div>
          <div className="border-r border-slate-300"></div>
          <div className="border-r border-slate-300"></div>
          <div className="border-r border-slate-300"></div>
        </div>
      </div>

      {/* Floating 3D/Ambient Outline Elements */}
      <div className="absolute top-1/4 right-[5%] w-12 h-12 border border-cyan-500/20 rotate-45 animate-pulse pointer-events-none z-0"></div>
      <div className="absolute bottom-1/3 left-[5%] w-8 h-8 rounded-full border border-purple-500/20 pointer-events-none z-0"></div>

      {/* FLOATING GLASS HEADER */}
      <header className="sticky top-4 z-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300">
        <div className="flex h-16 items-center justify-between bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 sm:px-8 shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all group-hover:scale-105">
              <span className="font-mono text-base font-bold text-white">R</span>
            </div>
            <div>
              <span className="font-sans text-sm font-extrabold tracking-tight text-white sm:text-base">
                Rizky Smart Community
              </span>
              <span className="block text-xxs font-mono text-cyan-400 uppercase tracking-widest leading-none">
                3D CYBER NETWORK
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-1">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? "text-cyan-400 font-bold bg-white/10 border border-white/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Side hub Controls */}
          <div className="hidden lg:flex items-center gap-4">
            {/* System Notification Hub Bell */}
            <div className="relative">
              <button
                onClick={handleNotificationClick}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-400 transition-colors relative cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-xxs font-bold text-white font-mono animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification dropdown modal panel */}
              <AnimatePresence>
                {showNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute right-0 mt-3.5 w-80 rounded-2xl border border-slate-850 bg-slate-950 p-4 shadow-2xl z-50 space-y-3"
                  >
                    <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                      <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">NOTIFIKASI SISTEM</span>
                      <span className="text-xxs font-mono text-slate-500">REALTIME</span>
                    </div>

                    <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
                      {notifications.map((notif) => (
                        <div key={notif.id} className="text-xs space-y-0.5 border-b border-slate-900/60 pb-2.5 last:border-0 last:pb-0">
                          <h4 className="font-bold text-slate-200">{notif.title}</h4>
                          <p className="text-slate-400 font-light leading-snug">{notif.message}</p>
                          <span className="text-xxs font-mono text-slate-500 block pt-1">{notif.time}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Portal Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(!profileDropdownOpen);
                    setShowNotificationsOpen(false);
                  }}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full bg-slate-950/60 border border-slate-850 hover:border-cyan-500/30 transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-800 bg-slate-950">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-bold text-white max-w-[80px] truncate leading-none mb-0.5">{user.name}</span>
                    <span className="block text-xxs font-mono text-cyan-400 leading-none">{user.points} Pts</span>
                  </div>
                </button>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-850 bg-slate-950 p-4 shadow-2xl z-50 space-y-1 font-mono text-xs"
                    >
                      <button
                        onClick={() => handleNavClick("dashboard")}
                        className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-900 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-2"
                      >
                        <User className="w-4 h-4" /> Dashboard Akun
                      </button>

                      {user.role === "admin" && (
                        <button
                          onClick={() => handleNavClick("admin")}
                          className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-900 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-2"
                        >
                          <Shield className="w-4 h-4" /> Admin Panel
                        </button>
                      )}

                      <div className="border-t border-slate-900 my-2" />

                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left py-2 px-3 rounded-lg hover:bg-red-950/20 text-red-400 transition-colors cursor-pointer flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick("login")}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono text-xs uppercase tracking-wider shadow-md hover:shadow-cyan-500/20 transition-all cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Burger Trigger */}
          <div className="flex lg:hidden items-center gap-3">
            {user && (
              <button
                onClick={() => handleNavClick("dashboard")}
                className="w-8 h-8 rounded-full overflow-hidden border border-slate-800 bg-slate-950"
              >
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-950/60 border border-slate-850 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-slate-900 bg-slate-950/95 backdrop-blur-xl"
            >
              <div className="px-4 py-6 space-y-2 flex flex-col font-mono text-sm text-center">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`py-3 rounded-xl ${
                      activeView === item.id
                        ? "text-cyan-400 font-bold bg-cyan-950/20"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}

                <div className="border-t border-slate-900 my-4" />

                {user ? (
                  <>
                    <button
                      onClick={() => handleNavClick("dashboard")}
                      className="py-3 text-cyan-400"
                    >
                      Dashboard Member
                    </button>
                    {user.role === "admin" && (
                      <button
                        onClick={() => handleNavClick("admin")}
                        className="py-3 text-indigo-400"
                      >
                        Admin Command Panel
                      </button>
                    )}
                    <button onClick={logout} className="py-3 text-red-400">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleNavClick("login")}
                    className="py-3 text-cyan-400 font-bold"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* DYNAMIC CONTENT CONTAINER WITH SMOOTH SLIDE FADE TRANSITION */}
      <section className="relative z-10 w-full min-h-[80vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            {activeView === "home" && <HeroView />}
            {activeView === "about" && <AboutView />}
            {activeView === "features" && <FeaturesView />}
            {activeView === "gallery" && <GalleryView />}
            {activeView === "blog" && <BlogView />}
            {activeView === "developer" && <DeveloperView />}
            {activeView === "ai-assistant" && <AIChatView />}
            {activeView === "community" && <CommunityView />}
            {activeView === "events" && <EventsView />}
            {activeView === "games" && <GamesView />}
            {activeView === "login" && <AuthView />}
            {activeView === "register" && <AuthView />}
            {activeView === "dashboard" && <UserDashboardView />}
            {activeView === "admin" && <AdminDashboardView />}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* LUXURIOUS FLOATING GLASS FUTURISTIC FOOTER */}
      <footer className="relative z-20 mx-auto max-w-7xl my-12 px-6 py-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.2)] text-slate-400">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand Left Widget */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <span className="font-mono text-base font-bold text-white">R</span>
              </div>
              <div>
                <span className="font-sans text-sm font-extrabold tracking-tight text-white sm:text-base">
                  Rizky Smart Community
                </span>
                <span className="block text-xxs font-mono text-cyan-400 uppercase tracking-widest leading-none">
                  INNOVATION FOR EVERYONE
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm font-light">
              Membangun ruang kolaborasi digital, keahlian praktis di bidang kecerdasan buatan, web modern 3D, siber pertahanan, dan IoT untuk mahasiswa dan praktisi teknologi siber.
            </p>

            <span className="block text-xxs font-mono text-slate-600">
              BUILD KERNEL: RSC-V2.0-PRODUCTION
            </span>
          </div>

          {/* Quick Nav Links Grid */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8 text-xs font-mono">
            <div className="space-y-3">
              <span className="block text-slate-400 font-bold uppercase tracking-wider">ECOSYSTEM</span>
              <ul className="space-y-2 font-light">
                {navItems.slice(0, 5).map((item) => (
                  <li key={item.id}>
                    <button onClick={() => handleNavClick(item.id)} className="hover:text-cyan-400 transition-colors cursor-pointer text-left">
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <span className="block text-slate-400 font-bold uppercase tracking-wider">RESOURCES</span>
              <ul className="space-y-2 font-light">
                {navItems.slice(5).map((item) => (
                  <li key={item.id}>
                    <button onClick={() => handleNavClick(item.id)} className="hover:text-cyan-400 transition-colors cursor-pointer text-left">
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Creative Director / Contact Widget */}
          <div className="md:col-span-3 space-y-4">
            <span className="block text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">CREATOR CONTACT</span>
            <div className="text-xs space-y-2 font-light">
              <p className="text-white font-medium">Muhammad Rizky</p>
              <p className="text-slate-500 font-mono">Cadek, Aceh Besar, Aceh</p>
              <a href="mailto:muhammadrizky120406@gmail.com" className="block text-cyan-400 hover:underline">
                muhammadrizky120406@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Footer Credit node */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-xxs font-mono text-slate-500 gap-4 text-center">
          <span>© 2026 Rizky Smart Community. All rights reserved.</span>
          <span>Designed & Engineered with ❤️ by Muhammad Rizky in Aceh, Indonesia</span>
        </div>
      </footer>
    </main>
  );
}
