export function isNonEmptyString(value: unknown): value is string {
	return typeof value === "string" && value.length > 0;
}

export function isObject(input: unknown): input is object {
	return typeof input === "object" && !Array.isArray(input) && input !== null;
}

export function isValidInteger(value: unknown): value is number {
	return (
		typeof value === "number" &&
		Number.isInteger(value) &&
		value <= Number.MAX_SAFE_INTEGER &&
		value >= Number.MIN_SAFE_INTEGER
	);
}
