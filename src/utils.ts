import { isValidInteger } from "./validators";

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
 * Calculates the Greatest Common Divisor for two natural numbers.
 *
 * Euclidean Algorithm is used.
 * https://en.wikipedia.org/wiki/Euclidean_algorithm
 */
export function gcd(a: number, b: number): number {
	if (!isValidInteger(a) || !isValidInteger(b)) {
		return NaN;
	}

	a = Math.abs(a);
	b = Math.abs(b);

	if (b > a) {
		const temp = a;
		a = b;
		b = temp;
	}

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

export function factorize(integer: number): Record<number, number> {
	const factors: Record<number, number> = {};

	let [ number, divisor ] = [ integer, 2 ];
	while (number >= 2) {
		if (number % divisor === 0) {
			factors[divisor] = (factors[divisor] ?? 0) + 1;
			number /= divisor;
		} else {
			divisor++;
		}
	}

	return factors;
}
