import type { BeamScheduleRow, ColumnScheduleRow } from '@rdcad-express/dwg-schemas';
export declare function exportBeamSectionToDXF(data: BeamScheduleRow): string;
export declare function exportColumnSectionToDXF(data: ColumnScheduleRow): string;
export declare function exportTextNodesToDXF(nodes: {
    id: string;
    text: string;
    x: number;
    y: number;
}[]): string;
