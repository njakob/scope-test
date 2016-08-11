"use strict";

var UngrantedScopeError = require('../lib/').UngrantedScopeError;

describe('test/error.test.js', function() {
  describe('with missing scopes parameter', function() {
    it('should be an instance of Error', function() {
      expect(new UngrantedScopeError([ 'email' ]) instanceof Error).to.be.equal(true);
    });
    it('should be an instance of UngrantedScopeError', function() {
      expect(new UngrantedScopeError([ 'email' ]) instanceof UngrantedScopeError).to.be.equal(true);
    });
    it('should have generic Error properties', function() {
      expect(new UngrantedScopeError([ 'email' ])).to.have.property('name').and.to.be.equal('UngrantedScopeError');
      expect(new UngrantedScopeError([ 'email' ])).to.have.property('message');
      expect(new UngrantedScopeError([ 'email' ])).to.have.property('stack');
    });
  });
});