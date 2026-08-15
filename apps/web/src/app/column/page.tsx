"use client";

import React from "react";
import { Download, Copy, Check, Save } from "lucide-react";
import { exportColumnSectionToDXF, exportColumnSectionToScript } from "@rdcad-express/dxf-exporter";
import { useAppStore } from "@/store/useStore";
import DXFPreview from "@/components/DXFPreview";
import ExampleSelector, { Example } from "@/components/ExampleSelector";
import type { ColumnScheduleRow } from "@rdcad-express/dwg-schemas";
import { 
  Box, Typography, TextField, Button, Grid, Card, CardContent, Divider, Stack 
} from "@mui/material";

const columnExamples: Example<ColumnScheduleRow>[] = [
  { name: "Standard Square", data: { columnId: "C1", level: "GF", concreteGrade: "M30", width: 400, depth: 400, mainBarCount: 8, mainBarDia: 20, tieDia: 8, tieSpacing: 150 } },
  { name: "Heavy Rectangular", data: { columnId: "C2", level: "Basement", concreteGrade: "M40", width: 400, depth: 900, mainBarCount: 14, mainBarDia: 25, tieDia: 10, tieSpacing: 100 } },
  { name: "Circular (Simulated)", data: { columnId: "C3", level: "First", concreteGrade: "M30", width: 600, depth: 600, mainBarCount: 12, mainBarDia: 16, tieDia: 8, tieSpacing: 150 } },
  { name: "Slender Column", data: { columnId: "C4", level: "Top", concreteGrade: "M25", width: 230, depth: 450, mainBarCount: 6, mainBarDia: 16, tieDia: 8, tieSpacing: 200 } },
  { name: "Massive Pedestal", data: { columnId: "P1", level: "Foundation", concreteGrade: "M35", width: 1000, depth: 1000, mainBarCount: 20, mainBarDia: 32, tieDia: 12, tieSpacing: 150 } },
  { name: "L-Shaped Corner (Sim)", data: { columnId: "C5", level: "GF", concreteGrade: "M30", width: 600, depth: 600, mainBarCount: 16, mainBarDia: 20, tieDia: 10, tieSpacing: 150 } },
  { name: "Edge Column", data: { columnId: "C6", level: "GF", concreteGrade: "M30", width: 300, depth: 600, mainBarCount: 10, mainBarDia: 20, tieDia: 8, tieSpacing: 150 } },
  { name: "Boundary Wall Pillar", data: { columnId: "BP1", level: "GL", concreteGrade: "M20", width: 230, depth: 230, mainBarCount: 4, mainBarDia: 12, tieDia: 8, tieSpacing: 200 } }
];

export default function ColumnDetailing() {
  const colData = useAppStore(state => state.colData);
  const setColData = useAppStore(state => state.setColData);
  const dxfString = React.useMemo(() => exportColumnSectionToDXF(colData), [colData]);

  const handleExport = () => {
    const blob = new Blob([dxfString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Column_${colData.columnId}_${colData.width}x${colData.depth}.dxf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const [copied, setCopied] = React.useState(false);
  const handleCopyScript = () => {
    const scriptString = exportColumnSectionToScript(colData);
    navigator.clipboard.writeText(scriptString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, pt: { xs: 2, md: 2 } }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ pb: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h4"  sx={{ fontWeight: 'bold' }}>Column Detailing</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Parametric column sections with real-time 2D preview</Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h6"  sx={{ fontWeight: 'bold' }}>Properties</Typography>
                  <ExampleSelector examples={columnExamples} onSelect={setColData} />
                </Box>
                
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      label="Mark" 
                      value={colData.columnId} 
                      onChange={e => setColData({...colData, columnId: e.target.value})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }} />
                  
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="number"
                      label="Width (mm)" 
                      value={colData.width ?? 400} 
                      onChange={e => setColData({...colData, width: Number(e.target.value)})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="number"
                      label="Depth (mm)" 
                      value={colData.depth ?? 400} 
                      onChange={e => setColData({...colData, depth: Number(e.target.value)})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="number"
                      label="Main Bar Count" 
                      value={colData.mainBarCount} 
                      onChange={e => setColData({...colData, mainBarCount: Number(e.target.value)})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="number"
                      label="Main Bar Dia (mm)" 
                      value={colData.mainBarDia} 
                      onChange={e => setColData({...colData, mainBarDia: Number(e.target.value)})} 
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
                        defaultName: `Column_${colData.columnId}_${colData.width}x${colData.depth}`, 
                        type: 'column', 
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
