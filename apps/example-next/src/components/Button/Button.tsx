import React from "react";
import { button } from "./button.css";

type ButtonKinds = keyof typeof button;

export const Button = ({
  kind = "primary",
  children,
  disabled,
  onClick,
  ...rest
}: React.PropsWithChildren<{
  kind: ButtonKinds;
  disabled?: boolean;
  onClick?: () => void;
}>) => {
  return (
    <button
      {...rest}
      onClick={onClick}
      disabled={disabled}
      className={button[kind]}
    >
      {children}
    </button>
  );
};
