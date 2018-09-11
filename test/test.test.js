const assert = require('assert');

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

it('double done', (done) => {
  // Calling `done()` twice is an error
  setImmediate(done);
  // setImmediate(done);
});
