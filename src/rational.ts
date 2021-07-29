import { parse } from "./parser";
import { gcd, lcm } from "@util/helpers";
import type { Input, Ratio } from "@types";

export class Rational {
	private readonly parsed: Ratio | null;
	private readonly n: number;
	private readonly d: number;

	constructor(input: Input, denominator?: number) {
		this.parsed = parse(input, denominator);
		const [ n, d ] = this.parsed ?? [ 0, 1 ];
		const divisor = gcd(n, d);
		this.n = n / divisor;
		this.d = d / divisor;
	}

	/**
	 * Returns a string representing a ratio.
	 */
	toString(): string {
		return `${this.n}/${this.d}`;
	}

	/**
	 * Indicates whether or not the parsing was successful.
	 */
	get valid(): boolean {
		return this.parsed !== null;
	}

	/**
	 * Gets the numerator value of the fraction.
	 */
	get numerator(): number {
		return this.n;
	}

	/**
	 * Gets the denominator value of the fraction.
	 */
	get denominator(): number {
		return this.d;
	}

	/**
	 * Gets the integral part of the rational number.
	 */
	get integralPart(): number {
		return Math.floor(this.n / this.d);
	}

	/**
	 * Gets the gractional part of the rational number as a new `Rational` instance.
	 */
	get fractionalPart(): Rational {
		return new Rational([ this.n - this.integralPart * this.d, this.d ]);
	}

	/**
	 * Returns the sign of the rational number.
	 */
	get sign(): number {
		return Math.sign(this.n / this.d);
	}

	/**
	 * Returns the boolean indicating if the rational number could be represented
	 * as [proper](https://en.wikipedia.org/wiki/Fraction#Proper_and_improper_fractions) fraction.
	 */
	get proper(): boolean {
		return this.n < this.d;
	}

	/**
	 * Returns the [reciprocal](https://en.wikipedia.org/wiki/Fraction#Reciprocals_and_the_%22invisible_denominator%22)
	 * as new `Rational` instance.
	 */
	get reciprocal(): Rational {
		return new Rational([ this.d, this.n ]);
	}

	/**
	 * Returns the opposite rational number as new `Rational` instance.
	 */
	get opposite(): Rational {
		return new Rational(-this.n, this.d);
	}

	/**
	 * Performs the addition and returns the sum as new `Rational` instance.
	 */
	add(input: Rational | Input, arg2?: number): Rational {
		const addend = rational(input, arg2);
		const multiple = lcm(this.denominator, addend.denominator);

		return new Rational(
			this.numerator * (multiple / this.denominator) + addend.numerator * (multiple / addend.denominator),
			multiple
		);
	}

	/**
	 * Performs the subtraction and returns the difference as new `Rational` instance.
	 */
	sub(input: Rational | Input, arg2?: number): Rational {
		return this.add(rational(input, arg2).opposite);
	}

	/**
	 * Performs the multiplication and returns the product as new `Rational` instance.
	 */
	mul(input: Rational | Input, arg2?: number): Rational {
		const factor = rational(input, arg2);

		return new Rational({
			n: this.n * factor.n,
			d: this.d * factor.d
		});
	}

	/**
	 * Performs the division and returns the quotien as new `Rational` instance.
	 */
	div(input: Rational | Input, arg2?: number): Rational {
		return this.mul(rational(input, arg2).reciprocal);
	}
}

export function rational(input: Input | Rational, denominator = 1): Rational {
	if (input instanceof Rational) {
		return input;
	}

	return new Rational(input, denominator);
}