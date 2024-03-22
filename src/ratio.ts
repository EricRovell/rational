import { gcd } from "./utils";
import type { Ratio, Fraction, FractionUnknown } from "./types";
import { isValidInteger } from "./validators";

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
 * Produces a ratio.
 */
export function getRatio(n: unknown, d: unknown): Ratio | null {
	return getRatioFromFraction({	n, d });
}

/**
 * Simplifies the ratio.
 */
export function simplifyRatio([ n = 0, d = 1 ]: Ratio): Ratio {
	const divisor = gcd(n, d);
	return [ n / divisor, d / divisor ];
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
export function getRatioFromFraction({ int = 0, n, d = 1 }: FractionUnknown): Ratio | null {
	const [ integer, num, den ] = [ int, n, d ].map(value => {
		return Math.floor(Number(value));
	});

	if (!isValidInteger(integer) || !isValidInteger(num) || !isValidInteger(den)) {
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
