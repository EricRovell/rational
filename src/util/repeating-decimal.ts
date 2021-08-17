import { getRatio } from "./ratio";
import type { Ratio, RepeatingDecimal } from "../types";

/**
 * Produces a ratio from repeating decimal object.
 */
export function getRatioFromRepeatingDecimal({ sign = 1, int = 0, ...fractional }: RepeatingDecimal): Ratio | null {
	const integralPart = Number(int);
	const nonrepeat = fractional.nonrepeat ? String(fractional.nonrepeat) : "";
	const repeat = fractional.repeat ? String(fractional.repeat) : "";

	const denominator = Number(`${"9".repeat(repeat.length)}${"0".repeat(nonrepeat.length)}`); 
	const numerator =  Number(`${nonrepeat}${repeat}`) - Number(nonrepeat);

	return getRatio(
		sign * (integralPart * denominator + numerator),
		denominator
	);
}