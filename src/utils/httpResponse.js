const appConfig = require('../config');
const EApplicationEnvironment = require('../constants/application');
const logger = require('./logger');

const httpResponse = (req, res, responseStatusCode, responseMessage, data) => {
  const response = {
    success: true,
    statusCode: responseStatusCode,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.originalUrl,
    },
    message: responseMessage,
    data: data,
  };

  //   Log
  logger.info('CONTROLLER_RESPONSE', {
    meta: response,
  });

  //   Production Env check
  if (appConfig.env === EApplicationEnvironment.PRODUCTION) {
    delete response.request.ip;
  }

  res.status(responseStatusCode).json(response);
};

module.exports = httpResponse;
