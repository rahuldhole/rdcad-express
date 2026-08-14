import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const HTML_ROUTES = [
  "/", "/bbs", "/beam", "/column", "/setup", "/foundation", 
  "/library", "/project", "/slab", "/stairs", "/tank", "/templates", "/utilities"
];

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
});

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  transpilePackages: ["@rdcad-express/core-math", "@rdcad-express/dwg-schemas", "@rdcad-express/dxf-exporter"],
  serverExternalPackages: ["canvas", "konva"]
};

export default withSerwist(nextConfig);
