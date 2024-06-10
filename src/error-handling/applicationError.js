export class applicationError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
