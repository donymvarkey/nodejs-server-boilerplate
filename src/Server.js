/**
 * Server.js
 * Configurations for the Server
 */
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const chalk = require('chalk');

/**
 * Importing the DB Controllers for MongoDB and MySQL.
 * You can add controllers for other DBs in the ./controllers/DataBaseController.js file
 */
const {connectMongodb, connectMySQL} = require('./controllers/DataBaseController')

/**
 * Importing the config for Winston
 */
const {logger} = require('./config/Winston')


const cors = require('cors');

class Server{
    /**
     * @constructor
     * @param options  the socket of the app
     */
    constructor(options){

        this.options = options;

        //for general http server
        this.api = null;
    }

    /**
     * @configServer
     * used to initialise the api attribute with an object of express
     */
    async configServer(){

        var api = express();

        api.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
        api.use(bodyParser.json({limit: '10mb', extended: true}));
        api.use(cors()); //allow cross domain requesting of urls
        api.use(morgan('combined'))

        //url to check health of server
        api.use('/health',function(req,res){

            res.json({
                health : true
            });

        });
        //ignore this route
        api.use('/s',express.static('./src/public'))
        api.set('x-powered-by',false);
        api.set('signature',this.options.signature);

        this.api     = api;

        return true;
    }

    async mountRoutes(){

        return true;
    }
    /**
     * @startServer
     * start the server on the specifed port in the options
     */
    async startServer(){
        // MongoDB database connection goes here
        connectMongodb(this.options.mongodb.uri)

        // Mysql database connection goes here

    
        var serverConfigStatus = await this.configServer();

        if(serverConfigStatus !== true){
            console.log("FATAL: Failed to configure server")
            return false;
        }

        await this.mountRoutes();

        // start the server
        this.api.listen( this.options.port,() =>{
            console.log(chalk.blue("INFO Server Started."));
            console.log(chalk.green(`Listening on http://127.0.0.1:${this.options.port}`));
        });
    }

}

module.exports = Server;
