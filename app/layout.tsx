import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css"; // Global styles
import { AppProvider } from "../context/AppContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Rizky Smart Community | 3D Futuristic Technology Ecosystem",
  description: "Selamat datang di Rizky Smart Community (RSC), sebuah platform ekosistem digital premium dengan desain 3D Futuristik, Glassmorphic, dan Neumorphic yang diciptakan oleh Muhammad Rizky.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="bg-[#030712] text-slate-100 font-sans antialiased min-h-screen overflow-x-hidden" suppressHydrationWarning>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

