export enum CommentType {
  Legal = 'legal',
  Block = 'block',
  Single = 'single',
  HTML = 'html',
}

export type CommentParts = {
  commentStart: string;
  commentEnd: string;
  lineStart: string;
  lineEnd: string;
};

export type CommentOptions = {
  type?: CommentType | `${CommentType}`;
} & Partial<CommentParts>;

const commentTypes: Record<CommentType, CommentParts> = {
  [CommentType.Block]: {
    commentStart: '/**\n',
    commentEnd: '\n */',
    lineStart: ' * ',
    lineEnd: '',
  },
  [CommentType.Legal]: {
    commentStart: '/*!\n',
    commentEnd: '\n */',
    lineStart: ' * ',
    lineEnd: '',
  },
  [CommentType.Single]: {
    commentStart: '',
    commentEnd: '',
    lineStart: '// ',
    lineEnd: '',
  },
  [CommentType.HTML]: {
    commentStart: '<!-- ',
    commentEnd: ' -->',
    lineStart: '',
    lineEnd: '',
  },
};

export function comment(text: string, options?: CommentOptions): string {
  if (!text) {
    return '';
  }

  const { type = CommentType.Block, ...partOptions } = options ?? {};

  const {
    commentStart = '',
    commentEnd = '',
    lineStart = '',
    lineEnd = '',
  } = {
    ...commentTypes[type],
    ...partOptions,
  };

  const lines = text
    .trim()
    .split(/\r\n|\n/)
    .map(line => `${lineStart}${line.normalize().trim()}${lineEnd}`.trimEnd());

  return `${commentStart}${lines.join('\n')}${commentEnd}`;
}
