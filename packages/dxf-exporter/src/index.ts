import DXFWriter from 'dxf-writer';
import type { BeamScheduleRow, ColumnScheduleRow, SlabScheduleRow, FoundationScheduleRow, TankScheduleRow } from '@rdcad-express/dwg-schemas';

export function exportBeamSectionToDXF(data: BeamScheduleRow): string {
  const dxf = new DXFWriter();

  dxf.addLayer('CONCRETE', DXFWriter.ACI.WHITE, 'CONTINUOUS');
  dxf.addLayer('REBAR', DXFWriter.ACI.RED, 'CONTINUOUS');

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

export function exportColumnSectionToDXF(data: ColumnScheduleRow): string {
  const dxf = new DXFWriter();
  
  dxf.addLayer('CONCRETE', DXFWriter.ACI.WHITE, 'CONTINUOUS');
  dxf.addLayer('REBAR', DXFWriter.ACI.RED, 'CONTINUOUS');

  const w = data.width || 400;
  const d = data.depth || 400;
  
  dxf.setActiveLayer('CONCRETE');
  dxf.drawLine(0, 0, w, 0);
  dxf.drawLine(w, 0, w, d);
  dxf.drawLine(w, d, 0, d);
  dxf.drawLine(0, d, 0, 0);
  
  dxf.setActiveLayer('REBAR');
  const cover = 40;
  const tw = w - 2 * cover;
  const td = d - 2 * cover;
  
  // Draw tie
  dxf.drawLine(cover, cover, cover + tw, cover);
  dxf.drawLine(cover + tw, cover, cover + tw, cover + td);
  dxf.drawLine(cover + tw, cover + td, cover, cover + td);
  dxf.drawLine(cover, cover + td, cover, cover);

  // Draw main bars
  const barRadius = (data.mainBarDia || 16) / 2;
  const count = data.mainBarCount || 4;
  const totalPerimeter = 2 * tw + 2 * td;
  const spacing = totalPerimeter / count;

  let currentDist = 0;
  for (let i = 0; i < count; i++) {
    let x = cover;
    let y = cover;
    if (currentDist <= tw) {
      x = cover + currentDist;
      y = cover;
    } else if (currentDist <= tw + td) {
      x = cover + tw;
      y = cover + (currentDist - tw);
    } else if (currentDist <= 2 * tw + td) {
      x = cover + tw - (currentDist - tw - td);
      y = cover + td;
    } else {
      x = cover;
      y = cover + td - (currentDist - 2 * tw - td);
    }
    dxf.drawCircle(x, y, barRadius);
    currentDist += spacing;
  }
  
  return getDxfStringWithExtents(dxf);
}

export function exportTextNodesToDXF(nodes: { id: string, text: string, x: number, y: number }[]): string {
  const dxf = new DXFWriter();
  
  dxf.addLayer('TEXT', DXFWriter.ACI.YELLOW, 'CONTINUOUS');
  dxf.setActiveLayer('TEXT');
  
  nodes.forEach(node => {
    // Assuming dxf-writer supports drawText. If not, this is standard API pattern for DXFWriter
    try {
      // height: 25, rotation: 0
      dxf.drawText(node.x, -node.y, 25, 0, node.text);
    } catch(e) {
       // fallback for different library signatures if needed
    }
  });
  
  return getDxfStringWithExtents(dxf);
}

export function exportSlabSectionToDXF(data: SlabScheduleRow): string {
  const dxf = new DXFWriter();
  dxf.addLayer('CONCRETE', DXFWriter.ACI.WHITE, 'CONTINUOUS');
  dxf.addLayer('REBAR', DXFWriter.ACI.RED, 'CONTINUOUS');
  
  dxf.setActiveLayer('CONCRETE');
  dxf.drawLine(0, 0, data.lx, 0);
  dxf.drawLine(data.lx, 0, data.lx, data.depth);
  dxf.drawLine(data.lx, data.depth, 0, data.depth);
  dxf.drawLine(0, data.depth, 0, 0);
  
  dxf.setActiveLayer('REBAR');
  const cover = 25;
  const lx = data.lx;
  
  // Main bar (continuous line at bottom)
  dxf.drawLine(cover, cover, lx - cover, cover);
  
  // Distribution bars (dots resting on main bar)
  const distBarRadius = (data.distBarDia || 8) / 2;
  const mainBarDia = data.mainBarDia || 10;
  const distBarY = cover + mainBarDia / 2 + distBarRadius;
  
  const numDistBars = Math.floor((lx - 2 * cover) / (data.distBarSpacing || 200)) + 1;
  const actualSpacing = (lx - 2 * cover) / (numDistBars - 1 || 1);
  
  for (let i = 0; i < numDistBars; i++) {
    dxf.drawCircle(cover + i * actualSpacing, distBarY, distBarRadius);
  }
  
  return getDxfStringWithExtents(dxf);
}

export function exportFoundationSectionToDXF(data: FoundationScheduleRow): string {
  const dxf = new DXFWriter();
  dxf.addLayer('CONCRETE', DXFWriter.ACI.WHITE, 'CONTINUOUS');
  dxf.addLayer('REBAR', DXFWriter.ACI.RED, 'CONTINUOUS');
  
  dxf.setActiveLayer('CONCRETE');
  dxf.drawLine(0, 0, data.lx, 0);
  dxf.drawLine(data.lx, 0, data.lx, data.depth);
  dxf.drawLine(data.lx, data.depth, 0, data.depth);
  dxf.drawLine(0, data.depth, 0, 0);
  
  dxf.setActiveLayer('REBAR');
  const cover = 50;
  const lx = data.lx;
  
  // Mesh X (continuous line at bottom)
  dxf.drawLine(cover, cover, lx - cover, cover);
  
  // Mesh Y (dots resting on Mesh X)
  const yBarRadius = (data.meshBarDiaY || 10) / 2;
  const xBarDia = data.meshBarDiaX || 10;
  const yBarY = cover + xBarDia / 2 + yBarRadius;
  
  const numYBars = Math.floor((lx - 2 * cover) / (data.meshBarSpacingY || 150)) + 1;
  const actualSpacing = (lx - 2 * cover) / (numYBars - 1 || 1);
  
  for (let i = 0; i < numYBars; i++) {
    dxf.drawCircle(cover + i * actualSpacing, yBarY, yBarRadius);
  }
  
  return getDxfStringWithExtents(dxf);
}

export function exportTankSectionToDXF(data: TankScheduleRow): string {
  const dxf = new DXFWriter();
  dxf.addLayer('CONCRETE', DXFWriter.ACI.WHITE, 'CONTINUOUS');
  dxf.addLayer('REBAR', DXFWriter.ACI.RED, 'CONTINUOUS');
  
  dxf.setActiveLayer('CONCRETE');
  
  const outerW = data.width + (2 * data.wallThickness);
  const outerH = data.height + data.wallThickness; // height is internal height, base slab is wallThickness
  const wt = data.wallThickness;
  
  // Outer wall
  dxf.drawLine(0, 0, outerW, 0);
  dxf.drawLine(outerW, 0, outerW, outerH);
  dxf.drawLine(outerW, outerH, outerW - wt, outerH); // right top
  
  // Inner wall (right)
  dxf.drawLine(outerW - wt, outerH, outerW - wt, wt);
  
  // Inner base
  dxf.drawLine(outerW - wt, wt, wt, wt);
  
  // Inner wall (left)
  dxf.drawLine(wt, wt, wt, outerH);
  
  // left top
  dxf.drawLine(wt, outerH, 0, outerH);
  dxf.drawLine(0, outerH, 0, 0); // left outer
  
  dxf.setActiveLayer('REBAR');
  const cover = 40;
  
  // Continuous U-shape rebar at inner face
  // Base slab bottom
  dxf.drawLine(cover, cover, outerW - cover, cover);
  // Right wall outer
  dxf.drawLine(outerW - cover, cover, outerW - cover, outerH - cover);
  // Right wall inner
  dxf.drawLine(outerW - wt + cover, outerH - cover, outerW - wt + cover, wt - cover);
  // Base slab top
  dxf.drawLine(outerW - wt + cover, wt - cover, wt - cover, wt - cover);
  // Left wall inner
  dxf.drawLine(wt - cover, wt - cover, wt - cover, outerH - cover);
  // Left wall outer
  dxf.drawLine(cover, outerH - cover, cover, cover);
  // Connect at tops (hooks)
  dxf.drawLine(outerW - cover, outerH - cover, outerW - wt + cover, outerH - cover);
  dxf.drawLine(cover, outerH - cover, wt - cover, outerH - cover);
  
  // Distribution bars (dots)
  const barRadius = (data.mainBarDia || 12) / 2;
  const spacing = data.mainBarSpacing || 150;
  
  // Base slab bottom distribution bars (full width)
  const numBaseBottomBars = Math.floor((outerW - 2 * cover) / spacing) + 1;
  const actualBaseBottomSpacing = (outerW - 2 * cover) / (numBaseBottomBars - 1 || 1);
  for (let i = 0; i < numBaseBottomBars; i++) {
    const x = cover + i * actualBaseBottomSpacing;
    dxf.drawCircle(x, cover + barRadius * 2, barRadius);
  }
  
  // Base slab top inner distribution bars
  const innerBaseW = outerW - 2 * wt;
  if (innerBaseW > 2 * cover) {
    const numBaseTopBars = Math.floor((innerBaseW - 2 * cover) / spacing) + 1;
    const actualBaseTopSpacing = (innerBaseW - 2 * cover) / (numBaseTopBars - 1 || 1);
    for (let i = 0; i < numBaseTopBars; i++) {
      const x = wt + cover + i * actualBaseTopSpacing;
      dxf.drawCircle(x, wt - cover - barRadius * 2, barRadius);
    }
  }
  
  // Outer wall distribution bars (full height from cover to outerH - cover)
  const numWallOuterBars = Math.floor((outerH - 2 * cover) / spacing) + 1;
  const actualWallOuterSpacing = (outerH - 2 * cover) / (numWallOuterBars - 1 || 1);
  for (let i = 0; i < numWallOuterBars; i++) {
    const y = cover + i * actualWallOuterSpacing;
    dxf.drawCircle(cover + barRadius * 2, y, barRadius); // left outer
    dxf.drawCircle(outerW - cover - barRadius * 2, y, barRadius); // right outer
  }
  
  // Inner wall distribution bars (from wt + cover to outerH - cover)
  const innerWallH = outerH - wt;
  if (innerWallH > 2 * cover) {
    const numWallInnerBars = Math.floor((innerWallH - 2 * cover) / spacing) + 1;
    const actualWallInnerSpacing = (innerWallH - 2 * cover) / (numWallInnerBars - 1 || 1);
    for (let i = 0; i < numWallInnerBars; i++) {
      const y = wt + cover + i * actualWallInnerSpacing;
      dxf.drawCircle(wt - cover - barRadius * 2, y, barRadius); // left inner
      dxf.drawCircle(outerW - wt + cover + barRadius * 2, y, barRadius); // right inner
    }
  }

  return getDxfStringWithExtents(dxf);
}

function getDxfStringWithExtents(dxf: any): string {
  let str = dxf.toDxfString();
  const extents = `9\n$EXTMIN\n10\n-10000.0\n20\n-10000.0\n30\n0.0\n9\n$EXTMAX\n10\n10000.0\n20\n10000.0\n30\n0.0\n`;
  str = str.replace('0\nENDSEC\n0\nSECTION\n2\nCLASSES', extents + '0\nENDSEC\n0\nSECTION\n2\nCLASSES');
  return str;
}
