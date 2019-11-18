import React from "react";

import {ActionProps} from "../../common/props";
import {StyleVariants} from "../../style";
import * as Utils from "../../common/utils";
import {Icon} from "../icon/Icon";

export interface ButtonProps extends ActionProps {
  elementRef?: (ref: HTMLElement | null) => void;
  loading?: boolean;
  minimal?: boolean;
}

export default abstract class AbstractButton<H extends React.HTMLAttributes<{}>> extends React.PureComponent<ButtonProps & H> {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  protected getCommonButtonProps() {
    const {loading, tabIndex} = this.props;
    const disabled = this.props.disabled || loading;

    return {
      className: this.getStyles().toClassName(),
      disabled,
      onClick: disabled ? undefined : this.props.onClick,
      tabIndex: disabled ? -1 : tabIndex,
    }
  }

  protected renderChildren(): React.ReactNode {
    const {icon, loading} = this.props;
    return <Icon icon={icon} />;
  }

  private getStyles(): StyleVariants {
    const {intent, loading, minimal} = this.props;
    const disabled = this.props.disabled || loading;
    const style = new StyleVariants();

    return style;
  }
}
