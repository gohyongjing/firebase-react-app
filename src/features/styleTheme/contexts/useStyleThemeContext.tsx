import { useSyncCachedExternalStore } from "hooks";
import { ReactNode, createContext, useCallback, useContext } from "react";
import { StyleTheme } from "../types";
import { DEFAULT_STYLE_THEME, getStyleTheme, setStyleTheme } from "../utility";

interface StyleThemeContext {
  styleTheme: StyleTheme
  setStyleTheme: (newStyleTheme: StyleTheme) => void
}

const DEFAULT_STYLE_THEME_CONTEXT: StyleThemeContext = {
  styleTheme: DEFAULT_STYLE_THEME,
  setStyleTheme: () => {}
}

const StyleThemeContextComponent = createContext(DEFAULT_STYLE_THEME_CONTEXT);

export function useStyleThemeContext() {
  return useContext(StyleThemeContextComponent);
}

interface Props {
  children?: ReactNode
}

export function StyleThemeContextProvider({ children }: Props) {

  const fetchExternalStore: () => Promise<StyleTheme> = useCallback(() => (
    Promise.resolve(getStyleTheme())
  ), [])
  const { data, updateExternalStore } = useSyncCachedExternalStore<StyleTheme>(fetchExternalStore);
  const styleTheme = data ? data : DEFAULT_STYLE_THEME;
  const setStyleThemeWrapped = useCallback((newStyleTheme: StyleTheme) => {
    updateExternalStore(
      newStyleTheme,
      () => Promise.resolve(setStyleTheme(newStyleTheme))
    )
  }, [updateExternalStore])

  console.log('style theme context rerender', styleTheme)
  return (
    <StyleThemeContextComponent.Provider
      value={{
        styleTheme: styleTheme,
        setStyleTheme: setStyleThemeWrapped
      }}
    >
      <div
        className={styleTheme}
      >
        { children }
      </div>
      
    </StyleThemeContextComponent.Provider>
  );
}
