import React from "react";

import AbstractButton from "./AbstractButton";

import {removeNonHTMLProps} from "../../common/props";


export default class Button extends AbstractButton<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  public render(): React.ReactNode {
    return (
      <button type="button" {...removeNonHTMLProps(this.props)} {...this.getCommonButtonProps()}>

      </button>
    );
  }
}
