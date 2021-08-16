# Rational

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
    <img alt="node version" src="https://badgen.net/npm/node/@ericrovell/rational/" />
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

Rational is JavaScript library for rational numbers manipulations.

## Features

- Chainable API;
- Immutable;
- Build-in Types;
- Dependency-free;

## Getting started

Package available via [npm](https://www.npmjs.com/package/@ericrovell/rational):

```
npm i @ericrovell/rational
```

```js
import { rational } from "@ericrovell/rational";

rational(2, 3).toString();           // -> "2/3"
rational([ 2, 3] ).toString();       // -> "2/3"
rational({ n: 2, d: 3 }).toString(); // -> "2/3"
```

## API

### Parsing

#### Parsing API

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

#### Supported input

There are two types of inputs: `Ratio` and `Fraction`.

Both can be represented by different data structures, but the main difference is that `Fraction` can include **integral** part while `Ratio` is just an ordered pair of numbers.

<details>
  <summary>
    <code>(n: int, d?: int = 1)</code>
  </summary>

  Parses the given input from *two integer arguments* and creates a new `Rational` instance.

  ```js
  rational(1, 2);
  ```
</details>

<details>
  <summary>
    <code>(input: float)</code>
  </summary>

  Parses the given *float* and creates a new `Rational` instance.

  ```js
  rational(0.5);
  ```
</details>

<details>
  <summary>
    <code>(input: [ n: int, d?: int = 1 ])</code>
  </summary>

  Parses the given ratio *(2-integer tuple)* and creates a new `Rational` instance.
  There is also a special case of integer input.

  ```js
  rational([ 1, 2 ]);
  rational([ 2 ]);
  ```
</details>

<details>
  <summary>
    <code>(input: { int?: number = 0, n: int, d?: int = 1 })</code>
  </summary>

  Parses the given *fraction* object and creates a new `Rational` instance.

  ```js
  rational({ n: 1, d: 2 });
  rational({ int: -1, n: 2, d: 3 });
  ```

  In case if integral part of the fraction specified it determines the sign of the result and
  the sign's of the numerator and denominator is ignored. 
</details>

<details>
  <summary>
    <code>(input: string)</code> as fraction
  </summary>

  Parses the given *fractional* string in form `int/int` and creates a new `Rational` instance.

  ```js
  rational("1/2");
  ```
</details>

<details>
  <summary>
    <code>(input: string)</code> as repeating decimal
  </summary>

  Parses the given *repeating decimal* string in form `{sign?}{int?}.{non-repeating}?({repeating})` and creates a new `Rational` instance.

  ```js
  rational(".(1)");      // ->  1/9
  rational("-0.1(2)");   // -> -2/15
  ```
</details>

<details>
  <summary>
    <code>(input: string)</code> as degrees value
  </summary>

  Parses the given *degrees value* string in form `{sign?}{degrees?}.{minutes'?}{seconds''?}` and creates a new `Rational` instance.

  ```js
  rational("1.12'5''").toString() // -> "173/144"
  rational("-1.2'5''").toString() // -> "-149/144"
  rational("7'5''").toString()    // -> "17/144"
  rational("-2'5''").toString()   // -> "-5/144"
  ```
</details>

#### Fractional input sign

Fractional inputs unlike ratio allow to specify an integral part. That complicates determining the sign of the Rational number. If specified integral part determines the output sign no matter what sign the numerator and the denominator have:

```js
rational("-1 2/3").sign   // -> -1
rational("-1 -2/3").sign  // -> -1
rational("-1 -2/-3").sign // -> -1
rational("1 +2/-3").sign  // ->  1
```

In case the integral part is ommited, the sign determined algebraically by ratio of numerator and denominator:

```js
rational("2/3").sign   // ->  1
rational("-2/3").sign  // -> -1
rational("2/-3").sign  // -> -1
rational("-2/-3").sign // ->  1
```

### Representation

<details>
  <summary>
    <code>.toString()</code>
  </summary>

  Returns a string representing a ratio.

  ```js
  rational(1, 2).toString() // -> "1/2";
  ```
</details>

### Properties

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
    <code>.numerator</code>
  </summary>

  Returns the numerator value of the rational number.

  ```js
  rational(1, 2).numerator; // -> 1
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

### Operations

<details>
  <summary>
    <code>.add(rational | Input)</code>
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
    <code>.sub(rational | Input)</code>
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
    <code>.mul(rational | Input)</code>
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
    <code>.div(rational | Input)</code>
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
    <code>.compare(rational | Input)</code>
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
    <code>.floor(places = 0)</code>
  </summary>

  Returns the rational number rounded down to the next smallest or equal decimal place.

  ```js
  rational(29, 7).floor() // -> 4
  rational(29, 7).floor(1) // -> 4.1
  rational(29, 7).floor(2) // -> 4.14
  ```
</details>