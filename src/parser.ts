import { simplifyRatio } from "./ratio";
import { parsers } from "./parsers";
import type { Input, Parser } from "./types";

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
