import React from "react";

import {Intent} from "../../../../base/core/common/intent";
import {Icon} from "../../../../base/core/components/icon/Icon";
import {resolveProperties, Value} from "../../../../base/core/style";
import {IconName} from "../../../../base/icons";

export default class Navbar extends React.PureComponent<{}, {}> {
  public render(): React.ReactNode {
    return (
      <nav
        className={resolveProperties({
          paddingY: Value.PaddingY.Px16,
          shadow: Value.Shadow.Px1Dark,
        })}
      >
        <div
          className={resolveProperties({
            display: Value.Display.Flex,
            marginX: Value.MarginX.Auto,
            alignItems: Value.AlignItems.Center,
          })}
          style={{width: "1280px"}}
        >
          <div
            className={resolveProperties({
              fontSize: Value.FontSize.Px23,
              fontWeight: Value.FontWeight.SemiBold,
            })}
          >
            <Icon icon={IconName.Office} intent={Intent.Primary} size={Icon.SIZE_LARGE}/> VSJ
          </div>
        </div>
      </nav>
    );
  }
}
