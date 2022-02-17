import Express from 'express';
import { Application, Request, Router as RouterType, NextFunction } from 'express';

import Globals from '@App/Globals';

import BaseMiddleware from '@Module/BaseMiddleware';
import Controller from '@Root/RootController';

const basePath = '/';

const Router: RouterType = Express.Router();

const handler = async (App: Application, Middleware: BaseMiddleware) => {

  Router.get('/', Middleware.wrapper(async (req: Request, _res, next: NextFunction) => {
    Globals.setUnfilteredResponse(await new Controller().read(req)); next(1);
  }));

  App.use(basePath, Router);
};

export default handler;
