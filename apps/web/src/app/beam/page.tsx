"use client";

import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { exportBeamSectionToDXF } from "@rdcad-express/dxf-exporter";
import type { BeamScheduleRow } from "@rdcad-express/dwg-schemas";

export default function BeamDetailing() {
  const [beamData, setBeamData] = useState<BeamScheduleRow>({
    elementId: "B1",
    width: 300,
    depth: 450,
    bottomBarDia: 16,
    bottomBarCount: 3,
    topExtraLeft: 2,
    topExtraRight: 2,
    stirrupDia: 8,
    stirrupSpacing: 150,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [KonvaComps, setKonvaComps] = useState<any>(null);
  
  useEffect(() => {
    // Dynamic import to avoid SSR issues with Konva
    import("react-konva").then(mod => {
      setKonvaComps(mod);
    });
  }, []);

  const handleExport = () => {
    const dxfString = exportBeamSectionToDXF(beamData);
    const blob = new Blob([dxfString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${beamData.elementId}-section.dxf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const scale = 0.5; // Scale down for display
  const cover = 40 * scale;
  const w = beamData.width * scale;
  const d = beamData.depth * scale;
  const barR = (beamData.bottomBarDia / 2) * scale;
  const cx = 300 - w / 2;
  const cy = 250 - d / 2;

  const Stage = KonvaComps?.Stage;
  const Layer = KonvaComps?.Layer;
  const Rect = KonvaComps?.Rect;
  const Circle = KonvaComps?.Circle;

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-bold text-white">Beam Detailing</h1>
            <p className="text-slate-400 mt-2">Parametric beam sections with real-time 2D preview</p>
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
                <input type="text" value={beamData.elementId} onChange={e => setBeamData({...beamData, elementId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
              <div />
              <div>
                <label className="block text-sm text-slate-400 mb-1">Width (mm)</label>
                <input type="number" value={beamData.width} onChange={e => setBeamData({...beamData, width: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Depth (mm)</label>
                <input type="number" value={beamData.depth} onChange={e => setBeamData({...beamData, depth: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Bottom Bars Count</label>
                <input type="number" value={beamData.bottomBarCount} onChange={e => setBeamData({...beamData, bottomBarCount: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Bottom Bar Dia (mm)</label>
                <input type="number" value={beamData.bottomBarDia} onChange={e => setBeamData({...beamData, bottomBarDia: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded border border-slate-800 flex items-center justify-center relative overflow-hidden" style={{ minHeight: "500px" }}>
            <div className="absolute top-4 left-4 text-xs font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded">Live Canvas Render</div>
            {Stage && (
              <Stage width={600} height={500}>
                <Layer>
                  {/* Concrete */}
                  <Rect x={cx} y={cy} width={w} height={d} stroke="white" strokeWidth={2} />
                  {/* Stirrup */}
                  <Rect x={cx + cover} y={cy + cover} width={w - 2 * cover} height={d - 2 * cover} stroke="#3b82f6" strokeWidth={2} cornerRadius={4} />
                  {/* Bottom Bars */}
                  {Array.from({ length: beamData.bottomBarCount }).map((_, i) => (
                    <Circle 
                      key={`b-${i}`} 
                      x={cx + cover + i * ((w - 2 * cover) / Math.max(1, beamData.bottomBarCount - 1))} 
                      y={cy + d - cover} 
                      radius={barR} 
                      fill="#ef4444" 
                    />
                  ))}
                  {/* Top Bars */}
                  {Array.from({ length: 2 }).map((_, i) => (
                    <Circle 
                      key={`t-${i}`} 
                      x={cx + cover + i * ((w - 2 * cover) / 1)} 
                      y={cy + cover} 
                      radius={barR} 
                      fill="#ef4444" 
                    />
                  ))}
                </Layer>
              </Stage>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
