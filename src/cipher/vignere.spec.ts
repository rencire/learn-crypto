import { decrypt, encrypt } from "./vignere";

describe("encrypt", () => {
  it("keyword length smaller than message", () => {
    const key = "bus";
    const msg = "runforest";
    const ciphertext = "ÔêáÈäåÇèç";

    expect(encrypt(msg, key)).toBe(ciphertext);
    expect(decrypt(ciphertext, key)).toBe(msg);
  });
  it("keyword length bigger than message", () => {
    const key = "overlord";
    const msg = "allhail";
    const ciphertext = "ÐâÑÚÍØÞ";

    expect(encrypt(msg, key)).toBe(ciphertext);
    expect(decrypt(ciphertext, key)).toBe(msg);
  });
  it("encrypting and decrypting emoticons", () => {
    const key = "pileoffoo";
    const msg = "💩💩💩";
    const ciphertext: string = encrypt(msg, key) as string;
    expect(decrypt(ciphertext, key)).toBe(msg);
  });
});
