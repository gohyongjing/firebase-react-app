import { useStyleThemeContext } from "../contexts";
import { MoonIcon, SunIcon, Toggle } from 'lib/radixUi';
import { useCallback } from "react";

export function StyleThemeToggle() {
  const { styleTheme, setStyleTheme } = useStyleThemeContext();

  const handlePress = useCallback(() => {
    setStyleTheme(styleTheme === 'light' ? 'dark' : 'light');
  }, [styleTheme, setStyleTheme])

  return (
    <Toggle.Root
      pressed={styleTheme === 'dark'}
      onPressedChange={handlePress}
      className="border-2 p-2 rounded-lg border-primary-1 dark:border-primary-3 dark:text-primary-3"
    >
      {
        styleTheme === 'light'
          ? <SunIcon />
          : <MoonIcon />
      }
    </Toggle.Root>
  );
}
