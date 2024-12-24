module.exports = {
  env: "development",
  port: process.env.PORT || 3000,
  db: {
    url: process.env.MONGO_DB_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100,
  },
  cors: {
    allowedOrigins: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:4000",
      "http://localhost:4001",
      "http://localhost:9000",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
};
