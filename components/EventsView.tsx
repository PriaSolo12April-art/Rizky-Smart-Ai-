"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Calendar as CalendarIcon, MapPin, Clock, Ticket, Check, X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function EventsView() {
  const { events, joinEvent, user } = useApp();
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  return (
    <div className="relative px-4 md:px-12 py-12 z-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-400 mb-2">CYBER MEETING</h2>
        <h1 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
          Event & <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">Kalender Komunitas</span>
        </h1>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto font-light leading-relaxed">
          Ikuti seminar teknologi digital, hackathon inovatif, kelas web 3D, serta meetup eksklusif bersama Muhammad Rizky di kampus Universitas BBG Aceh.
        </p>
      </div>

      {/* Events Grid list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="p-6 rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-xl flex flex-col justify-between shadow-lg"
          >
            <div>
              {/* Event Header Card */}
              <div className="flex justify-between items-start mb-4">
                <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-xxs font-mono uppercase tracking-wider border border-cyan-500/30">
                  {evt.badge}
                </span>
                <span className="text-xxs font-mono text-slate-500">EVENT_RSC_2026</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-4 leading-snug">{evt.title}</h3>

              {/* Event metadata details */}
              <div className="space-y-3 text-xs text-slate-400 font-light mb-6">
                <div className="flex items-center gap-2.5">
                  <CalendarIcon className="w-4 h-4 text-cyan-400" />
                  <span>{evt.date}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>{evt.time}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span className="truncate">{evt.location}</span>
                </div>
              </div>

              <p className="text-slate-500 text-xs font-light leading-relaxed mb-6">
                {evt.description}
              </p>
            </div>

            {/* Interaction Buttons */}
            <div className="space-y-2">
              {user ? (
                <>
                  <button
                    onClick={() => joinEvent(evt.id)}
                    className={`w-full py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${
                      evt.joined
                        ? "bg-slate-900 border border-slate-800 text-teal-400 hover:text-red-400"
                        : "bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                    }`}
                  >
                    {evt.joined ? (
                      <>
                        <Check className="w-4 h-4" /> Batal Partisipasi
                      </>
                    ) : (
                      "Join Event (+50 Poin)"
                    )}
                  </button>

                  {/* QR Ticket trigger */}
                  {evt.joined && (
                    <button
                      onClick={() => setSelectedTicket(evt)}
                      className="w-full py-2 rounded-xl bg-cyan-950/20 hover:bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xxs font-mono uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Ticket className="w-3.5 h-3.5" /> Buka Tiket QR Anda
                    </button>
                  )}
                </>
              ) : (
                <div className="p-3 rounded-lg bg-slate-900/40 text-center text-xxs text-slate-500 font-mono">
                  MASUK UNTUK MENDAFTAR EVENT
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* QR Ticket Lightbox Modal overlay */}
      <AnimatePresence>
        {selectedTicket && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-sm w-full p-8 rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTicket(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <Ticket className="w-8 h-8 text-cyan-400 mx-auto mb-4 animate-bounce" />
              <h2 className="text-xl font-bold text-white mb-1">Tiket Masuk Digital</h2>
              <span className="text-xxs font-mono text-cyan-400 uppercase tracking-widest block mb-6">
                RSC EVENT ENTRY QR
              </span>

              {/* Simulated QR Code box */}
              <div className="w-48 h-48 mx-auto p-4 bg-white rounded-2xl flex flex-col items-center justify-center shadow-lg mb-6 border border-slate-200">
                {/* Visual grid rendering a gorgeous geometric barcode/matrix */}
                <div className="grid grid-cols-6 gap-1 w-full h-full p-2 bg-white">
                  {Array.from({ length: 36 }).map((_, i) => {
                    const isDark = (i * 7 + 13) % 5 === 0 || (i > 4 && i < 12) || i % 6 === 0 || i > 28;
                    return (
                      <div
                        key={i}
                        className={`rounded-sm transition-colors ${isDark ? "bg-slate-950" : "bg-white"}`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Event info details on Ticket */}
              <div className="border-t border-b border-slate-900 py-4 mb-6 space-y-1.5">
                <h3 className="font-bold text-sm text-white">{selectedTicket.title}</h3>
                <p className="text-xxs font-mono text-slate-500 uppercase">
                  {selectedTicket.date} {" // "} {selectedTicket.time}
                </p>
                <span className="text-xxs font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                  CODE: {selectedTicket.qrCode}
                </span>
              </div>

              <div className="flex gap-2 items-center justify-center text-slate-500 text-xxs font-mono uppercase">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Tunjukkan QR ini kepada Admin di lokasi
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
