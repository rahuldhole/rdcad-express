"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, PlayCircle, Settings, Copy, Code } from "lucide-react";
import { PwaInstallButton } from "@/components/PwaInstallButton";
import { 
  Box, Typography, Button, Container, Card, CardContent, Grid 
} from "@mui/material";

const features = [
  {
    icon: <PlayCircle className="w-8 h-8 text-primary" />,
    title: "Module Selection",
    description: "Start by choosing a structural element from the dashboard. RDCAD Express supports Beams, Columns, Slabs, Foundations, Stairs, and Tanks. Each module provides specialized parametric controls tailored for that specific structural component."
  },
  {
    icon: <Settings className="w-8 h-8 text-amber-500" />,
    title: "Parametric Design",
    description: "Use the properties panel to input your structural design data. You can modify dimensions, reinforcement details, cover, and mark IDs. The real-time 2D preview will instantly update to reflect your changes, ensuring accuracy before export."
  },
  {
    icon: <Copy className="w-8 h-8 text-indigo-500" />,
    title: "Export & Integration Options",
    description: (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Typography component="strong" color="text.primary">Option A: Copy CAD Command (Recommended)</Typography> - The fastest way to get your drawing into CAD. Click the copy icon in the toolbar, switch to your local AutoCAD window, paste the script directly into the command line, and press Enter. The drawing will generate instantly at your cursor.
        </Box>
        <Box>
          <Typography component="strong" color="text.primary">Option B: Export DXF</Typography> - Save the file or share it with a colleague. A standard .dxf file will download to your device, which is compatible with almost all drafting software.{" "}
          <Typography component={Link} href="/setup" color="primary.main" fontWeight="medium" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Set up the LISP extension
          </Typography>{" "}
          to auto-detect downloaded DXF files directly in CAD.
        </Box>
        <Box>
          <Typography component="strong" color="text.primary">Option C: Add to Project</Typography> - Save multiple elements to a project for batch processing. You can generate a unified BBS report and get a zipped export of all your drawings at once from the Projects dashboard.
        </Box>
      </Box>
    )
  },
  {
    icon: <Code className="w-8 h-8 text-rose-500" />,
    title: "Documentation & BBS",
    description: "For comprehensive documentation, use the 'BBS Generator' or 'Project Management' modules. You can queue multiple elements, calculate exact rebar weights, and export unified PDF reports for your site engineers."
  }
];

export default function GuidePage() {
  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', pb: 12 }}>
      {/* Background decorations */}
      <Box sx={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', borderRadius: '50%', bgcolor: 'primary.main', opacity: 0.05, filter: 'blur(100px)', pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', borderRadius: '50%', bgcolor: 'info.main', opacity: 0.05, filter: 'blur(100px)', pointerEvents: 'none' }} />

      <Container maxWidth="lg" sx={{ pt: 12, position: 'relative', zIndex: 10 }}>
        <Button 
          component={Link} 
          href="/" 
          startIcon={<ArrowLeft size={16} />}
          color="inherit"
          sx={{ mb: 4, color: 'text.secondary', '&:hover': { color: 'text.primary', bgcolor: 'transparent' } }}
        >
          Back to Home
        </Button>
        
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" component="h1" fontWeight="extrabold" sx={{ mb: 3 }}>
            Startup <Typography component="span" variant="h2" fontWeight="extrabold" color="primary.main">Guide</Typography>
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto', fontWeight: 'normal' }}>
            Explore the RDCAD Express core features and flexible workflows to drastically reduce your drafting time.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {features.map((feature, idx) => (
            <Card key={idx} variant="outlined" sx={{ borderRadius: 4, overflow: 'hidden', position: 'relative', transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 4 } }}>
              <Box sx={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', bgcolor: 'primary.main', opacity: 0.5 }} />
              <CardContent sx={{ p: { xs: 4, md: 5 }, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: { xs: 'flex-start', md: 'center' } }}>
                <Box sx={{ 
                  flexShrink: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  width: 80, 
                  height: 80, 
                  borderRadius: 4, 
                  bgcolor: 'background.default', 
                  border: 1, 
                  borderColor: 'divider',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.1)' }
                }}>
                  {feature.icon}
                </Box>
                
                <Box>
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>{feature.title}</Typography>
                  <Typography color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                    {feature.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Grid container spacing={4} sx={{ mt: 6 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card variant="outlined" sx={{ height: '100%', borderRadius: 4, display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>LISP Extension (Optional)</Typography>
                <Typography color="text.secondary" sx={{ mb: 4, flexGrow: 1 }}>
                  To use advanced CAD integration features, follow our one-time setup guide for AutoCAD.
                </Typography>
                <Button 
                  component={Link} 
                  href="/setup" 
                  variant="outlined" 
                  fullWidth
                  sx={{ py: 1.5, borderRadius: 2 }}
                >
                  View Setup Guide
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card variant="outlined" sx={{ height: '100%', borderRadius: 4, display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Install App (Optional)</Typography>
                <Typography color="text.secondary" sx={{ mb: 4, flexGrow: 1 }}>
                  You can install RDCAD Express as a Progressive Web App (PWA) using your browser's install button.
                </Typography>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', '& > *': { width: '100%' } }}>
                  <PwaInstallButton />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card variant="outlined" sx={{ height: '100%', borderRadius: 4, display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Have more questions?</Typography>
                <Typography color="text.secondary" sx={{ mb: 4, flexGrow: 1 }}>
                  Check out our frequently asked questions for troubleshooting and tips.
                </Typography>
                <Button 
                  component={Link} 
                  href="/faq" 
                  variant="outlined" 
                  fullWidth
                  sx={{ py: 1.5, borderRadius: 2 }}
                >
                  Read the FAQ
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
