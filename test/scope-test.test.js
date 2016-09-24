
import { expect } from 'chai';
import { scopeTest, UngrantedScopeError } from '../lib';

describe('test/scope-test.test.js', () => {
  describe('with no granted scopes', () => {
    it('should not throw an error', () => {
      expect(() => {
        scopeTest([]);
      }).to.not.throw(Error);
    });
  });
  describe('with no granted scopes and with no required scopes', () => {
    it('should not throw an error', () => {
      expect(() => {
        scopeTest([], { requiredScopes: [] });
      }).to.not.throw(Error);
    });
  });
  describe('with missing granted scopes', () => {
    it('should throw an ungranted error with missing scopes', () => {
      expect(() => {
        scopeTest([], { requiredScopes: ['email'] });
      }).to.throw(UngrantedScopeError).and.to.have.property('missingScopes').and.deep.equal(['email']);
    });
  });
  describe('with matching granted scopes', () => {
    it('should not throw an error', () => {
      expect(() => {
        scopeTest(['email'], { requiredScopes: ['email'] });
      }).to.not.throw(Error);
    });
  });
  describe('with matching granted scopes and extra granted scopes', () => {
    it('should not throw an error', () => {
      expect(() => {
        scopeTest(['email', 'profile'], { requiredScopes: ['email'] });
      }).to.not.throw(Error);
    });
  });
  describe('with case insensitive matching granted scopes and with case sensitive option', () => {
    it('should not throw an error', () => {
      expect(() => {
        scopeTest(['Email'], { requiredScopes: ['email'], ignoreCase: false });
      }).to.throw(UngrantedScopeError);
    });
  });
  describe('with case insensitive matching granted scopes and with case insensitive option', () => {
    it('should not throw an error', () => {
      expect(() => {
        scopeTest(['Email'], { requiredScopes: ['email'], ignoreCase: true });
      }).to.not.throw(Error);
    });
  });
});
