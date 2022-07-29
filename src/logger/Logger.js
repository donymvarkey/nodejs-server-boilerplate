"use strict";

import appRootPath from "app-root-path";
import winston from "winston";

const logTime = new Date().toLocaleDateString();
const customLog = printf(({ level, message }) => {
  return `Level:[${level}] LogTime: [${logTime}] Message:-[${message}]`;
});

// Custom date for logging files with date of occurance
const date = new Date();
const newdate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

const options = {
  info: {
    level: "info",
    dirname: "logs/combibned",
    json: true,
    handleExceptions: true,
    datePattern: "YYYY-MM-DD-HH",
    filename: `combined-${newdate}.log`,
  },
  error: {
    level: "error",
    dirname: "logs/error",
    json: true,
    handleExceptions: true,
    filename: `error-${newdate}.log`,
  },
  console: {
    level: "debug",
    json: false,
    handleExceptions: true,
    colorize: true,
  },
};

const logger = new createLogger({
  format: combine(customLog),
  transports: [
    new transports.File(options.info),
    new transports.File(options.error),
    new transports.Console(options.console),
  ],
  exitOnError: false,
});

module.exports = logger;
