/* eslint-disable @typescript-eslint/ban-ts-comment */
import { rational } from "@";

describe("Parsing", () => {
	it("Parses two integer input", () => {
		expect(rational(5, 8).toString()).toBe("5/8");
		expect(rational(25, 8).toString()).toBe("25/8");
		expect(rational(89, 2).toString()).toBe("89/2");
	});
	it("Parses float input", () => {
		expect(rational(1.01).toString()).toBe("101/100");
		expect(rational(0.05).toString()).toBe("1/20");
		expect(rational(3.2558).toString()).toBe("16279/5000");
	});
	it("Parses tuple input", () => {
		expect(rational([ 5, 8 ]).toString()).toBe("5/8");
		expect(rational([ 25, 8 ]).toString()).toBe("25/8");
		expect(rational([ 89, 2 ]).toString()).toBe("89/2");
		expect(rational([ 5 ]).toString()).toBe("5/1");
	});
	it("Parses object input", () => {
		expect(rational({ n: 5, d: 8 }).toString()).toBe("5/8");
		expect(rational({ n: 25, d: 8 }).toString()).toBe("25/8");
		expect(rational({ n: 89, d: 2 }).toString()).toBe("89/2");
	});
	it("The ratio simplified correctly", () => {
		expect(rational([ 25, 40 ]).toString()).toBe("5/8");
		expect(rational([ 54, 12 ]).toString()).toBe("9/2");
	});
	it("Handles the ratio's sign", () => {
		expect(rational(1, 2).toString()).toBe("1/2");
		expect(rational([ -5, 8 ]).toString()).toBe("-5/8");
		expect(rational({ n: 25, d: -8 }).toString()).toBe("-25/8");
		expect(rational({ n: -89, d: -2 }).toString()).toBe("89/2");
	});
	it("Tells about unsupported input", () => {
		// @ts-expect-error
		expect(rational("fggfg").valid).toBe(false);
		// @ts-expect-error
		expect(rational({ num: 25, den: 8 }).valid).toBe(false);
		// @ts-expect-error
		expect(rational([ 5, 2, 1 ]).valid).toBe(false);
	});
	it("Do not accept zero as denominator", () => {
		expect(rational(2, 0).valid).toBe(false);
		expect(rational([ 2, 0 ]).valid).toBe(false);
		expect(rational({ n: 2, d: 0 }).valid).toBe(false);
	});
});

describe("Properties", () => {
	it("Calculates the integral part", () => {
		expect(rational(25, 40).integralPart).toBe(0);
		expect(rational([ 54, 12 ]).integralPart).toBe(4);
		expect(rational({ n: 25, d: 40 }).integralPart).toBe(0);
		expect(rational([ 11, 10 ]).integralPart).toBe(1);
	});
	it("Calculates the fractional part", () => {
		expect(rational(25, 40).fractionalPart.toString()).toBe("5/8");
		expect(rational([ 54, 12 ]).fractionalPart.toString()).toBe("1/2");
		expect(rational({ n: 25, d: 40 }).fractionalPart.toString()).toBe("5/8");
		expect(rational([ 11, 10 ]).fractionalPart.toString()).toBe("1/10");
	});
	it("Defines the proper fraction", () => {
		expect(rational(25, 40).proper).toBe(true);
		expect(rational([ 54, 12 ]).proper).toBe(false);
		expect(rational({ n: 25, d: 40 }).proper).toBe(true);
		expect(rational([ 11, 10 ]).proper).toBe(false);
	});
	it("Creates the reciprocal", () => {
		expect(rational(25, 40).reciprocal.toString()).toBe("8/5");
		expect(rational([ 54, 12 ]).reciprocal.toString()).toBe("2/9");
		expect(rational({ n: 25, d: 40 }).reciprocal.toString()).toBe("8/5");
		expect(rational([ 11, 10 ]).reciprocal.toString()).toBe("10/11");
	});
	it("Returns the ratio's sign", () => {
		expect(rational(1, 2).sign).toBe(1);
		expect(rational([ -5, 8 ]).sign).toBe(-1);
		expect(rational({ n: 25, d: -8 }).sign).toBe(-1);
		expect(rational({ n: -89, d: -2 }).sign).toBe(1);
	});
	it("Creates the opposite rational number", () => {
		expect(rational(1, 2).opposite.sign).toBe(-1);
		expect(rational([ -5, 8 ]).opposite.sign).toBe(1);
		expect(rational({ n: 25, d: -8 }).opposite.sign).toBe(1);
		expect(rational({ n: -89, d: -2 }).opposite.sign).toBe(-1);
	});
});

describe("Operations", () => {
	it("Adds two rational numbers", () => {
		expect(rational(1, 2).add(rational({ n: 1, d: 4 })).toString()).toBe("3/4");
		expect(rational({ n: 1, d: 2 }).add([ 1, 4 ]).toString()).toBe("3/4");
		expect(rational(7, 8).add({ n: 5, d: 6 }).toString()).toBe("41/24");
		expect(rational([ 7, 8 ]).add(5, 6).toString()).toBe("41/24");
	});
	it("Subtracts two rational numbers", () => {
		expect(rational(1, 2).sub(rational({ n: 1, d: 4 })).toString()).toBe("1/4");
		expect(rational({ n: 1, d: 2 }).sub([ 1, 4 ]).toString()).toBe("1/4");
		expect(rational(7, 8).sub({ n: 5, d: 6 }).toString()).toBe("1/24");
		expect(rational([ 7, 8 ]).sub(5, 6).toString()).toBe("1/24");
	});
	it("Multiplies two rational numbers", () => {
		expect(rational(1, 2).mul(rational({ n: 1, d: 4 })).toString()).toBe("1/8");
		expect(rational({ n: 1, d: 2 }).mul([ 1, 4 ]).toString()).toBe("1/8");
		expect(rational(7, 8).mul({ n: 5, d: 6 }).toString()).toBe("35/48");
		expect(rational([ 7, 8 ]).mul(5, 6).toString()).toBe("35/48");
	});
	it("Divides two rational numbers", () => {
		expect(rational(1, 2).div(rational({ n: 1, d: 4 })).toString()).toBe("2/1");
		expect(rational({ n: 1, d: 2 }).div([ 1, 4 ]).toString()).toBe("2/1");
		expect(rational(7, 8).div({ n: 5, d: 6 }).toString()).toBe("21/20");
		expect(rational([ 7, 8 ]).div(5, 6).toString()).toBe("21/20");
	});
	it("Returns the absolute value of the rational number", () => {
		expect(rational(1, 2).abs.sign).toBe(1);
		expect(rational([ -5, 8 ]).abs.sign).toBe(1);
		expect(rational({ n: 25, d: -8 }).abs.sign).toBe(1);
		expect(rational({ n: -89, d: -2 }).abs.sign).toBe(1);
	});
	it("Compares the rational numbers", () => {
		expect(rational(1, 2).compare(1, 2)).toBe(0);
		expect(rational(1, 2).compare(8, 2)).toBe(-1);
		expect(rational(1, 2).compare(1, 3)).toBe(1);
		expect(rational([ 14, 16 ]).compare([ 7, 8 ])).toBe(0);
		expect(rational([ 21, 5 ]).compare([ 28, 6 ])).toBe(-1);
		expect(rational([ 25, 2 ]).compare([ 121, 11 ])).toBe(1);
		expect(rational(4.35).compare(4.350)).toBe(0);
		expect(rational(-4.25).compare(10.11)).toBe(-1);
		expect(rational(4.250001).compare(4.25)).toBe(1);
	});
});