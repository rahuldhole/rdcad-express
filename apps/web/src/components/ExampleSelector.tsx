import React from "react";
import { Sparkles } from "lucide-react";

export interface Example<T> {
  name: string;
  data: T;
}

interface ExampleSelectorProps<T> {
  examples: Example<T>[];
  onSelect: (data: T) => void;
}

export default function ExampleSelector<T>({ examples, onSelect }: ExampleSelectorProps<T>) {
  return (
    <div className="flex items-center gap-2">
      <Sparkles className="w-4 h-4 text-emerald-500" />
      <select
        className="bg-slate-950 border border-slate-700 text-slate-300 rounded px-2 py-1 text-sm focus:border-emerald-500 outline-none w-40"
        onChange={(e) => {
          if (e.target.value === "") return;
          const idx = parseInt(e.target.value, 10);
          onSelect(examples[idx].data);
          e.target.value = ""; // reset back
        }}
        defaultValue=""
      >
        <option value="" disabled>Examples...</option>
        {examples.map((example, idx) => (
          <option key={idx} value={idx}>
            {example.name}
          </option>
        ))}
      </select>
    </div>
  );
}
