const responseMessages = require('../constants/responseMessages');
const getServerHealthDetails = require('../services/HealthService');
const httpError = require('../utils/httpError');
const httpResponse = require('../utils/httpResponse');
const logger = require('../utils/logger');

const healthController = async (req, res, next) => {
  try {
    const healthData = getServerHealthDetails();
    httpResponse(req, res, 200, responseMessages.SUCCESS, healthData);
  } catch (error) {
    logger.error('INTERNAL SERVER ERROR', { meta: { error: error } });
    httpError(next, error, req, 500);
  }
};

module.exports = { healthController };
