import {
	matcherFraction,
	matcherRepeatingDecimal
} from "./matchers";
import { getRatio } from "@util/ratio";
import type { Ratio } from "../types";

/**
 * Parse a string as fraction and produces a ratio.
 * 
 * Example: "23/45" -> [ 23, 45 ].
 */
function parseFractionString(input: string): Ratio | null {
	const match = matcherFraction.exec(input);

	if (!match) {
		return null;
	}

	return getRatio(match[1], match[2]);
}

/**
 * Parses a string as repeating decimal and produces a ratio.
 * 
 * Example: "23/45" -> [ 23, 45 ].
 */
function parseRepeatedDecimalString(input: string): Ratio | null {
	const match = matcherRepeatingDecimal.exec(input);

	if (!match) {
		return null;
	}

	const sign = (match[1] && match[1] === "-") ? -1 : 1;
	const integralPart = match[2] ? Number(match[2]) : 0;
	const nonRepeating = match[3] ?? "";
	const repeating = match[4] ?? "";

	const denominator = Number(`${"9".repeat(repeating.length)}${"0".repeat(nonRepeating.length)}`); 
	const numerator =  Number(`${nonRepeating}${repeating}`) - Number(nonRepeating);

	return getRatio(
		sign * (integralPart * denominator + numerator),
		denominator
	);
}

export const stringParsers = [
	parseFractionString,
	parseRepeatedDecimalString
];