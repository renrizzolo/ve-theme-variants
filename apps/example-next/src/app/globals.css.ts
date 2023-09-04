import { globalStyle } from "@vanilla-extract/css";
import { vars } from "../theme/theme.css";

globalStyle("body", {
  margin: "0",
  backgroundColor: vars.surface0.backgroundColor,
  color: vars.textBase.color,
});

globalStyle("html,body", {
  height: "100%",
});
globalStyle("*", {
  boxSizing: "border-box",
});
