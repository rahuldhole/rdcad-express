"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const index_1 = require("./index");
(0, vitest_1.describe)("dxf-exporter tests", () => {
    (0, vitest_1.it)("should generate a valid DXF string for a beam section", () => {
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
        // Check basic DXF structures
        (0, vitest_1.expect)(dxfString).toContain("SECTION");
        (0, vitest_1.expect)(dxfString).toContain("ENTITIES");
        (0, vitest_1.expect)(dxfString).toContain("EOF");
        // Check custom layers are created
        (0, vitest_1.expect)(dxfString).toContain("CONCRETE");
        (0, vitest_1.expect)(dxfString).toContain("REBAR");
    });
    (0, vitest_1.it)("should generate a valid DXF string for a slab section", () => {
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
        (0, vitest_1.expect)(dxfString).toContain("CONCRETE");
        (0, vitest_1.expect)(dxfString).toContain("REBAR");
        (0, vitest_1.expect)(dxfString).toContain("EOF");
    });
});
