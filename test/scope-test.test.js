"use strict";

var scopeTest = require('../lib');
var UngrantedScopeError = require('../lib/').UngrantedScopeError;

describe('test/scope-test.test.js', function() {
  describe('with no granted scopes', function() {
    it('should not throw an error', function() {
      expect(function() {
        scopeTest([]);
      }).to.not.throw(Error);
    });
  });
  describe('with no granted scopes and with no required scopes', function() {
    it('should not throw an error', function() {
      expect(function() {
        scopeTest([], { requiredScopes: [] })
      }).to.not.throw(Error);
    });
  });
  describe('with missing granted scopes', function() {
    it('should throw an ungranted error with missing scopes', function() {
      expect(function() {
        scopeTest([], { requiredScopes: [ 'email' ] })
      }).to.throw(UngrantedScopeError).and.to.have.property('missingScopes').and.deep.equal([ 'email' ]);
    });
  });
  describe('with matching granted scopes', function() {
    it('should not throw an error', function() {
      expect(function() {
        scopeTest([ 'email' ], { requiredScopes: [ 'email' ] })
      }).to.not.throw(Error);
    });
  });
  describe('with matching granted scopes and extra granted scopes', function() {
    it('should not throw an error', function() {
      expect(function() {
        scopeTest([ 'email', 'profile' ], { requiredScopes: [ 'email' ] })
      }).to.not.throw(Error);
    });
  });
  describe('with case insensitive matching granted scopes and with case sensitive option', function() {
    it('should not throw an error', function() {
      expect(function() {
        scopeTest([ 'Email' ], { requiredScopes: [ 'email' ], ignoreCase: false })
      }).to.throw(UngrantedScopeError);
    });
  });
  describe('with case insensitive matching granted scopes and with case insensitive option', function() {
    it('should not throw an error', function() {
      expect(function() {
        scopeTest([ 'Email' ], { requiredScopes: [ 'email' ], ignoreCase: true })
      }).to.not.throw(Error);
    });
  });
});