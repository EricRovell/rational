import type { Rational } from "../rational";

/**
 * Represents a ratio.
 */
export type Ratio = [ numerator: number, denominator: number ];

/**
 * Defines an integer ratio when the "denominator" equals 1.
 */
export type IntegerRatio = [ numerator: number ];

/**
 * Represents a fraction.
 */
export interface Fraction {
  n: number;
  d: number;
}

/**
 * Valid user input to build a Rational number from.
 */
export type Input =
  | Fraction
  | Ratio
  | IntegerRatio
  | number;

/**
 * Defines an input for operations where
 * Rational or input that can be transformed to Rational.
 */
export type InputRational = Input | Rational;

/**
 * Parser function that attempts to produce a Ratio.
 */
export type Parser = (numerator: Input, denominator?: number) => Ratio | null;