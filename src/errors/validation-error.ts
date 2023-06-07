import { CustomError, IError } from "./custom-error";

export class ValidationError extends CustomError {
  public httpCode = 400;

  constructor(private errors: any[]) {
    super("Validation Error");
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  public serialize(): IError {
    return {
      httpCode: this.httpCode,
      errors: this.errors.map((err) => {
        return {
          field: err.property,
          constraints: err.constraints,
        };
      }),
    };
  }
}
