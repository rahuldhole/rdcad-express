"use client";

import React, { useState, useMemo } from "react";
import { Plus, Trash2, Download, Table2 } from "lucide-react";
import { calculateTotalWeight } from "@rdcad-express/core-math";
import type { RebarElement } from "@rdcad-express/dwg-schemas";

export default function BBSGenerator() {
  const [rows, setRows] = useState<RebarElement[]>([
    {
      elementMark: "B1",
      shapeCode: "20",
      diameter: 16,
      numberOfMembers: 1,
      barsPerMember: 4,
      cuttingLength: 5.2,
      totalWeight: 0,
    },
  ]);

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        elementMark: `B${rows.length + 1}`,
        shapeCode: "20",
        diameter: 12,
        numberOfMembers: 1,
        barsPerMember: 2,
        cuttingLength: 3.0,
        totalWeight: 0,
      },
    ]);
  };

  const handleRemoveRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof RebarElement, value: string | number) => {
    const newRows = [...rows];
    // @ts-expect-error Dynamic field assignment
    newRows[index][field] = value;
    setRows(newRows);
  };

  const totalTonnage = useMemo(() => {
    return rows.reduce((sum, row) => {
      const weight = calculateTotalWeight(row.diameter, row.cuttingLength, row.numberOfMembers * row.barsPerMember);
      return sum + weight;
    }, 0);
  }, [rows]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent flex items-center gap-3">
              <Table2 className="w-8 h-8 text-blue-400" />
              Bar Bending Schedule (BBS)
            </h1>
            <p className="text-slate-400 mt-2">Real-time parametric rebar weight calculations</p>
          </div>
          
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 transition rounded-lg border border-slate-700">
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button 
              onClick={handleAddRow}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 transition rounded-lg font-medium shadow-lg shadow-blue-500/20"
            >
              <Plus className="w-4 h-4" /> Add Row
            </button>
          </div>
        </header>

        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/50 text-slate-400 text-sm">
                  <th className="p-4 font-medium border-b border-slate-800">Mark</th>
                  <th className="p-4 font-medium border-b border-slate-800">Shape</th>
                  <th className="p-4 font-medium border-b border-slate-800">Dia (mm)</th>
                  <th className="p-4 font-medium border-b border-slate-800">Members</th>
                  <th className="p-4 font-medium border-b border-slate-800">Bars/Mem</th>
                  <th className="p-4 font-medium border-b border-slate-800">Length (m)</th>
                  <th className="p-4 font-medium border-b border-slate-800 text-right">Weight (kg)</th>
                  <th className="p-4 font-medium border-b border-slate-800 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {rows.map((row, idx) => {
                  const calculatedWeight = calculateTotalWeight(row.diameter, row.cuttingLength, row.numberOfMembers * row.barsPerMember);
                  return (
                    <tr key={idx} className="hover:bg-slate-800/20 transition-colors group">
                      <td className="p-3">
                        <input 
                          type="text" 
                          value={row.elementMark} 
                          onChange={(e) => handleChange(idx, "elementMark", e.target.value)}
                          className="w-full bg-slate-950/50 border border-slate-700 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none transition"
                        />
                      </td>
                      <td className="p-3">
                        <input 
                          type="text" 
                          value={row.shapeCode} 
                          onChange={(e) => handleChange(idx, "shapeCode", e.target.value)}
                          className="w-20 bg-slate-950/50 border border-slate-700 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none transition"
                        />
                      </td>
                      <td className="p-3">
                        <input 
                          type="number" 
                          value={row.diameter} 
                          onChange={(e) => handleChange(idx, "diameter", parseFloat(e.target.value) || 0)}
                          className="w-24 bg-slate-950/50 border border-slate-700 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none transition"
                        />
                      </td>
                      <td className="p-3">
                        <input 
                          type="number" 
                          value={row.numberOfMembers} 
                          onChange={(e) => handleChange(idx, "numberOfMembers", parseFloat(e.target.value) || 0)}
                          className="w-24 bg-slate-950/50 border border-slate-700 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none transition"
                        />
                      </td>
                      <td className="p-3">
                        <input 
                          type="number" 
                          value={row.barsPerMember} 
                          onChange={(e) => handleChange(idx, "barsPerMember", parseFloat(e.target.value) || 0)}
                          className="w-24 bg-slate-950/50 border border-slate-700 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none transition"
                        />
                      </td>
                      <td className="p-3">
                        <input 
                          type="number" 
                          value={row.cuttingLength} 
                          onChange={(e) => handleChange(idx, "cuttingLength", parseFloat(e.target.value) || 0)}
                          className="w-24 bg-slate-950/50 border border-slate-700 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none transition"
                        />
                      </td>
                      <td className="p-3 text-right font-mono text-emerald-400">
                        {calculatedWeight.toFixed(2)}
                      </td>
                      <td className="p-3 text-center">
                        <button 
                          onClick={() => handleRemoveRow(idx)}
                          className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded transition opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          
          <div className="bg-slate-950/80 p-6 border-t border-slate-800 flex justify-between items-center">
            <div className="text-slate-400 text-sm">
              * Weight calculation is based on standard formula (D²/162.2) × L × Qty.
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-400">Total Steel Tonnage:</span>
              <span className="text-3xl font-bold text-emerald-400 tracking-tight">
                {(totalTonnage / 1000).toFixed(3)} <span className="text-xl text-emerald-500/50">MT</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
