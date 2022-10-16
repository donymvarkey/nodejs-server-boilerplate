/**
 * DataBaseController.js
 * Includes controllers for MongoDB 
 * Add controller for other databases from here
 */
const mongoose = require("mongoose")
const { logger } = require("../logger/Logger")

const connectMongodb = async (uri) => {
  logger.info("Connecting to mongodb", uri);
  mongoose.Promise = global.Promise;
  await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.info("Connected to MongoDB");
    })
    .catch((err) => {
      logger.error("Failed to connect to MongoDB: ", err);
    });
};

module.exports = { connectMongodb }