import { style } from "@vanilla-extract/css";
import { color } from "../theme/root.css";
import { selectors, vars } from "../theme/theme.css";

export const main = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
  height: "100%",
});

export const card = style({
  display: "grid",
  gridAutoFlow: "row",
  gap: "2rem",
  padding: "2rem",
  borderRadius: ".66rem",
  backgroundColor: vars.surface1.backgroundColor,
  selectors: {
    // arbitrary theme based styling
    [selectors.dark]: {
      color: color["indigo-200"],
      border: `1px solid ${vars.surface2.backgroundColor}`,
    },
    [selectors.light]: {
      color: color["indigo-900"],
      border: `1px solid ${vars.surface2.backgroundColor}`,
    },
  },
});
