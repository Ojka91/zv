import ErrorCodes, { TErrorCode } from "@App/ErrorCodes";

const defaultError    : TErrorCode = ErrorCodes.UNKNOWN;
const defaultHttpCode : number = 500;

export default abstract class BaseException extends Error {

  public data : TErrorCode = defaultError;
  public httpCode : number = 500;
  public code : string     = defaultError.code;
  public i18n : any        = defaultError.i18n;

  constructor(errorCode: TErrorCode = defaultError, message ?: string | Object, data : any = null, httpCode : number = defaultHttpCode ) {
    super();

    let parsedMessage : string;

    if (!message) {
      parsedMessage = errorCode.i18n.en;
    } else if (typeof message === 'string') {
      parsedMessage = message;
    } else if (typeof message === 'object') {
      parsedMessage = errorCode.i18n.en;
      data          = message;
    }

    this.httpCode = httpCode || this.httpCode;
    this.message  = parsedMessage;
    this.code     = errorCode.code;
    this.i18n     = errorCode.i18n
    this.data     = data;
  }
  
}
