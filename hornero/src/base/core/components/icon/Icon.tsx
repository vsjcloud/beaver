import React from "react";
import classNames from "classnames";

import {IconName, IconSvgPaths} from "../../../icons";
import {Intent} from "../../common/intent";
import {IntentProps} from "../../common/props";

export interface IconProps extends IntentProps {
  color?: string;
  icon: IconName;
  iconSize?: number;
}

export class Icon extends React.PureComponent<IconProps, {}> {
  static readonly SIZE_STANDARD = 16;
  static readonly SIZE_LARGE = 20;

  render(): React.ReactNode {
    const {
      color,
      icon,
      iconSize = Icon.SIZE_STANDARD,
      intent = Intent.None
    } = this.props;
    const paths = this.renderSvgPaths(icon);
    const classes = classNames("inline-flex flex-grow-0 flex-shrink-0", this.intentClasses(intent));
    return (
      <span className={classes}>
        <svg style={{fill: "currentColor"}} fill={color} data-icon={icon} width={iconSize} height={iconSize} viewBox="0 0 20 20">
          {paths}
        </svg>
      </span>
    );
  }

  private intentClasses(intent: Intent): string {
    switch (intent) {
    case Intent.Primary:
      return "text-primary-5";
    case Intent.Success:
      return "";
    case Intent.Warning:
      return "";
    case Intent.Danger:
      return "";
    default:
      return "";
    }
  }

  private renderSvgPaths(iconName: IconName): React.ReactNode[] | null {
    return IconSvgPaths[iconName].map((d, i) => <path key={i} d={d} fillRule="evenodd"/>);
  }
}
