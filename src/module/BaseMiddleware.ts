// import Globals from './../Globals';

import { Application, Request, Response, NextFunction } from 'express';
import BodyParser from 'body-parser';

import ErrorHandler from './ErrorHandler';


import * as swaggerTools from 'swagger-tools';
import swaggerDoc from '../../api_docs.json';
import APIError from '@Service/APIError';
import OutputMiddleware from './security/OutputMiddleware';
import Globals from '@App/Globals';

export default class BaseMiddleware {

  private App : Application;

  constructor(App: Application) {
    this.App = App;
    
    this.App.use(this.CORS)
    this.App.use(BodyParser.json());
    this.App.use(this.requestLogger);
    this.App.use((_req: Request, _res: Response, next: NextFunction) => {
      console.log('Base middleware function');
      next();
    });


  }

  private requestLogger(req: Request, _res: Response, next) {
    
    console.log(`URL requested: [${req.method}] ${req.url}`);
    
    // To prevent logging this call by AWS, which makes scrolling logs tiring
    if (req.path === '/') {
      next();
      
      return;
    }

    // console.log('Body parameters:');
    // console.log(req.body);

    next();
  }



  private async CORS(req: Request, res: Response, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method === 'OPTIONS') {
      res.send(200);
      return;
    }

    next();
  }

  /**
   * Function to be called manually by those routers who have
   * request validation through Swagger YML (parsed later to JSON) files.
   */
  public async setUpSwaggerValidator() {
    return new Promise((resolve: any, _reject) => {
      try {
        swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
          this.App.use(middleware.swaggerMetadata());
          this.App.use(middleware.swaggerValidator());
          this.App.use(this.wrapper(this.validateRequest));
          
          resolve();
        });
      } catch (err) {
        console.log('Error after initializing middleware');
        console.log(err);
      }
    });
  }

  private validateRequest = async (req: swaggerTools.Swagger20Request<any>, _res, next) => {
    if (!req.swagger) {
      // Important: This error has been set as Not Found for frontend consuption simplicity, but may
      // also indicate that an existing path in express doesn't have Swagger docs.
      throw new APIError().notFound(`Route doesn't exist (or its Swagger spec is not defined)`);
    } else if (!req.swagger.operation) {
      throw new APIError().notFound('Invalid method');
    }

    next();
  }

  public registerOutputFilter(App: Application) {
    App.use(OutputMiddleware.filter.bind(OutputMiddleware));
  }


  public registerErrorHandlers(App: Application) {
    App.use(ErrorHandler.mainHandler.bind(ErrorHandler));
    App.use(ErrorHandler.swaggerHandler.bind(ErrorHandler));
    App.use(ErrorHandler.secondaryHandler.bind(ErrorHandler));
  }

  /**
   * Allows to throw exceptions directly from
   * anywhere and have it handled by Express,
   * without having to add try/catch into every route.
   *
   * Supports both async/await and normal functions.
   */
  public wrapper(action: any) {
    if (action.constructor.name === 'AsyncFunction') {
      return (req: Request, res: Response, next: NextFunction) => {
        return action(req, res, next).catch((err) => {
          next(err);
        });
      };
    } else {
      return (req: Request, res: Response, next: NextFunction) => {
        try {
          action(req, res, next);
        } catch (err) {
          next(err);
        }
      };
    }
  }

}
