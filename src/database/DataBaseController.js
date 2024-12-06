/**
 * DataBaseController.js
 * Includes controllers for MongoDB
 * Add controller for other databases from here
 */
const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectMongodb = async (uri) => {
  logger.info('CONNECTING TO DB', { meta: { url: uri } });
  mongoose.Promise = global.Promise;
  await mongoose
    .connect(uri)
    .then(() => {
      logger.info('CONNECTED TO DB', null);
      return true;
    })
    .catch((err) => {
      logger.error('CONNECTION FAILED', { meta: { error: err } });
      return false;
    });
};

module.exports = { connectMongodb };
