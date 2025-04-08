import { exponential } from './exponential.js';

describe('exponential', () => {
  describe('4^3 = 64', () => {
    test('4^3 = 64', () => {
      const result = exponential(4, 3);
      expect(result).toBe(64);
    });
  });
});
