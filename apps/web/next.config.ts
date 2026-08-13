import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@rdcad-express/core-math", "@rdcad-express/dwg-schemas"],
};

export default nextConfig;
