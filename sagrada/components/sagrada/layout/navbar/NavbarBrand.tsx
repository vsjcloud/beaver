import React from "react";
import classNames from "classnames";

import {AnchorLink} from "../../../core/link/AnchorLink";

export type NavbarBrandProps = {
  className?: string;
};

export function NavbarBrand({className}: NavbarBrandProps): React.ReactElement {
  return (
    <AnchorLink to="/" className={classNames(className, "flex flex-row items-center")}>
      <img src="/logo.png" className="h-10" alt="VSJ - Công ty cổ phần kết cấu và kiến trúc Việt Nam"/>
      <span className="ml-2 text-2xl font-semibold text-dark-gray-3">VSJ</span>
    </AnchorLink>
  );
}
