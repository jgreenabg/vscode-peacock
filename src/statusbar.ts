import { StatusBarAlignment, window, StatusBarItem } from 'vscode';
import { getShowColorInStatusBar, getEnvironmentAwareColor } from './configuration';
import { Commands } from './models';

let _statusBarItem: StatusBarItem | undefined;

function ensureStatusBarItem(): StatusBarItem {
  if (!_statusBarItem) {
    _statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
  }
  return _statusBarItem;
}

export const getStatusBarItem = () => {
  updateStatusBar();
  return ensureStatusBarItem();
};

export function clearStatusBar() {
  const sb = ensureStatusBarItem();
  sb.text = '';
  sb.hide();
}

export function updateStatusBar() {
  const sb = ensureStatusBarItem();
  const show = getShowColorInStatusBar();
  const color = getEnvironmentAwareColor();
  sb.text = `$(paintcan) ${color}`;
  sb.command = Commands.showAndCopyCurrentColor;
  sb.tooltip = 'Copy the Peacock color';
  if (show && !!color) {
    sb.show();
  } else {
    clearStatusBar();
  }
}
