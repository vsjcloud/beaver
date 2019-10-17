import React from "react";

import {Intent} from "../../../../base/core/common/intent";
import {Icon} from "../../../../base/core/components/icon/Icon";
import {IconName} from "../../../../base/icons";

export default class Navbar extends React.PureComponent<{}, {}> {
  render(): React.ReactNode {
    return (
      <nav className="bg-blue-900 py-3 shadow-elevation-0">
        <div
          className="mx-auto my-0 flex items-center"
          style={{width: "1280px"}}
        >
          <div className="text-2xl font-semibold">
            <Icon icon={IconName.OFFICE} intent={Intent.Primary}/> VSJ
          </div>
        </div>
      </nav>
    );
  }
}
