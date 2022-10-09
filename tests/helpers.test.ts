import { describe, expect, it } from "vitest";
import { gcd, lcm, factorize } from "../src/util/helpers";
import { ratio2repeatingDecimal } from "../src/operations";

describe("GCD/LCM test", () => {
	it("GCD cases", () => {
		expect(gcd(2, 3)).toBe(1);
		expect(gcd(0, 0)).toBe(0);
		expect(gcd(1, 0)).toBe(1);
		expect(gcd(0, 1)).toBe(1);
		expect(gcd(1, 1)).toBe(1);
		expect(gcd(5, 5)).toBe(5);
		expect(gcd(12, 0)).toBe(12);
		expect(gcd(16, 40)).toBe(8);
		expect(gcd(252, 105)).toBe(21);
		expect(gcd(105, 252)).toBe(21);
		expect(gcd(7966496, 314080416)).toBe(32);
		expect(gcd(24826148, 45296490)).toBe(526);
	});
	it("LCM cases", () => {
		expect(lcm(2, 3)).toBe(6);
		expect(lcm(1, 1)).toBe(1);
		expect(lcm(5, 5)).toBe(5);
		expect(lcm(16, 40)).toBe(80);
		expect(lcm(252, 105)).toBe(1260);
		expect(lcm(248, 45296)).toBe(1404176);
	});
	it("Calculates the prime factorization", () => {
		expect(factorize(18)).toMatchObject({ 2: 1, 3: 2 });
		expect(factorize(15)).toMatchObject({ 3: 1, 5: 1 });
		expect(factorize(4)).toMatchObject({ 2: 2 });
	});
	it("Transforms a ratio to repeating decimal, if possible", () => {
		expect(ratio2repeatingDecimal(1, 2)).toBe("");
		expect(ratio2repeatingDecimal(12, 90)).toBe("0.1(3)");
		expect(ratio2repeatingDecimal(45, 77)).toBe("0.(584415)");
		expect(ratio2repeatingDecimal(120, 33)).toBe("3.(63)");
	});
});
