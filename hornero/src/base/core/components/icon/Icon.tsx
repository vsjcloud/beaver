import React from "react";

import {IconName, IconSvgPaths} from "../../../icons";
import {Intent} from "../../common/intent";
import {IntentProps} from "../../common/props";
import {resolveProperties, Value} from "../../style";
import {StyleProperties} from "../../style/properties";
import {TextColor} from "../../style/properties/text";

export interface IconProps extends IntentProps {
  color?: string;
  icon?: IconName;
  size?: number;
}

export class Icon extends React.PureComponent<IconProps, {}> {
  public static readonly SIZE_STANDARD = 16;
  public static readonly SIZE_LARGE = 20;

  public render(): React.ReactNode {
    const {
      color,
      icon,
      size = Icon.SIZE_STANDARD,
    } = this.props;
    const paths = this.renderSvgPaths(icon);
    return (
      <span className={this.getClassName()}>
        <svg style={{fill: "currentColor"}} fill={color} data-icon={icon} width={size} height={size} viewBox="0 0 20 20">
          {paths}
        </svg>
      </span>
    );
  }

  private getClassName(): string {
    const {intent} = this.props;
    const properties: StyleProperties = {
      display: Value.Display.InlineFlex,
      flexGrow: Value.FlexGrow.Zero,
      flexShrink: Value.FlexShrink.Zero,
    };
    switch (intent) {
    case Intent.Primary:
      properties.textColor = TextColor.Blue3;
      break;
    case Intent.Success:
      properties.textColor = TextColor.Green3;
      break;
    case Intent.Warning:
      properties.textColor = TextColor.Orange3;
      break;
    case Intent.Danger:
      properties.textColor = TextColor.Red3;
    }
    return resolveProperties(properties);
  }

  private renderSvgPaths(iconName?: IconName): React.ReactNode[] | null {
    if (!iconName) {
      return null;
    }
    return IconSvgPaths[iconName].map((d, i) => <path key={i} d={d} fillRule="evenodd"/>);
  }
}
