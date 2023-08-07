import { ReactNode, useCallback, useEffect } from "react";
import { StyleTheme } from "..";
import { DEFAULT_STYLE_THEME, getStyleTheme, setStyleTheme } from "../utility";
import { useSyncCachedExternalStore } from "hooks";
import { StyleThemeContext } from "../contexts/StyleThemeContext";

type Props = {
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
      () => {
        setStyleTheme(newStyleTheme);
        return Promise.resolve();
      }
    )
  }, [updateExternalStore])

  useEffect(() => {
    if (styleTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [styleTheme])

  return (
    <StyleThemeContext.Provider
      value={{
        styleTheme: styleTheme,
        setStyleTheme: setStyleThemeWrapped
      }}
    >
        { children }
    </StyleThemeContext.Provider>
  );
}
