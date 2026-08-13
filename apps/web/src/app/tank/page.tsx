"use client";

import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { exportTankSectionToDXF } from "@rdcad-express/dxf-exporter";
import type { TankScheduleRow } from "@rdcad-express/dwg-schemas";
import { useAppStore } from "@/store/useStore";

export default function TankDetailing() {
  const tankData = useAppStore(state => state.tankData);
  const setTankData = useAppStore(state => state.setTankData);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [KonvaComps, setKonvaComps] = useState<any>(null);
  
  useEffect(() => {
    import("react-konva").then(mod => {
      setKonvaComps(mod);
    });
  }, []);

  const handleExport = () => {
    const dxfString = exportTankSectionToDXF(tankData);
    const blob = new Blob([dxfString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tankData.tankId}-tank.dxf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const Stage = KonvaComps?.Stage;
  const Layer = KonvaComps?.Layer;
  const Rect = KonvaComps?.Rect;

  const scale = 0.08;
  const cx = 50;
  const cy = 50;
  const outerW = (tankData.width + 2 * tankData.wallThickness) * scale;
  const outerH = (tankData.length + 2 * tankData.wallThickness) * scale;
  const innerW = tankData.width * scale;
  const innerH = tankData.length * scale;
  const wt = tankData.wallThickness * scale;

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-bold text-white">Tank Detailing</h1>
            <p className="text-slate-400 mt-2">Underground and Overhead water tanks</p>
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
                <input type="text" value={tankData.tankId} onChange={e => setTankData({...tankData, tankId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Wall Thk (mm)</label>
                <input type="number" value={tankData.wallThickness} onChange={e => setTankData({...tankData, wallThickness: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Inner Width (mm)</label>
                <input type="number" value={tankData.width} onChange={e => setTankData({...tankData, width: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Inner Length (mm)</label>
                <input type="number" value={tankData.length} onChange={e => setTankData({...tankData, length: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded border border-slate-800 flex items-center justify-center relative overflow-hidden" style={{ minHeight: "500px" }}>
            {Stage && (
              <Stage width={500} height={500}>
                <Layer>
                  <Rect x={cx} y={cy} width={outerW} height={outerH} stroke="white" strokeWidth={2} />
                  <Rect x={cx + wt} y={cy + wt} width={innerW} height={innerH} stroke="white" strokeWidth={2} />
                </Layer>
              </Stage>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
