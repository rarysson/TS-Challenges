/*
  14188 - Run-length encoding
  -------
  by Hen Hedymdeith (@alfaproxima) #hard

  ### Question

  Given a `string` sequence of a letters f.e. `AAABCCXXXXXXY`. Return run-length encoded string `3AB2C6XY`.
  Also make a decoder for that string.

  > View on GitHub: https://tsch.js.org/14188
*/

/* _____________ Your Code Here _____________ */

// Yoinks
namespace RLE {
	type EncodeHelper<
		S extends string,
		P extends string = "",
		L extends 1[] = []
	> = S extends `${infer F}${infer R}`
		? F extends P
			? EncodeHelper<R, P, [1, ...L]>
			: P extends ""
			  ? EncodeHelper<R, F, [1]>
			  : L["length"] extends 1
			    ? `${P}${EncodeHelper<R, F, [1]>}`
			    : `${L["length"]}${P}${EncodeHelper<R, F, [1]>}`
		: P extends ""
		  ? ""
		  : L["length"] extends 1
		    ? P
		    : `${L["length"]}${P}`;
	export type Encode<S extends string> = EncodeHelper<S>;

	type DecodeHelper<
		S extends string,
		L extends string = ""
	> = S extends `${infer F}${infer R}`
		? F extends `${number}`
			? DecodeHelper<R, `${L}${F}`>
			: `${Repeat<F, L extends "" ? "1" : L>}${DecodeHelper<R, "">}`
		: "";
	type Repeat<
		S extends string,
		L extends string,
		C extends 1[] = []
	> = `${C["length"]}` extends L ? "" : `${S}${Repeat<S, L, [1, ...C]>}`;
	export type Decode<S extends string> = DecodeHelper<S>;
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
	// Raw string -> encoded string
	Expect<Equal<RLE.Encode<"AAABCCXXXXXXY">, "3AB2C6XY">>,

	// Encoded string -> decoded string
	Expect<Equal<RLE.Decode<"3AB2C6XY">, "AAABCCXXXXXXY">>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/14188/answer
  > View solutions: https://tsch.js.org/14188/solutions
  > More Challenges: https://tsch.js.org
*/
