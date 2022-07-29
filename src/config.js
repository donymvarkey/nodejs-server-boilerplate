import appRootPath from "app-root-path";
import winston from "winston";

/**
 * Config for winston to log to a file and console
 * Errors will be logged to the /logs/app.log file and console.
 */
var options = {
  file: {
    level: "error",
    filename: `${appRootPath}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: false,
  },
};

// instantiate a new Winston Logger with the settings defined above
export const logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});
