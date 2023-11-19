/*
  599 - Merge
  -------
  by ZYSzys (@ZYSzys) #medium #object

  ### Question

  Merge two types into a new type. Keys of the second type overrides keys of the first type.

  For example

  ```ts
  type foo = {
    name: string;
    age: string;
  }
  type coo = {
    age: number;
    sex: string
  }

  type Result = Merge<foo,coo>; // expected to be {name: string, age: number, sex: string}
  ```

  > View on GitHub: https://tsch.js.org/599
*/

/* _____________ Your Code Here _____________ */

type GetObject<T> = {
	[P in keyof T]: T[P];
};

type OverrideProperty<T, U extends Record<any, any>> = {
	[P in keyof T]: T[P] extends never ? U[P] : T[P];
};

type Merge<F, S extends Record<any, any>> = OverrideProperty<
	GetObject<F & S>,
	S
>;

type t = Merge<Foo, Bar>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type Foo = {
	a: number;
	b: string;
};
type Bar = {
	b: number;
	c: boolean;
};

type cases = [
	Expect<
		Equal<
			Merge<Foo, Bar>,
			{
				a: number;
				b: number;
				c: boolean;
			}
		>
	>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/599/answer
  > View solutions: https://tsch.js.org/599/solutions
  > More Challenges: https://tsch.js.org
*/
