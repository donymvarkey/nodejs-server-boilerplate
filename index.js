const Server = require('./src/Server');
const appConfig = require('./src/config');

const options = {
  port: appConfig.port,
  db_url: appConfig.database_url,
  secret: appConfig.secret,
  nodeEnv: appConfig.env,
  server_url: appConfig.server_url,
};

const app = new Server(options);

app.startServer();
