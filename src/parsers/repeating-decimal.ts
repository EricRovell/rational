import { getRatioFromRepeatingDecimal } from "../helpers/repeating-decimal";
import { isNonEmptyString, isObject } from "../validators";
import { Parser, RepeatingDecimal } from "../types";

export function isRepeatingDecimalObject(value: unknown): value is RepeatingDecimal {
	return isObject(value) && Object.hasOwn(value, "repeat");
}

/**
 * Repeating decimal regex.
 *
 * RegExp groups:
 * 	1. Optional sign of the decimal (+|-);
 * 	2. Optional integral part;
 *  3. Optional non-repeating part of the decimal;
 *  4. Repeating part of the decimal;
 *
 *  ! Dot symbol and brackets are necessary.
 *
 * Example: -1.23(456) -> -23433/99900
 */
const matcherRepeatingDecimal = /^([+-]?)?(\d*)?\.(\d*)?\((\d+)\)$/;

/**
 * Parses a string as repeating decimal and produces a ratio.
 *
 * Example: "23/45" -> [ 23, 45 ].
 */
export const parseRepeatedDecimalString: Parser = input => {
	if (!isNonEmptyString(input)) {
		return null;
	}

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
};

/**
 * Parse a repeating decimal object and produces a ratio.
 *
 * Example: { int: 1, repeat: 1 } -> [ 10, 9 ].
 */
export const parseRepeatingDecimalObject: Parser = input => {
	if (!isRepeatingDecimalObject(input)) {
		return null;
	}

	return getRatioFromRepeatingDecimal(input);
};
