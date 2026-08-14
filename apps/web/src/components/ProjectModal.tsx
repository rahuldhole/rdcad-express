"use client";

import React, { useState, useEffect } from "react";
import { useAppStore } from "@/store/useStore";
import { X, CheckCircle, FolderPlus, AlertTriangle } from "lucide-react";

export default function ProjectModal() {
  const { projectModalData, setProjectModalData, addToProject, projectItems } = useAppStore();
  const [name, setName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const existingItem = projectModalData ? projectItems.find(
    item => item.name === (name.trim() || projectModalData.defaultName)
  ) : null;

  useEffect(() => {
    if (projectModalData) {
      setName(projectModalData.defaultName);
      setShowSuccess(false);
    }
  }, [projectModalData]);

  if (!projectModalData) return null;

  const handleSave = () => {
    const finalName = name.trim() || projectModalData.defaultName;
    
    // If duplicate name exists, replace it
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setProjectModalData(null)}>
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md shadow-2xl overflow-hidden relative" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FolderPlus className="w-5 h-5 text-blue-400" />
            Add {typeLabel} to Project
          </h2>
          <button 
            onClick={() => setProjectModalData(null)}
            className="text-slate-400 hover:text-white transition p-1 rounded-md hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {showSuccess ? (
            <div className="flex flex-col items-center justify-center py-6 space-y-3">
              <CheckCircle className="w-16 h-16 text-emerald-500" />
              <p className="text-lg font-medium text-white">
                {existingItem ? "Updated in Project!" : "Added to Project!"}
              </p>
            </div>
          ) : (
            <>
              {/* Element info summary */}
              <div className="bg-slate-950 rounded-lg border border-slate-800 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Element Type</span>
                  <span className="text-sm font-medium text-blue-400 capitalize">{projectModalData.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">File Size</span>
                  <span className="text-sm font-mono text-slate-300">{(projectModalData.dxfString.length / 1024).toFixed(1)} KB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Items in Project</span>
                  <span className="text-sm font-mono text-slate-300">{projectItems.length}</span>
                </div>
              </div>

              {/* Name input */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">
                  File Name
                </label>
                <div className="flex items-center gap-0">
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-l-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition font-mono text-sm"
                    placeholder={projectModalData.defaultName}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSave();
                      if (e.key === 'Escape') setProjectModalData(null);
                    }}
                  />
                  <span className="px-3 py-3 bg-slate-800 border border-l-0 border-slate-700 rounded-r-lg text-slate-500 text-sm">.dxf</span>
                </div>
              </div>

              {/* Duplicate warning */}
              {existingItem && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-900/20 border border-amber-500/20 text-amber-300 text-sm">
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>An item named <strong>{existingItem.name}.dxf</strong> already exists. It will be replaced with the new version.</span>
                </div>
              )}

              <button 
                onClick={handleSave}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition shadow-lg shadow-blue-500/20"
              >
                {existingItem ? "Replace & Update" : "Confirm & Add"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
