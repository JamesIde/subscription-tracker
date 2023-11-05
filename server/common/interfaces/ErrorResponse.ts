export default interface ErrorResponse {
  messages: Array<string>;
  stack?: string;
}
