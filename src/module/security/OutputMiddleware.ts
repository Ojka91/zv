import { Response, NextFunction } from "express";
import Globals from "@App/Globals";

class OutputMiddleware {

  private disabledProperties : string[] = [];

  filter = (err, _req, res: Response, next: NextFunction) => {
    // It's not an error, but express won't work with a normal (non-error) middleware
    if (err === 1) {
      const response = Globals.getUnfilteredResponse();
      if (!Globals.isEnabledSensitiveData()) {
        this.iterateOutput(response);
      }
      
      res.status(200);
      res.json(response);
        
      return;
    } else {
      next(err);
    }
  }

  private iterateOutput(obj) {
    if (!obj) {
      return;
    }

    if (typeof obj !== 'object') {
      return;
    }

    Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === 'object') {
        this.iterateOutput(obj[key])
      } else {
        if (this.disabledProperties.includes(key)) {
          delete obj[key];
        }
      }
    });
  }

}

export default new OutputMiddleware();
