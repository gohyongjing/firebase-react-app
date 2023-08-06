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
      className="w-8 h-8 flex justify-center items-center"
    >
      {
        styleTheme === 'light'
          ? <SunIcon />
          : <MoonIcon />
      }
    </Toggle.Root>
  );
}
