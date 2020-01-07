import classNames from "classnames";
import React from "react";

import {Icon} from "../icon/Icon";
import {IconName} from "../icon/iconName";

export type NonIdeaStateProps = React.PropsWithChildren<{
  title?: string;
  icon?: IconName;
  description?: string;
  action?: JSX.Element;
  className?: string;
}>;

export function NonIdeaState({
  title,
  icon,
  description,
  action,
  children,
  className,
}: NonIdeaStateProps): React.ReactElement {
  return (
    <div className={classNames(className, "flex flex-col items-center justify-center text-dark-gray-4")}>
      {icon && <Icon className="w-12 h-12 text-gray-3 mb-3" icon={icon}/>}
      {title && <h4 className="font-bold text-lg mb-3">{title}</h4>}
      {description && <div className="mb-3">{description}</div>}
      {action}
      {children}
    </div>
  );
}
