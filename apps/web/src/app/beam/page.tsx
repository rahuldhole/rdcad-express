"use client";

import React from "react";
import { Download, Copy, Check, Save } from "lucide-react";
import { exportBeamSectionToDXF, exportBeamSectionToScript } from "@rdcad-express/dxf-exporter";
import { useAppStore } from "@/store/useStore";
import DXFPreview from "@/components/DXFPreview";
import ExampleSelector, { Example } from "@/components/ExampleSelector";
import type { BeamScheduleRow } from "@rdcad-express/dwg-schemas";
import { 
  Box, Typography, TextField, Button, Grid, Card, CardContent, Divider, Stack 
} from "@mui/material";

const beamExamples: Example<BeamScheduleRow>[] = [
  { name: "Standard Plinth Beam", data: { elementId: "PB1", width: 230, depth: 300, bottomBarDia: 12, bottomBarCount: 3, topExtraLeft: 2, topExtraRight: 2, stirrupDia: 8, stirrupSpacing: 150 } },
  { name: "Heavy Transfer Beam", data: { elementId: "TB1", width: 450, depth: 750, bottomBarDia: 25, bottomBarCount: 5, topExtraLeft: 4, topExtraRight: 4, stirrupDia: 10, stirrupSpacing: 100 } },
  { name: "Wide Shallow Beam", data: { elementId: "WB1", width: 600, depth: 300, bottomBarDia: 16, bottomBarCount: 6, topExtraLeft: 3, topExtraRight: 3, stirrupDia: 8, stirrupSpacing: 125 } },
  { name: "Lintel Beam (Small)", data: { elementId: "LB1", width: 230, depth: 200, bottomBarDia: 10, bottomBarCount: 2, topExtraLeft: 0, topExtraRight: 0, stirrupDia: 8, stirrupSpacing: 200 } },
  { name: "Roof Beam (Light)", data: { elementId: "RB1", width: 230, depth: 400, bottomBarDia: 12, bottomBarCount: 3, topExtraLeft: 2, topExtraRight: 2, stirrupDia: 8, stirrupSpacing: 150 } },
  { name: "Primary Girder (Deep)", data: { elementId: "G1", width: 300, depth: 900, bottomBarDia: 20, bottomBarCount: 4, topExtraLeft: 3, topExtraRight: 3, stirrupDia: 10, stirrupSpacing: 125 } },
  { name: "Secondary Beam (Narrow)", data: { elementId: "SB1", width: 200, depth: 450, bottomBarDia: 16, bottomBarCount: 2, topExtraLeft: 1, topExtraRight: 1, stirrupDia: 8, stirrupSpacing: 150 } },
  { name: "Ground Beam", data: { elementId: "GB1", width: 300, depth: 450, bottomBarDia: 16, bottomBarCount: 3, topExtraLeft: 2, topExtraRight: 2, stirrupDia: 8, stirrupSpacing: 175 } }
];

export default function BeamDetailing() {
  const beamData = useAppStore(state => state.beamData);
  const setBeamData = useAppStore(state => state.setBeamData);
  const dxfString = React.useMemo(() => exportBeamSectionToDXF(beamData), [beamData]);

  const handleExport = () => {
    const blob = new Blob([dxfString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Beam_${beamData.elementId}_${beamData.width}x${beamData.depth}.dxf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const [copied, setCopied] = React.useState(false);
  const handleCopyScript = () => {
    const scriptString = exportBeamSectionToScript(beamData);
    navigator.clipboard.writeText(scriptString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, pt: { xs: 2, md: 2 } }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ pb: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h4" fontWeight="bold">Beam Detailing</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Parametric beam sections with real-time 2D preview</Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h6" fontWeight="bold">Properties</Typography>
                  <ExampleSelector examples={beamExamples} onSelect={setBeamData} />
                </Box>
                
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      label="Mark" 
                      value={beamData.elementId} 
                      onChange={e => setBeamData({...beamData, elementId: e.target.value})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }} />
                  
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="number"
                      label="Width (mm)" 
                      value={beamData.width} 
                      onChange={e => setBeamData({...beamData, width: Number(e.target.value)})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="number"
                      label="Depth (mm)" 
                      value={beamData.depth} 
                      onChange={e => setBeamData({...beamData, depth: Number(e.target.value)})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="number"
                      label="Bottom Bars Count" 
                      value={beamData.bottomBarCount} 
                      onChange={e => setBeamData({...beamData, bottomBarCount: Number(e.target.value)})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="number"
                      label="Bottom Bar Dia (mm)" 
                      value={beamData.bottomBarDia} 
                      onChange={e => setBeamData({...beamData, bottomBarDia: Number(e.target.value)})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 1 }} />
                
                <Stack direction="row" spacing={1} justifyContent="flex-end" flexWrap="wrap">
                  <Button 
                    variant="outlined" 
                    color="inherit"
                    startIcon={<Save size={18} />}
                    onClick={() => {
                      useAppStore.getState().setProjectModalData({ 
                        defaultName: `Beam_${beamData.elementId}_${beamData.width}x${beamData.depth}`, 
                        type: 'beam', 
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
            <Card variant="outlined" sx={{ minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              {dxfString && <DXFPreview dxfString={dxfString} />}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
