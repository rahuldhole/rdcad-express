"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store/useStore";
import { 
  AppBar, Toolbar, IconButton, Typography, Button, Box, Drawer, List, 
  ListItem, ListItemButton, ListItemText, Badge, Divider, Chip
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const projectItems = useAppStore(state => state.projectItems);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

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

  const drawer = (
    <Box onClick={toggleDrawer} sx={{ textAlign: 'center' }}>
      <Box sx={{ my: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <Image src="/logo.svg" alt="RDCAD Express Logo" width={32} height={32} />
        <Typography variant="h6" color="primary" fontWeight="bold">RDCAD Express</Typography>
      </Box>
      <Divider />
      <List>
        {navLinks.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton 
              component={Link} 
              href={item.href} 
              selected={pathname === item.href}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary={item.label} />
              {item.isBeta && <Chip label="Beta" size="small" color="success" variant="outlined" sx={{ ml: 1 }} />}
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{ my: 1 }} />
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/project" sx={{ textAlign: 'center' }}>
            <Badge badgeContent={projectItems.length} color="primary" sx={{ mr: 2 }}>
              <ListItemText primary="Project" />
            </Badge>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="sticky" color="inherit" elevation={1} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar sx={{ justifyContent: 'space-between', maxWidth: 1280, mx: 'auto', width: '100%' }}>
          <Box component={Link} href="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit' }}>
            <Image src="/logo.svg" alt="RDCAD Express Logo" width={32} height={32} />
            <Typography variant="h6" color="primary" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              RDCAD Express
              <Chip label="Beta" size="small" color="primary" variant="outlined" sx={{ height: 20, fontSize: '0.625rem' }} />
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 1 }}>
            {navLinks.map((item) => (
              <Button 
                key={item.href} 
                component={Link} 
                href={item.href}
                color={item.isBeta ? "success" : pathname === item.href ? "primary" : "inherit"}
                sx={{ 
                  fontWeight: pathname === item.href ? 'bold' : 'medium',
                  opacity: pathname === item.href ? 1 : 0.7 
                }}
              >
                {item.label}
              </Button>
            ))}
            <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />
            <Button 
              component={Link} 
              href="/project"
              variant="outlined"
              color="inherit"
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={projectItems.length} color="primary" sx={{ mr: projectItems.length > 0 ? 1 : 0 }}>
                Project
              </Badge>
            </Button>
          </Box>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ display: { lg: 'none' } }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          anchor="top"
          variant="temporary"
          open={mobileOpen}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%', mt: '64px' },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
