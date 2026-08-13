import { describe, it, expect } from "vitest";
import { exportBeamSectionToDXF, exportSlabSectionToDXF, exportStairsSectionToDXF, exportDoorDXF, exportWindowDXF, exportNorthSymbolDXF, exportTemplateToDXF } from "./index";
import DxfParser from "dxf-parser";
import fs from "fs";
import path from "path";

// Ensure tmp directory exists
const tmpDir = path.resolve(__dirname, "../../../tmp");
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
}

describe("dxf-exporter tests", () => {
  it("should generate a valid DXF string for a beam section and parse without errors", () => {
    const dxfString = exportBeamSectionToDXF({
      elementId: "B1",
      width: 300,
      depth: 600,
      bottomBarCount: 3,
      bottomBarDia: 16,
      topExtraLeft: 2,
      topExtraRight: 2,
      stirrupDia: 8,
      stirrupSpacing: 150
    });

    // Write to tmp dir for manual inspection
    const filePath = path.join(tmpDir, "test-beam-output.dxf");
    fs.writeFileSync(filePath, dxfString);

    // Basic structure assertions
    expect(dxfString).toContain("SECTION");
    expect(dxfString).toContain("ENTITIES");
    expect(dxfString).toContain("$EXTMIN");
    expect(dxfString).toContain("$EXTMAX");
    expect(dxfString).toContain("EOF");

    // Ensure parser runs completely without throwing (e.g. valid structure, valid tables)
    const parser = new DxfParser();
    let parsedDxf: any = null;
    expect(() => {
      parsedDxf = parser.parseSync(dxfString);
    }).not.toThrow();
    
    // Ensure the parser populated extents from our fix
    expect(parsedDxf).toBeDefined();
    expect(parsedDxf?.header['$EXTMIN']).toBeDefined();
    expect(parsedDxf?.header['$EXTMAX']).toBeDefined();
  });

  it("should generate a valid DXF string for a slab section and parse without errors", () => {
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

    // Write to tmp dir for manual inspection
    const filePath = path.join(tmpDir, "test-slab-output.dxf");
    fs.writeFileSync(filePath, dxfString);

    const parser = new DxfParser();
    expect(() => {
      parser.parseSync(dxfString);
    }).not.toThrow();
  });
  it("should generate a valid DXF string for a stair section and parse without errors", () => {
    const dxfString = exportStairsSectionToDXF({
      stairId: "ST1",
      tread: 250,
      rise: 150,
      numberOfSteps: 10,
      waistSlabThickness: 150,
      mainBarDia: 12,
      mainBarSpacing: 150,
      distBarDia: 8,
      distBarSpacing: 200,
    });

    // Write to tmp dir for manual inspection
    const filePath = path.join(tmpDir, "test-stairs-output.dxf");
    fs.writeFileSync(filePath, dxfString);

    const parser = new DxfParser();
    expect(() => {
      parser.parseSync(dxfString);
    }).not.toThrow();
  });

  it("should generate valid DXF strings for starter assets", () => {
    const doorDXF = exportDoorDXF();
    const windowDXF = exportWindowDXF();
    const northDXF = exportNorthSymbolDXF();

    const parser = new DxfParser();
    expect(() => parser.parseSync(doorDXF)).not.toThrow();
    expect(() => parser.parseSync(windowDXF)).not.toThrow();
    expect(() => parser.parseSync(northDXF)).not.toThrow();
  });

  it("should generate a valid DXF string for a title block template", () => {
    const dxfString = exportTemplateToDXF({
      sheetSize: 'A1',
      projectName: 'Test Project',
      clientName: 'Test Client',
      date: '2026-01-01',
      drawnBy: 'Engineer',
      drawingTitle: 'Test Drawing'
    });

    const filePath = path.join(tmpDir, "test-template-output.dxf");
    fs.writeFileSync(filePath, dxfString);

    const parser = new DxfParser();
    expect(() => {
      parser.parseSync(dxfString);
    }).not.toThrow();
  });
});
