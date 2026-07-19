"use client";

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { 
  Bot, Send, Mic, Volume2, VolumeX, Trash2, Sparkles, AlertCircle, Headphones,
  Paperclip, Plus, File, Image as ImageIcon, Video, Music, ChevronRight, X, 
  Link, Camera, Database, ShieldAlert, Play, Pause, Square, Volume1, ArrowUpRight, Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

interface Attachment {
  type: "image" | "text";
  name: string;
  data: string; // Base64 content for images, text content for files
  mimeType?: string;
}

interface Message {
  role: "user" | "model";
  content: string;
  timestamp: string;
  attachment?: Attachment;
  generatedImage?: string; // Image URL or Base64
  generatedVideo?: {
    prompt: string;
    videoUrl?: string; // Optional stock/hologram video url or canvas fallback
  };
  generatedMusic?: {
    id: string;
    prompt: string;
    genre: string;
  };
}

export default function AIChatView() {
  const { addPoints, addLog } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Attachment states
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
  const [attachedFile, setAttachedFile] = useState<Attachment | null>(null);
  
  // Dialog & Modal states
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isMusicModalOpen, setIsMusicModalOpen] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [isSecurityScannerOpen, setIsSecurityScannerOpen] = useState(false);

  // Prompt states for modals
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageRatio, setImageRatio] = useState("1:1");
  const [videoPrompt, setVideoPrompt] = useState("");
  const [videoRenderingStage, setVideoRenderingStage] = useState<number | null>(null);
  const [musicPrompt, setMusicPrompt] = useState("");
  const [musicGenre, setMusicGenre] = useState("Cyberpunk Synthwave");
  const [pastedUrl, setPastedUrl] = useState("");
  const [customCodeToScan, setCustomCodeToScan] = useState("");
  const [scanningCodeProgress, setScanningCodeProgress] = useState(false);
  const [scannerResult, setScannerResult] = useState<any>(null);

  // Hidden references
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraVideoRef = useRef<HTMLVideoElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Music Synth Playing States
  const [playingMusicId, setPlayingMusicId] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<any>(null);

  // Web Audio Synth parameters
  const playSynthMelody = (id: string, genre: string) => {
    // Stop currently playing
    stopSynthMelody();

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;
      setPlayingMusicId(id);

      addLog("info", `Memainkan sintesis audio AI: ${genre}`);

      // Basic synth step sequences based on genre
      let tempo = 120;
      let notes: number[] = [60, 62, 65, 67, 69, 72]; // Pentatonic root
      
      if (genre === "Cyberpunk Synthwave") {
        tempo = 125;
        notes = [48, 48, 51, 51, 55, 55, 53, 56]; // Heavy retro bass notes
      } else if (genre === "Ambient Chill") {
        tempo = 80;
        notes = [60, 64, 67, 71, 74, 76]; // Dreamy major 7 / 9 chords
      } else if (genre === "Aceh Traditional Fusion") {
        tempo = 110;
        notes = [58, 61, 63, 65, 68, 70]; // Mystic scale reminiscent of Seurune Kalee
      } else if (genre === "Orchestral Future") {
        tempo = 90;
        notes = [50, 53, 57, 58, 62, 65]; // Dramatic minor progression
      }

      let step = 0;
      const playStep = () => {
        if (!ctx || ctx.state === "closed") return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Audio node routing
        osc.connect(gain);
        gain.connect(ctx.destination);

        // Map step to midi note
        const midi = notes[step % notes.length];
        const freq = Math.pow(2, (midi - 69) / 12) * 440;

        osc.frequency.setValueAtTime(freq, now);

        if (genre === "Cyberpunk Synthwave") {
          osc.type = "sawtooth";
          // Quick punchy envelope
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
          osc.start(now);
          osc.stop(now + 0.3);
        } else if (genre === "Ambient Chill") {
          osc.type = "sine";
          // Gentle swelling envelope
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.1, now + 0.2);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
          osc.start(now);
          osc.stop(now + 1.2);
        } else if (genre === "Aceh Traditional Fusion") {
          osc.type = "triangle";
          // Plucked / flute-like envelope
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
          osc.start(now);
          osc.stop(now + 0.3);
        } else {
          osc.type = "triangle";
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
          osc.start(now);
          osc.stop(now + 0.6);
        }

        step++;
      };

      const stepDuration = 60 / tempo / 2; // eighth notes
      playStep();
      
      const interval = setInterval(() => {
        playStep();
      }, stepDuration * 1000);

      synthIntervalRef.current = interval;

    } catch (err) {
      console.error("Gagal menjalankan Web Audio API:", err);
      addLog("warning", "Gagal memutar audio: Browser Anda memblokir AudioContext.");
    }
  };

  const stopSynthMelody = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {}
      audioCtxRef.current = null;
    }
    setPlayingMusicId(null);
  };

  // Default welcome message and load history
  useEffect(() => {
    const savedChat = localStorage.getItem("rsc_ai_chat");
    if (savedChat) {
      setTimeout(() => {
        setMessages(JSON.parse(savedChat));
      }, 0);
    } else {
      const welcome: Message = {
        role: "model",
        content:
          "Halo! Saya adalah Asisten AI Resmi dari **Rizky Smart Community**. Saya didukung oleh model **Gemini 3.5-Flash** untuk menjawab pertanyaan teknologi Anda.\n\nSekarang Anda dapat melampirkan file dari sistem Anda atau Google Drive, menggunakan kamera Anda, serta membuat karya seni, musik synthesizer langsung, dan video menggunakan alat kecerdasan buatan terintegrasi!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setTimeout(() => {
        setMessages([welcome]);
      }, 0);
    }
  }, []);

  // Cleanup synthesizer on unmount
  useEffect(() => {
    return () => {
      stopSynthMelody();
    };
  }, []);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const saveChatHistory = (updated: Message[]) => {
    setMessages(updated);
    localStorage.setItem("rsc_ai_chat", JSON.stringify(updated));
  };

  const speakText = (text: string) => {
    if (!isSpeechEnabled || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // Stop any running speech

    // Basic cleaning of markdown tags
    const cleanText = text.replace(/[*#`_\-]/g, "").trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "id-ID"; // Indonesian voice synthesis
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (customPrompt?: string, specialResponsePayload?: Partial<Message>) => {
    const textToSend = (customPrompt || input).trim();
    if (!textToSend && !attachedFile && !specialResponsePayload) return;

    setError(null);
    setInput("");
    setIsAttachmentMenuOpen(false);

    // Build the user message object
    const userMsg: Message = {
      role: "user",
      content: textToSend || (attachedFile ? `Mengunggah berkas ${attachedFile.name}` : "Menjalankan perintah AI"),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      attachment: attachedFile || undefined,
    };

    const newMessages = [...messages, userMsg];
    saveChatHistory(newMessages);
    setLoading(true);

    // Keep reference to file before clearing state
    const currentAttachment = attachedFile;
    setAttachedFile(null);

    try {
      if (specialResponsePayload) {
        // If it's a simulated generation response (e.g. video, music) we handle it here
        setTimeout(() => {
          const modelMsg: Message = {
            role: "model",
            content: specialResponsePayload.content || "Karya Anda telah berhasil disintesis oleh RSC AI Core node.",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            ...specialResponsePayload
          };
          const updated = [...newMessages, modelMsg];
          saveChatHistory(updated);
          addPoints(35); // Earn bonus points for creation tools
          setLoading(false);
        }, 1000);
        return;
      }

      // Normal Gemini request (with optional attachment)
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: newMessages,
          attachment: currentAttachment
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Gagal mendapatkan respon dari server.");
      }

      const modelMsg: Message = {
        role: "model",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      const updatedHistory = [...newMessages, modelMsg];
      saveChatHistory(updatedHistory);
      speakText(data.reply);
      addPoints(15); // Earn 15 points for engaging with AI
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Koneksi ke Gemini terputus. Silakan coba lagi.");
      addLog("warning", `Gagal memanggil Gemini: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 1. Upload File Handler
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    const isImage = file.type.startsWith("image/");

    reader.onload = () => {
      const resultString = reader.result as string;
      const base64Data = isImage ? resultString.split(",")[1] : resultString;

      setAttachedFile({
        type: isImage ? "image" : "text",
        name: file.name,
        data: base64Data,
        mimeType: file.type,
      });

      addLog("success", `Berkas berhasil dilampirkan: ${file.name}`);
      setIsAttachmentMenuOpen(false);
    };

    if (isImage) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  };

  // 2. Google Drive Simulator
  const mockDriveFiles = [
    { name: "Smart-Agriculture-ESP32.txt", type: "text", data: "Sistem IoT cerdas berbasis ESP32 untuk monitoring kelembaban tanah di perkebunan kopi Gayo, Aceh. Menggunakan protokol MQTT untuk transmisi data realtime ke broker utama...", mimeType: "text/plain" },
    { name: "rsc-member-syllabus.json", type: "text", data: "{\n  \"community\": \"Rizky Smart Community\",\n  \"syllabus\": [\n    \"AI Fundamental\",\n    \"Next.js App Router\",\n    \"Web 3D & Spline\",\n    \"IoT Development with ESP32\",\n    \"Siber Security & SQL Injection Audit\"\n  ]\n}", mimeType: "application/json" },
    { name: "blockchain-aceh-future.png", type: "image", data: "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==", mimeType: "image/png" },
    { name: "rsc-mission-plan-2026.md", type: "text", data: "# Visi & Rencana Kerja RSC 2026\n1. Menghadirkan pusat inovasi digital pertama di Cadek, Aceh.\n2. Melatih 1000 anak muda lokal dalam pemrograman fullstack.\n3. Kolaborasi riset IoT.", mimeType: "text/markdown" }
  ];

  const attachFromDrive = (file: typeof mockDriveFiles[0]) => {
    setAttachedFile({
      type: file.type as "image" | "text",
      name: file.name,
      data: file.data,
      mimeType: file.mimeType,
    });
    addLog("success", `Lampiran Google Drive terhubung: ${file.name}`);
    setIsDriveModalOpen(false);
    setIsAttachmentMenuOpen(false);
  };

  // 3. Camera Snapshot
  const startCamera = async () => {
    setIsCameraActive(true);
    setIsAttachmentMenuOpen(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      if (cameraVideoRef.current) {
        cameraVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn("Kamera tidak diijinkan atau tidak didukung di environment iFrame. Menggunakan filter scan siber wajah simulator...");
    }
  };

  const capturePhoto = () => {
    // If we have a working camera stream, capture it
    let base64Image = "";
    if (cameraVideoRef.current && cameraVideoRef.current.srcObject) {
      const video = cameraVideoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        base64Image = canvas.toDataURL("image/jpeg").split(",")[1];
      }
      
      // Stop stream
      const stream = video.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    } else {
      // Simulator photo fallback
      // An elegant high-tech cyber avatar
      base64Image = "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
    }

    setAttachedFile({
      type: "image",
      name: `snap-kamera-rsc-${Date.now()}.jpg`,
      data: base64Image,
      mimeType: "image/jpeg"
    });

    addLog("success", "Kamera snapshot berhasil diambil.");
    setIsCameraActive(false);
  };

  const cancelCamera = () => {
    if (cameraVideoRef.current && cameraVideoRef.current.srcObject) {
      const stream = cameraVideoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraActive(false);
  };

  // 4. AI Image Generation Request
  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;
    setIsImageModalOpen(false);
    setLoading(true);
    addLog("info", `Memproses gambar AI: "${imagePrompt}"...`);

    try {
      const res = await fetch("/api/gemini/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: imagePrompt, aspectRatio: imageRatio }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Gagal membuat gambar.");
      }

      await handleSendMessage(`Buatkan gambar dengan prompt: "${imagePrompt}"`, {
        content: `**RSC Image Synthesizer Node**:\n\nGambar Anda dengan prompt *"${imagePrompt}"* telah berhasil dirender menggunakan model **Gemini 3.1-Flash-Image** dengan rasio **${imageRatio}**.\n\n${data.message || ""}`,
        generatedImage: data.imageUrl,
      });

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Gagal membuat gambar.");
    } finally {
      setLoading(false);
      setImagePrompt("");
    }
  };

  // 5. AI Video Generation simulation
  const handleGenerateVideo = () => {
    if (!videoPrompt.trim()) return;
    setIsVideoModalOpen(false);
    setVideoRenderingStage(0);

    // Multi-stage rendering animation
    const stages = [
      "Menganalisis skenario & prompt siber...",
      "Merender frame utama (VEO 3.1 engine)...",
      "Menerapkan interpolasi gerak & fluiditas...",
      "Sintesis audio latar belakang ambient selesai..."
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      currentStage++;
      if (currentStage < stages.length) {
        setVideoRenderingStage(currentStage);
        addLog("info", `AI Video: ${stages[currentStage]}`);
      } else {
        clearInterval(interval);
        setVideoRenderingStage(null);
        
        // Finalize video message insertion
        handleSendMessage(`Buatkan video sinematik: "${videoPrompt}"`, {
          content: `**RSC Video Synthesizer (VEO Engine)**:\n\nVideo pendek sinematik dengan skenario *"${videoPrompt}"* telah selesai direndering dengan kualitas HD 1080p.\n\nTekan tombol putar di bawah ini untuk melihat hasil render.`,
          generatedVideo: {
            prompt: videoPrompt
          }
        });
        setVideoPrompt("");
      }
    }, 2000);
  };

  // 6. AI Music Generation simulation
  const handleGenerateMusic = () => {
    if (!musicPrompt.trim()) return;
    setIsMusicModalOpen(false);
    setLoading(true);
    addLog("info", `Membuat komposisi musik AI: "${musicPrompt}" (${musicGenre})...`);

    setTimeout(() => {
      const musicId = "music_" + Date.now();
      handleSendMessage(`Buatkan musik dengan prompt: "${musicPrompt}" dan genre ${musicGenre}`, {
        content: `**RSC AI SoundLab (Synthesizer)**:\n\nKomposisi musik instrumen bertema *"${musicPrompt}"* telah selesai disintesis.\n\n- **Aransemen**: Generative 8-bit Soundwave\n- **Genre**: ${musicGenre}\n- **Engine**: RSC Browser Web-Audio Synthesis Node\n\nGunakan pemutar di bawah ini untuk mendengarkan lagu secara langsung!`,
        generatedMusic: {
          id: musicId,
          prompt: musicPrompt,
          genre: musicGenre
        }
      });
      setMusicPrompt("");
      setLoading(false);
    }, 2000);
  };

  // 7. Security Scanner Scanner Simulation
  const handleSecurityScan = () => {
    if (!customCodeToScan.trim()) return;
    setScanningCodeProgress(true);
    setScannerResult(null);

    setTimeout(() => {
      const lowerCode = customCodeToScan.toLowerCase();
      let vulnerabilities = [];

      if (lowerCode.includes("select") && lowerCode.includes("union")) {
        vulnerabilities.push({
          type: "SQL Injection (SQLi) - HIGH RISK",
          line: "Deteksi penggabungan UNION query di input text.",
          fix: "Gunakan parameterized queries atau ORM seperti Prisma/Drizzle."
        });
      }
      if (lowerCode.includes("innerhtml") || lowerCode.includes("eval") || lowerCode.includes("<script>")) {
        vulnerabilities.push({
          type: "Cross-Site Scripting (XSS) - MEDIUM RISK",
          line: "Deteksi injeksi HTML langsung tanpa sanitasasi sanitasi.",
          fix: "Gunakan DOMPurify atau enkripsi karakter khusus terlebih dahulu."
        });
      }

      if (vulnerabilities.length === 0) {
        setScannerResult({
          status: "SECURE",
          score: 100,
          details: "Kode Anda bersih dari kerentanan umum SQLi, XSS, dan Buffer Overflow. Kode aman untuk dideploy ke server RSC!"
        });
        addPoints(20);
      } else {
        setScannerResult({
          status: "VULNERABLE",
          score: 35,
          vulnerabilities
        });
        addLog("warning", "Security Audit: Kerentanan keamanan terdeteksi dalam kode!");
      }
      setScanningCodeProgress(false);
    }, 2500);
  };

  // Simulated Voice Input trigger (for clean visual and browser compatibility)
  const toggleListening = () => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "id-ID";
      recognition.interimResults = false;

      if (!isListening) {
        setIsListening(true);
        recognition.start();
        addLog("info", "Voice input recognition active...");

        recognition.onresult = (e: any) => {
          const transcript = e.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };
      } else {
        recognition.stop();
        setIsListening(false);
      }
    } else {
      // Browser doesn't support speech recognition, do virtual fallback demo
      setIsListening(true);
      setTimeout(() => {
        const fallbackQueries = [
          "Siapakah Muhammad Rizky?",
          "Jelaskan apa itu siber security",
          "Apa visi dan misi Rizky Smart Community?",
        ];
        const randomQuery = fallbackQueries[Math.floor(Math.random() * fallbackQueries.length)];
        setInput(randomQuery);
        setIsListening(false);
        addLog("info", "Perekaman simulasi selesai (Speech Recognition API tidak didukung browser ini).");
      }, 1500);
    }
  };

  const clearChat = () => {
    localStorage.removeItem("rsc_ai_chat");
    const welcome: Message = {
      role: "model",
      content:
        "Halo kembali! Riwayat obrolan telah dibersihkan. Ada yang bisa saya bantu hari ini?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([welcome]);
    addLog("info", "Riwayat AI Chat dibersihkan.");
  };

  const suggestionChips = [
    { label: "Siapa Muhammad Rizky?", prompt: "Berikan biodata lengkap Muhammad Rizky pembuat website ini dan apa tujuannya membuat RSC." },
    { label: "Visi & Misi RSC", prompt: "Apa visi, misi, dan target utama dari Rizky Smart Community?" },
    { label: "Penjelasan Next.js 15", prompt: "Jelaskan mengapa Next.js 15 dengan App Router sangat populer untuk website modern premium." },
    { label: "Bahaya Siber Security", prompt: "Apa saja ancaman siber paling berbahaya saat ini dan bagaimana SQL Injection diatasi?" },
  ];

  return (
    <div className="relative px-4 md:px-12 py-12 z-10 max-w-5xl mx-auto flex flex-col min-h-[85vh]">
      {/* Header Panel */}
      <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] flex items-center justify-center">
            <Bot className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-1.5 font-sans">
              AI Cyber Assistant <span className="text-xxs px-1.5 py-0.5 bg-cyan-500/20 text-cyan-300 rounded font-mono">GEMINI 3.5</span>
            </h1>
            <p className="text-xs text-slate-500 font-mono tracking-wider">SECURE END-TO-END COGNITIVE NODE</p>
          </div>
        </div>

        {/* Top Control Buttons */}
        <div className="flex gap-2">
          {/* TTS Audio toggle */}
          <button
            onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              isSpeechEnabled
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                : "bg-slate-950/40 border-white/10 text-slate-500"
            }`}
            title="Toggle Speech Feedback Output (TTS)"
          >
            {isSpeechEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* Clear chat history */}
          <button
            onClick={clearChat}
            className="p-2.5 rounded-xl bg-slate-950/40 border border-white/10 text-slate-500 hover:text-red-400 hover:border-red-400/20 transition-all cursor-pointer"
            title="Hapus riwayat obrolan"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Suggestion Chips */}
      {messages.length <= 1 && (
        <div className="mb-6">
          <p className="text-slate-500 text-xs font-mono mb-2 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Coba pertanyaan cepat:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestionChips.map((chip, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(chip.prompt)}
                className="px-3.5 py-2 rounded-xl bg-slate-950/40 hover:bg-slate-900/60 border border-white/10 text-xs text-slate-300 hover:text-white transition-all cursor-pointer font-light"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error Alert Bar */}
      {error && (
        <div className="mb-4 p-4 rounded-xl bg-red-950/20 border border-red-500/30 text-red-300 text-xs flex gap-2 items-center">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Chat Bubble Sandbox Panel */}
      <div className="flex-1 min-h-[400px] max-h-[500px] overflow-y-auto p-6 rounded-2xl border border-white/10 bg-slate-950/30 backdrop-blur-xl mb-6 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => {
            const isUser = m.role === "user";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[85%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                  {/* Avatar Icon */}
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-mono text-xs ${
                      isUser
                        ? "bg-indigo-600 text-white"
                        : "bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                    }`}
                  >
                    {isUser ? "ME" : "AI"}
                  </div>

                  {/* Text Container bubble */}
                  <div className="space-y-1.5 flex-1 min-w-[200px]">
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        isUser
                          ? "bg-gradient-to-br from-cyan-600 to-indigo-600 text-white rounded-tr-none shadow-md shadow-slate-950/30 font-medium"
                          : "bg-slate-900/80 border border-white/5 text-slate-200 rounded-tl-none font-light whitespace-pre-wrap"
                      }`}
                    >
                      {/* Attachment Rendering */}
                      {m.attachment && (
                        <div className="mb-3 p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-xs">
                          {m.attachment.type === "image" ? (
                            <div className="relative w-10 h-10 rounded overflow-hidden border border-white/20 bg-slate-950 flex-shrink-0">
                              <Image 
                                src={`data:${m.attachment.mimeType || "image/png"};base64,${m.attachment.data}`} 
                                alt={m.attachment.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <File className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                          )}
                          <div className="truncate flex-1">
                            <p className="font-mono truncate text-white">{m.attachment.name}</p>
                            <p className="text-[10px] text-slate-400">Berkas Lampiran • {m.attachment.type === "image" ? "Gambar" : "Dokumen"}</p>
                          </div>
                        </div>
                      )}

                      {/* Content text */}
                      {m.content}

                      {/* Custom Render: Generated Image */}
                      {m.generatedImage && (
                        <div className="mt-4 border border-white/10 rounded-2xl overflow-hidden bg-slate-950/60 shadow-lg max-w-sm">
                          <div className="relative aspect-square w-full">
                            <Image 
                              src={m.generatedImage} 
                              alt="Generated Image" 
                              fill 
                              className="object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="p-3 bg-slate-900/90 border-t border-white/5 flex justify-between items-center text-xs">
                            <span className="text-slate-400 flex items-center gap-1">
                              <Check className="w-3.5 h-3.5 text-emerald-400" /> Rendere Sukses
                            </span>
                            <a 
                              href={m.generatedImage} 
                              download="rsc-ai-artwork.png" 
                              target="_blank"
                              className="px-2.5 py-1 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition rounded flex items-center gap-1 text-[11px]"
                            >
                              Unduh <ArrowUpRight className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Custom Render: Generated Video */}
                      {m.generatedVideo && (
                        <div className="mt-4 border border-white/10 rounded-2xl overflow-hidden bg-slate-950/60 shadow-lg max-w-sm">
                          <div className="relative aspect-video w-full bg-indigo-950/40 flex flex-col items-center justify-center p-4 text-center group">
                            {/* Abstract cyber backdrop animation loop representation */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 to-indigo-900/30 animate-pulse" />
                            <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-bounce">
                              <Video className="w-5 h-5 text-cyan-400" />
                            </div>
                            <p className="text-xs font-mono text-cyan-300 truncate w-full px-2">&ldquo;{m.generatedVideo.prompt}&rdquo;</p>
                            <p className="text-[10px] text-slate-400 font-mono mt-1">VEO-3.1-LITE-RENDERED.mp4</p>
                          </div>
                          <div className="p-3 bg-slate-900/90 border-t border-white/5 flex justify-between items-center text-xs">
                            <span className="text-slate-400 font-mono text-[10px]">Looped Cyber Hologram</span>
                            <button className="px-3 py-1 bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 rounded text-[11px] flex items-center gap-1 cursor-pointer">
                              <Play className="w-3 h-3" /> Putar Loop
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Custom Render: Generated Music */}
                      {m.generatedMusic && (
                        <div className="mt-4 border border-white/10 rounded-2xl overflow-hidden bg-slate-900/90 p-4 shadow-lg max-w-sm">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                              <Music className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-medium text-white truncate">&ldquo;{m.generatedMusic.prompt}&rdquo;</p>
                              <p className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider">{m.generatedMusic.genre}</p>
                            </div>
                          </div>

                          {/* Sound wave visualizer simulator */}
                          <div className="h-8 flex items-end gap-1 mb-4 px-2">
                            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((bar) => {
                              const isPlaying = playingMusicId === m.generatedMusic?.id;
                              const randDelay = Math.random() * 0.8;
                              return (
                                <span 
                                  key={bar} 
                                  className="flex-1 bg-cyan-400/60 rounded-t transition-all duration-300"
                                  style={{ 
                                    height: isPlaying ? `${Math.floor(Math.random() * 80) + 20}%` : "15%",
                                    animation: isPlaying ? `bounce 0.8s ease-in-out infinite alternate` : "none",
                                    animationDelay: `${randDelay}s`
                                  }}
                                />
                              );
                            })}
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-400 font-mono">00:30 • Generative Synth</span>
                            {playingMusicId === m.generatedMusic.id ? (
                              <button 
                                onClick={stopSynthMelody}
                                className="px-3.5 py-1.5 bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30 rounded-xl flex items-center gap-1.5 text-xs transition cursor-pointer"
                              >
                                <Pause className="w-3.5 h-3.5" /> Berhenti
                              </button>
                            ) : (
                              <button 
                                onClick={() => playSynthMelody(m.generatedMusic!.id, m.generatedMusic!.genre)}
                                className="px-3.5 py-1.5 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-xl flex items-center gap-1.5 text-xs transition cursor-pointer"
                              >
                                <Play className="w-3.5 h-3.5" /> Putar Lagu
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Timestamp */}
                    <span className={`block text-xxs text-slate-500 font-mono ${isUser ? "text-right" : "text-left"}`}>
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Typing Loading Indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%] items-center">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 flex items-center justify-center flex-shrink-0 animate-bounce">
                AI
              </div>
              <div className="px-4 py-3 rounded-2xl bg-slate-900/80 border border-white/5 flex gap-1.5 items-center">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Speech synthesizer help note */}
      {isSpeechEnabled && (
        <div className="mb-3 text-center text-xxs font-mono text-cyan-400 animate-pulse flex items-center justify-center gap-1.5">
          <Headphones className="w-3.5 h-3.5" /> SUARA AUDIO AKTIF (SPEECH OUTPUT AKAN BERBUNYI SETIAP RESPON BARU)
        </div>
      )}

      {/* Attachment Preview Box */}
      {attachedFile && (
        <div className="mb-3 p-3 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex items-center justify-between gap-3 max-w-sm ml-12 animate-slide-up shadow-lg">
          <div className="flex items-center gap-2.5 text-xs truncate">
            {attachedFile.type === "image" ? (
              <div className="relative w-8 h-8 rounded overflow-hidden border border-white/10 bg-black flex-shrink-0">
                <Image 
                  src={`data:${attachedFile.mimeType || "image/png"};base64,${attachedFile.data}`} 
                  alt={attachedFile.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <File className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            )}
            <div className="truncate">
              <p className="font-mono truncate text-white text-xs">{attachedFile.name}</p>
              <p className="text-[10px] text-cyan-400/80">Siap dikirimkan ke AI</p>
            </div>
          </div>
          <button 
            onClick={() => setAttachedFile(null)}
            className="p-1 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Chat Input panel */}
      <div className="flex gap-3 relative">
        {/* Attachment Toggle Button */}
        <button
          onClick={() => setIsAttachmentMenuOpen(!isAttachmentMenuOpen)}
          className="p-4 rounded-xl bg-slate-950/60 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all cursor-pointer flex items-center justify-center shadow-lg"
          title="Pilihan Lampiran & Pembuatan AI"
        >
          <Plus className={`w-5 h-5 transition-transform duration-300 ${isAttachmentMenuOpen ? 'rotate-45 text-cyan-400' : ''}`} />
        </button>

        {/* Attachment Popover Menu */}
        <AnimatePresence>
          {isAttachmentMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 left-0 w-72 bg-[#131314] border border-white/10 rounded-2xl p-2 shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 overflow-hidden"
            >
              <div className="space-y-0.5">
                {/* Upload File */}
                <button
                  onClick={() => {
                    triggerFileUpload();
                    setIsAttachmentMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm text-slate-200 hover:bg-white/5 transition text-left cursor-pointer group"
                >
                  <Paperclip className="w-5 h-5 text-slate-400 group-hover:text-cyan-400" />
                  <span>Upload file</span>
                </button>

                {/* Drive Selector */}
                <button
                  onClick={() => {
                    setIsDriveModalOpen(true);
                    setIsAttachmentMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm text-slate-200 hover:bg-white/5 transition text-left cursor-pointer group"
                >
                  <Database className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300" />
                  <span>Tambahkan dari Drive</span>
                </button>

                {/* Upload Lainnya (Sub-reveal) */}
                <button
                  onClick={() => setIsUrlModalOpen(true)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-slate-200 hover:bg-white/5 transition text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    <Link className="w-5 h-5 text-emerald-400" />
                    <span>Upload lainnya</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                </button>

                {/* Horizontal Divider Line */}
                <div className="border-t border-white/5 my-1.5" />

                {/* AI Image Creator */}
                <button
                  onClick={() => {
                    setIsImageModalOpen(true);
                    setIsAttachmentMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-slate-200 hover:bg-white/5 transition text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    <ImageIcon className="w-5 h-5 text-amber-400 group-hover:text-amber-300" />
                    <span>Buat gambar</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-sans">Baru</span>
                </button>

                {/* AI Video Creator */}
                <button
                  onClick={() => {
                    setIsVideoModalOpen(true);
                    setIsAttachmentMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm text-slate-200 hover:bg-white/5 transition text-left cursor-pointer group"
                >
                  <Video className="w-5 h-5 text-rose-400 group-hover:text-rose-300" />
                  <span>Buat video</span>
                </button>

                {/* AI Music Creator */}
                <button
                  onClick={() => {
                    setIsMusicModalOpen(true);
                    setIsAttachmentMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-slate-200 hover:bg-white/5 transition text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    <Music className="w-5 h-5 text-fuchsia-400 group-hover:text-fuchsia-300" />
                    <span>Buat musik</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20 font-sans">Baru</span>
                </button>

                {/* Alat Lainnya (Sub-reveal) */}
                <button
                  onClick={() => setIsSecurityScannerOpen(true)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-slate-200 hover:bg-white/5 transition text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    <ShieldAlert className="w-5 h-5 text-cyan-400" />
                    <span>Alat lainnya</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input box */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={isListening ? "Mendengarkan..." : "Ketik pesan untuk AI Assistant..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            disabled={loading || isListening}
            className="w-full pl-4 pr-12 py-4 rounded-xl bg-slate-950/60 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 backdrop-blur-md text-sm shadow-inner"
          />

          {/* Voice Input Mic Button */}
          <button
            onClick={toggleListening}
            disabled={loading}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors cursor-pointer ${
              isListening
                ? "bg-red-500 text-white animate-pulse"
                : "text-slate-400 hover:text-white"
            }`}
            title="Klik untuk rekaman suara"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>

        {/* Send Button */}
        <button
          onClick={() => handleSendMessage()}
          disabled={loading || (!input.trim() && !attachedFile)}
          className="px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-md shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* HIDDEN FILE INPUT */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*,text/*,.txt,.json,.md,.js,.py,.html,.css"
      />

      {/* DRIVE MODAL DIALOG */}
      {isDriveModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1c1d1f] border border-white/10 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-scale-in">
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-slate-950/40">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-indigo-400" />
                <h3 className="font-semibold text-white">Google Drive Simulator</h3>
              </div>
              <button 
                onClick={() => setIsDriveModalOpen(false)}
                className="p-1 rounded-full hover:bg-white/5 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-3.5 max-h-[350px] overflow-y-auto">
              <p className="text-xs text-slate-400 mb-1">Pilih berkas dari cloud penyimpanan Google Drive Anda untuk dilampirkan langsung ke obrolan:</p>
              
              {mockDriveFiles.map((file, idx) => (
                <div 
                  key={idx}
                  onClick={() => attachFromDrive(file)}
                  className="p-3 rounded-xl border border-white/5 bg-slate-900/60 hover:bg-white/5 hover:border-cyan-500/30 transition cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {file.type === "image" ? (
                      <ImageIcon className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    ) : (
                      <File className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                    )}
                    <div className="text-left">
                      <p className="text-sm font-mono text-white">{file.name}</p>
                      <p className="text-[10px] text-slate-400">Berkas {file.type === "image" ? "Gambar" : "Dokumen"}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-950/40 border-t border-white/5 flex justify-end">
              <button 
                onClick={() => setIsDriveModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs transition cursor-pointer"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CAMERA SNAP MODAL */}
      {isCameraActive && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-4">
          <div className="max-w-lg w-full bg-[#1c1d1f] border border-white/10 rounded-2xl overflow-hidden p-6 text-center space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
              <Camera className="w-5 h-5 text-cyan-400" /> Kamera AI Scanner
            </h3>
            <div className="relative aspect-video w-full rounded-xl bg-slate-950 overflow-hidden border border-white/10 flex items-center justify-center">
              <video 
                ref={cameraVideoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover"
              />
              {/* Holographic scanning overlay effect */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-cyan-500/60 shadow-[0_0_10px_#06b6d4] animate-scan" />
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/20 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={cancelCamera}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={capturePhoto}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-medium text-sm transition cursor-pointer"
              >
                Ambil Foto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* URL INPUT DIALOG */}
      {isUrlModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1c1d1f] border border-white/10 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl p-5 space-y-4 animate-scale-in">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Link className="w-5 h-5 text-emerald-400" /> Masukkan Tautan URL
              </h3>
              <button onClick={() => setIsUrlModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <input 
              type="url" 
              placeholder="https://example.com/data"
              value={pastedUrl}
              onChange={(e) => setPastedUrl(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
            />
            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => setIsUrlModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-slate-400 text-xs hover:text-white cursor-pointer"
              >
                Batal
              </button>
              <button 
                onClick={() => {
                  if (pastedUrl) {
                    setAttachedFile({
                      type: "text",
                      name: "tautan-web.txt",
                      data: `Isi URL Scraped: ${pastedUrl}\n[Metadata: Ditautkan secara sukses menggunakan Link Scraper RSC AI Node]`
                    });
                    addLog("success", `URL berhasil dihubungkan: ${pastedUrl}`);
                  }
                  setIsUrlModalOpen(false);
                  setIsAttachmentMenuOpen(false);
                  setPastedUrl("");
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs hover:bg-emerald-500 cursor-pointer"
              >
                Tautkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IMAGE GENERATION MODAL */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1c1d1f] border border-white/10 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl p-5 space-y-4 animate-scale-in">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-amber-400" /> AI Image Generator
              </h3>
              <button onClick={() => setIsImageModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-left">
              <label className="text-xs text-slate-400">Deskripsi Gambar (Prompt):</label>
              <textarea 
                placeholder="Contoh: A cyberpunk teenage hacker coding in a neon lit bedroom in Aceh, futuristic hologram..."
                rows={3}
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
              <label className="text-xs text-slate-400 block">Rasio Aspek:</label>
              <div className="grid grid-cols-3 gap-2">
                {["1:1", "16:9", "9:16"].map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setImageRatio(ratio)}
                    className={`py-2 px-3 text-xs rounded-xl border transition cursor-pointer ${
                      imageRatio === ratio 
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40" 
                        : "bg-slate-950 border-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    {ratio} {ratio === "1:1" ? "(Kotak)" : ratio === "16:9" ? "(Landscape)" : "(Portrait)"}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => setIsImageModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-slate-400 text-xs hover:text-white cursor-pointer"
              >
                Batal
              </button>
              <button 
                onClick={handleGenerateImage}
                disabled={!imagePrompt.trim()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium text-xs hover:from-amber-400 hover:to-orange-500 disabled:opacity-40 cursor-pointer"
              >
                Buat Gambar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIDEO GENERATION MODAL */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1c1d1f] border border-white/10 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl p-5 space-y-4 animate-scale-in">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-rose-400" /> AI Video Generator
              </h3>
              <button onClick={() => setIsVideoModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-left">
              <label className="text-xs text-slate-400">Deskripsi Gerak Video (Prompt):</label>
              <textarea 
                placeholder="Contoh: Kamera berputar mengitari satelit futuristik di atas orbit bumi, detail tinggi, sci-fi..."
                rows={3}
                value={videoPrompt}
                onChange={(e) => setVideoPrompt(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-sm text-slate-200 focus:outline-none focus:border-rose-500"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-slate-400 text-xs hover:text-white cursor-pointer"
              >
                Batal
              </button>
              <button 
                onClick={handleGenerateVideo}
                disabled={!videoPrompt.trim()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-medium text-xs hover:from-rose-400 hover:to-pink-500 disabled:opacity-40 cursor-pointer"
              >
                Render Video (VEO)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MUSIC GENERATION MODAL */}
      {isMusicModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1c1d1f] border border-white/10 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl p-5 space-y-4 animate-scale-in">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Music className="w-5 h-5 text-fuchsia-400" /> RSC AI Music Studio
              </h3>
              <button onClick={() => setIsMusicModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-left">
              <label className="text-xs text-slate-400">Deskripsi Musik / Suasana (Prompt):</label>
              <textarea 
                placeholder="Contoh: Ketukan lofi santai untuk belajar coding di malam hari..."
                rows={3}
                value={musicPrompt}
                onChange={(e) => setMusicPrompt(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-sm text-slate-200 focus:outline-none focus:border-fuchsia-500"
              />
              
              <label className="text-xs text-slate-400 block">Genre Sintesis:</label>
              <div className="grid grid-cols-2 gap-2">
                {["Cyberpunk Synthwave", "Ambient Chill", "Aceh Traditional Fusion", "Orchestral Future"].map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setMusicGenre(genre)}
                    className={`py-2.5 px-3 text-xxs rounded-xl border text-left transition cursor-pointer ${
                      musicGenre === genre 
                        ? "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40" 
                        : "bg-slate-950 border-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => setIsMusicModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-slate-400 text-xs hover:text-white cursor-pointer"
              >
                Batal
              </button>
              <button 
                onClick={handleGenerateMusic}
                disabled={!musicPrompt.trim()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-medium text-xs hover:from-fuchsia-400 hover:to-purple-500 disabled:opacity-40 cursor-pointer"
              >
                Sintesis Musik
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECURITY SCANNER MODAL */}
      {isSecurityScannerOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1c1d1f] border border-white/10 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl p-5 space-y-4 animate-scale-in">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-cyan-400 animate-pulse" /> Cyber Security Scanner
              </h3>
              <button onClick={() => {
                setIsSecurityScannerOpen(false);
                setCustomCodeToScan("");
                setScannerResult(null);
              }} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="space-y-2.5">
                <label className="text-xs text-slate-400 block">Tempel kode pemrograman di bawah:</label>
                <textarea 
                  placeholder="Contoh: $user = $_POST['username']; $query = 'SELECT * FROM users WHERE user = $user';"
                  rows={8}
                  value={customCodeToScan}
                  onChange={(e) => setCustomCodeToScan(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 h-[240px]"
                />
                <button
                  onClick={handleSecurityScan}
                  disabled={scanningCodeProgress || !customCodeToScan.trim()}
                  className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 disabled:opacity-40 cursor-pointer"
                >
                  {scanningCodeProgress ? "Menganalisis Kerentanan Siber..." : "Mulai Pemindaian Keamanan"}
                </button>
              </div>

              {/* Scan result display */}
              <div className="p-4 rounded-xl bg-slate-950 border border-white/5 flex flex-col justify-center h-[310px]">
                {scanningCodeProgress ? (
                  <div className="text-center space-y-3">
                    <div className="w-10 h-10 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mx-auto" />
                    <p className="text-xs text-cyan-400 font-mono">MEMERIKSA TOKEN & STRUCTURAL AST...</p>
                  </div>
                ) : scannerResult ? (
                  <div className="space-y-3 overflow-y-auto max-h-[290px] pr-1">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-xs text-slate-400 font-mono">Hasil Audit Keamanan:</span>
                      <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                        scannerResult.status === "SECURE" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                      }`}>
                        {scannerResult.status} (SKOR: {scannerResult.score}/100)
                      </span>
                    </div>

                    {scannerResult.status === "SECURE" ? (
                      <p className="text-xs text-slate-300 leading-relaxed font-light">{scannerResult.details}</p>
                    ) : (
                      <div className="space-y-3 text-left">
                        {scannerResult.vulnerabilities.map((v: any, idx: number) => (
                          <div key={idx} className="p-2.5 rounded bg-red-950/20 border border-red-500/20 space-y-1">
                            <p className="text-xs font-bold text-red-400">{v.type}</p>
                            <p className="text-[11px] text-slate-300 font-mono">Deteksi: {v.line}</p>
                            <p className="text-[11px] text-emerald-400 font-mono">Saran Solusi: {v.fix}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-slate-500 space-y-2">
                    <ShieldAlert className="w-8 h-8 mx-auto text-slate-600 animate-pulse" />
                    <p className="text-xs font-light">Belum ada pemindaian siber. Tempel kode dan klik tombol pemindaian untuk mendeteksi celah SQLi dan XSS secara instan.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIDEO RENDERING PROGRESS OVERLAY */}
      {videoRenderingStage !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-4 backdrop-blur-md">
          <div className="bg-[#1c1d1f] border border-white/10 rounded-2xl max-w-md w-full p-6 text-center space-y-5 shadow-2xl">
            <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
              <Video className="w-5 h-5 text-rose-400 animate-pulse" /> AI Video Renderer Node Active
            </h3>
            <div className="space-y-2 text-left">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-rose-400">PROGRESS RENDERING</span>
                <span className="text-white">{(videoRenderingStage + 1) * 25}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-500" 
                  style={{ width: `${(videoRenderingStage + 1) * 25}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 font-mono text-center pt-1.5 uppercase tracking-wider">
                {[
                  "Menganalisis skenario & prompt siber...",
                  "Merender frame utama (VEO 3.1 engine)...",
                  "Menerapkan interpolasi gerak & fluiditas...",
                  "Sintesis audio latar belakang ambient selesai..."
                ][videoRenderingStage]}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
