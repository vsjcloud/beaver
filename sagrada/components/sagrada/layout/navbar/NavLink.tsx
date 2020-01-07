import React from "react";
import classNames from "classnames";

import {AnchorLink} from "../../../core/link/AnchorLink";

export type NavLinkProps = React.PropsWithChildren<{
  to: string;
  className?: string;
}>;

export function NavLink({to, className, children}: NavLinkProps): React.ReactElement {
  return (
    <AnchorLink
      to={to}
      className={classNames(className, "flex flex-row items-center lg:px-5 px-2 py-3 lg:py-0 border-t lg:border-0 border-light-gray-1 text-dark-gray-3 text-lg hover:text-blue-2")}
    >
      {children}
    </AnchorLink>
  );
}
