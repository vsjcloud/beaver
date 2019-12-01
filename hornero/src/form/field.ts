import {Intent} from "@blueprintjs/core";

import {Validator, ValidateResult} from "./validator";

export class Field<V> {
  private readonly value: V;
  private touched: boolean;
  private readonly validator: Validator<V>;
  private readonly validatorResult?: ValidateResult;

  public constructor(value: V, validator: Validator<V>) {
    this.value = value;
    this.touched = false;
    this.validator = validator;
    this.validatorResult = this.validator.validate(value);
  }

  public getValue(): V {
    return this.value;
  }

  public updateValue(value: V): Field<V> {
    const newField = new Field(value, this.validator);
    newField.touched = true;
    return newField;
  }

  public isSuccess(): boolean {
    if (this.validatorResult) {
      return this.validatorResult.success;
    }
    return false;
  }

  public intent(): Intent {
    if (!this.touched || this.isSuccess()) {
      return Intent.NONE;
    }
    return Intent.DANGER;
  }

  public failureMessage(): string {
    if (this.validatorResult) {
      return this.validatorResult.message;
    }
    return "";
  }
}
