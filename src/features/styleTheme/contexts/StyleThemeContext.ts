import { createContext } from "react";
import { StyleTheme } from "..";
import { DEFAULT_STYLE_THEME } from "../utility";

interface StyleThemeContextType {
  styleTheme: StyleTheme
  setStyleTheme: (newStyleTheme: StyleTheme) => void
}

const DEFAULT_STYLE_THEME_CONTEXT: StyleThemeContextType = {
  styleTheme: DEFAULT_STYLE_THEME,
  setStyleTheme: () => {}
}

export const StyleThemeContext = createContext(DEFAULT_STYLE_THEME_CONTEXT);
