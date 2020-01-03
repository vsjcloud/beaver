import React from "react";

import {AnchorLink} from "../link/AnchorLink";

function NavbarBrand(): React.ReactElement {
  const logo = (
    <svg className="fill-current h-8 w-8 mr-2 text-white bg-blue-400" width="54" height="54" viewBox="0 0 54 54"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/>
    </svg>
  );
  return (
    <div className="navbar-brand">
      <AnchorLink to="/" className="flex flex-row">
        {logo}
        <span>VSJ</span>
      </AnchorLink>
    </div>
  );
}

export function Navbar(): React.ReactElement {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <NavbarBrand/>
    </nav>
  );
}
