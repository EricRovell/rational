import { parse } from "./parser";
import {
	pow,
	detectRepeatingDecimal,
	rational2decimalString,
	rational2fractionString
} from "./operations";
import { lcm, round, ceil, floor, gcd } from "@util/helpers";
import type { Input, InputRational, Ratio } from "./types";

export class Rational {
	private readonly parsed: Ratio | null;
	private readonly n: number;
	private readonly d: number;

	constructor(input: Input = 0, denominator = 1) {
		this.parsed = parse(input, denominator);
		const [ n, d ] = this.parsed ?? [ 0, 1 ];
		this.n = n;
		this.d = d;
	}

	/**
	 * Returns a string representation of a ratio.
	 */
	toString(): string {
		return rational2fractionString(this, false);
	}

	/**
	 * Transforms a rational number into decimal string.
	 */
	toDecimalString(places?: number): string {
		return rational2decimalString(this, places);
	}

	/**
	 * Transforms a rational number into fractional string.
	 * By default, the fraction is proper.
	 */
	toFractionString(proper = true): string {
		return rational2fractionString(this, proper);
	}

	/**
	 * Returns a decimal representation of a rational number.
	 * 
	 * `rational(1, 2).valueOf()  // -> 0.5`
	 * `rational(18, 7).valueOf() // -> 2.5714285714285716`
	 */
	valueOf(): number {
		return this.n / this.d;
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
		return this.sign * Math.floor(Math.abs(this.n) / this.d);
	}

	/**
	 * Gets the gractional part of the rational number as a new `Rational` instance.
	 */
	get fractionalPart(): Rational {
		return new Rational([
			this.n - this.integralPart * this.d,
			this.d
		]);
	}

	/**
	 * Returns the sign of the rational number.
	 */
	get sign(): number {
		return Math.sign(this.n);
	}

	/**
	 * Returns the boolean indicating if the rational number could be represented
	 * as [proper](https://en.wikipedia.org/wiki/Fraction#Proper_and_improper_fractions) fraction.
	 */
	get proper(): boolean {
		return Math.abs(this.n) < Math.abs(this.d);
	}

	/**
	 * Returns the boolean indicating if the rational number
	 * could be represented by repeating decimal (do not terminates).
	 */
	get repeating(): boolean {
		return detectRepeatingDecimal(this);
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
		return new Rational(-1 * this.n, this.d);
	}

	/**
	 * Performs the addition and returns the sum as new `Rational` instance.
	 */
	add(input: InputRational, arg2?: number): Rational {
		const addend = rational(input, arg2);
		const multiple = lcm(this.d, addend.d);

		return new Rational(
			this.numerator * (multiple / this.d) + addend.n * (multiple / addend.d),
			multiple
		);
	}

	/**
	 * Performs the subtraction and returns the difference as new `Rational` instance.
	 */
	sub(input: InputRational, arg2?: number): Rational {
		return this.add(rational(input, arg2).opposite);
	}

	/**
	 * Performs the multiplication and returns the product as new `Rational` instance.
	 */
	mul(input: InputRational, arg2?: number): Rational {
		const factor = rational(input, arg2);

		return new Rational({
			n: this.n * factor.n,
			d: this.d * factor.d
		});
	}

	/**
	 * Performs the division and returns the quotien as new `Rational` instance.
	 */
	div(input: InputRational, arg2?: number): Rational {
		return this.mul(rational(input, arg2).reciprocal);
	}

	/**
	 * Calculates the [GCD](https://en.wikipedia.org/wiki/Greatest_common_divisor) of two rational numbers
	 * and returns the result as new `Rational` instance.
	 */
	gcd(input: InputRational, arg2?: number): Rational {
		const another = rational(input, arg2);
		return new Rational(
			gcd(this.n, another.n),
			lcm(this.d, another.d)
		);
	}

	/**
	 * Calculates the [LCM](https://en.wikipedia.org/wiki/Least_common_multiple) of two rational numbers
	 * and returns the result as new `Rational` instance.
	 */
	lcm(input: InputRational, arg2?: number): Rational {
		const another = rational(input, arg2);
		return new Rational(
			lcm(this.n, another.n),
			gcd(this.d, another.d)
		);
	}

	/**
	 * Returns the absolute value of the rational number as new `Rational` instance.
	 */
	get abs(): Rational {
		return new Rational(
			Math.abs(this.n),
			this.d
		);
	}

	/* Compares the rational number with another.
	 * Results are interpreted as:
	 * 
	 * 	- comparable is greater ->  1;
	 *  - comparable is smaller -> -1;
	 *  - comparable is equal   ->  0.
	 * 
	 * Non-strict inequalities can be performed as such:
	 * 
	 *  - rational.compare(1/2) >= 0 the same as >=
	 *  - rational.compare(1/2) <= 0 the same as <=
	 */
	compare(input: InputRational, arg2?: number): -1 | 0 | 1 {
		const comparable = rational(input, arg2);
		const difference = this.n * comparable.d - comparable.n * this.d;
		return difference === 0
			? 0
			: difference > 0
				? 1
				: -1;
	}

	/**
	 * Returns the rational number rounded to fixed decimal places.
	 */
	round(places = 0): number {
		return round(this.n / this.d, places);
	}

	/**
	 * Returns the rational number rounded up to the next largest decimal place.
	 */
	ceil(places = 0): number {
		return ceil(this.n / this.d, places);
	}

	/**
	 * Returns the rational number rounded down to the next smallest or equal decimal place.
	 */
	floor(places = 0): number {
		return floor(this.n / this.d, places);
	}

	/**
	 * Calculates the modulo of two rational numbers.
	 */
	mod(input: InputRational, arg2?: number): Rational {
		const another = rational(input, arg2);
		return new Rational(
			(this.n * another.d) % (this.d * another.n),
			this.d * another.d
		);
	}

	/**
	 * Calculates the [mathematical correct modulo](https://en.wikipedia.org/wiki/Modulo_(mathematics)) of two rational numbers.
	 * 
	 * [More info and source of the implementation](https://stackoverflow.com/questions/2691025/mathematical-modulus-in-c-sharp)
	 */
	mathmod(input: InputRational, arg2?: number): Rational {
		const another = rational(input, arg2);
		return new Rational(
			(Math.abs( this.n * another.d * this.d * another.n) + (this.n * another.d)) % (this.d * another.n),
			this.d * another.d
		);
	}

	/**
	 * Checks if two rational numbers are divisible.
	 */
	divisible(input: InputRational, arg2: number): boolean {
		return this.mod(input, arg2).n === 0;
	}

	/**
	 * Calculates the rational number to some rational exponent.
	 * For irrational results returns null.
	 */
	pow(input: InputRational, arg2?: number): Rational | null {
		const exponent = rational(input, arg2);
		const result = pow(this, exponent);

		return result
			? new Rational(result)
			: null;
	}
}

export function rational(input: Input | Rational = 0, denominator = 1): Rational {
	if (input instanceof Rational) {
		return input;
	}

	return new Rational(input, denominator);
}