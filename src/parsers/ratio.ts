import { getRatio } from "../helpers/ratio";
import { isValidInteger } from "../validators";
import { Parser, Ratio } from "../types";

export function isRatio(value: unknown): value is Ratio {
	return (
		Array.isArray(value) &&
		(value.length === 1 || value.length == 2) &&
		value.every(isValidInteger)
	);
}

/**
 * Parses a ratio from tuple integer input.
 */
export const parseRatio: Parser = input => {
	if (!isRatio(input)) {
		return null;
	}

	const [ n = 0, d = 1 ] = input.map(Number);
	return getRatio({ n, d });
};
