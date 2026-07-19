"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Search, Calendar, User, Heart, MessageSquare, ArrowRight, BookOpen, Send } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

export default function BlogView() {
  const { blogs, addBlogComment, addPoints, user } = useApp();
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [likedBlogs, setLikedBlogs] = useState<string[]>([]);
  const [commentInput, setCommentInput] = useState<{ [key: string]: string }>({});
  const [activeCommentsBlogId, setActiveCommentsBlogId] = useState<string | null>(null);

  const categories = ["All", "Tech", "AI", "Programming", "Design", "Siber Security"];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCat === "All" || blog.category === selectedCat;
    return matchesSearch && matchesCategory;
  });

  const handleLike = (id: string) => {
    if (likedBlogs.includes(id)) {
      setLikedBlogs((prev) => prev.filter((i) => i !== id));
    } else {
      setLikedBlogs((prev) => [...prev, id]);
      addPoints(10); // Earn 10 points for liking articles
    }
  };

  const handleCommentSubmit = (blogId: string) => {
    const commentText = commentInput[blogId];
    if (!commentText || !commentText.trim()) return;

    // Simulate adding comment
    addBlogComment(blogId);
    setCommentInput((prev) => ({ ...prev, [blogId]: "" }));
    // Notify log/points through context automatically inside addBlogComment
  };

  return (
    <div className="relative px-4 md:px-12 py-16 z-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-400 mb-2">CYBER PUBLICATIONS</h2>
        <h1 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
          Artikel & <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">Wawasan Cyber</span>
        </h1>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto font-light leading-relaxed">
          Temukan jurnal edukasi, berita teknologi siber terhangat, tutorial praktis pemrograman, serta berita komputasi quantum.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 order-2 md:order-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                selectedCat === cat
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "bg-slate-950/40 hover:bg-slate-900/60 border border-slate-900 text-slate-500 hover:text-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80 order-1 md:order-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Cari artikel teknologi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/40 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 backdrop-blur-md text-sm"
          />
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => {
          const isLiked = likedBlogs.includes(blog.id);
          const showComments = activeCommentsBlogId === blog.id;

          return (
            <motion.div
              key={blog.id}
              whileHover={{ y: -5 }}
              className="relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-950/40 backdrop-blur-xl overflow-hidden shadow-xl"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative w-full h-48 overflow-hidden bg-slate-900">
                  <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xxs font-mono uppercase tracking-wider">
                    {blog.category}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  {/* Meta Dates */}
                  <div className="flex gap-4 items-center text-slate-500 text-xs font-mono mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" /> {blog.author}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 hover:text-cyan-300 transition-colors cursor-pointer">
                    {blog.title}
                  </h3>
                  <p className="text-slate-400 text-sm font-light leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 border-t border-slate-900/60 mt-4">
                <div className="flex justify-between items-center py-4 text-xs font-mono">
                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(blog.id)}
                    className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isLiked ? "text-pink-500" : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-pink-500" : ""}`} />
                    <span>{blog.likes + (isLiked ? 1 : 0)} Likes</span>
                  </button>

                  {/* Comment Toggle Button */}
                  <button
                    onClick={() => setActiveCommentsBlogId(showComments ? null : blog.id)}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{blog.comments} Comments</span>
                  </button>
                </div>

                {/* Collapsible comment box section */}
                <AnimatePresence>
                  {showComments && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pt-4 border-t border-slate-900"
                    >
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder={user ? "Ketik komentar Anda..." : "Masuk untuk menulis..."}
                          disabled={!user}
                          value={commentInput[blog.id] || ""}
                          onChange={(e) =>
                            setCommentInput((prev) => ({ ...prev, [blog.id]: e.target.value }))
                          }
                          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                        />
                        <button
                          onClick={() => handleCommentSubmit(blog.id)}
                          disabled={!user}
                          className="p-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-50 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xxs text-slate-500 mt-1 font-mono uppercase tracking-wider">
                        MENULIS KOMENTAR MEMBERIKAN +10 POIN RSC
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-4 flex items-center gap-1 text-cyan-400 text-xs font-mono font-medium hover:text-cyan-300 transition-colors cursor-pointer w-fit">
                  <BookOpen className="w-4 h-4" /> Baca Selengkapnya <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
