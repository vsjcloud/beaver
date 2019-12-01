import {Icon, Navbar} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import {IconNames} from "@blueprintjs/icons";
import React from "react";

export default class BaseLayout extends React.PureComponent<{}, {}> {
  public render(): React.ReactNode {
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
          </div>
        </Navbar>
        <div style={{paddingLeft: "15px", paddingRight: "15px"}}>
          <div className="mx-auto" style={{width: "1260px"}}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
