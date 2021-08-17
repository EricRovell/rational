import type { Rational } from "../rational";
import { ratio2repeatingDecimal } from "./ratio-to-repeated-decimal";

/**
 * Transforms a rational number into fractional string.
 */
export function rational2fractionString(rational: Rational): string {
	return `${rational.numerator}/${rational.denominator}`;
}

/**
 * Transforms a rational number into decimal string.
 */
export function rational2decimalString(rational: Rational, places = 0): string {
	return rational.repeating
		? ratio2repeatingDecimal(rational.numerator, rational.denominator)
		: rational.round(places).toString();
}