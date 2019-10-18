import React from "react";

import {IconName} from "../../../icons";
import {Alignment} from "../../common/alignment";

export interface ButtonProps {
  active?: boolean;
  alignText?: Alignment;
  fill?: boolean;
  large?: boolean;
  loading?: boolean;
  minimal?: boolean;
  rightIcon?: IconName;
  small?: boolean;
  type?: "submit" | "reset" | "button";
}

export default abstract class AbstractButton extends React.PureComponent<ButtonProps, {}> {
  public abstract render(): React.ReactNode;

  protected renderChildren(): React.ReactNode {
    return (
      <div>Hello</div>
    )
  }
}
