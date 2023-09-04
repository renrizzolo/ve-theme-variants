import { ThemedStyleVariants, NullableStyleRule } from "ve-theme-variants";

export const textVariants: ThemedStyleVariants = {
  light: {
    textBase: { color: "black" },
  },
  dark: {
    textBase: { color: "white" },
  },
};

const textContract = {
  color: "null",
} satisfies NullableStyleRule;

export const textVariantsContract = {
  textBase: textContract,
};
