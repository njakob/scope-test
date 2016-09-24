
import { expect } from 'chai';
import { UngrantedScopeError } from '../lib';

describe('test/error.test.js', () => {
  describe('with missing scopes parameter', () => {
    it('should be an instance of Error', () => {
      expect(new UngrantedScopeError(['email']) instanceof Error).to.be.equal(true);
    });
    it('should be an instance of UngrantedScopeError', () => {
      console.log(new UngrantedScopeError() instanceof UngrantedScopeError);

      expect(new UngrantedScopeError(['email']) instanceof UngrantedScopeError).to.be.equal(true);
    });
    it('should have generic Error properties', () => {
      expect(new UngrantedScopeError(['email'])).to.have.property('name').and.to.be.equal('UngrantedScopeError');
      expect(new UngrantedScopeError(['email'])).to.have.property('message');
      expect(new UngrantedScopeError(['email'])).to.have.property('stack');
    });
  });
});
