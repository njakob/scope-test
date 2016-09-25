
# scope-test

[![NPM version][npm-status-image]][npm]

Simple util to test collections of granted scope against required one.

## Features

* Isomorphic module
* Error with missing scopes
* Case insensitive option
* Flowtype definition

## Installation

[![NPM](npm-install-image)](npm)

```
$ npm install scope-test
```

## Usage

```javascript
import { scopeTest } from 'scope-test';

try {
 scopeTest([ 'email' ], {
   requiredScopes: [ 'email', 'profile' ],
   ignoreCase: true
 }); 
} catch (err) {
  console.log(err.missingScopes);
}
```

## Licences

Scope-test is licensed under the [MIT License](licence).

[licence]: LICENSE
[npm]: https://nodei.co/npm/scope-test/
[npm-install-image]: https://nodei.co/npm/scope-test.png?downloads=true
[npm-status-image]: https://img.shields.io/npm/v/scope-test.svg
