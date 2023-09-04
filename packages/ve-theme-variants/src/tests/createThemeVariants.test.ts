import "@vanilla-extract/css/disableRuntimeStyles";

import { describe, expect, test } from "vitest";
import { createThemeVariants } from "../createThemeVariants";
import {
  themeVariantWithSelectors,
  themeVariants,
  themeVariantsWithHighContrast,
} from "./test.css";

describe("createThemeVariants", () => {
  test("throws when variants are empty", () => {
    expect(() => createThemeVariants({}, [])).toThrowError(
      "ve-theme-variants: at least one variant object is required"
    );
  });
  test("returns expected object", () => {
    expect(themeVariants).toStrictEqual({
      themeClasses: {
        dark: expect.stringMatching(/^test__/),
        light: expect.stringMatching(/^test__/),
      },
      themeSelectors: {
        dark: expect.stringMatching(/^test__/),
        light: expect.stringMatching(/^test__/),
      },
      themeVars: {
        brand: {
          primary: "var(--brand-primary)",
        },
      },
    });
  });

  test("returns expected object with custom theme keys", () => {
    expect(themeVariantsWithHighContrast).toEqual(
      expect.objectContaining({
        themeClasses: {
          dark: expect.stringMatching(/^test__/),
          light: expect.stringMatching(/^test__/),
          highContrast: expect.stringMatching(/^test__/),
        },
        themeSelectors: {
          dark: expect.stringMatching(/^test__/),
          light: expect.stringMatching(/^test__/),
          highContrast: expect.stringMatching(/^test__/),
        },
        themeVars: {
          brand: {
            primary: "var(--brand-primary)",
          },
        },
      })
    );
  });

  test("returns expected variable names with selectors", () => {
    expect(
      themeVariantWithSelectors.themeVars.button.selectors["&:hover:active"]
        .borderColor
    ).toEqual("var(--button-hover-active-border-color)");
    expect(
      themeVariantWithSelectors.themeVars.button.selectors["&:hover"]
        .backgroundColor
    ).toEqual("var(--button-hover-background-color)");
  });
});
