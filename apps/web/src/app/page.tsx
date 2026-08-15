"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, GitBranch, Code, Layers, Cpu, Compass, Copy } from "lucide-react";
import { ProtectedEmail } from "@/components/ProtectedEmail";
import { PwaInstallButton } from "@/components/PwaInstallButton";
import { Box, Typography, Button, Container, Grid, Card, CardContent, Chip, Stack } from "@mui/material";

export default function MarketingPage() {
  return (
    <Box sx={{ minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Background decorations */}
      <Box sx={{ position: 'absolute', top: '-20%', left: '-10%', width: '50%', height: '50%', borderRadius: '50%', bgcolor: 'primary.dark', opacity: 0.1, filter: 'blur(120px)', pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '50%', height: '50%', borderRadius: '50%', bgcolor: 'success.dark', opacity: 0.1, filter: 'blur(120px)', pointerEvents: 'none' }} />

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: 16, pb: 10, textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Chip 
          label="RDCAD Express Open Source" 
          variant="outlined" 
          color="primary" 
          sx={{ mb: 4, fontWeight: 'bold' }} 
        />
        
        <Typography variant="h2" component="h1" fontWeight="900" gutterBottom sx={{ background: 'linear-gradient(45deg, #1e3a5f, #f50057)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Parametric Structural <br /> Detailing Reimagined
        </Typography>
        
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}>
          An advanced suite of open-source engineering tools for generating accurate Bar Bending Schedules, DXF exports, and detailed structural designs instantly.
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 2, mb: 4 }}>
          <Button 
            component={Link} 
            href="/guide" 
            variant="contained" 
            color="primary" 
            size="large"
            endIcon={<ArrowRight size={20} />}
            sx={{ borderRadius: 8, px: 4, py: 1.5, fontWeight: 'bold' }}
          >
            Startup Guide
          </Button>
          <PwaInstallButton />
          <Button 
            component="a" 
            href="https://github.com/rahuldhole/rdcad-express" 
            target="_blank" 
            rel="noopener noreferrer"
            variant="outlined" 
            color="inherit" 
            size="large"
            startIcon={<GitBranch size={20} />}
            sx={{ borderRadius: 8, px: 4, py: 1.5, fontWeight: 'bold' }}
          >
            GitHub
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary">
          Found a bug or have a suggestion? <Link href="https://github.com/rahuldhole/rdcad-express/issues" style={{ color: '#f50057', textDecoration: 'underline' }}>Report an Issue</Link>
        </Typography>
      </Container>

      {/* CAD Integration Section */}
      <Box sx={{ py: 12, px: { xs: 2, md: 4 }, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper', position: 'relative', zIndex: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Chip label="Workflow Upgrade" color="info" size="small" sx={{ mb: 2, fontWeight: 'bold', borderRadius: 1 }} />
              <Typography variant="h3" fontWeight="bold" gutterBottom>Seamless AutoCAD Integration</Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Downloading DXF files is just the beginning. We provide a lightweight AutoLISP companion script that bridges the gap between RDCAD Express and your local AutoCAD environment.
              </Typography>
              <Stack spacing={2} sx={{ mb: 4, mt: 2 }}>
                {['Instantly imports your most recent download', 'Attaches block to cursor for immediate placement', 'No file-browser navigation required'].map((text, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: 'success.light', color: 'success.dark', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 'bold' }}>✓</Box>
                    <Typography>{text}</Typography>
                  </Box>
                ))}
              </Stack>
              <Button component={Link} href="/setup" variant="contained" color="primary" endIcon={<ArrowRight size={16} />} sx={{ borderRadius: 2 }}>
                Learn How to Install
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ bgcolor: 'background.default', borderRadius: 4, border: 1, borderColor: 'divider', p: 4, boxShadow: 6, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #3f51b5, #00bcd4, #4caf50)' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, borderBottom: 1, borderColor: 'divider', pb: 2 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#f44336' }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff9800' }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#4caf50' }} />
                  <Typography variant="caption" color="text.secondary" fontFamily="monospace" sx={{ ml: 1 }}>AutoCAD Command Line</Typography>
                </Box>
                <Box sx={{ fontFamily: 'monospace', fontSize: 14, color: 'text.secondary' }}>
                  <Box>Command: <Typography component="span" color="success.main" fontFamily="monospace">RDCAD_IMPORT</Typography></Box>
                  <Box sx={{ mt: 1 }}>Importing: C:\Users\Engineer\Downloads\Beam_B1_300x450.dxf</Box>
                  <Box sx={{ mt: 1 }}>Specify insertion point or [Basepoint/Scale/X/Y/Z/Rotate]:</Box>
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', color: 'primary.main', animation: 'pulse 2s infinite' }}>_</Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Copy CAD Command Section */}
      <Box sx={{ py: 12, px: { xs: 2, md: 4 }, borderTop: 1, borderColor: 'divider', position: 'relative', zIndex: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} sx={{ alignItems: 'center' }} direction={{ xs: 'column', md: 'row-reverse' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Chip label="Instant Drafting" color="secondary" size="small" sx={{ mb: 2, fontWeight: 'bold', borderRadius: 1 }} />
              <Typography variant="h3" fontWeight="bold" gutterBottom>Copy CAD Command</Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Say goodbye to downloading and importing files. Use the <strong>Copy CAD Command</strong> feature to instantly grab the LISP script of your structural element, and paste it directly into AutoCAD.
              </Typography>
              <Stack spacing={2} sx={{ mb: 4, mt: 2 }}>
                {['Generates drawing instantly at your cursor', 'Completely eliminates file clutter', 'Faster than standard DXF exports'].map((text, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: 'secondary.light', color: 'secondary.dark', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 'bold' }}>✓</Box>
                    <Typography>{text}</Typography>
                  </Box>
                ))}
              </Stack>
              <Button component={Link} href="/guide" variant="outlined" color="inherit" endIcon={<ArrowRight size={16} />} sx={{ borderRadius: 2 }}>
                Read the Workflow Guide
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ bgcolor: 'background.paper', borderRadius: 4, border: 1, borderColor: 'divider', p: 6, boxShadow: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', '&:hover': { transform: 'scale(1.02)', transition: 'transform 0.3s' } }}>
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #9c27b0, #f50057, #ff9800)' }} />
                <Box sx={{ width: 96, height: 96, borderRadius: '50%', bgcolor: 'secondary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 3, mb: 3 }}>
                  <Copy size={40} color="white" />
                </Box>
                <Typography variant="h5" fontWeight="bold">Copy CAD Command</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Click to copy script to clipboard</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Reliability Section */}
      <Box sx={{ py: 12, px: { xs: 2, md: 4 }, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper', position: 'relative', zIndex: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Chip label="Quality Assured" color="error" size="small" sx={{ mb: 2, fontWeight: 'bold', borderRadius: 1 }} />
              <Typography variant="h3" fontWeight="bold" gutterBottom>Tested & Reliable Core</Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                We know that structural detailing requires absolute precision. That's why the core mathematical engine and DXF generator of RDCAD Express are backed by a comprehensive <strong>Vitest</strong> test suite.
              </Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                {['Rigorous testing for accurate BBS calculations', 'Automated validation of generated DXF structural integrity', 'Deterministic outputs across different environments'].map((text, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: 'error.light', color: 'error.dark', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 'bold' }}>✓</Box>
                    <Typography>{text}</Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ bgcolor: 'background.default', borderRadius: 4, border: 1, borderColor: 'divider', p: 4, boxShadow: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, borderBottom: 1, borderColor: 'divider', pb: 2 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'text.disabled' }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'text.disabled' }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'text.disabled' }} />
                  <Typography variant="caption" color="text.secondary" fontFamily="monospace" sx={{ ml: 1 }}>vitest run</Typography>
                </Box>
                <Box sx={{ fontFamily: 'monospace', fontSize: 14 }}>
                  <Typography color="success.main" fontFamily="monospace">✓ packages/core-math/src/index.test.ts (8 tests)</Typography>
                  <Typography color="success.main" fontFamily="monospace">✓ packages/dxf-exporter/src/index.test.ts (5 tests)</Typography>
                  <Typography color="text.secondary" fontFamily="monospace" sx={{ mt: 2 }}>Test Files 2 passed (2)</Typography>
                  <Typography color="text.secondary" fontFamily="monospace">Tests 13 passed (13)</Typography>
                  <Typography color="text.secondary" fontFamily="monospace">Duration 843ms</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 12, borderTop: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>Engineering Suite</Typography>
            <Typography color="text.secondary">Everything you need to detail structures efficiently.</Typography>
          </Box>

          <Grid container spacing={3}>
            {[
              { icon: <Code />, title: "BBS Generator", desc: "Real-time parametric rebar weight calculations and scheduling.", link: "/bbs" },
              { icon: <Layers />, title: "Beam Detailing", desc: "Generate detailed beam reinforcements and exports.", link: "/beam" },
              { icon: <Cpu />, title: "Column Detailing", desc: "Automated column schedules and link calculations.", link: "/column" },
              { icon: <Compass />, title: "Foundation", desc: "Isolated footing calculations and base detailing.", link: "/foundation" },
              { icon: <Layers />, title: "Slab Detailing", desc: "Two-way and one-way slab reinforcement generation.", link: "/slab" },
              { icon: <Code />, title: "Tank Detailing", desc: "Water tank structural components and drawings.", link: "/tank" },
              { icon: <Layers />, title: "Stairs Detailing", desc: "Parametric dog-legged stair reinforcements and profiles.", link: "/stairs" },
              { icon: <Code />, title: "Grid Utils", desc: "Drafting utilities for grids, elevations, and revisions.", link: "/utilities" },
              { icon: <Compass />, title: "Asset Library", desc: "Pre-built CAD blocks for architecture and plumbing.", link: "/library" },
              { icon: <Cpu />, title: "Templates", desc: "Standardized title blocks and project templates.", link: "/templates" }
            ].map((feature, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={idx}>
                <FeatureCard {...feature} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Project Feature Section */}
      <Box sx={{ py: 12, px: { xs: 2, md: 4 }, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper', position: 'relative', zIndex: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} sx={{ alignItems: 'center' }} direction={{ xs: 'column-reverse', md: 'row' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ bgcolor: 'background.default', borderRadius: 4, border: 1, borderColor: 'divider', p: 4, boxShadow: 6, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(270deg, #3f51b5, #9c27b0)' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, borderBottom: 1, borderColor: 'divider', pb: 2 }}>
                  <Box sx={{ width: 32, height: 32, borderRadius: 1, bgcolor: 'primary.light', color: 'primary.contrastText', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>P</Box>
                  <Typography variant="subtitle2" fontWeight="bold">Project Active Summary</Typography>
                </Box>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, borderRadius: 2, bgcolor: 'background.paper', border: 1, borderColor: 'divider' }}>
                    <Typography variant="body2" color="text.secondary">Beam Detail B1</Typography>
                    <Chip label="Ready" color="success" size="small" sx={{ borderRadius: 1 }} />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, borderRadius: 2, bgcolor: 'background.paper', border: 1, borderColor: 'divider' }}>
                    <Typography variant="body2" color="text.secondary">Column Schedule C1-C4</Typography>
                    <Chip label="Ready" color="success" size="small" sx={{ borderRadius: 1 }} />
                  </Box>
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    <Grid size={{ xs: 6 }}>
                      <Button variant="outlined" color="primary" fullWidth size="small" sx={{ fontWeight: 'bold' }}>GENERATE REPORT</Button>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Button variant="outlined" color="success" fullWidth size="small" sx={{ fontWeight: 'bold' }}>EXPORT ALL DXF</Button>
                    </Grid>
                  </Grid>
                </Stack>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Chip label="Project Management" color="primary" size="small" sx={{ mb: 2, fontWeight: 'bold', borderRadius: 1 }} />
              <Typography variant="h3" fontWeight="bold" gutterBottom>Unified Project Reports</Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Consolidate your structural designs into a single, cohesive project. RDCAD Express allows you to queue multiple elements—beams, columns, slabs—and generate a comprehensive engineering report.
              </Typography>
              <Stack spacing={2} sx={{ mb: 4, mt: 2 }}>
                {['Batch export multiple DXF files simultaneously', 'Generate unified PDF calculation reports', 'Track your active designs in one centralized view'].map((text, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: 'primary.light', color: 'primary.dark', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 'bold' }}>✓</Box>
                    <Typography>{text}</Typography>
                  </Box>
                ))}
              </Stack>
              <Button component={Link} href="/project" variant="contained" color="primary" endIcon={<ArrowRight size={16} />} sx={{ borderRadius: 2 }}>
                View Project Dashboard
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer Info */}
      <Box sx={{ py: 12, bgcolor: 'background.default', borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
        <Container maxWidth="md">
          <GitBranch size={48} style={{ margin: '0 auto 24px', opacity: 0.7 }} />
          <Typography variant="h4" fontWeight="bold" gutterBottom>Found a Bug? Have an Idea?</Typography>
          <Typography color="text.secondary" sx={{ mb: 6 }}>
            RDCAD Express is open-source, and we rely on community feedback to improve. If you encounter a bug or have a feature request, you can easily report it on our GitHub repository.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
            <Button 
              component="a"
              href="https://github.com/rahuldhole/rdcad-express/issues/new"
              target="_blank"
              variant="contained"
              color="secondary"
              size="large"
              sx={{ borderRadius: 8, px: 4 }}
            >
              Report an Issue Now
            </Button>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Need direct support? Email me at <ProtectedEmail />
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

function FeatureCard({ icon, title, desc, link }: { icon: React.ReactNode, title: string, desc: string, link: string }) {
  return (
    <Card 
      component={Link} 
      href={link} 
      sx={{ 
        height: '100%', 
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 6, borderColor: 'primary.main' },
        border: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper'
      }}
      elevation={0}
    >
      <CardContent>
        <Box sx={{ color: 'primary.main', mb: 2 }}>
          {icon}
        </Box>
        <Typography variant="h6" fontWeight="bold" gutterBottom color="text.primary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>
    </Card>
  );
}
