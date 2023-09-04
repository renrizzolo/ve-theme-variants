# Vanilla Extract Theme Variants

A helper for creating theme based token variants for Vanilla Extract.

## Usage

```sh
npm i ve-theme-variants
```

See the [Next example app](/apps/example-next/) for a full example.

## createThemeVariants()

```tsx
// theme.css.ts

import { createThemeVariants } from "ve-theme-variants";

export const { themeVars, themeClasses, themeSelectors } = createThemeVariants(
  // this is the theme contract
  {
    brand: {
      primary: "null",
    },
    surface: {
      1: {
        background: "null",
      },
      2: {
        background: "null",
      },
    },
  },
  // these are the themed variants.
  // this is an array so you can create each
  // variant in isolation.
  [
    // brand
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
    // surface
    {
      light: {
        surface: {
          1: {
            background: "#FFFFFF",
          },
          2: {
            background: "#F8F8F8",
          },
        },
      },
      dark: {
        surface: {
          1: {
            background: "#000000",
          },
          2: {
            background: "#0C090A",
          },
        },
      },
    },
  ]
);
```

#### Return type

the function returns an object with these properties:

- `themeVars` are the css variables you can import and use in your `css.ts` files
  e.g `themeVars.brand.primary` = `'var(--brand-primary)'`
- `themeClasses` are the classes which when applied, will use that theme key's variants
  e.g if you apply `themeClasses.dark` to the body, dark variants will be used throughout. You can also apply a theme class to a nested element if you want to force that theme for a particular tree.
- `themeSelectors` are the theme classes with ` &` included, for targeting a theme in the Vanilla Extract `style` function.

#### Using your own `mapFn`

By default `createThemeVariants` maps the variable names to kebab-case (using `just-kebab-case`), and strips out `selectors` and `:&` from style keys.

You can pass a `mapFn` as the 3rd argument if you want to customize this

```tsx
  createThemeVariants({...}, [...],  (_value, path) => path.join("_").replace(/[&:,.()]+/g, "")
```

See [Formatting the variable names](https://vanilla-extract.style/documentation/global-api/create-global-theme-contract/#formatting-the-variable-names)

#### Using your own theme keys

By default `createThemeVariants` expects `light` and `dark` theme keys.
You can pass your own union type into the function like this:

```tsx
const themeVariants = createThemeVariants<
  "dark" | "light" | "print" | "high-contrast"
>();
```

## createRootTheme()

A light wrapper on top of [createGlobalThemeContract](https://vanilla-extract.style/documentation/global-api/create-global-theme-contract/) that applies the provided tokens to the `:root` and formats them to kebab case.

`createRootTheme` also takes an optional `mapFn` argument to customize the mapping.

```ts
// root.css.ts

import { createRootTheme } from "ve-theme-variants";

export const { color } = createRootTheme({
  color: {
    primary: "blue",
  },
});

// color.primary === 'var(--color-primary)'
```
