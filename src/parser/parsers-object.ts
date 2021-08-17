import { getRatio } from "@util/ratio";
import { getRatioFromFraction } from "@util/fraction";
import type { Ratio, InputObject } from "../types";
import { getRatioFromRepeatingDecimal } from "@util/repeating-decimal";

/**
 * Parse a fraction object and produces a ratio.
 * 
 * Example: { n: 23, d: 45 } -> [ 23, 45 ].
 */
function parseFractionObject(input: InputObject): Ratio | null {
	if ("n" in input || "d" in input) {
		return getRatioFromFraction(input);
	}

	return null;
}

/**
 * Parse a degrees object and produces a ratio.
 * 
 * Example: { deg: -1, min: 2, sec: 5 } -> [ -149, 144 ].
 */
function parseDegreesObject(input: InputObject): Ratio | null {
	if ("deg" in input || "min" in input || "sec" in input) {
		const { deg = 0, sec = 0, min = 0 } = input;
		return getRatio(
			deg * 3600 + min * 60 + sec,
			3600
		);
	}

	return null;
}

/**
 * Parse a repeating decimal object and produces a ratio.
 * 
 * Example: { int: 1, repeat: 1 } -> [ 10, 9 ].
 */
function parseRepeatingDecimalObject(input: InputObject): Ratio | null {
	if ("repeat" in input) {
		return getRatioFromRepeatingDecimal(input);
	}

	return null;
}

export const objectParsers = [
	parseFractionObject,
	parseRepeatingDecimalObject,
	parseDegreesObject,
];