"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import rizkyProfileImg from "@/src/assets/images/rizky_profile_1784067583304.jpg";

// Types definition
export type AppView =
  | "home"
  | "about"
  | "features"
  | "gallery"
  | "blog"
  | "contact"
  | "login"
  | "register"
  | "dashboard"
  | "admin"
  | "ai-assistant"
  | "community"
  | "events"
  | "games"
  | "leaderboard"
  | "developer";

export interface UserProfile {
  name: string;
  username: string;
  email: string;
  points: number;
  badge: string;
  level: number;
  avatar: string;
  role: "user" | "admin" | "moderator";
  dob: string;
  gender: string;
  country: string;
  phone: string;
  joinedDate: string;
}

export interface ForumPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  content: string;
  category: string;
  timestamp: string;
  likes: number;
  likedBy: string[]; // List of emails
  comments: {
    id: string;
    authorName: string;
    authorAvatar: string;
    content: string;
    timestamp: string;
  }[];
  tags: string[];
}

export interface BlogItem {
  id: string;
  title: string;
  category: "Tech" | "AI" | "Programming" | "Design" | "Siber Security";
  excerpt: string;
  content: string;
  thumbnail: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "UI/UX" | "3D Art" | "AI Concept" | "IoT Prototype";
  imageUrl: string;
  description: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  badge: string;
  joined: boolean;
  qrCode?: string;
}

export interface SystemLog {
  id: string;
  type: "info" | "warning" | "success" | "security";
  message: string;
  timestamp: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface AppContextType {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  user: UserProfile | null;
  login: (email: string, role: "user" | "admin" | "moderator") => boolean;
  registerUser: (profile: Omit<UserProfile, "points" | "level" | "badge" | "joinedDate">) => void;
  logout: () => void;
  posts: ForumPost[];
  createPost: (content: string, category: string, tags: string[]) => void;
  likePost: (id: string) => void;
  commentOnPost: (postId: string, content: string) => void;
  blogs: BlogItem[];
  addBlogComment: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  galleryItems: GalleryItem[];
  events: EventItem[];
  joinEvent: (id: string) => void;
  logs: SystemLog[];
  addLog: (type: "info" | "warning" | "success" | "security", message: string) => void;
  notifications: AppNotification[];
  addNotification: (title: string, message: string) => void;
  markNotificationsAsRead: () => void;
  addPoints: (amount: number) => void;
  leaderboardUsers: { name: string; avatar: string; points: number; level: number; role: string }[];
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  rateLimitCount: number;
  triggerRateLimit: () => void;
  securityShieldEnabled: boolean;
  setSecurityShieldEnabled: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialBlogs: BlogItem[] = [
  {
    id: "b1",
    title: "Membangun Masa Depan Web dengan AI dan Next.js 15",
    category: "AI",
    excerpt: "Bagaimana teknologi kecerdasan buatan merevolusi alur pengembangan web frontend modern dengan kecepatan dan performa tinggi.",
    content: "Dunia pengembangan web sedang bertransisi menuju integrasi kecerdasan buatan yang mulus. Dengan Next.js 15, kita dapat membangun antarmuka dinamis yang merespons pengguna secara instan...",
    thumbnail: "https://picsum.photos/seed/webai/600/400",
    author: "Muhammad Rizky",
    date: "14 Juli 2026",
    likes: 42,
    comments: 12,
  },
  {
    id: "b2",
    title: "Mengapa Keamanan Siber Penting di Era Komputasi Quantum",
    category: "Siber Security",
    excerpt: "Sebuah panduan mendalam tentang ancaman siber baru dan bagaimana kriptografi pasca-quantum melindungi ekosistem digital kita.",
    content: "Di era digital saat ini, komputer quantum berpotensi meretas metode enkripsi standar dalam hitungan detik. Kriptografi baru harus dikembangkan...",
    thumbnail: "https://picsum.photos/seed/cybersec/600/400",
    author: "Muhammad Rizky",
    date: "10 Juli 2026",
    likes: 38,
    comments: 8,
  },
  {
    id: "b3",
    title: "Strategi UI/UX Desain Futuristik: Tren Glassmorphism dan Neumorphism",
    category: "Design",
    excerpt: "Membahas penerapan estetika visual tingkat tinggi yang menggabungkan transparansi kaca dengan kedalaman 3D.",
    content: "Estetika desain terus bergeser. Gabungan antara Glassmorphism yang mengandalkan background blur dengan Neumorphism yang berfokus pada bayangan lembut...",
    thumbnail: "https://picsum.photos/seed/designtech/600/400",
    author: "Muhammad Rizky",
    date: "05 Juli 2026",
    likes: 56,
    comments: 15,
  },
];

const initialGallery: GalleryItem[] = [
  {
    id: "g1",
    title: "Sistem Manajemen Smart City 3D",
    category: "UI/UX",
    imageUrl: "https://picsum.photos/seed/smartcity/800/600",
    description: "Desain purwarupa dashboard kota masa depan dengan visualisasi 3D real-time.",
  },
  {
    id: "g2",
    title: "Brain-Computer Interface Visualizer",
    category: "AI Concept",
    imageUrl: "https://picsum.photos/seed/brainai/800/600",
    description: "Konsep antarmuka pikiran-ke-mesin beresolusi tinggi dengan efek glowing aurora.",
  },
  {
    id: "g3",
    title: "Siber Defense Command Center Dashboard",
    category: "UI/UX",
    imageUrl: "https://picsum.photos/seed/cybercom/800/600",
    description: "Tampilan pusat kontrol pertahanan siber multi-skala berkecepatan tinggi.",
  },
  {
    id: "g4",
    title: "Smart Garden Monitoring Node",
    category: "IoT Prototype",
    imageUrl: "https://picsum.photos/seed/iotfarm/800/600",
    description: "Purwarupa perangkat monitoring agrikultur presisi dengan sirkuit futuristik.",
  },
];

const initialEvents: EventItem[] = [
  {
    id: "e1",
    title: "Futuristic Hackathon 2026",
    date: "25 Juli 2026",
    time: "09:00 - selesai",
    location: "Auditorium Universitas Bina Bangsa Getsempena",
    description: "Kolaborasi intensif membuat aplikasi berbasis AI untuk kemajuan ekosistem digital Aceh.",
    badge: "Hackathon",
    joined: false,
  },
  {
    id: "e2",
    title: "Web 3D & Three.js Masterclass",
    date: "02 Agustus 2026",
    time: "14:00 - 17:00 WIB",
    location: "Online Zoom Meeting (Eksklusif RSC)",
    description: "Belajar membuat animasi 3D interaktif kelas premium bersama pakar web development.",
    badge: "Web3D",
    joined: false,
  },
  {
    id: "e3",
    title: "Rizky Smart Community Annual Gathering",
    date: "12 Agustus 2026",
    time: "19:00 - Selesai",
    location: "Cadek Creative Space, Aceh Besar",
    description: "Pertemuan akbar seluruh anggota komunitas RSC untuk merayakan inovasi digital.",
    badge: "Meetup",
    joined: false,
  },
];

const defaultUser: UserProfile = {
  name: "Muhammad Rizky",
  username: "rizkidev",
  email: "muhammadrizky120406@gmail.com",
  points: 1350,
  badge: "Elite Creator",
  level: 8,
  avatar: rizkyProfileImg.src,
  role: "admin",
  dob: "2006-04-12",
  gender: "Laki-laki",
  country: "Indonesia",
  phone: "+6281234567890",
  joinedDate: "14 Juli 2024",
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeView, setActiveView] = useState<AppView>("home");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [blogs, setBlogs] = useState<BlogItem[]>(initialBlogs);
  const [galleryItems] = useState<GalleryItem[]>(initialGallery);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [rateLimitCount, setRateLimitCount] = useState(0);
  const [securityShieldEnabled, setSecurityShieldEnabled] = useState(true);

  const [logs, setLogs] = useState<SystemLog[]>([
    { id: "log1", type: "success", message: "Rizky Smart Community Core VM Online", timestamp: "14:50:00" },
    { id: "log2", type: "info", message: "Web 3D Canvas Context Initialized", timestamp: "14:50:02" },
    { id: "log3", type: "security", message: "Firewall Active: SQL Injection Shield Enabled", timestamp: "14:50:03" },
  ]);

  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: "n1",
      title: "Selamat Datang!",
      message: "Selamat bergabung di Rizky Smart Community. Eksplorasi fitur 3D dan tanyakan apa saja pada AI Assistant!",
      time: "Baru saja",
      read: false,
    },
    {
      id: "n2",
      title: "Event Hackathon 2026",
      message: "Pendaftaran untuk Futuristic Hackathon 2026 di Kampus BBG kini telah dibuka secara eksklusif.",
      time: "2 jam yang lalu",
      read: false,
    },
  ]);

  // Load from local storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("rsc_user");
      if (savedUser) {
        setTimeout(() => {
          setUser(JSON.parse(savedUser));
        }, 0);
      } else {
        // Default guest/admin user for smooth preview experience
        setTimeout(() => {
          setUser(defaultUser);
        }, 0);
        localStorage.setItem("rsc_user", JSON.stringify(defaultUser));
      }

      const savedPosts = localStorage.getItem("rsc_posts");
      if (savedPosts) {
        setTimeout(() => {
          setPosts(JSON.parse(savedPosts));
        }, 0);
      } else {
        const initialPosts: ForumPost[] = [
          {
            id: "p1",
            authorName: "Muhammad Rizky",
            authorAvatar: rizkyProfileImg.src,
            authorRole: "Founder",
            content: "Selamat datang semuanya di platform web premium Rizky Smart Community! Ini adalah ruang bagi anak-anak muda Aceh dan dunia untuk berinovasi tanpa batas dalam bidang AI, Web 3D, IoT, dan Cyber Security. Mari berkolaborasi!",
            category: "General",
            timestamp: "14 Juli 2026, 12:00",
            likes: 24,
            likedBy: [],
            comments: [
              {
                id: "c1",
                authorName: "Siti Rahmah",
                authorAvatar: "https://picsum.photos/seed/siti/100/100",
                content: "Keren sekali websitenya Kak Rizky! Efek 3D dan transisinya sangat mulus seperti Apple.",
                timestamp: "14 Juli 2026, 12:15",
              },
            ],
            tags: ["Inovasi", "Teknologi", "AcehInovatif"],
          },
          {
            id: "p2",
            authorName: "Andi Wijaya",
            authorAvatar: "https://picsum.photos/seed/andi/100/100",
            authorRole: "Moderator",
            content: "Ada yang tertarik bikin kelompok belajar untuk Next.js 15 dan Three.js? Kita bisa bahas modul-modul web 3D buatan RSC.",
            category: "WebDev",
            timestamp: "13 Juli 2026, 09:30",
            likes: 15,
            likedBy: [],
            comments: [],
            tags: ["NextJS", "ThreeJS", "BelajarBareng"],
          },
        ];
        setTimeout(() => {
          setPosts(initialPosts);
        }, 0);
        localStorage.setItem("rsc_posts", JSON.stringify(initialPosts));
      }
    }
  }, []);

  const addLog = (type: "info" | "warning" | "success" | "security", message: string) => {
    const timeStr = new Date().toLocaleTimeString();
    const newLog: SystemLog = {
      id: "log_" + Date.now(),
      type,
      message,
      timestamp: timeStr,
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  const addNotification = (title: string, message: string) => {
    const newNotif: AppNotification = {
      id: "notif_" + Date.now(),
      title,
      message,
      time: "Baru saja",
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    addLog("info", `Notifikasi sistem dikirim: "${title}"`);
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addPoints = (amount: number) => {
    if (!user) return;
    const updatedPoints = user.points + amount;
    // Recalculate level
    const updatedLevel = Math.max(user.level, Math.floor(updatedPoints / 200) + 1);
    const updatedBadge =
      updatedPoints > 2000
        ? "Legendary Architect"
        : updatedPoints > 1500
        ? "Grand Master Scientist"
        : updatedPoints > 1000
        ? "Elite Creator"
        : updatedPoints > 500
        ? "Senior Scholar"
        : "Tech Explorer";

    const updatedUser = {
      ...user,
      points: updatedPoints,
      level: updatedLevel,
      badge: updatedBadge,
    };
    setUser(updatedUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("rsc_user", JSON.stringify(updatedUser));
    }
    addLog("success", `Poin bertambah +${amount}! Total Poin: ${updatedPoints} (Lv. ${updatedLevel})`);
    addNotification("Poin Bertambah!", `Selamat, Anda mendapatkan +${amount} poin kontribusi!`);
  };

  const login = (email: string, role: "user" | "admin" | "moderator"): boolean => {
    // Basic verification simulation
    addLog("success", `Login berhasil untuk email: ${email} (${role})`);
    const mockUser: UserProfile = {
      name: email.split("@")[0].toUpperCase(),
      username: email.split("@")[0],
      email: email,
      points: 250,
      badge: "Tech Explorer",
      level: 2,
      avatar: `https://picsum.photos/seed/${email}/150/150`,
      role: role,
      dob: "2006-04-12",
      gender: "Laki-laki",
      country: "Indonesia",
      phone: "+6281200001111",
      joinedDate: "14 Juli 2026",
    };
    setUser(mockUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("rsc_user", JSON.stringify(mockUser));
    }
    addNotification("Selamat Datang Kembali", `Berhasil masuk sebagai ${mockUser.name} (${role})`);
    setActiveView("dashboard");
    return true;
  };

  const registerUser = (profile: Omit<UserProfile, "points" | "level" | "badge" | "joinedDate">) => {
    addLog("success", `Registrasi Akun Baru: ${profile.name} (${profile.username})`);
    const newUser: UserProfile = {
      ...profile,
      points: 100,
      level: 1,
      badge: "Tech Explorer",
      joinedDate: "14 Juli 2026",
    };
    setUser(newUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("rsc_user", JSON.stringify(newUser));
    }
    addNotification("Registrasi Berhasil", `Selamat datang di komunitas, ${profile.name}!`);
    setActiveView("dashboard");
  };

  const logout = () => {
    addLog("info", "Pengguna keluar dari sesi.");
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("rsc_user");
    }
    addNotification("Sesi Berakhir", "Sesi Anda telah ditutup dengan aman.");
    setActiveView("home");
  };

  const createPost = (content: string, category: string, tags: string[]) => {
    if (!user) return;
    const newPost: ForumPost = {
      id: "post_" + Date.now(),
      authorName: user.name,
      authorAvatar: user.avatar,
      authorRole: user.role === "admin" ? "Founder" : user.role === "moderator" ? "Moderator" : "Member",
      content,
      category,
      timestamp: new Date().toLocaleString("id-ID", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short", year: "numeric" }),
      likes: 0,
      likedBy: [],
      comments: [],
      tags,
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    if (typeof window !== "undefined") {
      localStorage.setItem("rsc_posts", JSON.stringify(updatedPosts));
    }
    addLog("success", `Forum Post dibuat oleh ${user.username} di kategori ${category}`);
    addPoints(30); // Earn 30 points for posting
  };

  const likePost = (id: string) => {
    if (!user) return;
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        const hasLiked = post.likedBy.includes(user.email);
        const likedBy = hasLiked
          ? post.likedBy.filter((e) => e !== user.email)
          : [...post.likedBy, user.email];
        const likes = hasLiked ? post.likes - 1 : post.likes + 1;
        return { ...post, likes, likedBy };
      }
      return post;
    });
    setPosts(updatedPosts);
    if (typeof window !== "undefined") {
      localStorage.setItem("rsc_posts", JSON.stringify(updatedPosts));
    }
    addLog("info", `Post ${id} dilike/unlike oleh ${user.username}`);
  };

  const commentOnPost = (postId: string, content: string) => {
    if (!user) return;
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const newComment = {
          id: "comm_" + Date.now(),
          authorName: user.name,
          authorAvatar: user.avatar,
          content,
          timestamp: "Baru saja",
        };
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    });
    setPosts(updatedPosts);
    if (typeof window !== "undefined") {
      localStorage.setItem("rsc_posts", JSON.stringify(updatedPosts));
    }
    addLog("success", `Komentar baru ditambahkan ke post ${postId}`);
    addPoints(15); // Earn 15 points for commenting
  };

  const addBlogComment = (id: string) => {
    setBlogs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, comments: b.comments + 1 } : b))
    );
    addLog("info", `Komentar ditambahkan pada artikel blog ${id}`);
    addPoints(10);
  };

  const joinEvent = (id: string) => {
    const updatedEvents = events.map((e) => {
      if (e.id === id) {
        return {
          ...e,
          joined: !e.joined,
          qrCode: !e.joined ? `RSC-EVENT-${id}-TICKET-${Math.floor(1000 + Math.random() * 9000)}` : undefined,
        };
      }
      return e;
    });
    setEvents(updatedEvents);
    const targetEvent = events.find((e) => e.id === id);
    if (targetEvent) {
      if (!targetEvent.joined) {
        addLog("success", `Pendaftaran Event: Berhasil mendaftar di ${targetEvent.title}`);
        addNotification("Tiket Event Diterbitkan", `Anda berhasil terdaftar di event ${targetEvent.title}. QR Code tiket siap diakses!`);
        addPoints(50); // Earn 50 points for joining events
      } else {
        addLog("warning", `Membatalkan partisipasi event: ${targetEvent.title}`);
      }
    }
  };

  const triggerRateLimit = () => {
    setRateLimitCount((prev) => prev + 1);
    addLog("warning", "Security Audit Alert: Requests tracking triggered.");
  };

  // Mock users for leaderboard
  const leaderboardUsers = [
    { name: "Muhammad Rizky", avatar: rizkyProfileImg.src, points: 1350, level: 8, role: "Founder" },
    { name: "Andi Wijaya", avatar: "https://picsum.photos/seed/andi/100/100", points: 980, level: 5, role: "Moderator" },
    { name: "Siti Rahmah", avatar: "https://picsum.photos/seed/siti/100/100", points: 850, level: 5, role: "Member" },
    { name: "Budi Santoso", avatar: "https://picsum.photos/seed/budi/100/100", points: 720, level: 4, role: "Member" },
    { name: "Farah Amalia", avatar: "https://picsum.photos/seed/farah/100/100", points: 610, level: 3, role: "Member" },
  ];

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        user,
        login,
        registerUser,
        logout,
        posts,
        createPost,
        likePost,
        commentOnPost,
        blogs,
        addBlogComment,
        searchQuery,
        setSearchQuery,
        galleryItems,
        events,
        joinEvent,
        logs,
        addLog,
        notifications,
        addNotification,
        markNotificationsAsRead,
        addPoints,
        leaderboardUsers,
        isDarkMode,
        setIsDarkMode,
        rateLimitCount,
        triggerRateLimit,
        securityShieldEnabled,
        setSecurityShieldEnabled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
