import {Icon} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";
import React from "react";

export default class Dashboard extends React.PureComponent {
  public render(): React.ReactNode {
    return (
      <div className="bg-red-500">
        Hello
        <Icon icon={IconNames.OFFICE}/>
      </div>
    );
  }
}
