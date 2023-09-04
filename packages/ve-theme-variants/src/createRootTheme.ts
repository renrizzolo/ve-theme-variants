import {
  createGlobalTheme,
  createGlobalThemeContract,
} from "@vanilla-extract/css";

export const createRootTheme = <TTokens extends Record<string, any>>(
  tokens: TTokens
) => {
  // apply tokens to :root
  const rootVars = createGlobalThemeContract(tokens, (_value, path) => {
    return `${path.join("-")}`;
  });

  createGlobalTheme(":root", rootVars, tokens);
  return rootVars;
};
