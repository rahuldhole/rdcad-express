"use client";

import React from "react";
import { Download, Copy, Check, Save } from "lucide-react";
import { exportSlabSectionToDXF, exportSlabSectionToScript } from "@rdcad-express/dxf-exporter";
import { useAppStore } from "@/store/useStore";
import DXFPreview from "@/components/DXFPreview";
import ExampleSelector, { Example } from "@/components/ExampleSelector";
import type { SlabScheduleRow } from "@rdcad-express/dwg-schemas";
import { 
  Box, Typography, TextField, Button, Grid, Card, CardContent, Divider, Stack 
} from "@mui/material";

const slabExamples: Example<SlabScheduleRow>[] = [
  { name: "Standard One-Way", data: { slabId: "S1", lx: 2500, ly: 5000, depth: 150, mainBarDia: 10, mainBarSpacing: 150, distBarDia: 8, distBarSpacing: 200 } },
  { name: "Heavy Two-Way Square", data: { slabId: "S2", lx: 4500, ly: 4500, depth: 175, mainBarDia: 12, mainBarSpacing: 125, distBarDia: 12, distBarSpacing: 125 } },
  { name: "Large Rectangular", data: { slabId: "S3", lx: 4000, ly: 6000, depth: 200, mainBarDia: 12, mainBarSpacing: 150, distBarDia: 10, distBarSpacing: 150 } },
  { name: "Balcony Cantilever (Sim)", data: { slabId: "CS1", lx: 1500, ly: 4000, depth: 150, mainBarDia: 12, mainBarSpacing: 125, distBarDia: 8, distBarSpacing: 200 } },
  { name: "Roof Slab (Light)", data: { slabId: "RS1", lx: 3000, ly: 4000, depth: 125, mainBarDia: 8, mainBarSpacing: 175, distBarDia: 8, distBarSpacing: 200 } },
  { name: "Heavy Machine Floor", data: { slabId: "MFS1", lx: 5000, ly: 5000, depth: 250, mainBarDia: 16, mainBarSpacing: 125, distBarDia: 16, distBarSpacing: 125 } },
  { name: "Staircase Landing", data: { slabId: "SL1", lx: 1200, ly: 2500, depth: 150, mainBarDia: 10, mainBarSpacing: 150, distBarDia: 8, distBarSpacing: 200 } },
  { name: "Sunken Slab (Restroom)", data: { slabId: "SS1", lx: 2000, ly: 2500, depth: 200, mainBarDia: 10, mainBarSpacing: 150, distBarDia: 10, distBarSpacing: 150 } }
];

export default function SlabDetailing() {
  const slabData = useAppStore(state => state.slabData);
  const setSlabData = useAppStore(state => state.setSlabData);
  const dxfString = React.useMemo(() => exportSlabSectionToDXF(slabData), [slabData]);

  const handleExport = () => {
    const blob = new Blob([dxfString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Slab_${slabData.slabId}_${slabData.lx}x${slabData.ly}.dxf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const [copied, setCopied] = React.useState(false);
  const handleCopyScript = () => {
    const scriptString = exportSlabSectionToScript(slabData);
    navigator.clipboard.writeText(scriptString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, pt: { xs: 2, md: 2 } }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ pb: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h4"  sx={{ fontWeight: 'bold' }}>Slab Detailing</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Parametric 1-way and 2-way slab preview</Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h6"  sx={{ fontWeight: 'bold' }}>Properties</Typography>
                  <ExampleSelector examples={slabExamples} onSelect={setSlabData} />
                </Box>
                
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      label="Mark" 
                      value={slabData.slabId} 
                      onChange={e => setSlabData({...slabData, slabId: e.target.value})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }} />
                  
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="number"
                      label="Lx (mm)" 
                      value={slabData.lx} 
                      onChange={e => setSlabData({...slabData, lx: Number(e.target.value)})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="number"
                      label="Ly (mm)" 
                      value={slabData.ly} 
                      onChange={e => setSlabData({...slabData, ly: Number(e.target.value)})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 1 }} />
                
                <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                  <Button 
                    variant="outlined" 
                    color="inherit"
                    startIcon={<Save size={18} />}
                    onClick={() => {
                      useAppStore.getState().setProjectModalData({ 
                        defaultName: `Slab_${slabData.slabId}_${slabData.lx}x${slabData.ly}`, 
                        type: 'slab', 
                        dxfString 
                      });
                    }}
                  >
                    Save
                  </Button>
                  <Button 
                    variant="contained" 
                    color="success"
                    startIcon={<Download size={18} />}
                    onClick={handleExport}
                  >
                    Download
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={copied ? <Check size={18} /> : <Copy size={18} />}
                    onClick={handleCopyScript}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined" sx={{ minHeight: 500, position: 'relative', overflow: 'hidden' }}>
              <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 10, bgcolor: 'background.paper', px: 1, py: 0.5, borderRadius: 1, fontSize: '0.75rem', fontFamily: 'monospace', color: 'text.secondary' }}>
                Live DXF Render
              </Box>
              {dxfString && <DXFPreview dxfString={dxfString} />}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
