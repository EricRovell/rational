import { isValidInteger } from "../validators";
import type { Ratio, Fraction } from "../types";

/**
 * Handles the sign of the input ratio.
 * If the ratio is negative, the numerator should hold the sign,
 * the denominator is always positive (Q = Z / N).
 */
function handleRatioSign(n: number, m: number): Ratio {
	return (n / m >= 0)
		? [ Math.abs(n), Math.abs(m) ]
		: [ -Math.abs(n), Math.abs(m) ];
}

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
export function getRatio({ int = 0, n, d = 1 }: Fraction): Ratio | null {
	if (!isValidInteger(int) || !isValidInteger(n) || !isValidInteger(d)) {
		return null;
	}

	if (d === 0) {
		return null;
	}

	return handleFractionSign({
		int,
		n,
		d
	});
}
