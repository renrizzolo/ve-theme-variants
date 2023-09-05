import {
  StyleRule,
  createGlobalThemeContract,
  createTheme,
} from "@vanilla-extract/css";
import { addFunctionSerializer } from "@vanilla-extract/css/functionSerializer";

import kebabCase from "just-kebab-case";

export type ThemedStyleVariants<
  U extends string = "light" | "dark",
  T = unknown
> = Record<U, Record<string, T extends unknown ? StyleRule : T>>;

export type NullableTokens = {
  [key: string]: string | NullableTokens | null;
};
export type GenericTokens = {
  [key: string]: string | number | GenericTokens;
};

export type NullableStyleRule = Partial<
  Record<keyof Omit<StyleRule, "selectors" | "vars">, "null">
> & {
  selectors?: { [x: string]: Omit<NullableStyleRule, "selectors"> };
  vars?: { [x: string]: string };
};
export function createThemeVariants<
  TThemeKeys extends string = "light" | "dark",
  TThemeContract extends NullableTokens = NullableTokens
>(
  themeContract: TThemeContract,
  variants: (
    | ThemedStyleVariants<TThemeKeys>
    | Record<TThemeKeys, GenericTokens>
  )[],
  mapFn?: Parameters<typeof createGlobalThemeContract>[1]
) {
  function _createThemeVariants<
    TThemeKeys extends string = "light" | "dark",
    TThemeContract extends NullableTokens = NullableTokens
  >(
    themeContract: TThemeContract,
    variants: (
      | ThemedStyleVariants<TThemeKeys>
      | Record<TThemeKeys, GenericTokens>
    )[],
    mapFn?: Parameters<typeof createGlobalThemeContract>[1]
  ) {
    if (!variants[0]) {
      throw new Error(
        "ve-theme-variants: at least one variant object is required"
      );
    }

    const themeVars = createGlobalThemeContract(
      themeContract,
      mapFn
        ? mapFn
        : (_value, path) => {
            return `${path
              // strip out &: and selectors so we don't get funky variable names
              .map((p) => p.replace("&:", "").replace("selectors", ""))
              .filter(Boolean)
              .map(kebabCase)
              .join("-")}`;
          }
    );

    const keys = Object.keys(variants[0]) as [TThemeKeys];

    const themeClasses: Partial<Record<TThemeKeys, string>> = {};
    const themeSelectors: Partial<Record<TThemeKeys, string>> = {};

    keys.forEach((k) => {
      let merged: Partial<ThemedStyleVariants<TThemeKeys, StyleRule>> = {};
      variants.map((variant) => (merged[k] = { ...merged[k], ...variant[k] }));

      themeClasses[k] = createTheme(
        themeVars,
        // not sure how to type this
        merged[k] as Record<keyof typeof themeVars, any>
      );
      themeSelectors[k] = `${themeClasses[k]} &`;
    });

    return {
      themeVars,
      themeClasses: themeClasses as Record<TThemeKeys, string>,
      themeSelectors: themeSelectors as Record<TThemeKeys, `${string} &`>,
    };
  }

  addFunctionSerializer(_createThemeVariants, {
    importPath: "ve-theme-variants",
    importName: "createThemeVariants",
    args: [themeContract],
  });
  return _createThemeVariants(themeContract, variants, mapFn);
}
