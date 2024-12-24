// Description: Main entry point for the application.
require("dotenv").config({});
const http = require("http");
const https = require("https");
const app = require("./app");

const { port, env, server: serverConfig } = require("./configs");

const loadServer = () => {
  return env === "development"
    ? http.createServer(app)
    : https.createServer(app, serverConfig);
};

const server = loadServer();

server.listen(port, () => {
  const { address: host, port: port } = server.address();

  const banner = `
************************************************
💻  Server listening on port: ${port}
⚙️  Environment: ${env}
📟  Host: ${host}
🗓️  Server started at: ${new Date()}
************************************************
  `;
  console.log(banner);
});
