/**
 * DataBaseController.js
 * Includes controllers for MongoDB and MySQL
 * Add controller for other databases from here
 */
const mongoose = require('mongoose');
const mysql = require('mysql');


/**
 * connectMongodb: Connect to MongoDB instance 
 */
connectMongodb = async (uri) => {
    var status = await mongoose.connect(uri,{
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    mongoose.Promise = global.Promise;
    if (!status) {
        return false;
    }
    console.log("INFO: Connected to MongoDB instance")
    return true;
}


/**
 * connectMySQL: Connect to MySQL instance
 */
connectMySQL = async (db) => {
    var connectionObj = await mysql.createConnection(db);
    connectionObj.connect((err) => {
        if (err) throw err;
        console.log("INFO: Connected to MySQL Instance")
    })
}


/**
 * Export the controllers
 */
module.exports = {
    connectMongodb,
    connectMySQL
}