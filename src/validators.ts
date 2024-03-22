import { Degrees, Fraction, Ratio, RepeatingDecimal } from "./types";

export function isDegreesObject(value: unknown): value is Degrees {
	if (!isObject(value)) {
		return false;
	}

	return (
		Object.hasOwn(value, "deg") ||
		Object.hasOwn(value, "min") ||
		Object.hasOwn(value, "sec")
	);
}

export function isFloat(value: unknown): value is number {
	return typeof value === "number" && !Number.isInteger(value);
}

export function isFractionObject(value: unknown): value is Fraction {
	if (!isObject(value)) {
		return false;
	}

	return (
		Object.hasOwn(value, "n") ||
		Object.hasOwn(value, "d")
	);
}

export function isNonEmptyString(value: unknown): value is string {
	return typeof value === "string" && value.length > 0;
}

export function isObject(input: unknown): input is object {
	return typeof input === "object" && !Array.isArray(input) && input !== null;
}

export function isRatio(value: unknown): value is Ratio {
	return (
		Array.isArray(value) &&
		(value.length === 1 || value.length == 2) &&
		value.every(isValidInteger)
	);
}

export function isRepeatingDecimalObject(value: unknown): value is RepeatingDecimal {
	return isObject(value) && Object.hasOwn(value, "repeat");
}

export function isValidInteger(value: unknown): value is number {
	return (
		typeof value === "number" &&
		Number.isInteger(value) &&
		value <= Number.MAX_SAFE_INTEGER &&
		value >= Number.MIN_SAFE_INTEGER
	);
}
