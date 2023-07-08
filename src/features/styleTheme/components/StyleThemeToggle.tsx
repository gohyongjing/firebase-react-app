import { Button } from "components/form";
import { useStyleThemeContext } from "../contexts";
import { MoonIcon, SunIcon } from 'lib/radixUi';
import { useCallback } from "react";

export function StyleThemeToggle() {
  const { styleTheme, setStyleTheme } = useStyleThemeContext();

  const handleClick = useCallback(() => {
    setStyleTheme(styleTheme === 'light' ? 'dark' : 'light');
  }, [styleTheme, setStyleTheme])

  return (
    <Button
      onClick={handleClick}
      className="py-2"
    >
      {
        styleTheme === 'light'
          ? <SunIcon />
          : <MoonIcon />
      }
    </Button>
  );
}
