"use strict";
const { createLogger, format, transports } = require("winston");

// Custom date for logging files with date of occurance
const date = new Date();

const options = {
  info: {
    level: "info",
    dirname: "logs/info",
    json: true,
    handleExceptions: true,
    datePattern: "YYYY-MM-DD-HH",
    filename: `info.log`,
    format: format.combine(
      format.printf((i) =>
        i.level === "info" ? `${i.level}: ${i.timestamp} ${i.message}` : ""
      )
    ),
  },
  error: {
    level: "error",
    dirname: "logs/error",
    json: true,
    handleExceptions: true,
    filename: `error.log`,
  },
  console: {
    level: "debug",
    json: false,
    handleExceptions: true,
    colorize: true,
  },
};

const logger = new createLogger({
  format: format.combine(
    format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
    format.align(),
    format.printf((i) => `${i.level}: ${[i.timestamp]}: ${i.message}`)
  ),
  transports: [
    new transports.File(options.info),
    new transports.File(options.error),
    new transports.Console(options.console),
  ],
  exitOnError: false,
});

module.exports = { logger };
