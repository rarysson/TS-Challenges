/*
  545 - printf
  -------
  by null (@Bestmain-YS) #hard #template-literal

  ### Question

  Implement `Format<T extends string>` generic.

  For example,

  ```ts
  type FormatCase1 = Format<"%sabc"> // FormatCase1 : string => string
  type FormatCase2 = Format<"%s%dabc"> // FormatCase2 : string => number => string
  type FormatCase3 = Format<"sdabc"> // FormatCase3 :  string
  type FormatCase4 = Format<"sd%abc"> // FormatCase4 :  string
  ```

  > View on GitHub: https://tsch.js.org/545
*/

/* _____________ Your Code Here _____________ */

type ControlsMap = {
	s: "string";
	d: "number";
};

type ParsePrintFormat<S extends string> =
	S extends `${string}%${infer Letter}${infer Rest}`
		? Letter extends keyof ControlsMap
			? [ControlsMap[Letter], ...ParsePrintFormat<Rest>]
			: ParsePrintFormat<Rest>
		: [];

type GetType<S> = S extends "string" ? string : number;

type GetValue<T> = T extends []
	? string
	: T extends [infer Head, ...infer Tail]
	  ? (x: GetType<Head>) => GetValue<Tail>
	  : string;

type Format<T extends string> = GetValue<ParsePrintFormat<T>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
	Expect<Equal<Format<"abc">, string>>,
	Expect<Equal<Format<"a%sbc">, (s1: string) => string>>,
	Expect<Equal<Format<"a%dbc">, (d1: number) => string>>,
	Expect<Equal<Format<"a%%dbc">, string>>,
	Expect<Equal<Format<"a%%%dbc">, (d1: number) => string>>,
	Expect<Equal<Format<"a%dbc%s">, (d1: number) => (s1: string) => string>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/545/answer
  > View solutions: https://tsch.js.org/545/solutions
  > More Challenges: https://tsch.js.org
*/
