/*
  459 - Flatten
  -------
  by zhouyiming (@chbro) #medium #array

  ### Question

  In this challenge, you would need to write a type that takes an array and emitted the flatten array type.

  For example:

  ```ts
  type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
  ```

  > View on GitHub: https://tsch.js.org/459
*/

/* _____________ Your Code Here _____________ */

// type GetValue<T> = T extends any[] ? GetValue<T[0]> : T;

// type Flatten<T> = T extends [infer Head, ...infer Tail]
// 	? Tail["length"] extends 0
// 		? [GetValue<T>]
// 		: [GetValue<Head>, ...Flatten<Tail>]
// 	: T;

// Almost got it, but I couldn't find a way to flatten when I had a deep array with multiple values, so I copied a solution
type Flatten<S extends any[], T extends any[] = []> = S extends [
	infer X,
	...infer Y
]
	? X extends any[]
		? Flatten<[...X, ...Y], T>
		: Flatten<[...Y], [...T, X]>
	: T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
	Expect<Equal<Flatten<[]>, []>>,
	Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
	Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
	Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
	Expect<
		Equal<
			Flatten<[{ foo: "bar"; 2: 10 }, "foobar"]>,
			[{ foo: "bar"; 2: 10 }, "foobar"]
		>
	>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/459/answer
  > View solutions: https://tsch.js.org/459/solutions
  > More Challenges: https://tsch.js.org
*/
