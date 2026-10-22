/** Fisher–Yates shuffle, returns a copy. */
export function shuffled<T>(items: T[]): T[] {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export const formatCount = (n: number) => n.toLocaleString('en-US');
