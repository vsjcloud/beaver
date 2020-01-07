import {Button, Classes, Icon, IconName, Navbar, Spinner} from "@blueprintjs/core";
import {Alignment} from "@blueprintjs/core/lib/esm/common/alignment";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import {IconNames} from "@blueprintjs/icons";
import classNames from "classnames";
import React from "react";
import {Link, useRouteMatch} from "react-router-dom";

import {useAuth0} from "../auth0/Auth0Provider";

function NavLink(props: { to: string; text: string; icon: IconName }): React.ReactElement {
  const route = useRouteMatch();
  return (
    <Link
      className={classNames(Classes.BUTTON, Classes.MINIMAL, {[Classes.ACTIVE]: route.path === props.to})}
      role="button"
      to={props.to}
    >
      <Icon icon={props.icon}/>
      <span className={Classes.BUTTON_TEXT}>{props.text}</span>
    </Link>
  );
}

export function BaseLayout(props: React.PropsWithChildren<{ loading?: boolean }>): React.ReactElement {
  const {logout} = useAuth0()!;
  return (
    <div className="min-h-screen bg-light-gray-5">
      <Navbar>
        <div className="mx-auto" style={{width: "1260px"}}>
          <Navbar.Group>
            <Navbar.Heading className="flex flex-row items-center">
              <Icon icon={IconNames.OFFICE} intent={Intent.PRIMARY}/>
              <span className="ml-1 text-xl">VSJ</span>
            </Navbar.Heading>
            <Navbar.Divider/>
            <NavLink to="/projects" text="Dự án" icon={IconNames.PROJECTS}/>
          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
            <Button icon={IconNames.LOG_OUT} minimal={true} intent={Intent.DANGER} onClick={logout}>Đăng xuất</Button>
          </Navbar.Group>
        </div>
      </Navbar>
      {props.loading ? (
        <div className="flex justify-center items-center w-full" style={{height: "calc(100vh - 50px)"}}>
          <Spinner intent={Intent.PRIMARY}/>
        </div>
      ) : (
        <div className="px-4">
          <div className="mx-auto py-4" style={{width: "1260px"}}>
            {props.children}
          </div>
        </div>
      )}
    </div>
  );
}
