const { errorHandler, notFound } = require('../../../app/middlewares/errors');

describe('Middleware Tests', () => {
  describe('errorHandler', () => {
    it('should return 500 and error message in production', () => {
      process.env.NODE_ENV = 'production';
      const err = new Error('Test error');
      const req = {};
      const res = {
        statusCode: 200,
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      errorHandler(err, req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Internal Server Error',
      });
    });

    it('should return the error message and stack in development', () => {
      process.env.NODE_ENV = 'development';
      const err = new Error('Test error');
      const req = {};
      const res = {
        statusCode: 200,
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      errorHandler(err, req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: err.message,
        stack: err.stack,
      });
    });

    it('should use the existing status code if not 200', () => {
      process.env.NODE_ENV = 'development';
      const err = new Error('Test error');
      const req = {};
      const res = {
        statusCode: 400,
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      errorHandler(err, req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: err.message,
        stack: err.stack,
      });
    });
  });

  describe('notFound', () => {
    it('should return 404 and not found message', () => {
      const req = { originalUrl: '/test-url' };
      const res = {
        status: jest.fn().mockReturnThis(),
      };
      const next = jest.fn();

      notFound(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
      const error = next.mock.calls[0][0];
      expect(error.message).toBe('Not Found - url: /test-url');
    });
  });
});
