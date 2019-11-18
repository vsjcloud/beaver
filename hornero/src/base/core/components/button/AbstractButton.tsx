import React from "react";

import {ActionProps} from "../../common/props";
import * as Utils from "../../common/utils";
import {resolveProperties, StyleVariants, Value, Variant} from "../../style";
import {Icon} from "../icon/Icon";
import CircleIndicator from "../progress/CircleIndicator";

export interface ButtonProps extends ActionProps {
  loading?: boolean;
  minimal?: boolean;
  tabIndex?: number;
  type?: "button" | "submit" | "reset";
}

export default abstract class AbstractButton extends React.PureComponent<ButtonProps> {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  protected getCommonButtonProps() {
    const {loading, tabIndex, type} = this.props;
    const disabled = this.props.disabled || loading;

    return {
      className: this.getStyles().toClassName(),
      disabled,
      onClick: disabled ? undefined : this.props.onClick,
      tabIndex: disabled ? -1 : tabIndex,
      type: type ? type : "button",
    };
  }

  protected renderChildren(): React.ReactNode {
    const {children, icon, loading} = this.props;
    return (
      <span
        className={resolveProperties({
          display: Value.Display.Flex,
          justifyContent: Value.JustifyContent.Center,
          alignItems: Value.AlignItems.Center,
          height: Value.Height.Pc100,
        })}
      >
        {children}
      </span>
    );
  }

  private getStyles(): StyleVariants {
    const {intent, loading, minimal} = this.props;
    const disabled = this.props.disabled || loading;
    const style = new StyleVariants();

    style.set(Variant.Base, {
      height: Value.Height.Px32,
      width: Value.Width.Max,
      border: Value.Border.All,
      lineHeight: Value.LineHeight.Px16,
      fontWeight: Value.FontWeight.SemiBold,
      whitespace: Value.Whitespace.NoWrap,
      borderRadius: Value.BorderRadius.Px2,
      position: Value.Position.Relative,
      fontSize: Value.FontSize.Px13,
      paddingX: Value.PaddingX.Px12,
    });

    if (!intent) {
      style.set(Variant.Base, {
        borderColor: Value.BorderColor.Gray4,
        backgroundColor: Value.BackgroundColor.Gray1,
        shadow: Value.Shadow.Px1Light,
      });
    }

    return style;
  }
}
