"use client";

import React from "react";
import { Download } from "lucide-react";
import { exportFoundationSectionToDXF } from "@rdcad-express/dxf-exporter";
import { useAppStore } from "@/store/useStore";
import DXFPreview from "@/components/DXFPreview";
import ExampleSelector, { Example } from "@/components/ExampleSelector";
import type { FoundationScheduleRow } from "@rdcad-express/dwg-schemas";

const foundationExamples: Example<FoundationScheduleRow>[] = [
  {
    name: "Small Isolated",
    data: { footingId: "F1", lx: 1500, ly: 1500, depth: 350, meshBarDiaX: 10, meshBarSpacingX: 150, meshBarDiaY: 10, meshBarSpacingY: 150 }
  },
  {
    name: "Large Mat Footing",
    data: { footingId: "F2", lx: 3500, ly: 3500, depth: 600, meshBarDiaX: 16, meshBarSpacingX: 150, meshBarDiaY: 16, meshBarSpacingY: 150 }
  }
];

export default function FoundationDetailing() {
  const fdnData = useAppStore(state => state.fdnData);
  const setFdnData = useAppStore(state => state.setFdnData);
  const dxfString = React.useMemo(() => exportFoundationSectionToDXF(fdnData), [fdnData]);

  const handleExport = () => {
    const blob = new Blob([dxfString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fdnData.footingId}-foundation.dxf`;
    a.click();
    URL.revokeObjectURL(url);
  };

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

        <ExampleSelector examples={foundationExamples} onSelect={setFdnData} />

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
            <div className="absolute top-4 left-4 text-xs font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded z-10">Live DXF Render</div>
            {dxfString && <DXFPreview dxfString={dxfString} />}
          </div>
        </div>
      </div>
    </div>
  );
}
