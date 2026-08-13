import DXFWriter from 'dxf-writer';
import type { BeamScheduleRow, ColumnScheduleRow } from '@rdcad-express/dwg-schemas';

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
