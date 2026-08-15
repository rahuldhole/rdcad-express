"use client";

import React, { useState } from "react";
import { useAppStore } from "@/store/useStore";
import { Download, Trash2, FolderArchive, Plus, Pencil, Check, X, FileText, FolderOpen } from "lucide-react";
import Link from "next/link";
import JSZip from "jszip";
import { 
  Box, Typography, TextField, Button, Card, CardContent, IconButton, Stack, Paper 
} from "@mui/material";

const elementPages = [
  { href: "/beam", label: "Beam", color: "success.main" },
  { href: "/column", label: "Column", color: "secondary.main" },
  { href: "/slab", label: "Slab", color: "error.main" },
  { href: "/foundation", label: "Foundation", color: "warning.main" },
  { href: "/tank", label: "Tank", color: "info.main" },
  { href: "/stairs", label: "Stairs", color: "warning.dark" },
];

export default function ProjectDashboard() {
  const projectItems = useAppStore(state => state.projectItems);
  const removeFromProject = useAppStore(state => state.removeFromProject);
  const clearProject = useAppStore(state => state.clearProject);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const handleExportZip = async () => {
    if (projectItems.length === 0) return;
    
    const zip = new JSZip();
    
    projectItems.forEach(item => {
      zip.file(`${item.name}.dxf`, item.dxfString);
    });

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `RDCAD_Project_Export.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportSingle = (item: { name: string; dxfString: string }) => {
    const blob = new Blob([item.dxfString], { type: "application/dxf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${item.name}.dxf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const startRename = (id: string, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const confirmRename = (id: string) => {
    if (editName.trim()) {
      const item = projectItems.find(i => i.id === id);
      if (item) {
        useAppStore.getState().removeFromProject(id);
        useAppStore.getState().addToProject({
          ...item,
          id: crypto.randomUUID(),
          name: editName.trim(),
        });
      }
    }
    setEditingId(null);
    setEditName("");
  };

  const totalSize = projectItems.reduce((acc, item) => acc + item.dxfString.length, 0);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, pt: { xs: 2, md: 2 } }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Header */}
        <Box sx={{ pb: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold">Project Dashboard</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {projectItems.length === 0 
                ? "Configure structural elements, then add them here for batch export." 
                : `${projectItems.length} element${projectItems.length > 1 ? 's' : ''} · ${(totalSize / 1024).toFixed(1)} KB total`}
            </Typography>
          </Box>
          {projectItems.length > 0 && (
            <Stack direction="row" spacing={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
              <Button 
                onClick={handleExportZip} 
                variant="contained" 
                color="success"
                startIcon={<FolderArchive size={18} />}
                fullWidth
              >
                Export All (.zip)
              </Button>
              <Button 
                onClick={() => { if (confirm("Remove all items from this project?")) clearProject(); }}
                variant="outlined" 
                color="error"
                startIcon={<Trash2 size={18} />}
                fullWidth
              >
                Clear All
              </Button>
            </Stack>
          )}
        </Box>

        {/* Quick-add bar */}
        <Card variant="outlined" sx={{ bgcolor: 'background.default' }}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
              Quick Add — configure an element & click "Save"
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {elementPages.map(page => (
                <Button
                  key={page.href}
                  component={Link}
                  href={page.href}
                  variant="outlined"
                  size="small"
                  startIcon={<Plus size={16} style={{ color: 'inherit' }} />}
                  sx={{ 
                    color: 'text.primary', 
                    borderColor: 'divider', 
                    bgcolor: 'background.paper',
                    '&:hover': { bgcolor: 'action.hover' },
                    '& .MuiButton-startIcon': { color: page.color }
                  }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Items list */}
        {projectItems.length === 0 ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            py: 10, 
            px: 4,
            bgcolor: 'background.paper', 
            borderRadius: 4, 
            border: '1px dashed', 
            borderColor: 'divider',
            textAlign: 'center'
          }}>
            <Box sx={{ w: 80, h: 80, borderRadius: 4, bgcolor: 'action.hover', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
              <FolderArchive size={40} className="text-muted-foreground opacity-50" />
            </Box>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>Your project is empty.</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 500 }}>
              Use the buttons above to navigate to a detailing page. Configure your element's properties, then click <strong>"Save"</strong> to collect it here. Once you've gathered all elements, export them as a single ZIP file.
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2}>
            {projectItems.map((item, index) => (
              <Paper 
                key={item.id} 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' }, 
                  alignItems: { xs: 'flex-start', sm: 'center' }, 
                  gap: 3,
                  transition: 'all 0.2s',
                  '&:hover': { borderColor: 'primary.main', '& .actions': { opacity: 1 } }
                }}
              >
                {/* Index & Icon */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
                  <Box sx={{ width: 32, height: 32, borderRadius: 2, bgcolor: 'action.selected', display: 'flex', alignItems: 'center', justifyContent: 'center', typography: 'caption', fontFamily: 'monospace', color: 'text.secondary' }}>
                    {index + 1}
                  </Box>
                  <FileText size={20} style={{ color: 'var(--mui-palette-primary-main)' }} />
                </Box>

                {/* Name & Type */}
                <Box sx={{ flexGrow: 1, minWidth: 0, width: '100%' }}>
                  {editingId === item.id ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TextField
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        size="small"
                        autoFocus
                        onKeyDown={e => {
                          if (e.key === "Enter") confirmRename(item.id);
                          if (e.key === "Escape") setEditingId(null);
                        }}
                        sx={{ flexGrow: 1, '& input': { fontFamily: 'monospace' } }}
                      />
                      <IconButton onClick={() => confirmRename(item.id)} color="success" size="small"><Check size={18} /></IconButton>
                      <IconButton onClick={() => setEditingId(null)} color="error" size="small"><X size={18} /></IconButton>
                    </Box>
                  ) : (
                    <Box>
                      <Typography variant="body2" fontWeight="medium" fontFamily="monospace" noWrap>
                        {item.name}<Typography component="span" color="text.secondary">.dxf</Typography>
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize', display: 'block', mt: 0.5 }}>
                        {item.type} · {(item.dxfString.length / 1024).toFixed(1)} KB
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Actions */}
                <Box className="actions" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0, opacity: { xs: 1, sm: 0 }, transition: 'opacity 0.2s', alignSelf: { xs: 'flex-end', sm: 'center' } }}>
                  <IconButton 
                    onClick={() => startRename(item.id, item.name)}
                    size="small"
                    title="Rename"
                  >
                    <Pencil size={18} />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleExportSingle(item)}
                    size="small"
                    color="success"
                    title="Download this file"
                  >
                    <Download size={18} />
                  </IconButton>
                  <IconButton 
                    onClick={() => removeFromProject(item.id)}
                    size="small"
                    color="error"
                    title="Remove from project"
                  >
                    <Trash2 size={18} />
                  </IconButton>
                </Box>
              </Paper>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
