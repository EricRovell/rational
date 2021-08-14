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