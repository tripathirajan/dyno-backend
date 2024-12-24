const envs = ["development", "production", "staging"];
const env =
  (envs.includes(process.env.NODE_ENV) && process.env.NODE_ENV) ||
  "development";
const config = require(`./${env}.js`);

module.exports = { ...config };
