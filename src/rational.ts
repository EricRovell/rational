import { parse } from "./parser";
import { detectRepeatingDecimal, ratio2repeatingDecimal } from "./repeating-decimal";
import { pow } from "./exponent";
import { lcm, round, ceil, floor, gcd } from "./utils";
import type { Input, InputRational, Ratio } from "./types";

/**
 * Provides functionality to store, transform, and manipulate the Rational numbers.
 */
export class Rational {
	private readonly parsed: Ratio | null;
	private readonly n: number;
	private readonly d: number;

	constructor(input: Input = 0, denominator = 1) {
		this.parsed = parse(input, denominator);
		const [ n = 0, d = 1 ] = this.parsed ?? [ 0, 1 ];
		this.n = n;
		this.d = d;
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
	 * Returns the rational number rounded up to the next largest decimal place.
	 */
	ceil(places = 0): number {
		return ceil(this.n / this.d, places);
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
	 * Returns continued fraction representation.
	 *
	 * https://en.wikipedia.org/wiki/Continued_fraction
	 */
	get continued() {
		const result: number[] = [];
		let [ a, b ] = [ Math.abs(this.n), Math.abs(this.d) ];

		do {
			result.push(Math.floor(a / b));
			[ a, b ] = [ b , a % b ];
		} while (a !== 1);

		return result;
	}

	/**
	 * Gets the denominator value of the fraction.
	 */
	get denominator(): number {
		return this.d;
	}

	/**
	 * Performs the division and returns the quotient as new `Rational` instance.
	 */
	div(input: InputRational, arg2?: number): Rational {
		return this.mul(rational(input, arg2).reciprocal);
	}

	/**
	 * Checks if two rational numbers are divisible.
	 */
	divisible(input: InputRational, arg2: number): boolean {
		return this.mod(input, arg2).n === 0;
	}

	/**
	 * Returns the rational number rounded down to the next smallest or equal decimal place.
	 */
	floor(places = 0): number {
		return floor(this.n / this.d, places);
	}

	/**
	 * Gets the fractional part of the rational number as a new `Rational` instance.
	 */
	get fractionalPart(): Rational {
		return new Rational([
			this.n - this.integralPart * this.d,
			this.d
		]);
	}

	/**
	 * Calculates the [GCD](https://en.wikipedia.org/wiki/Greatest_common_divisor) of two rational numbers
	 * and returns a new `Rational` instance.
	 */
	gcd(input: InputRational, arg2?: number): Rational {
		const another = rational(input, arg2);
		return new Rational(
			gcd(this.n, another.n),
			lcm(this.d, another.d)
		);
	}

	/**
	 * Gets the integral part of the rational number.
	 */
	get integralPart(): number {
		return this.sign * Math.floor(Math.abs(this.n) / this.d);
	}

	/**
	 * Calculates the [LCM](https://en.wikipedia.org/wiki/Least_common_multiple) of two rational numbers
	 * and returns a new `Rational` instance.
	 */
	lcm(input: InputRational, arg2?: number): Rational {
		const another = rational(input, arg2);
		return new Rational(
			lcm(this.n, another.n),
			gcd(this.d, another.d)
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
	 * Gets the numerator value of the fraction.
	 */
	get numerator(): number {
		return this.n;
	}

	/**
	 * Returns the opposite rational number as new `Rational` instance.
	 */
	get opposite(): Rational {
		return new Rational(-1 * this.n, this.d);
	}

	/**
	 * Returns the boolean indicating if the rational number could be represented
	 * as [proper](https://en.wikipedia.org/wiki/Fraction#Proper_and_improper_fractions) fraction.
	 */
	get proper(): boolean {
		return Math.abs(this.n) < Math.abs(this.d);
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

	/**
	 * Returns the [reciprocal](https://en.wikipedia.org/wiki/Fraction#Reciprocals_and_the_%22invisible_denominator%22)
	 * as new `Rational` instance.
	 */
	get reciprocal(): Rational {
		return new Rational([ this.d, this.n ]);
	}

	/**
	 * Returns the boolean indicating if the rational number
	 * could be represented by repeating decimal (do not terminates).
	 */
	get repeating(): boolean {
		return detectRepeatingDecimal(this);
	}

	/**
	 * Returns the rational number rounded to fixed decimal places.
	 */
	round(places = 0): number {
		return round(this.n / this.d, places);
	}

	/**
	 * Returns the sign of the rational number.
	 */
	get sign(): number {
		return Math.sign(this.n);
	}

	/**
	 * Performs the subtraction and returns the difference as new `Rational` instance.
	 */
	sub(input: InputRational, arg2?: number): Rational {
		return this.add(rational(input, arg2).opposite);
	}

	/**
	 * Returns a ratio string representation.
	 */
	toString(proper = false, places?: number): string {
		if (typeof places === "number" && places >= 0) {
			return this.repeating
				? ratio2repeatingDecimal(this.n, this.d)
				: this.round(places).toString();
		}

		if (!this.proper && proper) {
			return `${this.integralPart} ${this.fractionalPart.abs.toString(proper)}`;
		}

		return `${this.n}/${this.d}`;
	}

	/**
	 * Indicates whether or not the parsing was successful.
	 */
	get valid(): boolean {
		return this.parsed !== null;
	}

	/**
	 * Returns a decimal representation of a rational number.
	 *
	 * `rational(1, 2).valueOf()  // -> 0.5`
	 * `rational(18, 7).valueOf() // -> 2.5714285714285716`
	 */
	valueOf(places = 15): number {
		return this.round(places);
	}
}

/**
 * Provides functionality to store, transform, and manipulate the Rational numbers.
 */
export function rational(input: Input | Rational = 0, denominator = 1): Rational {
	if (input instanceof Rational) {
		return input;
	}

	return new Rational(input, denominator);
}
