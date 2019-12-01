import {ValidateResult, Validator} from "./validator";

export class RequiredRule implements Validator<string> {
  private readonly errorMessage: string;

  public constructor(errorMessage: string) {
    this.errorMessage = errorMessage;
  }

  public validate(value: string): ValidateResult {
    const success = value !== "";
    const message = success ? "" : this.errorMessage;
    return {
      success,
      message,
    };
  }
}
