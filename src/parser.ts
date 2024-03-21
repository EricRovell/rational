import { simplifyRatio } from "./lib/ratio";
import { parsers } from "./parsers";
import type { Input, Parser } from "./types";

/**
 * Parses input into Ratio.
 *
 * Supported input:
 *  + parse(int, int);
 *  + parse(float);
 *  + parse([ int, int ]);
 *  + parse({ n: int, d: int });
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
