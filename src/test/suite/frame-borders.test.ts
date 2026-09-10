import * as assert from 'assert';
import * as sinon from 'sinon';
import * as vscode from 'vscode';

import { applyColor } from '../../apply-color';
import {
  getAffectedElements,
  getColorCustomizationConfigFromWorkspace,
  prepareColors,
  updateAffectedElements,
  updateKeepForegroundColor,
  updateWorkspaceConfiguration,
} from '../../configuration';
import { getReadabilityRatio } from '../../color-library';
import {
  BorderContrastTarget,
  ColorSettings,
  IPeacockAffectedElementSettings,
  IPeacockSettings,
} from '../../models';
import { setupTest, setupTestSuite, teardownTestSuite } from './lib/setup-teardown-test-suite';

suite('Cursor frame borders', () => {
  const originalValues = {} as IPeacockSettings;
  const peacockColor = '#385d80';
  let appNameStub: sinon.SinonStub;
  let activeThemeStub: sinon.SinonStub;

  suiteSetup(async () => await setupTestSuite(originalValues));
  suiteTeardown(async () => await teardownTestSuite(originalValues));

  setup(async () => {
    await setupTest();
    appNameStub = sinon.stub(vscode.env, 'appName').value('Cursor');
    activeThemeStub = sinon
      .stub(vscode.window, 'activeColorTheme')
      .value({ kind: vscode.ColorThemeKind.Light });
    await setBorderSettings(false);
  });

  teardown(async () => {
    appNameStub.restore();
    activeThemeStub.restore();
    await updateKeepForegroundColor(false);
  });

  test('keeps stronger frame indicators disabled by default', async () => {
    await applyColor(peacockColor);
    const config = getColorCustomizationConfigFromWorkspace();

    assert.equal(getAffectedElements().frameIndicators, false);
    assert.ok(config[ColorSettings.activityBar_border]);
    assert.ok(config[ColorSettings.panelTitle_border]);
    assert.ok(!config[ColorSettings.activityBar_activeBorder]);
    assert.ok(!config[ColorSettings.panelTitle_activeBorder]);
  });

  test('emits safe borders at their local contrast targets', async () => {
    await applyColor(peacockColor);
    const config = getColorCustomizationConfigFromWorkspace();

    assertContrast(
      config[ColorSettings.titleBar_activeBackground],
      config[ColorSettings.window_activeBorder],
      BorderContrastTarget.Strong,
    );
    assertContrast(
      config[ColorSettings.titleBar_activeBackground],
      config[ColorSettings.window_inactiveBorder],
      BorderContrastTarget.Subtle,
    );
    assertContrast(
      config[ColorSettings.activityBar_background],
      config[ColorSettings.activityBar_border],
      BorderContrastTarget.Medium,
    );
    assertContrast(
      config[ColorSettings.sideBar_background],
      config[ColorSettings.sideBarActivityBarTop_border],
      BorderContrastTarget.Medium,
    );
    assertContrast(
      config[ColorSettings.statusBar_background],
      config[ColorSettings.statusBar_noFolderBorder],
      BorderContrastTarget.Medium,
    );
    assertContrast(
      config[ColorSettings.panel_background],
      config[ColorSettings.panelBorder],
      BorderContrastTarget.Subtle,
    );
    assertContrast(
      config[ColorSettings.panelSectionHeader_background],
      config[ColorSettings.panelTitle_border],
      BorderContrastTarget.Subtle,
    );
    assertContrast(
      config[ColorSettings.panelSectionHeader_background],
      config[ColorSettings.panelSection_border],
      BorderContrastTarget.Subtle,
    );
  });

  test('emits stronger frame indicators only when enabled', async () => {
    await setBorderSettings(true);
    await applyColor(peacockColor);
    const config = getColorCustomizationConfigFromWorkspace();

    [
      ColorSettings.activityBar_activeBorder,
      ColorSettings.activityBar_activeFocusBorder,
      ColorSettings.activityBarTop_activeBorder,
      ColorSettings.activityBarTop_dropBorder,
      ColorSettings.activityBar_dropBorder,
    ].forEach(setting => {
      assertContrast(
        config[ColorSettings.activityBar_background],
        config[setting],
        BorderContrastTarget.Strong,
      );
    });
    [ColorSettings.statusBar_focusBorder, ColorSettings.statusBarItem_focusBorder].forEach(
      setting => {
        assertContrast(
          config[ColorSettings.statusBar_background],
          config[setting],
          BorderContrastTarget.Strong,
        );
      },
    );
    assertContrast(
      config[ColorSettings.panelSectionHeader_background],
      config[ColorSettings.panelTitle_activeBorder],
      BorderContrastTarget.Strong,
    );
    assertContrast(
      config[ColorSettings.panel_background],
      config[ColorSettings.panel_dropBorder],
      BorderContrastTarget.Strong,
    );
  });

  test('keeps border indicators when foreground coloring is disabled', async () => {
    await setBorderSettings(true);
    await updateKeepForegroundColor(true);

    await applyColor(peacockColor);
    const config = getColorCustomizationConfigFromWorkspace();

    assert.ok(config[ColorSettings.activityBar_activeBorder]);
    assert.ok(config[ColorSettings.panelTitle_activeBorder]);
    assert.ok(!config[ColorSettings.sideBarTitle_foreground]);
  });

  test('removes the leaking inactive command center border in Cursor', async () => {
    await updateWorkspaceConfiguration({
      [ColorSettings.commandCenter_inactiveBorder]: '#ffffff',
    });

    await applyColor(peacockColor);
    const config = getColorCustomizationConfigFromWorkspace();

    assert.ok(!config[ColorSettings.commandCenter_inactiveBorder]);
  });

  test('does not emit editor or global workbench color tokens', () => {
    const colors = prepareColors(peacockColor);
    const prohibitedSettings = [
      'editor.background',
      'editorGroup.border',
      'editorGroupHeader.tabsBackground',
      'tab.activeBackground',
      'focusBorder',
      'contrastBorder',
      'foreground',
      'icon.foreground',
      'input.background',
      'list.activeSelectionBackground',
    ];

    prohibitedSettings.forEach(setting => assert.ok(!(setting in colors)));
  });

  async function setBorderSettings(frameIndicators: boolean) {
    await updateAffectedElements({
      activityBar: true,
      statusBar: true,
      debuggingStatusBar: false,
      titleBar: true,
      editorGroupBorder: true,
      frameIndicators,
      panelBackground: true,
      panelBorder: true,
      sideBarBackground: true,
      sideBarBorder: true,
      sashHover: false,
      statusAndTitleBorders: true,
      tabActiveBorder: false,
    } as IPeacockAffectedElementSettings);
  }
});

function assertContrast(background: string, border: string, target: number) {
  const contrast = getReadabilityRatio(background, border);
  assert.ok(contrast >= target, `${contrast}:1 did not meet ${target}:1`);
}
