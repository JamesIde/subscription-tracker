import { AppError } from "../common/interfaces/AppError";
import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../common/interfaces/ErrorResponse";
import { HttpStatus } from "../common/enum/status";
import API_CONFIG, { isDevelopment } from "../config/ApiConfig";

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  let message = "";
  console.log("########################################");

  if (err instanceof AppError) {
    console.error("Error - ", err.message);
    if (err.payload) {
      console.error(JSON.stringify(err.payload, null, 2));
    }
    statusCode = err.statusCode;
    message = err.message;
  } else {
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    message = "An unknown error occurred";
  }

  console.log("########################################");
  return res.status(statusCode).json({
    message,
    stack: isDevelopment ? err.stack : "🐸",
  });
}
