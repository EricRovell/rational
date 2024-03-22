import { getRatio } from "../helpers/ratio";
import { isNonEmptyString, isObject } from "../validators";
import { Fraction, Parser } from "../types";

export function isFractionObject(value: unknown): value is Fraction {
	if (!isObject(value)) {
		return false;
	}

	return (
		Object.hasOwn(value, "n") ||
		Object.hasOwn(value, "d")
	);
}

/**
 * Fractional string regex.
 *
 * RegExp groups:
 * 	1. Optional integral value;
 * 	2. Numerator value value;
 *  3. Denominator value;
 *
 * Each value can be proceeded with optional sign symbol.
 *
 * Example: "23/98", "-23/56", "89/-5", "+5/+9", "1 23/45", "-5 +26/-48".
 */
const matcherFraction = /^(?:([+-]?\d+)(?:\s+))?([+-]?\d+)\/([+-]?\d+)$/;

/**
 * Parse a string as fraction and produces a ratio.
 *
 * Example: "23/45" -> [ 23, 45 ].
 */
export const parseFractionString: Parser = input => {
	if (!isNonEmptyString(input)) {
		return null;
	}

	const match = matcherFraction.exec(input);

	if (!match) {
		return null;
	}

	return getRatio({
		int: match[1] ? Number(match[1]) : undefined,
		n: Number(match[2]),
		d: Number(match[3])
	});
};

/**
 * Parse a fraction object and produces a ratio.
 *
 * Example: { n: 23, d: 45 } -> [ 23, 45 ].
 */
export const parseFractionObject: Parser = input => {
	if (!isFractionObject(input)) {
		return null;
	}

	return getRatio(input);
};
