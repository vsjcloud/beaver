export interface ValidateResult {
  success: boolean;
  message: string;
}

export interface Validator<V> {
  validate(value: V): ValidateResult;
}

export class FieldValidator implements Validator<string> {
  private readonly rules: Validator<string>[];

  public constructor(rules: Validator<string>[]) {
    this.rules = rules;
  }

  public validate(value: string): ValidateResult {
    for (const rule of this.rules) {
      const result = rule.validate(value);
      if (!result.success) {
        return result;
      }
    }
    return {
      success: true,
      message: "",
    }
  }
}

// eslint-disable-next-line @typescript-eslint/class-name-casing
class noopValidator implements Validator<{}> {
  public validate(value: {}): ValidateResult {
    return {
      success: true,
      message: "",
    }
  }
}

export const NoopValidator = new noopValidator();
