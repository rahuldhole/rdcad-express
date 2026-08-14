"use client";

import React from "react";
import { useAppStore } from "@/store/useStore";
import { Download, Trash2, FolderArchive, Plus } from "lucide-react";
import Link from "next/link";
import JSZip from "jszip";

export default function ProjectDashboard() {
  const projectItems = useAppStore(state => state.projectItems);
  const removeFromProject = useAppStore(state => state.removeFromProject);
  const clearProject = useAppStore(state => state.clearProject);

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

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-bold text-white">Project Dashboard</h1>
            <p className="text-slate-400 mt-2">Manage and batch export your configured structural elements.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
            <button 
              onClick={handleExportZip} 
              disabled={projectItems.length === 0}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded font-medium transition whitespace-nowrap ${projectItems.length > 0 ? "bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-500/20" : "bg-slate-800 text-slate-500 cursor-not-allowed"}`}
            >
              <FolderArchive className="w-4 h-4" /> Export All to ZIP
            </button>
            <button 
              onClick={clearProject}
              disabled={projectItems.length === 0}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded font-medium transition whitespace-nowrap ${projectItems.length > 0 ? "bg-red-600 hover:bg-red-500 shadow-lg shadow-red-500/20 text-white" : "bg-slate-800 text-slate-500 cursor-not-allowed"}`}
            >
              <Trash2 className="w-4 h-4" /> Clear Project
            </button>
          </div>
        </header>

        {projectItems.length === 0 ? (
          <div className="bg-slate-900 rounded border border-slate-800 p-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-600 mb-4">
              <FolderArchive className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold text-white">Your project is empty</h2>
            <p className="text-slate-400 max-w-md mx-auto">
              Go to any detailing page (Beam, Column, Slab, etc.) and click "Add to Project" to build up your master file.
            </p>
            <div className="flex gap-4 mt-6">
              <Link href="/column" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded transition text-sm">
                <Plus className="w-4 h-4" /> Add Column
              </Link>
              <Link href="/beam" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded transition text-sm">
                <Plus className="w-4 h-4" /> Add Beam
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 rounded border border-slate-800 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Element Name</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Size (Bytes)</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {projectItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-blue-400">{item.name}.dxf</td>
                    <td className="px-6 py-4 text-slate-400 capitalize">{item.type}</td>
                    <td className="px-6 py-4 text-slate-400">{item.dxfString.length.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => removeFromProject(item.id)}
                        className="text-red-400 hover:text-red-300 transition p-2"
                        title="Remove from project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
