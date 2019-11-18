import React from "react";

import Navbar from "./navbar/Navbar";

import {resolveProperties, Value} from "../../../base/core/style";


export default class BaseLayout extends React.PureComponent<{}, {}> {
  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <Navbar/>
        <div className={resolveProperties({marginX: Value.MarginX.Auto})} style={{width: "1280px"}}>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}
