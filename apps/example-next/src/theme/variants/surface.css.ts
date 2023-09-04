import { ThemedStyleVariants, NullableStyleRule } from "ve-theme-variants";
import { color } from "../root.css";

export const surfaceVariants: ThemedStyleVariants = {
  light: {
    surface0: { backgroundColor: color["zinc-100"] },
    surface1: { backgroundColor: color["zinc-200"] },
    surface2: { backgroundColor: color["zinc-300"] },
  },
  dark: {
    surface0: { backgroundColor: color["zinc-950"] },
    surface1: { backgroundColor: color["zinc-900"] },
    surface2: { backgroundColor: color["zinc-800"] },
  },
};

const surfaceContract = {
  backgroundColor: "null",
} satisfies NullableStyleRule;

export const surfaceVariantsContract = {
  surface0: surfaceContract,
  surface1: surfaceContract,
  surface2: surfaceContract,
};
