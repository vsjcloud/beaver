import Link from "next/link";
import React from "react";

export type NavLinkProps = {
  title: string;
  to: string;
};

export function NavLink({title, to}: NavLinkProps): React.ReactElement {
  return (
    <Link href={to} passHref={true}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="block mt-4 lg:inline-block hover:text-blue-800 lg:mt-0 mr-10">{title}</a>
    </Link>
  );
}
