import BaseException from './BaseException';
import ErrorCodes, { TErrorCode } from "@App/ErrorCodes";

export default class UnexpectedException extends BaseException {
  constructor(error ?: TErrorCode | string, message ?: string | Object, data ?: any) {
    let errorCode  : TErrorCode;
    if (!error) {
      errorCode = ErrorCodes.SERVER_ERROR;
    } else if (typeof error === 'string') {
      errorCode = ErrorCodes.SERVER_ERROR;
      message   = error;
    } else {
      errorCode = error;
    }

    if (message && typeof message !== 'string') {
      data = message;
    }
    
    super(errorCode, message, data, 500);
  }
}
