import { matcherFraction } from "./matchers";
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

export const stringParsers = [
	parseFractionString
];