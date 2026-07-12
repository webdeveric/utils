# Contributing

## Setup

```shell
git clone https://github.com/webdeveric/utils.git
cd utils
corepack enable
pnpm install --frozen-lockfile
```

### Node.js version

This project uses the Node version in [.node-version](.node-version).

Run `fnm use` or `nvm use` to ensure you're using the correct Node.js version.

## Testing

Run tests in watch mode

```shell
pnpm test
```

Run tests and generate a coverage report.

```shell
pnpm coverage
```

## Linting, type checking, and spell checking

These all run in CI and must pass before a PR can be merged.

```shell
pnpm lint
pnpm typecheck
pnpm spellcheck
```

Run `pnpm format` to apply Prettier formatting. A `pre-commit` hook auto-fixes lint/format/spelling issues on staged files, so most of this happens for you on commit.

## Building

```shell
pnpm build
```

## Commit messages

Commit messages should follow [conventional commits](https://www.conventionalcommits.org/).

Releases are created automatically and the version bump is determined from the commit messages.

## Pull requests

If you want to add a large feature or breaking change, please open an issue first so it can be discussed.

:warning: Low effort AI generated PRs will be closed without any explanation.

## Security

To report a security vulnerability, see [SECURITY.md](SECURITY.md) instead of opening a public issue.
