"use client";

import React from "react";
import { Download, Search, X } from "lucide-react";
import { 
  exportDoorDXF, exportWindowDXF, exportNorthSymbolDXF,
  exportDoubleDoorDXF, exportSlidingDoorDXF, exportGarageDoorDXF,
  exportSectionMarkerDXF, exportElevationTargetDXF, exportRevisionCloudDXF, exportGridBubbleDXF,
  exportDeskDXF, exportConferenceTableDXF, exportToiletDXF, exportSinkDXF,
  exportTreeDXF, exportShrubDXF, exportParkingBaysDXF, exportVehicleDXF,
  exportLightFixtureDXF, exportSocketSwitchDXF, exportDistributionBoardDXF, exportHVACVentDXF
} from "@rdcad-express/dxf-exporter";
import DXFPreview from "@/components/DXFPreview";

const ASSETS = [
  { id: "door", name: "Standard Door (900mm)", category: "Architectural", generate: exportDoorDXF },
  { id: "double-door", name: "Double Swing Door (1800mm)", category: "Architectural", generate: exportDoubleDoorDXF },
  { id: "sliding-door", name: "Sliding Glass Door (2000mm)", category: "Architectural", generate: exportSlidingDoorDXF },
  { id: "garage-door", name: "Garage Roller Door (2400mm)", category: "Architectural", generate: exportGarageDoorDXF },
  { id: "window", name: "Standard Window (1200mm)", category: "Architectural", generate: exportWindowDXF },
  { id: "north", name: "North Symbol", category: "Drafting", generate: exportNorthSymbolDXF },
  { id: "section-marker", name: "Section Callout", category: "Drafting", generate: exportSectionMarkerDXF },
  { id: "elevation-target", name: "Elevation Target", category: "Drafting", generate: exportElevationTargetDXF },
  { id: "revision-cloud", name: "Revision Cloud", category: "Drafting", generate: exportRevisionCloudDXF },
  { id: "grid-bubble", name: "Grid Line Bubble", category: "Drafting", generate: exportGridBubbleDXF },
  { id: "desk", name: "Standard Desk (1500x750)", category: "Furniture", generate: exportDeskDXF },
  { id: "conference-table", name: "Conference Table (3000x1200)", category: "Furniture", generate: exportConferenceTableDXF },
  { id: "toilet", name: "Water Closet (WC)", category: "Plumbing", generate: exportToiletDXF },
  { id: "sink", name: "Wash Basin (600x450)", category: "Plumbing", generate: exportSinkDXF },
  { id: "tree", name: "Algorithmic Tree (Plan)", category: "Landscaping & Site", generate: exportTreeDXF },
  { id: "shrub", name: "Shrub / Hedge (Plan)", category: "Landscaping & Site", generate: exportShrubDXF },
  { id: "parking", name: "Parking Bays (x5)", category: "Landscaping & Site", generate: exportParkingBaysDXF },
  { id: "vehicle", name: "Standard Sedan", category: "Landscaping & Site", generate: exportVehicleDXF },
  { id: "light-fixture", name: "Ceiling Troffer Light (1200x600)", category: "Electrical & Mechanical", generate: exportLightFixtureDXF },
  { id: "socket-switch", name: "Double Wall Socket", category: "Electrical & Mechanical", generate: exportSocketSwitchDXF },
  { id: "distribution-board", name: "Distribution Board (DB)", category: "Electrical & Mechanical", generate: exportDistributionBoardDXF },
  { id: "hvac-vent", name: "HVAC Supply Diffuser", category: "Electrical & Mechanical", generate: exportHVACVentDXF },
];

type AssetType = { id: string; name: string; category: string; generate: () => string };

export default function AssetLibrary() {
  const [search, setSearch] = React.useState("");
  const [selectedAsset, setSelectedAsset] = React.useState<AssetType | null>(null);

  const filteredAssets = ASSETS.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  const groupedAssets = filteredAssets.reduce((acc, asset) => {
    if (!acc[asset.category]) acc[asset.category] = [];
    acc[asset.category].push(asset);
    return acc;
  }, {} as Record<string, AssetType[]>);

  const handleExport = (asset: AssetType) => {
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

        <div className="space-y-12">
          {Object.entries(groupedAssets).map(([category, assets]) => (
            <div key={category}>
              <h2 className="text-xl font-semibold text-slate-200 mb-6 border-b border-slate-800 pb-2">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assets.map(asset => {
                  const dxfString = asset.generate();
                  return (
                    <div 
                      key={asset.id} 
                      onClick={() => setSelectedAsset(asset)}
                      className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden flex flex-col group hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-900/20 cursor-pointer transition-all"
                    >
                      <div className="h-48 bg-slate-950 p-0 relative flex items-center justify-center pointer-events-none">
                        <DXFPreview dxfString={dxfString} staticMode={true} />
                      </div>
                      <div className="p-4 border-t border-slate-800 bg-slate-900">
                        <h3 className="font-medium text-slate-200 group-hover:text-blue-400 transition-colors">{asset.name}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        {filteredAssets.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            No assets found matching &quot;{search}&quot;.
          </div>
        )}
      </div>

      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white">{selectedAsset.name}</h2>
                <p className="text-sm text-slate-400">{selectedAsset.category}</p>
              </div>
              <button 
                onClick={() => setSelectedAsset(null)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 min-h-[500px] relative bg-slate-950">
              <DXFPreview dxfString={selectedAsset.generate()} staticMode={false} />
            </div>
            
            <div className="p-4 border-t border-slate-800 flex justify-end gap-3 bg-slate-900 rounded-b-xl">
              <button 
                onClick={() => setSelectedAsset(null)}
                className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-md transition"
              >
                Close
              </button>
              <button 
                onClick={() => handleExport(selectedAsset)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md font-medium flex items-center gap-2 transition shadow-lg shadow-blue-900/50"
              >
                <Download className="w-4 h-4" />
                Download DXF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
