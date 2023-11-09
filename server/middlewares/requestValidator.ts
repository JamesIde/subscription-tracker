import { NextFunction, Request, Response } from "express";
import { RequestValidators } from "../common/schemas/requestValidators";

export function validateRequest(validators: RequestValidators) {
  //   it returns the express objects so that it can be used as a middleware
  //   error handling will figure out if its a zod error
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      if (validators.body) {
        validators.body.parse(req.body);
      }
      if (validators.query) {
        validators.query.parse(req.query);
      }
      if (validators.params) {
        validators.params.parse(req.params);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
