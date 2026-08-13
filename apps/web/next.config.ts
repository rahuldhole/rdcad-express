import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  transpilePackages: ["@rdcad-express/core-math", "@rdcad-express/dwg-schemas", "@rdcad-express/dxf-exporter"],
  serverExternalPackages: ["canvas", "konva"]
};

export default nextConfig;
