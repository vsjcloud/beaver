import Link from "next/link";
import React from "react";

export type AnchorLinkProps = {
  to: string;
  as?: string;
  className?: string;
} & React.HTMLAttributes<HTMLAnchorElement>;

export function AnchorLink({
  to,
  as,
  children,
  className,
  ...otherProps
}: AnchorLinkProps): React.ReactElement {
  return (
    <Link href={to} as={as} passHref={true}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={className} {...otherProps}>{children}</a>
    </Link>
  );
}
