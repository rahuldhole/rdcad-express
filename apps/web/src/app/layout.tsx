import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RDCAD Express - Structural Detailing",
  description: "Advanced parametric detailing and Bar Bending Schedule tools for structural engineers.",
};

import Link from "next/link";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-200" suppressHydrationWarning>
        <header className="bg-slate-900 border-b border-slate-800 px-4 md:px-8 py-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="RDCAD Express Logo" className="w-8 h-8" />
              <div className="font-bold text-xl text-blue-400">RDCAD Express</div>
            </Link>
            <nav className="flex gap-4 overflow-x-auto w-full pb-2 md:pb-0 md:w-auto justify-start md:justify-center hide-scrollbar">
              <Link href="/" className="text-sm font-medium hover:text-white text-slate-400 transition whitespace-nowrap">Home</Link>
              <Link href="/bbs" className="text-sm font-medium hover:text-white text-slate-400 transition whitespace-nowrap">BBS Generator</Link>
              <Link href="/beam" className="text-sm font-medium hover:text-white text-slate-400 transition whitespace-nowrap">Beam</Link>
              <Link href="/column" className="text-sm font-medium hover:text-white text-slate-400 transition whitespace-nowrap">Column</Link>
              <Link href="/slab" className="text-sm font-medium hover:text-white text-slate-400 transition whitespace-nowrap">Slab</Link>
              <Link href="/foundation" className="text-sm font-medium hover:text-white text-slate-400 transition whitespace-nowrap">Foundation</Link>
              <Link href="/tank" className="text-sm font-medium hover:text-white text-slate-400 transition whitespace-nowrap">Tank</Link>
              <Link href="/stairs" className="text-sm font-medium hover:text-white text-slate-400 transition whitespace-nowrap">Stairs</Link>
              <Link href="/utilities" className="text-sm font-medium hover:text-white text-slate-400 transition whitespace-nowrap">Grid Utils</Link>
              <Link href="/library" className="text-sm font-medium hover:text-emerald-400 text-emerald-500/70 transition whitespace-nowrap">Library</Link>
              <Link href="/templates" className="text-sm font-medium hover:text-emerald-400 text-emerald-500/70 transition whitespace-nowrap">Templates</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
