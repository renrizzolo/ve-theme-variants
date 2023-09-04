import { createRootTheme } from "ve-theme-variants";
import { palette } from "./palette";

// applies these tokens to the global :root
// so our variants reference css variables
// instead of the palette hex values directly
export const { color } = createRootTheme({ color: palette });
