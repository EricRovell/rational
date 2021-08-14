import type { Ratio } from "../types";

/**
 * Handles the sign of the input ratio.
 * If the ratio is negative, the numerator should hold the sign,
 * the denominator is always positive (Q = Z / N).
 */
export function handleRatioSign([ a, b ]: Ratio): Ratio {
	return (a / b >= 0)
		? [ Math.abs(a), Math.abs(b) ]
		: [ -Math.abs(a), Math.abs(b) ];
}

/**
 * Produces a ratio.
 */
export function getRatio(numerator: unknown, denominator: unknown): Ratio | null {
	const [ num, den ] = [ numerator, denominator ].map(value => {
		return Math.floor(Number(value));
	});

	if (isNaN(num) || isNaN(den)) {
		return null;
	}

	if (den === 0) {
		return null;
	}

	if (!Number.isSafeInteger(num) || !Number.isSafeInteger(den)) {
		return null;
	}

	return handleRatioSign([ num, den ]);
}