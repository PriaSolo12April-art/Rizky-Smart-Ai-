"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Camera, ZoomIn, X, Info } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

export default function GalleryView() {
  const { galleryItems } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const categories = ["All", "UI/UX", "3D Art", "AI Concept", "IoT Prototype"];

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="relative px-4 md:px-12 py-16 z-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-400 mb-2">METAVERSE GALLERY</h2>
        <h1 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
          Eksplorasi Galeri <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">Digital Inovatif</span>
        </h1>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto font-light leading-relaxed">
          Koleksi visualisasi desain, purwarupa Internet of Things (IoT), konsep kecerdasan buatan, dan karya seni digital premium bikinan Muhammad Rizky & Komunitas.
        </p>
      </div>

      {/* Category Selection Bar */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-xl text-sm font-sans tracking-wide transition-all duration-300 backdrop-blur-md cursor-pointer ${
              selectedCategory === cat
                ? "bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-400/40"
                : "bg-slate-950/40 hover:bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Layout Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setSelectedImage(item)}
            className="break-inside-avoid relative rounded-2xl border border-slate-800/80 bg-slate-950/40 backdrop-blur-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300"
          >
            {/* Thumbnail Wrapper */}
            <div className="relative w-full h-auto min-h-[220px] overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={600}
                height={450}
                className="w-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-all duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Glassmorphic Description Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-xxs font-mono uppercase tracking-wider w-fit mb-2 border border-cyan-500/30">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                <p className="text-slate-300 text-xs font-light mb-4 line-clamp-2">{item.description}</p>
                <div className="flex items-center gap-1 text-cyan-300 text-xs font-mono font-medium">
                  <ZoomIn className="w-4 h-4" /> Buka Detail Visual
                </div>
              </div>
            </div>

            {/* Static Card Footer (visible when not hovered) */}
            <div className="p-4 flex justify-between items-center bg-slate-950/20 group-hover:hidden transition-all border-t border-slate-900/30">
              <div>
                <span className="text-slate-500 text-xxs font-mono uppercase tracking-wider">{item.category}</span>
                <h4 className="text-white text-sm font-semibold truncate max-w-[180px]">{item.title}</h4>
              </div>
              <Camera className="w-4 h-4 text-slate-500" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal Overlay (AnimatePresence) */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side: Image */}
              <div className="md:w-3/5 relative min-h-[300px] bg-slate-950">
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Right Side: Details Panel */}
              <div className="md:w-2/5 p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-900 bg-slate-950">
                <div>
                  <span className="px-3 py-1 rounded-full bg-cyan-950/40 text-cyan-300 text-xs font-mono uppercase tracking-wider border border-cyan-500/25 mb-4 inline-block">
                    {selectedImage.category}
                  </span>
                  <h2 className="text-2xl font-bold text-white mb-3">{selectedImage.title}</h2>
                  <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
                    {selectedImage.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-900 flex gap-3 items-start text-xs text-slate-500 font-mono">
                  <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-slate-400">DEVELOPER NOTE</span>
                    <span>Didesain khusus untuk modul kurikulum teknologi RSC oleh Muhammad Rizky.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
