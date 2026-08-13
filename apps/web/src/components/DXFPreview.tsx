"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface DXFPreviewProps {
  dxfString: string;
}

export default function DXFPreview({ dxfString }: DXFPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const viewerRef = useRef<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current || typeof window === "undefined") return;

    let isMounted = true;

    // Use dynamic import for dxf-viewer to avoid SSR issues
    const initViewer = async () => {
      try {
        if (!viewerRef.current) {
          const { DxfViewer } = await import("dxf-viewer");
          // Initialize viewer with clear color matching slate-900
          viewerRef.current = new DxfViewer(canvasRef.current as HTMLCanvasElement, {
            clearColor: new THREE.Color("#0f172a"),
            autoResize: true,
          });
        }

        if (dxfString && isMounted) {
          setError(null);
          // Wait for load to finish
          await viewerRef.current.Load(dxfString);
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

  return (
    <div ref={containerRef} className="w-full h-full relative" style={{ minHeight: "500px" }}>
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 text-red-500 z-10 font-medium p-4 text-center">
          Render Error: {error}
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        style={{ width: "100%", height: "100%", display: "block" }} 
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}
