const logger =
  require('../../services').createNamespaceLogger('ErrorMiddleware');
/**
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const errorHandler = (err, req, res, next) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  logger.error({
    tag: 'errorHandler',
    message: err.message,
    stack: err.stack,
    statusCode,
  });
  res.status(statusCode).json({
    message: isProduction ? 'Internal Server Error' : err.message,
    ...(!isProduction && { stack: err.stack }),
  });
};
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - url: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = {
  errorHandler,
  notFound,
};
