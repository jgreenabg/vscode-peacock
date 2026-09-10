import * as tinycolor from 'tinycolor2';

import {
  CursorThemeFamily,
  ReadabilityRatios,
  SurfaceKind,
  ThemeFamily,
  ThemeKind,
} from './models/enums';

export function resolveThemeFamily(override: CursorThemeFamily, themeKind: number) {
  if (override === CursorThemeFamily.Light) {
    return ThemeFamily.Light;
  }
  if (override === CursorThemeFamily.Dark) {
    return ThemeFamily.Dark;
  }

  return themeKind === ThemeKind.Light || themeKind === ThemeKind.HighContrastLight
    ? ThemeFamily.Light
    : ThemeFamily.Dark;
}

export function createRandomPaletteColorHex(themeFamily = ThemeFamily.Dark, random = Math.random) {
  const hue = random() * 360;
  const saturation = 0.52 + random() * 0.16;
  const lightness = themeFamily === ThemeFamily.Light ? 0.68 : 0.34;
  return tinycolor({ h: hue, s: saturation, l: lightness }).toHexString();
}

export function getContrastingForegroundColorHex(
  backgroundColor: string,
  darkForegroundColor: string,
  lightForegroundColor: string,
  ratio = ReadabilityRatios.Text,
) {
  const background = tinycolor(backgroundColor);
  const candidates = [darkForegroundColor, lightForegroundColor].map(color => {
    const foreground = tinycolor(color);
    return {
      color: foreground.getAlpha() < 1 ? foreground.toHex8String() : foreground.toHexString(),
      contrast: tinycolor.readability(background, foreground),
    };
  });
  const readableCandidates = candidates.filter(candidate => candidate.contrast >= ratio);
  const bestCandidates = readableCandidates.length ? readableCandidates : candidates;

  bestCandidates.sort((first, second) => second.contrast - first.contrast);
  return bestCandidates[0].color;
}

export function getBorderColorHex(surfaceColor: string, targetRatio: number) {
  const surface = tinycolor(surfaceColor);
  const { h, s, l } = surface.toHsl();
  const darkContrast = tinycolor.readability(surface, '#000000');
  const lightContrast = tinycolor.readability(surface, '#ffffff');
  const direction = darkContrast >= lightContrast ? -1 : 1;

  for (let step = 1; step <= 1000; step += 1) {
    const adjustedLightness = Math.min(1, Math.max(0, l + direction * (step / 1000)));
    const border = tinycolor({ h, s, l: adjustedLightness }).toHexString();
    if (tinycolor.readability(surface, border) >= targetRatio) {
      return border;
    }
  }

  return direction < 0 ? '#000000' : '#ffffff';
}

export function getSurfaceColorHex(color: string, surface: SurfaceKind, themeFamily: ThemeFamily) {
  const { h } = tinycolor(color).toHsl();
  const isLight = themeFamily === ThemeFamily.Light;
  const palette = isLight
    ? {
        [SurfaceKind.SideBar]: { s: 0.31, l: 0.88 },
        [SurfaceKind.SideBarChrome]: { s: 0.32, l: 0.92 },
        [SurfaceKind.Panel]: { s: 0.24, l: 0.96 },
        [SurfaceKind.PanelChrome]: { s: 0.22, l: 0.93 },
      }
    : {
        [SurfaceKind.SideBar]: { s: 0.3, l: 0.16 },
        [SurfaceKind.SideBarChrome]: { s: 0.3, l: 0.21 },
        [SurfaceKind.Panel]: { s: 0.24, l: 0.13 },
        [SurfaceKind.PanelChrome]: { s: 0.22, l: 0.18 },
      };
  const { s, l } = palette[surface];

  return tinycolor({ h, s, l }).toHexString();
}
