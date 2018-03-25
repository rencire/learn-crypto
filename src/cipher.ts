import * as vignere from "./cipher/vignere.js";

export const createCipher = (cipher: string): object => {
  let strategy;
  switch (cipher) {
    // Todo
    // case 'caeser':
    //   return
    case "vignere":
    default:
      strategy = vignere;
  }
  return {
    decrypt: strategy.decrypt,
    encrypt: strategy.encrypt
  };
};
