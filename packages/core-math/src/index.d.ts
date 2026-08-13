/**
 * Calculates the weight of a single rebar in kg/m based on its diameter.
 * Formula: D^2 / 162.2
 *
 * @param diameter Diameter of the rebar in mm
 * @returns Weight in kg/m
 */
export declare function getUnitWeight(diameter: number): number;
/**
 * Calculates the total weight of rebar elements in a group.
 *
 * @param diameter Diameter of the rebar in mm
 * @param length Length of one bar in meters
 * @param quantity Total number of bars
 * @returns Total weight in kg
 */
export declare function calculateTotalWeight(diameter: number, length: number, quantity: number): number;
/**
 * Hook and bend allowance rules.
 */
export declare const BendRules: {
    /** 90 degree bend deduction (2 * D) */
    deduction90: (diameter: number) => number;
    /** 135 degree stirrup hook allowance (10 * D) */
    allowance135: (diameter: number) => number;
};
/**
 * Stirrup count calculator
 *
 * @param clearSpan Clear span in mm
 * @param spacing Spacing in mm
 * @returns Number of stirrups
 */
export declare function calculateStirrupCount(clearSpan: number, spacing: number): number;
//# sourceMappingURL=index.d.ts.map