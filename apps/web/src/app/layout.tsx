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
        <header className="bg-slate-900 border-b border-slate-800 px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center gap-8">
            <div className="font-bold text-xl text-blue-400">RDCAD Express</div>
            <nav className="flex gap-4">
              <Link href="/bbs" className="text-sm font-medium hover:text-white text-slate-400 transition">BBS Generator</Link>
              <Link href="/beam" className="text-sm font-medium hover:text-white text-slate-400 transition">Beam</Link>
              <Link href="/column" className="text-sm font-medium hover:text-white text-slate-400 transition">Column</Link>
              <Link href="/slab" className="text-sm font-medium hover:text-white text-slate-400 transition">Slab</Link>
              <Link href="/foundation" className="text-sm font-medium hover:text-white text-slate-400 transition">Foundation</Link>
              <Link href="/tank" className="text-sm font-medium hover:text-white text-slate-400 transition">Tank</Link>
              <Link href="/utilities" className="text-sm font-medium hover:text-white text-slate-400 transition">Grid Utils</Link>
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
