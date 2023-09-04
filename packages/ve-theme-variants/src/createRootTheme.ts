import {
  createGlobalTheme,
  createGlobalThemeContract,
} from "@vanilla-extract/css";
import kebabCase from "just-kebab-case";

export const createRootTheme = <TTokens extends Record<string, any>>(
  tokens: TTokens,
  mapFn?: Parameters<typeof createGlobalThemeContract>[1]
) => {
  // apply tokens to :root
  const rootVars = createGlobalThemeContract(
    tokens,
    mapFn
      ? mapFn
      : (_value, path) => {
          return `${path.map(kebabCase).join("-")}`;
        }
  );

  createGlobalTheme(":root", rootVars, tokens);
  return rootVars;
};
