import React from "react";
import classNames from "classnames";

import {NavbarBrand} from "./NavbarBrand";
import {NavbarBurger} from "./NavbarBurger";
import {NavLink} from "./NavLink";

import {ButtonColor} from "../../../core/button/AbstractButton";
import {LinkButton} from "../../../core/button/LinkButton";

export type NavbarProps = {
  className?: string;
};


export function Navbar({className}: NavbarProps): React.ReactElement {
  const [isMenuActive, setIsMenuActive] = React.useState(false);

  const navEl = React.useRef<HTMLElement>();

  React.useEffect(function () {
    const observer = new IntersectionObserver(
      ([entry]) => entry.target.classList.toggle("shadow", entry.intersectionRatio < 1 || isMenuActive),
      {
        threshold: 1,
      },
    );
    observer.observe(navEl.current);
    return (): void => observer.disconnect();
  }, [isMenuActive]);

  return (
    <nav
      ref={navEl}
      className={classNames(className, "sticky bg-white flex items-center z-10")}
      role="navigation"
      aria-label="main navigation"
      style={{top: "-1px"}}
    >
      <div className="flex container justify-between mx-auto items-center flex-wrap">
        <NavbarBrand className="mr-5"/>
        <NavbarBurger
          isMenuActive={isMenuActive}
          onClick={(): void => setIsMenuActive(isMenuActive => !isMenuActive)}
        />
        <div
          className={classNames(
            "w-full justify-between lg:items-center lg:flex flex-col lg:flex-row lg:w-auto flex-grow mt-3 lg:mt-0",
            isMenuActive ? "flex" : "hidden",
          )}
        >
          <div className="flex flex-col lg:flex-row">
            <NavLink to="/about">Giới thiệu</NavLink>
            <NavLink to="/projects">Dự án</NavLink>
          </div>
          <div className="flex flex-row border-t border-light-gray-1 lg:border-0 pt-4 pb-1 lg:py-0">
            <LinkButton to="/contact" buttonColor={ButtonColor.Blue}>Liên hệ</LinkButton>
          </div>
        </div>
      </div>
    </nav>
  );
}
