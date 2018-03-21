import { decrypt, encrypt } from "./cipher";

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
  // it("message contains emoticons", () => {});
});
