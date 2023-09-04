import { ThemedStyleVariants, NullableStyleRule } from "ve-theme-variants";
import { createVar } from "@vanilla-extract/css";
import { color } from "../root.css";

export const focusRingColor = createVar("action-focus-color");

const actionContract = {
  color: "null",
  backgroundColor: "null",
  selectors: {
    "&:hover": {
      backgroundColor: "null",
      color: "null",
    },
  },
  vars: { [focusRingColor]: "null" },
  // use satisfies NullableStyleRule for style rule autocomplete
  // N.B you can use NullableTokens instead, if you want
  // to use arbitrary keys and map them to styles yourself
  // (e.g 'tone' instead of 'color')
} satisfies NullableStyleRule;

export const actionVariantsContract = {
  actionPrimary: actionContract,
  actionSecondary: actionContract,
};

export const actionVariants: ThemedStyleVariants = {
  light: {
    actionPrimary: {
      color: "white",
      backgroundColor: color["indigo-800"],
      selectors: {
        "&:hover": {
          backgroundColor: color["indigo-600"],
          color: "white",
        },
      },
      vars: {
        [focusRingColor]: color["indigo-400"],
      },
    },
    actionSecondary: {
      color: color["indigo-700"],
      backgroundColor: color["zinc-100"],
      selectors: {
        "&:hover": {
          color: color["indigo-800"],
          backgroundColor: color["zinc-200"],
        },
      },
      vars: {
        [focusRingColor]: color["zinc-400"],
      },
    },
  },
  dark: {
    actionPrimary: {
      color: color["indigo-100"],
      backgroundColor: color["indigo-800"],
      selectors: {
        "&:hover": {
          backgroundColor: color["indigo-700"],
          color: "white",
        },
      },
      vars: {
        [focusRingColor]: color["indigo-500"],
      },
    },
    actionSecondary: {
      color: color["indigo-200"],
      backgroundColor: color["zinc-800"],
      selectors: {
        "&:hover": {
          color: color["indigo-100"],
          backgroundColor: color["zinc-700"],
        },
      },
      vars: {
        [focusRingColor]: color["zinc-500"],
      },
    },
  },
};
