import BaseException from '@Exception/BaseException';
import  { TErrorCode } from '@App/ErrorCodes';

export default class APIErrorException extends BaseException {
  constructor(errorCode: TErrorCode, message: string, data: any, httpCode: number) {
    super(errorCode, message, data, httpCode);
  }
}
