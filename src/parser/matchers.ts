/**
 * Fractional string regex.
 * 
 * Expression produces two groups: values for numerator and denominator,
 * each can be preceeded with minus or plus sign.
 * 
 * Example: 23/98, -23/56, 89/-5, +5/+9.
 */
export const matcherFraction = /^([+-]?\d+)\/([+-]?\d+)$/;