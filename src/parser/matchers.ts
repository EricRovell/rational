/**
 * Fractional string regex.
 * 
 * Expression produces two groups: values for numerator and denominator,
 * each can be preceeded with minus or plus sign.
 * 
 * Example: 23/98, -23/56, 89/-5, +5/+9.
 */
export const matcherFraction = /^([+-]?\d+)\/([+-]?\d+)$/;

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