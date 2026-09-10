import * as assert from 'assert';
import * as sinon from 'sinon';
import * as vscode from 'vscode';

import { applyColor, unapplyColors } from '../../apply-color';
import {
  getColorCustomizationConfigFromWorkspace,
  updateAffectedElements,
  updateKeepForegroundColor,
  updateWorkspaceConfiguration,
} from '../../configuration';
import { getReadabilityRatio } from '../../color-library';
import {
  ColorSettings,
  BorderContrastTarget,
  IPeacockAffectedElementSettings,
  IPeacockSettings,
  LegacyColorSettings,
  ReadabilityRatios,
  SurfaceKind,
  ThemeFamily,
} from '../../models';
import { getBorderColorHex, getSurfaceColorHex } from '../../palette-library';
import { setupTest, setupTestSuite, teardownTestSuite } from './lib/setup-teardown-test-suite';
import { allAffectedElements } from './lib/constants';

suite('Cursor matching surfaces', () => {
  const originalValues = {} as IPeacockSettings;
  const peacockColor = '#c7538c';
  let appNameStub: sinon.SinonStub;
  let activeThemeStub: sinon.SinonStub;

  suiteSetup(async () => await setupTestSuite(originalValues));
  suiteTeardown(async () => await teardownTestSuite(originalValues));

  setup(async () => {
    await setupTest();
    await updateAffectedElements(allAffectedElements);
    appNameStub = sinon.stub(vscode.env, 'appName').value('Cursor');
    activeThemeStub = sinon
      .stub(vscode.window, 'activeColorTheme')
      .value({ kind: vscode.ColorThemeKind.Dark });
  });

  teardown(async () => {
    appNameStub.restore();
    activeThemeStub.restore();
    await updateKeepForegroundColor(false);
  });

  test('does not emit matching surface tokens when disabled', async () => {
    await applyColor(peacockColor);
    const config = getColorCustomizationConfigFromWorkspace();

    assert.ok(!config[ColorSettings.sideBar_background]);
    assert.ok(!config[ColorSettings.sideBarTitle_background]);
    assert.ok(!config[ColorSettings.sideBarSectionHeader_background]);
    assert.ok(!config[ColorSettings.sideBarStickyScroll_background]);
    assert.ok(!config[ColorSettings.panel_background]);
    assert.ok(!config[ColorSettings.panelSectionHeader_background]);
    assert.ok(!config[ColorSettings.panelStickyScroll_background]);
    assert.ok(config[ColorSettings.activityBarTop_foreground]);
    assert.ok(!config[LegacyColorSettings.activityBarTop_activeForeground]);
  });

  test('emits deterministic matching surface colors and readable foregrounds', async () => {
    await updateAffectedElements({
      sideBarBackground: true,
      panelBackground: true,
    } as IPeacockAffectedElementSettings);

    await applyColor(peacockColor);
    const config = getColorCustomizationConfigFromWorkspace();
    const expectedSideBar = getSurfaceColorHex(peacockColor, SurfaceKind.SideBar, ThemeFamily.Dark);
    const expectedSideBarChrome = getSurfaceColorHex(
      peacockColor,
      SurfaceKind.SideBarChrome,
      ThemeFamily.Dark,
    );
    const expectedPanel = getSurfaceColorHex(peacockColor, SurfaceKind.Panel, ThemeFamily.Dark);
    const expectedPanelChrome = getSurfaceColorHex(
      peacockColor,
      SurfaceKind.PanelChrome,
      ThemeFamily.Dark,
    );

    assert.equal(config[ColorSettings.sideBar_background], expectedSideBar);
    assert.equal(config[ColorSettings.sideBarTitle_background], expectedSideBarChrome);
    assert.equal(config[ColorSettings.sideBarSectionHeader_background], expectedSideBarChrome);
    assert.equal(config[ColorSettings.sideBarStickyScroll_background], expectedSideBarChrome);
    assert.equal(config[ColorSettings.panel_background], expectedPanel);
    assert.equal(config[ColorSettings.panelSectionHeader_background], expectedPanelChrome);
    assert.equal(config[ColorSettings.panelStickyScroll_background], expectedPanelChrome);
    assert.ok(
      getReadabilityRatio(expectedSideBar, config[ColorSettings.sideBar_foreground]) >=
        ReadabilityRatios.Text,
    );
    assert.ok(
      getReadabilityRatio(expectedSideBarChrome, config[ColorSettings.sideBarTitle_foreground]) >=
        ReadabilityRatios.Text,
    );
    assert.equal(
      config[ColorSettings.sideBarTitle_foreground],
      config[ColorSettings.sideBarSectionHeader_foreground],
    );
    assert.ok(
      getReadabilityRatio(expectedPanel, config[ColorSettings.panelTitle_activeForeground]) >=
        ReadabilityRatios.Text,
    );
    assert.ok(
      getReadabilityRatio(
        expectedPanelChrome,
        config[ColorSettings.panelSectionHeader_foreground],
      ) >= ReadabilityRatios.Text,
    );
    assert.equal(
      config[ColorSettings.panelTitle_activeForeground],
      config[ColorSettings.panelTitle_inactiveForeground],
    );
    assert.ok(!config[ColorSettings.sideBarTitle_border]);
    assert.ok(!config[ColorSettings.panelSectionHeader_border]);
  });

  test('keeps theme foreground colors when requested', async () => {
    await updateAffectedElements({
      sideBarBackground: true,
      panelBackground: true,
    } as IPeacockAffectedElementSettings);
    await updateKeepForegroundColor(true);

    await applyColor(peacockColor);
    const config = getColorCustomizationConfigFromWorkspace();

    assert.ok(config[ColorSettings.sideBar_background]);
    assert.ok(config[ColorSettings.sideBarTitle_background]);
    assert.ok(config[ColorSettings.sideBarSectionHeader_background]);
    assert.ok(config[ColorSettings.sideBarStickyScroll_background]);
    assert.ok(config[ColorSettings.panel_background]);
    assert.ok(config[ColorSettings.panelSectionHeader_background]);
    assert.ok(config[ColorSettings.panelStickyScroll_background]);
    assert.ok(!config[ColorSettings.sideBar_foreground]);
    assert.ok(!config[ColorSettings.sideBarTitle_foreground]);
    assert.ok(!config[ColorSettings.sideBarSectionHeader_foreground]);
    assert.ok(!config[ColorSettings.panelTitle_activeForeground]);
    assert.ok(!config[ColorSettings.panelTitle_inactiveForeground]);
    assert.ok(!config[ColorSettings.panelSectionHeader_foreground]);
  });

  test('emits scoped borders only when existing border settings are enabled', async () => {
    await updateAffectedElements({
      sideBarBorder: true,
      panelBorder: true,
    } as IPeacockAffectedElementSettings);

    await applyColor(peacockColor);
    const config = getColorCustomizationConfigFromWorkspace();
    const sideBarChrome = getSurfaceColorHex(
      peacockColor,
      SurfaceKind.SideBarChrome,
      ThemeFamily.Dark,
    );
    const panelChrome = getSurfaceColorHex(peacockColor, SurfaceKind.PanelChrome, ThemeFamily.Dark);
    const expectedSideBar = getBorderColorHex(sideBarChrome, BorderContrastTarget.Subtle);
    const expectedPanel = getBorderColorHex(panelChrome, BorderContrastTarget.Subtle);

    assert.equal(config[ColorSettings.sideBarTitle_border], expectedSideBar);
    assert.equal(config[ColorSettings.sideBarSectionHeader_border], expectedSideBar);
    assert.equal(config[ColorSettings.sideBarStickyScroll_border], expectedSideBar);
    assert.equal(config[ColorSettings.panelSectionHeader_border], expectedPanel);
    assert.equal(config[ColorSettings.panelStickyScroll_border], expectedPanel);
    assert.ok(!config[ColorSettings.sideBarTitle_background]);
    assert.ok(!config[ColorSettings.panelSectionHeader_background]);
  });

  test('does not emit Cursor-only surface tokens in VS Code', async () => {
    appNameStub.restore();
    appNameStub = sinon.stub(vscode.env, 'appName').value('Visual Studio Code');
    await updateAffectedElements({
      sideBarBackground: true,
      panelBackground: true,
    } as IPeacockAffectedElementSettings);

    await applyColor(peacockColor);
    const config = getColorCustomizationConfigFromWorkspace();

    assert.ok(!config[ColorSettings.sideBar_background]);
    assert.ok(!config[ColorSettings.sideBarTitle_background]);
    assert.ok(!config[ColorSettings.panel_background]);
    assert.ok(!config[ColorSettings.panelSectionHeader_background]);
  });

  test('removes scoped surface tokens during cleanup', async () => {
    await updateAffectedElements({
      sideBarBackground: true,
      sideBarBorder: true,
      panelBackground: true,
      panelBorder: true,
    } as IPeacockAffectedElementSettings);
    await applyColor(peacockColor);

    await unapplyColors();
    const config = getColorCustomizationConfigFromWorkspace();

    assert.ok(!config[ColorSettings.sideBarTitle_background]);
    assert.ok(!config[ColorSettings.sideBarSectionHeader_foreground]);
    assert.ok(!config[ColorSettings.sideBarStickyScroll_border]);
    assert.ok(!config[ColorSettings.panelSectionHeader_background]);
    assert.ok(!config[ColorSettings.panelSectionHeader_foreground]);
    assert.ok(!config[ColorSettings.panelStickyScroll_border]);
  });

  test('removes the legacy unsupported top activity foreground token', async () => {
    await updateWorkspaceConfiguration({
      [LegacyColorSettings.activityBarTop_activeForeground]: '#ffffff',
    });

    await unapplyColors();
    const config = getColorCustomizationConfigFromWorkspace();

    assert.ok(!config[LegacyColorSettings.activityBarTop_activeForeground]);
  });
});
