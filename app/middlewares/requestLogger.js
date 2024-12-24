const requestLogger = (req, _, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = requestLogger;
