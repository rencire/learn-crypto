// Current max code point (alphabet size) for unicode standard is 0x10FFF, or 1114111
// Note:
// - need to polyfill `String.fromCodePoint` for ie11
import "core-js/library/fn/string/from-code-point";

const N: number = 1114111;

const mod = (n: number, m: number): number => {
  return (n % m + m) % m;
};

export const encrypt = (msg: string, key: string): string | Error => {
  // Repeat or shrink key to same size as message
  const m: number = msg.length;
  const k: number = key.length;

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

  // Our one line algorithm
  const sumCodePnts: number[] = keyCodePnts.map((e, i): number =>
    mod(e + msgCodePnts[i], N)
  );

  return sumCodePnts.map((cp): string => String.fromCodePoint(cp)).join("");
};

export const decrypt = (ciphertext: string, key: string): string | Error => {
  // Repeat or shrink key to same size as message
  const m: number = ciphertext.length;
  const k: number = key.length;

  // Both ciphertext and key need to be non-empty
  if (k <= 0 || m <= 0) {
    return new Error("Cipher Message and Key must be non-empty strings");
  }

  const n: number = Math.ceil(m / k);

  const repeatedKey: string = k >= m ? key : key.repeat(n);
  const normalizedKey: string = repeatedKey.slice(0, m);

  const ciphertextCodePnts: Array<number | any> = [...ciphertext].map(cp =>
    cp.codePointAt(0)
  );
  const keyCodePnts: Array<number | any> = [...normalizedKey].map(cp =>
    cp.codePointAt(0)
  );

  // Our one line algorithm
  const sumCodePnts: number[] = keyCodePnts.map((e, i): number =>
    mod(ciphertextCodePnts[i] - e, N)
  );

  return sumCodePnts.map((cp): string => String.fromCodePoint(cp)).join("");
};
