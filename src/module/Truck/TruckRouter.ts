import Express from 'express';
import { Application, Request, Router as RouterType, NextFunction } from 'express';

import Globals from '@App/Globals';

import BaseMiddleware from '@Module/BaseMiddleware';
import Controller from '@Truck/TruckController';

const basePath = '/truck';

const Router: RouterType = Express.Router();

const handler = async (App: Application, Middleware: BaseMiddleware) => {
  Router.post('/', Middleware.wrapper(async (req: Request, _res, next: NextFunction) => {
    Globals.setUnfilteredResponse(await new Controller().create(req)); next(1);
  }));
  
  Router.get('/all', Middleware.wrapper(async (req: Request, _res, next: NextFunction) => {
    Globals.setUnfilteredResponse(await new Controller().getAllTrucks(req)); next(1);
  }));
  
  Router.get('/:id', Middleware.wrapper(async (req: Request, _res, next: NextFunction) => {
    Globals.setUnfilteredResponse(await new Controller().get(req)); next(1);
  }));
 

  Router.post('/:id/load', Middleware.wrapper(async (req: Request, _res, next: NextFunction) => {
    Globals.setUnfilteredResponse(await new Controller().loadTruck(req)); next(1);
  }));

  Router.post('/:id/unload', Middleware.wrapper(async (req: Request, _res, next: NextFunction) => {
    Globals.setUnfilteredResponse(await new Controller().unloadTruck(req)); next(1);
  }));

  App.use(basePath, Router);
};

export default handler;
