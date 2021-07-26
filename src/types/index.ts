/**
 * Represents a ratio.
 */
export type Ratio = [ numerator: number, denominator: number ];

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
  | number;

/**
 * Parser function that attempts to produce a Ratio.
 */
export type Parser = (numerator: Input, denominator?: number) => Ratio | null;