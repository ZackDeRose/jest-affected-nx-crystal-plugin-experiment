import { square } from './square.js';

describe('square()', () => {
  test('square(5) = 25', () => {
    const result = square(5);
    expect(result).toBe(25);
  });
});
