import React from "react";

import AbstractButton from "./AbstractButton";

export default class Button extends AbstractButton<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  public render(): React.ReactNode {
    return (
      <button type="button" {...this.getCommonButtonProps()}>
        Hello
      </button>
    );
  }
}
