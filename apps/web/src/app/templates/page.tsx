"use client";

import React from "react";
import { Download } from "lucide-react";
import { exportTemplateToDXF } from "@rdcad-express/dxf-exporter";
import { useAppStore } from "@/store/useStore";
import DXFPreview from "@/components/DXFPreview";
import { 
  Box, Typography, TextField, Button, Grid, Card, CardContent, Divider, Stack, MenuItem, Select, FormControl, InputLabel
} from "@mui/material";

export default function TemplatesDetailing() {
  const templateData = useAppStore(state => state.templateData);
  const setTemplateData = useAppStore(state => state.setTemplateData);
  const dxfString = React.useMemo(() => exportTemplateToDXF(templateData), [templateData]);

  const handleExport = () => {
    const blob = new Blob([dxfString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${templateData.projectName.replace(/\s+/g, "_")}-TitleBlock.dxf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, pt: { xs: 2, md: 2 } }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ pb: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h4"  sx={{ fontWeight: 'bold' }}>Drawing Templates</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Generate standard title blocks and sheet borders</Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography variant="h6"  sx={{ fontWeight: 'bold',  pb: 2, borderBottom: 1, borderColor: 'divider' }}>
                  Properties
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Sheet Size</InputLabel>
                      <Select
                        value={templateData.sheetSize}
                        label="Sheet Size"
                        onChange={e => setTemplateData({...templateData, sheetSize: e.target.value as 'A1' | 'A2' | 'A3'})}
                      >
                        <MenuItem value="A1">A1 (841 x 594)</MenuItem>
                        <MenuItem value="A2">A2 (594 x 420)</MenuItem>
                        <MenuItem value="A3">A3 (420 x 297)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }} />
                  
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      label="Project Name" 
                      value={templateData.projectName} 
                      onChange={e => setTemplateData({...templateData, projectName: e.target.value})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      label="Client Name" 
                      value={templateData.clientName} 
                      onChange={e => setTemplateData({...templateData, clientName: e.target.value})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      label="Drawing Title" 
                      value={templateData.drawingTitle} 
                      onChange={e => setTemplateData({...templateData, drawingTitle: e.target.value})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      label="Drawn By" 
                      value={templateData.drawnBy} 
                      onChange={e => setTemplateData({...templateData, drawnBy: e.target.value})} 
                      fullWidth 
                      size="small" 
                    />
                  </Grid>
                  
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      type="date"
                      label="Date" 
                      value={templateData.date} 
                      onChange={e => setTemplateData({...templateData, date: e.target.value})} 
                      fullWidth 
                      size="small"
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 1 }} />
                
                <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
                  <Button 
                    variant="contained" 
                    color="success"
                    startIcon={<Download size={18} />}
                    onClick={handleExport}
                  >
                    Export DXF
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
