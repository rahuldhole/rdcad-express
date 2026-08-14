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

import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-200" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1 pb-10">
          {children}
        </main>
        <footer className="bg-slate-900 border-t border-slate-800 py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <div>
              Built with ❤️ by <a href="https://rahuldhole.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition">rahuldhole.com</a>
            </div>
            <a 
              href="https://github.com/rahuldhole/rdcad-express/issues" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:text-slate-300 transition text-slate-500 hover:text-white"
              title="Report Issue"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.18-.3 6.5-1.5 6.5-7.1a5.1 5.1 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.5s-1.1-.3-3.5 1.3a11.5 11.5 0 0 0-6 0C7.1 1.7 6 2 6 2a4.8 4.8 0 0 0-.1 3.5 5.1 5.1 0 0 0-1.4 3.6c0 5.6 3.3 6.8 6.5 7.1a4.8 4.8 0 0 0-1 2.93V22"></path>
                <path d="M9 18c-4.5 1.5-5-2.5-7-3"></path>
              </svg>
              <span>Report Issue</span>
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
