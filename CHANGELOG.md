# Changelog

All notable changes to the Peacock extension will be documented in this file.

> **Historical changelog:** The pre-modernization changelog is available in the [documentation site](https://johnpapa.github.io/vscode-peacock/#/changelog/).

## [Unreleased]

### Modernization

- Scaffold `TODO.md` and `CHANGELOG.md` for phased modernization tracking
- Raise `engines.vscode` to `^1.105.0` (Cursor 3.x desktop only)
- Remove web extension target (`browser` field, web webpack config)
- Upgrade TypeScript 3.9 to 5.7, `@types/node` to ^22, Mocha to ^10, Sinon to ^19, Prettier to ^3
- Migrate ESLint 6 + `.eslintrc` to ESLint 9 flat config with typescript-eslint v8
- Upgrade Husky v4 to v9 with `.husky/` directory
- Replace `vsce` with `@vscode/vsce` in scripts
- Update tsconfig target to ES2022
- Move `@types/tinycolor2` from dependencies to devDependencies
- Remove Live Share integration entirely (`vsls` dependency, commands, settings, code)
- Remove `process`, `@types/webpack-env`, `@vscode/test-web` devDependencies
- Fix glob v10 API usage in test suite runner
- Fix Mocha 10 type compatibility in built-in-colors tests
- Update istanbul coverage report generation for newer API
