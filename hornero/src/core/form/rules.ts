import {UploaderPhoto} from "../../components/photouploader/PhotoUploader";

export interface ValidationResult {
  success: boolean;
  message: string;
}

export interface ValidationRule<V> {
  validate(value: V): ValidationResult;
}

export class StringRequiredRule implements ValidationRule<string> {
  private readonly errorMessage: string;

  public constructor(errorMessage: string) {
    this.errorMessage = errorMessage;
  }

  public validate(value: string): ValidationResult {
    const success = value.trim() !== "";
    const message = success ? "" : this.errorMessage;
    return {
      success,
      message,
    };
  }
}

export class UploaderPhotosRequiredRule implements ValidationRule<UploaderPhoto[]> {
  private readonly errorMessage: string;

  public constructor(errorMessage: string) {
    this.errorMessage = errorMessage;
  }

  public validate(value: UploaderPhoto[]): ValidationResult {
    const success = value.length > 0;
    const message = success ? "" : this.errorMessage;
    return {
      success,
      message,
    }
  }
}
