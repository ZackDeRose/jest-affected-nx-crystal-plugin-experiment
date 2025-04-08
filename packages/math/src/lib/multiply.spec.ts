import { multiply } from './multiply.js';

describe('multiply', () => {
  describe('two arguments', () => {
    test('1 * 2 = 3', () => {
      const result = multiply(1, 2);
      expect(result).toBe(2);
    });
  });

  describe('three arguments', () => {
    test('1 * 2 * 3 = 6', () => {
      const result = multiply(1, 2, 3);
      expect(result).toBe(6);
    });
  });
});
