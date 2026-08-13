"use client";

import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { exportColumnSectionToDXF } from "@rdcad-express/dxf-exporter";
import type { ColumnScheduleRow } from "@rdcad-express/dwg-schemas";

export default function ColumnDetailing() {
  const [colData, setColData] = useState<ColumnScheduleRow>({
    columnId: "C1",
    level: "GF",
    concreteGrade: "M30",
    mainBarCount: 8,
    mainBarDia: 20,
    tieDia: 8,
    tieSpacing: 150,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [KonvaComps, setKonvaComps] = useState<any>(null);
  
  useEffect(() => {
    import("react-konva").then(mod => {
      setKonvaComps(mod);
    });
  }, []);

  const handleExport = () => {
    const dxfString = exportColumnSectionToDXF(colData);
    const blob = new Blob([dxfString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${colData.columnId}-section.dxf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const Stage = KonvaComps?.Stage;
  const Layer = KonvaComps?.Layer;
  const Rect = KonvaComps?.Rect;
  const Circle = KonvaComps?.Circle;

  const scale = 0.6;
  const side = Math.max(0, 400 * scale); // Visual scaling
  const cover = 40 * scale;
  const barR = Math.max(0, (colData.mainBarDia / 2) * scale);
  const cx = 300 - side / 2;
  const cy = 250 - side / 2;
  const tieW = Math.max(0, side - 2 * cover);

  // Simple arrangement for 8 bars
  const spacing = tieW / 2;

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-bold text-white">Column Detailing</h1>
            <p className="text-slate-400 mt-2">Parametric column sections with real-time 2D preview</p>
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
                <input type="text" value={colData.columnId} onChange={e => setColData({...colData, columnId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Main Bar Count</label>
                <input type="number" value={colData.mainBarCount} onChange={e => setColData({...colData, mainBarCount: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Main Bar Dia (mm)</label>
                <input type="number" value={colData.mainBarDia} onChange={e => setColData({...colData, mainBarDia: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded border border-slate-800 flex items-center justify-center relative overflow-hidden" style={{ minHeight: "500px" }}>
            <div className="absolute top-4 left-4 text-xs font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded">Live Canvas Render</div>
            {Stage && (
              <Stage width={600} height={500}>
                <Layer>
                  {/* Concrete */}
                  <Rect x={cx} y={cy} width={side} height={side} stroke="white" strokeWidth={2} />
                  {/* Tie */}
                  <Rect x={cx + cover} y={cy + cover} width={tieW} height={tieW} stroke="#3b82f6" strokeWidth={2} cornerRadius={Math.min(4, tieW / 2)} />
                  {/* Main Bars (8 bars layout) */}
                  {[0, 1, 2].map(x => 
                    [0, 1, 2].map(y => {
                      if (x === 1 && y === 1) return null; // Skip center
                      return (
                        <Circle 
                          key={`${x}-${y}`} 
                          x={cx + cover + x * spacing} 
                          y={cy + cover + y * spacing} 
                          radius={barR} 
                          fill="#ef4444" 
                        />
                      );
                    })
                  )}
                </Layer>
              </Stage>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
