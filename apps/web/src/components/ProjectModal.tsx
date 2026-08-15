"use client";

import React, { useState, useEffect } from "react";
import { useAppStore } from "@/store/useStore";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Box, Alert, IconButton, InputAdornment } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FolderPlusIcon from "@mui/icons-material/CreateNewFolder";

export default function ProjectModal() {
  const { projectModalData, setProjectModalData, addToProject, projectItems } = useAppStore();
  const [name, setName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const existingItem = projectModalData ? projectItems.find(
    item => item.name === (name.trim() || projectModalData.defaultName)
  ) : null;

  useEffect(() => {
    if (projectModalData) {
      const timer = setTimeout(() => setShowSuccess(false), 0);
      return () => clearTimeout(timer);
    }
  }, [projectModalData]);

  const handleClose = () => {
    setProjectModalData(null);
  };

  if (!projectModalData) return null;

  const handleSave = () => {
    const finalName = name.trim() || projectModalData.defaultName;
    
    if (existingItem) {
      useAppStore.getState().removeFromProject(existingItem.id);
    }
    
    addToProject({
      id: crypto.randomUUID(),
      name: finalName,
      type: projectModalData.type,
      dxfString: projectModalData.dxfString
    });
    
    setShowSuccess(true);
    setTimeout(() => {
      setProjectModalData(null);
    }, 1200);
  };

  const typeLabel = projectModalData.type.charAt(0).toUpperCase() + projectModalData.type.slice(1);

  return (
    <Dialog open={!!projectModalData} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FolderPlusIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">Add {typeLabel} to Project</Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {showSuccess ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4, gap: 2 }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 64 }} />
            <Typography variant="h6" color="text.primary">
              {existingItem ? "Updated in Project!" : "Added to Project!"}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1, border: 1, borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" color="text.secondary" textTransform="uppercase">Element Type</Typography>
                <Typography variant="body2" color="primary" fontWeight="medium" textTransform="capitalize">{projectModalData.type}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" color="text.secondary" textTransform="uppercase">File Size</Typography>
                <Typography variant="body2" fontFamily="monospace">{(projectModalData.dxfString.length / 1024).toFixed(1)} KB</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" color="text.secondary" textTransform="uppercase">Items in Project</Typography>
                <Typography variant="body2" fontFamily="monospace">{projectItems.length}</Typography>
              </Box>
            </Box>

            <TextField
              fullWidth
              label="File Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={projectModalData.defaultName}
              autoFocus
              InputProps={{
                endAdornment: <InputAdornment position="end">.dxf</InputAdornment>,
                sx: { fontFamily: 'monospace' }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
              }}
            />

            {existingItem && (
              <Alert severity="warning">
                An item named <strong>{existingItem.name}.dxf</strong> already exists. It will be replaced.
              </Alert>
            )}
          </Box>
        )}
      </DialogContent>

      {!showSuccess && (
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            color="primary" 
            fullWidth 
            size="large"
          >
            {existingItem ? "Replace & Update" : "Confirm & Add"}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
