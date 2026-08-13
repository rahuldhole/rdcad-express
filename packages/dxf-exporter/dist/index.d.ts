import type { BeamScheduleRow, ColumnScheduleRow, SlabScheduleRow, FoundationScheduleRow, TankScheduleRow, StairsScheduleRow, TitleBlockRow } from '@rdcad-express/dwg-schemas';
export declare function exportBeamSectionToDXF(data: BeamScheduleRow): string;
export declare function exportColumnSectionToDXF(data: ColumnScheduleRow): string;
export declare function exportTextNodesToDXF(nodes: {
    id: string;
    text: string;
    x: number;
    y: number;
}[]): string;
export declare function exportSlabSectionToDXF(data: SlabScheduleRow): string;
export declare function exportFoundationSectionToDXF(data: FoundationScheduleRow): string;
export declare function exportTankSectionToDXF(data: TankScheduleRow): string;
export declare function exportStairsSectionToDXF(data: StairsScheduleRow): string;
export declare function exportDoorDXF(): string;
export declare function exportWindowDXF(): string;
export declare function exportNorthSymbolDXF(): string;
export declare function exportTemplateToDXF(data: TitleBlockRow): string;
