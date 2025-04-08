import { multiplyBy4 } from './multiply-by-4.js';

describe('multiplyBy4()', () => {
  test('multiplyBy4(5) = 20', () => {
    const result = multiplyBy4(5);
    expect(result).toBe(20);
  });
});
