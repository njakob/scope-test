"use strict";

function UngrantedScopeError(missingScopes) {
  this.message = 'Some scopes are not granted';
  var error = new Error(this.message);
  error.name = this.name;
  this.stack = error.stack;
  this.missingScopes = missingScopes || [];
}

UngrantedScopeError.prototype = Object.create(Error.prototype);
UngrantedScopeError.prototype.name = UngrantedScopeError.name;

function scopeTest(scopes, options) {
  options = options || {};
  var ignoreCase = !!options.ignoreCase;
  var requiredScopesTable = buildTable(options.requiredScopes, ignoreCase);
  var requiredScopes = Object.keys(requiredScopesTable);
  var grantedScopesTable = buildTable(scopes, ignoreCase);
  var grantedScopes = Object.keys(grantedScopesTable);
  var missingScopes = [];
  for (var i = requiredScopes.length - 1; i >= 0; i--) {
    var requiredScope = requiredScopes[i];
    var granted = false;
    for (var j = grantedScopes.length - 1; j >= 0; j--) {
      if (grantedScopes[j] === requiredScope) {
        granted = true;
        break;
      }
    }
    if (!granted) {
      missingScopes.push(requiredScopesTable[requiredScope]);
    }
  }
  if (missingScopes.length) {
    throw new UngrantedScopeError(missingScopes);
  }
}

function buildTable(scopes, ignoreCase) {
  scopes = scopes || [];
  var table = {};
  for (var i = scopes.length - 1; i >= 0; i--) {
    var scope = scopes[i];
    table[(ignoreCase ? scope.toLowerCase() : scope)] = scope;
  }
  return table;
}

module.exports = scopeTest;
module.exports.UngrantedScopeError = UngrantedScopeError;