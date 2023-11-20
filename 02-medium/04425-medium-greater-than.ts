/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #medium #array

  ### Question

  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

  Negative numbers do not need to be considered.

  For example

  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```

  Good Luck!

  > View on GitHub: https://tsch.js.org/4425
*/

/* _____________ Your Code Here _____________ */

// Yoinks
type GetSymbol<
	A extends string,
	B extends string,
	F extends any[] = []
> = `${F["length"]}` extends A
	? `${F["length"]}` extends B
		? "="
		: "<"
	: `${F["length"]}` extends B
	  ? ">"
	  : GetSymbol<A, B, [...F, 1]>;

type GreaterThan<
	T extends number | string,
	U extends number | string,
	S extends ">" | "<" | "=" = "="
> = `${T}` extends `${infer A}${infer R1}`
	? `${U}` extends `${infer B}${infer R2}`
		? GreaterThan<R1, R2, S extends "=" ? GetSymbol<A, B> : S>
		: true
	: `${U}` extends `${any}${any}`
	  ? false
	  : S extends ">"
	    ? true
	    : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
	Expect<Equal<GreaterThan<1, 0>, true>>,
	Expect<Equal<GreaterThan<5, 4>, true>>,
	Expect<Equal<GreaterThan<4, 5>, false>>,
	Expect<Equal<GreaterThan<0, 0>, false>>,
	Expect<Equal<GreaterThan<10, 9>, true>>,
	Expect<Equal<GreaterThan<20, 20>, false>>,
	Expect<Equal<GreaterThan<10, 100>, false>>,
	Expect<Equal<GreaterThan<111, 11>, true>>,
	Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4425/answer
  > View solutions: https://tsch.js.org/4425/solutions
  > More Challenges: https://tsch.js.org
*/
