const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimiter = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const { cors: corsOpts, rateLimit } = require('../configs');
const { errorHandler, notFound, requestLogger } = require('./middlewares');

const app = express();
const limiter = rateLimiter(rateLimit);

// Middleware
app.use(express.static('public'));
app.use(requestLogger);
const { allowedOrigins, ...rest } = corsOpts;
app.use(
  cors({
    ...rest,
    origin: (origin, callback) =>
      allowedOrigins.includes(origin) || !origin
        ? callback(null, true)
        : callback(new Error('Not allowed by CORS')),
  }),
);
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());

// custom middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
