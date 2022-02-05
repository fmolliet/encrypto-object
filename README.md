# Encrypto-object
> Library for Encrypt payloads in Node.js, using built-in Node Native [Crypto][1].
> Uses AES 256(GCM mode) cipher with simetric Cryptography.

[![Language](https://img.shields.io/github/languages/top/fmolliet/encrypto-object)](https://img.shields.io/github/languages/top/fmolliet/encrypto-object)
[![Vulnerabiliy](https://img.shields.io/snyk/vulnerabilities/npm/encrypto-object)](https://img.shields.io/snyk/vulnerabilities/npm/encrypto-object)
[![Size](https://img.shields.io/github/repo-size/fmolliet/encrypto-object)](https://img.shields.io/github/repo-size/fmolliet/encrypto-object)
[![Issues](https://img.shields.io/github/issues/fmolliet/encrypto-object)](https://img.shields.io/github/issues/fmolliet/encrypto-object)
[![Downloads](https://img.shields.io/npm/dm/encrypto-object)](https://img.shields.io/npm/dm/encrypto-object)



## Usage

```bash
$ npm i encrypto-object
```

- **(Using typescript) Cryptograph payload and creating cryptogram:**

```javascript
import EncryptoObject from 'encrypto-object';

(async ()=>{

    const cryptogram = await new EncryptoObject().setData({testing: "1234"}).serialize();
    
    console.log(cryptogram)
    // The console output will be something like: OHV6bGR0N1JNVDc4dDk0YnYwT0VlVGRxN2tqL3gxL3U3WWIrUmlScW5OVWVqZXUyMHBYeTJuUW03T3FJQ3JmNlZuWUdzWVQxemd4UUl4WWRGQ1kwSWE2ZWdUcGVCSXM9I0pNMi9aajYrUWxSRFBoNUVWUi92M1E9PSNMbTBTT1VZUmZBMWRuWGUwZE5US0ZBPT0
)();
```

- **(Using typescript) Opening payload and creating instance:**

```javascript
import EncryptoObject from 'encrypto-object';

(async ()=>{

    // cryptogram = OHV6bGR0N1JNVDc4dDk0YnYwT0VlVGRxN2tqL3gxL3U3WWI ...
    const loader = await new CryptoObject().deserialize(cryptogram); 
    
)();
```

**More docs will be provided soon.**

----

## Run the tests

```bash
$ npm install -g jest
$ npm test
```

## Contributing?

```bash
$ npm run lint
```

## Owners

- [@fmolliet][2]

## License

> The MIT License

[1]: https://nodejs.org/api/crypto.html
[2]: https://github.com/fmolliet
