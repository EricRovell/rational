import { gcd, lcm } from "@util/helpers";

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
});