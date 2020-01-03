import Link from "next/link";
import React from "react";

export type AnchorLinkProps = React.PropsWithChildren<{
  to: string;
  className?: string;
}>;

export function AnchorLink({to, children, className}: AnchorLinkProps): React.ReactElement {
  return (
    <Link href={to} passHref={true}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={className}>{children}</a>
    </Link>
  )
}
