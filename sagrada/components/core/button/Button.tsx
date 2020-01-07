import classNames from "classnames";
import React from "react";

import {AbstractButtonProps, getCommonButtonClassNames} from "./AbstractButton";

export type ButtonProps = AbstractButtonProps & React.HTMLAttributes<HTMLButtonElement>;

export function Button({
  buttonColor,
  large,
  className,
  children,
  ...otherProps
}: ButtonProps): React.ReactElement {
  return (
    <button
      type="button"
      {...otherProps}
      className={classNames(getCommonButtonClassNames({buttonColor, large}), className)}
    >
      {children}
    </button>
  );
}
