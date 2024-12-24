module.exports = {
  env: 'staging',
  port: process.env.PORT || 4000,
  server: {
    key: process.env.SSL_KEY,
    cert: process.env.SSL_CERT,
  },
  db: {
    url: process.env.MONGO_DB_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100,
  },
  cors: {
    origin: [
      'https://dyno-app-staging.herokuapp.com',
      'https://dyno-app-staging-tripathirajan.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
};
