# Learn Crypto

Personal project to (re)learn common cryptography.

Please don't use this for serious production apps! As the saying goes, [Don't roll your own](https://security.stackexchange.com/questions/18197/why-shouldnt-we-roll-our-own)

// NOTE: Code needs to be run in an environment with `String.fromCodePoint`.
// Might need to polyfill if environment is missing the function (e.g, IE11)
// import "core-js/fn/string/from-code-point";

## TODO

* [ ] publish package to npm

## Quick start

```
npm install learn-crypto
import { createCipher } from 'learn-crypto'

const cipher = createCipher();

const key = "super_secret_key"
const msg = "super_secret_message"
const ciphertext = cipher.encrypt(msg, key)
// "æÊÆäÊè¾ØÊìæÆÊ×"
const msg = cipher.decrypt(ciphertext, key)
// "super_secret_message"
```
