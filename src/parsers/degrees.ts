import { getRatio } from "../helpers/ratio";
import { isNonEmptyString, isObject } from "../validators";
import { Degrees, Parser } from "../types";

export function isDegreesObject(value: unknown): value is Degrees {
	if (!isObject(value)) {
		return false;
	}

	return (
		Object.hasOwn(value, "deg") ||
		Object.hasOwn(value, "min") ||
		Object.hasOwn(value, "sec")
	);
}

/**
 * Degrees string regex.
 *
 * RegExp groups:
 * 	1. Optional sign of the input (+|-);
 * 	2. Optional degrees value;
 *  3. Optional minutes value;
 *  4. Optional seconds value;
 *
 * Example: 123.45'67'' -> 123 degrees, 45 minutes, and 67 seconds.
 */
const matcherDegrees = /^([+-])?(?:(\d*)(?:\.))?(?:(\d*)(?:'))?(?:(\d*)(?:''))?$/;

/**
 * Parses a string as degrees value.
 *
 * Example: 1.2'3'' -> 1 + 2/60 + 3/3600.
 */
export const parseDegreesString: Parser = input => {
	if (!isNonEmptyString(input)) {
		return null;
	}

	const match = matcherDegrees.exec(input);

	if (!match) {
		return null;
	}

	const sign = (match[1] && match[1] === "-") ? -1 : 1;
	const [ degrees, minutes, seconds ] = match.slice(2, 5).map(value => {
		return value ? Number(value) : 0;
	});

	return getRatio({
		n: sign * (degrees * 3600 + minutes * 60 + seconds),
		d: 3600
	});
};

/**
 * Parse a degrees object and produces a ratio.
 *
 * Example: { deg: -1, min: 2, sec: 5 } -> [ -149, 144 ].
 */
export const parseDegreesObject: Parser = input => {
	if (!isDegreesObject(input)) {
		return null;
	}

	const { deg = 0, sec = 0, min = 0 } = input;

	return getRatio({
		n: deg * 3600 + min * 60 + sec,
		d: 3600
	});
};
