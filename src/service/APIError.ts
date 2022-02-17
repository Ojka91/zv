import APIErrorException from "@Exception/APIErrorException";
import BaseException from "@Exception/BaseException";
import ErrorCodes, { TErrorCode } from "@App/ErrorCodes";

export default class APIError {

  public httpCode : number = 500;
  private Exception : BaseException;

  public badRequest(a? : string | any, b? : string | any) {
    const { message, data, errorCode } = this.orderParameters(a, b, 'Bad request');
    this.setErrorData(errorCode || ErrorCodes.BAD_REQUEST, message, data, 400);
    return this;
  }

  public unauthorized(a? : string | any, b? : string | any) {
    const { message, data, errorCode } = this.orderParameters(a, b, 'Unauthorized');
    this.setErrorData(errorCode || ErrorCodes.UNAUTHORIZED, message, data, 401);
    return this;
  }

  public forbidden(a? : string | any, b? : string | any) {
    const { message, data, errorCode } = this.orderParameters(a, b, 'Forbidden');
    this.setErrorData(errorCode || ErrorCodes.FORBIDDEN, message, data, 403);
    return this;
  }

  public notFound(a? : string | any, b? : string | any) {
    const { message, data, errorCode } = this.orderParameters(a, b, 'Not found');
    this.setErrorData(errorCode || ErrorCodes.NOT_FOUND, message, data, 404);
    return this;
  }

  public serverError(a? : string | any, b? : string | any) {
    const { message, data, errorCode } = this.orderParameters(a, b, 'App server error');
    this.setErrorData(errorCode || ErrorCodes.SERVER_ERROR, message, data, 500);
    return this;
  }

  private setErrorData(errorCode: TErrorCode, message: string, data: any, httpCode: number) {
    this.Exception = new APIErrorException(errorCode, message, data, httpCode);
    // this.httpCode   = httpCode;
    // this.message    = message;
    // this.data       = data;
  }

  private orderParameters(a, b, defaultMessage: string) {
    let message;
    let data;
    let errorCode;

    if (!a) {
      message = defaultMessage
    } else if (typeof a === 'string') {
      message = a;
    } else if (typeof a === 'object') {
      data = a;
    } 

    if (typeof b === 'object') {
      data = b;
    }

    if (a && a.code) {
      errorCode = a;
      if (data && data.code) {
        data = null;
      }
    } else if (b && b.code) {
      errorCode = b;
      if (data && data.code) {
        data = null;
      }
    }

    return {
      message,
      data,
      errorCode
    }
  }

  public toException() {
    return this.Exception;
  }

}
