# Guide

Peacock colors your VS Code or Cursor workspace so you can tell open editors apart. It works best with multiple windows or Remote sessions.

## Install

1. Open **Extensions** (`View → Extensions`)
1. Search for **Peacock**
1. Click **Install**
1. Click **Reload** if prompted

Or install from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=johnpapa.vscode-peacock&wt.mc_id=vscodepeacock-github-jopapa).

## Quick start

Peacock only works in a workspace. See [Peacock commands are not appearing](#peacock-commands-are-not-appearing).

1. Open a workspace
1. Press `F1` to open the command palette
1. Type `Peacock`
1. Choose `Peacock: Change to a Favorite Color`
1. Pick a color

![Peacock Windows](../assets/peacock-windows.png 'Peacock Windows')

## Features

All commands start with `Peacock:` in the command palette.

- Color [affected elements](#affected-elements) with a [user-defined](#input-formats) or random color
- Pick from [favorite colors](#favorite-colors)
- [Save the current color](#save-favorite-color) as a favorite
- [Lighten or darken](#element-adjustments) affected elements for contrast
- Persist colors in workspace `.vscode/settings.json`
- Integrate with [VS Code Remote](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack&wt.mc_id=vscodepeacock-github-jopapa)

## Settings

| Property | Description |
| --- | --- |
| peacock.affectActivityBar | Color the activity bar |
| peacock.affectStatusBar | Color the status bar |
| peacock.affectDebuggingStatusBar | Color the status bar while debugging. Defaults to false |
| peacock.affectTitleBar | Color the title bar (see [title bar coloring](#title-bar-coloring)) |
| peacock.affectEditorGroupBorder | VS Code only. Color editor group borders; Cursor keeps central editor borders theme-controlled |
| peacock.affectFrameIndicators | Cursor-focused stronger active, focus, and drop borders. Defaults to false |
| peacock.affectPanelBackground | Cursor only. Tint the bottom panel, section headers, and sticky rows. Defaults to false |
| peacock.affectPanelBorder | Color the panel border. Defaults to false |
| peacock.affectSideBarBackground | Cursor only. Tint side/auxiliary bars, titles, section headers, and sticky rows. Defaults to false |
| peacock.affectSideBarBorder | Color the side bar border. Defaults to false |
| peacock.affectSashHover | Color draggable sash hover borders, including editor splits. Defaults to false |
| peacock.affectStatusAndTitleBorders | Color status or title borders. Defaults to false |
| peacock.affectTabActiveBorder | Color the active tab border. Defaults to false |
| peacock.elementAdjustments | Fine-tune coloring of affected elements |
| peacock.cursorThemeFamily | Cursor-only `auto`, `light`, or `dark` override for themes that report the wrong family. Defaults to `auto` |
| peacock.favoriteColors | Array of objects for color names and hex values |
| peacock.keepForegroundColor | Skip foreground colorization; background only |
| peacock.surpriseMeOnStartup | Apply a random color on startup when none is set |
| peacock.darkForeground | Override for the dark foreground |
| peacock.lightForeground | Override for the light foreground |
| peacock.darkenLightenPercentage | Percentage to darken or lighten the color |
| peacock.surpriseMeFromFavoritesOnly | Limit random colors to the favorites list |
| peacock.showColorInStatusBar | Show the Peacock color in the status bar |
| peacock.remoteColor | Color applied to remote workspaces |
| peacock.color | Color applied to workspaces |
| peacock.squigglyBeGone | Easter egg. Hides error, warning, and info underlines. Does not change your code |

### Favorite colors

Set one or more colors in user setting `peacock.favoriteColors`, then run **Peacock: Change to a Favorite Color**.

```javascript
  "peacock.favoriteColors": [
    { "name": "Gatsby Purple", "value": "#639" },
    { "name": "Auth0 Orange", "value": "#eb5424" },
    { "name": "Azure Blue", "value": "#007fff" }
  ]
```

Each favorite needs a `name` and a `value`. Brand hex codes: <https://brandcolors.net>

#### Preview favorites

Cycling favorites in the command palette applies each color as a preview. Press ESC to revert.

![favorites](../assets/named-colors.gif)

#### Save favorite color

Run `Peacock: Save Current Color as Favorite Color` to name and store the current color in user settings.

### Affected elements

Choose which parts of VS Code or Cursor change when you pick a color. Cursor-only `affectSideBarBackground` and `affectPanelBackground` are opt-in. They use solid variants of the Peacock hue and also tint scoped titles, section headers, and sticky rows. Cursor's side bar token colors the auxiliary bar. Border coloring stays under the border settings.

These settings don't change the center editor, editor tabs or group headers, rendered editor content, or Problems editors. Those keep the selected theme.

Side bar, panel, and status/title border settings use opaque hue-matched colors with measured contrast against their local Peacock surface. `peacock.affectFrameIndicators` adds stronger active, focus, and drop indicators only on affected Peacock surfaces. Cursor reuses `panelTitle.activeBorder` in auxiliary, Settings, and extension tabs, so the stronger indicator stays opt-in.

![affected elements](../assets/affected-settings.png)

### Element adjustments

Fine-tune affected elements for contrast:

- `"darken"`: slightly darker
- `"lighten"`: slightly lighter
- `"none"`: no adjustment

Example: lighten the Activity Bar relative to Status Bar and Title Bar.

```javascript
  "peacock.affectActivityBar": true,
  "peacock.affectStatusBar": true,
  "peacock.affectTitleBar": true,
  "peacock.elementAdjustments": {
    "activityBar": "lighten"
  }
```

![Element Adjustments](../assets/element-adjustments.png)

### Keep foreground color

Default is `false`. When `true`, Peacock changes backgrounds only and leaves theme foregrounds alone.

### Surprise me on startup

Default is `false`. When `true`, Peacock applies a random color to workspaces that don't already have a Peacock color. Existing colors are left alone.

Random colors use a uniform hue with moderate saturation. Dark-family themes get a darker accent; light-family themes get a lighter one.

### Lighten and darken

Use the lighten/darken [commands](#commands) to adjust the current color by `darkenLightenPercentage` (1–10%).

Shortcuts: `alt+cmd+=` (lighten), `alt+cmd+-` (darken).

## Commands

| Command | Description |
| --- | --- |
| Peacock: Reset Workspace Colors | Remove Peacock colors from workspace `.vscode/settings.json`. User settings may still apply |
| Peacock: Remove All Global and Workspace Colors | Remove Peacock colors from workspace and user settings |
| Peacock: Enter a Color | Prompt for a color (see [input formats](#input-formats)) |
| Peacock: Color to Peacock Green | Set color to #42b883 |
| Peacock: Surprise me with a Random Color | Set a random color |
| Peacock: Change to a Favorite Color | Pick from favorites |
| Peacock: Save Current Color to Favorites | Save current color to favorites |
| Peacock: Add Recommended Favorites | Add recommended favorites to user settings (same names are overridden) |
| Peacock: Darken | Darken by `darkenLightenPercentage` |
| Peacock: Lighten | Lighten by `darkenLightenPercentage` |
| Peacock: Show and Copy Current Color | Show current color and copy it to the clipboard |
| Peacock: Show the Documentation | Open the docs site in a browser |

## Keyboard shortcuts

| Description | Key binding | Command |
| --- | --- | --- |
| Darken | alt+cmd+- | peacock.darken |
| Lighten | alt+cmd+= | peacock.lighten |
| Surprise me with a random color | cmd+shift+k | peacock.changeColorToRandom |

## Remote development

Peacock works with [VS Code Remote](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack&wt.mc_id=vscodepeacock-github-jopapa) (WSL, SSH, containers). All remote contexts share one color.

If `peacock.remoteColor` is set, remote workspaces use it. Otherwise they use `peacock.color`.

![Remote Integration with Peacock](../assets/peacock-remote.gif)

Peacock is a UI extension (`"extensionKind": "ui"`). It runs on the local machine and doesn't access remote workspace files or tools.

## Input formats

| Format | Examples |
| --- | --- |
| Named HTML colors | purple, blanchedalmond |
| Short Hex | #8b2, f00 |
| Short Hex8 (RGBA) | #8b2c, f00c |
| Hex | #88bb22, ff0000 |
| Hex8 (RGBA) | #88bb22cc, ff0000cc |
| RGB | rgb (136, 187, 34), rgb 255 0 0 |
| RGBA | rgba (136, 187, 34, .8), rgba 255 0 0 .8 |
| HSL | hsl (80, 69%, 43%), hsl (0 1 .5) |
| HSLA | hsla (80, 69%, 43%, 0.8), hsla (0 1 .5 .8) |
| HSV | hsv (80, 82%, 73%), hsv (0 1 1) |
| HSVA | hsva (80, 82%, 73%, 0.8), hsva (0,100%,100%,0.8) |

Validation rules:

- Named HTML colors are case-insensitive
- `#` is optional on hex values
- Parentheses and commas are optional in color formulas; numbers may be decimals or percentages, except alpha in rgba/hsla/hsva (decimal 0–1)

Workbench customizations accept solid colors (including alpha), not gradients. Derived side bar and panel variants are opaque because extensions can't read resolved theme surface colors.

### Alpha support

Avoid transparent colors when you can — readability often suffers. Peacock draws over the workbench, which is light or dark by theme, and extensions can't read the true workbench background for contrast math. See [#293](https://github.com/johnpapa/vscode-peacock/issues/293#issuecomment-548968718).

## Logging

Open the Output panel and select **Peacock** to view logs when reporting issues.

## FAQ

### Peacock commands are not appearing

Peacock needs a workspace (and its `settings.json`). Outside a workspace, only **Peacock: Open Documentation** stays available.

### What does Peacock affect

- Title bar, activity bar, and status bar
- Readability of those elements
- Background and foreground colors
- Child UI inside those surfaces (badges, hover)

### What happens when you change the user settings

Peacock reapplies colors from the most recently used color in the active session.

**Example 1 — color then toggle elements**

1. Choose "surprise me" → #ff0000
1. Peacock stores #ff0000 as the recent color
1. Uncheck **Peacock: Affect StatusBar**
1. Peacock clears and reapplies #ff0000

**Example 2 — workspace already colored**

1. Open VS Code with workspace color #369
1. Uncheck **Peacock: Affect StatusBar**
1. Peacock clears and reapplies #369

**Example 3 — no color yet**

1. Open VS Code with no Peacock color
1. Uncheck **Peacock: Affect StatusBar**
1. No colors are applied

### How does title bar coloring work

Set `window.titleBarStyle` to `custom`. Native mode leaves the title bar to the OS, so Peacock can't color it.

On macOS also set:

- `window.nativeTabs`: **false** (native tabs force OS title bar)
- `window.nativeFullScreen`: **true** (non-native full screen forces native title bar)

![Title Bar Settings](../assets/title-bar-coloring-settings.png)

Cursor reuses the title bar foreground for some editor toolbar icons (including New Agent). When a Peacock title bar and the active Cursor theme are opposite light/dark families, Peacock adjusts only the title bar shade to match the theme while keeping the hue. Activity bar and status bar stay unchanged. VS Code keeps standard Peacock title bar behavior.

`peacock.cursorThemeFamily` defaults to mapping Light / High Contrast Light → light and Dark / High Contrast → dark. Set `light` or `dark` when a theme reports the wrong kind; that value also drives random accent lightness and optional side bar / panel variants.

### How are foreground colors calculated

Peacock compares tinycolor readability of the configured dark and light foregrounds and picks the stronger candidate. Text targets 4.5:1; UI indicators target 3:1. User overrides remain the candidates, so a weak override may miss the target.

### Why is the foreground hard to see with my transparent color

Contrast uses the entered background color only; alpha is ignored. See [Alpha support](#alpha-support).

### Why are my affected elements not transparent

The VS Code window isn't transparent. A transparent input overlays the workbench (light gray on light themes, dark gray on dark themes).

### What are recommended favorites

Alphabetized constants in `favorites.ts`. New installs extend your favorites with this list. Don't edit recommended favorite colors — upgrades override same names. The list can change between versions.

### What are mementos

Values stored across sessions, outside settings.

| Name | Type | Description |
| --- | --- | --- |
| peacockMementos.favoritesVersion | Global | Peacock version used to decide when to write recommended favorites |

## See also

- [Changelog](/changelog)
- [Contributing](/about/contributing)
- [Code of conduct](/about/code_of_conduct)
