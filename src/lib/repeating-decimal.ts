import { getRatio } from "../lib/ratio";
import { factorize } from "../utils";
import type { Rational } from "../rational";
import type { Ratio, RepeatingDecimal } from "../types";

/**
 * Detects if the given rational number is terminated decimal.
 */
export function detectRepeatingDecimal(rational: Rational): boolean {
	const factors = factorize(rational.denominator);
	for (const factor of Object.keys(factors)) {
		if (factor !== "2" && factor !== "5") {
			return true;
		}
	}

	return false;
}

/**
 * Converts a ratio to repeated decimal string.
 * If resulting decimal is terminating, returns an empty string instead.
 *
 * Example:
 *
 * 	1. (12, 90) -> "0.1(3)"
 * 	2. (1, 2)   -> ""
 */
export function ratio2repeatingDecimal(a: number, b: number): string {
	const [ n, d ] = [ Math.abs(a), Math.abs(b) ];
	const int = Math.sign(a / b) * Math.floor(n / d);

	let result = "";

	/**
	 * To store already seen remainers as Map<key: position, value: remainder>
	 * Position is needed for cases like 1/6, as the recurring sequence does not
	 * start from the 1st remainder.
	 */
	const remainders = new Map<number, number>();
	remainders.clear();

	let remainder = n % d;

	/**
	 * Keeps finding until it terminates with zero or repeats.
	 */
	while (remainder != 0 && !remainders.has(remainder)) {
		remainders.set(remainder, result.length);

		remainder = remainder * 10;

		const result_part = Math.floor(remainder / d);
		result += result_part.toString();

		remainder = remainder % d;
	}

	if (remainder == 0) {
		return "";
	} else if (remainders.has(remainder)) {
		const position = remainders.get(remainder);
		const nonrepeat = result.slice(0, position);
		const repeat = result.slice(position);
		return `${int}.${nonrepeat}(${repeat})`;
	}

	return "";
}

/**
 * Produces a ratio from repeating decimal object.
 */
export function getRatioFromRepeatingDecimal({ sign = 1, int = 0, nonrepeat = "", repeat }: RepeatingDecimal): Ratio | null {
	const integralPart = Number(int);
	const nonperiod = String(nonrepeat) || "";
	const period = String(repeat);

	const denominator = Number(`${"9".repeat(period.length)}${"0".repeat(nonperiod.length)}`);
	const numerator =  Number(`${nonperiod}${repeat}`) - Number(nonperiod);

	return getRatio(
		sign * (integralPart * denominator + numerator),
		denominator
	);
}
