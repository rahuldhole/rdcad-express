"use client";

import React, { useState, useEffect } from "react";
import { useAppStore } from "@/store/useStore";
import { X, CheckCircle, FolderPlus } from "lucide-react";

export default function ProjectModal() {
  const { projectModalData, setProjectModalData, addToProject } = useAppStore();
  const [name, setName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (projectModalData) {
      setName(projectModalData.defaultName);
      setShowSuccess(false);
    }
  }, [projectModalData]);

  if (!projectModalData) return null;

  const handleSave = () => {
    const finalName = name.trim() || projectModalData.defaultName;
    addToProject({
      id: crypto.randomUUID(),
      name: finalName,
      type: projectModalData.type,
      dxfString: projectModalData.dxfString
    });
    
    setShowSuccess(true);
    setTimeout(() => {
      setProjectModalData(null);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderPlus className="w-5 h-5 text-blue-400" />
            Add to Project
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
              <CheckCircle className="w-16 h-16 text-emerald-500 animate-in zoom-in" />
              <p className="text-lg font-medium text-white">Added Successfully!</p>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Item Name
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  placeholder={projectModalData.defaultName}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave();
                  }}
                />
                <p className="text-xs text-slate-500 mt-2">
                  This will be the filename when exported (e.g. {name || projectModalData.defaultName}.dxf).
                </p>
              </div>

              <div className="pt-2">
                <button 
                  onClick={handleSave}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition shadow-lg shadow-blue-500/20"
                >
                  Confirm & Add
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
