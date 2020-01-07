import classNames from "classnames";

import {
  ButtonColorBlue,
  ButtonColorGray,
  ButtonColorOrange,
  ButtonColorStyle,
  ButtonSizeLarge,
  ButtonSizeNormal,
  toClassName,
} from "./buttonStyle";

export enum ButtonColor {
  Gray,
  Blue,
  Orange,
}

export type AbstractButtonProps = {
  buttonColor?: ButtonColor;
  large?: boolean;
};

function getButtonStyle(buttonColor: ButtonColor): ButtonColorStyle {
  switch (buttonColor) {
  case ButtonColor.Gray:
    return ButtonColorGray;
  case ButtonColor.Blue:
    return ButtonColorBlue;
  case ButtonColor.Orange:
    return ButtonColorOrange;
  }
}

export function getCommonButtonClassNames({
  buttonColor = ButtonColor.Gray,
  large = false,
}: AbstractButtonProps): string {
  const color = getButtonStyle(buttonColor);
  const size = large ? ButtonSizeLarge : ButtonSizeNormal;
  return classNames(
    "py-2 px-3 rounded font-semibold border-2 button-transition",
    [color, size].map(toClassName),
  );
}
