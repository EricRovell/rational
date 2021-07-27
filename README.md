# Rational

Rational is JavaScript library for rational numbers manipulations.

## Features

- Chainable API;
- Immutable;
- Build-in Types;
- Dependency-free;

## Getting started

```js
import { rational } from "rational";

rational(2, 3).toString();           // -> "2/3"
rational([ 2, 3] ).toString();       // -> "2/3"
rational({ n: 2, d: 3 }).toString(); // -> "2/3"
```

## API

### Parsing

<details>
  <summary>
    <code>rational(input)</code>
  </summary>

  Parses the given input and created a new `Rational` instance.

  ```js
  import { rational } from "rational";

  rational(1, 2);
  rational(0.5);
  rational([ 1, 2 ]);
  rational({ n: 1, d: 2 });
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
  import { rational } from "rational";

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
  import { rational } from "rational";

  rational(1, 2).numerator; // -> 1
  ```
</details>

<details>
  <summary>
    <code>.denominator</code>
  </summary>

  Returns the denominator value of the rational number.

  ```js
  import { rational } from "rational";

  rational(1, 2).denominator; // -> 2
  ```
</details>

<details>
  <summary>
    <code>.integralPart</code>
  </summary>

  Returns the integral part of the rational number.

  ```js
  import { rational } from "rational";

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
  import { rational } from "rational";

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
  import { rational } from "rational";

  rational(0, 2).sign;   // ->  0
  rational(-1, 2).sign;  // -> -1
  rational(1, -2).sign;  // -> -1
  rational(-1, -2).sign; // ->  1
  rational(1, 2).sign;   // ->  1
  ```
</details>