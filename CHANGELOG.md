# Changelog

All notable changes to the Peacock extension will be documented in this file.

> **Historical changelog:** The pre-modernization changelog is available in the [documentation site](https://johnpapa.github.io/vscode-peacock/#/changelog/).

## [Unreleased]

### Breaking Changes

- Raise `engines.vscode` to `^1.105.0` (Cursor 3.x desktop only)
- Replace `*` activation event with `onStartupFinished`

### Removed

- Remove Live Share integration entirely (`vsls` dependency, commands, settings, code)
- Remove web extension target (`browser` field, web webpack config)
- Remove `process`, `@types/webpack-env`, `@vscode/test-web` devDependencies

### Changed

- Upgrade TypeScript 3.9 to 5.7, `@types/node` to ^22, Mocha to ^10, Sinon to ^19, Prettier to ^3
- Migrate ESLint 6 + `.eslintrc` to ESLint 9 flat config with typescript-eslint v8
- Upgrade Husky v4 to v9 with `.husky/` directory
- Replace `vsce` with `@vscode/vsce` in scripts
- Replace deprecated `vscode-test` with `@vscode/test-electron`
- Update tsconfig target to ES2022
- Move `@types/tinycolor2` from dependencies to devDependencies
- Fix glob v10 API usage in test suite runner
- Fix Mocha 10 type compatibility in built-in-colors tests
- Update istanbul coverage report generation for newer API
- Constrain random colors to moderate saturation and theme-family-aware lightness
- Select light or dark foreground colors by actual contrast instead of a brightness cutoff
- Derive Cursor border colors from their local surfaces at subtle, structural, or strong contrast tiers
- Default `peacock.affectSashHover` to false because Cursor applies it to editor split sashes

### Added

- Scaffold `TODO.md` and `CHANGELOG.md` for phased modernization tracking
- Add `capabilities.untrustedWorkspaces` manifest declaration
- Add `activityBarTop.*` tokens for top activity bar layout (Cursor default)
- Expand `commandCenter.*` coverage (background, foreground, active, inactive variants)
- Wire new tokens into color assembly logic for modern layouts
- Add the Cursor-only `peacock.cursorThemeFamily` override for incorrectly reported theme families
- Add opt-in Cursor side bar and bottom panel backgrounds, including scoped title, section header, and sticky-row tints, using solid variants derived from the Peacock hue without changing editor surfaces
- Add opt-in `peacock.affectFrameIndicators` for stronger Cursor active, focus, and drop borders
- Add GitHub Actions CI workflow (lint, compile, test on push/PR)
- Unskip status bar test suite

### Fixed

- Fix command disposable leak — all `registerCommand()` results now pushed to subscriptions
- Move StatusBarItem creation from module scope to lazy initialization
- Keep Cursor editor toolbar icons visible when Peacock and the active theme use opposite light or dark color families
- Reapply Peacock colors from the active-theme event and honor the Cursor theme-family override
- Replace the unsupported `activityBarTop.activeForeground` token and clean up stale values
- Stop emitting Cursor's broadly reused `commandCenter.inactiveBorder`, keep `panel.border` subtle, and leave central editor group borders theme-controlled
