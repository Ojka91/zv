import { Request } from 'express';

export default class RootController {

  constructor() { }

  public async read(_req: Request) {
    return { message: 'Welcome to API' };
  }
  
}
