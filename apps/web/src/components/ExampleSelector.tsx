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
    <div className="bg-slate-900 rounded border border-slate-800 p-4 mb-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2 text-slate-300 font-medium">
        <Sparkles className="w-5 h-5 text-emerald-500" />
        <span>Predefined Examples</span>
      </div>
      <div className="flex gap-2 flex-wrap justify-end">
        {examples.map((example, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(example.data)}
            className="px-3 py-1.5 text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
          >
            {example.name}
          </button>
        ))}
      </div>
    </div>
  );
}
