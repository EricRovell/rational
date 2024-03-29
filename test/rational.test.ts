import { describe, expect, it } from "vitest";
import { rational, Rational } from "../src";

describe("Rational constructor", () => {
	it("Accepts a class instance input", () => {
		const instance = new Rational(1, 2);
		expect(rational(instance).toString()).toBe("1/2");
	});
});

describe("Parsing", () => {
	it("Parses an integer input", () => {
		expect(rational().toString()).toBe("0/1");
		expect(rational(5).toString()).toBe("5/1");
		expect(rational(-2).toString()).toBe("-2/1");
	});
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
	it("Parses ratio input", () => {
		expect(rational([]).toString()).toBe("0/1");
		expect(rational([ 5, 8 ]).toString()).toBe("5/8");
		expect(rational([ 25, 8 ]).toString()).toBe("25/8");
		expect(rational([ 89, 2 ]).toString()).toBe("89/2");
		expect(rational([ 5 ]).toString()).toBe("5/1");
	});
	it("Parses fraction object input", () => {
		expect(rational({ n: 5 }).toString()).toBe("5/1");
		expect(rational({ n: -2 }).toString()).toBe("-2/1");
		expect(rational({ n: 5, d: 8 }).toString()).toBe("5/8");
		expect(rational({ n: -5, d: 8 }).toString()).toBe("-5/8");
		expect(rational({ n: 5, d: -8 }).toString()).toBe("-5/8");
		expect(rational({ n: 25, d: 8 }).toString()).toBe("25/8");
		expect(rational({ n: 89, d: 2 }).toString()).toBe("89/2");
		expect(rational({ int: 1, n: 5, d: 8 }).toString()).toBe("13/8");
		expect(rational({ int: -1, n: 7, d: 8 }).toString()).toBe("-15/8");
		expect(rational({ int: 1, n: -89, d: 2 }).toString()).toBe("91/2");
	});
	it("Parses repeating decimal object", () => {
		expect(rational({ repeat: "1" }).toString()).toBe("1/9");
		expect(rational({ repeat: 2 }).toString()).toBe("2/9");
		expect(rational({ nonrepeat: "0", repeat: "1" }).toString()).toBe("1/90");
		expect(rational({ nonrepeat: 0, repeat: 1 }).toString()).toBe("1/90");
		expect(rational({ nonrepeat: "0", repeat: 1 }).toString()).toBe("1/90");
		expect(rational({ nonrepeat: "12", repeat: "45" }).toString()).toBe("137/1100");
		expect(rational({ sign: -1, nonrepeat: "12", repeat: "45" }).toString()).toBe("-137/1100");
		expect(rational({ sign: 1, int: 0, nonrepeat: "12", repeat: "45" }).toString()).toBe("137/1100");
		expect(rational({ int: 10, nonrepeat: 1, repeat: 2 }).toString()).toBe("911/90");
		expect(rational({ sign: -1, int: 10, nonrepeat: 1, repeat: 2 }).toString()).toBe("-911/90");
		expect(rational({ int: 10, repeat: 2 }).toString()).toBe("92/9");
		expect(rational({ sign: -1, int: 10, repeat: 2 }).toString()).toBe("-92/9");
		expect(rational({ sign: -1, int: 10, repeat: "Hi!" }).toString()).toBe("0/1");
		expect(rational({ sign: -1, nonrepeat: "gh", repeat: "Hi!" }).toString()).toBe("0/1");
	});
	it("Parses degrees object input", () => {
		expect(rational({ deg: 1, min: 2, sec: 3 }).toString()).toBe("1241/1200");
		expect(rational({ min: 2, sec: 3 }).toString()).toBe("41/1200");
		expect(rational({ sec: 3 }).toString()).toBe("1/1200");
		expect(rational({ deg: 3 }).toString()).toBe("3/1");
		expect(rational({ deg: 2, sec: 2 }).toString()).toBe("3601/1800");
	});
	it("Parses fractional string", () => {
		expect(rational("1/2").toString()).toBe("1/2");
		expect(rational("4/12").toString()).toBe("1/3");
		expect(rational("27/9").toString()).toBe("3/1");
		expect(rational("-3/15").toString()).toBe("-1/5");
		expect(rational("28/-42").toString()).toBe("-2/3");
		expect(rational("1 1/2").toString()).toBe("3/2");
		expect(rational("-2 1/2").toString()).toBe("-5/2");
		expect(rational("2 -1/2").toString()).toBe("5/2");
		expect(rational("4 -4/-12").toString()).toBe("13/3");
	});
	it("Parses repeating decimal string", () => {
		expect(rational(".(1)").toString()).toBe("1/9");
		expect(rational(".0(1)").toString()).toBe("1/90");
		expect(rational(".12(45)").toString()).toBe("137/1100");
		expect(rational("-.12(45)").toString()).toBe("-137/1100");
		expect(rational("10.1(2)").toString()).toBe("911/90");
		expect(rational("+10.1(2)").toString()).toBe("911/90");
		expect(rational("10.(2)").toString()).toBe("92/9");
		expect(rational("-10.(2)").toString()).toBe("-92/9");
	});
	it("Parses degrees value string", () => {
		expect(rational("1.12'5''").toString()).toBe("173/144");
		expect(rational("-1.2'5''").toString()).toBe("-149/144");
		expect(rational("7'5''").toString()).toBe("17/144");
		expect(rational("-2'5''").toString()).toBe("-5/144");
		expect(rational("5''").toString()).toBe("1/720");
		expect(rational("-4''").toString()).toBe("-1/900");
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
	it("Provides information about unsupported input", () => {
		expect(rational(2 ** 53 + 1).valid).toBe(false);
		expect(rational("fggfg").valid).toBe(false);
		expect(rational("25/0").valid).toBe(false);
		expect(rational("4.5 25/0").valid).toBe(false);
		// @ts-expect-error testing wrong input
		expect(rational({ num: 25, den: 8 }).valid).toBe(false);
		// @ts-expect-error testing wrong input
		expect(rational([ 5, 2, 1 ]).valid).toBe(false);
		// @ts-expect-error testing wrong input
		expect(rational([ "str", "str" ]).valid).toBe(false);
		// @ts-expect-error testing wrong input
		expect(rational({ n: "O", d: "3" }).valid).toBe(false);
	});
	it("Do not accept zero as denominator", () => {
		expect(rational("56/0").valid).toBe(false);
		expect(rational(2, 0).valid).toBe(false);
		expect(rational([ 2, 0 ]).valid).toBe(false);
		expect(rational({ n: 2, d: 0 }).valid).toBe(false);
	});
});
describe("Representation", () => {
	it("Transforms a rational number into fractional string", () => {
		expect(rational(1, 2).toString()).toBe("1/2");
		expect(rational(58, 36).toString(true)).toBe("1 11/18");
		expect(rational(-58, -36).toString(true)).toBe("1 11/18");
		expect(rational(-58, 36).toString(true)).toBe("-1 11/18");
		expect(rational(58, -36).toString(true)).toBe("-1 11/18");
		expect(rational(58, 36).toString(false)).toBe("29/18");
		expect(rational(-58, -36).toString(false)).toBe("29/18");
		expect(rational(-58, 36).toString(false)).toBe("-29/18");
		expect(rational(58, -36).toString(false)).toBe("-29/18");
	});
	it("Transforms a rational number into decimal string", () => {
		expect(rational(1, 2).toString(false, 1)).toBe("0.5");
		expect(rational(3, 4).toString(false, 2)).toBe("0.75");
		expect(rational(3, 4).toString(false, 5)).toBe("0.75");
		expect(rational(-3, 4).toString(false, 5)).toBe("-0.75");
		expect(rational(3, -4).toString(false, 8)).toBe("-0.75");
	});
	it("Transforms a rational number into repeating decimal string", () => {
		expect(rational(1, 9).toString(false, 0)).toBe("0.(1)");
		expect(rational(58, 36).toString(false, 0)).toBe("1.6(1)");
		expect(rational(-58, 36).toString(false, 0)).toBe("-1.6(1)");
		expect(rational(58, -36).toString(false, 0)).toBe("-1.6(1)");
	});
	it("Transforms a rational number into decimal", () => {
		expect(rational(1, 2).valueOf()).toBe(0.5);
		expect(rational(25, -5).valueOf()).toBe(-5);
		expect(rational(18, 7).valueOf()).toBe(2.571428571428572);
		expect(rational(-7, 6).valueOf()).toBe(-1.166666666666667);
		expect(rational(18, 7).valueOf(10)).toBe(2.5714285714);
	});
	it("Transforms into a primitive value", () => {
		// @ts-expect-error test case
		expect(rational(1, 2) + rational(1, 4)).toBe(0.75);
		expect(+rational(1, 5)).toBe(0.2);
	});
	it("Returns a continued fraction representation", () => {
		expect(rational(0).continued).toEqual([ 0 ]);
		expect(rational(1).continued).toEqual([ 1 ]);
		expect(rational(-1).continued).toEqual([ 1 ]);
		expect(rational(415, 93).continued).toEqual([ 4, 2, 6, 7 ]);
		expect(rational(-415, 93).continued).toEqual([ 4, 2, 6, 7 ]);
		expect(rational(415, -93).continued).toEqual([ 4, 2, 6, 7 ]);
		expect(rational(-415, -93).continued).toEqual([ 4, 2, 6, 7 ]);
		expect(rational(649, 200).continued).toEqual([ 3, 4, 12, 4 ]);
	});
});
describe("Properties", () => {
	it("Returns the numerator", () => {
		expect(rational(25, 40).numerator).toBe(5);
		expect(rational([ 54, 12 ]).numerator).toBe(9);
		expect(rational({ n: 25, d: 40 }).numerator).toBe(5);
		expect(rational([ 11, 10 ]).numerator).toBe(11);
	});
	it("Returns the denominator", () => {
		expect(rational(25, 40).denominator).toBe(8);
		expect(rational([ 54, 12 ]).denominator).toBe(2);
		expect(rational({ n: 25, d: 40 }).denominator).toBe(8);
		expect(rational([ 11, 10 ]).denominator).toBe(10);
	});
	it("Returns the integral part", () => {
		expect(rational(25, 40).integralPart).toBe(0);
		expect(rational([ 54, 12 ]).integralPart).toBe(4);
		expect(rational({ n: 25, d: 40 }).integralPart).toBe(0);
		expect(rational([ 11, 10 ]).integralPart).toBe(1);
	});
	it("Returns the fractional part", () => {
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
	it("Calculates the reciprocal", () => {
		expect(rational(25, 40).reciprocal.toString()).toBe("8/5");
		expect(rational([ 54, 12 ]).reciprocal.toString()).toBe("2/9");
		expect(rational({ n: 25, d: 40 }).reciprocal.toString()).toBe("8/5");
		expect(rational([ 11, 10 ]).reciprocal.toString()).toBe("10/11");
	});
	it("Returns the sign", () => {
		expect(rational(1, 2).sign).toBe(1);
		expect(rational([ -5, 8 ]).sign).toBe(-1);
		expect(rational({ n: 25, d: -8 }).sign).toBe(-1);
		expect(rational({ n: -89, d: -2 }).sign).toBe(1);
	});
	it("Calculates the opposite rational number", () => {
		expect(rational(1, 2).opposite.sign).toBe(-1);
		expect(rational([ -5, 8 ]).opposite.sign).toBe(1);
		expect(rational({ n: 25, d: -8 }).opposite.sign).toBe(1);
		expect(rational({ n: -89, d: -2 }).opposite.sign).toBe(-1);
	});
	it("Detects the repeating decimal", () => {
		expect(rational(1, 2).repeating).toBe(false);
		expect(rational(1, 25).repeating).toBe(false);
		expect(rational(1, 9).repeating).toBe(true);
		expect(rational(23, 90).repeating).toBe(true);
		expect(rational(-156, 9990).repeating).toBe(true);
		expect(rational(1, 75).repeating).toBe(true);
	});
});
describe("Operations", () => {
	it("Performs summation", () => {
		expect(rational(1, 2).add(rational({ n: 1, d: 4 })).toString()).toBe("3/4");
		expect(rational({ n: 1, d: 2 }).add([ 1, 4 ]).toString()).toBe("3/4");
		expect(rational(7, 8).add({ n: 5, d: 6 }).toString()).toBe("41/24");
		expect(rational([ 7, 8 ]).add(5, 6).toString()).toBe("41/24");
	});
	it("Performs subtraction", () => {
		expect(rational(1, 2).sub(rational({ n: 1, d: 4 })).toString()).toBe("1/4");
		expect(rational({ n: 1, d: 2 }).sub([ 1, 4 ]).toString()).toBe("1/4");
		expect(rational(7, 8).sub({ n: 5, d: 6 }).toString()).toBe("1/24");
		expect(rational([ 7, 8 ]).sub(5, 6).toString()).toBe("1/24");
	});
	it("Performs multiplication", () => {
		expect(rational(1, 2).mul(rational({ n: 1, d: 4 })).toString()).toBe("1/8");
		expect(rational({ n: 1, d: 2 }).mul([ 1, 4 ]).toString()).toBe("1/8");
		expect(rational(7, 8).mul({ n: 5, d: 6 }).toString()).toBe("35/48");
		expect(rational([ 7, 8 ]).mul(5, 6).toString()).toBe("35/48");
	});
	it("Performs division", () => {
		expect(rational(1, 2).div(rational({ n: 1, d: 4 })).toString()).toBe("2/1");
		expect(rational({ n: 1, d: 2 }).div([ 1, 4 ]).toString()).toBe("2/1");
		expect(rational(7, 8).div({ n: 5, d: 6 }).toString()).toBe("21/20");
		expect(rational([ 7, 8 ]).div(5, 6).toString()).toBe("21/20");
	});
	it("Calculates the absolute value", () => {
		expect(rational(1, 2).abs.sign).toBe(1);
		expect(rational([ -5, 8 ]).abs.sign).toBe(1);
		expect(rational({ n: 25, d: -8 }).abs.sign).toBe(1);
		expect(rational({ n: -89, d: -2 }).abs.sign).toBe(1);
	});
	it("Performs the comparison", () => {
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
	it("Performs the rounding", () => {
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
	it("Performs the ceiling", () => {
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
	it("Performs the flooring", () => {
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
	it("Calculates the modulo", () => {
		expect(rational("13/3").mod("7/8").toString()).toBe("5/6");
		expect(rational("13/7").mod("19/11").toString()).toBe("10/77");
	});
	it("Calculates the mathematical modulo", () => {
		expect(rational("-13/3").mathmod("7/8").toString()).toBe("1/24");
		expect(rational("-13/7").mathmod("19/11").toString()).toBe("123/77");
	});
	it("Performs the exponentiation", () => {
		expect(rational(2).pow(-2)?.toString()).toBe("1/4");
		expect(rational(1, 2).pow(2)?.toString()).toBe("1/4");
		expect(rational(1, 2).pow(-2)?.toString()).toBe("4/1");
		expect(rational(2).pow("1/2")).toBeNull();
		expect(rational(0).pow("1/2")?.toString()).toBe("0/1");
		expect(rational(27).pow("2/3")?.toString()).toBe("9/1");
		expect(rational(243, 1024).pow(2, 5)?.toString()).toBe("9/16");
		expect(rational(-0.6).pow(4)?.toString()).toBe("81/625");
		expect(rational(1).pow("123/489")?.toString()).toBe("1/1");
		expect(rational(4, 7).pow(15, 26)).toBeNull();
		expect(rational(64, 49).pow(4, 8)?.toString()).toBe("8/7");
		expect(rational(-1, 2).pow(1, 2)).toBeNull();
		expect(rational(-0.2).pow(0.5)).toBeNull();
		expect(rational(1, 9).pow(1, 2)?.toString()).toBe("1/3");
		expect(rational(1, 9).pow(-1, 2)?.toString()).toBe("3/1");
	});
	it("Calculates the GCD", () => {
		expect(rational(5, 8).gcd(3, 7).toString()).toBe("1/56");
		expect(rational(2, 3).gcd(7, 5).toString()).toBe("1/15");
	});
	it("Calculates the LCM", () => {
		expect(rational(5, 8).lcm(3, 7).toString()).toBe("15/1");
	});
	it("Performs the divisibility check", () => {
		expect(rational(20, 8).divisible(1, 4)).toBe(true);
		expect(rational(-20, -8).divisible(1, -4)).toBe(true);
		expect(rational(-20, 8).divisible(-1, 4)).toBe(true);
		expect(rational(20, -8).divisible(1, 4)).toBe(true);
		expect(rational(98, 5).divisible(3, 2)).toBe(false);
		expect(rational(23, 9).divisible(69, -81)).toBe(true);
	});
});
