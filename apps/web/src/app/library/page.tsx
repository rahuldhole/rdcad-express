"use client";

import React from "react";
import { Download, Search } from "lucide-react";
import { exportDoorDXF, exportWindowDXF, exportNorthSymbolDXF } from "@rdcad-express/dxf-exporter";
import DXFPreview from "@/components/DXFPreview";

const ASSETS = [
  { id: "door", name: "Standard Door (900mm)", category: "Architectural", generate: exportDoorDXF },
  { id: "window", name: "Standard Window (1200mm)", category: "Architectural", generate: exportWindowDXF },
  { id: "north", name: "North Symbol", category: "Drafting", generate: exportNorthSymbolDXF },
];

export default function AssetLibrary() {
  const [search, setSearch] = React.useState("");

  const filteredAssets = ASSETS.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = (asset: { id: string; name: string; category: string; generate: () => string }) => {
    const dxfString = asset.generate();
    const blob = new Blob([dxfString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${asset.id}.dxf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:justify-between md:items-end pb-6 border-b border-slate-800 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Architectural Asset Library</h1>
            <p className="text-slate-400 mt-2">Browse and download standard DXF blocks for your drawings.</p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search assets..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-md pl-10 pr-4 py-2 text-sm text-white focus:border-blue-500 outline-none"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map(asset => {
            const dxfString = asset.generate();
            return (
              <div key={asset.id} className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden flex flex-col group hover:border-slate-600 transition">
                <div className="h-48 bg-slate-950 p-4 relative flex items-center justify-center">
                  <DXFPreview dxfString={dxfString} />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-slate-800/80 text-xs rounded text-slate-300 backdrop-blur">
                    {asset.category}
                  </div>
                </div>
                <div className="p-4 border-t border-slate-800 flex justify-between items-center bg-slate-900">
                  <h3 className="font-semibold text-white">{asset.name}</h3>
                  <button 
                    onClick={() => handleExport(asset)}
                    className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded transition"
                    title="Download DXF"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredAssets.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            No assets found matching &quot;{search}&quot;.
          </div>
        )}
      </div>
    </div>
  );
}
