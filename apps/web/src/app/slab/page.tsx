"use client";

import React from "react";
import { Download } from "lucide-react";
import { exportSlabSectionToDXF } from "@rdcad-express/dxf-exporter";
import { useAppStore } from "@/store/useStore";
import DXFPreview from "@/components/DXFPreview";
import ExampleSelector, { Example } from "@/components/ExampleSelector";
import type { SlabScheduleRow } from "@rdcad-express/dwg-schemas";

const slabExamples: Example<SlabScheduleRow>[] = [
 { name: "Standard One-Way", data: { slabId: "S1", lx: 2500, ly: 5000, depth: 150, mainBarDia: 10, mainBarSpacing: 150, distBarDia: 8, distBarSpacing: 200 } },
 { name: "Heavy Two-Way Square", data: { slabId: "S2", lx: 4500, ly: 4500, depth: 175, mainBarDia: 12, mainBarSpacing: 125, distBarDia: 12, distBarSpacing: 125 } },
 { name: "Large Rectangular", data: { slabId: "S3", lx: 4000, ly: 6000, depth: 200, mainBarDia: 12, mainBarSpacing: 150, distBarDia: 10, distBarSpacing: 150 } },
 { name: "Balcony Cantilever (Sim)", data: { slabId: "CS1", lx: 1500, ly: 4000, depth: 150, mainBarDia: 12, mainBarSpacing: 125, distBarDia: 8, distBarSpacing: 200 } },
 { name: "Roof Slab (Light)", data: { slabId: "RS1", lx: 3000, ly: 4000, depth: 125, mainBarDia: 8, mainBarSpacing: 175, distBarDia: 8, distBarSpacing: 200 } },
 { name: "Heavy Machine Floor", data: { slabId: "MFS1", lx: 5000, ly: 5000, depth: 250, mainBarDia: 16, mainBarSpacing: 125, distBarDia: 16, distBarSpacing: 125 } },
 { name: "Staircase Landing", data: { slabId: "SL1", lx: 1200, ly: 2500, depth: 150, mainBarDia: 10, mainBarSpacing: 150, distBarDia: 8, distBarSpacing: 200 } },
 { name: "Sunken Slab (Restroom)", data: { slabId: "SS1", lx: 2000, ly: 2500, depth: 200, mainBarDia: 10, mainBarSpacing: 150, distBarDia: 10, distBarSpacing: 150 } }
];

export default function SlabDetailing() {
 const slabData = useAppStore(state => state.slabData);
 const setSlabData = useAppStore(state => state.setSlabData);
 const dxfString = React.useMemo(() => exportSlabSectionToDXF(slabData), [slabData]);

 const handleExport = () => {
 const blob = new Blob([dxfString], { type: "text/plain" });
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download = `Slab_${slabData.slabId}_${slabData.lx}x${slabData.ly}.dxf`;
 a.click();
 URL.revokeObjectURL(url);
 };

 return (
 <div className="p-8">
 <div className="max-w-7xl mx-auto space-y-8">
 <header className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 pb-6 border-b border-border">
 <div>
 <h1 className="text-3xl font-bold text-foreground">Slab Detailing</h1>
 <p className="text-muted-foreground mt-2">Parametric 1-way and 2-way slab preview</p>
 </div>
 <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
 <ExampleSelector examples={slabExamples} onSelect={setSlabData} />
 <button 
 onClick={() => {
 useAppStore.getState().setProjectModalData({ 
 defaultName: `Slab_${slabData.slabId}_${slabData.lx}x${slabData.ly}`, 
 type: 'slab', 
 dxfString 
 });
 }}
 className="flex items-center justify-center gap-2 px-4 py-2 bg-muted hover:bg-muted text-foreground rounded font-medium transition whitespace-nowrap"
 >
 Save
 </button>
 <button onClick={handleExport} className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded font-medium transition shadow-lg shadow-emerald-500/20 whitespace-nowrap">
 <Download className="w-4 h-4" /> Export DXF
 </button>
 </div>
 </header>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="bg-card rounded border border-border p-6 space-y-4">
 <h3 className="text-xl font-bold border-b border-border pb-2">Properties</h3>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm text-muted-foreground mb-1">Mark</label>
 <input type="text" value={slabData.slabId} onChange={e => setSlabData({...slabData, slabId: e.target.value})} className="w-full bg-background border border-border rounded p-2 text-sm focus:border-blue-700 dark:border-blue-500" />
 </div>
 <div />
 <div>
 <label className="block text-sm text-muted-foreground mb-1">Lx (mm)</label>
 <input type="number" value={slabData.lx} onChange={e => setSlabData({...slabData, lx: Number(e.target.value)})} className="w-full bg-background border border-border rounded p-2 text-sm focus:border-blue-700 dark:border-blue-500" />
 </div>
 <div>
 <label className="block text-sm text-muted-foreground mb-1">Ly (mm)</label>
 <input type="number" value={slabData.ly} onChange={e => setSlabData({...slabData, ly: Number(e.target.value)})} className="w-full bg-background border border-border rounded p-2 text-sm focus:border-blue-700 dark:border-blue-500" />
 </div>
 </div>
 </div>

 <div className="bg-card rounded border border-border flex items-center justify-center relative overflow-hidden" style={{ minHeight: "500px" }}>
 <div className="absolute top-4 left-4 text-xs font-mono text-muted-foreground bg-background px-2 py-1 rounded z-10">Live DXF Render</div>
 {dxfString && <DXFPreview dxfString={dxfString} />}
 </div>
 </div>
 </div>
 </div>
 );
}
