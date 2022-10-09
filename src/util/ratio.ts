import { gcd } from "./helpers";
import { getRatioFromFraction } from "./fraction";
import type { Ratio } from "../types";

/**
 * Handles the sign of the input ratio.
 * If the ratio is negative, the numerator should hold the sign,
 * the denominator is always positive (Q = Z / N).
 */
export function handleRatioSign(n: number, m: number): Ratio {
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