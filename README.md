# Learn Crypto

Personal project to learn common cryptography.

Please don't use this for serious production apps! As the saying goes, [Don't roll your own](https://security.stackexchange.com/questions/18197/why-shouldnt-we-roll-our-own)

NOTE: only targeting es6 environments.

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
