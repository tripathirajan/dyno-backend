const requestLogger = require("./requestLogger");

describe("requestLogger Middleware", () => {
  it("should log the request method and path", () => {
    const req = {
      method: "GET",
      path: "/test-path",
    };
    const res = {};
    const next = jest.fn();
    console.log = jest.fn();

    requestLogger(req, res, next);

    expect(console.log).toHaveBeenCalledWith("GET /test-path");
    expect(next).toHaveBeenCalled();
  });
});
