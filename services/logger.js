const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const config = require('../configs');
const _c = require('../constants');

/* istanbul ignore next */
/**
 * Default options for the logger configuration.
 *
 * @property {string} level - The logging level, set to 'debug' if in development mode, otherwise 'info'.
 * @property {Object} format - The format of the log messages, set to JSON format.
 * @property {Array} transports - An array of transport mechanisms for logging.
 * @property {Object} transports[0] - DailyRotateFile transport configuration.
 * @property {string} transports[0].filename - The filename pattern for the log files.
 * @property {string} transports[0].datePattern - The date pattern for rotating log files.
 * @property {string} transports[0].maxFiles - The maximum number of days to keep log files.
 * @property {string} transports[0].level - The logging level for this transport, set to 'error'.
 */
const defaultOpts = {
  format: format.json(),
  transports: [
    new DailyRotateFile({
      filename: `logs/Error-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      level: 'error',
    }),
  ],
};

/**
 * Create a logger instance with the given namespace.
 *
 * @param {string} [namespace] - The namespace for the logger.
 * @throws {TypeError} - If `namespace` is not a string.
 * @returns {Object} - A logger instance.
 */
module.exports = (namespace) => {
  if (typeof namespace !== 'string') {
    throw new TypeError('namespace must be a string');
  }
  const { env } = config;
  console.log('env', env);
  const isDevelopment = env === _c.ENV_DEV;

  return createLogger({
    defaultMeta: { namespace },
    ...defaultOpts,
    transports: [
      ...defaultOpts.transports,
      isDevelopment &&
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
          level: 'info',
        }),
    ].filter(Boolean),
    level: (isDevelopment && 'debug') || 'info',
  });
};
