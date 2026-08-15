"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: 40, height: 40 }} />;
  }

  return (
    <IconButton
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title="Toggle theme"
      color="inherit"
    >
      {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
