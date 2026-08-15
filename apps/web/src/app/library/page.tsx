"use client";

import React, { useState } from "react";
import { Download, Search, Maximize, X } from "lucide-react";
import { 
  exportDoorDXF, exportWindowDXF, exportNorthSymbolDXF,
  exportDoubleDoorDXF, exportSlidingDoorDXF, exportGarageDoorDXF,
  exportSectionMarkerDXF, exportElevationTargetDXF, exportRevisionCloudDXF, exportGridBubbleDXF,
  exportDeskDXF, exportConferenceTableDXF, exportToiletDXF, exportSinkDXF,
  exportTreeDXF, exportShrubDXF, exportParkingBaysDXF, exportVehicleDXF,
  exportLightFixtureDXF, exportSocketSwitchDXF, exportDistributionBoardDXF, exportHVACVentDXF
} from "@rdcad-express/dxf-exporter";
import DXFPreview from "@/components/DXFPreview";
import { 
  Box, Typography, TextField, Button, Grid, Card, CardActions, 
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Chip, InputAdornment 
} from "@mui/material";

const ASSETS = [
  { id: "door", name: "Standard Door (900mm)", category: "Architectural", generate: exportDoorDXF },
  { id: "double-door", name: "Double Swing Door (1800mm)", category: "Architectural", generate: exportDoubleDoorDXF },
  { id: "sliding-door", name: "Sliding Glass Door (2000mm)", category: "Architectural", generate: exportSlidingDoorDXF },
  { id: "garage-door", name: "Garage Roller Door (2400mm)", category: "Architectural", generate: exportGarageDoorDXF },
  { id: "window", name: "Standard Window (1200mm)", category: "Architectural", generate: exportWindowDXF },
  { id: "north", name: "North Symbol", category: "Drafting", generate: exportNorthSymbolDXF },
  { id: "section-marker", name: "Section Callout", category: "Drafting", generate: exportSectionMarkerDXF },
  { id: "elevation-target", name: "Elevation Target", category: "Drafting", generate: exportElevationTargetDXF },
  { id: "revision-cloud", name: "Revision Cloud", category: "Drafting", generate: exportRevisionCloudDXF },
  { id: "grid-bubble", name: "Grid Line Bubble", category: "Drafting", generate: exportGridBubbleDXF },
  { id: "desk", name: "Standard Desk (1500x750)", category: "Furniture", generate: exportDeskDXF },
  { id: "conference-table", name: "Conference Table (3000x1200)", category: "Furniture", generate: exportConferenceTableDXF },
  { id: "toilet", name: "Water Closet (WC)", category: "Plumbing", generate: exportToiletDXF },
  { id: "sink", name: "Wash Basin (600x450)", category: "Plumbing", generate: exportSinkDXF },
  { id: "tree", name: "Algorithmic Tree (Plan)", category: "Landscaping & Site", generate: exportTreeDXF },
  { id: "shrub", name: "Shrub / Hedge (Plan)", category: "Landscaping & Site", generate: exportShrubDXF },
  { id: "parking", name: "Parking Bays (x5)", category: "Landscaping & Site", generate: exportParkingBaysDXF },
  { id: "vehicle", name: "Standard Sedan", category: "Landscaping & Site", generate: exportVehicleDXF },
  { id: "light-fixture", name: "Ceiling Troffer Light (1200x600)", category: "Electrical & Mechanical", generate: exportLightFixtureDXF },
  { id: "socket-switch", name: "Double Wall Socket", category: "Electrical & Mechanical", generate: exportSocketSwitchDXF },
  { id: "distribution-board", name: "Distribution Board (DB)", category: "Electrical & Mechanical", generate: exportDistributionBoardDXF },
  { id: "hvac-vent", name: "HVAC Supply Diffuser", category: "Electrical & Mechanical", generate: exportHVACVentDXF },
];

type AssetType = { id: string; name: string; category: string; generate: () => string };

export default function AssetLibrary() {
  const [search, setSearch] = useState("");
  const [previewAsset, setPreviewAsset] = useState<AssetType | null>(null);

  const filteredAssets = ASSETS.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  const groupedAssets = filteredAssets.reduce((acc, asset) => {
    if (!acc[asset.category]) acc[asset.category] = [];
    acc[asset.category].push(asset);
    return acc;
  }, {} as Record<string, AssetType[]>);

  const handleExport = (asset: AssetType) => {
    const dxfString = asset.generate();
    const blob = new Blob([dxfString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${asset.id}.dxf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, pt: { xs: 2, md: 2 } }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'flex-end' }, gap: 2, pb: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Box>
            <Typography variant="h4" fontWeight="bold">Architectural Asset Library</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Browse and download standard DXF blocks for your drawings.</Typography>
          </Box>
          <TextField 
            placeholder="Search assets..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ width: { xs: '100%', md: 300 } }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} />
                  </InputAdornment>
                ),
              }
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {Object.entries(groupedAssets).map(([category, assets]) => (
            <Box key={category}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, pb: 1, borderBottom: 1, borderColor: 'divider' }}>
                {category}
              </Typography>
              <Grid container spacing={3}>
                {assets.map(asset => {
                  const dxfString = asset.generate();
                  return (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={asset.id}>
                      <Card 
                        variant="outlined" 
                        sx={{ 
                          height: '100%', 
                          display: 'flex', 
                          flexDirection: 'column',
                          transition: 'all 0.3s',
                          '&:hover': {
                            borderColor: 'primary.main',
                            boxShadow: 4,
                          }
                        }}
                      >
                        <Box sx={{ height: 200, bgcolor: 'background.default', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', borderBottom: 1, borderColor: 'divider' }}>
                          <DXFPreview dxfString={dxfString} staticMode={true} />
                        </Box>
                        <CardActions sx={{ p: 2, justifyContent: 'space-between', bgcolor: 'background.paper' }}>
                          <Typography variant="body2" fontWeight="medium" noWrap sx={{ pr: 2 }}>
                            {asset.name}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
                            <IconButton 
                              onClick={() => setPreviewAsset(asset)}
                              size="small"
                              sx={{ bgcolor: 'secondary.light', color: 'secondary.contrastText', '&:hover': { bgcolor: 'secondary.main' } }}
                              title="Preview Fullscreen"
                            >
                              <Maximize size={16} />
                            </IconButton>
                            <IconButton 
                              onClick={() => handleExport(asset)}
                              size="small"
                              color="primary"
                              sx={{ bgcolor: 'primary.light', color: 'primary.main', '&:hover': { bgcolor: 'primary.main', color: 'primary.contrastText' } }}
                              title="Download DXF"
                            >
                              <Download size={16} />
                            </IconButton>
                          </Box>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          ))}
        </Box>
        
        {filteredAssets.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="body1" color="text.secondary">
              No assets found matching &quot;{search}&quot;.
            </Typography>
          </Box>
        )}
      </Box>

      <Dialog 
        open={!!previewAsset} 
        onClose={() => setPreviewAsset(null)}
        fullWidth
        maxWidth="lg"
        PaperProps={{ sx: { height: '80vh' } }}
      >
        {previewAsset && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider', pb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6" fontWeight="bold">{previewAsset.name}</Typography>
                <Chip label={previewAsset.category} size="small" color="secondary" variant="outlined" />
              </Box>
              <IconButton onClick={() => setPreviewAsset(null)} size="small">
                <X size={20} />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0, bgcolor: 'background.default', position: 'relative' }}>
              <DXFPreview dxfString={previewAsset.generate()} staticMode={false} />
            </DialogContent>
            <DialogActions sx={{ borderTop: 1, borderColor: 'divider', p: 2 }}>
              <Button 
                variant="contained" 
                startIcon={<Download size={18} />} 
                onClick={() => handleExport(previewAsset)}
              >
                Download DXF
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
