import React from "react";

import {IconName} from "../../../icons";
import {Intent} from "../../common/intent";
import * as Utils from "../../common/utils";
import {resolveProperties, StyleVariants, Value, Variant} from "../../style";
import {Icon} from "../icon/Icon";
import CircleIndicator from "../progress/CircleIndicator";

export interface ButtonProps {
  loading?: boolean;
  active?: boolean;
  minimal?: boolean;
  large?: boolean;
  tabIndex?: number;
  intent?: Intent;
  icon?: IconName;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit" | "reset";
}

export default abstract class AbstractButton extends React.PureComponent<ButtonProps> {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  protected getCommonButtonProps() {
    const {loading, tabIndex, type} = this.props;

    return {
      className: this.getStyles().toClassName(),
      disabled: loading,
      onClick: loading ? undefined : this.props.onClick,
      tabIndex: loading ? -1 : tabIndex,
      type: type ? type : "button",
    };
  }

  protected renderChildren(): React.ReactNode {
    const {children, icon, large, loading} = this.props;

    return (
      <React.Fragment>
        <span
          className={resolveProperties({
            display: Value.Display.Flex,
            justifyContent: Value.JustifyContent.Center,
            alignItems: Value.AlignItems.Center,
            height: Value.Height.Pc100,
            opacity: loading ? Value.Opacity.Pc0 : Value.Opacity.Pc100,
          })}
        >
          {icon &&
          <span className={Utils.isReactNodeEmpty(children) ? "" : resolveProperties({
            marginRight: large ? Value.MarginRight.Px12 : Value.MarginRight.Px8,
          })}>
            <Icon icon={icon} size={large ? Icon.SIZE_LARGE : Icon.SIZE_STANDARD}/>
          </span>
          }
          {children}
        </span>

        {loading &&
        <span className={resolveProperties({
          display: Value.Display.Flex,
          justifyContent: Value.JustifyContent.Center,
          alignItems: Value.AlignItems.Center,
          height: Value.Height.Pc100,
          position: Value.Position.Absolute,
          inset: Value.Inset.Zero,
        })}>
          <CircleIndicator/>
        </span>
        }
      </React.Fragment>
    );
  }

  private getStyles(): StyleVariants {
    const {intent, large, active, minimal} = this.props;

    const style = new StyleVariants()
      .set(Variant.Base, {
        height: Value.Height.Px32,
        width: Value.Width.Max,
        border: Value.Border.All,
        lineHeight: Value.LineHeight.R1p5,
        fontWeight: Value.FontWeight.SemiBold,
        whitespace: Value.Whitespace.NoWrap,
        borderRadius: Value.BorderRadius.Px2,
        position: Value.Position.Relative,
        fontSize: Value.FontSize.Px15,
        paddingX: Value.PaddingX.Px12,
      });

    if (large) {
      style.set(Variant.Base, {
        height: Value.Height.Px40,
        fontSize: Value.FontSize.Px17,
        paddingX: Value.PaddingX.Px16,
      });
    }

    if (!intent) {
      style
        .set(Variant.Base, {
          borderColor: Value.BorderColor.Gray4,
          backgroundColor: Value.BackgroundColor.Gray1,
          shadow: Value.Shadow.Px1Light,
        })
        .set(Variant.Hover, {
          backgroundColor: Value.BackgroundColor.White,
        })
        .set(Variant.Active, {
          backgroundColor: Value.BackgroundColor.Gray2,
        });
    } else {
      style.set(Variant.Base, {
        shadow: Value.Shadow.Px1Dark,
        textColor: Value.TextColor.White,
      });

      switch (intent) {
      case Intent.Primary:
        style
          .set(Variant.Base, {
            borderColor: Value.BorderColor.Blue5,
            backgroundColor: Value.BackgroundColor.Blue4,
          })
          .set(Variant.Hover, {
            backgroundColor: Value.BackgroundColor.Blue3,
          })
          .set(Variant.Active, {
            backgroundColor: Value.BackgroundColor.Blue5,
          });
        break;
      case Intent.Success:
        style
          .set(Variant.Base, {
            borderColor: Value.BorderColor.Green5,
            backgroundColor: Value.BackgroundColor.Green4,
          })
          .set(Variant.Hover, {
            backgroundColor: Value.BackgroundColor.Green3,
          })
          .set(Variant.Active, {
            backgroundColor: Value.BackgroundColor.Green5,
          });
        break;
      case Intent.Warning:
        style
          .set(Variant.Base, {
            borderColor: Value.BorderColor.Orange5,
            backgroundColor: Value.BackgroundColor.Orange4,
          })
          .set(Variant.Hover, {
            backgroundColor: Value.BackgroundColor.Orange3,
          })
          .set(Variant.Active, {
            backgroundColor: Value.BackgroundColor.Orange5,
          });
        break;
      case Intent.Danger:
        style
          .set(Variant.Base, {
            borderColor: Value.BorderColor.Red5,
            backgroundColor: Value.BackgroundColor.Red4,
          })
          .set(Variant.Hover, {
            backgroundColor: Value.BackgroundColor.Red3,
          })
          .set(Variant.Active, {
            backgroundColor: Value.BackgroundColor.Red5,
          });
        break;
      }
    }

    if (active) {
      style.set(Variant.Base, style.get(Variant.Active));
      style.clear(Variant.Hover | Variant.Active);
    }

    return style;
  }
}
