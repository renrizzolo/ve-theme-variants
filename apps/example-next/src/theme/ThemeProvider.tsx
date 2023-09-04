import * as React from "react";
import { themes } from "./theme.css";

// some bits from https://github.com/pacocoursey/next-themes

export type TMode = "user" | "system";
export type TTheme = "light" | "dark";

export interface ThemeContextProps {
  mode: TMode;
  theme: TTheme;
  setModeTheme: (mode: TMode, theme?: TTheme) => void;
  wrapperProps?: {
    "data-theme"?: string;
    className?: string;
  };
}

const ThemeContext = React.createContext<ThemeContextProps>({
  mode: "user",
  theme: "light",
  setModeTheme: () => {},
});

const prefersDark = "(prefers-color-scheme: dark)";

const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
  if (typeof window === "undefined") return "light";
  if (!e) e = window.matchMedia(prefersDark);
  const isDark = e.matches;
  return isDark ? "dark" : "light";
};

export const getThemeClass = (mode: TTheme = "light") =>
  mode === "light" ? themes.light : themes.dark;

export const ThemeProvider = ({
  defaultMode = "user",
  defaultTheme = "light",
  onChangeMode,
  children,
}: React.PropsWithChildren<{
  defaultMode?: TMode;
  defaultTheme?: TTheme;
  onChangeMode?: (theme: TTheme, mode: TMode) => void;
}>) => {
  const [theme, setTheme] = React.useState<TTheme>(defaultTheme);
  const [mode, _setMode] = React.useState<TMode>(defaultMode);

  const actualTheme = theme;
  const themeClass = actualTheme === "light" ? themes.light : themes.dark;

  React.useEffect(() => {
    _setMode(defaultMode);
  }, [defaultMode]);

  React.useEffect(() => {
    if (!themeClass) return;

    document.documentElement.style.colorScheme = actualTheme;

    document.body.classList.remove(
      actualTheme === "light" ? themes.dark : themes.light
    );
    document.body.classList.add(themeClass);
  }, [actualTheme, themeClass]);

  const setModeTheme = React.useCallback(
    (nextMode: TMode, nextTheme?: TTheme) => {
      const actualTheme =
        nextMode === "system" ? getSystemTheme() : nextTheme || "light";
      onChangeMode?.(actualTheme, nextMode);

      _setMode(nextMode);
      setTheme(actualTheme);
    },
    [onChangeMode]
  );

  const handleMediaQuery = React.useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      if (mode !== "system") return;
      // not sure if this state is needed here
      const systemTheme = getSystemTheme(e);
      setTheme(systemTheme);
      onChangeMode?.(systemTheme, mode);
    },
    [mode, onChangeMode]
  );

  React.useEffect(() => {
    const mediaMatch = window.matchMedia(prefersDark);
    // Intentionally use deprecated listener methods to support iOS & old browsers
    mediaMatch.addListener(handleMediaQuery);
    return () => mediaMatch.removeListener(handleMediaQuery);
  }, [handleMediaQuery]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        theme: actualTheme,
        setModeTheme,
        wrapperProps: {
          className: themeClass,
          "data-theme": mode,
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.displayName = "ThemeProvider";

export const useThemeValue = () => React.useContext(ThemeContext);
