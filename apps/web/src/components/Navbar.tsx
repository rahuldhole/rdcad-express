"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store/useStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const projectItems = useAppStore(state => state.projectItems);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { href: "/bbs", label: "BBS Generator", isSpecial: false },
    { href: "/beam", label: "Beam", isSpecial: false },
    { href: "/column", label: "Column", isSpecial: false },
    { href: "/slab", label: "Slab", isSpecial: false },
    { href: "/foundation", label: "Foundation", isSpecial: false },
    { href: "/tank", label: "Tank", isSpecial: false },
    { href: "/stairs", label: "Stairs", isSpecial: false },
    { href: "/utilities", label: "Grid Utils", isSpecial: false },
    { href: "/library", label: "Library", isSpecial: false, isBeta: true },
    { href: "/templates", label: "Templates", isSpecial: false, isBeta: true },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-4 md:px-8 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          <Image src="/logo.svg" alt="RDCAD Express Logo" width={32} height={32} className="w-8 h-8" />
          <div className="font-bold text-xl text-blue-400 flex items-center gap-2">
            RDCAD Express
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase tracking-wider">Beta</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`flex items-center gap-1.5 text-sm font-medium transition whitespace-nowrap ${
                pathname === link.href ? "text-white" : 
                link.isSpecial ? "text-blue-400 hover:text-blue-300" : 
                link.isBeta ? "text-emerald-500/70 hover:text-emerald-400" : 
                "text-slate-400 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-6 w-px bg-slate-800 mx-1"></div>
          <div className="flex items-center gap-3">
            <Link 
              href="/project" 
              className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded transition border border-slate-700"
            >
              Project
              {projectItems.length > 0 && (
                <span className="flex items-center justify-center w-5 h-5 text-[10px] bg-blue-600 text-white rounded-full">
                  {projectItems.length}
                </span>
              )}
            </Link>
            <Link 
              href="/setup" 
              className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded transition shadow-lg shadow-indigo-500/20"
              title="Setup AutoCAD LISP Script"
            >
              <Settings className="w-3.5 h-3.5" /> Setup
            </Link>
          </div>

        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          className="lg:hidden p-2 text-slate-400 hover:text-white transition rounded-md hover:bg-slate-800"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 shadow-xl overflow-y-auto max-h-[calc(100vh-73px)]">
          <div className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={closeMenu}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition ${
                  pathname === link.href ? "bg-slate-800 text-white" : 
                  link.isSpecial ? "text-blue-400 hover:bg-slate-800/50" : 
                  link.isBeta ? "text-emerald-500 hover:bg-slate-800/50" : 
                  "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span className="text-base font-medium">{link.label}</span>
              </Link>
            ))}
            <div className="h-px bg-slate-800 my-2"></div>
            <div className="flex flex-col gap-2">
              <Link 
                href="/project" 
                onClick={closeMenu}
                className="flex items-center justify-between px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg transition"
              >
                <span className="text-base font-medium">Project</span>
                {projectItems.length > 0 && (
                  <span className="flex items-center justify-center w-6 h-6 text-xs bg-blue-600 text-white rounded-full">
                    {projectItems.length}
                  </span>
                )}
              </Link>
              <Link 
                href="/setup" 
                className="flex items-center gap-2 text-base font-medium px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition"
              >
                <Settings className="w-4 h-4" /> AutoCAD Integration
              </Link>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
