import { cube } from './cube.js';

describe('cube()', () => {
  test('cube(5) = 25', () => {
    const result = cube(5);
    expect(result).toBe(125);
  });
});
