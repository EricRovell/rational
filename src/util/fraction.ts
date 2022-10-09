import type { Ratio, Fraction, FractionUnknown } from "../types";
import { handleRatioSign } from "./ratio";

/**
 * Handles the sign of the input fraction.
 *
 * If the integral part is present, it determines the sign.
 * Otherwise, the sign calculated from ratio.
 *
 * If the ratio is negative, the numerator should hold the sign,
 * the denominator is always positive (Q = Z / N).
 */
function handleFractionSign({ int = 0, n, d = 1 }: Fraction): Ratio {
	if (!int) {
		return handleRatioSign(n, d);
	}

	return [
		Math.sign(int) * (Math.abs(int) * Math.abs(d) + Math.abs(n)),
		Math.abs(d)
	];
}

/**
 * Produces a ratio from fraction.
 */
export function getRatioFromFraction({ int = 0, n, d = 1 }: FractionUnknown): Ratio | null {
	const [ integer, num, den ] = [ int, n, d ].map(value => {
		return Math.floor(Number(value));
	});

	if ([ integer, num, den ].some(isNaN)) {
		return null;
	}

	if (![ integer, num, den ].every(Number.isSafeInteger)) {
		return null;
	}

	if (den === 0) {
		return null;
	}

	return handleFractionSign({
		int: integer,
		n: num,
		d: den
	});
}
