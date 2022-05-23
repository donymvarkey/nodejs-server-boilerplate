/**
 * DataBaseController.js
 * Includes controllers for MongoDB and MySQL
 * Add controller for other databases from here
 * Remove the controller code which you don't need and also remove the imports.
 */
const mongoose = require("mongoose");
const { logger } = require("../config");

connectMongodb = async (uri) => {
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

module.exports = {
  connectMongodb,
};
