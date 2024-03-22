# Rational

## 1.0.1 (2024-03-22)

- [chore]: update dependencies and building processes;
- [chore]: bundle type definitions into one file;

## 1.0.0 (2022-10-11)

- [breaking]: `.toDecimalString()` and `.toFractionString()` is removed in favor for improved `.toString()` method to not duplicate the functionality;
- [feat]: expose input types for a user;
- [feat]: improve `.valueOf(places?)` method with optional argument to round the decimal approximation;
- [feat]: implement `.continued` for continued fraction representation;

## 0.5.2 (2021-08-25)

- [fix]: Incorrect ESM Module path;

## 0.5.1 (2021-08-22)

- [improvement]: Improved test coverage to 99.63%;
- [fix]: Invalid results for exponentiation;
- [fix]: Invalid type handling for repeating decimal inputs;

## 0.5.0 (2021-08-19)

- [feature]: new type of input, degrees value object;
- [feature]: new type of input, repeating decimal object;
- [feature]: `.repeating` property for [repeating decimals](https://en.wikipedia.org/wiki/Repeating_decimal) checks;
- [fix]: invalid `.proper` property check for negative rationals;
- [feature]: `.toDecimalString(places)` method for transforming rational numbers into decimal strings. Handles repeating decimals;
- [feature]: `.toFractionString()` method for transforming rational numbers into fractional strings. Differs from `.toString()` by producing proper fractions by default;
- [fix]: `.integralPart` invalid calculation for negative values;
- [feature]: `.gcd()` method for calculating [GCD](https://en.wikipedia.org/wiki/Greatest_common_divisor) of two rational numbers;
- [feature]: `.lcm()` method for calculating [LCM](https://en.wikipedia.org/wiki/Least_common_multiple) of two rational numbers;
- [feature]: `.divisible()` method for divisibility checks;
- [feature]: `.valueOf()` method for transformation into decimal and coercion;

## 0.4.0 (2021-08-17)

- [improvement]: fractional string input can include integral part separated with whitespace: "1 2/3";
- [feature]: new type of input, degrees/minutes/seconds string: (1.23'45'');
- [feature]: `.mod()` method for calculating the modulo of two rational numbers;
- [feature]: `.mathmod()` method for calculating the [mathematical correct modulo](https://en.wikipedia.org/wiki/Modulo_(mathematics)) of two rational numbers;
- [feature]: `.pow()` method for exponentiation of rational numbers.

## 0.3.0 (2021-08-15)

- [feature]: new type of input, string in a form of fraction ("1/2");
- [feature]: new type of input, string in a form of [repeating decimal](https://en.wikipedia.org/wiki/Repeating_decimal) (".(1)", "1.23(456)");
- [improvement]: fractional object type extended, now the parser handles [the integral parts of the fraction](https://github.com/EricRovell/rational#supported-input);

## 0.2.0 (2021-08-13)

- [improvement]: CommonJS support;
- [feature]: `.abs` property to get absolute value of the rational number;
- [feature]: comparison between rational numbers via `.compare(rational)` method;
- [feature]: `.round()`, `.ceil()`, and `floor()` method to perform round operations on rational numbers;
- [fix]: package types inferred properly;

## 0.1.0 (2021-07-29)

- Basic API;
