import { AppError } from "../common/interfaces/AppError";
import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../common/interfaces/ErrorResponse";
import { HttpStatus } from "../common/enum/status";
import { isDevelopment } from "../config/ApiConfig";
import { ZodError } from "zod";

// TODO add logger to sentry?
export function errorHandler(
  err: AppError | ZodError | Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  let messages = Array<string>();
  console.log("########################################");

  if (err instanceof AppError) {
    console.log("Error - ", err.message);
    if (err.payload) {
      console.log(JSON.stringify(err.payload));
    }
    statusCode = err.statusCode;
    messages.push(err.message);
  } else if (err instanceof ZodError) {
    messages = err.issues.map((issue) => {
      return `${issue.path.join(".")}: ${issue.message}`;
    });
    statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
  } else {
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    messages.push("An unknown error occurred");
  }

  console.log("########################################");
  return res.status(statusCode).json({
    messages,
    stack: isDevelopment ? err.stack : "🐸",
  });
}
