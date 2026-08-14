"use client";

import React from "react";
import { Download } from "lucide-react";
import { exportTankSectionToDXF } from "@rdcad-express/dxf-exporter";
import { useAppStore } from "@/store/useStore";
import DXFPreview from "@/components/DXFPreview";
import ExampleSelector, { Example } from "@/components/ExampleSelector";
import type { TankScheduleRow } from "@rdcad-express/dwg-schemas";

const tankExamples: Example<TankScheduleRow>[] = [
  { name: "Small Underground", data: { tankId: "UGT1", type: "UNDERGROUND", capacity: 50000, width: 3000, length: 5000, height: 3500, wallThickness: 250, mainBarDia: 12, mainBarSpacing: 150 } },
  { name: "Large Overhead", data: { tankId: "OHT1", type: "OVERHEAD", capacity: 150000, width: 6000, length: 8000, height: 4000, wallThickness: 300, mainBarDia: 16, mainBarSpacing: 150 } },
  { name: "Residential Roof Tank", data: { tankId: "RT1", type: "OVERHEAD", capacity: 10000, width: 2000, length: 2500, height: 2000, wallThickness: 150, mainBarDia: 10, mainBarSpacing: 200 } },
  { name: "Fire Water Tank", data: { tankId: "FWT1", type: "UNDERGROUND", capacity: 250000, width: 8000, length: 10000, height: 3500, wallThickness: 350, mainBarDia: 16, mainBarSpacing: 125 } },
  { name: "Sump Pit (Tiny)", data: { tankId: "SP1", type: "UNDERGROUND", capacity: 2000, width: 1000, length: 1000, height: 2000, wallThickness: 150, mainBarDia: 10, mainBarSpacing: 200 } },
  { name: "Rainwater Harvesting", data: { tankId: "RWH1", type: "UNDERGROUND", capacity: 75000, width: 4000, length: 6000, height: 3200, wallThickness: 200, mainBarDia: 12, mainBarSpacing: 175 } },
  { name: "Industrial Storage", data: { tankId: "IND1", type: "OVERHEAD", capacity: 500000, width: 10000, length: 12000, height: 4500, wallThickness: 400, mainBarDia: 20, mainBarSpacing: 100 } },
  { name: "Narrow Trench Tank", data: { tankId: "NT1", type: "UNDERGROUND", capacity: 30000, width: 1500, length: 10000, height: 2000, wallThickness: 200, mainBarDia: 12, mainBarSpacing: 150 } }
];

export default function TankDetailing() {
  const tankData = useAppStore(state => state.tankData);
  const setTankData = useAppStore(state => state.setTankData);
  const dxfString = React.useMemo(() => exportTankSectionToDXF(tankData), [tankData]);

  const handleExport = () => {
    const blob = new Blob([dxfString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Tank_${tankData.tankId}_${tankData.type}_${tankData.width}x${tankData.length}.dxf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-bold text-white">Tank Detailing</h1>
            <p className="text-slate-400 mt-2">Underground and Overhead water tanks</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
            <ExampleSelector examples={tankExamples} onSelect={setTankData} />
            <button 
              onClick={() => {
                useAppStore.getState().setProjectModalData({ 
                  defaultName: `Tank_${tankData.tankId}_${tankData.type}`, 
                  type: 'tank', 
                  dxfString 
                });
              }}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded font-medium transition whitespace-nowrap"
            >
              Save
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
            <div className="absolute top-4 left-4 text-xs font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded z-10">Live DXF Render</div>
            {dxfString && <DXFPreview dxfString={dxfString} />}
          </div>
        </div>
      </div>
    </div>
  );
}
