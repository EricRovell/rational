import { getRatio } from "../helpers/ratio";
import { Parser } from "../types";

export function isFloat(value: unknown): value is number {
	return typeof value === "number" && !Number.isInteger(value);
}

/**
 * Parses a ratio from float.
 */
export const parseFloat: Parser = float => {
	if (!isFloat(float)) {
		return null;
	}

	const floatParts = float.toString().split(".");
	const denominator = 10 ** floatParts[1].length;
	const [ integral, fractional ] = floatParts.map(Number);

	return getRatio({
		n: integral * denominator + fractional,
		d: denominator
	});
};
