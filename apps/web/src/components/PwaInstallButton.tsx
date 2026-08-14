"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

export function PwaInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  if (isInstalled) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-900/30 text-emerald-400 rounded-full text-sm font-medium border border-emerald-800/50 backdrop-blur-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        Installed App
      </div>
    );
  }

  if (!deferredPrompt) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-slate-800 text-sm font-medium text-slate-400 rounded-full backdrop-blur-sm">
        <span className="w-2 h-2 rounded-full bg-slate-500" />
        Offline Ready PWA
      </div>
    );
  }

  return (
    <button
      onClick={handleInstallClick}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-full text-sm font-medium border border-blue-500/30 hover:border-blue-500/50 transition-all backdrop-blur-sm cursor-pointer shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]"
    >
      <Download className="w-4 h-4" />
      Install App (Offline Ready)
    </button>
  );
}
