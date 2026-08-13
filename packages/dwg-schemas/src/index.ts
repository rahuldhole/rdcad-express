export interface RebarElement {
  elementMark: string;
  shapeCode: string;
  diameter: number;
  numberOfMembers: number;
  barsPerMember: number;
  cuttingLength: number;
  totalWeight: number;
}

export interface BeamScheduleRow {
  elementId: string;
  width: number;
  depth: number;
  bottomBarDia: number;
  bottomBarCount: number;
  topExtraLeft: number;
  topExtraRight: number;
  stirrupDia: number;
  stirrupSpacing: number;
}

export interface ColumnScheduleRow {
  columnId: string;
  level: string;
  concreteGrade: string;
  mainBarCount: number;
  mainBarDia: number;
  tieDia: number;
  tieSpacing: number;
}
