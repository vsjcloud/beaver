import classNames from "classnames";
import React from "react";

import {IconName} from "../../../icons";
import {Alignment} from "../../common/alignment";
import {Intent} from "../../common/intent";
import {ActionProps} from "../../common/props";

export interface ButtonProps extends ActionProps {
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

export interface ButtonState {
  isActive: boolean;
}

export default abstract class AbstractButton<H extends React.HTMLAttributes<{}>> extends React.PureComponent<ButtonProps & H, ButtonState> {
  public state = {
    isActive: false,
  };

  public abstract render(): React.ReactNode;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  protected getCommonButtonProps() {
    const {alignText, fill, large, loading, minimal, small, tabIndex} = this.props;
    const disabled = this.props.disabled || loading;

    const baseClasses = "inline-flex flex-row items-center justify-center rounded text-left px-2 py-1";
    const className = classNames(
      baseClasses,
      this.intentClass(this.props.intent)
    );

    return {
      className,
      disabled,
      onClick: disabled ? undefined : this.props.onClick,
      tabIndex: disabled ? -1 : tabIndex,
    };
  }

  protected renderChildren(): React.ReactNode {
    return (
      <div>Hello</div>
    );
  }

  private intentClass(intent?: Intent): string {
    if (!intent) {
      return "shadow-button-box bg-light-gray-5 hover:bg-light-gray-4 bg-gradient-button";
    }
    const commonClasses = "shadow-button-intent-box bg-gradient-button-intent text-white";
    switch (intent) {
    case Intent.Primary:
      return `${commonClasses} bg-blue-3 hover:bg-blue-2`;
    case Intent.Success:
      return `${commonClasses} bg-green-3 hover:bg-green-2`;
    case Intent.Warning:
      return `${commonClasses} bg-orange-3 hover:bg-orange-2`;
    case Intent.Danger:
      return `${commonClasses} bg-red-3 hover:bg-red-2`;
    }
  }
}
