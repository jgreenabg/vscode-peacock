# Peacock

VS Code / Cursor extension that changes workspace UI colors so you can visually identify which editor window is which.

## Build and Install

1. Install dependencies:

~~~sh
npm install
~~~

2. Package the extension into a `.vsix`:

~~~sh
npm run package
~~~

3. Install in Cursor (pick one):

~~~sh
cursor --install-extension vscode-peacock-4.2.3.vsix
~~~

Or: Command Palette (`Cmd+Shift+P`) > **Extensions: Install from VSIX...** > select the `.vsix`.

## Usage

Peacock only works in a workspace (not a standalone file). Open the Command Palette (`F1`), type `Peacock`, and pick a command.

**Keybindings:**

| Shortcut | Action |
| --- | --- |
| `Alt+Cmd+-` | Darken current color |
| `Alt+Cmd+=` | Lighten current color |

## Commands

All commands are prefixed with `Peacock:` in the Command Palette. Source: `package.json` > `contributes.commands`.

| Command ID | Title |
| --- | --- |
| `peacock.docs` | Open the Documentation |
| `peacock.resetWorkspaceColors` | Reset Workspace Colors |
| `peacock.removeAllColors` | Remove All Global and Workspace Colors |
| `peacock.saveColorToFavorites` | Save Current Color to Favorites |
| `peacock.enterColor` | Enter a Color |
| `peacock.changeColorToPeacockGreen` | Color to Peacock Green |
| `peacock.addRecommendedFavorites` | Add the Recommended Favorites |
| `peacock.changeColorToRandom` | Surprise Me with a Random Color |
| `peacock.changeColorToFavorite` | Change to a Favorite Color |
| `peacock.darken` | Darken |
| `peacock.lighten` | Lighten |
| `peacock.showAndCopyCurrentColor` | Copy the Current Color to the Clipboard |

## Settings

All settings live under `peacock.*` in your user or workspace `settings.json`. Source: `package.json` > `contributes.configuration`.

| Setting | Type | Default | Description |
| --- | --- | --- | --- |
| `color` | string | `""` | Workspace-level color applied by Peacock |
| `remoteColor` | string | `""` | Color applied to remote workspaces |
| `affectActivityBar` | boolean | `true` | Colorize the activity bar |
| `affectStatusBar` | boolean | `true` | Colorize the status bar |
| `affectTitleBar` | boolean | `true` | Colorize the title bar |
| `affectSashHover` | boolean | `true` | Colorize the sash hover border |
| `affectEditorGroupBorder` | boolean | `false` | Colorize the editor group border |
| `affectPanelBorder` | boolean | `false` | Colorize the panel border |
| `affectSideBarBorder` | boolean | `false` | Colorize the sidebar border |
| `affectStatusAndTitleBorders` | boolean | `false` | Colorize status/title borders |
| `affectTabActiveBorder` | boolean | `false` | Colorize the active tab border |
| `affectDebuggingStatusBar` | boolean | `false` | Colorize status bar while debugging |
| `showColorInStatusBar` | boolean | `true` | Show current Peacock color in status bar |
| `keepForegroundColor` | boolean | `false` | Skip foreground colorization, background only |
| `keepBadgeColor` | boolean | `false` | Skip badge colorization |
| `squigglyBeGone` | boolean | `false` | Hide error/warning/info underlines (easter egg) |
| `surpriseMeOnStartup` | boolean | `false` | Random color on startup if none is set |
| `surpriseMeFromFavoritesOnly` | boolean | `false` | Limit random colors to favorites list |
| `darkenLightenPercentage` | number | `5` | Darken/lighten step size (1-10) |
| `darkForegroundColor` | string | `#15202b` | Override for dark foreground |
| `lightForegroundColor` | string | `#e7e7e7` | Override for light foreground |
| `elementAdjustments` | object | `{activityBar: "lighten", statusBar: "none", titleBar: "none"}` | Per-element lighten/darken/none adjustments |
| `favoriteColors` | array | 9 built-in colors | Named color presets (name + hex value pairs) |

## Architecture

| Path | Purpose |
| --- | --- |
| `src/extension.ts` | Extension entry point |
| `dist/extension-node.js` | Webpack production output (the `main` field in `package.json`) |
| `webpack.config.js` | Bundles TypeScript into a single Node.js CommonJS module |
| `tsconfig.json` | TypeScript config (strict, ES2022 target) |
| `package.json` | Extension manifest: commands, settings, menus, keybindings, scripts |
| `.vscodeignore` | Files excluded from the `.vsix` package |
| `eslint.config.js` | ESLint flat config |

Runtime dependency: `tinycolor2` (color manipulation). Everything else is dev-only.

## Development

| Task | Command |
| --- | --- |
| Watch mode (dev) | `npm run watch` |
| Production build | `npm run webpack -- --mode production` |
| Lint | `npm run lint` |
| Lint + fix | `npm run lint-fix` |
| Format | `npm run pretty` |
| Run tests | `npm test` |
| Test with coverage | `npm run test:coverage` |
| E2E tests (Playwright) | `npm run test:e2e` |
| Package `.vsix` | `npm run package` |

## Upstream

Forked from [johnpapa/vscode-peacock](https://github.com/johnpapa/vscode-peacock). MIT licensed.
