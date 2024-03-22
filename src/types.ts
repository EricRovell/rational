import type { Rational } from "./rational";

/**
 * Represents a ratio.
 */
export type Ratio = [ numerator?: number, denominator?: number ];

/**
 * Defines an integer ratio when the "denominator" equals 1.
 */
export type IntegerRatio = [ numerator: number ];

/**
 * Represents a fraction.
 */
export interface Fraction<T = number> {
	sign?: T;
	int?: T;
	n: T;
	d?: T;
}

/**
 * Defines a fraction object with unknown types.
 */
export type FractionUnknown = Partial<Fraction<unknown>>;

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

export type InputObject =
	| Fraction
	| Degrees
	| RepeatingDecimal;

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
	| InputObject
	| Ratio
	| IntegerRatio
	| number
	| StringDegrees
	| StringFraction
	| StringRepeatingDecimal;

/**
 * Defines an input for operations where
 * Rational or input that can be transformed to Rational.
 */
export type InputRational = Input | Rational;

/**
 * Parser function that attempts to produce a Ratio.
 */
export type Parser<T = Input> = (numerator: T, denominator?: number) => Ratio | null;
