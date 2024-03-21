/**
 * Fractional string regex.
 *
 * RegExp groups:
 * 	1. Optional integral value;
 * 	2. Numerator value value;
 *  3. Denominator value;
 *
 * Each value can be proceeded with optional sign symbol.
 *
 * Example: "23/98", "-23/56", "89/-5", "+5/+9", "1 23/45", "-5 +26/-48".
 */
export const matcherFraction = /^(?:([+-]?\d+)(?:\s+))?([+-]?\d+)\/([+-]?\d+)$/;

/**
 * Repeating decimal regex.
 *
 * RegExp groups:
 * 	1. Optional sign of the decimal (+|-);
 * 	2. Optional integral part;
 *  3. Optional non-repeating part of the decimal;
 *  4. Repeating part of the decimal;
 *
 *  ! Dot symbol and brackets are necessary.
 *
 * Example: -1.23(456) -> -23433/99900
 */
export const matcherRepeatingDecimal = /^([+-]?)?(\d*)?\.(\d*)?\((\d+)\)$/;

/**
 * Degrees string regex.
 *
 * RegExp groups:
 * 	1. Optional sign of the input (+|-);
 * 	2. Optional degrees value;
 *  3. Optional minutes value;
 *  4. Optional seconds value;
 *
 * Example: 123.45'67'' -> 123 degrees, 45 minutes, and 67 seconds.
 */
export const matcherDegrees = /^([+-])?(?:(\d*)(?:\.))?(?:(\d*)(?:'))?(?:(\d*)(?:''))?$/;
