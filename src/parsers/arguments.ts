import { getRatio } from "../helpers/ratio";
import { isValidInteger } from "../validators";
import { Parser } from "../types";

/**
 * Parses a ratio from two integers.
 */
export const parseArguments: Parser = (n, d = 1) => {
	if (!isValidInteger(n) || !isValidInteger(d)) {
		return null;
	}

	return getRatio({ n, d });
};
