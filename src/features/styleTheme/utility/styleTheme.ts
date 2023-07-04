import { getModelOperationsWithKey } from "utility/localStorage";
import { StyleTheme } from "../types";

export const DEFAULT_STYLE_THEME = 'light';

const { getModel, setModel } = getModelOperationsWithKey(
  'styleTheme',
  DEFAULT_STYLE_THEME,
  checkIsStyleTheme
);

export function checkIsStyleTheme(s: unknown): s is StyleTheme {
  return s === 'light' || s === 'dark';
}

export const getStyleTheme = getModel;

export const setStyleTheme: (
  newStyleTheme: StyleTheme
) => void = setModel;
