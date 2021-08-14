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
	it("Parses string with fractional form", () => {
		expect(rational("1/2").toString()).toBe("1/2");
		expect(rational("4/12").toString()).toBe("1/3");
		expect(rational("27/9").toString()).toBe("3/1");
		expect(rational("-3/15").toString()).toBe("-1/5");
		expect(rational("28/-42").toString()).toBe("-2/3");
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
		expect(rational("fggfg").valid).toBe(false);
		expect(rational("25/0").valid).toBe(false);
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
	it("Rounds the value of rational number", () => {
		expect(rational(1, 2).round()).toBe(1);
		expect(rational(1, 3).round()).toBe(0);
		expect(rational(3, 4).round()).toBe(1);
		expect(rational(9, 5).round()).toBe(2);
		expect(rational(21, -4).round()).toBe(-5);
		expect(rational(23, 8).round(1)).toBe(2.9);
		expect(rational(23, 8).round(2)).toBe(2.88);
		expect(rational(23, 8).round(3)).toBe(2.875);
		expect(rational(23, 8).round(5)).toBe(2.875);
		expect(rational(43, 9).round(7)).toBe(4.7777778);
	});
	it("Ceils the value of rational number", () => {
		expect(rational(1, 2).ceil()).toBe(1);
		expect(rational(1, 3).ceil()).toBe(1);
		expect(rational(3, 4).ceil()).toBe(1);
		expect(rational(9, 5).ceil()).toBe(2);
		expect(rational(21, -4).ceil()).toBe(-5);
		expect(rational(29, 7).ceil(1)).toBe(4.2);
		expect(rational(29, 7).ceil(2)).toBe(4.15);
		expect(rational(29, 7).ceil(3)).toBe(4.143);
		expect(rational(29, 7).ceil(5)).toBe(4.14286);
		expect(rational(43, 9).ceil(7)).toBe(4.7777778);
	});
	it("Ceils the value of rational number", () => {
		expect(rational(1, 2).floor()).toBe(0);
		expect(rational(1, 3).floor()).toBe(0);
		expect(rational(3, 4).floor()).toBe(0);
		expect(rational(9, 5).floor()).toBe(1);
		expect(rational(21, -4).floor()).toBe(-6);
		expect(rational(29, 7).floor(1)).toBe(4.1);
		expect(rational(29, 7).floor(2)).toBe(4.14);
		expect(rational(29, 7).floor(3)).toBe(4.142);
		expect(rational(29, 7).floor(5)).toBe(4.14285);
		expect(rational(43, 9).floor(7)).toBe(4.7777777);
	});
});