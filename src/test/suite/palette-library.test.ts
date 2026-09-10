import * as assert from 'assert';
import * as tinycolor from 'tinycolor2';

import {
  createRandomPaletteColorHex,
  getBorderColorHex,
  getContrastingForegroundColorHex,
  getSurfaceColorHex,
  resolveThemeFamily,
} from '../../palette-library';
import {
  CursorThemeFamily,
  BorderContrastTarget,
  ReadabilityRatios,
  SurfaceKind,
  ThemeFamily,
  ThemeKind,
} from '../../models/enums';

suite('Palette library', () => {
  test('creates valid random colors within the dark family range', () => {
    const random = createSeededRandom();

    for (let index = 0; index < 100; index += 1) {
      const color = createRandomPaletteColorHex(ThemeFamily.Dark, random);
      const { h, s, l } = tinycolor(color).toHsl();

      assert.ok(tinycolor(color).isValid());
      assert.ok(h >= 0 && h <= 360);
      assert.ok(s >= 0.51 && s <= 0.69);
      assert.ok(l >= 0.33 && l <= 0.35);
    }
  });

  test('creates valid random colors within the light family range', () => {
    const random = createSeededRandom();

    for (let index = 0; index < 100; index += 1) {
      const color = createRandomPaletteColorHex(ThemeFamily.Light, random);
      const { s, l } = tinycolor(color).toHsl();

      assert.ok(tinycolor(color).isValid());
      assert.ok(s >= 0.51 && s <= 0.69);
      assert.ok(l >= 0.67 && l <= 0.69);
    }
  });

  test('selects the foreground with the stronger readable contrast', () => {
    const background = '#498aff';
    const foreground = getContrastingForegroundColorHex(background, '#15202b', '#e7e7e7');

    assert.equal(foreground, '#15202b');
    assert.ok(tinycolor.readability(background, foreground) >= ReadabilityRatios.Text);
  });

  test('preserves the selected user foreground override alpha', () => {
    const foreground = getContrastingForegroundColorHex('#ffffff', '#12345680', '#ffffff');

    assert.equal(foreground, '#12345680');
  });

  test('derives deterministic light and dark surface hierarchies', () => {
    const color = '#385d80';
    const expectedColors = [
      [SurfaceKind.SideBar, ThemeFamily.Light, '#d7e1ea', '#15202b'],
      [SurfaceKind.SideBarChrome, ThemeFamily.Light, '#e4ebf1', '#15202b'],
      [SurfaceKind.Panel, ThemeFamily.Light, '#f2f5f7', '#15202b'],
      [SurfaceKind.PanelChrome, ThemeFamily.Light, '#e9edf1', '#15202b'],
      [SurfaceKind.SideBar, ThemeFamily.Dark, '#1d2935', '#e7e7e7'],
      [SurfaceKind.SideBarChrome, ThemeFamily.Dark, '#253646', '#e7e7e7'],
      [SurfaceKind.Panel, ThemeFamily.Dark, '#192129', '#e7e7e7'],
      [SurfaceKind.PanelChrome, ThemeFamily.Dark, '#242e38', '#e7e7e7'],
    ] as const;

    expectedColors.forEach(([surface, family, expected, foreground]) => {
      const derived = getSurfaceColorHex(color, surface, family);
      const hueDifference = Math.abs(tinycolor(derived).toHsl().h - tinycolor(color).toHsl().h);

      assert.equal(derived, expected);
      assert.match(derived, /^#[0-9a-f]{6}$/);
      assert.ok(hueDifference < 6);
      assert.ok(tinycolor.readability(derived, foreground) >= ReadabilityRatios.Text);
    });
  });

  test('derives opaque hue-preserving borders at each contrast tier', () => {
    const surfaces = ['#e4ebf1', '#253646'];
    const targets = [
      BorderContrastTarget.Subtle,
      BorderContrastTarget.Medium,
      BorderContrastTarget.Strong,
    ];

    surfaces.forEach(surface => {
      targets.forEach(target => {
        const border = getBorderColorHex(surface, target);
        const contrast = tinycolor.readability(surface, border);
        const hueDifference = Math.abs(tinycolor(border).toHsl().h - tinycolor(surface).toHsl().h);

        assert.match(border, /^#[0-9a-f]{6}$/);
        assert.ok(contrast >= target);
        assert.ok(contrast < target + 0.1);
        assert.ok(hueDifference < 2);
      });
    });
  });

  test('uses explicit theme family overrides', () => {
    assert.equal(resolveThemeFamily(CursorThemeFamily.Light, ThemeKind.Dark), ThemeFamily.Light);
    assert.equal(resolveThemeFamily(CursorThemeFamily.Dark, ThemeKind.Light), ThemeFamily.Dark);
  });

  test('maps automatic light and dark theme families', () => {
    assert.equal(resolveThemeFamily(CursorThemeFamily.Auto, ThemeKind.Light), ThemeFamily.Light);
    assert.equal(
      resolveThemeFamily(CursorThemeFamily.Auto, ThemeKind.HighContrastLight),
      ThemeFamily.Light,
    );
    assert.equal(resolveThemeFamily(CursorThemeFamily.Auto, ThemeKind.Dark), ThemeFamily.Dark);
    assert.equal(
      resolveThemeFamily(CursorThemeFamily.Auto, ThemeKind.HighContrast),
      ThemeFamily.Dark,
    );
  });
});

function createSeededRandom() {
  let seed = 123456789;
  return () => {
    seed = (1664525 * seed + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}
