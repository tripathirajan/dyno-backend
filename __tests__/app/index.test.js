const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimiter = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const app = require("../../app/index");

jest.mock("express", () => {
  const mExpress = jest.fn(() => ({
    use: jest.fn(),
    static: jest.fn(),
  }));
  mExpress.static = jest.fn();
  mExpress.json = jest.fn(() => "jsonMiddleware");
  mExpress.urlencoded = jest.fn(() => "urlencodedMiddleware");
  return mExpress;
});
jest.mock("cors");
jest.mock("helmet");
jest.mock("compression");
jest.mock("express-rate-limit");
jest.mock("cookie-parser");

const { cors: corsOpts, rateLimit } = require("../../configs");
const {
  errorHandler,
  notFound,
  requestLogger,
} = require("../../app/middlewares");

describe("Express App", () => {
  let limiter;

  beforeAll(() => {
    limiter = rateLimiter(rateLimit);
  });

  it("should set up static file serving", () => {
    expect(express.static).toHaveBeenCalledWith("public");
    expect(app.use).toHaveBeenCalledWith(express.static("public"));
  });

  it("should use requestLogger middleware", () => {
    expect(app.use).toHaveBeenCalledWith(requestLogger);
  });

  it("should set up CORS with allowed origins", () => {
    const { allowedOrigins, ...rest } = corsOpts;
    const corsMiddleware = cors.mock.calls[0][0];
    expect(cors).toHaveBeenCalledWith(expect.objectContaining(rest));
    expect(corsMiddleware.origin).toBeInstanceOf(Function);

    const callback = jest.fn();
    // Test allowed origin
    corsMiddleware.origin("http://localhost:9000", callback);
    expect(callback).toHaveBeenCalledWith(null, true);

    // Test disallowed origin
    corsMiddleware.origin("http://notallowed.com", callback);
    expect(callback).toHaveBeenCalledWith(new Error("Not allowed by CORS"));

    // Test no origin (e.g., same-origin requests)
    corsMiddleware.origin(null, callback);
    expect(callback).toHaveBeenCalledWith(null, true);
  });

  it("should set up rate limiter", () => {
    expect(rateLimiter).toHaveBeenCalledWith(rateLimit);
    expect(app.use).toHaveBeenCalledWith(limiter);
  });

  it("should use express.json middleware", () => {
    expect(app.use).toHaveBeenCalledWith("jsonMiddleware");
  });

  it("should use express.urlencoded middleware", () => {
    expect(app.use).toHaveBeenCalledWith("urlencodedMiddleware");
  });

  it("should use cookieParser middleware", () => {
    expect(app.use).toHaveBeenCalledWith(cookieParser());
  });

  it("should use helmet middleware", () => {
    expect(app.use).toHaveBeenCalledWith(helmet());
  });

  it("should use compression middleware", () => {
    expect(app.use).toHaveBeenCalledWith(compression());
  });

  it("should use notFound middleware", () => {
    expect(app.use).toHaveBeenCalledWith(notFound);
  });

  it("should use errorHandler middleware", () => {
    expect(app.use).toHaveBeenCalledWith(errorHandler);
  });
});
