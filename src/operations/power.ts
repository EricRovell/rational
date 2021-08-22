import { factorize } from "@util/helpers";
import type { Rational } from "../rational";
import type { Input, Ratio } from "../types";

interface Factors {
	type: "num" | "den";
	factors: [string, number][];
}

/**
 * Attemps to raise a rational number to the power of another rational number.
 * If result is irrational, returns null.
 * 
 * The idea is:
 * 
 * 1. Use prime factorization to break the numerator and denominator.
 * 2. As (a^b)^c -> a^(b * c) raise the power of each factor by exponent's numerator.
 * 3. Check divisibility of each factors power by exponents denominator.
 * 4. If each factor of both numerator and denominator passes the test, the result IS rational.
 * 
 * Simplified example:
 * 
 * (27/1) ^ (2/3):
 * 
 * 1. (3^3)^(2/3)
 * 2. (3^6)^(1/3)
 * 3. as 6 / 3 === 0 -> check passed.
 * 
 * Same is done with denominator.
 */
export function expRational(base: Rational, exponent: Rational): Ratio | null {

	const baseFactors: Factors[] = [
		{
			type: "num",
			factors: Object.entries(factorize(base.numerator))
		},
		{
			type: "den",
			factors: Object.entries(factorize(base.denominator))
		}
	];

	// construction of resulting ratio
	const ratio = {
		num: 1,
		den: 1
	};

	for (const { type, factors } of baseFactors) {
		for (const [ factor, power ] of factors) {
			let resultPower = power * exponent.numerator;
			if (resultPower % exponent.denominator === 0) {
				resultPower /= exponent.denominator;
			} else {
				return null;
			}

			ratio[type] *= Math.pow(Number(factor), resultPower);
		}
	}

	return [ ratio.num, ratio.den ];
}

/**
 * Returns the power of the actual number, raised to the rational exponent.
 * If the result becomes irrational the function returns null.
 */
export function pow(base: Rational, exponent: Rational): Input | null {
	// integer case
	if (exponent.denominator === 1) {
		// integer ^ integer
		if (base.denominator === 1) {
			return base.numerator ** exponent.numerator;
		}

		const [ n, m ] = [
			Math.abs(base.numerator) ** Math.abs(exponent.numerator),
			Math.abs(base.denominator) ** Math.abs(exponent.numerator)
		];

		return exponent.sign > 0
			? [ n, m ]
			: [ m, n ];
	}

	// negative roots become complex
	if (base.sign < 0) {
		return null;
	}

	// zero case
	if (base.numerator === 0) {
		return [ 0, 1 ];
	}

	// rational case
	const result = expRational(base, exponent.abs);

	if (result) {
		const [ n, d ] = result;
		return exponent.sign > 0
			? [ n, d ]
			: [ d, n ];
	}

	return null;
}