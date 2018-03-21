// NOTE:
// - need to polyfill `String.fromCodePoint` for ie11
import "core-js/library/fn/string/from-code-point";

// Current max code point (alphabet size) for unicode standard is 0x10FFF, or 1114111
const N: number = 1114111;

const mod = (n: number, m: number): number => {
  return (n % m + m) % m;
};

export const encryptOrDecrypt = (
  msg: string,
  key: string,
  operator: (a: number, b: number) => number
): string | Error => {
  // Repeat or shrink key to same size as message
  // - Beware of `String.length` with unicode:
  // https://ponyfoo.com/articles/es6-strings-and-unicode-in-depth
  // - Workaround to get length: `spread` the string, since its `iterable`
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol
  const m: number = [...msg].length;
  const k: number = [...key].length;

  // Both msg and key need to be non-empty
  if (k <= 0 || m <= 0) {
    return new Error("Message and Key must be non-empty strings");
  }

  const n: number = Math.ceil(m / k);

  const repeatedKey: string = k >= m ? key : key.repeat(n);
  const normalizedKey: string = repeatedKey.slice(0, m);

  const msgCodePnts: Array<number | any> = [...msg].map(cp =>
    cp.codePointAt(0)
  );
  const keyCodePnts: Array<number | any> = [...normalizedKey].map(cp =>
    cp.codePointAt(0)
  );

  // Algorithm: Add or Subtract
  // https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher#Algebraic_description
  const sumCodePnts: number[] = keyCodePnts.map((codePnt, i): number =>
    mod(operator(codePnt, msgCodePnts[i]), N)
  );

  return sumCodePnts.map((cp): string => String.fromCodePoint(cp)).join("");
};

export const encrypt = (msg: string, key: string): string | Error =>
  encryptOrDecrypt(msg, key, (a, b) => a + b);

export const decrypt = (ciphertext: string, key: string): string | Error =>
  encryptOrDecrypt(ciphertext, key, (a, b) => b - a);
