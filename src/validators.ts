export function isObject<T = Record<string, unknown>>(input: unknown): input is T {
	return (
		typeof input === "object" &&
		!Array.isArray(input) &&
		input !== null
	);
}
