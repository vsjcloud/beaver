import React from "react";

import {IconName, IconSvgPaths} from "../../../icons";
import {Intent} from "../../common/intent";
import {resolveProperties, Value} from "../../style";
import {StyleProperties} from "../../style/properties";

export interface IconProps {
  icon: IconName;
  intent?: Intent;
  size?: number;
}

export class Icon extends React.PureComponent<IconProps, {}> {
  public static readonly SIZE_STANDARD = 16;
  public static readonly SIZE_LARGE = 20;

  public render(): React.ReactNode {
    const {
      icon,
      size = Icon.SIZE_STANDARD,
    } = this.props;

    const paths = this.renderSvgPaths(icon);
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        data-icon={icon}
        width={size}
        height={size}
        viewBox="0 0 20 20"
        className={this.getClassName()}
      >
        {paths}
      </svg>
    );
  }

  private getClassName(): string {
    const {intent} = this.props;
    const properties: StyleProperties = {
      display: Value.Display.Block,
    };
    switch (intent) {
    case Intent.Primary:
      properties.textColor = Value.TextColor.Blue3;
      break;
    case Intent.Success:
      properties.textColor = Value.TextColor.Green3;
      break;
    case Intent.Warning:
      properties.textColor = Value.TextColor.Orange3;
      break;
    case Intent.Danger:
      properties.textColor = Value.TextColor.Red3;
    }
    return resolveProperties(properties);
  }

  private renderSvgPaths(iconName: IconName): React.ReactNode[] {
    return IconSvgPaths[iconName].map((d, i) => <path key={i} d={d} fillRule="evenodd"/>);
  }
}
