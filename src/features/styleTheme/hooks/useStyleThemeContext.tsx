import { useContext } from "react";
import { StyleThemeContext } from "../contexts/StyleThemeContext";

export function useStyleThemeContext() {
  return useContext(StyleThemeContext);
}
