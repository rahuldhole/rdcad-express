"use client";

import React from "react";
import { Download } from "lucide-react";
import { exportSlabSectionToDXF } from "@rdcad-express/dxf-exporter";
import { useAppStore } from "@/store/useStore";
import DXFPreview from "@/components/DXFPreview";

export default function SlabDetailing() {
  const slabData = useAppStore(state => state.slabData);
  const setSlabData = useAppStore(state => state.setSlabData);
  const dxfString = React.useMemo(() => exportSlabSectionToDXF(slabData), [slabData]);

  const handleExport = () => {
    const blob = new Blob([dxfString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slabData.slabId}-slab.dxf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-bold text-white">Slab Detailing</h1>
            <p className="text-slate-400 mt-2">Parametric 1-way and 2-way slab preview</p>
          </div>
          <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded font-medium transition shadow-lg shadow-emerald-500/20">
            <Download className="w-4 h-4" /> Export DXF
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 rounded border border-slate-800 p-6 space-y-4">
            <h3 className="text-xl font-bold border-b border-slate-800 pb-2">Properties</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Mark</label>
                <input type="text" value={slabData.slabId} onChange={e => setSlabData({...slabData, slabId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
              <div />
              <div>
                <label className="block text-sm text-slate-400 mb-1">Lx (mm)</label>
                <input type="number" value={slabData.lx} onChange={e => setSlabData({...slabData, lx: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Ly (mm)</label>
                <input type="number" value={slabData.ly} onChange={e => setSlabData({...slabData, ly: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded border border-slate-800 flex items-center justify-center relative overflow-hidden" style={{ minHeight: "500px" }}>
            <div className="absolute top-4 left-4 text-xs font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded z-10">Live DXF Render</div>
            {dxfString && <DXFPreview dxfString={dxfString} />}
          </div>
        </div>
      </div>
    </div>
  );
}
