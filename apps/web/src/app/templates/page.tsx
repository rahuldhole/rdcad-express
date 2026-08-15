"use client";

import React from "react";
import { Download } from "lucide-react";
import { exportTemplateToDXF } from "@rdcad-express/dxf-exporter";
import { useAppStore } from "@/store/useStore";
import DXFPreview from "@/components/DXFPreview";

export default function TemplatesDetailing() {
 const templateData = useAppStore(state => state.templateData);
 const setTemplateData = useAppStore(state => state.setTemplateData);
 const dxfString = React.useMemo(() => exportTemplateToDXF(templateData), [templateData]);

 const handleExport = () => {
 const blob = new Blob([dxfString], { type: "text/plain" });
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download = `${templateData.projectName.replace(/\s+/g, "_")}-TitleBlock.dxf`;
 a.click();
 URL.revokeObjectURL(url);
 };

 return (
 <div className="p-8">
 <div className="max-w-7xl mx-auto space-y-8">
 <header className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 pb-6 border-b border-border">
 <div>
 <h1 className="text-3xl font-bold text-foreground">Drawing Templates</h1>
 <p className="text-muted-foreground mt-2">Generate standard title blocks and sheet borders</p>
 </div>
 <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded font-medium transition shadow-lg shadow-emerald-500/20">
 <Download className="w-4 h-4" /> Export DXF
 </button>
 </header>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="bg-card rounded border border-border p-6 space-y-4">
 <h3 className="text-xl font-bold border-b border-border pb-2">Properties</h3>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm text-muted-foreground mb-1">Sheet Size</label>
 <select 
 value={templateData.sheetSize} 
 onChange={e => setTemplateData({...templateData, sheetSize: e.target.value as 'A1' | 'A2' | 'A3'})} 
 className="w-full bg-background border border-border rounded p-2 text-sm focus:border-blue-500"
 >
 <option value="A1">A1 (841 x 594)</option>
 <option value="A2">A2 (594 x 420)</option>
 <option value="A3">A3 (420 x 297)</option>
 </select>
 </div>
 <div />
 <div>
 <label className="block text-sm text-muted-foreground mb-1">Project Name</label>
 <input type="text" value={templateData.projectName} onChange={e => setTemplateData({...templateData, projectName: e.target.value})} className="w-full bg-background border border-border rounded p-2 text-sm focus:border-blue-500" />
 </div>
 <div>
 <label className="block text-sm text-muted-foreground mb-1">Client Name</label>
 <input type="text" value={templateData.clientName} onChange={e => setTemplateData({...templateData, clientName: e.target.value})} className="w-full bg-background border border-border rounded p-2 text-sm focus:border-blue-500" />
 </div>
 <div>
 <label className="block text-sm text-muted-foreground mb-1">Drawing Title</label>
 <input type="text" value={templateData.drawingTitle} onChange={e => setTemplateData({...templateData, drawingTitle: e.target.value})} className="w-full bg-background border border-border rounded p-2 text-sm focus:border-blue-500" />
 </div>
 <div>
 <label className="block text-sm text-muted-foreground mb-1">Drawn By</label>
 <input type="text" value={templateData.drawnBy} onChange={e => setTemplateData({...templateData, drawnBy: e.target.value})} className="w-full bg-background border border-border rounded p-2 text-sm focus:border-blue-500" />
 </div>
 <div>
 <label className="block text-sm text-muted-foreground mb-1">Date</label>
 <input type="date" value={templateData.date} onChange={e => setTemplateData({...templateData, date: e.target.value})} className="w-full bg-background border border-border rounded p-2 text-sm focus:border-blue-500" />
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
