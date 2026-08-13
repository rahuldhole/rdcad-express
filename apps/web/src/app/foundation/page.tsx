"use client";

import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { exportFoundationSectionToDXF } from "@rdcad-express/dxf-exporter";
import { useAppStore } from "@/store/useStore";

export default function FoundationDetailing() {
  const fdnData = useAppStore(state => state.fdnData);
  const setFdnData = useAppStore(state => state.setFdnData);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [KonvaComps, setKonvaComps] = useState<any>(null);
  
  useEffect(() => {
    import("react-konva").then(mod => {
      setKonvaComps(mod);
    });
  }, []);

  const handleExport = () => {
    const dxfString = exportFoundationSectionToDXF(fdnData);
    const blob = new Blob([dxfString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fdnData.footingId}-foundation.dxf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const Stage = KonvaComps?.Stage;
  const Layer = KonvaComps?.Layer;
  const Rect = KonvaComps?.Rect;

  const scale = 0.15;
  const cx = 50;
  const cy = 50;
  const w = fdnData.lx * scale;
  const h = fdnData.ly * scale;

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-bold text-white">Foundation Detailing</h1>
            <p className="text-slate-400 mt-2">Isolated footing section generator</p>
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
                <input type="text" value={fdnData.footingId} onChange={e => setFdnData({...fdnData, footingId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
              <div />
              <div>
                <label className="block text-sm text-slate-400 mb-1">Lx (mm)</label>
                <input type="number" value={fdnData.lx} onChange={e => setFdnData({...fdnData, lx: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Ly (mm)</label>
                <input type="number" value={fdnData.ly} onChange={e => setFdnData({...fdnData, ly: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded border border-slate-800 flex items-center justify-center relative overflow-hidden" style={{ minHeight: "500px" }}>
            {Stage && (
              <Stage width={500} height={500}>
                <Layer>
                  <Rect x={cx} y={cy} width={w} height={h} stroke="white" strokeWidth={2} />
                  <Rect x={cx + 10} y={cy + 10} width={w - 20} height={h - 20} stroke="#3b82f6" strokeWidth={1} />
                </Layer>
              </Stage>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
