/*
  8804 - Two Sum
  -------
  by PsiloLau (@Psilocine) #hard #array #math

  ### Question

  Given an array of integers `nums` and an integer `target`, return true if two numbers such that they add up to `target`.

  > View on GitHub: https://tsch.js.org/8804
*/

/* _____________ Your Code Here _____________ */

// Yoinks
// 1. get permutations from an array
type Permutation<T> = T extends [infer One, ...infer Rest]
	? [One, ...Permutation<Rest>] | [...Permutation<Rest>, One]
	: [];

// 3. get first two elems from an array
type GetFirstTwo<T> = T extends T
	? T extends [infer One, infer Two, ...infer Rest]
		? [One, Two]
		: never
	: never;

// 4. combine GetFirstTwo and Permutations then we get
//    all possibles of number addition in an array
type GetAllPossibles<T> = GetFirstTwo<Permutation<T>>;

// 6. get result of add two number
type CreateTuple<
	S extends number,
	Res extends 1[] = []
> = Res["length"] extends S ? Res : CreateTuple<S, [...Res, 1]>;
type Add<A extends number, B extends number> = [
	...CreateTuple<A>,
	...CreateTuple<B>
]["length"];

// 8. GetAllPossibles as a union R,
//    expand union R then find if Add<One, Two> extends target number,
//    then we got result like: true | never | never | never
type FindPossible<T, U, R = GetAllPossibles<T>> = R extends R
	? R extends [infer One, infer Two]
		? Add<One & number, Two & number> extends U
			? true
			: never
		: never
	: never;

// 9. if result contains not never, then it contains a true
type TwoSum<T extends number[], U extends number> = [
	FindPossible<T, U>
] extends [never]
	? false
	: FindPossible<T, U>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
	Expect<Equal<TwoSum<[3, 3], 6>, true>>,
	Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
	Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
	Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
	Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
	Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
	Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
	Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
	Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
	Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
	Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
	Expect<Equal<TwoSum<[3, 2, 0], 2>, true>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8804/answer
  > View solutions: https://tsch.js.org/8804/solutions
  > More Challenges: https://tsch.js.org
*/
