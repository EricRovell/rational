<div align="center">
  <img
    alt="Set of rational numbers symbol"
    src="assets/logo.svg"
    width="125px"
    height="125px"
    padding="25px"
  />
</div>

<div align="center">
  <a href="https://github.com/EricRovell/rational/actions">
    <img alt="build action status" src="https://github.com/EricRovell/rational/workflows/build/badge.svg" />
  </a>
  <a href="https://codecov.io/gh/EricRovell/rational">
    <img src="https://codecov.io/gh/EricRovell/rational/branch/main/graph/badge.svg?token=OCTMR1R41W"/>
  </a>
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/@ericrovell/rational">
    <img alt="npm package version" src="https://badgen.net/npm/v/@ericrovell/rational/" />
  </a>
  <a href="https://www.npmjs.com/package/@ericrovell/rational">
    <img alt="types included" src="https://badgen.net/npm/types/@ericrovell/rational/" />
  </a>
  <a href="https://www.npmjs.com/package/@ericrovell/rational">
    <img alt="downloads count" src="https://badgen.net/npm/dt/@ericrovell/rational/" />
  </a>
  <a href="https://www.npmjs.com/package/@ericrovell/rational">
    <img alt="licence" src="https://badgen.net/npm/license/@ericrovell/rational/" />
  </a>
</div>

<div align="center">
  <a href="https://bundlephobia.com/package/@ericrovell/rational">
    <img alt="minified size" src="https://badgen.net/bundlephobia/min/@ericrovell/rational/" />
  </a>
  <a href="https://bundlephobia.com/package/@ericrovell/rational">
    <img alt="minzipped size" src="https://badgen.net/bundlephobia/minzip/@ericrovell/rational/" />
  </a>
  <a href="https://bundlephobia.com/package/@ericrovell/rational">
    <img alt="dependency count" src="https://badgen.net/bundlephobia/dependency-count/@ericrovell/rational/" />
  </a>
  <a href="https://bundlephobia.com/package/@ericrovell/rational">
    <img alt="tree-shaking" src="https://badgen.net/bundlephobia/tree-shaking/@ericrovell/rational/" />
  </a>
</div>

# Rational

Rational is JavaScript library for rational numbers manipulations.

## Features

- Build-in Types;
- Dependency-free;
- Extendable;
- Feature rich;
- Immutable;
- Simple chainable API;
- Types included;
- Works in a browser and Node.js;

## Getting started

Package available via [npm](https://www.npmjs.com/package/@ericrovell/rational):

```
npm i @ericrovell/rational
```

```js
import { rational } from "@ericrovell/rational";

rational(2, 3).toString();            // -> "2/3"
rational([ 2, 3] ).toString();        // -> "2/3"
rational({ n: 2, d: 3 }).toString();  // -> "2/3"
```

## Parsing

<details>
  <summary>
    <code>rational(input)</code>
  </summary>

  Parses the given input and created a new `Rational` instance.

  ```js
  rational(1, 2);
  rational(0.5);
  rational([ 1, 2 ]);
  rational([ 1 ]);
  rational({ n: 1, d: 2 });
  rational("1/2");
  rational("-1/2");
  rational("+3/-2");
  rational(".(1)");
  rational("-0.1(2)");
  rational("1.23(456)");
  rational("1.12'5''");
  rational("7'5''");
  ```
</details>

### Supported input

<details>
  <summary>
    <code>(n?: int = 0, d?: int = 1)</code>
  </summary>

  Parses the given input from *two integer arguments* and returns a new `Rational` instance.

  ```js
  rational(1, 2); // 1/2
  rational(5);    // 5/1
  ```
</details>

<details>
  <summary>
    <code>(input: float)</code>
  </summary>

  Parses the given *float* and returns a new `Rational` instance.

  ```js
  rational(0.5); // 1/2
  ```
</details>

<details>
  <summary>
    <code>(input: [ n: int = 0, d?: int = 1 ])</code>
  </summary>

  Parses the given ratio from *(2-integer tuple)* and returns a new `Rational` instance.

  ```js
  rational([]);        // 0/1
  rational([ 2 ]);     // 2/1
  rational([ 1, 2 ]);  // 1/2
  ```
</details>

<details>
  <summary>
    <code>(input: { int?: number = 0, n: int, d?: int = 1 })</code>
  </summary>

  Parses the given `Fraction` object and returns a new `Rational` instance.

  ```js
  rational({ n: -1, d: 2 });          // -1/2
  rational({ int: -1, n: 2, d: 3 });  // -1 2/3
  ```

  Note: integral part if specified determines the sign of the result.

  ```js
  rational({ int: -1, n: -2, d: 3 });  // -1 2/3
  ```
</details>

<details>
  <summary>
    <code>(input: StringFraction)</code>
  </summary>

  Parses the given *fractional* string in form `{sign?}{int?} {sign?}{numerator}/{sign?}{denominator}` and returns a new `Rational` instance.

  ```js
  rational("1/2");    // 1/2
  rational("1 1/2");  // 1 1/2
  rational("-2 1/4"); // -2 1/4
  ```

  Note: integral part if specified determines the sign of the result.

  ```js
  rational("-2 -1/4"); // -2 1/4
  ```
</details>

<details>
  <summary>
    <code>(input: RepeatingDecimal)</code>
  </summary>

  Parses the given `RepeatingDecimal` object and returns a new `Rational` instance.

  ```js
  rational({ sign: -1, int: 1, nonrepeat: "2", repeat: "3" }); //  -7/30
  rational({ repeat: 5 });                                     // 5/9
  ```
</details>

<details>
  <summary>
    <code>(input: StringRepeatingDecimal)</code>
  </summary>

  Parses the given *repeating decimal* string in form `{sign?}{int?}.{non-repeating}?({repeating})` and returns a new `Rational` instance.

  ```js
  rational(".(1)");    //  1/9
  rational("-0.1(2)"); // -2/15
  ```
</details>

<details>
  <summary>
    <code>(input: Degrees)</code>
  </summary>

  Parses the given `Degrees` object and returns a new `Rational` instance.

  ```js
  rational({ deg: 1, min: 1, sec: 1 }); // 3661/3600
  rational({ sec: 7 });                 // 7/60
  ```
</details>

<details>
  <summary>
    <code>(input: StringDegrees)</code>
  </summary>

  Parses the given *degrees* string in form `{sign?}{degrees?}.{minutes'?}{seconds''?}` and returns a new `Rational` instance.

  ```js
  rational("1.12'5''") //  173/144
  rational("-1.2'5''") // -149/144
  rational("7'5''")    //   17/144
  rational("-2'5''")   //   -5/144
  ```
</details>

## API

<details>
  <summary>
    <code>.abs</code>
  </summary>

  Returns the absolute value of the rational number as new `Rational` instance.

  ```js
  rational(0, 2).abs.toString();   // -> "0/2"
  rational(-1, 2).abs.toString();  // -> "1/2"
  rational(1, -2).abs.toString();  // -> "1/2"
  rational(-1, -2).abs.toString(); // -> "1/2"
  rational(1, 2).abs.toString();   // -> "1/2"
  ```
</details>

<details>
  <summary>
    <code>.add(Rational | Input)</code>
  </summary>

  Performs the addition and returns the sum as new `Rational` instance.

  ```js
  rational(1, 2)
    .add(1, 4)
    .toString(); // -> "3/4"

  rational(1, 2)
    .add(rational(1, 4))
    .toString(); // -> "3/4"
  ```
</details>

<details>
  <summary>
    <code>.ceil(places = 0)</code>
  </summary>

  Returns the rational number rounded up to the next largest decimal place.

  ```js
  rational(29, 7).ceil() // -> 5
  rational(29, 7).ceil(1) // -> 4.2
  rational(29, 7).ceil(2) // -> 4.15
  ```
</details>

<details>
  <summary>
    <code>.compare(Rational | Input)</code>
  </summary>

  Compares the rational number with another. Results are interpreted as:

	- comparable is greater ->  1;
	- comparable is smaller -> -1;
	- comparable is equal   ->  0.

  ```js
  rational(1, 2).compare(2, 4); // ->  0
  rational(1, 2).compare(3, 4); // -> -1
  rational(1, 2).compare(1, 4); // ->  1
  ```

  Non-strict inequalities can be performed as such:

  ```js
  rational.compare(1/2) >= 0 the same as >=
  rational.compare(1/2) <= 0 the same as <=
  ```
</details>

<details>
  <summary>
    <code>.continued</code>
  </summary>

  Returns the [continued fraction](https://en.wikipedia.org/wiki/Continued_fraction) representation of the rational.
  The first element holds the integral part.

  ```js
  rational(415, 93).continued // -> [ 4, 2, 6, 7 ]
  ```
</details>

<details>
  <summary>
    <code>.denominator</code>
  </summary>

  Returns the denominator value of the rational number.

  ```js
  rational(1, 2).denominator; // -> 2
  ```
</details>

<details>
  <summary>
    <code>.div(Rational | Input)</code>
  </summary>

  Performs the division and returns the quotien as new `Rational` instance.

  ```js
  rational(1, 2)
    .div(1, 4)
    .toString(); // -> "2/1"

  rational(1, 2)
    .div(rational(1, 4))
    .toString(); // -> "2/1"
  ```
</details>

<details>
  <summary>
    <code>.divisible(Rational | Input)</code>
  </summary>

  Checks if two rational numbers are divisible.

  ```js
  rational(1, 2).divisible(1, 4) // -> true
  rational(5, 8).divisible(2, 7) // -> false
  ```
</details>

<details>
  <summary>
    <code>.floor(places = 0)</code>
  </summary>

  Returns the rational number rounded down to the next smallest or equal decimal place.

  ```js
  rational(29, 7).floor() // -> 4
  rational(29, 7).floor(1) // -> 4.1
  rational(29, 7).floor(2) // -> 4.14
  ```
</details>

<details>
  <summary>
    <code>.fractionalPart</code>
  </summary>

  Returns the fractional part of the rational number as a new `Rational` instance.

  ```js
  rational(1, 2).fractionalPart.toString(); // -> "1/2"
  rational(3, 2).fractionalPart.toString(); // -> "1/2"
  ```
</details>

<details>
  <summary>
    <code>.gcd(Rational | Input)</code>
  </summary>

  Calculates the [GCD](https://en.wikipedia.org/wiki/Greatest_common_divisor) of two rational numbers and returns a new `Rational` instance.

  ```js
  rational(5, 8).gcd(3, 7) // 1/56
  rational(2, 3).gcd(7, 5) // 1/15
  ```
</details>

<details>
  <summary>
    <code>.integralPart</code>
  </summary>

  Returns the integral part of the rational number.

  ```js
  rational(1, 2).integralPart; // -> 0
  rational(3, 2).integralPart; // -> 1
  ```
</details>

<details>
  <summary>
    <code>.lcm(Rational | Input)</code>
  </summary>

  Calculates the [LCM](https://en.wikipedia.org/wiki/Least_common_multiple) of two rational numbers and returns a new `Rational` instance.

  ```js
  rational(5, 8).lcm(3, 7) // 15/1
  ```
</details>

<details>
  <summary>
    <code>.mathmod(Rational | Input)</code>
  </summary>

  Calculates the [mathematical correct modulo](https://en.wikipedia.org/wiki/Modulo_(mathematics)) of two rational numbers.

  ```js
  rational("-13/3").mathmod("7/8")   // -> 1/24
  rational("-13/7").mathmod("19/11") // -> 123/77
  ```
</details>

<details>
  <summary>
    <code>.mod(Rational | Input)</code>
  </summary>

  Calculates the modulo of two rational numbers.

  ```js
  rational("13/3").mod("7/8").toString()   // -> "5/6"
  rational("13/7").mod("19/11").toString() // -> "10/77"
  ```
</details>

<details>
  <summary>
    <code>.mul(Rational | Input)</code>
  </summary>

  Performs the multiplication and returns the product as new `Rational` instance.

  ```js
  rational(1, 2)
    .mul(1, 4)
    .toString(); // -> "1/8"

  rational(1, 2)
    .mul(rational(1, 4))
    .toString(); // -> "1/8"
  ```
</details>

<details>
  <summary>
    <code>.numerator</code>
  </summary>

  Returns the numerator value of the rational number.

  ```js
  rational(1, 2).numerator; // -> 1
  ```
</details>

<details>
  <summary>
    <code>.opposite</code>
  </summary>

  Returns the opposite rational number as new `Rational` instance.

  ```js
  rational(0, 2).opposite.toString();   // -> "0/2"
  rational(-1, 2).opposite.toString();  // -> "1/2"
  rational(1, -2).opposite.toString();  // -> "1/2"
  rational(-1, -2).opposite.toString(); // -> "-1/2"
  rational(1, 2).opposite.toString();   // -> "-1/2"
  ```
</details>

<details>
  <summary>
    <code>.proper</code>
  </summary>

  Returns the boolean indicating if the rational number could be represented as [proper](https://en.wikipedia.org/wiki/Fraction#Proper_and_improper_fractions) fraction.

  ```js
  rational(1, 2).proper; // -> true;
  rational(3, 2).proper; // -> false;
  ```
</details>

<details>
  <summary>
    <code>.pow(Rational | Input)</code>
  </summary>

  Calculates the exponentiation result of two rational numbers.
  If the result is rational returns a new `Rational` instance.
  If the result **irrational** the `null` returned instead.

  ```js
  rational(27).pow(2, 3)?.toString() // -> "9/1"
  rational(2).pow(1, 2)?.toString()  // -> null
  ```
</details>

<details>
  <summary>
    <code>.reciprocal</code>
  </summary>

  Returns the [reciprocal](https://en.wikipedia.org/wiki/Fraction#Reciprocals_and_the_%22invisible_denominator%22) as new `Rational` instance.

  ```js
  rational(1, 2).reciprocal.toString(); // -> "2/1";
  rational(3, 2).reciprocal.toString(); // -> "3/2";
  ```
</details>

<details>
  <summary>
    <code>.repeating</code>
  </summary>

  Returns the boolean indicating if the rational number could be represents a [repeating decimal](https://en.wikipedia.org/wiki/Repeating_decimal).

  ```js
  rational(1, 3).repeating; // -> true;
  rational(1, 4).repeating; // -> false;
  ```
</details>

<details>
  <summary>
    <code>.round(places = 0)</code>
  </summary>

  Returns the rational number rounded to fixed decimal places.

  ```js
  rational(23, 8).round() // -> 3
  rational(23, 8).round(1) // -> 2.9
  rational(23, 8).round(2) // -> 2.88
  ```
</details>

<details>
  <summary>
    <code>.sign</code>
  </summary>

  Returns the sign of the rational number.

  ```js
  rational(0, 2).sign;   // ->  0
  rational(-1, 2).sign;  // -> -1
  rational(1, -2).sign;  // -> -1
  rational(-1, -2).sign; // ->  1
  rational(1, 2).sign;   // ->  1
  ```
</details>

<details>
  <summary>
    <code>.sub(Rational | Input)</code>
  </summary>

  Performs the subtraction and returns the difference as new `Rational` instance.

  ```js
  rational(1, 2)
    .sub(1, 4)
    .toString(); // -> "1/4"

  rational(1, 2)
    .sub(rational(1, 4))
    .toString(); // -> "1/4"
  ```
</details>

<details>
  <summary>
    <code>.toString(proper = false, places?: number)</code>
  </summary>

  Returns a `Ratio` string representation.

  ```js
  rational(1, 2).toString()                  // -> "1/2";
  rational("1 1/2").toString()               // -> "3/2";
  rational({ int: 1, n: 1, d: 3}).toString() // -> "4/3";
  rational("0.12(34)").toString()            // -> "611/4950";
  ```

  To get a proper fraction string, use the first argument:

  ```js
  rational("1 1/2").toString(true)                    // -> "1 1/2";
  rational(1, 2).toString(true)                       // -> "1/2";
  rational({ int: 1, n: 1, d: 3 }).toString(true)      // -> "1 1/3";
  ```

  If the second argument is provided, the decimal string is returned.
  The value represents number of places:

  ```js
  rational(1, 2).toString(false, 1)                    // -> "0.5";
  rational("1 1/2").toString(false, 5)                 // -> "1.5";
  ```

  In case the rational is a repeating decimal, it's representation is preserved:

  ```js
  rational("1 1/3").toString(false, 5)   // -> "1.(3)";
  ```
</details>

<details>
  <summary>
    <code>.valid</code>
  </summary>

  Returns a boolean indicating the parsing operation success.
  On failed attempt the rational number defaults to 0.

  ```js
  rational(1, 2).valid;  // -> true
  rational("hi!").valid; // -> false
  ```
</details>

<details>
  <summary>
    <code>.valueOf(places = 15)</code>
  </summary>

  Returns a rational number decimal approximation:

  ```js
  rational(1, 2).valueOf()                     // -> 0.5;
  rational("1 1/2").valueOf()                  // -> 1.5;
  rational({ int: 1, n: 1, d: 3}).valueOf(5)   // -> 1.33333;
  rational("0.12(34)").valueOf()               // -> 0.123434343434343;
  ```

  Method is useful for coercion:

  ```js
  rational(1, 2) + rational(1, 4) // -> 0.75
  +rational(1, 5) // -> 0.2
  ```
</details>

## Extending

To extend the functionality for your needs, [extend](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends) the parent `Rational` class:

```js
import { Rational } from "@ericrovell/rational";

class RationalExtended extends Rational {
	constructor(input: Input = 0, denominator = 1) {
		super(input, denominator);
	}

	get ratio() {
		return [ this.numerator, this.denominator ];
	}
}

const instance = new RationalExtended(1, 2);
instance.ratio; // -> [ 1, 2 ]
```

## Types

Tha package includes all necessary types useful for all possible valid input options are available for import:

```ts
export type {
	Degrees,
	Fraction,
	Ratio,
	RepeatingDecimal,
	StringDegrees,
	StringFraction,
	StringRepeatingDecimal
} from "@ericrovell/rational";
```

## Tests

To run the tests use the `npm run test` command.
