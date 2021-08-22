import { getRatio } from "./ratio";
import type { Ratio, RepeatingDecimal } from "../types";

/**
 * Produces a ratio from repeating decimal object.
 */
export function getRatioFromRepeatingDecimal({ sign = 1, int = 0, nonrepeat = "", repeat }: RepeatingDecimal): Ratio | null {
	const integralPart = Number(int);
	const nonperiod = String(nonrepeat) || "";
	const period = String(repeat);

	const denominator = Number(`${"9".repeat(period.length)}${"0".repeat(nonperiod.length)}`); 
	const numerator =  Number(`${nonperiod}${repeat}`) - Number(nonperiod);

	return getRatio(
		sign * (integralPart * denominator + numerator),
		denominator
	);
}