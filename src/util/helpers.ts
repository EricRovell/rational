import { Ratio } from "../types";

/**
 * Round the number up to the desired precision.
 */
export function round(number: number, digits = 0, base = Math.pow(10, digits)): number {
	return Math.round(number * base) / base + 0;
}

/**
 * Round the number up to the desired precision.
 */
export function ceil(number: number, digits = 0, base = Math.pow(10, digits)): number {
	return Math.ceil(number * base) / base + 0;
}

/**
 * Round the number up to the desired precision.
 */
export function floor(number: number, digits = 0, base = Math.pow(10, digits)): number {
	return Math.floor(number * base) / base + 0;
}

/**
 * Calculates the Greatest Common Divisor.
 * 
 * Euclidean Algorithm is used.
 * https://en.wikipedia.org/wiki/Euclidean_algorithm
 */
export function gcd(number1: number, number2: number): number {
	let [ a, b ] = [ number1, number2 ].map(Math.abs);
	while (b) {
		[ a, b ] = [ b, a % b ];
	}
	return a;
}

/**
 * Calculates the Least Common Multiple of the natural numbers.
 */
export function lcm(a: number, b: number): number {
	return Math.abs(a * b) / gcd(a, b);
}

/**
 * Handles the sign of the input ratio.
 * If the ratio is negative, the numerator should hold the sign,
 * the denominator is always positive (Q = Z / N).
 */
export function handleRatioSign([ a, b ]: Ratio): Ratio {
	return (a / b >= 0)
		? [ Math.abs(a), Math.abs(b) ]
		: [ -Math.abs(a), Math.abs(b) ];
}

/**
 * Renders the parsed data to an RationalNumber object.
 */
export function roundRatio(numerator: number, denominator: number): Ratio {
	return [
		Math.floor(numerator),
		Math.floor(denominator)
	];
}

/**
 * Validates the ratio for Zero Division Error.
 */
export function validRatio([ a, b ]: Ratio): boolean {
	return Number.isSafeInteger(a) && b !== 0;
}