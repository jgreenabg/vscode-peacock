export enum StandardSettings {
  Color = 'color',
  CursorThemeFamily = 'cursorThemeFamily',
  DarkenLightenPercentage = 'darkenLightenPercentage',
  DarkForegroundColor = 'darkForegroundColor',
  ElementAdjustments = 'elementAdjustments',
  FavoriteColors = 'favoriteColors',
  KeepBadgeColor = 'keepBadgeColor',
  KeepForegroundColor = 'keepForegroundColor',
  LightForegroundColor = 'lightForegroundColor',
  RemoteColor = 'remoteColor',
  ShowColorInStatusBar = 'showColorInStatusBar',
  SquigglyBeGone = 'squigglyBeGone',
  SurpriseMeFromFavoritesOnly = 'surpriseMeFromFavoritesOnly',
  SurpriseMeOnStartup = 'surpriseMeOnStartup',
}

export enum AffectedSettings {
  EditorGroupBorder = 'affectEditorGroupBorder',
  FrameIndicators = 'affectFrameIndicators',
  PanelBackground = 'affectPanelBackground',
  PanelBorder = 'affectPanelBorder',
  SideBarBackground = 'affectSideBarBackground',
  SideBarBorder = 'affectSideBarBorder',
  SashHover = 'affectSashHover',
  ActivityBar = 'affectActivityBar',
  DebuggingStatusBar = 'affectDebuggingStatusBar',
  StatusBar = 'affectStatusBar',
  StatusAndTitleBorders = 'affectStatusAndTitleBorders',
  TabActiveBorder = 'affectTabActiveBorder',
  TitleBar = 'affectTitleBar',
}

export type AllSettings = StandardSettings | AffectedSettings;

export enum Commands {
  addRecommendedFavorites = 'peacock.addRecommendedFavorites',
  changeColorToRandom = 'peacock.changeColorToRandom',
  changeColorToPeacockGreen = 'peacock.changeColorToPeacockGreen',
  changeColorToFavorite = 'peacock.changeColorToFavorite',
  darken = 'peacock.darken',
  enterColor = 'peacock.enterColor',
  lighten = 'peacock.lighten',
  removeAllColors = 'peacock.removeAllColors',
  resetWorkspaceColors = 'peacock.resetWorkspaceColors',
  saveColorToFavorites = 'peacock.saveColorToFavorites',
  showAndCopyCurrentColor = 'peacock.showAndCopyCurrentColor',
  showDocumentation = 'peacock.docs',
}

export enum ElementNames {
  activityBar = 'activityBar',
  statusBar = 'statusBar',
  titleBar = 'titleBar',
}

export enum ColorSettings {
  activityBar_activeBorder = 'activityBar.activeBorder',
  activityBar_activeFocusBorder = 'activityBar.activeFocusBorder',
  activityBar_activeBackground = 'activityBar.activeBackground',
  activityBar_background = 'activityBar.background',
  activityBar_border = 'activityBar.border',
  activityBar_dropBorder = 'activityBar.dropBorder',
  activityBar_foreground = 'activityBar.foreground',
  activityBar_inactiveForeground = 'activityBar.inactiveForeground',
  activityBar_badgeBackground = 'activityBarBadge.background',
  activityBar_badgeForeground = 'activityBarBadge.foreground',
  activityBarTop_activeBackground = 'activityBarTop.activeBackground',
  activityBarTop_activeBorder = 'activityBarTop.activeBorder',
  activityBarTop_foreground = 'activityBarTop.foreground',
  activityBarTop_background = 'activityBarTop.background',
  activityBarTop_dropBorder = 'activityBarTop.dropBorder',
  activityBarTop_inactiveForeground = 'activityBarTop.inactiveForeground',
  commandCenter_activeBackground = 'commandCenter.activeBackground',
  commandCenter_activeBorder = 'commandCenter.activeBorder',
  commandCenter_activeForeground = 'commandCenter.activeForeground',
  commandCenter_background = 'commandCenter.background',
  commandCenter_border = 'commandCenter.border',
  commandCenter_foreground = 'commandCenter.foreground',
  commandCenter_inactiveBorder = 'commandCenter.inactiveBorder',
  commandCenter_inactiveForeground = 'commandCenter.inactiveForeground',
  editorGroupBorder = 'editorGroup.border',
  panel_background = 'panel.background',
  panel_dropBorder = 'panel.dropBorder',
  panelBorder = 'panel.border',
  panelSection_border = 'panelSection.border',
  panelSectionHeader_background = 'panelSectionHeader.background',
  panelSectionHeader_border = 'panelSectionHeader.border',
  panelSectionHeader_foreground = 'panelSectionHeader.foreground',
  panelStickyScroll_background = 'panelStickyScroll.background',
  panelStickyScroll_border = 'panelStickyScroll.border',
  panelTitle_activeForeground = 'panelTitle.activeForeground',
  panelTitle_activeBorder = 'panelTitle.activeBorder',
  panelTitle_border = 'panelTitle.border',
  panelTitle_inactiveForeground = 'panelTitle.inactiveForeground',
  sideBar_background = 'sideBar.background',
  sideBarActivityBarTop_border = 'sideBarActivityBarTop.border',
  sideBar_foreground = 'sideBar.foreground',
  sideBarBorder = 'sideBar.border',
  sideBarSectionHeader_background = 'sideBarSectionHeader.background',
  sideBarSectionHeader_border = 'sideBarSectionHeader.border',
  sideBarSectionHeader_foreground = 'sideBarSectionHeader.foreground',
  sideBarStickyScroll_background = 'sideBarStickyScroll.background',
  sideBarStickyScroll_border = 'sideBarStickyScroll.border',
  sideBarTitle_background = 'sideBarTitle.background',
  sideBarTitle_border = 'sideBarTitle.border',
  sideBarTitle_foreground = 'sideBarTitle.foreground',
  sashHover = 'sash.hoverBorder',
  squigglyBeGone_error = 'editorError.foreground',
  squigglyBeGone_warning = 'editorWarning.foreground',
  squigglyBeGone_info = 'editorInfo.foreground',
  statusBar_border = 'statusBar.border',
  statusBar_background = 'statusBar.background',
  statusBar_focusBorder = 'statusBar.focusBorder',
  statusBar_foreground = 'statusBar.foreground',
  statusBar_noFolderBorder = 'statusBar.noFolderBorder',
  statusBar_debuggingBorder = 'statusBar.debuggingBorder',
  statusBar_debuggingBackground = 'statusBar.debuggingBackground',
  statusBar_debuggingForeground = 'statusBar.debuggingForeground',
  statusBarItem_hoverBackground = 'statusBarItem.hoverBackground',
  statusBarItem_focusBorder = 'statusBarItem.focusBorder',
  statusBarItem_remoteBackground = 'statusBarItem.remoteBackground',
  statusBarItem_remoteForeground = 'statusBarItem.remoteForeground',
  tabActiveBorder = 'tab.activeBorder',
  titleBar_activeBackground = 'titleBar.activeBackground',
  titleBar_activeForeground = 'titleBar.activeForeground',
  titleBar_border = 'titleBar.border',
  titleBar_inactiveBackground = 'titleBar.inactiveBackground',
  titleBar_inactiveForeground = 'titleBar.inactiveForeground',
  window_activeBorder = 'window.activeBorder',
  window_inactiveBorder = 'window.inactiveBorder',
}

export enum LegacyColorSettings {
  activityBarTop_activeForeground = 'activityBarTop.activeForeground',
}

export type ColorAdjustment = 'lighten' | 'darken' | 'none';

export enum ColorAdjustmentOptions {
  lighten = 'lighten',
  darken = 'darken',
  none = 'none',
}

export enum Sections {
  peacockColorCustomizationSection = 'workbench.colorCustomizations',
  peacockSection = 'peacock',
}

export enum ForegroundColors {
  DarkForeground = '#15202b',
  LightForeground = '#e7e7e7',
}

// See WebAIM contrast guidelines: https://webaim.org/articles/contrast/
export enum ReadabilityRatios {
  UserInterfaceLow = 2,
  UserInterface = 3,
  Text = 4.5,
}

export enum BorderContrastTarget {
  Subtle = 1.5,
  Medium = 2,
  Strong = 3,
}

export enum ColorSource {
  WorkspaceValue = 'workspaceValue',
  GlobalValue = 'globalValue',
  DefaultValue = 'defaultValue',
  None = 'none',
}

export enum CursorThemeFamily {
  Auto = 'auto',
  Light = 'light',
  Dark = 'dark',
}

export enum ThemeFamily {
  Light = 'light',
  Dark = 'dark',
}

export enum ThemeKind {
  Light = 1,
  Dark = 2,
  HighContrast = 3,
  HighContrastLight = 4,
}

export enum SurfaceKind {
  SideBar = 'sideBar',
  SideBarChrome = 'sideBarChrome',
  Panel = 'panel',
  PanelChrome = 'panelChrome',
}
