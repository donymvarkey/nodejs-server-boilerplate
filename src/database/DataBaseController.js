/**
 * DataBaseController.js
 * Includes controllers for MongoDB and MySQL
 * Add controller for other databases from here
 * Remove the controller code which you don't need and also remove the imports.
 */
const mongoose = require("mongoose");
const { logger } = require("../config");
// const mysql = require("mysql");

/**
 * connectMongodb: Connect to MongoDB instance
 */
connectMongodb = async (uri) => {
  await mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  mongoose.Promise = global.Promise;
  logger.info("Connected to MongoDB instance");
};

/**
 * connectMySQL: Connect to MySQL instance
 */
// connectMySQL = async (db) => {
//     var connectionObj = await mysql.createConnection(db);
//     connectionObj.connect((err) => {
//         if (err) throw err;
//         console.log("INFO: Connected to MySQL Instance")
//     })
// }

/**
 * Export the controllers
 */
module.exports = {
  connectMongodb,
  //   connectMySQL,
};
