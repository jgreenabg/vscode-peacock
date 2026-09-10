import * as assert from 'assert';
import * as sinon from 'sinon';
import * as vscode from 'vscode';

import { applyColor } from '../../apply-color';
import {
  getColorCustomizationConfigFromWorkspace,
  updateKeepForegroundColor,
  updatePeacockColor,
} from '../../configuration';
import { applyPeacock } from '../../extension';
import { ColorSettings, ForegroundColors, IPeacockSettings, ReadabilityRatios } from '../../models';
import { getReadabilityRatio } from '../../color-library';
import { setupTest, setupTestSuite, teardownTestSuite } from './lib/setup-teardown-test-suite';

suite('Cursor title bar theme compatibility', () => {
  const originalValues = {} as IPeacockSettings;
  const darkPeacockColor = '#622d59';
  const lightPeacockColor = '#f9e64f';
  let appNameStub: sinon.SinonStub | undefined;
  let activeThemeStub: sinon.SinonStub | undefined;

  suiteSetup(async () => await setupTestSuite(originalValues));
  suiteTeardown(async () => await teardownTestSuite(originalValues));
  setup(async () => await setupTest());

  teardown(async () => {
    appNameStub?.restore();
    activeThemeStub?.restore();
    appNameStub = undefined;
    activeThemeStub = undefined;
    await updateKeepForegroundColor(false);
    await updatePeacockColor(undefined);
  });

  function stubHost(appName: string, themeKind: vscode.ColorThemeKind) {
    appNameStub = sinon.stub(vscode.env, 'appName').value(appName);
    stubTheme(themeKind);
  }

  function stubTheme(themeKind: vscode.ColorThemeKind) {
    activeThemeStub?.restore();
    activeThemeStub = sinon.stub(vscode.window, 'activeColorTheme').value({ kind: themeKind });
  }

  test('lightens a dark Peacock title bar for a light Cursor theme', async () => {
    stubHost('Cursor', vscode.ColorThemeKind.Light);

    await applyColor(darkPeacockColor);
    const config = getColorCustomizationConfigFromWorkspace();
    const titleBackground = config[ColorSettings.titleBar_activeBackground];
    const titleForeground = config[ColorSettings.titleBar_activeForeground];

    assert.notEqual(titleBackground, darkPeacockColor);
    assert.equal(titleForeground, ForegroundColors.DarkForeground);
    assert.ok(
      getReadabilityRatio(titleBackground, titleForeground) >= ReadabilityRatios.Text,
      'adapted title bar should meet the text contrast threshold',
    );
    assert.equal(config[ColorSettings.commandCenter_activeBackground], titleBackground);
    assert.equal(config[ColorSettings.commandCenter_activeForeground], titleForeground);
    assert.equal(config[ColorSettings.activityBar_background], darkPeacockColor);
    assert.equal(config[ColorSettings.statusBar_background], darkPeacockColor);
  });

  test('darkens a light Peacock title bar for a dark Cursor theme', async () => {
    stubHost('Cursor', vscode.ColorThemeKind.Dark);

    await applyColor(lightPeacockColor);
    const config = getColorCustomizationConfigFromWorkspace();
    const titleBackground = config[ColorSettings.titleBar_activeBackground];
    const titleForeground = config[ColorSettings.titleBar_activeForeground];

    assert.notEqual(titleBackground, lightPeacockColor);
    assert.equal(titleForeground, ForegroundColors.LightForeground);
    assert.ok(
      getReadabilityRatio(titleBackground, titleForeground) >= ReadabilityRatios.Text,
      'adapted title bar should meet the text contrast threshold',
    );
    assert.equal(config[ColorSettings.activityBar_background], lightPeacockColor);
    assert.equal(config[ColorSettings.statusBar_background], lightPeacockColor);
  });

  test('leaves matching Cursor theme families unchanged', async () => {
    stubHost('Cursor', vscode.ColorThemeKind.Light);
    await applyColor(lightPeacockColor);
    let config = getColorCustomizationConfigFromWorkspace();
    assert.equal(config[ColorSettings.titleBar_activeBackground], lightPeacockColor);

    stubTheme(vscode.ColorThemeKind.Dark);
    await applyColor(darkPeacockColor);
    config = getColorCustomizationConfigFromWorkspace();
    assert.equal(config[ColorSettings.titleBar_activeBackground], darkPeacockColor);
  });

  test('leaves VS Code title bar behavior unchanged', async () => {
    stubHost('Visual Studio Code', vscode.ColorThemeKind.Light);

    await applyColor(darkPeacockColor);
    const config = getColorCustomizationConfigFromWorkspace();

    assert.equal(config[ColorSettings.titleBar_activeBackground], darkPeacockColor);
    assert.equal(config[ColorSettings.titleBar_activeForeground], ForegroundColors.LightForeground);
  });

  test('maps high contrast themes to their light and dark families', async () => {
    stubHost('Cursor', vscode.ColorThemeKind.HighContrastLight);
    await applyColor(darkPeacockColor);
    let config = getColorCustomizationConfigFromWorkspace();
    assert.equal(config[ColorSettings.titleBar_activeForeground], ForegroundColors.DarkForeground);

    stubTheme(vscode.ColorThemeKind.HighContrast);
    await applyColor(lightPeacockColor);
    config = getColorCustomizationConfigFromWorkspace();
    assert.equal(config[ColorSettings.titleBar_activeForeground], ForegroundColors.LightForeground);
  });

  test('adapts the background without writing foreground overrides when requested', async () => {
    stubHost('Cursor', vscode.ColorThemeKind.Light);
    await updateKeepForegroundColor(true);

    await applyColor(darkPeacockColor);
    const config = getColorCustomizationConfigFromWorkspace();

    assert.notEqual(config[ColorSettings.titleBar_activeBackground], darkPeacockColor);
    assert.ok(!config[ColorSettings.titleBar_activeForeground]);
    assert.ok(!config[ColorSettings.commandCenter_foreground]);
  });

  test('reapplies the current color when the normal theme changes', async () => {
    stubHost('Cursor', vscode.ColorThemeKind.Light);
    await updatePeacockColor(darkPeacockColor);
    await applyColor(darkPeacockColor);

    let config = getColorCustomizationConfigFromWorkspace();
    assert.notEqual(config[ColorSettings.titleBar_activeBackground], darkPeacockColor);

    stubTheme(vscode.ColorThemeKind.Dark);
    const themeChange = {
      affectsConfiguration: (section: string) => section === 'workbench.colorTheme',
    } as vscode.ConfigurationChangeEvent;
    await applyPeacock(themeChange);

    config = getColorCustomizationConfigFromWorkspace();
    assert.equal(config[ColorSettings.titleBar_activeBackground], darkPeacockColor);
  });
});
