import React from "react";

import AbstractButton from "./AbstractButton";

export default class Button extends AbstractButton {
  public render(): React.ReactNode {
    return (
      <button>
        Hello
      </button>
    )
  }
}
