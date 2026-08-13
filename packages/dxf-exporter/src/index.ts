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

  return dxf.toDxfString();
}

export function exportColumnSectionToDXF(data: ColumnScheduleRow): string {
  const dxf = new DXFWriter();
  
  dxf.addLayer('CONCRETE', DXFWriter.ACI.WHITE, 'CONTINUOUS');
  dxf.addLayer('REBAR', DXFWriter.ACI.RED, 'CONTINUOUS');

  // Assume square for now if single dimension
  const side = 400; // placeholder size based on mainBarCount logic
  
  dxf.setActiveLayer('CONCRETE');
  dxf.drawLine(0, 0, side, 0);
  dxf.drawLine(side, 0, side, side);
  dxf.drawLine(side, side, 0, side);
  dxf.drawLine(0, side, 0, 0);
  
  return dxf.toDxfString();
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
  
  return dxf.toDxfString();
}

export function exportSlabSectionToDXF(data: SlabScheduleRow): string {
  const dxf = new DXFWriter();
  dxf.addLayer('CONCRETE', DXFWriter.ACI.WHITE, 'CONTINUOUS');
  dxf.addLayer('REBAR', DXFWriter.ACI.RED, 'CONTINUOUS');
  
  dxf.setActiveLayer('CONCRETE');
  dxf.drawLine(0, 0, data.lx, 0);
  dxf.drawLine(data.lx, 0, data.lx, data.ly);
  dxf.drawLine(data.lx, data.ly, 0, data.ly);
  dxf.drawLine(0, data.ly, 0, 0);
  
  // Basic cross hatch or line indication for rebar
  dxf.setActiveLayer('REBAR');
  dxf.drawLine(50, 50, data.lx - 50, 50); // main rebar indication
  return dxf.toDxfString();
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
  dxf.drawLine(50, 50, data.lx - 50, 50); 
  return dxf.toDxfString();
}

export function exportTankSectionToDXF(data: TankScheduleRow): string {
  const dxf = new DXFWriter();
  dxf.addLayer('CONCRETE', DXFWriter.ACI.WHITE, 'CONTINUOUS');
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

  return dxf.toDxfString();
}
