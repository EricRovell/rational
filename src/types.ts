import type { Rational } from "./rational";

/**
 * Represents a ratio tuple.
 */
export type Ratio = [ numerator?: number, denominator?: number ];

/**
 * Defines an integer ratio when the "denominator" equals 1.
 */
export type IntegerRatio = [ numerator: number ];

/**
 * Represents a fraction.
 */
export interface Fraction {
	sign?: number;
	int?: number;
	n: number;
	d?: number;
}

export interface Degrees {
	deg?: number;
	min?: number;
	sec?: number;
}

export interface RepeatingDecimal {
	sign?: number;
	int?: number | string;
	nonrepeat?: string | number;
	repeat: string | number;
}

export type StringDegrees =
	| `${number}.${number}'${number}''`
	| `${number}.${number}'`
	| `${number}.${number}''`
	| `${number}`;

export type StringFraction =
	| `${number}/${number}`
	| `${number} ${number}/${number}`;

export type StringRepeatingDecimal =
	| `.(${number})`
	| `.${number}(${number})`
	| `${number}.(${number})`
	| `${number}.${number}(${number})`;

/**
 * Valid user input to build a Rational number from.
 */
export type Input =
	| Degrees
	| Fraction
	| IntegerRatio
	| number
	| RepeatingDecimal
	| StringDegrees
	| StringFraction
	| StringRepeatingDecimal
	| Ratio;

/**
 * Defines an input for operations where
 * Rational or input that can be transformed to Rational.
 */
export type InputRational = Input | Rational;

/**
 * Parser function that attempts to produce a Ratio.
 */
export type Parser<T = Input> = (numerator: T, denominator?: number) => Ratio | null;
