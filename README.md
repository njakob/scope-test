
# scope-test

Simple util to test collections of granted scope against required one.

## Features

* Isomorphic module
* Error with missing scopes
* Case insensitive option
* Flowtype definition

## Installation

[![NPM](https://nodei.co/npm/scope-test.png?downloads=true)](https://nodei.co/npm/scope-test/)

```
$ npm install scope-test
```

## Usage

```javascript
const scopeTest = require('scope-test');

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

[MIT](LICENSE)