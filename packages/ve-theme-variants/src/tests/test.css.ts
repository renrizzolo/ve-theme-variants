import { NullableStyleRule, NullableTokens } from "../../dist";
import {
  ThemedStyleVariants,
  createThemeVariants,
} from "../createThemeVariants";

export const themeVariants = createThemeVariants(
  {
    brand: {
      primary: "null",
    },
  },
  [
    {
      light: {
        brand: {
          primary: "blue",
        },
      },
      dark: {
        brand: {
          primary: "darkblue",
        },
      },
    },
  ]
);

export const themeVariantWithSelectors = createThemeVariants(
  {
    button: {
      backgroundColor: "null",
      fontWeight: "null",
      selectors: {
        "&:hover": {
          backgroundColor: "null",
        },
        "&:hover:active": {
          borderColor: "null",
        },
      },
    } satisfies NullableStyleRule,
  },
  [
    {
      light: {
        button: {
          backgroundColor: "red",
          fontWeight: 500,
          selectors: {
            "&:hover": {
              backgroundColor: "crimson",
            },
            "&:hover:active": {
              borderColor: "yellow",
            },
          },
        },
      },
      dark: {
        button: {
          backgroundColor: "yellow",
          fontWeight: 600,
          selectors: {
            "&:hover": {
              backgroundColor: "orange",
            },
            "&:hover:active": {
              borderColor: "red",
            },
          },
        },
      },
    } satisfies ThemedStyleVariants,
  ]
);

export const themeVariantsWithHighContrast = createThemeVariants<
  "dark" | "light" | "highContrast"
>(
  {
    brand: {
      primary: "null",
    },
  },
  [
    {
      light: {
        brand: {
          primary: "blue",
        },
      },
      dark: {
        brand: {
          primary: "darkblue",
        },
      },
      highContrast: {
        brand: {
          primary: "blue",
        },
      },
    },
  ]
);
