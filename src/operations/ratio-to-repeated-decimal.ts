/**
 * Converts a ratio to repeated decimal string.
 * If resulting decimal is terminating, returns an empty string instead.
 * 
 * Example:
 * 	
 * 	1. (12, 90) -> "0.1(3)"
 * 	2. (1, 2)   -> ""
 */
export function ratio2repeatingDecimal(n: number, d: number): string {
	let result = "";

	/**
	 * To store already seen remainers as Map<key: position, value: remainder>
	 * Position is needed for cases like 1/6, as the recurring sequence does not
	 * start from the 1st remainder.
	 */
	const remainders = new Map<number, number>();
	remainders.clear();
  
	const int = Math.floor(n / d);
	let remainder = n % d;

	/**
	 * Keeps finding until it terminates with zero or repeats.
	 */
	while (remainder != 0 && !remainders.has(remainder)) {
		remainders.set(remainder, result.length);
  
		remainder = remainder * 10;
  
		const result_part = Math.floor(remainder / d);
		result += result_part.toString();
  
		remainder = remainder % d;
	}
  
	if (remainder == 0) {
		return "";
	} else if (remainders.has(remainder)) {
		const position = remainders.get(remainder);
		const nonrepeat = result.slice(0, position);
		const repeat = result.slice(position);
		return `${int}.${nonrepeat}(${repeat})`;
	}

	return "";
}