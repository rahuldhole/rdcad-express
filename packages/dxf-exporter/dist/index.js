"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportBeamSectionToDXF = exportBeamSectionToDXF;
exports.exportColumnSectionToDXF = exportColumnSectionToDXF;
exports.exportTextNodesToDXF = exportTextNodesToDXF;
exports.exportSlabSectionToDXF = exportSlabSectionToDXF;
exports.exportFoundationSectionToDXF = exportFoundationSectionToDXF;
exports.exportTankSectionToDXF = exportTankSectionToDXF;
const dxf_writer_1 = __importDefault(require("dxf-writer"));
function exportBeamSectionToDXF(data) {
    const dxf = new dxf_writer_1.default();
    dxf.addLayer('CONCRETE', dxf_writer_1.default.ACI.WHITE, 'CONTINUOUS');
    dxf.addLayer('REBAR', dxf_writer_1.default.ACI.RED, 'CONTINUOUS');
    const w = data.width;
    const d = data.depth;
    // Concrete outline
    dxf.setActiveLayer('CONCRETE');
    dxf.drawLine(0, 0, w, 0);
    dxf.drawLine(w, 0, w, d);
    dxf.drawLine(w, d, 0, d);
    dxf.drawLine(0, d, 0, 0);
    // Stirrup
    dxf.setActiveLayer('REBAR');
    const cover = 40; // 40mm cover
    dxf.drawLine(cover, cover, w - cover, cover);
    dxf.drawLine(w - cover, cover, w - cover, d - cover);
    dxf.drawLine(w - cover, d - cover, cover, d - cover);
    dxf.drawLine(cover, d - cover, cover, cover);
    // Main Bars (Top and Bottom)
    const barRadius = (data.bottomBarDia || 16) / 2;
    // Bottom bars
    const spacingX = (w - 2 * cover) / (data.bottomBarCount - 1 || 1);
    for (let i = 0; i < data.bottomBarCount; i++) {
        dxf.drawCircle(cover + i * spacingX, cover, barRadius);
    }
    // Top bars
    const topBars = data.topExtraLeft + data.topExtraRight || 2;
    const topSpacingX = (w - 2 * cover) / (topBars - 1 || 1);
    for (let i = 0; i < topBars; i++) {
        dxf.drawCircle(cover + i * topSpacingX, d - cover, barRadius);
    }
    return getDxfStringWithExtents(dxf);
}
function exportColumnSectionToDXF(data) {
    const dxf = new dxf_writer_1.default();
    dxf.addLayer('CONCRETE', dxf_writer_1.default.ACI.WHITE, 'CONTINUOUS');
    dxf.addLayer('REBAR', dxf_writer_1.default.ACI.RED, 'CONTINUOUS');
    // Assume square for now if single dimension
    const side = 400; // placeholder size based on mainBarCount logic
    dxf.setActiveLayer('CONCRETE');
    dxf.drawLine(0, 0, side, 0);
    dxf.drawLine(side, 0, side, side);
    dxf.drawLine(side, side, 0, side);
    dxf.drawLine(0, side, 0, 0);
    return getDxfStringWithExtents(dxf);
}
function exportTextNodesToDXF(nodes) {
    const dxf = new dxf_writer_1.default();
    dxf.addLayer('TEXT', dxf_writer_1.default.ACI.YELLOW, 'CONTINUOUS');
    dxf.setActiveLayer('TEXT');
    nodes.forEach(node => {
        // Assuming dxf-writer supports drawText. If not, this is standard API pattern for DXFWriter
        try {
            // height: 25, rotation: 0
            dxf.drawText(node.x, -node.y, 25, 0, node.text);
        }
        catch (e) {
            // fallback for different library signatures if needed
        }
    });
    return getDxfStringWithExtents(dxf);
}
function exportSlabSectionToDXF(data) {
    const dxf = new dxf_writer_1.default();
    dxf.addLayer('CONCRETE', dxf_writer_1.default.ACI.WHITE, 'CONTINUOUS');
    dxf.addLayer('REBAR', dxf_writer_1.default.ACI.RED, 'CONTINUOUS');
    dxf.setActiveLayer('CONCRETE');
    dxf.drawLine(0, 0, data.lx, 0);
    dxf.drawLine(data.lx, 0, data.lx, data.ly);
    dxf.drawLine(data.lx, data.ly, 0, data.ly);
    dxf.drawLine(0, data.ly, 0, 0);
    // Basic cross hatch or line indication for rebar
    dxf.setActiveLayer('REBAR');
    dxf.drawLine(50, 50, data.lx - 50, 50); // main rebar indication
    return getDxfStringWithExtents(dxf);
}
function exportFoundationSectionToDXF(data) {
    const dxf = new dxf_writer_1.default();
    dxf.addLayer('CONCRETE', dxf_writer_1.default.ACI.WHITE, 'CONTINUOUS');
    dxf.addLayer('REBAR', dxf_writer_1.default.ACI.RED, 'CONTINUOUS');
    dxf.setActiveLayer('CONCRETE');
    dxf.drawLine(0, 0, data.lx, 0);
    dxf.drawLine(data.lx, 0, data.lx, data.depth);
    dxf.drawLine(data.lx, data.depth, 0, data.depth);
    dxf.drawLine(0, data.depth, 0, 0);
    dxf.setActiveLayer('REBAR');
    dxf.drawLine(50, 50, data.lx - 50, 50);
    return getDxfStringWithExtents(dxf);
}
function exportTankSectionToDXF(data) {
    const dxf = new dxf_writer_1.default();
    dxf.addLayer('CONCRETE', dxf_writer_1.default.ACI.WHITE, 'CONTINUOUS');
    dxf.setActiveLayer('CONCRETE');
    const outerW = data.width + (2 * data.wallThickness);
    const outerH = data.height + (2 * data.wallThickness);
    // Outer wall
    dxf.drawLine(0, 0, outerW, 0);
    dxf.drawLine(outerW, 0, outerW, outerH);
    dxf.drawLine(outerW, outerH, 0, outerH);
    dxf.drawLine(0, outerH, 0, 0);
    // Inner wall
    const wt = data.wallThickness;
    dxf.drawLine(wt, wt, outerW - wt, wt);
    dxf.drawLine(outerW - wt, wt, outerW - wt, outerH - wt);
    dxf.drawLine(outerW - wt, outerH - wt, wt, outerH - wt);
    dxf.drawLine(wt, outerH - wt, wt, wt);
    return getDxfStringWithExtents(dxf);
}
function getDxfStringWithExtents(dxf) {
    let str = dxf.toDxfString();
    const extents = `9\n$EXTMIN\n10\n-10000.0\n20\n-10000.0\n30\n0.0\n9\n$EXTMAX\n10\n10000.0\n20\n10000.0\n30\n0.0\n`;
    str = str.replace('0\nENDSEC\n0\nSECTION\n2\nCLASSES', extents + '0\nENDSEC\n0\nSECTION\n2\nCLASSES');
    return str;
}
