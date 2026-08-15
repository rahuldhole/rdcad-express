"use client";

import { useEffect, useState } from "react";
import { Button, Chip, Box, keyframes } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloudDoneIcon from "@mui/icons-material/CloudDone";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const pulse = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
`;

export function PwaInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    let mounted = true;
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setTimeout(() => {
        if (mounted) setIsInstalled(true);
      }, 0);
    }

    return () => {
      mounted = false;
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
      <Chip 
        icon={<CheckCircleIcon color="success" />} 
        label="Installed Desktop App" 
        color="success"
        variant="outlined"
        sx={{ 
          px: 1, 
          py: 2.5,
          borderRadius: '24px',
          fontWeight: 'bold',
          borderWidth: 2,
          '& .MuiChip-icon': {
            animation: `${pulse} 2s infinite`
          }
        }} 
      />
    );
  }

  if (!deferredPrompt) {
    return (
      <Chip 
        icon={<CloudDoneIcon />} 
        label="Offline Ready PWA" 
        variant="outlined"
        color="default"
        sx={{ 
          px: 1, 
          py: 2.5,
          borderRadius: '24px',
          fontWeight: 'bold',
          borderWidth: 2
        }} 
      />
    );
  }

  return (
    <Button
      onClick={handleInstallClick}
      variant="contained"
      color="primary"
      startIcon={<DownloadIcon />}
      sx={{
        borderRadius: '24px',
        px: 4,
        py: 1.5,
        fontWeight: 'bold',
        textTransform: 'none',
        boxShadow: '0 4px 14px 0 rgba(30, 58, 95, 0.39)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 20px rgba(30, 58, 95, 0.23)'
        },
        transition: 'all 0.2s ease-in-out'
      }}
    >
      Install Desktop App
    </Button>
  );
}
