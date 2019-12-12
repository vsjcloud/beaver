import {Button, Icon, Navbar} from "@blueprintjs/core";
import {Alignment} from "@blueprintjs/core/lib/esm/common/alignment";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import {IconNames} from "@blueprintjs/icons";
import React from "react";

import {useAuth0} from "../auth0/Auth0Provider";

export const BaseLayout: React.FC = (props: React.PropsWithChildren<{}>) => {
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
          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
            <Button icon={IconNames.LOG_OUT} minimal={true} intent={Intent.DANGER} onClick={logout}/>
          </Navbar.Group>
        </div>
      </Navbar>
      <div style={{paddingLeft: "15px", paddingRight: "15px"}}>
        <div className="mx-auto" style={{width: "1260px"}}>
          {props.children}
        </div>
      </div>
    </div>
  );
};
