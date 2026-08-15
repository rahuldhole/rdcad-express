"use client";

import React from "react";
import { Download, Copy, Check, Save } from "lucide-react";
import { exportTankSectionToDXF, exportTankSectionToScript } from "@rdcad-express/dxf-exporter";
import { useAppStore } from "@/store/useStore";
import DXFPreview from "@/components/DXFPreview";
import ExampleSelector, { Example } from "@/components/ExampleSelector";
import type { TankScheduleRow } from "@rdcad-express/dwg-schemas";
import { 
  Box, Typography, TextField, Button, Grid, Card, CardContent, Divider, Stack 
} from "@mui/material";

const tankExamples: Example<TankScheduleRow>[] = [
  { name: "Small Underground", data: { tankId: "UGT1", type: "UNDERGROUND", capacity: 50000, width: 3000, length: 5000, height: 3500, wallThickness: 250, mainBarDia: 12, mainBarSpacing: 150 } },
  { name: "Large Overhead", data: { tankId: "OHT1", type: "OVERHEAD", capacity: 150000, width: 6000, length: 8000, height: 4000, wallThickness: 300, mainBarDia: 16, mainBarSpacing: 150 } },
  { name: "Residential Roof Tank", data: { tankId: "RT1", type: "OVERHEAD", capacity: 10000, width: 2000, length: 2500, height: 2000, wallThickness: 150, mainBarDia: 10, mainBarSpacing: 200 } },
  { name: "Fire Water Tank", data: { tankId: "FWT1", type: "UNDERGROUND", capacity: 250000, width: 8000, length: 10000, height: 3500, wallThickness: 350, mainBarDia: 16, mainBarSpacing: 125 } },
  { name: "Sump Pit (Tiny)", data: { tankId: "SP1", type: "UNDERGROUND", capacity: 2000, width: 1000, length: 1000, height: 2000, wallThickness: 150, mainBarDia: 10, mainBarSpacing: 200 } },
  { name: "Rainwater Harvesting", data: { tankId: "RWH1", type: "UNDERGROUND", capacity: 75000, width: 4000, length: 6000, height: 3200, wallThickness: 200, mainBarDia: 12, mainBarSpacing: 175 } },
  { name: "Industrial Storage", data: { tankId: "IND1", type: "OVERHEAD", capacity: 500000, width: 10000, length: 12000, height: 4500, wallThickness: 400, mainBarDia: 20, mainBarSpacing: 100 } },
  { name: "Narrow Trench Tank", data: { tankId: "NT1", type: "UNDERGROUND", capacity: 30000, width: 1500, length: 10000, height: 2000, wallThickness: 200, mainBarDia: 12, mainBarSpacing: 150 } }
];

export default function TankDetailing() {
  const tankData = useAppStore(state => state.tankData);
  const setTankData = useAppStore(state => state.setTankData);
  const dxfString = React.useMemo(() => exportTankSectionToDXF(tankData), [tankData]);

  const handleExport = () => {
    const blob = new Blob([dxfString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Tank_${tankData.tankId}_${tankData.type}_${tankData.width}x${tankData.length}.dxf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const [copied, setCopied] = React.useState(false);
  const handleCopyScript = () => {
    const scriptString = exportTankSectionToScript(tankData);
    navigator.clipboard.writeText(scriptString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, pt: { xs: 2, md: 2 } }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ pb: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h4"  sx={{ fontWeight: 'bold' }}>Tank Detailing</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Underground and Overhead water tanks</Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h6"  sx={{ fontWeight: 'bold' }}>Properties</Typography>
                  <ExampleSelector examples={tankExamples} onSelect={setTankData} />
                </Box>
                
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      label="Mark" 
                      value={tankData.tankId} 
                      onChange={e => setTankData({...tankData, tankId: e.target.value})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="number"
                      label="Wall Thk (mm)" 
                      value={tankData.wallThickness} 
                      onChange={e => setTankData({...tankData, wallThickness: Number(e.target.value)})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="number"
                      label="Inner Width (mm)" 
                      value={tankData.width} 
                      onChange={e => setTankData({...tankData, width: Number(e.target.value)})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="number"
                      label="Inner Length (mm)" 
                      value={tankData.length} 
                      onChange={e => setTankData({...tankData, length: Number(e.target.value)})} 
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
                        defaultName: `Tank_${tankData.tankId}_${tankData.type}`, 
                        type: 'tank', 
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
