"use strict";
const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");

const options = {
  error: {
    level: "error",
    dirname: "logs",
    json: true,
    handleExceptions: true,
    datePattern: "YYYY-MM-DD",
    filename: `app_log_%DATE%.log`,
    maxSize: "10m",
    maxFiles: "7d",
    format: format.combine(
      format.printf((i) =>
        i.level === "error" ? `${i.level}: ${i.timestamp} ${i.message}` : ""
      )
    ),
  },
  console: {
    level: "debug",
    json: true,
    handleExceptions: true,
    colorize: true,
  },
};

const logger = new createLogger({
  format: format.combine(
    format.timestamp({ format: "DD-MMM-YYYY hh:mm:ss a" }),
    format.align(),
    format.printf(
      (i) => `${i.level.toUpperCase()}: ${[i.timestamp]}: ${i.message}`
    )
  ),
  transports: [
    new transports.DailyRotateFile(options.error),
    new transports.Console(options.console),
  ],
  exitOnError: false,
});

module.exports = { logger };
