"use client";

import React from "react";
import { Download, Copy, Check, Save } from "lucide-react";
import { exportFoundationSectionToDXF, exportFoundationSectionToScript } from "@rdcad-express/dxf-exporter";
import { useAppStore } from "@/store/useStore";
import DXFPreview from "@/components/DXFPreview";
import ExampleSelector, { Example } from "@/components/ExampleSelector";
import type { FoundationScheduleRow } from "@rdcad-express/dwg-schemas";
import { 
  Box, Typography, TextField, Button, Grid, Card, CardContent, Divider, Stack 
} from "@mui/material";

const foundationExamples: Example<FoundationScheduleRow>[] = [
  { name: "Small Isolated", data: { footingId: "F1", lx: 1500, ly: 1500, depth: 350, meshBarDiaX: 10, meshBarSpacingX: 150, meshBarDiaY: 10, meshBarSpacingY: 150 } },
  { name: "Large Mat Footing", data: { footingId: "F2", lx: 3500, ly: 3500, depth: 600, meshBarDiaX: 16, meshBarSpacingX: 150, meshBarDiaY: 16, meshBarSpacingY: 150 } },
  { name: "Rectangular Footing", data: { footingId: "F3", lx: 2500, ly: 1800, depth: 450, meshBarDiaX: 12, meshBarSpacingX: 125, meshBarDiaY: 10, meshBarSpacingY: 150 } },
  { name: "Strip Footing (Sim)", data: { footingId: "SF1", lx: 1000, ly: 5000, depth: 300, meshBarDiaX: 12, meshBarSpacingX: 150, meshBarDiaY: 10, meshBarSpacingY: 200 } },
  { name: "Combined Footing (Sim)", data: { footingId: "CF1", lx: 2000, ly: 4500, depth: 550, meshBarDiaX: 16, meshBarSpacingX: 125, meshBarDiaY: 12, meshBarSpacingY: 150 } },
  { name: "Heavy Machine Fdn", data: { footingId: "MF1", lx: 4000, ly: 4000, depth: 800, meshBarDiaX: 20, meshBarSpacingX: 100, meshBarDiaY: 20, meshBarSpacingY: 100 } },
  { name: "Lift Pit Footing", data: { footingId: "LPF1", lx: 2500, ly: 2500, depth: 750, meshBarDiaX: 16, meshBarSpacingX: 150, meshBarDiaY: 16, meshBarSpacingY: 150 } },
  { name: "Boundary Wall Fdn", data: { footingId: "BWF1", lx: 800, ly: 800, depth: 200, meshBarDiaX: 8, meshBarSpacingX: 200, meshBarDiaY: 8, meshBarSpacingY: 200 } }
];

export default function FoundationDetailing() {
  const fdnData = useAppStore(state => state.fdnData);
  const setFdnData = useAppStore(state => state.setFdnData);
  const dxfString = React.useMemo(() => exportFoundationSectionToDXF(fdnData), [fdnData]);

  const handleExport = () => {
    const blob = new Blob([dxfString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Foundation_${fdnData.footingId}_${fdnData.lx}x${fdnData.ly}.dxf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const [copied, setCopied] = React.useState(false);
  const handleCopyScript = () => {
    const scriptString = exportFoundationSectionToScript(fdnData);
    navigator.clipboard.writeText(scriptString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, pt: { xs: 2, md: 2 } }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ pb: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h4" fontWeight="bold">Foundation Detailing</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Parametric footing plan and section with DXF export</Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h6" fontWeight="bold">Properties</Typography>
                  <ExampleSelector examples={foundationExamples} onSelect={setFdnData} />
                </Box>
                
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      label="Mark" 
                      value={fdnData.footingId} 
                      onChange={e => setFdnData({...fdnData, footingId: e.target.value})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }} />
                  
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="number"
                      label="Lx (mm)" 
                      value={fdnData.lx} 
                      onChange={e => setFdnData({...fdnData, lx: Number(e.target.value)})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="number"
                      label="Ly (mm)" 
                      value={fdnData.ly} 
                      onChange={e => setFdnData({...fdnData, ly: Number(e.target.value)})} 
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
                        defaultName: `Foundation_${fdnData.footingId}`, 
                        type: 'foundation', 
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
