"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { MessageSquare, Heart, Share2, Filter, Sparkles, Send, Tag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function CommunityView() {
  const { posts, createPost, likePost, commentOnPost, user } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newPostText, setNewPostText] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("General");
  const [newPostTags, setNewPostTags] = useState("");
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState("");

  const categories = ["All", "General", "WebDev", "AI & ML", "CyberSec", "IoT"];

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const handleCreatePost = () => {
    if (!newPostText.trim()) return;
    const tagsArray = newPostTags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    createPost(newPostText, newPostCategory, tagsArray);
    setNewPostText("");
    setNewPostTags("");
  };

  const handleCreateComment = (postId: string) => {
    if (!commentInput.trim()) return;
    commentOnPost(postId, commentInput);
    setCommentInput("");
  };

  const triggerShare = (postId: string) => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: "Rizky Smart Community Forum",
        text: "Lihat diskusi menarik ini di RSC!",
        url: window.location.href,
      });
    } else {
      alert("Tautan diskusi berhasil disalin ke clipboard!");
    }
  };

  const trendingTags = ["NextJS", "CyberSecurity", "AcehInovatif", "ThreeJS", "Gemini3.5", "BinaBangsaGetsempena"];

  return (
    <div className="relative px-4 md:px-12 py-12 z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Post Creator & Feed (8 cols) */}
      <div className="lg:col-span-8 space-y-6">
        {/* Post Creator Box */}
        {user ? (
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-xl shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-1.5 font-sans">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" /> Bagikan Ide atau Pertanyaan IT Anda
            </h3>

            <textarea
              placeholder="Apa yang ingin Anda bagikan atau tanyakan hari ini, teknologi, siber, atau web development?"
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              className="w-full min-h-[100px] p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 resize-none mb-4"
            />

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="flex gap-4 w-full sm:w-auto">
                {/* Category selector */}
                <div className="flex flex-col">
                  <span className="text-xxs font-mono text-slate-500 uppercase tracking-wider mb-1">Kategori</span>
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="General">General</option>
                    <option value="WebDev">WebDev</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="CyberSec">CyberSec</option>
                    <option value="IoT">IoT</option>
                  </select>
                </div>

                {/* Tags inputs */}
                <div className="flex flex-col flex-1 sm:w-48">
                  <span className="text-xxs font-mono text-slate-500 uppercase tracking-wider mb-1">Tags (pisahkan koma)</span>
                  <input
                    type="text"
                    placeholder="NextJS, Cyber, AI"
                    value={newPostTags}
                    onChange={(e) => setNewPostTags(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none placeholder-slate-600"
                  />
                </div>
              </div>

              {/* Submit Post Button */}
              <button
                onClick={handleCreatePost}
                disabled={!newPostText.trim()}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-sans font-medium hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all cursor-pointer disabled:opacity-50"
              >
                Kirim Postingan (+30 Poin)
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl border border-slate-800/80 bg-slate-950/20 text-center">
            <p className="text-slate-400 text-sm">Silakan masuk ke akun Anda terlebih dahulu untuk memposting atau berinteraksi di forum komunitas.</p>
          </div>
        )}

        {/* Filter Toolbar */}
        <div className="flex items-center justify-between border-b border-slate-900 pb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-1.5 font-sans">
            <Filter className="w-4 h-4 text-cyan-400" /> Diskusi Aktif
          </h2>

          <div className="flex gap-1.5 overflow-x-auto max-w-[60%] scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xxs font-mono uppercase transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                    : "bg-slate-950/40 hover:bg-slate-900/60 text-slate-500 hover:text-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Post list */}
        <div className="space-y-6">
          {filteredPosts.map((post) => {
            const hasLiked = user ? post.likedBy.includes(user.email) : false;
            const isCommentsOpen = activeCommentPostId === post.id;

            return (
              <motion.div
                key={post.id}
                layout
                className="p-6 rounded-2xl border border-slate-800/80 bg-slate-950/30 backdrop-blur-xl shadow-md"
              >
                {/* Author Info */}
                <div className="flex gap-3 items-center mb-4">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-800 bg-slate-950">
                    <img src={post.authorAvatar} alt={post.authorName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {post.authorName}
                      <span className="text-xxs px-1.5 py-0.5 bg-cyan-950/80 text-cyan-300 rounded-full font-mono border border-cyan-500/20">
                        {post.authorRole}
                      </span>
                    </h4>
                    <span className="text-xxs text-slate-500 font-mono">{post.timestamp}</span>
                  </div>
                </div>

                {/* Content Text */}
                <p className="text-slate-300 text-sm leading-relaxed mb-4 whitespace-pre-wrap font-light">
                  {post.content}
                </p>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="text-xxs font-mono text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-0.5 cursor-pointer">
                        <Tag className="w-3 h-3" /> #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Bottom Actions Bar */}
                <div className="flex justify-between items-center py-3 border-t border-b border-slate-900/40 text-xs font-mono text-slate-500">
                  {/* Like Toggle */}
                  <button
                    onClick={() => likePost(post.id)}
                    disabled={!user}
                    className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                      hasLiked ? "text-pink-500" : "hover:text-slate-300"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${hasLiked ? "fill-pink-500" : ""}`} />
                    <span>{post.likes} Likes</span>
                  </button>

                  {/* Comment Toggle */}
                  <button
                    onClick={() => setActiveCommentPostId(isCommentsOpen ? null : post.id)}
                    className="flex items-center gap-1.5 hover:text-slate-300 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments.length} Comments</span>
                  </button>

                  {/* Share button */}
                  <button onClick={() => triggerShare(post.id)} className="flex items-center gap-1.5 hover:text-slate-300 cursor-pointer">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>

                {/* Comments box panel */}
                <AnimatePresence>
                  {isCommentsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pt-4 space-y-4"
                    >
                      {/* Comments Feed list */}
                      <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-2">
                        {post.comments.map((comm) => (
                          <div key={comm.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-900 flex gap-3">
                            <div className="w-7 h-7 rounded-full overflow-hidden border border-slate-900 bg-slate-950 flex-shrink-0">
                              <img src={comm.authorAvatar} alt={comm.authorName} className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-1 flex-1">
                              <div className="flex justify-between items-center text-xxs font-mono text-slate-500">
                                <span className="font-bold text-slate-300">{comm.authorName}</span>
                                <span>{comm.timestamp}</span>
                              </div>
                              <p className="text-xs text-slate-300 font-light leading-relaxed">{comm.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Write comment input */}
                      {user ? (
                        <div className="flex gap-2 pt-2 border-t border-slate-900">
                          <input
                            type="text"
                            placeholder="Tulis balasan Anda..."
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleCreateComment(post.id);
                            }}
                            className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-850 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                          />
                          <button
                            onClick={() => handleCreateComment(post.id)}
                            className="p-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <p className="text-xxs text-slate-500 text-center italic">Masuk untuk meninggalkan komentar pada post ini.</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Trending Tags & Panel (4 cols) */}
      <div className="lg:col-span-4 space-y-6">
        {/* Community Rules */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-xl">
          <h3 className="text-sm font-mono uppercase tracking-widest text-cyan-400 mb-4">FORUM RULES // RSC</h3>
          <ul className="space-y-2 text-xs text-slate-400 font-light leading-relaxed">
            <li>1. Jaga kesopanan dan hormati sesama pengembang IT.</li>
            <li>2. Hindari spamming, promosi tak berizin, atau perdebatan SARA.</li>
            <li>3. Bagikan kode pemrograman dengan format yang rapi.</li>
            <li>4. Setiap kontribusi postingan memberikan +30 poin reputasi.</li>
            <li>5. Memberikan komentar memberikan +15 poin reputasi.</li>
          </ul>
        </div>

        {/* Trending Tags Widget */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-xl">
          <h3 className="text-sm font-mono uppercase tracking-widest text-cyan-400 mb-4">TRENDING TOPICS</h3>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 text-xxs font-mono text-slate-400 hover:text-white rounded-lg shadow-sm cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
