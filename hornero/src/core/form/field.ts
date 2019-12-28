import {Intent} from "@blueprintjs/core";

import {SUCCESS_VALIDATE_RESULT, ValidationResult, ValidationRule} from "./rules";

export class FormField<V> {
  private readonly value: V;
  private touched: boolean;
  private readonly rules: ValidationRule<V>[];
  private readonly result: ValidationResult;

  public constructor(defaultValue: V, rules: ValidationRule<V>[]) {
    this.value = defaultValue;
    this.touched = false;
    this.rules = rules;
    for (const rule of rules) {
      const currentResult = rule.validate(defaultValue);
      if (!currentResult.success) {
        this.result = currentResult;
        return;
      }
    }
    this.result = SUCCESS_VALIDATE_RESULT;
  }

  public getValue(): V {
    return this.value;
  }

  public getRules(): ValidationRule<V>[] {
    return this.rules;
  }

  public updateValue(value: V): FormField<V> {
    const newField = new FormField(value, this.rules);
    newField.touched = true;
    return newField;
  }

  public isSuccess(): boolean {
    return this.result.success;
  }

  public intent(): Intent {
    if (!this.touched || this.isSuccess()) {
      return Intent.NONE;
    }
    return Intent.DANGER;
  }

  public failureMessage(): string {
    if (!this.touched) {
      return "";
    }
    return this.result.message;
  }
}

export const EMPTY_STRING_FORM_FIELD = new FormField<string>("", []);
