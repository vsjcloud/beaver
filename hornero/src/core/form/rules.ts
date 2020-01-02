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

export class MinimumDateRule implements ValidationRule<Date> {
  private readonly minDate: Date;
  private readonly errorMessage: string;

  public constructor(minDate: Date, errorMessage: string) {
    this.minDate = minDate;
    this.errorMessage = errorMessage;
  }

  public validate(value: Date): ValidationResult {
    const success = this.minDate <= value;
    const message = success ? "" : this.errorMessage;
    return {
      success,
      message,
    }
  }
}

export class MaximumDateRule implements ValidationRule<Date> {
  private readonly maxDate: Date;
  private readonly errorMessage: string;

  public constructor(maxDate: Date, errorMessage: string) {
    this.maxDate = maxDate;
    this.errorMessage = errorMessage;
  }

  public validate(value: Date): ValidationResult {
    const success = value <= this.maxDate;
    const message = success ? "" : this.errorMessage;
    return {
      success,
      message,
    }
  }
}
