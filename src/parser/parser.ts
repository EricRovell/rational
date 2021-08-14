import { 
	parseIntegers,
	parseFloat,
	parseArray,
	parseObject,
	parseString
} from "./parsers";

import type { Input, Ratio } from "../types";

const parsers = [
	parseIntegers,
	parseFloat,
	parseArray,
	parseObject,
	parseString
];

/**
 * Parses input into Ratio.
 * 
 * Supported input:
 *  + parse(int, int);
 *  + parse(float);
 *  + parse([ int, int ]);
 *  + parse({ n: int, d: int });
 */
export function parse(numerator: Input, denominator: number | undefined): Ratio | null {
	for (const parser of parsers) {
		const parsed = parser(numerator, denominator);
		if (parsed) {
			return parsed;
		}
	}

	return null;
}