/*
  5360 - Unique
  -------
  by Pineapple (@Pineapple0919) #medium #array

  ### Question

  Implement the type version of Lodash.uniq, Unique<T> takes an Array T, returns the Array T without repeated values.

  ```ts
  type Res = Unique<[1, 1, 2, 2, 3, 3]>; // expected to be [1, 2, 3]
  type Res1 = Unique<[1, 2, 3, 4, 4, 5, 6, 7]>; // expected to be [1, 2, 3, 4, 5, 6, 7]
  type Res2 = Unique<[1, "a", 2, "b", 2, "a"]>; // expected to be [1, "a", 2, "b"]
  type Res3 = Unique<[string, number, 1, "a", 1, string, 2, "b", 2, number]>; // expected to be [string, number, 1, "a", 2, "b"]
  type Res4 = Unique<[unknown, unknown, any, any, never, never]>; // expected to be [unknown, any, never]
  ```

  > View on GitHub: https://tsch.js.org/5360
*/

/* _____________ Your Code Here _____________ */

type Includes<Type extends readonly any[], Value> = Type extends readonly [
	infer Head,
	...infer Tail
]
	? Equal<Head, Value> extends true
		? true
		: Includes<Tail, Value>
	: false;

type Unique<T, A extends readonly any[] = []> = T extends [
	infer Head,
	...infer Tail
]
	? Includes<A, Head> extends false
		? Unique<Tail, [...A, Head]>
		: Unique<Tail, A>
	: A;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
	Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
	Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
	Expect<Equal<Unique<[1, "a", 2, "b", 2, "a"]>, [1, "a", 2, "b"]>>,
	Expect<
		Equal<
			Unique<[string, number, 1, "a", 1, string, 2, "b", 2, number]>,
			[string, number, 1, "a", 2, "b"]
		>
	>,
	Expect<
		Equal<
			Unique<[unknown, unknown, any, any, never, never]>,
			[unknown, any, never]
		>
	>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5360/answer
  > View solutions: https://tsch.js.org/5360/solutions
  > More Challenges: https://tsch.js.org
*/
