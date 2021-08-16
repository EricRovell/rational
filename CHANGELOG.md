# Rational

## 0.4.0 (Unreleased)

- [improvement]: fractional string input can include integral part separated with whitespace: "1 2/3";
- [feature]: new type of input, degrees/minutes/seconds string: (1.23'45'');

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