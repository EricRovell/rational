import {
	matcherFraction,
	matcherRepeatingDecimal,
	matcherDegrees
} from "./matchers";
import { getRatio } from "@util/ratio";
import { getRatioFromFraction } from "@util/fraction";
import type { Ratio } from "../types";
import { getRatioFromRepeatingDecimal } from "@util/repeating-decimal";

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

	return getRatioFromFraction({
		int: match[1],
		n: match[2],
		d: match[3]
	});
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

	return getRatioFromRepeatingDecimal({
		sign: match[1] && match[1] === "-" ? -1 : 1,
		int: match[2],
		nonrepeat: match[3],
		repeat: match[4]
	});
}

/**
 * Parses a string as degrees value.
 * 
 * Example: 1.2'3'' -> 1 + 2/60 + 3/3600.
 */
function parseDegreesString(input: string): Ratio | null {
	const match = matcherDegrees.exec(input);

	if (!match) {
		return null;
	}

	const sign = (match[1] && match[1] === "-") ? -1 : 1;
	const [ degrees, minutes, seconds ] = match.slice(2, 5).map(value => {
		return value ? Number(value) : 0;
	});

	return getRatio(
		sign * (degrees * 3600 + minutes * 60 + seconds),
		3600
	);
}

export const stringParsers = [
	parseFractionString,
	parseRepeatedDecimalString,
	parseDegreesString
];