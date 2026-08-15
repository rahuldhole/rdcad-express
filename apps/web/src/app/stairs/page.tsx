"use client";

import React from "react";
import { Download, Copy, Check, Save } from "lucide-react";
import { exportStairsSectionToDXF, exportStairsSectionToScript } from "@rdcad-express/dxf-exporter";
import { useAppStore } from "@/store/useStore";
import DXFPreview from "@/components/DXFPreview";
import ExampleSelector, { Example } from "@/components/ExampleSelector";
import type { StairsScheduleRow } from "@rdcad-express/dwg-schemas";
import { 
  Box, Typography, TextField, Button, Grid, Card, CardContent, Divider, Stack 
} from "@mui/material";

const stairsExamples: Example<StairsScheduleRow>[] = [
  { name: "Standard Residential", data: { stairId: "ST1", tread: 250, rise: 150, numberOfSteps: 10, waistSlabThickness: 150, mainBarDia: 12, mainBarSpacing: 150, distBarDia: 8, distBarSpacing: 200 } },
  { name: "Commercial Wide", data: { stairId: "ST2", tread: 300, rise: 150, numberOfSteps: 12, waistSlabThickness: 200, mainBarDia: 16, mainBarSpacing: 125, distBarDia: 10, distBarSpacing: 150 } },
  { name: "Compact Service Stairs", data: { stairId: "ST3", tread: 220, rise: 175, numberOfSteps: 8, waistSlabThickness: 125, mainBarDia: 10, mainBarSpacing: 150, distBarDia: 8, distBarSpacing: 200 } },
  { name: "Grand Entrance Stairs", data: { stairId: "ST4", tread: 350, rise: 125, numberOfSteps: 15, waistSlabThickness: 250, mainBarDia: 20, mainBarSpacing: 100, distBarDia: 12, distBarSpacing: 150 } },
  { name: "Fire Escape Stairs", data: { stairId: "ST5", tread: 250, rise: 200, numberOfSteps: 14, waistSlabThickness: 150, mainBarDia: 12, mainBarSpacing: 125, distBarDia: 8, distBarSpacing: 175 } },
  { name: "Basement Access", data: { stairId: "ST6", tread: 250, rise: 160, numberOfSteps: 9, waistSlabThickness: 150, mainBarDia: 12, mainBarSpacing: 150, distBarDia: 8, distBarSpacing: 200 } },
  { name: "Public Building Stairs", data: { stairId: "ST7", tread: 300, rise: 140, numberOfSteps: 20, waistSlabThickness: 200, mainBarDia: 16, mainBarSpacing: 100, distBarDia: 12, distBarSpacing: 150 } },
  { name: "Dog-legged (Standard)", data: { stairId: "ST8", tread: 260, rise: 150, numberOfSteps: 11, waistSlabThickness: 150, mainBarDia: 12, mainBarSpacing: 125, distBarDia: 10, distBarSpacing: 150 } }
];

export default function StairsDetailing() {
  const stairsData = useAppStore(state => state.stairsData);
  const setStairsData = useAppStore(state => state.setStairsData);
  const dxfString = React.useMemo(() => exportStairsSectionToDXF(stairsData), [stairsData]);

  const handleExport = () => {
    const blob = new Blob([dxfString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Stairs_${stairsData.stairId}_${stairsData.tread}x${stairsData.rise}.dxf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const [copied, setCopied] = React.useState(false);
  const handleCopyScript = () => {
    const scriptString = exportStairsSectionToScript(stairsData);
    navigator.clipboard.writeText(scriptString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, pt: { xs: 2, md: 2 } }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ pb: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h4"  sx={{ fontWeight: 'bold' }}>Stairs Detailing</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Parametric staircase calculation and preview</Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h6"  sx={{ fontWeight: 'bold' }}>Properties</Typography>
                  <ExampleSelector examples={stairsExamples} onSelect={setStairsData} />
                </Box>
                
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      label="Mark" 
                      value={stairsData.stairId} 
                      onChange={e => setStairsData({...stairsData, stairId: e.target.value})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }} />
                  
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="number"
                      label="Tread (mm)" 
                      value={stairsData.tread} 
                      onChange={e => setStairsData({...stairsData, tread: Number(e.target.value)})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="number"
                      label="Rise (mm)" 
                      value={stairsData.rise} 
                      onChange={e => setStairsData({...stairsData, rise: Number(e.target.value)})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="number"
                      label="No. of Steps" 
                      value={stairsData.numberOfSteps} 
                      onChange={e => setStairsData({...stairsData, numberOfSteps: Number(e.target.value)})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="number"
                      label="Waist Slab Thk (mm)" 
                      value={stairsData.waistSlabThickness} 
                      onChange={e => setStairsData({...stairsData, waistSlabThickness: Number(e.target.value)})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="number"
                      label="Main Bar Dia (mm)" 
                      value={stairsData.mainBarDia} 
                      onChange={e => setStairsData({...stairsData, mainBarDia: Number(e.target.value)})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="number"
                      label="Main Bar Spacing (mm)" 
                      value={stairsData.mainBarSpacing} 
                      onChange={e => setStairsData({...stairsData, mainBarSpacing: Number(e.target.value)})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="number"
                      label="Dist Bar Dia (mm)" 
                      value={stairsData.distBarDia} 
                      onChange={e => setStairsData({...stairsData, distBarDia: Number(e.target.value)})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="number"
                      label="Dist Bar Spacing (mm)" 
                      value={stairsData.distBarSpacing} 
                      onChange={e => setStairsData({...stairsData, distBarSpacing: Number(e.target.value)})} 
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
                        defaultName: `Stairs_${stairsData.stairId}_${stairsData.tread}x${stairsData.rise}`, 
                        type: 'stairs', 
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
