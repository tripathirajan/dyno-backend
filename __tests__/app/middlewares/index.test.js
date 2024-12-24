const {
  errorHandler,
  notFound,
  requestLogger,
} = require("../../../app/middlewares/index");
const errors = require("../../../app/middlewares/errors");
const requestLoggerModule = require("../../../app/middlewares/requestLogger");

describe("Index Module", () => {
  it("should export errorHandler", () => {
    expect(errorHandler).toBe(errors.errorHandler);
  });

  it("should export notFound", () => {
    expect(notFound).toBe(errors.notFound);
  });

  it("should export requestLogger", () => {
    expect(requestLogger).toBe(requestLoggerModule);
  });
});
