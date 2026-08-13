/**
 * Calculates the weight of a single rebar in kg/m based on its diameter.
 * Formula: D^2 / 162.2
 * 
 * @param diameter Diameter of the rebar in mm
 * @returns Weight in kg/m
 */
export function getUnitWeight(diameter: number): number {
  return Math.pow(diameter, 2) / 162.2;
}

/**
 * Calculates the total weight of rebar elements in a group.
 * 
 * @param diameter Diameter of the rebar in mm
 * @param length Length of one bar in meters
 * @param quantity Total number of bars
 * @returns Total weight in kg
 */
export function calculateTotalWeight(diameter: number, length: number, quantity: number): number {
  const unitWeight = getUnitWeight(diameter);
  return unitWeight * length * quantity;
}

/**
 * Hook and bend allowance rules.
 */
export const BendRules = {
  /** 90 degree bend deduction (2 * D) */
  deduction90: (diameter: number) => 2 * diameter,
  
  /** 135 degree stirrup hook allowance (10 * D) */
  allowance135: (diameter: number) => 10 * diameter,
};

/**
 * Stirrup count calculator
 * 
 * @param clearSpan Clear span in mm
 * @param spacing Spacing in mm
 * @returns Number of stirrups
 */
export function calculateStirrupCount(clearSpan: number, spacing: number): number {
  return Math.floor(clearSpan / spacing) + 1;
}
