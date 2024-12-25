// const { createLogger, format, transports, log } = require('winston');
// const DailyRotateFile = require('winston-daily-rotate-file');

// const createNamespaceLogger = require('../../services').createNamespaceLogger;

// jest.mock('winston', () => {
//   const mFormat = {
//     json: jest.fn(() => 'json'),
//     combine: jest.fn(() => 'combine'),
//     colorize: jest.fn(() => 'colorize'),
//     simple: jest.fn(() => 'simple'),
//   };
//   const mTransports = {
//     Console: jest.fn(() => 'Console'),
//     DailyRotateFile: jest.fn(() => 'DailyRotateFile'),
//   };
//   const mCreateLogger = jest.fn(() => 'logger');
//   return {
//     createLogger: mCreateLogger,
//     format: mFormat,
//     transports: mTransports,
//   };
// });

// jest.mock('winston-daily-rotate-file', () => {
//   return jest.fn().mockImplementation();
// });

// jest.mock('../../configs', () => ({
//   env: 'development',
// }));

// jest.mock('../../constants', () => ({
//   ENV_DEV: 'development',
// }));

// describe('Logger Service', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should create a logger with the correct default options in development', () => {
//     const logger = createNamespaceLogger('testNamespace');
//     expect(createLogger).toHaveBeenCalledWith({
//       defaultMeta: { namespace: 'testNamespace' },
//       level: 'debug',
//       format: format.json(),
//       transports: [expect.any(DailyRotateFile), expect.any(transports.Console)],
//     });
//   });

//   it('should create a logger with the correct default options in production', async () => {
//     jest.resetModules();
//     jest.doMock('../../configs', () => ({
//       env: 'production',
//     }));
//     const { createNamespaceLogger } = require('../../services');
//     console.log('check', typeof createNamespaceLogger);
//     await createNamespaceLogger('testNamespace');
//     expect(createLogger).toHaveBeenCalled();
//     expect(createLogger).toHaveBeenCalledWith({
//       defaultMeta: { namespace: 'testNamespace' },
//       level: 'info',
//       format: 'json',
//       transports: ['DailyRotateFile'],
//     });
//   });

//   it('should use the correct log level based on environment', () => {
//     jest.resetModules();
//     jest.doMock('../../configs', () => ({
//       env: 'development',
//     }));
//     const createNamespaceLoggerDev = require('../../services').createLogger;
//     const loggerDev = createNamespaceLoggerDev('testNamespace');
//     expect(createLogger).toHaveBeenCalledWith(
//       expect.objectContaining({
//         level: 'debug',
//       }),
//     );

//     jest.resetModules();
//     jest.doMock('../configs', () => ({
//       env: 'production',
//     }));
//     const createNamespaceLoggerProd = require('../../services').createLogger;
//     const loggerProd = createNamespaceLoggerProd('testNamespace');
//     expect(createLogger).toHaveBeenCalledWith(
//       expect.objectContaining({
//         level: 'info',
//       }),
//     );
//   });

//   it('should add console transport only in development environment', () => {
//     jest.resetModules();
//     jest.doMock('../../configs', () => ({
//       env: 'development',
//     }));
//     const createNamespaceLoggerDev = require('../../services').createLogger;
//     const loggerDev = createNamespaceLoggerDev('testNamespace');
//     expect(transports.Console).toHaveBeenCalled();

//     jest.resetModules();
//     jest.doMock('../configs', () => ({
//       env: 'production',
//     }));
//     const createNamespaceLoggerProd = require('../../services').createLogger;
//     const loggerProd = createNamespaceLoggerProd('testNamespace');
//     expect(transports.Console).not.toHaveBeenCalled();
//   });

//   it('should throw a TypeError if namespace is not a string', () => {
//     const createNamespaceLogger = require('../../services').createLogger;
//     expect(() => createNamespaceLogger()).toThrow(TypeError);
//     expect(() => createNamespaceLogger()).toThrow('namespace must be a string');
//     expect(() => createNamespaceLogger(123)).toThrow(TypeError);
//     expect(() => createNamespaceLogger(123)).toThrow(
//       'namespace must be a string',
//     );
//   });
// });

const createLoggerInstance = require('../../services/logger');

const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

jest.mock('winston', () => {
  const mCreateLogger = jest.fn(() => 'logger');
  const mFormat = {
    json: jest.fn(() => 'json'),
    combine: jest.fn(() => 'combine'),
    colorize: jest.fn(() => 'colorize'),
    simple: jest.fn(() => 'simple'),
  };
  const mTransports = {
    Console: jest.fn(() => 'Console'),
    DailyRotateFile: jest.fn(() => 'DailyRotateFile'),
  };
  return {
    createLogger: mCreateLogger,
    format: mFormat,
    transports: mTransports,
  };
});

jest.mock('winston-daily-rotate-file', () => {
  return jest.fn(() => 'DailyRotateFile');
});

jest.mock('../../configs', () => ({
  env: 'development',
}));

jest.mock('../../constants', () => ({
  ENV_DEV: 'development',
}));

describe('createLoggerInstance', () => {
  it('should throw a TypeError if namespace is not a string', () => {
    expect(() => createLoggerInstance()).toThrow(TypeError);
    expect(() => createLoggerInstance(123)).toThrow(TypeError);
  });

  it('should return a logger instance with the correct defaultMeta', () => {
    const namespace = 'testNamespace';
    const logger = createLoggerInstance(namespace);
    expect(createLogger).toHaveBeenCalledWith(
      expect.objectContaining({
        defaultMeta: { namespace },
      }),
    );
  });

  it('should return a logger instance with the correct transports in development environment', () => {
    const namespace = 'testNamespace';
    const logger = createLoggerInstance(namespace);
    expect(createLogger).toHaveBeenCalledWith(
      expect.objectContaining({
        transports: expect.arrayContaining([
          expect.any(DailyRotateFile),
          expect.any(transports.Console),
        ]),
      }),
    );
  });

  it('should return a logger instance with the correct transports not in development environment', () => {
    jest.resetModules();
    jest.doMock('../../configs', () => ({
      env: 'production',
    }));
    const namespace = 'testNamespace';
    const logger = createLoggerInstance(namespace);
    expect(createLogger).toHaveBeenCalledWith(
      expect.objectContaining({
        transports: expect.arrayContaining([expect.any(DailyRotateFile)]),
      }),
    );
  });

  it('should return a logger instance with the correct level in development environment', () => {
    const namespace = 'testNamespace';
    const logger = createLoggerInstance(namespace);
    expect(createLogger).toHaveBeenCalledWith(
      expect.objectContaining({
        level: 'debug',
      }),
    );
  });

  it('should return a logger instance with the correct level not in development environment', () => {
    jest.resetModules();
    jest.doMock('../../configs', () => ({
      env: 'production',
    }));
    const namespace = 'testNamespace';
    const logger = createLoggerInstance(namespace);
    expect(createLogger).toHaveBeenCalledWith(
      expect.objectContaining({
        level: 'info',
      }),
    );
  });
});
