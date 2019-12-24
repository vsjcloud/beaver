export interface ValidationResult {
  success: boolean;
  message: string;
}

export const SUCCESS_VALIDATE_RESULT: ValidationResult = {
  success: true,
  message: "",
};

export interface ValidationRule<V> {
  validate(value: V): ValidationResult;
}

export class RequiredRule implements ValidationRule<string> {
  private readonly errorMessage: string;

  public constructor(errorMessage: string) {
    this.errorMessage = errorMessage;
  }

  public validate(value: string): ValidationResult {
    const success = value !== "";
    const message = success ? "" : this.errorMessage;
    return {
      success,
      message,
    };
  }
}
