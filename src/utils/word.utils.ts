export function pluralize(
  count: number,
  word: string,
  pluralForm?: string
): string {
  console.log({ count, word, ppp: pluralForm || `${word}s` });
  if (count === 1) {
    return word;
  }
  return pluralForm || `${word}s`;
}
