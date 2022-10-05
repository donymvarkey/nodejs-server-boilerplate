require('dotenv').config()
const Server = require("./src/Server");


const options = {
  port: process.env.PORT,
  mongodb: {
    uri: process.env.MONGO_URL,
  },
  signature: process.env.SIGNATURE,
  nodeEnv: process.env.NODE_ENV
};

const app = new Server(options);

app.startServer();
