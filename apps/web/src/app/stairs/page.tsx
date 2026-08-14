"use client";

import React from "react";
import { Download } from "lucide-react";
import { exportStairsSectionToDXF } from "@rdcad-express/dxf-exporter";
import { useAppStore } from "@/store/useStore";
import DXFPreview from "@/components/DXFPreview";
import ExampleSelector, { Example } from "@/components/ExampleSelector";
import type { StairsScheduleRow } from "@rdcad-express/dwg-schemas";

const stairsExamples: Example<StairsScheduleRow>[] = [
  { name: "Standard Residential", data: { stairId: "ST1", tread: 250, rise: 150, numberOfSteps: 10, waistSlabThickness: 150, mainBarDia: 12, mainBarSpacing: 150, distBarDia: 8, distBarSpacing: 200 } },
  { name: "Commercial Wide", data: { stairId: "ST2", tread: 300, rise: 150, numberOfSteps: 12, waistSlabThickness: 200, mainBarDia: 16, mainBarSpacing: 125, distBarDia: 10, distBarSpacing: 150 } },
  { name: "Compact Service Stairs", data: { stairId: "ST3", tread: 220, rise: 175, numberOfSteps: 8, waistSlabThickness: 125, mainBarDia: 10, mainBarSpacing: 150, distBarDia: 8, distBarSpacing: 200 } },
  { name: "Grand Entrance Stairs", data: { stairId: "ST4", tread: 350, rise: 125, numberOfSteps: 15, waistSlabThickness: 250, mainBarDia: 20, mainBarSpacing: 100, distBarDia: 12, distBarSpacing: 150 } },
  { name: "Fire Escape Stairs", data: { stairId: "ST5", tread: 250, rise: 200, numberOfSteps: 14, waistSlabThickness: 150, mainBarDia: 12, mainBarSpacing: 125, distBarDia: 8, distBarSpacing: 175 } },
  { name: "Basement Access", data: { stairId: "ST6", tread: 250, rise: 160, numberOfSteps: 9, waistSlabThickness: 150, mainBarDia: 12, mainBarSpacing: 150, distBarDia: 8, distBarSpacing: 200 } },
  { name: "Public Building Stairs", data: { stairId: "ST7", tread: 300, rise: 140, numberOfSteps: 20, waistSlabThickness: 200, mainBarDia: 16, mainBarSpacing: 100, distBarDia: 12, distBarSpacing: 150 } },
  { name: "Dog-legged (Standard)", data: { stairId: "ST8", tread: 260, rise: 150, numberOfSteps: 11, waistSlabThickness: 150, mainBarDia: 12, mainBarSpacing: 125, distBarDia: 10, distBarSpacing: 150 } }
];

export default function StairsDetailing() {
  const stairsData = useAppStore(state => state.stairsData);
  const setStairsData = useAppStore(state => state.setStairsData);
  const dxfString = React.useMemo(() => exportStairsSectionToDXF(stairsData), [stairsData]);

  const handleExport = () => {
    const blob = new Blob([dxfString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Stairs_${stairsData.stairId}_${stairsData.tread}x${stairsData.rise}.dxf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-bold text-white">Stairs Detailing</h1>
            <p className="text-slate-400 mt-2">Parametric staircase calculation and preview</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
            <ExampleSelector examples={stairsExamples} onSelect={setStairsData} />
            <button 
              onClick={() => {
                const id = Math.random().toString(36).substring(7);
                useAppStore.getState().addToProject({ 
                  id, 
                  name: `Stairs_${stairsData.stairId}_${stairsData.tread}x${stairsData.rise}`, 
                  type: 'stairs', 
                  dxfString 
                });
                alert(`Added Stairs ${stairsData.stairId} to Project!`);
              }}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded font-medium transition whitespace-nowrap"
            >
              Add to Project
            </button>
            <button onClick={handleExport} className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded font-medium transition shadow-lg shadow-emerald-500/20 whitespace-nowrap">
              <Download className="w-4 h-4" /> Export DXF
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 rounded border border-slate-800 p-6 space-y-4">
            <h3 className="text-xl font-bold border-b border-slate-800 pb-2">Properties</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Mark</label>
                <input type="text" value={stairsData.stairId} onChange={e => setStairsData({...stairsData, stairId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
              <div />
              <div>
                <label className="block text-sm text-slate-400 mb-1">Tread (mm)</label>
                <input type="number" value={stairsData.tread} onChange={e => setStairsData({...stairsData, tread: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Rise (mm)</label>
                <input type="number" value={stairsData.rise} onChange={e => setStairsData({...stairsData, rise: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">No. of Steps</label>
                <input type="number" value={stairsData.numberOfSteps} onChange={e => setStairsData({...stairsData, numberOfSteps: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Waist Slab Thk (mm)</label>
                <input type="number" value={stairsData.waistSlabThickness} onChange={e => setStairsData({...stairsData, waistSlabThickness: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Main Bar Dia (mm)</label>
                <input type="number" value={stairsData.mainBarDia} onChange={e => setStairsData({...stairsData, mainBarDia: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Main Bar Spacing (mm)</label>
                <input type="number" value={stairsData.mainBarSpacing} onChange={e => setStairsData({...stairsData, mainBarSpacing: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Dist Bar Dia (mm)</label>
                <input type="number" value={stairsData.distBarDia} onChange={e => setStairsData({...stairsData, distBarDia: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Dist Bar Spacing (mm)</label>
                <input type="number" value={stairsData.distBarSpacing} onChange={e => setStairsData({...stairsData, distBarSpacing: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm focus:border-blue-500" />
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
