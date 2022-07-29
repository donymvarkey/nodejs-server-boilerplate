// const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");
// const { connectMongodb } = require("./database/DataBaseController");
// const { logger } = require("./config");
// const { ErrorResponse, notFoundResponse } = require("./helpers/apiResponse");
"use strict";

import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectMongodb } from "./database/DataBaseController.js";
import { logger } from "./config.js";
import { ErrorResponse, notFoundResponse } from "./helpers/apiResponse.js";

// import { signIn } from "./routes/AuthRoute.js";

export default class Server {
  constructor(options) {
    this.options = options;

    this.api = null;
  }

  async configServer() {
    var api = express();

    api.use(express.urlencoded({ limit: "10mb", extended: true }));
    api.use(express.json({ limit: "10mb", extended: true }));
    api.use(cors()); //allow cross domain requesting of urls
    api.use(morgan("dev"));

    //echo route
    api.use("/echo", function (req, res) {
      res.json({
        health: true,
      });
    });

    // api.use("/s", express.static("./src/public"));
    api.set("x-powered-by", false);

    this.api = api;

    return true;
  }

  async mountRoutes() {
    // this.api.use("/api/auth", AuthRoute);
    return true;
  }

  async startServer() {
    var serverConfigStatus = await this.configServer();

    if (serverConfigStatus !== true) {
      logger.error("FATAL: Failed to configure server");
      return false;
    }

    connectMongodb(this.options.mongodb.uri);
    await this.mountRoutes();

    this.api.use((req, res, next) => {
      notFoundResponse(res, "Endpoint not found");
      next(error);
    });

    this.api.use((error, req, res, next) => {
      const msg = error.message || "Internal Server Error";
      return ErrorResponse(res, msg);
    });

    this.api.listen(this.options.port, () => {
      logger.info(`Listening on http://localhost:${this.options.port}`);
    });
  }
}
