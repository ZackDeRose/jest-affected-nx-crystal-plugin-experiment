import { add4 } from './add-four.js';

describe('add4()', () => {
  test('add4(5) = 9', () => {
    const result = add4(5);
    expect(result).toBe(9);
  });
});
