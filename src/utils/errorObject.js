const appConfig = require('../config');
const EApplicationEnvironment = require('../constants/application');
const responseMessages = require('../constants/responseMessages');
const logger = require('./logger');

const errorObject = (err, req, errorStatusCode = 500) => {
  const errorObj = {
    success: false,
    statusCode: errorStatusCode,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.originalUrl,
    },
    message:
      err instanceof Error
        ? err.message || responseMessages.SOMETHING_WENT_WRONG
        : responseMessages.SOMETHING_WENT_WRONG,
    data: null,
    trace: err instanceof Error ? { error: err.stack } : null,
  };

  // Log
  logger.error('CONTROLLER_ERROR', {
    meta: errorObj,
  });

  // Production Env check
  if (appConfig.env === EApplicationEnvironment.PRODUCTION) {
    delete errorObj.request.ip;
    delete errorObj.trace;
  }

  return errorObj;
};

module.exports = errorObject;
