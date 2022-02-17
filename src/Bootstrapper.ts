import { Application } from 'express';
import Express from 'express';

import BaseMiddleware from '@Module/BaseMiddleware';
import * as Routers from '@Module';

const App: Application = Express();

const Middleware = new BaseMiddleware(App);

export const handler = async () => {

  await Middleware.setUpSwaggerValidator();
  
  const RoutersArray = [];
  Object.keys(Routers).forEach(routerName => {
    RoutersArray.push(Routers[routerName]);
  });

  for (const Router of RoutersArray) {
    await Router(App, Middleware);
  }

  Middleware.registerOutputFilter(App);
  Middleware.registerErrorHandlers(App);

  return App;
};
