/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #medium #object

  ### Question

  Get an `Object` that is the difference between `O` & `O1`

  > View on GitHub: https://tsch.js.org/645
*/

/* _____________ Your Code Here _____________ */

type Object = Record<any, any>;

type RemoveEquals<U, A extends Object, B extends Object> = {
	[P in keyof U as unknown extends A[P]
		? P
		: unknown extends B[P]
		  ? P
		  : never]: U[P];
};

type Diff<O extends Object, O1 extends Object> = RemoveEquals<O & O1, O, O1>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type Foo = {
	name: string;
	age: string;
};
type Bar = {
	name: string;
	age: string;
	gender: number;
};
type Coo = {
	name: string;
	gender: number;
};

type cases = [
	Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
	Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
	Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
	Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/645/answer
  > View solutions: https://tsch.js.org/645/solutions
  > More Challenges: https://tsch.js.org
*/
