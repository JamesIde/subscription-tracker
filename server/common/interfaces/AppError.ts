export class AppError extends Error {
  statusCode: number;
  payload?: any;
  constructor(message: string, statusCode: number, payload?: any) {
    super(message);
    this.statusCode = statusCode;
    this.payload = payload;
  }
}
