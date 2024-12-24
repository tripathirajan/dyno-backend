const { errorHandler, notFound, requestLogger } = require("./index");
const errors = require("./errors");
const requestLoggerModule = require("./requestLogger");

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
