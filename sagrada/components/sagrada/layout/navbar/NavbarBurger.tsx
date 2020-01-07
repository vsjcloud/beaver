import classNames from "classnames";
import React from "react";

import {Icon} from "../../../core/icon/Icon";
import {IconName} from "../../../core/icon/iconName";

export type NavbarBurgerProps = {
  isMenuActive: boolean;
  onClick(): void;
  className?: string;
};

export function NavbarBurger({onClick, className, isMenuActive}: NavbarBurgerProps): React.ReactElement {
  return (
    <button
      className={classNames(className, "h-10 w-10 p-2 text-dark-gray-4 lg:hidden", isMenuActive ? "is-active" : "")}
      type="button"
      aria-label="menu"
      aria-controls="navigation"
      aria-expanded={isMenuActive}
      onClick={onClick}
    >
      {isMenuActive ? (
        <Icon icon={IconName.Cross}/>
      ) : (
        <Icon icon={IconName.Menu}/>
      )}
    </button>
  );
}
