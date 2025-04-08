export function add(...args: number[]): number {
  return args.reduce((a, c) => a + c, 0);
}
