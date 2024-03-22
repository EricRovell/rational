import { gcd } from "../utils";
import type { Input, Parser, Ratio } from "../types";

import { parseArguments } from "./arguments";
import { parseDegreesObject, parseDegreesString } from "./degrees";
import { parseFloat } from "./float";
import { parseFractionObject, parseFractionString } from "./fraction";
import { parseRatio } from "./ratio";
import { parseRepeatingDecimalObject, parseRepeatedDecimalString } from "./repeating-decimal";

export const parsers: Parser[] = [
	parseArguments,
	parseDegreesObject,
	parseDegreesString,
	parseFloat,
	parseFractionObject,
	parseFractionString,
	parseRatio,
	parseRepeatingDecimalObject,
	parseRepeatedDecimalString
];

/**
 * Simplifies the ratio.
 */
function simplifyRatio([ n = 0, d = 1 ]: Ratio): Ratio {
	const divisor = gcd(n, d);
	return [ n / divisor, d / divisor ];
}

/**
 * Parses input into Ratio.
 */
export const parse: Parser<Input> = (input: Input, arg?: number) => {
	for (const parser of parsers) {
		const parsed = parser(input, arg);

		if (parsed) {
			return simplifyRatio(parsed);
		}
	}

	return null;
};
