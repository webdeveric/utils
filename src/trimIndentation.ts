const isWhitespaceOnly = (input: string): boolean => /^\s*$/.test(input);

export function trimIndentation(input: string): string {
  const lines = input.split('\n');
  const whiteSpace = lines.find((line) => !isWhitespaceOnly(line))?.match(/^(?<whiteSpace>\s*)/)?.groups?.[
    'whiteSpace'
  ];

  if (whiteSpace) {
    const wsPattern = new RegExp(`^${whiteSpace}`);

    return lines
      .map((line) => line.replace(wsPattern, ''))
      .join('\n')
      .trim();
  }

  return input;
}
