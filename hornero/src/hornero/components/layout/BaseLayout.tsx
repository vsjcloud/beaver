import React from "react";

import Navbar from "./navbar/Navbar";

export default class BaseLayout extends React.PureComponent<{}, {}> {
  render(): React.ReactNode {
    return (
      <div className="font-body">
        <Navbar/>
        <div className="mx-auto my-0" style={{width: "1280px"}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
