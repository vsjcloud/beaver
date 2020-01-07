import classNames from "classnames";
import React from "react";

import {AbstractButtonProps, getCommonButtonClassNames} from "./AbstractButton";

import {AnchorLink, AnchorLinkProps} from "../link/AnchorLink";


export type LinkButtonProps = AbstractButtonProps & AnchorLinkProps;

export function LinkButton({
  buttonColor,
  large,
  className,
  children,
  ...otherProps
}: LinkButtonProps): React.ReactElement {
  return (
    <AnchorLink
      {...otherProps}
      className={classNames(className, getCommonButtonClassNames({buttonColor, large}))}
    >
      {children}
    </AnchorLink>
  );
}
