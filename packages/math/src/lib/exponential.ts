import { multiply } from './multiply.js';

export function exponential(base: number, exp: number): number {
  return multiply(...new Array(exp).fill(base));
}
