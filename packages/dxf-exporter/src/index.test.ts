import { describe, it, expect } from "vitest";
import { exportBeamSectionToDXF, exportSlabSectionToDXF } from "./index";

describe("dxf-exporter tests", () => {
  it("should generate a valid DXF string for a beam section", () => {
    const dxfString = exportBeamSectionToDXF({
      beamId: "B1",
      width: 300,
      depth: 600,
      bottomBarCount: 3,
      bottomBarDia: 16,
      topExtraLeft: 2,
      topExtraRight: 2,
      stirrupDia: 8,
      stirrupSpacing: 150
    });

    // Check basic DXF structures
    expect(dxfString).toContain("SECTION");
    expect(dxfString).toContain("ENTITIES");
    expect(dxfString).toContain("EOF");

    // Check custom layers are created
    expect(dxfString).toContain("CONCRETE");
    expect(dxfString).toContain("REBAR");
  });

  it("should generate a valid DXF string for a slab section", () => {
    const dxfString = exportSlabSectionToDXF({
      slabId: "S1",
      lx: 4000,
      ly: 5000,
      depth: 150,
      mainBarDia: 10,
      mainBarSpacing: 150,
      distBarDia: 8,
      distBarSpacing: 200
    });

    expect(dxfString).toContain("CONCRETE");
    expect(dxfString).toContain("REBAR");
    expect(dxfString).toContain("EOF");
  });
});
