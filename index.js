// const Server = require("./src/Server");
import { config } from "dotenv";
import Server from "./src/Server.js";

config();

const options = {
  port: process.env.PORT,
  mongodb: {
    uri: process.env.MONGO_URL,
  },
  signature: process.env.SIGNATURE,
};

const app = new Server(options);

app.startServer();
