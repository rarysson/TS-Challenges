/*
  9286 - FirstUniqueCharIndex
  -------
  by jiangshan (@jiangshanmeta) #medium #string

  ### Question

  Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1. (Inspired by [leetcode 387](https://leetcode.com/problems/first-unique-character-in-a-string/))

  > View on GitHub: https://tsch.js.org/9286
*/

/* _____________ Your Code Here _____________ */

type StringToTuple<S extends string> = S extends `${infer Char}${infer Rest}`
	? [Char, ...StringToTuple<Rest>]
	: [];

type FirstUniqueCharIndex<
	T extends string,
	A extends any[] = []
> = T extends `${infer Head}${infer Tail}`
	? Head extends StringToTuple<Tail>[number]
		? FirstUniqueCharIndex<Tail, [...A, Head]>
		: Tail extends ""
		  ? -1
		  : Head extends A[number]
		    ? FirstUniqueCharIndex<Tail, [...A, Head]>
		    : A["length"]
	: -1;

type t = FirstUniqueCharIndex<"aabb">;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
	Expect<Equal<FirstUniqueCharIndex<"leetcode">, 0>>,
	Expect<Equal<FirstUniqueCharIndex<"loveleetcode">, 2>>,
	Expect<Equal<FirstUniqueCharIndex<"aabb">, -1>>,
	Expect<Equal<FirstUniqueCharIndex<"">, -1>>,
	Expect<Equal<FirstUniqueCharIndex<"aaa">, -1>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9286/answer
  > View solutions: https://tsch.js.org/9286/solutions
  > More Challenges: https://tsch.js.org
*/
