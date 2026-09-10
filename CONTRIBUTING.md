# Contributing

Contribute bugs, docs fixes, and features through GitHub issues and pull requests.

Follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

## Report bugs

Search [existing issues](https://github.com/johnpapa/vscode-peacock/issues) before opening a new one. Include:

- Overview (non-minified stack trace if an error is thrown)
- Affected version (e.g. 3.9.0)
- What you expected vs what happened
- OS and editor version
- Steps to reproduce
- Related issues
- Suggested fix, if you have one

[Open an issue](https://github.com/johnpapa/vscode-peacock/issues/new).

## Request features

Open an [issue](https://github.com/johnpapa/vscode-peacock/issues/new) with the problem and proposed solution. Propose larger features before implementing. Small features can ship as a PR.

## Submit a pull request

1. Search [open and closed PRs](https://github.com/johnpapa/vscode-peacock/pulls) for duplicates
1. Fork the repo and make your changes on a branch
1. Commit with a descriptive message
1. Push and open a PR
1. If maintainers request changes, update your branch and force-push:

```shell
git rebase main -i
git push -f
```

## Run the extension locally

```shell
git clone https://github.com/johnpapa/vscode-peacock.git
cd vscode-peacock
npm install
```

Launch the `Run Extension` debug configuration. Set breakpoints in `src/` as needed.
