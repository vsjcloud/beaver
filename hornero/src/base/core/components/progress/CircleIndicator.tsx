import React from "react";

import {resolveProperties, Value} from "../../style";

export interface CircleIndicatorProps {
  size?: number;
}

export default class CircleIndicator extends React.PureComponent<CircleIndicatorProps> {
  public static SIZE_STANDARD = 16;
  public static SIZE_LARGE = 48;

  public render(): React.ReactNode {
    const {
      size = CircleIndicator.SIZE_STANDARD,
    } = this.props;

    return (
      <div
        className={resolveProperties({
          position: Value.Position.Relative,
        })}
        style={{
          height: `${size}px`,
          width: `${size}px`,
        }}
      >
        <div
          className={resolveProperties({
            width: Value.Width.Pc100,
            height: Value.Height.Pc100,
            position: Value.Position.Absolute,
            border: Value.Border.All,
            borderRadius: Value.BorderRadius.Full,
            opacity: Value.Opacity.Pc20,
          })}
          style={{
            borderWidth: "3px",
          }}
        />
        <div
          className={resolveProperties({
            width: Value.Width.Pc100,
            height: Value.Height.Pc100,
            position: Value.Position.Absolute,
            border: Value.Border.All,
            borderRadius: Value.BorderRadius.Full,
            animation: Value.Animation.Circle,
            borderColor: Value.BorderColor.Transparent,
          })}
          style={{
            borderTopColor: "currentcolor",
            borderWidth: "3px",
          }}
        />
      </div>
    );
  }
}
