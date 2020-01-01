import {Intent} from "@blueprintjs/core";

import {ValidationResult, ValidationRule} from "./rules";

export class FormField<V> {
  private readonly value: V;
  private readonly touched: boolean;
  private readonly rules: ValidationRule<V>[];
  private readonly result: ValidationResult;

  public constructor(value: V, rules: ValidationRule<V>[], touched = false) {
    this.value = value;
    this.touched = touched;
    this.rules = rules;
    for (const rule of rules) {
      const currentResult = rule.validate(value);
      if (!currentResult.success) {
        this.result = currentResult;
        return;
      }
    }
    this.result = {
      success: true,
      message: "",
    };
  }

  public getValue(): V {
    return this.value;
  }

  public getTouched(): boolean {
    return this.touched;
  }

  public setTouched(touched: boolean): FormField<V> {
    return new FormField(this.value, this.rules, touched);
  }

  public getRules(): ValidationRule<V>[] {
    return this.rules;
  }

  public setValue(value: V): FormField<V> {
    return new FormField(value, this.rules, true);
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

  public message(): string {
    if (!this.touched) {
      return "";
    }
    return this.result.message;
  }
}
