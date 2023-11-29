/*
  1383 - Camelize
  -------
  by Denis (@denchiklut) #hard #union #recursion

  ### Question

  Implement Camelize which converts object from snake_case to to camelCase

  ```ts
  Camelize<{
    some_prop: string,
    prop: { another_prop: string },
    array: [{ snake_case: string }]
  }>

  // expected to be
  // {
  //   someProp: string,
  //   prop: { anotherProp: string },
  //   array: [{ snakeCase: string }]
  // }
  ```

  > View on GitHub: https://tsch.js.org/1383
*/

/* _____________ Your Code Here _____________ */

// Yoinks
type SnakeToCamel<
	S extends string,
	Cap extends boolean = false
> = S extends `${infer Head}_${infer Tail}`
	? `${Cap extends true ? Capitalize<Head> : Head}${SnakeToCamel<Tail, true>}`
	: Cap extends true
	  ? Capitalize<S>
	  : S;

type TerminalTypes = number | boolean | symbol | bigint | Function;

type Camelize<T> = {
	default: {
		[K in keyof T as Camelize<K>]: Camelize<T[K]>;
	};
	array: T extends [infer Head, ...infer Tail]
		? [Camelize<Head>, ...Camelize<Tail>]
		: [];
	string: SnakeToCamel<T & string>;
	terminal: T;
}[T extends any[]
	? "array"
	: T extends TerminalTypes
	  ? "terminal"
	  : T extends string
	    ? "string"
	    : /** default */
	      "default"];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
	Expect<
		Equal<
			Camelize<{
				some_prop: string;
				prop: { another_prop: string };
				array: [
					{ snake_case: string },
					{ another_element: { yet_another_prop: string } },
					{ yet_another_element: string }
				];
			}>,
			{
				someProp: string;
				prop: { anotherProp: string };
				array: [
					{ snakeCase: string },
					{ anotherElement: { yetAnotherProp: string } },
					{ yetAnotherElement: string }
				];
			}
		>
	>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1383/answer
  > View solutions: https://tsch.js.org/1383/solutions
  > More Challenges: https://tsch.js.org
*/
