import * as vignere from "./vignere";

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
