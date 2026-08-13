"use client";

import React from "react";
import { Download } from "lucide-react";
import { exportColumnSectionToDXF } from "@rdcad-express/dxf-exporter";
import { useAppStore } from "@/store/useStore";
import DXFPreview from "@/components/DXFPreview";
import ExampleSelector, { Example } from "@/components/ExampleSelector";
import type { ColumnScheduleRow } from "@rdcad-express/dwg-schemas";

const columnExamples: Example<ColumnScheduleRow>[] = [
  { name: "Standard Square", data: { columnId: "C1", level: "GF", concreteGrade: "M30", width: 400, depth: 400, mainBarCount: 8, mainBarDia: 20, tieDia: 8, tieSpacing: 150 } },
  { name: "Heavy Rectangular", data: { columnId: "C2", level: "Basement", concreteGrade: "M40", width: 400, depth: 900, mainBarCount: 14, mainBarDia: 25, tieDia: 10, tieSpacing: 100 } },
  { name: "Circular (Simulated)", data: { columnId: "C3", level: "First", concreteGrade: "M30", width: 600, depth: 600, mainBarCount: 12, mainBarDia: 16, tieDia: 8, tieSpacing: 150 } },
  { name: "Slender Column", data: { columnId: "C4", level: "Top", concreteGrade: "M25", width: 230, depth: 450, mainBarCount: 6, mainBarDia: 16, tieDia: 8, tieSpacing: 200 } },
  { name: "Massive Pedestal", data: { columnId: "P1", level: "Foundation", concreteGrade: "M35", width: 1000, depth: 1000, mainBarCount: 20, mainBarDia: 32, tieDia: 12, tieSpacing: 150 } },
  { name: "L-Shaped Corner (Sim)", data: { columnId: "C5", level: "GF", concreteGrade: "M30", width: 600, depth: 600, mainBarCount: 16, mainBarDia: 20, tieDia: 10, tieSpacing: 150 } },
  { name: "Edge Column", data: { columnId: "C6", level: "GF", concreteGrade: "M30", width: 300, depth: 600, mainBarCount: 10, mainBarDia: 20, tieDia: 8, tieSpacing: 150 } },
  { name: "Boundary Wall Pillar", data: { columnId: "BP1", level: "GL", concreteGrade: "M20", width: 230, depth: 230, mainBarCount: 4, mainBarDia: 12, tieDia: 8, tieSpacing: 200 } }
];

export default function ColumnDetailing() {
  const colData = useAppStore(state => state.colData);
  const setColData = useAppStore(state => state.setColData);
  const dxfString = React.useMemo(() => exportColumnSectionToDXF(colData), [colData]);

  const handleExport = () => {
    const blob = new Blob([dxfString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${colData.columnId}-section.dxf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-bold text-white">Column Detailing</h1>
            <p className="text-slate-400 mt-2">Parametric column sections with real-time 2D preview</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
            <ExampleSelector examples={columnExamples} onSelect={setColData} />
            <button onClick={handleExport} className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded font-medium transition shadow-lg shadow-emerald-500/20 whitespace-nowrap">
              <Download className="w-4 h-4" /> Export DXF
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 rounded border border-slate-800 p-6 space-y-4">
            <h3 className="text-xl font-bold border-b border-slate-800 pb-2">Properties</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Mark</label>
                <input type="text" value={colData.columnId} onChange={e => setColData({...colData, columnId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Width (mm)</label>
                <input type="number" value={colData.width ?? 400} onChange={e => setColData({...colData, width: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Depth (mm)</label>
                <input type="number" value={colData.depth ?? 400} onChange={e => setColData({...colData, depth: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
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
            <div className="absolute top-4 left-4 text-xs font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded z-10">Live DXF Render</div>
            {dxfString && <DXFPreview dxfString={dxfString} />}
          </div>
        </div>
      </div>
    </div>
  );
}
