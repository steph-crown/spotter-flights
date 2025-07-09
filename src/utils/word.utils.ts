export function pluralize(
  count: number,
  word: string,
  pluralForm?: string
): string {
  if (count === 1) {
    return word;
  }
  return pluralForm || `${word}s`;
}
