import { factorize } from "@util/helpers";
import type { Rational } from "../rational";

/**
 * Detects if the given rational number is terminated decimal.
 */
export function detectRepeatingDecimal(rational: Rational): boolean {
	const factors = factorize(rational.denominator);
	for (const factor of Object.keys(factors)) {
		if (factor !== "2" && factor !== "5") {
			return true;
		}
	}

	return false;
}