"use client";

import React, { useState, useEffect } from "react";
import { Download, Search } from "lucide-react";
import { exportTextNodesToDXF } from "@rdcad-express/dxf-exporter";
import { useAppStore } from "@/store/useStore";
import { useTheme } from "next-themes";
import { 
  Box, Typography, TextField, Button, Grid, Card, CardContent, Stack 
} from "@mui/material";

type TextNode = {
  id: string;
  text: string;
  x: number;
  y: number;
};

export default function GridUtilities() {
  const { resolvedTheme } = useTheme();
  const nodes = useAppStore(state => state.nodes);
  const setNodes = useAppStore(state => state.setNodes);
  const prefix = useAppStore(state => state.prefix);
  const setPrefix = useAppStore(state => state.setPrefix);
  const startNum = useAppStore(state => state.startNum);
  const setStartNum = useAppStore(state => state.setStartNum);
  const findText = useAppStore(state => state.findText);
  const setFindText = useAppStore(state => state.setFindText);
  const replaceText = useAppStore(state => state.replaceText);
  const setReplaceText = useAppStore(state => state.setReplaceText);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [KonvaComps, setKonvaComps] = useState<any>(null);

  useEffect(() => {
    import("react-konva").then(mod => {
      setKonvaComps(mod);
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCanvasClick = (e: any) => {
    // only add if we clicked on the stage, not on an existing label
    if (e.target === e.target.getStage()) {
      const stage = e.target.getStage();
      const pointerPosition = stage.getPointerPosition();
      
      const newNode: TextNode = {
        id: `node-${Date.now()}`,
        text: `${prefix}${startNum}`,
        x: pointerPosition.x,
        y: pointerPosition.y,
      };
      
      setNodes([...nodes, newNode]);
      setStartNum(startNum + 1); // auto increment
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (e: any, id: string) => {
    const updatedNodes = nodes.map(node => {
      if (node.id === id) {
        return { ...node, x: e.target.x(), y: e.target.y() };
      }
      return node;
    });
    setNodes(updatedNodes);
  };

  const handleReplace = () => {
    if (!findText) return;
    const updatedNodes = nodes.map(node => ({
      ...node,
      text: node.text.replace(new RegExp(findText, 'g'), replaceText)
    }));
    setNodes(updatedNodes);
  };

  const handleExport = () => {
    const dxfString = exportTextNodesToDXF(nodes);
    const blob = new Blob([dxfString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `grid-labels.dxf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const Stage = KonvaComps?.Stage;
  const Layer = KonvaComps?.Layer;
  const Text = KonvaComps?.Text;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, pt: { xs: 2, md: 2 } }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ pb: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h4"  sx={{ fontWeight: 'bold' }}>Drafting Utilities</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Smart tools for auto-numbering and finding text</Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={4}>
              <Card variant="outlined">
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Typography variant="h6"  sx={{ fontWeight: 'bold',  pb: 2, borderBottom: 1, borderColor: 'divider' }}>
                    Auto-Numbering
                  </Typography>
                  
                  <TextField 
                    label="Prefix" 
                    value={prefix} 
                    onChange={e => setPrefix(e.target.value)} 
                    fullWidth 
                    size="small" 
                  />
                  <TextField 
                    type="number"
                    label="Next Number" 
                    value={startNum} 
                    onChange={e => setStartNum(Number(e.target.value))} 
                    fullWidth 
                    size="small" 
                  />
                  
                  <Typography variant="caption" color="text.secondary">
                    Click on the canvas to place &apos;{prefix}{startNum}&apos;
                  </Typography>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Typography variant="h6"  sx={{ fontWeight: 'bold',  pb: 2, borderBottom: 1, borderColor: 'divider' }}>
                    Find & Replace
                  </Typography>
                  
                  <TextField 
                    label="Find Prefix/String" 
                    value={findText} 
                    onChange={e => setFindText(e.target.value)} 
                    fullWidth 
                    size="small" 
                  />
                  <TextField 
                    label="Replace With" 
                    value={replaceText} 
                    onChange={e => setReplaceText(e.target.value)} 
                    fullWidth 
                    size="small" 
                  />
                  
                  <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={<Search size={18} />}
                    onClick={handleReplace}
                    fullWidth
                  >
                    Replace All
                  </Button>
                </CardContent>
              </Card>

              <Button 
                variant="outlined" 
                color="error"
                onClick={() => setNodes([])}
                fullWidth
              >
                Clear Canvas
              </Button>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={2}>
              <Card variant="outlined" sx={{ minHeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', cursor: 'crosshair', bgcolor: 'background.paper' }}>
                <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 10, bgcolor: 'background.default', px: 1, py: 0.5, borderRadius: 1, fontSize: '0.75rem', fontFamily: 'monospace', color: 'text.secondary', pointerEvents: 'none', border: 1, borderColor: 'divider' }}>
                  Interactive Schematic (Click to place)
                </Box>
                {Stage && (
                  <Stage width={800} height={600} onClick={handleCanvasClick}>
                    <Layer>
                      {nodes.map(node => (
                        <Text
                          key={node.id}
                          text={node.text}
                          x={node.x}
                          y={node.y}
                          fontSize={24}
                          fill={resolvedTheme === 'dark' ? "#e2e8f0" : "#0f172a"}
                          draggable
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          onDragEnd={(e: any) => handleDragEnd(e, node.id)}
                        />
                      ))}
                    </Layer>
                  </Stage>
                )}
              </Card>
              
              <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
                <Button 
                  variant="contained" 
                  color="success"
                  startIcon={<Download size={18} />}
                  onClick={handleExport}
                >
                  Export Labels to DXF
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
