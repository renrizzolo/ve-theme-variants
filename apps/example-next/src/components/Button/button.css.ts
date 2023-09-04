import { focusRingColor } from "@/src/theme/variants/actions.css";
import { vars } from "../../theme/theme.css";
import { createVar, style, styleVariants } from "@vanilla-extract/css";

const btnOffset = createVar();
const btnRadius = createVar();
const btnOutlineSize = createVar();

const buttonBase = style({
  vars: {
    [btnOffset]: ".25rem",
    [btnRadius]: ".5rem",
    [btnOutlineSize]: ".125rem",
  },
  all: "unset",
  whiteSpace: "pre",
  textAlign: "center",
  userSelect: "none",
  padding: "1rem 2rem",
  borderRadius: btnRadius,
  fontWeight: "600",
  transition: "all 200ms ease",
  clipPath: `inset(0px ${btnOffset} 0px ${btnOffset} round ${btnRadius})`,
  position: "relative",
  marginLeft: `calc(${btnOffset} * -1)`,
  marginRight: `calc(${btnOffset} * -1)`,
  selectors: {
    "&:focus-visible:after": {
      content: "",
      position: "absolute",
      inset: `${btnOutlineSize} calc(${btnOffset} + ${btnOutlineSize})`,
      boxShadow: `inset 0px 0px 0px 2px rgba(255,255,255,.9), 0px 0px 0px calc(${btnOutlineSize} + ${btnOffset}) ${focusRingColor}`,
      borderRadius: `calc(${btnRadius} - ${btnOutlineSize})`,
    },
    "&:disabled, &:disabled:hover": {
      backgroundColor: "silver",
      color: "white",
    },
    "&:active:not(:disabled)": {
      clipPath: `inset(.1rem 0px .1rem 0px round ${btnRadius})`,
    },
  },
});

export const button = styleVariants({
  primary: [buttonBase, vars.actionPrimary],
  secondary: [buttonBase, vars.actionSecondary],
});
