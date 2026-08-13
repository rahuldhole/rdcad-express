"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const index_1 = require("./index");
const dxf_parser_1 = __importDefault(require("dxf-parser"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Ensure tmp directory exists
const tmpDir = path_1.default.resolve(__dirname, "../../../tmp");
if (!fs_1.default.existsSync(tmpDir)) {
    fs_1.default.mkdirSync(tmpDir, { recursive: true });
}
(0, vitest_1.describe)("dxf-exporter tests", () => {
    (0, vitest_1.it)("should generate a valid DXF string for a beam section and parse without errors", () => {
        const dxfString = (0, index_1.exportBeamSectionToDXF)({
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
        const filePath = path_1.default.join(tmpDir, "test-beam-output.dxf");
        fs_1.default.writeFileSync(filePath, dxfString);
        // Basic structure assertions
        (0, vitest_1.expect)(dxfString).toContain("SECTION");
        (0, vitest_1.expect)(dxfString).toContain("ENTITIES");
        (0, vitest_1.expect)(dxfString).toContain("$EXTMIN");
        (0, vitest_1.expect)(dxfString).toContain("$EXTMAX");
        (0, vitest_1.expect)(dxfString).toContain("EOF");
        // Ensure parser runs completely without throwing (e.g. valid structure, valid tables)
        const parser = new dxf_parser_1.default();
        let parsedDxf = null;
        (0, vitest_1.expect)(() => {
            parsedDxf = parser.parseSync(dxfString);
        }).not.toThrow();
        // Ensure the parser populated extents from our fix
        (0, vitest_1.expect)(parsedDxf.header['$EXTMIN']).toBeDefined();
        (0, vitest_1.expect)(parsedDxf.header['$EXTMAX']).toBeDefined();
    });
    (0, vitest_1.it)("should generate a valid DXF string for a slab section and parse without errors", () => {
        const dxfString = (0, index_1.exportSlabSectionToDXF)({
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
        const filePath = path_1.default.join(tmpDir, "test-slab-output.dxf");
        fs_1.default.writeFileSync(filePath, dxfString);
        const parser = new dxf_parser_1.default();
        (0, vitest_1.expect)(() => {
            parser.parseSync(dxfString);
        }).not.toThrow();
    });
});
