import APIError from '@Service/APIError';
import { Request, Response, NextFunction } from 'express';
import BaseException from '@Exception/BaseException';
import UnexpectedException from '@Exception/UnexpectedException';

/** Used by BaseMiddleware */
class ErrorHandler {

  // APIError errors are handled here
  public mainHandler = (Error: APIError, _req: Request, res: Response, next: NextFunction) => {
    if (!(Error instanceof APIError)) {
      next(Error);
      return;
    }

    const Exception = Error.toException();

    this.printException(Exception);

    res.status(Exception.httpCode);
    res.json({
      message : Exception.message,
      code    : Exception.code,
      i18n    : Exception.i18n,
      data    : Exception.data,
    });
  }

  private printException(Error: BaseException) {
    console.log(`Exception (${Error.httpCode} - ${Error.code}): ${Error.message}`);
  }

  // Swagger errors are handled here
  public swaggerHandler(err: { code: string, results: any }, _req: Request, res: Response, next: NextFunction) {
    let error;
    if (err.code === 'SCHEMA_VALIDATION_FAILED') {
      const messages = [];

      if (err.results && err.results.errors && err.results.errors.length) {
        for (let i = 0; i < err.results.errors.length; i++) {
          messages.push(err.results.errors[i].message);
        }
      }
      error = new APIError().badRequest('Request validation failed', messages);
    } else {
      next(err);
      return;
    }

    const Exception = error.toException();

    this.printException(Exception);

    res.status(Exception.httpCode);
    res.json({
      message : Exception.message,
      code    : Exception.code,
      i18n    : Exception.i18n,
      data    : Exception.data,
    });
  }

  // Unknown errors are handled here
  public secondaryHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    let Exception : BaseException = new UnexpectedException();
    // let error;
    if (err instanceof BaseException) {
      Exception = err;
    } else {
      console.log(`Unhandled exception... ${err}`);
      
      Exception = new UnexpectedException();
    }
    // } else if (err instanceof NotFoundException) {
    //   error = new APIError().notFound(err.message, err.data);
    // } else if (err instanceof UnexpectedException) {
    //   error = new APIError().serverError(err.message, err.data);
    // } else {
    //   console.log(`Unhandled exception... ${err.message}`);
    //   error = new APIError().serverError();
    // }

    

    this.printException(Exception);

    res.status(Exception.httpCode);
    res.json({
      message : Exception.message,
      code    : Exception.code,
      i18n    : Exception.i18n,
      data    : Exception.data,
    });
  }

}

export default new ErrorHandler();
