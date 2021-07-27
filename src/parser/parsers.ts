import { roundRatio } from "@util/helpers";
import { Parser } from "@types";

/**
 * Parses a ratio from two integers.
 */
export const parseIntegers: Parser = (numerator, denominator = 1) => {
  if (typeof numerator !== "number" || !Number.isInteger(numerator) || !Number.isInteger(denominator)) {
    return null;
  }

  return roundRatio(numerator, denominator);
};

/**
 * Parses a ratio from float.
 */
export const parseFloat: Parser = (float) => {
  if (typeof float !== "number" || Number.isInteger(float)) {
    return null;  
  }

  const floatParts = float.toString().split(".");
  const denominator = 10 ** floatParts[1].length;
  let [ integral, fractional ] = floatParts.map(Number);
  
  return roundRatio(integral * denominator + fractional, denominator);
};

/**
 * Parses a ratio from tuple integer input.
 */
export const parseArray: Parser = (input) => {
  if (!Array.isArray(input) || !input.every(Number.isInteger)) {
    return null;
  }

  const [ n, d ] = input.map(Number);
  return roundRatio(n, d);
};

/**
 * Parses a ratio from object input.
 */
export const parseObject: Parser = input => {
  if (typeof input !== "object" || Array.isArray(input) || input === null) {
    return null;
  }

  const { n, d } = input;

  if (!n || !d) {
    return null;
  }
  
  return roundRatio(n, d);
}