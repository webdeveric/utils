// Longest-alternative-first so a lone `\r` from a CRLF pair is never matched on its own.
export const NEWLINE_RAW_PATTERN = String.raw`\r\n|\r|\n`;

// Whitespace excluding line breaks, since those are matched separately via `NEWLINE`.
export const INDENT_CHAR_RAW_PATTERN = String.raw`[^\S\r\n]`;
