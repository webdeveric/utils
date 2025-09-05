export function trimIndentation(input: string): string {
  const lines = input.split('\n');
  // Find indentation on first line that isn't whitespace only.
  const whiteSpace = lines.find((line) => !/^\s*$/.test(line))?.match(/^(?<whiteSpace>\s*)/)?.groups?.['whiteSpace'];

  if (whiteSpace) {
    const wsPattern = new RegExp(`^${whiteSpace}`);

    return lines
      .map((line) => line.replace(wsPattern, ''))
      .join('\n')
      .trim();
  }

  return input;
}
