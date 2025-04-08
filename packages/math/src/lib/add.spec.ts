import { add } from './add.js';

describe('add', () => {
  describe('two arguments', () => {
    test('1 + 2 = 3', () => {
      const result = add(1, 2);
      expect(result).toBe(3);
    });
  });

  describe('three arguments', () => {
    test('1 + 2 + 3 = 6', () => {
      const result = add(1, 2, 3);
      expect(result).toBe(6);
    });
  });
});
