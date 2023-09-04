import { createThemeVariants } from "ve-theme-variants";
import { actionVariants, actionVariantsContract } from "./variants/actions.css";
import { textVariants, textVariantsContract } from "./variants/text.css";
import {
  surfaceVariants,
  surfaceVariantsContract,
} from "./variants/surface.css";

export const {
  themeVars: vars,
  themeSelectors: selectors,
  themeClasses: themes,
} = createThemeVariants(
  {
    ...textVariantsContract,
    ...actionVariantsContract,
    ...surfaceVariantsContract,
  },
  [textVariants, actionVariants, surfaceVariants]
);
