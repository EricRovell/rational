import { getRatio, getRatioFromFraction } from "./lib/ratio";
import { matcherFraction, matcherRepeatingDecimal, matcherDegrees } from "./matchers";
import { getRatioFromRepeatingDecimal } from "./lib/repeating-decimal";
import { isObject } from "./validators";
import { InputObject, Parser } from "./types";

/**
 * Parses a ratio from two integers.
 */
const parseIntegers: Parser = (numerator, denominator = 1) => {
	if (typeof numerator !== "number" || !Number.isInteger(numerator) || !Number.isInteger(denominator)) {
		return null;
	}

	return getRatio(numerator, denominator);
};

/**
 * Parses a ratio from float.
 */
const parseFloat: Parser = float => {
	if (typeof float !== "number" || Number.isInteger(float)) {
		return null;
	}

	const floatParts = float.toString().split(".");
	const denominator = 10 ** floatParts[1].length;
	const [ integral, fractional ] = floatParts.map(Number);

	return getRatio(integral * denominator + fractional, denominator);
};

/**
 * Parses a ratio from tuple integer input.
 */
const parseArray: Parser = input => {
	if (!Array.isArray(input) || !input.every(Number.isInteger) || input.length > 2) {
		return null;
	}

	const [ n = 0, d = 1 ] = input.map(Number);
	return getRatio(n, d);
};

/**
 * Parse a string as fraction and produces a ratio.
 *
 * Example: "23/45" -> [ 23, 45 ].
 */
const parseFractionString: Parser = (input) => {
	if (typeof input !== "string") {
		return null;
	}

	const match = matcherFraction.exec(input);

	if (!match) {
		return null;
	}

	return getRatioFromFraction({
		int: match[1],
		n: match[2],
		d: match[3]
	});
};

/**
 * Parses a string as repeating decimal and produces a ratio.
 *
 * Example: "23/45" -> [ 23, 45 ].
 */
const parseRepeatedDecimalString: Parser = (input) => {
	if (typeof input !== "string") {
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
 * Parses a string as degrees value.
 *
 * Example: 1.2'3'' -> 1 + 2/60 + 3/3600.
 */
const parseDegreesString: Parser = (input) => {
	if (typeof input !== "string") {
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

	return getRatio(
		sign * (degrees * 3600 + minutes * 60 + seconds),
		3600
	);
};

/**
 * Parse a fraction object and produces a ratio.
 *
 * Example: { n: 23, d: 45 } -> [ 23, 45 ].
 */
const parseFractionObject: Parser = (input) => {
	if (!isObject<InputObject>(input)) {
		return null;
	}

	if ("n" in input || "d" in input) {
		return getRatioFromFraction(input);
	}

	return null;
};

/**
 * Parse a degrees object and produces a ratio.
 *
 * Example: { deg: -1, min: 2, sec: 5 } -> [ -149, 144 ].
 */
const parseDegreesObject: Parser = (input) => {
	if (!isObject<InputObject>(input)) {
		return null;
	}

	if ("deg" in input || "min" in input || "sec" in input) {
		const { deg = 0, sec = 0, min = 0 } = input;
		return getRatio(
			deg * 3600 + min * 60 + sec,
			3600
		);
	}

	return null;
};

/**
 * Parse a repeating decimal object and produces a ratio.
 *
 * Example: { int: 1, repeat: 1 } -> [ 10, 9 ].
 */
const parseRepeatingDecimalObject: Parser = (input) => {
	if (!isObject<InputObject>(input)) {
		return null;
	}

	if ("repeat" in input) {
		return getRatioFromRepeatingDecimal(input);
	}

	return null;
};

export const parsers: Parser[] = [
	parseIntegers,
	parseFloat,
	parseArray,
	parseFractionString,
	parseRepeatedDecimalString,
	parseDegreesString,
	parseFractionObject,
	parseDegreesObject,
	parseRepeatingDecimalObject
];
