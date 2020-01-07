import React from "react";
import classNames from "classnames";

import {IconName} from "./iconName";
import {IconSvgPath} from "./iconPath";

export type IconProps = {
  icon: IconName;
  className?: string;
};

export function Icon({icon, className}: IconProps): React.ReactElement {
  const paths = IconSvgPath[icon].map((d, i) => <path key={i} d={d} fillRule="evenodd"/>);
  return (
    <svg className={classNames(className, "fill-current")} viewBox="0 0 20 20">
      {paths}
    </svg>
  );
}
