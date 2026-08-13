"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RefreshCw, ZoomIn, ZoomOut, Maximize } from "lucide-react";

interface DXFPreviewProps {
  dxfString: string;
}

export default function DXFPreview({ dxfString }: DXFPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const viewerRef = useRef<any>(null);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    let isMounted = true;

    // Use dynamic import for dxf-viewer to avoid SSR issues
    const initViewer = async () => {
      try {
        if (!viewerRef.current) {
          const { DxfViewer } = await import("dxf-viewer");
          // Initialize viewer with clear color matching slate-900
          viewerRef.current = new DxfViewer(containerRef.current as HTMLElement, {
            clearColor: new THREE.Color("#0f172a"),
            autoResize: true,
          });
        }

        if (dxfString && isMounted) {
          setError(null);
          const blob = new Blob([dxfString], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          try {
            // Wait for load to finish
            await viewerRef.current.Load({ url });
          } finally {
            URL.revokeObjectURL(url);
          }
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Error rendering DXF:", err);
        if (isMounted) setError(err.message || "Failed to render DXF");
      }
    };

    initViewer();

    return () => {
      isMounted = false;
      // Ideally we would dispose the viewer if it supports it, 
      // but dxf-viewer can just be overwritten or garbage collected if canvas is removed.
    };
  }, [dxfString]);

  const handleZoom = (factor: number) => {
    if (!viewerRef.current) return;
    const camera = viewerRef.current.GetCamera();
    if (camera) {
      camera.zoom *= factor;
      camera.updateProjectionMatrix();
      viewerRef.current.Render();
    }
  };

  const handleFit = () => {
    if (!viewerRef.current) return;
    const bounds = viewerRef.current.GetBounds();
    if (bounds) {
      // Use 1.2 padding which is equivalent to 20% margin
      viewerRef.current.FitView(bounds.minX, bounds.maxX, bounds.minY, bounds.maxY, 1.2);
      viewerRef.current.Render();
    }
  };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden" style={{ minHeight: "500px" }}>
      <div className="flex items-center gap-2 p-2 border-b border-slate-800 bg-slate-950/80 z-10 relative shadow-sm">
        <button onClick={handleFit} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors" title="Reset View">
          <RefreshCw className="w-4 h-4" />
        </button>
        <button onClick={() => handleZoom(1.2)} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors" title="Zoom In">
          <ZoomIn className="w-4 h-4" />
        </button>
        <button onClick={() => handleZoom(0.8)} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors" title="Zoom Out">
          <ZoomOut className="w-4 h-4" />
        </button>
        <button onClick={handleFit} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors ml-auto" title="Fit to Screen">
          <Maximize className="w-4 h-4" />
        </button>
      </div>
      <div ref={containerRef} className="flex-1 relative w-full" />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 text-red-500 z-10 font-medium p-4 text-center">
          Render Error: {error}
        </div>
      )}
    </div>
  );
}
