import { add } from './add.js';

export function multiply(...args: number[]): number {
  if (args.length === 2) {
    return add(...new Array(args[0]).fill(args[1]));
  }
  return args.reduce((a, c) => multiply(a, c), 1);
}
