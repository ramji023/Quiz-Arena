// wrote custom class ApiError to handle global errors
export default class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message); // call parent Error class constructor
    this.statusCode = statusCode;
  }
}
